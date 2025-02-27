# Queue controller for saved videos
from flask import jsonify
from videos.models import db, Queue, Video
from user.models import User

def add_video_to_queue(user_id, video_id):
    """Add a video to the user's queue."""
    user = User.query.get(user_id)
    video = Video.query.get(video_id)
    
    if not user or not video:
        return jsonify({"error": "User or video not found"}), 404
    
    # Check if the video is already in the queue
    existing_queue_item = Queue.query.filter_by(user_id=user_id, video_id=video_id).first()
    if existing_queue_item:
        return jsonify({"message": "Video already in your queue"}), 400
    
    # Add the video to the queue
    new_queue_item = Queue(user_id=user_id, video_id=video_id)
    db.session.add(new_queue_item)
    db.session.commit()
    
    return jsonify({"message": "Video added to your queue"}), 201

def get_user_queue(user_id):
    """Get all videos in the user's queue."""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    queue_items = Queue.query.filter_by(user_id=user_id).all()
    videos = [{"id": item.video.id, "title": item.video.title} for item in queue_items]

    return jsonify({"queue": videos})

def remove_video_from_queue(user_id, video_id):
    """Remove a video from the user's queue."""
    user = User.query.get(user_id)
    video = Video.query.get(video_id)
    
    if not user or not video:
        return jsonify({"error": "User or video not found"}), 404
    
    queue_item = Queue.query.filter_by(user_id=user_id, video_id=video_id).first()
    if not queue_item:
        return jsonify({"error": "Video not in your queue"}), 404

    db.session.delete(queue_item)
    db.session.commit()

    return jsonify({"message": "Video removed from your queue"})

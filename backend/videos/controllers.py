# Controllers for video routes
from flask import jsonify
from videos.models import db, Video

def get_all_videos():
    """Fetch all videos from the database."""
    videos = Video.query.all()
    return jsonify([{
        "id": video.id,
        "title": video.title,
        "description": video.description,
        "file_url": video.file_url,
        "thumbnail_url": video.thumbnail_url,
        "duration": video.duration,
        "views": video.views,
        "like_count": video.like_count,
        "comment_count": video.comment_count
    } for video in videos])

def get_video_by_id(video_id):
    """Fetch a single video by ID."""
    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404
    return jsonify({
        "id": video.id,
        "title": video.title,
        "description": video.description,
        "file_url": video.file_url,
        "thumbnail_url": video.thumbnail_url,
        "duration": video.duration,
        "views": video.views,
        "like_count": video.like_count,
        "comment_count": video.comment_count
    })

def increment_video_views(video_id):
    """Increment the view count when a user watches a video."""
    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404
    
    video.views += 1
    db.session.commit()

    return jsonify({"message": "View count updated", "views": video.views})

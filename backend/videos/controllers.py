# Controllers for video routes
from flask import jsonify
from videos.models import db, Video

# Create a new video
def create_video():
    """Create a new video in the database."""
    data = request.get_json()

    # Ensure all required fields are in the data
    title = data.get('title')
    description = data.get('description', '')
    file_url = data.get('file_url')
    thumbnail_url = data.get('thumbnail_url', '')
    image = data.get('image', '')
    cover = data.get('cover', '')
    duration = data.get('duration', 0)

    # Check if required fields are present
    if not title or not file_url:
        return jsonify({"error": "Title and file URL are required"}), 400

    # Create a new video object
    new_video = Video(
        title=title,
        description=description,
        file_url=file_url,
        thumbnail_url=thumbnail_url,
        image=image,
        cover=cover,
        duration=duration
    )

    # Add the new video to the session and commit
    db.session.add(new_video)
    db.session.commit()

    return jsonify({
        "message": "Video created successfully",
        "video": {
            "id": new_video.id,
            "title": new_video.title,
            "description": new_video.description,
            "file_url": new_video.file_url,
            "thumbnail_url": new_video.thumbnail_url,
            "image": new_video.image,
            "cover": new_video.cover,
            "duration": new_video.duration
        }
    })

# Fetch all videos
def get_all_videos():
    """Fetch all videos from the database."""
    videos = Video.query.all()
    return jsonify([{
        "id": video.id,
        "title": video.title,
        "description": video.description,
        "file_url": video.file_url,
        "thumbnail_url": video.thumbnail_url,
        "image": video.image, 
        "cover": video.cover, 
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
        "image": video.image, 
        "cover": video.cover, 
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
# Video routes
import os
from flask import Blueprint, request, jsonify 
from videos.controllers import get_all_videos, get_video_by_id, increment_video_views
from videos.models import db, Video
from werkzeug.utils import secure_filename
video_blueprint = Blueprint('videos', __name__)

    
# Create a new video
@video_blueprint.route('/videos', methods=['POST'])
def create_video():
    """Create a new video."""
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    file_url = data.get('file_url')
    thumbnail_url = data.get('thumbnail_url')
    cover = data.get('cover') 
    image = data.get('image') 
    duration = data.get('duration')

    if not title or not file_url:
        return jsonify({"error": "Title and file URL are required"}), 400

    new_video = Video(
        title=title,
        description=description,
        file_url=file_url,
        thumbnail_url=thumbnail_url,
        image=image,
        cover=cover,
        duration=duration
    )

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
    }), 201


# Fetch all videos
@video_blueprint.route('/videos', methods=['GET'])
def fetch_videos():
    return get_all_videos()

# Fetch video by ID
@video_blueprint.route('/videos/<video_id>', methods=['GET'])
def fetch_video(video_id):
    return get_video_by_id(video_id)

# Add view count
@video_blueprint.route('/videos/<video_id>/view', methods=['POST'])
def add_view(video_id):
    return increment_video_views(video_id)

# Update video by ID
@video_blueprint.route('/videos/<video_id>', methods=['PUT'])
def update_video(video_id):
    """Update an existing video."""
    data = request.get_json()
    video = Video.query.get(video_id)

    if not video:
        return jsonify({"error": "Video not found"}), 404

    # Update fields if provided
    video.title = data.get('title', video.title)
    video.description = data.get('description', video.description)
    video.file_url = data.get('file_url', video.file_url)
    video.thumbnail_url = data.get('thumbnail_url', video.thumbnail_url)
    video.image = data.get('image', video.image)
    video.cover = data.get('cover', video.cover)
    video.duration = data.get('duration', video.duration)
    
# Like video 
@video_blueprint.route('/videos/<video_id>/like', methods=['POST'])
def increment_like_count(video_id):
    """Increment the like count for a video."""
    video = Video.query.get(video_id)

    if not video:
        return jsonify({"error": "Video not found"}), 404

    video.like_count += 1  # Increment like count by 1
    db.session.commit()

    return jsonify({"message": "Like count updated", "like_count": video.like_count}), 200
   
# Delete video by id 
@video_blueprint.route('/videos/<video_id>', methods=['DELETE'])
def delete_video(video_id):
    """Delete an existing video."""
    video = Video.query.get(video_id)

    if not video:
        return jsonify({"error": "Video not found"}), 404

    db.session.delete(video)
    db.session.commit()

    return jsonify({"message": "Video deleted successfully"}), 200

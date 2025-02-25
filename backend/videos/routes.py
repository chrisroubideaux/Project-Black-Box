# Video routes
from flask import Blueprint, request, jsonify 
from videos.controllers import get_all_videos, get_video_by_id, increment_video_views
from videos.models import db, Video

video_blueprint = Blueprint('videos', __name__)

@video_blueprint.route('/videos', methods=['GET'])
def fetch_videos():
    return get_all_videos()

@video_blueprint.route('/videos/<video_id>', methods=['GET'])
def fetch_video(video_id):
    return get_video_by_id(video_id)

@video_blueprint.route('/videos/<video_id>/view', methods=['POST'])
def add_view(video_id):
    return increment_video_views(video_id)

@video_blueprint.route('/videos', methods=['POST'])
def create_video():
    """Create a new video."""
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    file_url = data.get('file_url')
    thumbnail_url = data.get('thumbnail_url')
    duration = data.get('duration')

    if not title or not file_url:
        return jsonify({"error": "Title and file URL are required"}), 400

    new_video = Video(
        title=title,
        description=description,
        file_url=file_url,
        thumbnail_url=thumbnail_url,
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
            "duration": new_video.duration
        }
    }), 201

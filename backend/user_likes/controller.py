# Controller for user likes
from flask import Blueprint, request, jsonify
from extensions import db
from .models import UserLikes
from user.models import User  # Import User from the user module
from videos.models import Video  # Import Video from the videos module


# Define Blueprint for User Likes
user_likes_bp = Blueprint('user_likes', __name__)

# Like or unlike a video
@user_likes_bp.route('/videos/<video_id>/like', methods=['POST'])
def toggle_like(video_id):
    user_id = request.json.get('user_id')  # Get user ID from the request
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Check if the like already exists
    existing_like = UserLikes.query.filter_by(user_id=user_id, video_id=video_id).first()

    if existing_like:
        # If like exists, unlike (remove the like)
        db.session.delete(existing_like)
        db.session.commit()
        # Decrease the like count on the video
        video = Video.query.get(video_id)
        video.like_count -= 1
        db.session.commit()
        return jsonify({"message": "Video unliked", "like_count": video.like_count})

    else:
        # If like doesn't exist, like the video (add the like)
        new_like = UserLikes(user_id=user_id, video_id=video_id)
        db.session.add(new_like)
        db.session.commit()
        # Increase the like count on the video
        video = Video.query.get(video_id)
        video.like_count += 1
        db.session.commit()
        return jsonify({"message": "Video liked", "like_count": video.like_count})

    
from flask import Blueprint, request, jsonify
from flask_login import current_user
from .models import History, db
from .utils import token_required

history_blueprint = Blueprint('history', __name__)

@history_blueprint.route('/user/history', methods=['POST'])
@token_required
def add_to_history():
    """Save watched video to user's history."""
    try:
        # Extract videoId from request body
        data = request.get_json()
        video_id = data.get('videoId')
        
        if not video_id:
            return jsonify({"error": "Video ID is required"}), 400

        # Ensure user is authenticated
        if not current_user.is_authenticated:
            return jsonify({"error": "User not authenticated"}), 401
        
        # Check if the video is already in the user's history
        existing_history = History.query.filter_by(user_id=current_user.id, video_id=video_id).first()
        
        if existing_history:
            return jsonify({"message": "Video already in history"}), 200

        # Create a new history entry
        new_history = History(user_id=current_user.id, video_id=video_id)
        db.session.add(new_history)
        db.session.commit()

        return jsonify({"message": "Video added to history"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@history_blueprint.route('/user/history', methods=['DELETE'])
@token_required
def remove_from_history():
    """Remove a watched video from user's history."""
    try:
        # Extract videoId from request body
        data = request.get_json()
        video_id = data.get('videoId')

        if not video_id:
            return jsonify({"error": "Video ID is required"}), 400

        # Ensure user is authenticated
        if not current_user.is_authenticated:
            return jsonify({"error": "User not authenticated"}), 401

        # Find the history entry
        history_entry = History.query.filter_by(user_id=current_user.id, video_id=video_id).first()

        if not history_entry:
            return jsonify({"error": "Video not found in history"}), 404

        # Remove the history entry
        db.session.delete(history_entry)
        db.session.commit()

        return jsonify({"message": "Video removed from history"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

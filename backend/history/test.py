from flask import Blueprint, request, jsonify
from flask_login import current_user
from .models import History, db
from .utils import token_required

history_blueprint = Blueprint('history', __name__)
@history_blueprint.route('/user/history', methods=['POST'])
@token_required
def add_to_history():
    try:
        user = request.current_user  # Get user from request context
        print(f"Authenticated User: {user.id}")  # Debug log

        data = request.get_json()
        video_id = data.get('videoId')

        if not video_id:
            return jsonify({"error": "Video ID is required"}), 400

        # Check if the video is already in the user's history
        existing_history = History.query.filter_by(user_id=user.id, video_id=video_id).first()

        if existing_history:
            return jsonify({"message": "Video already in history"}), 200

        # Create a new history entry and explicitly set watched_at
        new_history = History(user_id=user.id, video_id=video_id, watched_at=datetime.utcnow())
        db.session.add(new_history)
        db.session.commit()

        return jsonify({"message": "Video added to history"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
   
@history_blueprint.route('/user/history', methods=['GET'])
@token_required
def get_user_history():
    """Retrieve the watch history for the authenticated user."""
    try:
        user = request.current_user  # Get user from token

        # Fetch user's history, ordered by most recent
        history = History.query.filter_by(user_id=user.id).order_by(History.watched_at.desc()).all()

        # Return video history as JSON
        return jsonify([
            {"video_id": entry.video_id, "watched_at": entry.watched_at}
            for entry in history
        ]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@history_blueprint.route('/user/history', methods=['DELETE'])
@token_required
def remove_from_history():
    """Remove a watched video from user's history."""
    try:
        user = request.current_user  # Get user from request context

        # Extract videoId from request body
        data = request.get_json()
        video_id = data.get('videoId')

        if not video_id:
            return jsonify({"error": "Video ID is required"}), 400

        if not user:
            return jsonify({"error": "User not authenticated"}), 401

        # Find the history entry
        history_entry = History.query.filter_by(user_id=user.id, video_id=video_id).first()

        if not history_entry:
            return jsonify({"error": "Video not found in history"}), 404

        # Remove the history entry
        db.session.delete(history_entry)
        db.session.commit()

        return jsonify({"message": "Video removed from history"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
 
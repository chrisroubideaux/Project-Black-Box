from flask import Blueprint, request, jsonify
from flask_login import current_user
from .models import History, db
from .utils import token_required
history_blueprint = Blueprint('history', __name__)
from flask import request, jsonify
from extensions import db
from history.models import History  
from datetime import datetime

@history_blueprint.route('/user/history', methods=['POST'])
def add_to_history():
    try:
       
        data = request.get_json()
        video_id = data.get('videoId')
        user_id = data.get('userId')  

        if not video_id or not user_id:
            return jsonify({"error": "Video ID and User ID are required"}), 400

        print(f"Adding to history - User: {user_id}, Video: {video_id}")

      
        existing_history = History.query.filter_by(user_id=user_id, video_id=video_id).first()

        if existing_history:
            return jsonify({"message": "Video already in history"}), 200

      
        new_history = History(user_id=user_id, video_id=video_id)
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
        user = request.current_user  
      
        data = request.get_json()
        video_id = data.get('videoId')

        if not video_id:
            return jsonify({"error": "Video ID is required"}), 400

        if not user:
            return jsonify({"error": "User not authenticated"}), 401

    
        history_entry = History.query.filter_by(user_id=user.id, video_id=video_id).first()

        if not history_entry:
            return jsonify({"error": "Video not found in history"}), 404
     
        db.session.delete(history_entry)
        db.session.commit()
        
        return jsonify({"message": "Video removed from history"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
  
@history_blueprint.route('/user/history', methods=['GET'])
def get_user_history():
    """Retrieve the watch history for a given user."""
    try:      
        user_id = request.args.get('userId')

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        history = History.query.filter_by(user_id=user_id).order_by(History.watched_at.desc()).all()

        return jsonify([
            {"video_id": entry.video_id, "watched_at": entry.watched_at.isoformat()}
            for entry in history
        ]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
  
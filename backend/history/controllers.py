# controllers.py
from flask import jsonify
from extensions import db
from .models import History

def add_to_history(user_id, video_id):
    """ Adds a video to the user's watch history """
    history_entry = History(user_id=user_id, video_id=video_id)
    db.session.add(history_entry)
    db.session.commit()
    return jsonify({"message": "Video added to history"}), 201

def get_user_history(user_id):
    """ Retrieves the watch history for a specific user """
    history = History.query.filter_by(user_id=user_id).order_by(History.watched_at.desc()).all()
    return jsonify([{"video_id": h.video_id, "watched_at": h.watched_at} for h in history]), 200

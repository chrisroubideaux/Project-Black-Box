# Routes
from flask import Blueprint
from .controller import toggle_like

# Define Blueprint for User Likes
user_likes_bp = Blueprint('user_likes', __name__)

# Route to like or unlike a video
user_likes_bp.add_url_rule('/videos/<video_id>/like', 'toggle_like', toggle_like, methods=['POST'])


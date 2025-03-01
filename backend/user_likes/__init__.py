from flask import Blueprint

# Initialize the user_likes blueprint
user_likes_bp = Blueprint('user_likes', __name__)

# Import routes to associate them with the blueprint
from . import routes

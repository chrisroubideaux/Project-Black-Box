from flask import Blueprint

# Initialize the admin blueprint
video_bp = Blueprint('video', __name__)

# Import routes to associate them with the blueprint
from . import routes

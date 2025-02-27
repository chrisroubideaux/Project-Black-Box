from flask import Blueprint

# Initialize the admin blueprint
queue_bp = Blueprint('queue', __name__)

# Import routes to associate them with the blueprint
from . import routes

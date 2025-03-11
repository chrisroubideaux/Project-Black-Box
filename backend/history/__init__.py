from flask import Blueprint

# Initialize the admin blueprint
history_bp = Blueprint('history', __name__)

# Import routes to associate them with the blueprint
from . import routes

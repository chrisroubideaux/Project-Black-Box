from flask import Blueprint

# Initialize the admin blueprint
user_bp = Blueprint('user', __name__)

# Import routes to associate them with the blueprint
from . import routes

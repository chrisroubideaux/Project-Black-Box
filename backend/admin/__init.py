from flask import Blueprint

# Initialize the admin blueprint
admin_bp = Blueprint('admin', __name__)

# Import routes to associate them with the blueprint
from . import routes
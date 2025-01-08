from flask import Blueprint

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/users', methods=['GET'])
def users():
    """Simple route to test the users API."""
    return "Users API is working!"
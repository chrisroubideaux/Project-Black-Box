from flask import Blueprint

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/users', methods=['GET'])
def users():
    """Simple route to test the users API."""
    return "Users API is working!"





# User Login
@user_blueprint.route('/user/login', methods=['POST'])
def login_user():
    """Authenticate user and return a JWT token."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT token
    token = jwt.encode(
        {'id': str(user.id), 'exp': datetime.utcnow() + timedelta(hours=1)}, 
        SECRET_KEY,
        algorithm="HS256"
    )
    return jsonify({"token": token}), 200


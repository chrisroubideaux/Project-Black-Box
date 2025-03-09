from flask import Blueprint

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/users', methods=['GET'])
def users():
    """Simple route to test the users API."""
    return "Users API is working!"



# Create User
@user_blueprint.route('/user', methods=['POST'])
def create_user():
    """Create a new user."""
    data = request.get_json()
    if not validate_password(data['password']):
        return jsonify({"error": "Password does not meet the required conditions"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        google_id=data.get('googleId'),
        name=data['name'],
        photo=data.get('photo', ''),
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201


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


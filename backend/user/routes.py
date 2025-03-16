# backend/users/routes.py
# backend/users/routes.py
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
import re
import jwt
from extensions import db  # Import shared db instance
from .models import User
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
from flask_cors import cross_origin

# Load environment variables
load_dotenv()

bcrypt = Bcrypt()

user_blueprint = Blueprint('user', __name__)

# Use the secret key from .env
SECRET_KEY = os.getenv('DB_SECRET_KEY')

# Helper function for password validation
def validate_password(password):
    """Validate password to ensure it meets security requirements."""
    if (
        len(password) >= 10 and
        sum(char.isdigit() for char in password) >= 2 and
        re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
    ):
        return True
    return False

# Middleware to require JWT token
def token_required(f):
    """Verify and decode JWT token."""
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token is invalid"}), 401
        return f(*args, **kwargs)
    return decorated

# Create User
@user_blueprint.route('/user/register', methods=['POST'])
def create_user():
    """Register a new user and return a JWT token."""
    data = request.get_json()

    # Check if email already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    # Check if passwords match
    if data['password'] != data.get('confirmPassword'):
        return jsonify({"error": "Passwords do not match"}), 400

    # Validate password strength
    if not validate_password(data['password']):
        return jsonify({"error": "Password must be at least 10 characters, include one special character, and one number"}), 400

    # Hash password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Create new user
    new_user = User(
        name=data['name'],
        photo=data.get('photo', ''), 
        email=data['email'],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    # Generate JWT Token
    token = jwt.encode(
        {'id': str(new_user.id), 'exp': datetime.utcnow() + timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"message": "User registered successfully", "token": token, "user": new_user.to_dict()}), 201


# Read User by ID
@user_blueprint.route('/users/<uuid:id>', methods=['GET'])
#token_required
def get_user(id):
    """Retrieve user details by ID."""
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200

# Get all Users
@user_blueprint.route('/users', methods=['GET'])
#@token_required
def get_all_users():
    """Retrieve all users."""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

# Update User
@user_blueprint.route('/users/<uuid:id>', methods=['PUT'])
@token_required
def update_user(id):
    """Update user details."""
    data = request.get_json()
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update fields
    user.name = data.get('name', user.name)
    user.photo = data.get('photo', user.photo)
    user.email = data.get('email', user.email)

    # Handle password update
    if 'password' in data:
        if not validate_password(data['password']):
            return jsonify({"error": "Password does not meet the required conditions"}), 400
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    db.session.commit()
    return jsonify(user.to_dict()), 200

# Delete User
@user_blueprint.route('/users/<uuid:id>', methods=['DELETE'])
#@token_required
def delete_user(id):
    """Delete a user."""
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# Login
@user_blueprint.route('/user/login', methods=['POST'])
@cross_origin(origin="http://localhost:3000", supports_credentials=True) 
def login_user():
    """Authenticate user and return a JWT token."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        response = jsonify({"error": "Invalid email or password"})
        response.status_code = 401
    else:
        token = jwt.encode(
            {'id': str(user.id), 'exp': datetime.utcnow() + timedelta(hours=1)}, 
            SECRET_KEY,
            algorithm="HS256"
        )
        response = jsonify({"token": token})
        response.status_code = 200

    return response
from flask import jsonify, request
import jwt

# Logout
@user_blueprint.route('/user/logout', methods=['POST'])
def logout_user():
    """Logout user by verifying token before clearing session."""
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "Token is missing"}), 401

    token = auth_header.split(" ")[1]  # Extract token from "Bearer <token>"
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"message": "User logged out successfully"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
 
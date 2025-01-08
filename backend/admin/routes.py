from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
import re
import jwt
from .models import db, Admin 
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

bcrypt = Bcrypt()
admin_blueprint = Blueprint('admin', __name__)

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

# Create Admin
@admin_blueprint.route('/admin', methods=['POST'])
def create_admin():
    """Create a new admin user."""
    data = request.get_json()
    if not validate_password(data['password']):
        return jsonify({"error": "Password does not meet the required conditions"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_admin = Admin(
        google_id=data.get('googleId'),
        name=data['name'],
        photo=data.get('photo', ''),
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_admin)
    db.session.commit()
    return jsonify(new_admin.to_dict()), 201

# Read Admin by ID
@admin_blueprint.route('/admins/<int:id>', methods=['GET'])
@token_required
def get_admin(id):
    """Retrieve admin details by ID."""
    admin = Admin.query.get(id)
    if not admin:
        return jsonify({"error": "Admin not found"}), 404
    return jsonify(admin.to_dict()), 200

# Get all admins
@admin_blueprint.route('/admins', methods=['GET'])
@token_required
def get_all_admins():
    """Retrieve all admin users."""
    admins = Admin.query.all()
    if not admins:
        return jsonify({"error": "No admins found"}), 404
    return jsonify([admin.to_dict() for admin in admins]), 200

# Update Admin
@admin_blueprint.route('/admins/<uuid:id>', methods=['PUT']) 
@token_required
def update_admin(id):
    """Update admin details."""
    data = request.get_json()
    admin = Admin.query.get(id)
    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    # Update fields
    admin.name = data.get('name', admin.name)
    admin.photo = data.get('photo', admin.photo)
    admin.email = data.get('email', admin.email)

    # Handle password update
    if 'password' in data:
        if not validate_password(data['password']):
            return jsonify({"error": "Password does not meet the required conditions"}), 400
        admin.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Commit changes to the database
    db.session.commit()
    return jsonify(admin.to_dict()), 200


# Delete Admin
@admin_blueprint.route('/admin/<int:id>', methods=['DELETE'])
@token_required
def delete_admin(id):
    """Delete an admin user."""
    admin = Admin.query.get(id)
    if not admin:
        return jsonify({"error": "Admin not found"}), 404
    db.session.delete(admin)
    db.session.commit()
    return jsonify({"message": "Admin deleted successfully"}), 200


# Admin Login
@admin_blueprint.route('/admin/login', methods=['POST'])
def login_admin():
    """Authenticate admin and return a JWT token."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    admin = Admin.query.filter_by(email=email).first()
    if not admin or not bcrypt.check_password_hash(admin.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT token
    token = jwt.encode(
        {'id': str(admin.id), 'exp': datetime.utcnow() + timedelta(hours=1)},  # Convert UUID to string
        SECRET_KEY,
        algorithm="HS256"
    )
    return jsonify({"token": token}), 200


# routes.py
from flask import Blueprint, request, jsonify
import bcrypt
import jwt
import datetime
import re
from .models import db, Admin  # Correct import of db from models.py

admin_bp = Blueprint('admin', __name__)

import bcrypt

@admin_bp.route('/admins', methods=['POST'])
def create_admin():
    data = request.json
    
    try:
        # Extract data from the request
        name = data['name']
        email = data['email']
        password = data['password']
        confirm_password = data.get('confirmPassword', '')
        google_id = data.get('googleId', None)
        photo = data.get('photo', '')

        # Validate required fields
        if not name or not email:
            return jsonify({'message': 'Name and email are required.'}), 400
        
        if '@' not in email or '.' not in email:
            return jsonify({'message': 'Invalid email format.'}), 400

        if not password or not confirm_password:
            return jsonify({'message': 'Password and confirmation are required.'}), 400

        if password != confirm_password:
            return jsonify({'message': 'Passwords do not match.'}), 400

        # Check if password meets the length and special character requirements
        if len(password) < 10:
            return jsonify({'message': 'Password must be at least 10 characters long.'}), 400
        
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            return jsonify({'message': 'Password must contain at least one special character.'}), 400

        # Check if admin already exists
        existing_admin = Admin.query.filter_by(email=email).first()
        if existing_admin:
            return jsonify({'message': 'Email already exists.'}), 409

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create a new admin with the hashed password
        new_admin = Admin(
            google_id=google_id,
            name=name,
            photo=photo,
            email=email,
            password=hashed_password.decode('utf-8')  # Store the hashed password as a string
        )

        db.session.add(new_admin)
        db.session.commit()

        return jsonify(new_admin.to_dict()), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Get All Admins
@admin_bp.route('/admins', methods=['GET'])
def get_all_admins():
    try:
        admins = Admin.query.all()
        return jsonify([admin.to_dict() for admin in admins]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Get Admin by ID
@admin_bp.route('/admins/<uuid:id>', methods=['GET'])  # Ensure 'id' is treated as a UUID
def get_admin_by_id(id):
    try:
        admin = Admin.query.get(id)
        if not admin:
            return jsonify({'error': 'Admin not found'}), 404
        return jsonify(admin.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Update Admin
@admin_bp.route('/admins/<uuid:id>', methods=['PUT'])  # Ensure 'id' is treated as a UUID
def update_admin(id):
    data = request.json
    try:
        admin = Admin.query.get(id)
        if not admin:
            return jsonify({'error': 'Admin not found'}), 404
        admin.name = data.get('name', admin.name)
        admin.photo = data.get('photo', admin.photo)
        admin.email = data.get('email', admin.email)
        admin.password = data.get('password', admin.password) 
        db.session.commit()
        return jsonify(admin.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Delete Admin
@admin_bp.route('/admins/<uuid:id>', methods=['DELETE'])  # Ensure 'id' is treated as a UUID
def delete_admin(id):
    try:
        admin = Admin.query.get(id)
        if not admin:
            return jsonify({'error': 'Admin not found'}), 404
        db.session.delete(admin)
        db.session.commit()
        return jsonify({'message': 'Admin deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Admin routes
from flask import Blueprint, request, jsonify
from .models import db, Admin
import uuid

# Define Blueprint
admin_bp = Blueprint('admin', __name__)

# Create Admin
@admin_bp.route('/admins', methods=['POST'])
def create_admin():
    data = request.json
    try:
        new_admin = Admin(
            google_id=data.get('googleId'),
            name=data['name'],
            photo=data.get('photo', ''),
            email=data['email'],
            password=data['password']  
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
@admin_bp.route('/admins/<id>', methods=['GET'])
def get_admin_by_id(id):
    try:
        admin = Admin.query.get(id)
        if not admin:
            return jsonify({'error': 'Admin not found'}), 404
        return jsonify(admin.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Update Admin
@admin_bp.route('/admins/<id>', methods=['PUT'])
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
@admin_bp.route('/admins/<id>', methods=['DELETE'])
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

# face_login.py
from flask import Blueprint, request, jsonify
import cv2
import numpy as np
import base64
import jwt
import face_recognition
from extensions import db
from user.models import User

face_login_bp = Blueprint('face_login_bp', __name__)
SECRET_KEY = "your-secret-key"

@face_login_bp.route('/user/login-face', methods=['POST'])
def login_face():
    data = request.get_json()
    if 'image' not in data:
        return jsonify({"success": False, "message": "No image provided"}), 400
    
    image_data = data['image'].split(',')[1]
    img_bytes = base64.b64decode(image_data)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    face_locations = face_recognition.face_locations(img)
    if not face_locations:
        return jsonify({"success": False, "message": "No face detected"}), 400

    face_encodings = face_recognition.face_encodings(img, face_locations)

    users = User.query.all()
    for user in users:
        if user.face_embedding is None:
            continue
        known_encoding = np.frombuffer(user.face_embedding, dtype=np.float64)
        matches = face_recognition.compare_faces([known_encoding], face_encodings[0])
        if matches[0]:
            token = jwt.encode({'id': str(user.id)}, SECRET_KEY, algorithm='HS256')
            return jsonify(success=True, token=token)

    return jsonify(success=False, message="Face not recognized")

# utils.py
from flask import request, jsonify
import jwt
from functools import wraps
from user.models import User 

from extensions import db  
import os

SECRET_KEY = os.getenv('DB_SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_token.get('id') 

           
            user = db.session.get(User, user_id)

            if not user:
                return jsonify({"error": "User not found"}), 401

         
            request.current_user = user  

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token is invalid"}), 401

        return f(*args, **kwargs)
    return decorated

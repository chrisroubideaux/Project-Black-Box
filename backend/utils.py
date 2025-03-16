# utils.py
import jwt
from functools import wraps
from flask import request, jsonify
import os
from dotenv import load_dotenv



# Load environment variables
load_dotenv()

# Get secret key from environment variables
SECRET_KEY = os.getenv('DB_SECRET_KEY')

def token_required(f):
    """Verify and decode JWT token."""
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
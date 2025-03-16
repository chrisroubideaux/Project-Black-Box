# app.py
from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS  
from dotenv import load_dotenv
import os
from admin.routes import admin_blueprint
from user.routes import user_blueprint
from videos.routes import video_blueprint 
from user_likes.routes import user_likes_bp 
from history.routes import history_blueprint 
from extensions import db, bcrypt, login_manager
from user.models import User  # ✅ Import User model

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:3000"]
)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('DB_SECRET_KEY')

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)
login_manager.init_app(app)
login_manager.login_view = "user.login"
login_manager.session_protection = "strong"

# ✅ Fix: Add user_loader function
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)  # ✅ Fetch user by UUID

# Register blueprints
app.register_blueprint(admin_blueprint, url_prefix='/admin')
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(video_blueprint, url_prefix='/videos')
app.register_blueprint(user_likes_bp, url_prefix='/user_likes')
app.register_blueprint(history_blueprint, url_prefix='/history')

@app.before_request
def before_request():
    """Handle preflight OPTIONS requests"""
    if request.method == "OPTIONS":
        response = app.make_response("")
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response

@app.route('/')
def hello():
    """Returns a simple greeting."""
    return "Hello World!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)

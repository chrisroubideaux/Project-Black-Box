# app.py
from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS  
from dotenv import load_dotenv
import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from admin.routes import admin_blueprint
from user.routes import user_blueprint
from videos.routes import video_blueprint 
from videos.upload import upload_blueprint
from user_likes.routes import user_likes_bp 
from history.routes import history_blueprint 
from extensions import db, bcrypt, login_manager
from user.models import User

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS
#CORS(
#    app,
#    supports_credentials=True,
#    origins=["http://localhost:3000"]
#)
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:3000"],
    headers=["Content-Type", "x-access-token", "Authorization"] 
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
    return User.query.get(user_id)  

# Register blueprints
app.register_blueprint(admin_blueprint, url_prefix='/admin')
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(video_blueprint, url_prefix='/videos')
app.register_blueprint(upload_blueprint, url_prefix='/videos')


app.register_blueprint(user_likes_bp, url_prefix='/user_likes')
app.register_blueprint(history_blueprint, url_prefix='/history')

with app.app_context():
    print("\nRegistered routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint:50s} {rule.methods} {rule}")


@app.route('/')
def hello():
    """Returns a simple greeting."""
    return "Hello World!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host='0.0.0.0', port=port, debug=True)


#if __name__ == '__main__':
#    with app.app_context():
#        db.create_all()  
#    app.run(debug=True)

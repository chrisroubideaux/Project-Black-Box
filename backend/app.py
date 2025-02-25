# app.py
from flask import Flask
from dotenv import load_dotenv
import os
from extensions import db, bcrypt
from admin.routes import admin_blueprint
from user.routes import user_blueprint
from videos.routes import video_blueprint 

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('DB_SECRET_KEY')

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)

# Register blueprints
app.register_blueprint(admin_blueprint, url_prefix='/admin')
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(video_blueprint, url_prefix='/videos')

@app.route('/')
def hello():
    """Returns a simple greeting."""
    return "Hello World!"


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)

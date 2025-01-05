# App.py

from flask import Flask
import psycopg2
import os
from dotenv import load_dotenv
from flask_migrate import Migrate  # Import Flask-Migrate
from admin.routes import admin_bp
from admin.models import db

# Init Flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Configure the app with the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the db with the app
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Register the admin blueprint
app.register_blueprint(admin_bp, url_prefix='/admin')

# Home Route
@app.route('/')
def home():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT')
        )
        conn.close()
        return "Database connected successfully!"
    except Exception as e:
        return f"Error connecting to the database: {str(e)}"

# Run the app
if __name__ == "__main__":
    app.run(debug=True)

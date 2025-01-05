# App.py
from flask import Flask
import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# PostgreSQL Database Configuration using environment variables
DATABASE_CONFIG = {
    'dbname': os.getenv('DB_NAME'),     
    'user': os.getenv('DB_USER'),       
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),       
    'port': os.getenv('DB_PORT')       
}

# Function to get a database connection
def get_db_connection():
    conn = psycopg2.connect(**DATABASE_CONFIG)
    return conn

# Home Route
@app.route('/')
def home():
    # Test Database Connection
    try:
        conn = get_db_connection()
        conn.close()
        return "Database connected successfully!"
    except Exception as e:
        return f"Error connecting to the database: {str(e)}"

# Run the app
if __name__ == "__main__":
    app.run(debug=True)

# upload.py
from flask import Blueprint, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename

upload_blueprint = Blueprint('upload', __name__)

# --- Config ---
VIDEO_UPLOAD_FOLDER = os.path.join(os.getcwd(), 'videos', 'videos')
THUMBNAIL_UPLOAD_FOLDER = os.path.join(os.getcwd(), 'videos', 'videos', 'images', 'videos')

ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'mov', 'avi'}
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename, allowed_exts):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_exts

# Upload Video
@upload_blueprint.route('/videos/upload', methods=['POST'])
def upload_video_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename, ALLOWED_VIDEO_EXTENSIONS):
        return jsonify({'error': 'Invalid video file type'}), 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(VIDEO_UPLOAD_FOLDER, filename)

    # ✅ Ensure upload folder exists
    os.makedirs(VIDEO_UPLOAD_FOLDER, exist_ok=True)

    file.save(save_path)

    file_url = f"http://localhost:5000/videos/videos/{filename}"
    return jsonify({"message": "Video file uploaded successfully", "file_url": file_url}), 201

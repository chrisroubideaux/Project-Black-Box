import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

VIDEO_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'videos')
THUMBNAIL_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'videos', 'images', 'videos')

ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'mov', 'avi'}
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}

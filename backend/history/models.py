# history/models.py
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from extensions import db
from datetime import datetime

class History(db.Model):
    __tablename__ = 'history'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)  # Use UUID for the primary key
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)  # Ensure UUID for user_id
    video_id = db.Column(UUID(as_uuid=True), db.ForeignKey('videos.id'), nullable=False)  # Assuming video_id is also UUID
    history_at = db.Column(db.DateTime, default=datetime.utcnow)
    watched_at = db.Column(db.DateTime, default=datetime.utcnow)  

    user = db.relationship('User', backref='history')
    video = db.relationship('Video', backref='history')
    
    def __init__(self, user_id, video_id):
        self.user_id = user_id
        self.video_id = video_id
        self.watched_at = datetime.utcnow()  # ✅ Explicitly set watched_at

    def __repr__(self):
        return f'<History {self.user_id} watched video {self.video_id} at {self.history_at}>'

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

    user = db.relationship('User', backref='history')
    video = db.relationship('Video', backref='history')

    def __repr__(self):
        return f'<History {self.user_id} watched video {self.video_id} at {self.history_at}>'


# Queue model for save videos
from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

class Queue(db.Model):
    __tablename__ = 'queues'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    video_id = db.Column(db.String(36), db.ForeignKey('videos.id'), nullable=False)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref='queues')
    video = db.relationship('Video', backref='queues')

    def __repr__(self):
        return f"<Queue {self.user_id} - {self.video_id}>"

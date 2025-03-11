# User likes model
from extensions import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

class UserLikes(db.Model):
    __tablename__ = 'user_likes'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) 
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)  
    video_id = db.Column(UUID(as_uuid=True), db.ForeignKey('videos.id'), nullable=False)
    liked_at = db.Column(db.DateTime, default=datetime.utcnow) 

    user = db.relationship('User', backref=db.backref('likes', lazy=True))
    video = db.relationship('Video', backref=db.backref('liked_by', lazy=True))

    def __repr__(self):
        return f'<UserLikes user_id={self.user_id} video_id={self.video_id}>'


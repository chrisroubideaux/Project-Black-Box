# history/models.py
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from extensions import db
from datetime import datetime

class History(db.Model):
    __tablename__ = 'history'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4) 
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False) 

    # ✅ Add CASCADE DELETE to the video_id
    video_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey('videos.id', ondelete='CASCADE'),  # <-- CASCADE!
        nullable=False
    ) 
    history_at = db.Column(db.DateTime, default=datetime.utcnow)
    watched_at = db.Column(db.DateTime, default=datetime.utcnow)  

    # ✅ Add passive_deletes=True
    user = db.relationship('User', backref='history')
    video = db.relationship('Video', backref=db.backref('histories', passive_deletes=True))
    
    def __init__(self, user_id, video_id):
        self.user_id = user_id
        self.video_id = video_id
        self.watched_at = datetime.utcnow() 

    def __repr__(self):
        return f'<History {self.user_id} watched video {self.video_id} at {self.history_at}>'

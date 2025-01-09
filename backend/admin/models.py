# backend/admin/models.py
from sqlalchemy.dialects.postgresql import UUID
import uuid
from extensions import db  # Import shared db instance

class Admin(db.Model):
    __tablename__ = 'admins'

    # Define the UUID primary key
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    name = db.Column(db.String(100), nullable=False)
    photo = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, google_id, name, photo, email, password):
        self.google_id = google_id
        self.name = name
        self.photo = photo
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            "id": str(self.id),
            "googleId": self.google_id,
            "name": self.name,
            "photo": self.photo,
            "email": self.email,
            # "password": self.password  # Exclude password when sending data back
        }

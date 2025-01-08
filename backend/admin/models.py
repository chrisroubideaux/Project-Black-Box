from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(255), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    photo = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        """Convert object to dictionary for serialization."""
        return {
            "id": self.id,
            "google_id": self.google_id,
            "name": self.name,
            "photo": self.photo,
            "email": self.email
        }

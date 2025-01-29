from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class CafeReview(db.Model):
    __tablename__ = 'cafe_reviews'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    review = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



class Reservation(db.Model):
    __tablename__ = 'cafe_reservation'

    id = db.Column(db.Integer, primary_key=True)
    table_id = db.Column(db.Integer, nullable=False)  # Ссылка на стол
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    reservation_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
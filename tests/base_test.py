import unittest
from database import SessionLocal, get_db
from models import User, Sweet

class BaseTest(unittest.TestCase):
    def setUp(self):
        db = SessionLocal()
        db.query(Sweet).delete()
        db.query(User).delete()
        db.commit()
        db.close()
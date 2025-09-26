from passlib.context import CryptContext
from database import SessionLocal
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
db = SessionLocal()

admin_password = pwd_context.hash("admin123")  # your admin password
admin_user = User(username="admin", password=admin_password, role="admin")
db.add(admin_user)
db.commit()
db.close()

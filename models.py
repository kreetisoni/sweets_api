from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="user")   # user/admin

class Sweet(Base):
    __tablename__ = "sweets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    flavor = Column(String)
    category = Column(String, default="General")
    price = Column(Integer, default=0)
    quantity = Column(Integer, default=0)


from pydantic import BaseModel

# ----------------------
# Users
# ----------------------
class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "user"   # optional

class UserResponse(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        orm_mode = True

# ----------------------
# Sweets
# ----------------------
class SweetCreate(BaseModel):
    name: str
    category: str
    price: int
    quantity: int

class SweetResponse(BaseModel):
    id: int
    name: str
    category: str
    price: int
    quantity: int

    class Config:
        orm_mode = True
        
class RestockRequest(BaseModel):
    quantity: int
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import engine, Base, get_db
from auth import router as auth_router, get_current_user
from models import Sweet, User
from schemas import SweetCreate, SweetResponse, RestockRequest

# Create tables
Base.metadata.create_all(bind=engine)

# App instance
app = FastAPI(title="Sweets API")

# Include auth routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route
@app.get("/")
def root():
    return {"message": "Welcome to Sweets API!"}

# -----------------xxxxx
# CRUD: Sweets lessgooo
# -----------------xxxxx

@app.get("/sweets/search", response_model=List[SweetResponse])
def search_sweets(query: str, db: Session = Depends(get_db)):
    results = db.query(Sweet).filter(Sweet.name.ilike(f"%{query}%")).all()
    return results

@app.get("/sweets", response_model=List[SweetResponse])
def list_sweets(db: Session = Depends(get_db)):
    return db.query(Sweet).all()

@app.get("/sweets/{sweet_id}", response_model=SweetResponse)
def read_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return sweet

# ----------------xxxx
# Create a sweet (any authenticated user can do )
# ---------------xxxx
@app.post("/sweets/add", response_model=SweetResponse)
def add_sweet(
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # any logged-in user
):
    db_sweet = db.query(Sweet).filter(Sweet.name == sweet.name).first()
    if db_sweet:
        raise HTTPException(status_code=400, detail="Sweet already exists")
    new_sweet = Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        quantity=sweet.quantity
    )
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet

# ------------------xxxx
# Update a sweet (any authenticated user can do)
# ------------------xxxx
@app.put("/sweets/{sweet_id}/edit", response_model=SweetResponse)
def edit_sweet(
    sweet_id: int,
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # any logged-in user can do
):
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db_sweet.name = sweet.name
    db_sweet.category = sweet.category
    db_sweet.price = sweet.price
    db_sweet.quantity = sweet.quantity
    db.commit()
    db.refresh(db_sweet)
    return db_sweet


@app.delete("/sweets/{sweet_id}")
def delete_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted successfully"}

@app.post("/sweets/{sweet_id}/purchase")
def purchase_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if sweet.quantity <= 0:
        raise HTTPException(status_code=400, detail="Sweet out of stock")
    sweet.quantity -= 1
    db.commit()
    return {"message": f"{sweet.name} purchased successfully"}

@app.post("/sweets/{sweet_id}/restock")
def restock_sweet(
    sweet_id: int,
    request: RestockRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    sweet.quantity += request.quantity
    db.commit()
    return {"message": f"{sweet.name} restocked successfully"}

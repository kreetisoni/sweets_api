# Sweets_API

A role-based Sweet Shop management system built with **FastAPI** and **React**.

Users can view, search, add, and update sweets, while admins can also delete and restock them. JWT-based authentication ensures secure access.

NOTE: Admin user credentials:
username:admin
password:admin123
---

## Features

**User Actions:**
- List all sweets
- Search sweets by name
- Add new sweets
- Update sweet details
- Purchase sweets

**Admin Actions:**
- Delete sweets
- Restock sweets

**Tech Stack:**
- **Backend:** FastAPI, SQLAlchemy, SQLite, JWT Authentication
- **Frontend:** React
- **Authentication:** JWT + Passlib (bcrypt)

---

## Setup Instructions

### Backend

1. Clone the repository:

```bash
git clone https://github.com/kreetisoni/sweets_api.git
cd sweets_api
```

Run the following command to install all dependencies:

```bash
pip install -r requirements.txt
```
Run the backend server

```bash
uvicorn main:app --reload
```

### Frontend

1. Navigate to the frontend folder in a separate bash terminal:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```


3. Run the development server:
```bash
npm start
```

Frontend will run at: http://localhost:3000



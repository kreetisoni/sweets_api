# Sweets_API

“Get your favourite sweetsies!” — a role-based Sweet Shop management system built with **FastAPI** and **React**.

Users can view, search, add, and update sweets, while admins can also delete and restock them. JWT-based authentication ensures secure access.

NOTE: admin user credentials:
username=admin
password=admin123
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
- **Frontend:** React (optional, in `frontend` folder)
- **Authentication:** JWT + Passlib (bcrypt)

---

## Setup Instructions


1. Save this content in a file named **`requirements.txt`** in your project root.
2. Run the following command to install all dependencies:

```bash
pip install -r requirements.txt
```
### Frontend

1. Navigate to the frontend folder:
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

### Backend

1. Clone the repository:

```bash
git clone https://github.com/kreetisoni/sweets_api.git
cd sweets_api
```

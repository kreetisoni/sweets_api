# Sweets_API

“Get your favourite sweetsies!” — a role-based Sweet Shop management system built with **FastAPI** and **React**.

Users can view, search, add, and update sweets, while admins can also delete and restock them. JWT-based authentication ensures secure access.

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

### Backend

1. Clone the repository:

```bash
git clone https://github.com/kreetisoni/sweets_api.git
cd sweets_api

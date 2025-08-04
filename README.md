# Favorite Movies & TV Shows Web Application

This project is a frontend assessment task built to display a list of favorite movies and TV shows, with authentication and search features.

---

## GitHub Repository

[https://github.com/hebaeissa51/UpSales-Frontend-Assessment](https://github.com/hebaeissa51/UpSales-Frontend-Assessment)

---

## Live Demo

You can check out the live version of the application here:  
🌐 [https://dapper-cat-243646.netlify.app/login](https://dapper-cat-243646.netlify.app/login)

---

## Tech Stack Used

### Frontend:
- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Material UI**
- **PrimeReact**
- **Redux Toolkit**
- **Context API**
- **React Hook Form**

### Backend:
- **JSON Server**

---

## Application Pages

- `Login Page`: Users can login using predefined credentials stored in the database.
- `Home Page`: Displays a list of favorite movies and TV shows.
- `Not Found Page`: Handles invalid routes (404).

---

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/hebaeissa51/UpSales-Frontend-Assessment.git
cd UpSales-Frontend-Assessment
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Run the frontend:

```bash
npm run dev
```

### 4. Run the backend (JSON Server):

```bash
npm run server
```

> The backend runs on `http://localhost:3001`

---

## Authentication Demo

Use the following credentials to log in:

- **Email:** `heba@example.com`  
- **Password:** `123456`

> Authentication is verified against the `db.json` file using JSON Server.

---

## Database (db.json)

The project includes a `db.json` file located in the root directory. It acts as a mock database for users and favorite items.

---

## Available Commands

| Command           | Description                  |
|-------------------|------------------------------|
| `npm install`     | Install all dependencies     |
| `npm run dev`     | Start the Vite frontend app  |
| `npm run server`  | Start the JSON server backend|

---

## Notes

- Make sure both the frontend (`npm run dev`) and backend (`npm run server`) are running simultaneously.
- Backend must be running on port `3001` for login and data fetching to work properly.

---
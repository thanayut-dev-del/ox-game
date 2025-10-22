...existing code...
# OX Game — Full Stack (React + Node.js + MySQL + Docker)

เกม OX แบบตัวอย่าง (React + Vite, Node.js + TypeScript, MySQL) พร้อม Google OAuth, คะแนน และระบบผู้ดูแล

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite + TypeScript + Feature-Sliced Architecture |
| Backend | Node.js + Express + TypeScript + Zod (Validation) |
| Auth | OAuth 2.0 (Google) + express-session |
| Database | MySQL (Docker) |
| ORM | ใช้ mysql2/promise (Query-based) |
| Dev Tool | Docker Compose, Prettier, tsx (auto-reload) |

---

## 🧱 Project Structure

```
ox-game-all-in-one/
├─ docker-compose.yml
├─ server/
│  ├─ src/
│  │  ├─ config/           # Env & constants
│  │  ├─ core/             # Shared errors
│  │  ├─ domain/           # Entity logic & bot AI
│  │  ├─ infra/            # DB & repositories
│  │  ├─ application/      # Business services
│  │  └─ interfaces/       # HTTP controllers, middleware, DTO
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ .env.example
├─ web/
│  ├─ src/
│  │  ├─ app/              # Root layout, router
│  │  ├─ pages/            # login, game, admin
│  │  ├─ widgets/          # reusable UI sections
│  │  ├─ features/         # actions (login, restart, etc.)
│  │  ├─ entities/         # domain entities (user, stats, admin)
│  │  ├─ processes/        # cross-page logic (auth guard)
│  │  └─ shared/           # api, ui, utils
│  ├─ Dockerfile
│  └─ package.json
└─ README.md
```


## ⚙️ Setup & Run (One-command)
1. คัดลอก env:
   cp server/.env.example server/.env
   แล้วปรับค่าใน server/.env (CLIENT_URL, DATABASE_URL, SESSION_SECRET, GOOGLE_*, ADMIN_EMAILS)
2. รันด้วย Docker:
   docker compose up -d --build

## URLs
- API: http://localhost:4000
- Web: http://localhost:5173
- Adminer (DB UI): http://localhost:8080
- MySQL: localhost:3306 (oxuser / oxpass)

### Local run (ไม่ใช้ Docker)
- DB: docker compose up mysql -d
- Backend:
  cd server && npm i && npm run dev
- Frontend:
  cd web && npm i && npm run dev

### Format Code
- ฟอร์แมตโค้ด:
  cd server && npm run format
  cd web && npm run format

## 💡 Tip:  
- ให้ตั้ง ADMIN_EMAILS ใน .env ให้ตรงกับอีเมลที่ล็อกอินเพื่อเข้าฟีเจอร์ admin
...existing code...
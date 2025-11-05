# Store Ratings — Express + MySQL + React

Tech stack: **Express (TypeScript) + Prisma + MySQL + React (Vite)**

## Quick Start
1) MySQL via Docker
```bash
docker run --name mysql8 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=store_ratings -p 3306:3306 -d mysql:8
```
2) Backend
```bash
cp server/.env.example server/.env
cd server
npm install
npx prisma generate
npm run prisma:migrate -- --name init
npm run dev
```
3) Frontend
```bash
cd ../client
npm install
npm run dev
```
Open http://localhost:5173
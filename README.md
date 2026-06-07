# College Discovery Platform

Production-style MVP for the Track B assignment.

## Included
- searchable college discovery with filters and pagination
- college detail pages with overview, courses, placements, and reviews
- side-by-side comparison experience
- rank-aware predictor tool
- saved shortlist persisted per browser session or signed-in user
- authentication with login/signup/logout
- Q&A/discussion board with replies

## Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma schema for PostgreSQL

## Run locally
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open `http://localhost:3000`

## Database
The app ships with a Prisma schema in `prisma/schema.prisma`. Set `DATABASE_URL` for PostgreSQL before running Prisma commands.

## Notes
- The current MVP uses local JSON persistence for users, saved lists, and discussions so it runs immediately.
- The Prisma schema is ready for PostgreSQL if you want to swap the storage layer over later.

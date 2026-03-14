# BikeBazaar (User App)

Indian used bike marketplace built with:

- Next.js App Router
- TailwindCSS + shadcn/ui
- MongoDB + Mongoose
- NextAuth (Google + email/password)
- Cloudinary image uploads

## Run locally

1. Ensure **MongoDB** is running locally.
2. Create env file:

```bash
cd user-app
cp .env.example .env.local
```

3. Update `user-app/.env.local`:

- `MONGODB_URI=mongodb://127.0.0.1:27017/bikebazaar`
- `NEXTAUTH_SECRET=...`
- (optional) Google OAuth keys
- (required for selling with photos) Cloudinary keys

4. Start dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Key routes

- `/` homepage
- `/bikes` browse marketplace
- `/bikes/[id]` bike details
- `/sell` post a listing (requires login)
- `/dashboard` manage listings + wishlist (requires login)
- `/compare?ids=ID1,ID2,ID3` compare bikes
- `/auth/login` login
- `/auth/register` signup

## API routes

- `GET /api/bikes` list bikes (supports filters: `brand`, `city`, `q`, `minPrice`, `maxPrice`, `minYear`, `maxYear`, `fuelType`)
- `POST /api/bikes` create bike (auth required)
- `GET /api/bikes/:id` get bike
- `PATCH /api/bikes/:id` update bike (owner only)
- `DELETE /api/bikes/:id` delete bike (owner only)
- `GET /api/wishlist` list wishlist (auth required)
- `POST /api/wishlist` toggle wishlist (auth required) body: `{ bikeId }`
- `POST /api/upload` upload a base64 image to Cloudinary (auth required)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

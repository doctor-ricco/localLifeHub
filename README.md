# Locals - Connect with Like-minded Hosts Worldwide

![Locals Logo](public/images/logo.png)

Locals is a modern web application that connects travelers with local hosts who share similar interests, creating authentic travel experiences by matching guests with hosts based on common passions, hobbies, and preferences.

## Features

- **Interest-Based Matching**: Our proprietary algorithm calculates compatibility percentages between guests and hosts
- **User Dashboards**: Personalized dashboards for both guests and hosts
- **Profile Management**: Comprehensive profile creation and management system
- **Subscription Options**: Premium features unlocked through flexible subscription plans
- **Responsive Design**: Fully optimized for all devices and screen sizes
- **Real-time Messaging**: Connect directly with your matched hosts
- **Interest Categories**: Discover hosts with shared interests in:
  - Local Cuisine
  - Cultural Events
  - Art & Museums
  - Music & Concerts
  - Local Markets
  - And many more!

## Technology Stack

- **Frontend**: Next.js with React hooks for state management
- **Styling**: Tailwind CSS with custom animations and responsive design
- **Backend**: Next.js API routes with serverless functions
- **Authentication**: NextAuth.js with secure session management
- **Database**: Prisma ORM with PostgreSQL
- **Deployment**: Vercel for CI/CD pipeline and hosting

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/locals.git
   cd locals
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Deployment

This project is configured for seamless deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/yourusername/locals](https://github.com/yourusername/locals)

---

Built with passion and Next.js ⚡

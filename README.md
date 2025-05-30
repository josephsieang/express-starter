# Express Starter

A minimal Express.js starter template with TypeScript, esbuild, Prettier, and integrated PostgreSQL database using Prisma ORM. Below are the essential details and scripts to get started.

---

## Features

- Express.js server with TypeScript
- Fast bundling with esbuild
- Prettier for code formatting
- Simple, modular project structure
- Environment configuration support
- PostgreSQL database integration with Prisma ORM

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: Version `v22.0.0` or higher
- **npm**: Version `10.5.1` or higher
- **Homebrew** (for macOS): [Install Homebrew](https://brew.sh/)
- **PostgreSQL**: Install via Homebrew

To verify your setup, run:

```bash
node -v
npm -v
```

---

## Database Setup (PostgreSQL)

1. **Install PostgreSQL (macOS):**

   ```bash
   brew install postgresql
   brew services start postgresql
   ```

2. **Create your database:**

   ```bash
   createdb express-starter
   ```

3. **Configure your database connection:**

   - Open the `.env` file in the project root.
   - Set the `DATABASE_URL` variable. Example:
     ```env
     DATABASE_URL="postgresql://<your-username>@localhost:5432/express-starter"
     ```

4. **Define your data model:**

   - Edit `prisma/schema.prisma` to define your models. Example:
     ```prisma
     model User {
       id    Int    @id @default(autoincrement())
       email String @unique
       name  String
     }
     ```

5. **Create database tables with Prisma Migrate:**

   ```bash
   npx prisma migrate dev --name init
   ```

6. **View and manage your database:**
   - With Prisma Studio:
     ```bash
     npx prisma studio
     ```
   - Or use a GUI like [Postico 2](https://eggerapps.at/postico2/):
     1. Download and install Postico 2 from the official website.
     2. Launch Postico 2 and connect to your local PostgreSQL database using the same credentials as in your `.env` file.
     3. You can now browse and manage your database visually.

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd express-starter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## Scripts

- `npm run dev`: Start the development server using `scripts/dev.mjs` (with hot reloading if configured)
- `npm run build`: Bundle the application using esbuild
- `npm start`: Run the bundled server (production)
- `npm run format`: Format all TypeScript files in the `src` directory using Prettier
- `npx prisma migrate dev --name <name>`: Run a new database migration
- `npx prisma studio`: Open Prisma Studio to view and edit your database

---

## Project Structure

```
/express-starter
├── package.json
├── scripts/
│   └── dev.mjs           # Development server entry
├── src/
│   ├── app.ts            # Express app setup
│   ├── server.ts         # Server bootstrap
│   ├── config/
│   │   └── env.ts        # Environment variable config
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middleware (logger, error handler)
│   ├── routes/           # Route definitions
│   ├── services/         # Business logic/services
│   ├── lib/
│   │   └── prisma.ts     # Prisma client instance
│   └── utils/            # Utility functions
├── prisma/
│   ├── schema.prisma     # Prisma data model
│   └── migrations/       # Database migrations
└── ...
```

---

## Formatting & Prettier

- The project uses Prettier for code formatting, with rules defined in `.prettier.config.js`.
- To format code manually, run:

  ```bash
  npm run format
  ```

- To ensure VS Code uses the same rules:
  1. Install the `esbenp.prettier-vscode` extension.
  2. Open VS Code **Settings**.
  3. Search for `Prettier: Config Path` and set it to `.prettier.config.js`.

---

## Environment Configuration

- Environment variables are managed in `src/config/env.ts` and the `.env` file.
- Update these files to add or change environment-specific settings.

---

## Analogy: Express vs Angular Architecture

| Concept       | Express (Backend)            | Angular (Frontend)             | Purpose                                  |
| ------------- | ---------------------------- | ------------------------------ | ---------------------------------------- |
| Route         | `app.get('/api/hello', ...)` | `HttpClient.get('/api/hello')` | Trigger a call or handler                |
| Controller    | `hello.controller.ts`        | 🚫 (No direct equivalent)      | Handle HTTP request logic                |
| Service       | `hello.service.ts`           | Service                        | Core logic / abstraction                 |
| Middleware    | `logger.middleware.ts`       | Interceptor                    | Reusable logic between request & handler |
| Error Handler | `error.middleware.ts`        | Interceptor                    | Handle errors uniformly                  |

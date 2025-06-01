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
│   ├── controllers/      # Route controllers (hello, user)
│   ├── middlewares/      # Custom middleware (logger, error handler, auth, validation)
│   │   ├── logger.middleware.ts   # Request logging middleware
│   │   ├── error.middleware.ts    # Error handling middleware
│   │   ├── bearer-auth.middleware.ts # Bearer token authentication middleware
│   │   └── validate.ts            # Request validation middleware
│   ├── routes/           # Route definitions
│   │   ├── hello.route.ts
│   │   ├── user.route.ts
│   │   └── test.route.ts
│   ├── services/         # Business logic/services (hello, user)
│   ├── lib/
│   │   └── prisma.ts     # Prisma client instance
│   ├── utils/            # Utility functions
│   │   └── api-error.ts  # API error helper
│   └── validators/       # Request validation schemas
│       └── user.schema.ts
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

## API Documentation (Swagger)

Interactive API documentation is available via **Swagger UI** at:

```
GET /api/docs
```

- Open [http://localhost:3001/api-docs](http://localhost:3001/api-docs) in your browser after starting the server.
- The documentation is generated from your route and model definitions.
- You can try out endpoints directly from the Swagger UI.

### Why We Need Explicit Swagger Setup

This project uses a custom Swagger UI setup in `src/docs/swagger-setup.ts` instead of the standard `swagger-ui-express` configuration. Here's why:

#### The Problem: esbuild Bundling Issues

**Standard Setup (Doesn't Work):**

```typescript
// This should work but fails due to esbuild
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

**The Issue:**

- **esbuild bundles everything** into a single file (`dist/server.js`)
- **`__dirname` changes** - Points to `dist/` instead of the original source location
- **Static asset paths break** - `swagger-ui-express` can't find its CSS/JS files because they're still in `node_modules/swagger-ui-dist` but the bundle expects them relative to the new `__dirname`
- **JavaScript files return HTML** - Instead of serving `.js` files, the server returns HTML error pages, causing "Unexpected token '<'" errors

#### Our Solution:

```typescript
// 1. Serve the swagger spec as JSON first
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// 2. Explicitly serve static assets from the correct location
app.use('/api-docs', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));

// 3. Setup Swagger UI middleware and interface
app.use('/api-docs', swaggerUi.serve);
app.get(
  '/api-docs',
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { url: '/api-docs/swagger.json' }
  })
);
```

**Why Each Part is Needed:**

1. **Manual swagger.json endpoint with explicit Content-Type** - The critical part is `res.setHeader('Content-Type', 'application/json')`. Without this explicit header, the swagger spec might be served with incorrect content type (like `text/html`), causing Swagger UI to fail parsing the API specification. `swagger-ui-express` normally handles this automatically, but esbuild bundling can interfere with the library's internal content-type detection.

2. **Manual static serving** - We explicitly tell Express where to find Swagger UI assets (CSS, JS files) since esbuild changes the path resolution.

3. **Custom swaggerOptions.url** - We point Swagger UI to our manually created JSON endpoint instead of relying on the library's automatic detection.

**Why This Works:**

- **Manual static serving** - We explicitly tell Express where to find Swagger UI assets
- **Correct path resolution** - `../node_modules/swagger-ui-dist` correctly resolves from `dist/` back to `node_modules/`
- **Proper content types** - JavaScript files serve as `text/javascript` instead of HTML
- **Guaranteed JSON endpoint** - Swagger UI can always fetch the API spec from our explicit endpoint

Our explicit setup is the cleanest solution that maintains fast esbuild compilation while ensuring Swagger UI works correctly.

---

## Analogy: Express vs Angular Architecture

| Concept       | Express (Backend)            | Angular (Frontend)             | Purpose                                  |
| ------------- | ---------------------------- | ------------------------------ | ---------------------------------------- |
| Route         | `app.get('/api/hello', ...)` | `HttpClient.get('/api/hello')` | Trigger a call or handler                |
| Controller    | `hello.controller.ts`        | 🚫 (No direct equivalent)      | Handle HTTP request logic                |
| Service       | `hello.service.ts`           | Service                        | Core logic / abstraction                 |
| Middleware    | `logger.middleware.ts`       | Interceptor                    | Reusable logic between request & handler |
| Error Handler | `error.middleware.ts`        | Interceptor                    | Handle errors uniformly                  |

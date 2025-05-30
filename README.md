# Express Starter

A minimal Express.js starter template with TypeScript, esbuild, and Prettier integration. Below are the essential details and scripts to get started.

---

## Features

- Express.js server with TypeScript
- Fast bundling with esbuild
- Prettier for code formatting
- Simple, modular project structure
- Environment configuration support

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: Version `v22.0.0` or higher
- **npm**: Version `10.5.1` or higher

To verify your setup, run:

```bash
node -v
npm -v
```

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
│   └── utils/            # Utility functions
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

- Environment variables are managed in `src/config/env.ts`.
- Read environment variables from a `.env` file using `dotenv` or similar libraries.
- Update `.env` file with your configuration settings. Then update `src/config/env.ts` to load these variables.

---

## Analogy: Express vs Angular Architecture

| Concept       | Express (Backend)            | Angular (Frontend)             | Purpose                                  |
| ------------- | ---------------------------- | ------------------------------ | ---------------------------------------- |
| Route         | `app.get('/api/hello', ...)` | `HttpClient.get('/api/hello')` | Trigger a call or handler                |
| Controller    | `hello.controller.ts`        | 🚫 (No direct equivalent)      | Handle HTTP request logic                |
| Service       | `hello.service.ts`           | Service                        | Core logic / abstraction                 |
| Middleware    | `logger.middleware.ts`       | Interceptor                    | Reusable logic between request & handler |
| Error Handler | `error.middleware.ts`        | Interceptor                    | Handle errors uniformly                  |

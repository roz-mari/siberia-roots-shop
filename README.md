# Siberia Roots Shop

Multilingual online store (Russian, English, Spanish) for Siberian matryoshkas and souvenirs. A React and TypeScript storefront talks to a Spring Boot REST API with JWT authentication, a shopping cart, orders and email notifications.

**Live demo:** https://siberia-roots-shop.vercel.app
The backend runs on a free Render instance, so the first request after a pause can take up to a minute.

## How this project was built

The first version of the frontend UI (layout and shadcn/ui components) was generated with [Lovable](https://lovable.dev). On top of it I built:

- the **Spring Boot backend**: product catalog API with filters, JWT authentication, orders, contact form with email, global error handling
- the **connection between frontend and backend**: typed API client, React Query hooks, CORS and environment configuration
- **application state**: cart, authentication and language contexts with `localStorage` persistence
- **tests**: 34 backend tests (JUnit, Mockito, JaCoCo) and frontend tests (Vitest, React Testing Library) running in GitHub Actions
- **infrastructure**: Docker Compose, deployment to Vercel and Render

More details on the challenges and how I solved them: [PROJECT_REPORT.md](PROJECT_REPORT.md).

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router, React Query, Tailwind CSS, shadcn/ui |
| Backend | Java 17, Spring Boot 3.3, JWT, Spring Mail, Bean Validation |
| Testing | JUnit 5, Mockito, JaCoCo, Vitest, React Testing Library |
| Infrastructure | Docker, Docker Compose, Vercel, Render, GitHub Actions |

## Prerequisites

- Node.js 18+
- npm (bundled with Node)
- Java 17+
- Maven 3.9+

## Backend (Spring Boot)

The backend lives in `backend/` and exposes a simple catalog API.

```sh
# install dependencies & run the API (port 8090 by default)
mvn -f backend/pom.xml spring-boot:run
```

### API Endpoints

| Method | Path                      | Description                                    |
| ------ | ------------------------- | ---------------------------------------------- |
| GET    | `/api/products`           | List all catalog products                      |
| GET    | `/api/products/:id`       | Get a single product by identifier             |
| POST   | `/api/contact`            | Send contact form message                      |
| POST   | `/api/auth/register`      | Register new user                              |
| POST   | `/api/auth/login`         | Login and receive auth token                   |
| GET    | `/api/auth/verify`        | Verify email by token (if enabled)             |
| GET    | `/actuator/contact-diagnostics` | Check email configuration (diagnostics)    |

Swagger UI is available at `http://localhost:8090/api/swagger` once the service is running.

## Frontend (Vite + React)

The storefront lives in the repository root (`src/`).

```sh
npm install
npm run dev            # runs on http://localhost:8080
```

### Environment Variables

#### Frontend Variables

Create a `.env.local` (or reuse `.env`) in the project root:

```
VITE_API_BASE_URL=http://localhost:8090
```

The value should point to the running backend.

#### Backend Variables

Configure the following environment variables for production (e.g., on Render):

**Email Configuration (SMTP):**
- `SMTP_HOST` - SMTP server (e.g., `smtp.gmail.com`)
- `SMTP_PORT` - SMTP port (e.g., `465` for SSL or `587` for STARTTLS)
- `SMTP_USERNAME` - Your email address
- `SMTP_PASSWORD` - App Password (for Gmail, use App Password, not regular password)
- `SMTP_AUTH` - Set to `true`
- `SMTP_SSL` - Set to `true` for port 465
- `SMTP_STARTTLS` - Set to `true` for port 587
- `MAIL_FROM` - Sender email address
- `MAIL_TO` - Recipient email address for contact form (optional, defaults to `MAIL_FROM`)
- `APP_CONTACT_STRICT` - Set to `true` to return 500 on email failures (default: `false`)

**Application:**
- `PORT` - Server port (default: `8090`)
- `APP_BASE_URL` - Application base URL for email links
- `AUTH_EMAIL_VERIFICATION` - Enable email verification (default: `false`)

## Development Workflow

1. Start the backend (`mvn -f backend/pom.xml spring-boot:run`).
2. Start the frontend (`npm run dev`).
3. Visit `http://localhost:8080` to browse the storefront.

React Query caches catalog data automatically. If you change backend data, refresh the browser to refetch.

## Testing

### Backend Tests

```sh
mvn -f backend/pom.xml test
```

**Test Coverage:**
- Unit tests for services (`ProductService`, `AuthService`, `ContactService`)
- Integration tests for controllers (`ProductController`, `AuthController`, `ContactController`)
- Coverage report: `backend/target/site/jacoco/index.html`

**Run with coverage report:**
```sh
mvn -f backend/pom.xml clean test jacoco:report
# View: backend/target/site/jacoco/index.html
```

### Frontend Tests

```sh
npm test            # run once
npm run test:watch  # watch mode
```

Vitest and React Testing Library cover the cart and language contexts, the `ProductCard` component and the translation helper. The tests also run in GitHub Actions on every push and pull request.

## Docker

Build and run both services via Docker Compose:

```sh
docker compose up --build
```

- Frontend: http://localhost:8080  
- Backend API & Swagger: http://localhost:8090/api/swagger

To stop the stack: `docker compose down`

### Standalone Images

```sh
# backend
docker build -t siberia-roots-backend ./backend

# frontend (override API URL if needed)
docker build -t siberia-roots-frontend --build-arg VITE_API_BASE_URL=https://your-api ./ 
```

## Production Build (without Docker)

```sh
# build backend uber-jar
mvn -f backend/pom.xml package
java -jar backend/target/*.jar

# build static frontend
npm run build
npm run preview
```

## Features

- 🌍 **Multilingual Support**: Russian, English, and Spanish
- 🛒 **Shopping Cart**: Add items, manage quantities, view totals
- 👤 **User Registration & Login**: In-memory authentication (demo)
- 📧 **Contact Form**: Send messages with email notifications
- 📦 **Product Catalog**: RESTful API with localized product data
- 🎨 **Modern UI**: React with Tailwind CSS and shadcn/ui components
- 🐳 **Docker Support**: Full Docker Compose setup
- ✅ **Tests**: Backend unit and integration tests with coverage, frontend tests with Vitest
- 🔒 **Error Handling**: Structured exception handling with global handler

## Project Structure

```
backend/
  src/main/java/com/siberiaroots/shop/
    api/              # REST controllers (Product, Auth, Contact)
    auth/             # Authentication service & DTOs
    catalog/          # Product catalog & service
    contact/          # Contact form service
    config/           # CORS & web configuration
    exception/        # Custom exceptions & global handler
  src/test/java/      # Unit & integration tests
  src/main/resources/
    application.properties

src/
  components/         # React components (Header, ProductCard, Footer)
  contexts/           # React contexts (Language, Cart, Auth)
  hooks/              # Custom hooks (useProducts)
  lib/                # API client & utilities
  pages/              # Page components (Home, Products, Cart, etc.)
  types/              # TypeScript type definitions
  data/               # Static data (product images mapping)
```

## Updating Catalog Data

- Catalog data lives in `backend/src/main/java/com/siberiaroots/shop/catalog/ProductCatalog.java`.
- The frontend resolves product imagery via `imageKey` in `src/data/product-images.ts`. When you add a new product, import the asset and map the key.

## Deployment

### Render (Backend)

1. Connect your GitHub repository
2. Set **Root Directory** to `backend`
3. Build command: `mvn clean package -DskipTests` (skip tests for faster deployment)
4. Start command: `java -jar target/*.jar`
5. Set environment variables (see **Backend Variables** above)
6. **Important:** On free tier, build timeout is limited. If build times out:
   - Use `mvn clean package -DskipTests` instead of running tests
   - Consider upgrading to paid plan for longer build times
7. Deploy!

### Vercel (Frontend)

1. Connect your GitHub repository
2. Root directory: `/` (repository root)
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`
6. Deploy!

**Note:** The frontend uses HashRouter to avoid 404s on refresh. For BrowserRouter, configure Vercel rewrites in `vercel.json`.

## Troubleshooting

### Frontend Issues

- **`npm run lint` fails:** run `npm install` first, then re-run lint.
- **Frontend cannot reach the API in Docker:** verify `VITE_API_BASE_URL` or the build arg. In `docker-compose.yml` it defaults to `http://backend:8090`.
- **404 on page refresh:** Using HashRouter prevents this. If using BrowserRouter, ensure server rewrites are configured.

### Backend Issues

- **Maven cannot download dependencies:** ensure write permissions to `~/.m2`; in CI set a custom Maven repo directory via `MAVEN_OPTS`.
- **Contact form emails not arriving:**
  - Check logs on Render for SMTP errors
  - Verify `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD` are set correctly
  - For Gmail: use an **App Password**, not your regular password
  - Check email diagnostics: `https://your-backend.onrender.com/actuator/contact-diagnostics`
  - Ensure `MAIL_TO` is set if you want messages forwarded to a specific address
  - By default, contact form returns `202 Accepted` even if email fails (soft mode); check logs for details
- **Authentication not working:** Verify `AUTH_EMAIL_VERIFICATION` is set correctly. Email verification is optional and disabled by default.

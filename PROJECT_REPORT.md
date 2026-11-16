# Project Report: Siberia Roots Shop

Siberia Roots Shop is an online store for Siberian matryoshkas and souvenirs with a multilingual interface (Russian, English, Spanish). It is built with React and TypeScript on the frontend and Spring Boot on the backend, and it covers the full cycle: development, testing, containerisation and deployment.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router, React Query, Tailwind CSS, shadcn/ui |
| Backend | Java 17, Spring Boot 3.3, Maven, JWT (jjwt), Spring Mail, Bean Validation |
| Testing | JUnit 5, Mockito, AssertJ, JaCoCo (backend); Vitest, React Testing Library (frontend) |
| Infrastructure | Docker, Docker Compose, Vercel (frontend), Render (backend), GitHub Actions |

## Main Challenges and Solutions

### 1. Connecting the frontend to the backend

| Challenge | Solution |
| --- | --- |
| The browser blocked requests between different domains (CORS) | Added a `WebConfig` that allows requests from localhost, Render and Vercel |
| Different API URLs for local development, Docker and production | Configuration through `VITE_API_BASE_URL` in `.env.local` locally and in Vercel settings in production |
| `202 Accepted` and `204 No Content` responses have no body and broke JSON parsing | The API client handles empty responses explicitly |
| Refreshing a deep route on Vercel returned 404 | Switched from `BrowserRouter` to `HashRouter`, so routing does not depend on server rewrites |

### 2. Deployment and infrastructure

| Challenge | Solution |
| --- | --- |
| The Maven build with tests exceeded the Render free tier time limit | Deploy with `mvn clean package -DskipTests`; tests run locally and in CI |
| Free Render instances sleep after 15 minutes without traffic | A GitHub Actions workflow pings the service every 10 minutes |
| Gmail SMTP rejected normal passwords | Switched to an App Password and added a diagnostics endpoint |
| SMTP failures broke the contact form | Soft mode: the form returns `202 Accepted` and logs the error; a strict mode is available for production |

### 3. Authentication and security

| Challenge | Solution |
| --- | --- |
| The first version used simple UUID tokens stored in memory | Replaced them with signed JWT tokens (HMAC SHA256) |
| Every protected request needs token validation | A `JwtFilter` reads `Authorization: Bearer <token>`, validates it and passes the user to the request |
| Passwords must not be stored in plain text | Passwords are hashed with bcrypt |

## Features

### Backend API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/products` | Product list with filters by category and price |
| GET | `/api/products/{id}` | Single product |
| POST | `/api/auth/register` | Registration with validation and a JWT in the response |
| POST | `/api/auth/login` | Login, returns a JWT |
| GET | `/api/auth/verify` | Optional email verification |
| POST | `/api/orders` | Create an order (authenticated) |
| GET | `/api/orders`, `/api/orders/{id}` | Order history and order details (authenticated) |
| POST | `/api/contact` | Contact form with an email to the shop and a confirmation to the sender |
| GET | `/actuator/health`, `/actuator/contact-diagnostics` | Health check and email diagnostics |
| GET | `/api/swagger` | Swagger UI |

A global exception handler returns consistent error responses (404 for missing products, users and orders, 409 for a duplicate email, 401 for wrong credentials, 400 for invalid input or tokens).

### Frontend

- Pages: home, catalog, product details, cart, checkout, profile with order history, registration, contact, 404
- Language switcher (RU, EN, ES) through `LanguageContext`; product data is localised by the backend
- Cart with quantities, totals and persistence in `localStorage` (`CartContext`)
- Authentication state with the JWT stored in `localStorage` (`AuthContext`)
- Typed API client that adds the token to requests, plus React Query hooks with caching, loading skeletons and error states
- Form validation and toast notifications

## Testing

**Backend:** 34 tests, all passing, with JaCoCo coverage reports.

- Unit tests: `ProductService`, `AuthService`, `ContactService`
- Integration tests: `ProductController`, `AuthController`, `ContactController` (success cases, validation errors, 401, 404 and 409 responses)

**Frontend:** Vitest and React Testing Library, run in GitHub Actions on every push and pull request.

- `CartContext`: adding items, merging quantities, totals, removing items, restoring from `localStorage`
- `LanguageContext`: default language, switching, fallback to English, error outside the provider
- `ProductCard`: rendering in Russian and Spanish, fallback when a translation is missing, accessible image text
- `localize` helper for product translations

## Deployment

- Frontend on Vercel, built from the repository root
- Backend on Render, built from `backend/`
- Docker: multi stage builds for both services (Nginx for the frontend, JRE for the backend) and `docker-compose.yml` to run them together

## Result

A working multilingual online store with JWT authentication, a cart, orders, a contact form with email, automated tests on both backend and frontend, and a production deployment.

# Siberia Roots Shop

Modern React storefront for Siberian matryoshkas backed by a Java/Spring Boot API.

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

| Method | Path               | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/api/products`    | List all catalog products         |
| GET    | `/api/products/:id`| Get a single product by identifier|

Swagger UI is available at `http://localhost:8090/api/swagger` once the service is running.

## Frontend (Vite + React)

The storefront lives in the repository root (`src/`).

```sh
npm install
npm run dev            # runs on http://localhost:8080
```

### Environment Variables

Create a `.env.local` (or reuse `.env`) in the project root if you need to override defaults:

```
VITE_API_BASE_URL=http://localhost:8090
```

The value should point to the running backend.

## Development Workflow

1. Start the backend (`mvn -f backend/pom.xml spring-boot:run`).
2. Start the frontend (`npm run dev`).
3. Visit `http://localhost:8080` to browse the storefront.

React Query caches catalog data automatically. If you change backend data, refresh the browser to refetch.

## Testing

- Backend: `mvn -f backend/pom.xml test`
  - Coverage includes the integration suite `ProductControllerTest`, which verifies `/api/products` and `/api/products/{id}`.
- Frontend: no tests yet; Vitest or Playwright are recommended when you add them.

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

## Project Structure

```
backend/        # Spring Boot application (API and tests)
src/            # Vite/React frontend
docker-compose.yml
Dockerfile      # production frontend build (Nginx)
```

## Updating Catalog Data

- Catalog data lives in `backend/src/main/java/com/siberiaroots/shop/catalog/ProductCatalog.java`.
- The frontend resolves product imagery via `imageKey` in `src/data/product-images.ts`. When you add a new product, import the asset and map the key.

## Troubleshooting

- **`npm run lint` fails:** run `npm install` first, then re-run lint.
- **Maven cannot download dependencies:** ensure write permissions to `~/.m2`; in CI set a custom Maven repo directory via `MAVEN_OPTS`.
- **Frontend cannot reach the API in Docker:** verify `VITE_API_BASE_URL` or the build arg. In `docker-compose.yml` it defaults to `http://backend:8090`.

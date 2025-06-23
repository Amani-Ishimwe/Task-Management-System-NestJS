# Task Management API

A RESTful API for managing tasks and users, built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and PostgreSQL. The API supports user registration, authentication (JWT), and CRUD operations for tasks.

## Features
- User registration and login with JWT authentication
- Secure password hashing (argon2)
- CRUD operations for tasks (create, read, update, delete)
- Task status management (Pending, In Progress, Completed, Cancelled)
- Swagger API documentation

## Technology Stack
- **Backend Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (Passport.js)
- **Validation:** class-validator, class-transformer
- **API Docs:** Swagger

## Database Schema
Defined in `prisma/schema.prisma`:

```
model User {
  id        String   @id @default(uuid())
  firstName String
  lastName  String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}

model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(PENDING)
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  userId      String
  user        User       @relation(fields: [userId], references: [id])
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL database

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd task_management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and set your `DATABASE_URL` and `JWT_SECRET`.
4. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   # or for development
   npx prisma migrate dev
   ```

### Running the Application
- **Development:**
  ```bash
  npm run start:dev
  ```
- **Production:**
  ```bash
  npm run build
  npm run start:prod
  ```
- **Testing:**
  ```bash
  npm run test
  npm run test:e2e
  npm run test:cov
  ```

### API Documentation
- Swagger UI is available at: `http://localhost:3000/api/docs`

## API Endpoints

### User
- **Register:** `POST /user/register`
  - Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
- **Login:** `POST /user/login`
  - Body:
    ```json
    {
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
  - Response: `{ user: { ... }, token: "JWT_TOKEN" }`

### Tasks (Authenticated)
All task endpoints require a Bearer JWT token in the `Authorization` header.

- **Create Task:** `POST /tasks/create`
  - Body:
    ```json
    {
      "title": "Task Title",
      "description": "Optional description",
      "status": "PENDING",
      "dueDate": "2024-07-01T12:00:00Z"
    }
    ```
- **Get All Tasks:** `GET /tasks`
- **Get Task by ID:** `GET /tasks/:id`
- **Update Task:** `PATCH /tasks/:id`
  - Body: (any subset of create fields)
- **Delete Task:** `DELETE /tasks/:id`

### Authentication
- Uses JWT Bearer tokens. Obtain a token via `/user/login` and include it in the `Authorization` header for protected endpoints:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing JWT tokens

## License
This project is UNLICENSED (see `package.json`).

---

For more details, see the Swagger docs or explore the codebase.

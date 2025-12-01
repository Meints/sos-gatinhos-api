# Better Auth Integration Guide

This project uses Better Auth for authentication, integrated with NestJS following Clean Architecture principles.

## Setup

### 1. Environment Variables

Make sure you have a `.env` file with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sos_gatinhos"
BETTER_AUTH_SECRET="your-secret-key-here"  # Generate a random secret
BETTER_AUTH_URL="http://localhost:3333"    # Your app URL
```

### 2. Generate Prisma Client

Before running the application, generate the Prisma client:

```bash
npx prisma generate
```

### 3. Database Migration

Run migrations to set up the database schema (including Better Auth tables):

```bash
npx prisma migrate dev
```

## Architecture

Better Auth is integrated following Clean Architecture:

- **Infrastructure Layer** (`src/infrastructure/auth/auth.service.ts`):
  - Creates and manages the Better Auth instance
  - Uses Prisma adapter for database operations

- **Presentation Layer** (`src/presentation/modules/auth.module.ts`):
  - Wires up Better Auth with NestJS using `@thallesp/nestjs-better-auth`
  - Provides global authentication guard

## Usage

### Protected Routes

By default, all routes are protected. Use the `@Session()` decorator to access user session:

```typescript
import { Controller, Get } from '@nestjs/common';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UserController {
  @Get('me')
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }
}
```

### Public Routes

Use `@AllowAnonymous()` to allow unauthenticated access:

```typescript
@Get('public')
@AllowAnonymous()
async getPublic() {
  return { message: 'Public route' };
}
```

### Optional Authentication

Use `@OptionalAuth()` when authentication is optional:

```typescript
@Get('optional')
@OptionalAuth()
async getOptional(@Session() session: UserSession) {
  return { authenticated: !!session };
}
```

## Better Auth Routes

Better Auth automatically exposes authentication routes at `/api/auth/*`:

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session

## Configuration

Auth configuration is in `src/infrastructure/auth/auth.service.ts`:

- **Session Duration**: 7 days
- **Session Update Age**: 1 day
- **Email/Password**: Enabled

You can extend this configuration to add OAuth providers, two-factor authentication, etc.

## Testing Authentication

1. **Register a user**:
```bash
curl -X POST http://localhost:3333/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

2. **Sign in**:
```bash
curl -X POST http://localhost:3333/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

3. **Access protected route** (use the session token from sign-in):
```bash
curl http://localhost:3333/users/me \
  -H "Cookie: better-auth.session_token=YOUR_SESSION_TOKEN"
```

## Notes

- The body parser is configured in `main.ts` to allow Better Auth to handle raw request bodies
- Better Auth uses cookies for session management by default
- All authentication logic is handled by Better Auth, keeping your domain layer clean


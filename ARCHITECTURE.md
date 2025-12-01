# Clean Architecture & DDD Structure

This project follows **Clean Architecture** principles with **Domain-Driven Design (DDD)** patterns.

## Directory Structure

```
src/
├── domain/                    # Domain Layer (Business Logic)
│   ├── entities/             # Domain entities (business objects)
│   │   ├── cat.entity.ts
│   │   └── user.entity.ts
│   └── repositories/         # Repository interfaces (abstractions)
│       └── cat.repository.interface.ts
│
├── application/              # Application Layer (Use Cases)
│   ├── use-cases/           # Application use cases
│   │   └── cat/
│   │       ├── create-cat.use-case.ts
│   │       ├── get-cat.use-case.ts
│   │       ├── list-cats.use-case.ts
│   │       ├── update-cat.use-case.ts
│   │       └── delete-cat.use-case.ts
│   └── dto/                  # Data Transfer Objects
│       ├── create-cat.dto.ts
│       └── update-cat.dto.ts
│
├── infrastructure/           # Infrastructure Layer (External Concerns)
│   ├── repositories/        # Repository implementations
│   │   └── prisma-cat.repository.ts
│   └── auth/                 # Auth infrastructure
│       └── auth.service.ts
│
└── presentation/            # Presentation Layer (API/UI)
    ├── controllers/          # REST controllers
    │   ├── cat.controller.ts
    │   └── user.controller.ts
    └── modules/              # NestJS modules
        ├── auth.module.ts
        ├── cat.module.ts
        └── user.module.ts
```

## Layer Responsibilities

### Domain Layer
- **Entities**: Core business objects with business logic
- **Repository Interfaces**: Abstractions for data access (no implementation details)
- **Pure business logic**, no dependencies on frameworks or external libraries

### Application Layer
- **Use Cases**: Orchestrate domain entities to fulfill business requirements
- **DTOs**: Data structures for input/output
- **Depends only on Domain layer**

### Infrastructure Layer
- **Repository Implementations**: Concrete implementations of domain repository interfaces
- **External Services**: Database, APIs, file system, etc.
- **Implements Domain interfaces**

### Presentation Layer
- **Controllers**: Handle HTTP requests/responses
- **Modules**: Wire up dependencies using dependency injection
- **Depends on Application and Infrastructure layers**

## Dependency Flow

```
Presentation → Application → Domain
     ↓              ↓
Infrastructure → Domain
```

**Key Rule**: Dependencies point inward. Outer layers depend on inner layers, never the reverse.

## Better Auth Integration

Better Auth is integrated following Clean Architecture:

- **Infrastructure**: `AuthService` creates and manages the Better Auth instance
- **Presentation**: `AuthModule` wires up Better Auth with NestJS
- **Controllers**: Use `@Session()`, `@AllowAnonymous()`, `@OptionalAuth()` decorators

## Example: Adding a New Feature

1. **Domain**: Create entity and repository interface
2. **Application**: Create use cases and DTOs
3. **Infrastructure**: Implement repository using Prisma
4. **Presentation**: Create controller and module

This ensures separation of concerns and testability at each layer.


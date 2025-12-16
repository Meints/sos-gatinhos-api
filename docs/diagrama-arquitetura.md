# Diagrama de Arquitetura - SOS Gatinhos API

## Arquitetura em Camadas (Clean Architecture)

```mermaid
graph TB
    subgraph "Presentation Layer"
        CC[CatController]
        AC[AuthController]
        DTO1[CreateCatDto]
        DTO2[UpdateCatDto]
    end
    
    subgraph "Application Layer"
        UC1[CreateCatUseCase]
        UC2[GetCatUseCase]
        UC3[ListCatsUseCase]
        UC4[UpdateCatUseCase]
        UC5[DeleteCatUseCase]
        UC6[CreateUserUseCase]
    end
    
    subgraph "Domain Layer"
        CE[Cat Entity]
        RI[CatRepository Interface]
    end
    
    subgraph "Infrastructure Layer"
        PR[PrismaCatRepository]
        PS[PrismaService]
        AF[AuthFactory]
        AM[AuthModule]
        PM[PrismaModule]
    end
    
    subgraph "External Services"
        DB[(PostgreSQL Database)]
        BA[Better Auth]
    end
    
    CC --> UC1
    CC --> UC2
    CC --> UC3
    CC --> UC4
    CC --> UC5
    AC --> UC6
    AC --> BA
    
    UC1 --> RI
    UC2 --> RI
    UC3 --> RI
    UC4 --> RI
    UC5 --> RI
    UC6 --> RI
    
    UC1 --> CE
    UC2 --> CE
    UC3 --> CE
    UC4 --> CE
    UC5 --> CE
    
    RI -.implementado por.-> PR
    PR --> PS
    PS --> DB
    
    AF --> BA
    AF --> PS
    AM --> AF
    PM --> PS
    
    style CC fill:#e1f5ff
    style AC fill:#e1f5ff
    style UC1 fill:#fff4e1
    style UC2 fill:#fff4e1
    style UC3 fill:#fff4e1
    style UC4 fill:#fff4e1
    style UC5 fill:#fff4e1
    style UC6 fill:#fff4e1
    style CE fill:#e8f5e9
    style RI fill:#e8f5e9
    style PR fill:#fce4ec
    style PS fill:#fce4ec
    style DB fill:#fff9c4
    style BA fill:#fff9c4
```

## Descrição das Camadas

### 🎨 Presentation Layer
- **Responsabilidade**: Interface HTTP, validação de entrada, formatação de saída
- **Componentes**: Controllers, DTOs
- **Dependências**: Application Layer

### 💼 Application Layer
- **Responsabilidade**: Lógica de casos de uso, orquestração
- **Componentes**: Use Cases
- **Dependências**: Domain Layer

### 🏛️ Domain Layer
- **Responsabilidade**: Entidades de negócio, regras de domínio, interfaces
- **Componentes**: Entities, Repository Interfaces
- **Dependências**: Nenhuma (camada mais interna)

### 🔧 Infrastructure Layer
- **Responsabilidade**: Implementações técnicas, acesso a dados, serviços externos
- **Componentes**: Repositories, Database, Auth, Config
- **Dependências**: Domain Layer

## Princípios Aplicados

1. **Dependency Inversion**: Camadas externas dependem de interfaces definidas nas camadas internas
2. **Separation of Concerns**: Cada camada tem responsabilidade bem definida
3. **Testabilidade**: Interfaces permitem fácil mock em testes
4. **Independência**: Domain Layer não conhece detalhes de implementação


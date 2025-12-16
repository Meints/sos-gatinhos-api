# Diagrama de Sequência - Processo de Adoção

## Fluxo Completo de Adoção

```mermaid
sequenceDiagram
    participant Cliente as Cliente/Frontend
    participant API as NestJS API
    participant UC as AdoptionUseCase
    participant Repo as AdoptionRepository
    participant DB as PostgreSQL
    participant CatRepo as CatRepository
    
    Note over Cliente,DB: 1. Solicitação de Adoção
    Cliente->>API: POST /adoptions (catId, userId)
    API->>UC: execute(createAdoptionDto)
    UC->>Repo: create(adoption)
    Repo->>DB: INSERT INTO adoption
    DB-->>Repo: adoption (status: PENDING)
    Repo-->>UC: Adoption entity
    UC-->>API: Adoption
    API-->>Cliente: 201 Created
    
    Note over Cliente,DB: 2. Aprovação/Rejeição (Admin/Colaborador)
    Cliente->>API: PATCH /adoptions/:id (status: APPROVED)
    API->>UC: execute(id, {status: APPROVED})
    UC->>Repo: updateStatus(id, APPROVED)
    Repo->>DB: UPDATE adoption SET status
    DB-->>Repo: updated adoption
    UC->>CatRepo: updateStatus(catId, ADOPTED)
    CatRepo->>DB: UPDATE cat SET status = ADOPTED
    DB-->>CatRepo: updated cat
    CatRepo-->>UC: Cat
    Repo-->>UC: Adoption
    UC-->>API: Adoption
    API-->>Cliente: 200 OK
    
    Note over Cliente,DB: 3. Finalização da Adoção
    Cliente->>API: PATCH /adoptions/:id (status: COMPLETED)
    API->>UC: execute(id, {status: COMPLETED})
    UC->>Repo: updateStatus(id, COMPLETED)
    Repo->>DB: UPDATE adoption SET status = COMPLETED
    DB-->>Repo: updated adoption
    Repo-->>UC: Adoption
    UC-->>API: Adoption
    API-->>Cliente: 200 OK
```

## Fluxo Alternativo: Rejeição

```mermaid
sequenceDiagram
    participant Cliente as Cliente/Frontend
    participant API as NestJS API
    participant UC as AdoptionUseCase
    participant Repo as AdoptionRepository
    participant DB as PostgreSQL
    
    Cliente->>API: PATCH /adoptions/:id (status: REJECTED)
    API->>UC: execute(id, {status: REJECTED})
    UC->>Repo: updateStatus(id, REJECTED)
    Repo->>DB: UPDATE adoption SET status = REJECTED
    DB-->>Repo: updated adoption
    Note over UC,DB: Gato permanece AVAILABLE
    Repo-->>UC: Adoption
    UC-->>API: Adoption
    API-->>Cliente: 200 OK
```

## Estados da Adoção

```mermaid
stateDiagram-v2
    [*] --> PENDING: Solicitação criada
    PENDING --> APPROVED: Admin/Colaborador aprova
    PENDING --> REJECTED: Admin/Colaborador rejeita
    PENDING --> CANCELLED: Usuário cancela
    APPROVED --> COMPLETED: Adoção finalizada
    APPROVED --> CANCELLED: Cancelamento
    REJECTED --> [*]
    CANCELLED --> [*]
    COMPLETED --> [*]
    
    note right of APPROVED
        Gato muda status
        para ADOPTED
    end note
```

## Regras de Negócio

1. **PENDING**: Estado inicial quando uma adoção é solicitada
2. **APPROVED**: Apenas ADMIN ou COLLABORATOR podem aprovar
   - Quando aprovada, o gato muda status para ADOPTED
3. **REJECTED**: Apenas ADMIN ou COLLABORATOR podem rejeitar
   - Gato permanece AVAILABLE
4. **COMPLETED**: Adoção finalizada com sucesso
5. **CANCELLED**: Pode ser cancelada pelo usuário ou admin


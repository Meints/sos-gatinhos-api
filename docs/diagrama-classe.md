# Diagrama de Classe - SOS Gatinhos API

```mermaid
classDiagram
    %% Enums
    class UserRole {
        <<enumeration>>
        ADMIN
        COLLABORATOR
        ADOPTER
    }
    
    class Color {
        <<enumeration>>
        BLACK
        WHITE
        GRAY
        ORANGE
        CREAM
        BROWN
        CALICO
        TORTOISESHELL
        TABBY_BROWN
        TABBY_GRAY
        TABBY_ORANGE
        BICOLOR_BLACK
        BICOLOR_GRAY
        BICOLOR_ORANGE
        POINT
        VAN
        SHADED
        SMOKE
        MINK
    }
    
    class Gender {
        <<enumeration>>
        MALE
        FEMALE
    }
    
    class CatStatus {
        <<enumeration>>
        AVAILABLE
        ADOPTED
    }
    
    class AdoptionStatus {
        <<enumeration>>
        PENDING
        APPROVED
        REJECTED
        CANCELLED
        COMPLETED
    }

    %% Modelos Principais
    class User {
        +String id
        +String name
        +String email
        +Boolean emailVerified
        +String? image
        +UserRole role
        +DateTime createdAt
        +DateTime updatedAt
        +Session[] sessions
        +Account[] accounts
        +AdopterProfile? adopterProfile
        +Cat[] cats
        +Adoption[] adoptions
    }
    
    class Session {
        +String id
        +DateTime expiresAt
        +String token
        +DateTime createdAt
        +DateTime updatedAt
        +String? ipAddress
        +String? userAgent
        +String userId
    }
    
    class Account {
        +String id
        +String accountId
        +String providerId
        +String userId
        +String? accessToken
        +String? refreshToken
        +String? idToken
        +DateTime? accessTokenExpiresAt
        +DateTime? refreshTokenExpiresAt
        +String? scope
        +String? password
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Verification {
        +String id
        +String identifier
        +String value
        +DateTime expiresAt
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class AdopterProfile {
        +String userId
        +String? phone
        +String? cpf
        +DateTime? birthDate
        +String? cep
        +String? street
        +String? number
        +String? complement
        +String? district
        +String? city
        +String? state
    }
    
    class Cat {
        +String id
        +String name
        +Color color
        +Gender gender
        +CatStatus status
        +String? description
        +String[] photos
        +DateTime? birthDate
        +Boolean isNeutered
        +DateTime createdAt
        +DateTime updatedAt
        +String? userId
        +Adoption[] adoptions
    }
    
    class Adoption {
        +String id
        +String userId
        +String catId
        +DateTime adoptionDate
        +AdoptionStatus status
        +String? notes
        +DateTime createdAt
        +DateTime updatedAt
    }

    %% Relacionamentos
    User "1" --> "*" Session : possui
    User "1" --> "*" Account : possui
    User "1" --> "0..1" AdopterProfile : tem
    User "1" --> "*" Cat : cadastra
    User "1" --> "*" Adoption : solicita
    
    Cat "1" --> "*" Adoption : possui
    Cat "0..1" --> "1" User : cadastrado por
    
    Adoption "1" --> "1" User : solicitado por
    Adoption "1" --> "1" Cat : para
    
    Verification "0..*" ..> "0..1" User : identifica por email (lógica)
    
    User ..> UserRole : usa
    Cat ..> Color : usa
    Cat ..> Gender : usa
    Cat ..> CatStatus : usa
    Adoption ..> AdoptionStatus : usa
```

## Legenda

- **+** = atributo público
- **?** = atributo opcional (nullable)
- **[]** = array/lista
- **1** = um
- **0..1** = zero ou um (opcional)
- **\*** = muitos

## Relacionamentos

1. **User → Session**: Um usuário pode ter múltiplas sessões (1:N)
2. **User → Account**: Um usuário pode ter múltiplas contas (1:N)
3. **User → AdopterProfile**: Um usuário pode ter um perfil de adotante (1:0..1)
4. **User → Cat**: Um usuário pode cadastrar múltiplos gatos (1:N)
5. **User → Adoption**: Um usuário pode fazer múltiplas solicitações de adoção (1:N)
6. **Cat → Adoption**: Um gato pode ter múltiplas adoções (1:N)
7. **Adoption → User**: Uma adoção pertence a um usuário (N:1)
8. **Adoption → Cat**: Uma adoção é para um gato (N:1)
9. **Verification → User**: Relação lógica através do campo `identifier` (geralmente email). Não há foreign key, permitindo tokens antes do usuário existir (ex: durante registro)

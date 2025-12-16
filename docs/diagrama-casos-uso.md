# Diagrama de Casos de Uso - SOS Gatinhos API

## Atores e Casos de Uso

```mermaid
graph LR
    subgraph "Atores"
        ADOPTER[👤 Adotante]
        COLLAB[👨‍💼 Colaborador]
        ADMIN[👑 Administrador]
        ANON[🌐 Anônimo]
    end
    
    subgraph "Casos de Uso - Autenticação"
        UC1[Registrar-se]
        UC2[Fazer Login]
        UC3[Verificar Email]
        UC4[Recuperar Senha]
    end
    
    subgraph "Casos de Uso - Gatos"
        UC5[Listar Gatos]
        UC6[Visualizar Gato]
        UC7[Cadastrar Gato]
        UC8[Atualizar Gato]
        UC9[Deletar Gato]
    end
    
    subgraph "Casos de Uso - Adoção"
        UC10[Solicitar Adoção]
        UC11[Cancelar Adoção]
        UC12[Visualizar Minhas Adoções]
    end
    
    subgraph "Casos de Uso - Perfil"
        UC13[Criar Perfil Adotante]
        UC14[Atualizar Perfil]
    end
    
    subgraph "Casos de Uso - Administração"
        UC15[Aprovar Adoção]
        UC16[Rejeitar Adoção]
        UC17[Gerenciar Usuários]
    end
    
    %% Relacionamentos Anônimo
    ANON --> UC1
    ANON --> UC2
    ANON --> UC5
    ANON --> UC6
    
    %% Relacionamentos Adotante
    ADOPTER --> UC3
    ADOPTER --> UC4
    ADOPTER --> UC10
    ADOPTER --> UC11
    ADOPTER --> UC12
    ADOPTER --> UC13
    ADOPTER --> UC14
    
    %% Relacionamentos Colaborador
    COLLAB --> UC7
    COLLAB --> UC8
    COLLAB --> UC9
    COLLAB --> UC15
    COLLAB --> UC16
    
    %% Relacionamentos Admin
    ADMIN --> UC7
    ADMIN --> UC8
    ADMIN --> UC9
    ADMIN --> UC15
    ADMIN --> UC16
    ADMIN --> UC17
    
    style ADOPTER fill:#e3f2fd
    style COLLAB fill:#fff3e0
    style ADMIN fill:#fce4ec
    style ANON fill:#f1f8e9
```

## Matriz de Permissões

| Caso de Uso | Anônimo | Adotante | Colaborador | Admin |
|------------|---------|----------|-------------|-------|
| Registrar-se | ✅ | - | - | - |
| Fazer Login | ✅ | ✅ | ✅ | ✅ |
| Listar Gatos | ✅ | ✅ | ✅ | ✅ |
| Visualizar Gato | ✅ | ✅ | ✅ | ✅ |
| Cadastrar Gato | ❌ | ❌ | ✅ | ✅ |
| Atualizar Gato | ❌ | ❌ | ✅ | ✅ |
| Deletar Gato | ❌ | ❌ | ✅ | ✅ |
| Solicitar Adoção | ❌ | ✅ | ❌ | ❌ |
| Cancelar Adoção | ❌ | ✅ | ❌ | ✅ |
| Aprovar Adoção | ❌ | ❌ | ✅ | ✅ |
| Rejeitar Adoção | ❌ | ❌ | ✅ | ✅ |
| Criar Perfil | ❌ | ✅ | ❌ | ❌ |
| Gerenciar Usuários | ❌ | ❌ | ❌ | ✅ |

## Descrição dos Casos de Uso Principais

### UC10: Solicitar Adoção
- **Ator**: Adotante
- **Pré-condições**: Usuário autenticado, gato disponível
- **Fluxo Principal**:
  1. Adotante visualiza gato disponível
  2. Adotante clica em "Solicitar Adoção"
  3. Sistema cria registro de adoção com status PENDING
  4. Sistema notifica colaboradores/admin
- **Pós-condições**: Adoção criada, gato continua disponível até aprovação

### UC15: Aprovar Adoção
- **Ator**: Colaborador ou Admin
- **Pré-condições**: Adoção com status PENDING existe
- **Fluxo Principal**:
  1. Colaborador/Admin visualiza solicitações pendentes
  2. Avalia perfil do adotante
  3. Aprova a adoção
  4. Sistema muda status do gato para ADOPTED
  5. Sistema notifica adotante
- **Pós-condições**: Adoção aprovada, gato marcado como adotado

### UC7: Cadastrar Gato
- **Ator**: Colaborador ou Admin
- **Pré-condições**: Usuário autenticado com role adequada
- **Fluxo Principal**:
  1. Colaborador/Admin preenche formulário com dados do gato
  2. Sistema valida dados
  3. Sistema cria registro do gato
  4. Sistema retorna gato criado
- **Pós-condições**: Gato cadastrado com status AVAILABLE


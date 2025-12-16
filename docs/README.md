# Documentação de Diagramas - SOS Gatinhos API

Este diretório contém diagramas UML e de arquitetura do projeto SOS Gatinhos API.

## 📋 Índice de Diagramas

### 1. [Diagrama de Classe](./diagrama-classe.md)
**Tipo**: Diagrama de Classe UML  
**Descrição**: Modelo de dados completo do sistema, incluindo todas as entidades, relacionamentos e enums do schema Prisma.

**Conteúdo**:
- Modelos: User, Session, Account, Verification, AdopterProfile, Address, Cat, Adoption
- Enums: UserRole, Color, Gender, CatStatus, AdoptionStatus
- Relacionamentos entre entidades

---

### 2. [Diagrama de Arquitetura](./diagrama-arquitetura.md)
**Tipo**: Diagrama de Arquitetura (Clean Architecture)  
**Descrição**: Estrutura em camadas do sistema, mostrando a separação entre Presentation, Application, Domain e Infrastructure.

**Conteúdo**:
- Camadas da arquitetura
- Fluxo de dependências
- Componentes principais
- Princípios aplicados

---

### 3. [Diagrama de Sequência - Adoção](./diagrama-sequencia-adocao.md)
**Tipo**: Diagrama de Sequência UML  
**Descrição**: Fluxo completo do processo de adoção, desde a solicitação até a finalização.

**Conteúdo**:
- Sequência de solicitação de adoção
- Aprovação/rejeição por admin/colaborador
- Finalização da adoção
- Diagrama de estados do processo

---

### 4. [Diagrama de Casos de Uso](./diagrama-casos-uso.md)
**Tipo**: Diagrama de Casos de Uso UML  
**Descrição**: Atores do sistema e seus casos de uso, incluindo matriz de permissões.

**Conteúdo**:
- Atores: Anônimo, Adotante, Colaborador, Administrador
- Casos de uso por funcionalidade
- Matriz de permissões
- Descrição dos principais casos de uso

---

## 🛠️ Como Visualizar

### Opção 1: GitHub/GitLab
Os arquivos `.md` com diagramas Mermaid são renderizados automaticamente no GitHub e GitLab.

### Opção 2: VS Code
Instale a extensão **"Markdown Preview Mermaid Support"** para visualizar os diagramas diretamente no editor.

### Opção 3: Online
1. Acesse [Mermaid Live Editor](https://mermaid.live)
2. Copie o código do diagrama (dentro dos blocos ` ```mermaid `)
3. Cole no editor para visualizar e exportar

### Opção 4: CLI
```bash
# Instalar Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Gerar imagem PNG
mmdc -i diagrama-classe.md -o diagrama-classe.png
```

---

## 📊 Outros Diagramas Sugeridos (Futuro)

- [ ] Diagrama de Componentes/Deployment
- [ ] Diagrama de Sequência - Autenticação
- [ ] Diagrama de Sequência - Cadastro de Gato
- [ ] Diagrama de Estados - Cat
- [ ] Diagrama de Deployment (Docker, Infraestrutura)

---

## 📝 Notas

- Todos os diagramas usam a sintaxe **Mermaid**
- Os diagramas são versionados junto com o código
- Atualize os diagramas quando houver mudanças significativas na arquitetura ou modelo de dados


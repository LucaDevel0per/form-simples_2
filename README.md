![Screenshot do Login](assts/image.png)

# Sistema de Login e Cadastro

Sistema completo de autenticação com frontend React e backend Flask, incluindo banco de dados simples e navegação entre telas.

## Funcionalidades

### Frontend (React + Vite)
- Design moderno com gradientes e efeito glassmorphism
- Navegação fluida entre tela de login e cadastro
- Validação em tempo real dos formulários
- Feedback visual com animações e estados de loading
- Layout responsivo para desktop, tablet e mobile
- Animações CSS suaves

### Backend (Flask)
- Sistema de banco de dados simples em JSON
- Cadastro de usuários com validações
- Login seguro com hash de senhas (SHA-256)
- Persistência de dados em arquivo JSON
- Validações completas de entrada
- Endpoints RESTful

### Segurança
- Senhas criptografadas com hash SHA-256
- Validação de entrada em ambos os lados
- Proteção contra duplicação de emails
- Verificação de credenciais completa

## Estrutura do Projeto

```
meu-projecto/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── App.jsx          # Componente principal com navegação
│   │   ├── Cadastro.jsx     # Tela de cadastro
│   │   ├── App.css          # Estilos modernos
│   │   └── index.css        # Estilos globais
│   └── package.json
├── backend/                  # API Flask
│   ├── app.py               # Servidor principal
│   └── usuarios.json        # Banco de dados (criado automaticamente)
└── README.md
```

## Como Executar

### 1. Backend (Flask)
```bash
cd backend
python app.py
```
O servidor iniciará em `http://localhost:5000`

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

## Endpoints da API

### Cadastro
- **POST** `/api/cadastro`
- **Body**: `{"nome": "string", "email": "string", "senha": "string"}`

### Login
- **POST** `/api/login`
- **Body**: `{"nome": "string", "email": "string", "senha": "string"}`

### Status
- **GET** `/api/status`
- Retorna status da API e número de usuários

### Listar Usuários (Dev)
- **GET** `/api/usuarios`
- Lista todos os usuários (sem senhas)

## Fluxo de Uso

1. Primeiro acesso: Usuário clica em "Cadastre-se"
2. Tela de cadastro: Preenche nome, email e senha
3. Validações: Sistema verifica dados e senha mínima
4. Sucesso: Redireciona automaticamente para login
5. Login: Usuário faz login com credenciais cadastradas
6. Acesso: Sistema valida e permite acesso

## Tecnologias Utilizadas

### Frontend
- React 19 - Framework principal
- Vite - Build tool e dev server
- Axios - Requisições HTTP
- CSS3 - Animações e estilos modernos

### Backend
- Flask - Framework web
- Flask-CORS - Cross-origin requests
- Hashlib - Criptografia de senhas
- JSON - Persistência de dados

## Design System

### Cores
- Primária: #667eea (Azul)
- Secundária: #764ba2 (Roxo)
- Sucesso: #28a745 (Verde)
- Erro: #dc3545 (Vermelho)

### Animações
- Entrada: slideUp com fadeIn
- Transições: 0.3s ease
- Loading: spinner rotativo
- Hover: transform translateY

## Responsividade

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

## Segurança

- Senhas nunca armazenadas em texto plano
- Validação de entrada em frontend e backend
- Verificação de duplicação de emails
- Hash SHA-256 para senhas

## Próximos Passos

- [ ] Implementar JWT para sessões
- [ ] Adicionar recuperação de senha
- [ ] Integrar com banco de dados real (PostgreSQL/MySQL)
- [ ] Adicionar autenticação OAuth (Google, Facebook)
- [ ] Implementar rate limiting
- [ ] Adicionar logs de auditoria

## Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais. 
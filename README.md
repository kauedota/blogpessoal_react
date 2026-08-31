# 📖 Blog Pessoal

Aplicação full stack de blog pessoal, desenvolvida como projeto da trilha de desenvolvimento da Generation Brasil. Permite criar, editar e organizar postagens por tema, com autenticação de usuários e um perfil personalizável.

🔗 **Deploy:** [blogpessoal-react-silk-three.vercel.app](https://blogpessoal-react-silk-three.vercel.app/)
🔗 **Backend:** [github.com/kauedota/BlogPessoal](https://github.com/kauedota/BlogPessoal)

## 🧪 Conta de teste

Quer testar sem precisar se cadastrar? Use as credenciais abaixo na tela de login:

```
Usuário: root@root.com.br
Senha:   rootroot
```

## ✨ Funcionalidades

- Cadastro e login de usuários com autenticação via token (JWT)
- CRUD completo de Postagens
- CRUD completo de Temas
- Página de Perfil, com edição dos dados do usuário
- Notificações visuais (toasts) de sucesso, erro e informação
- Layout responsivo, com menu hambúrguer no mobile

## 🔧 Tecnologias

**Front-end**
- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

**Back-end**
- Java com Spring Boot
- Spring Security + JWT
- MySQL

**Deploy**
- Vercel (front-end)
- Render (back-end)

## 💻 Rodando o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/kauedota/blogpessoal_react.git
cd blogpessoal_react

# Instale as dependências
npm install

# Crie um arquivo .env na raiz com a URL da API
echo VITE_API_URL=https://blogpessoal-7t26.onrender.com > .env

# Rode o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

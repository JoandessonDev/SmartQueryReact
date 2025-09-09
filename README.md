# 🤖 SmartQueryAI

Um chat inteligente desenvolvido em **React + TypeScript**, que consome uma API criada em **C# (.NET Core)**.  
O objetivo do projeto é oferecer uma interface amigável e responsiva para interação com a API de inteligência artificial, permitindo consultas rápidas e organizadas.

---

## ✨ Funcionalidades

- 💬 Chat em tempo real entre usuário e API  
- 🎨 Interface moderna e responsiva  
- 🔗 Integração com API C# (.NET Core)  
- ⚡ Comunicação HTTP com **Axios**  
- 📘 Código tipado e seguro com **TypeScript**  
- 🧩 Organização de componentes no padrão React  

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- ⚛️ [React](https://reactjs.org/)  
- 📘 [TypeScript](https://www.typescriptlang.org/)  
- 🎨 CSS Modules + Flexbox/Grid  
- 📡 [Axios](https://axios-http.com/)  
- ⚡ [Vite](https://vitejs.dev/)  

### Backend
- 💻 [C# .NET Core API](https://dotnet.microsoft.com/)  
- 🚀 ASP.NET Core Web API  

---

## 📂 Estrutura do Projeto (Frontend)

SmartQueryAI/
│── src/
│ ├── assets/
│ │ └── components/ # Componentes reutilizáveis (Chat, Header, etc.)
│ ├── services/ # Configuração do Axios e chamadas à API
│ ├── App.tsx # Componente raiz
│ ├── main.tsx # Ponto de entrada da aplicação
│── public/ # Arquivos estáticos
│── package.json
│── tsconfig.json
│── vite.config.ts


---

## 🚀 Como rodar o projeto

### 📌 Pré-requisitos
- [Node.js](https://nodejs.org/) (>= 18)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  
- [.NET 7+](https://dotnet.microsoft.com/) (para rodar a API)  

### 🔧 Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/SmartQueryAI.git

# Acesse a pasta do projeto
cd SmartQueryAI

# Instale as dependências
npm install

# Rode o frontend
npm run dev

A aplicação estará disponível em:
👉 http://localhost:5173
🔗 Configuração da API

Edite o arquivo src/services/api.ts para definir o endereço base da API:

import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7272/api/ChatAi"
});

export default api;

📸 Prévia do Projeto

(Adicione aqui prints ou GIFs mostrando o chat em funcionamento)
📜 Licença

Este projeto está sob a licença MIT.
Sinta-se livre para usar, modificar e contribuir! 🚀

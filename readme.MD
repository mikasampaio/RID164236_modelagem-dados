# API de Pedidos e Produtos

Este projeto é uma **API REST** para gerenciamento de **clientes, categorias, produtos e pedidos**, estruturada em camadas bem definidas (Controllers, Services, Repositories), seguindo boas práticas de organização, validação e separação de responsabilidades.

---

## 🚀 Instalação

### Pré-requisitos

* **Node.js** (versão LTS recomendada)
* **npm** ou **yarn**

### Passo a passo

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta do projeto:

```bash
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mongodb+srv://mika_sampaio:y4r0kLWQKEsGDzz7@sales-dnc.ufick2u.mongodb.net/sales-dnc?retryWrites=true&w=majority&appName=SALES-DNC"
NODE_ENV="development"
PORT=3334
```


Após configurar o `.env`, execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Para iniciar o servidor em ambiente de desenvolvimento:

```bash
npm run dev
```

---

## 🗄️ Esquema do Banco de Dados

![Diagrama do Banco de Dados](./Diagram.png)


O banco de dados é modelado para suportar operações de **e-commerce / pedidos**, com as seguintes entidades principais:

* **Customer** – clientes do sistema
* **Category** – categorias de produtos
* **Product** – produtos comercializados
* **Order** – pedidos realizados
* **OrderItem** – itens que compõem um pedido

### Relacionamentos principais

* Um **Customer** pode ter vários **Orders**
* Um **Order** pertence a um **Customer**
* Um **Order** possui vários **OrderItems**
* Um **Product** pode estar em vários **Orders**, via **OrderItem**
* Uma **Category** possui vários **Products**

---

## 🧱 Arquitetura

O projeto segue uma arquitetura em camadas:

* **Controllers**: recebem as requisições HTTP e retornam respostas
* **Services**: concentram as regras de negócio
* **Repositories**: fazem o acesso ao banco de dados (Prisma)
* **DTOs**: validam e tipam dados de entrada e saída
* **Factories**: centralizam a criação de objetos e dependências
* **Middlewares**: validação e tratamento global de erros

---

## 📘 Documentação da API
- [Insomnia](./sales-dnc-routes.yaml)

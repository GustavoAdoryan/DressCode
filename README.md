# DressCode

> Uma ponte entre quem cria e quem executa a moda.

O **DressCode** é uma plataforma para aproximar **estilistas** e **ateliês**. A proposta nasceu de uma necessidade simples: um estilista pode estar disponível para assumir um trabalho extra, enquanto um ateliê pode estar com alta demanda e precisar de mais profissionais para cumprir seus prazos.

Na plataforma, os dois lados podem se encontrar, conhecer o perfil um do outro e iniciar uma parceria por meio de agendamentos.

## Contexto acadêmico

O DressCode foi desenvolvido como um projeto acadêmico para as disciplinas de **Banco de Dados** e **Projeto de Programação Web**, do curso de Engenharia de Software.

O trabalho reúne os conhecimentos das duas disciplinas em uma única aplicação:

- **Banco de Dados:** modelagem das entidades e relacionamentos entre usuários, estilistas, ateliês, perfis, portfólios e agendamentos, além da persistência dos dados em MySQL por meio do Sequelize.
- **Projeto de Programação Web:** desenvolvimento de uma aplicação web completa, com frontend em React/TypeScript, backend em Node.js/Express, autenticação, navegação, consumo de API e gerenciamento dos fluxos de usuários.

Além de atender aos objetivos acadêmicos das disciplinas, o projeto representa uma proposta de solução para aproximar profissionais da área de moda e apoiar a contratação de serviços entre estilistas e ateliês.

## Visão do produto

### Para estilistas

- Encontrar ateliês disponíveis na plataforma.
- Pesquisar ateliês por nome ou e-mail.
- Consultar perfis e portfólios.
- Solicitar e acompanhar agendamentos de trabalho.

### Para ateliês

- Encontrar estilistas disponíveis.
- Pesquisar profissionais por nome ou e-mail.
- Consultar perfis e portfólios.
- Criar e acompanhar agendamentos para organizar a demanda.

### Recursos já presentes no projeto

- Cadastro e login de usuários.
- Dois tipos de usuário: `Estilista` e `Atelie`.
- Autenticação com JWT.
- Perfis com biografia e foto.
- Portfólios e tempo de experiência.
- Busca de usuários por tipo.
- Criação, edição, listagem e exclusão de agendamentos.
- Filtros de agendamentos por status, estilista e ateliê.
- Interface web responsiva construída com React e Tailwind CSS.

## Como o projeto está organizado

```text
DressCode/
├── backend/                  # API REST e integração com o banco
│   ├── src/
│   │   ├── config/           # Configuração do Sequelize
│   │   ├── controller/       # Regras dos endpoints
│   │   ├── model/            # Modelos e associações do domínio
│   │   └── routes/           # Rotas da API
│   ├── .env                  # Configuração local (não compartilhar)
│   └── package.json
├── frontend/                 # Aplicação web React/Vite
│   ├── src/
│   │   ├── api/              # Chamadas para a API
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Login, cadastro, início, perfil e agenda
│   │   └── store/            # Estado do usuário autenticado
│   └── package.json
├── collections/              # Coleção de requisições para o Postman
└── dumps-banco/              # Dumps SQL para desenvolvimento
```

## Tecnologias

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI
- React Hook Form + Zod
- Zustand

### Backend

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcrypt
- CORS

## Pré-requisitos

- Node.js 18 ou superior
- npm
- MySQL em execução
- Git (opcional, para clonar o projeto)

## Configuração local

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd DressCode
```

### 2. Configure o banco de dados

Crie um banco MySQL com o mesmo nome informado em `DB_NAME`. Em seguida, escolha um dos arquivos em [`dumps-banco/`](./dumps-banco/) e importe-o:

```bash
mysql -u root -p dresscode < dumps-banco/18-06-24--02-07.sql
```

Os dumps são voltados para desenvolvimento. Em um ambiente novo, confirme o esquema e os dados antes de escolher o arquivo a ser importado.

### 3. Configure o backend

Entre na pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

Crie ou ajuste o arquivo `backend/.env`:

```env
DB_NAME=dresscode
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=uma_chave_secreta_e_forte
PORT=3000
```

Nunca publique credenciais reais, chaves JWT ou arquivos `.env` no repositório. Se alguma credencial de desenvolvimento já tiver sido compartilhada, substitua-a antes de usar o projeto em outro ambiente.

Inicie a API:

```bash
npm start
```

A API ficará disponível em `http://localhost:3000`.

### 4. Configure o frontend

Em outro terminal, a partir da raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

O frontend atualmente está configurado para consumir a API em `http://localhost:3000`. Se a API for executada em outro endereço, atualize as URLs presentes em `frontend/src/api/`.

## Usuários de teste

Os dados abaixo são fictícios e servem apenas para padronizar o ambiente local e os exemplos deste projeto. Eles não foram inseridos automaticamente no banco.

### Estilista

| Campo | Valor |
| --- | --- |
| Nome | Helena Duarte |
| E-mail | `estilista.teste@dresscode.local` |
| Senha | `DressCode@123` |
| CPF/CNPJ fictício | `111.111.111-11` |
| Telefone fictício | `(11) 98888-1111` |
| Tipo | `Estilista` |

### Ateliê

| Campo | Valor |
| --- | --- |
| Nome | Ateliê Linha & Forma |
| E-mail | `atelie.teste@dresscode.local` |
| Senha | `DressCode@123` |
| CPF/CNPJ fictício | `22.222.222/0001-22` |
| Telefone fictício | `(11) 97777-2222` |
| Tipo | `Atelie` |

Para criar os usuários manualmente pela API, envie cada objeto separadamente para `POST /api/auth/register`:

```json
{
  "Nome": "Helena Duarte",
  "Email": "estilista.teste@dresscode.local",
  "Senha": "DressCode@123",
  "CPF_CNPJ": "111.111.111-11",
  "Telefone": "(11) 98888-1111",
  "Tipo": "Estilista"
}
```

```json
{
  "Nome": "Ateliê Linha & Forma",
  "Email": "atelie.teste@dresscode.local",
  "Senha": "DressCode@123",
  "CPF_CNPJ": "22.222.222/0001-22",
  "Telefone": "(11) 97777-2222",
  "Tipo": "Atelie"
}
```

O cadastro pela API gera automaticamente o perfil e o registro correspondente de estilista ou ateliê, além do portfólio inicial.

## Scripts disponíveis

### Backend

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia a API com Nodemon |

### Frontend

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite |
| `npm run build` | Executa a checagem TypeScript e gera o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run preview` | Serve localmente o build gerado |

## Fluxo principal

1. O usuário cria uma conta como `Estilista` ou `Atelie`.
2. Após o login, a plataforma apresenta o outro tipo de usuário como possível parceiro.
3. O usuário pesquisa e consulta perfis.
4. Ao encontrar uma oportunidade, cria um agendamento.
5. O agendamento pode ser acompanhado e atualizado conforme o andamento da parceria.

## API

A API utiliza o prefixo `/api`.

### Autenticação

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Criar uma conta |
| `POST` | `/api/auth/login` | Autenticar um usuário |

### Usuários, perfis e portfólios

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| `GET` | `/api/usuarios` | Listar usuários |
| `GET` | `/api/usuarios/:id` | Consultar um usuário |
| `GET` | `/api/usuarios/search/:tipo` | Buscar por tipo (`Estilista` ou `Atelie`) |
| `PUT` | `/api/usuarios/:id` | Atualizar dados do usuário |
| `DELETE` | `/api/usuarios/:id` | Excluir um usuário |
| `PUT` | `/api/perfil/:id` | Atualizar um perfil |
| `PUT` | `/api/portifolio/:id` | Atualizar um portfólio |

### Agendamentos

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| `POST` | `/api/agendamentos` | Criar um agendamento |
| `GET` | `/api/agendamentos` | Listar agendamentos |
| `PUT` | `/api/agendamentos/:id` | Atualizar um agendamento |
| `DELETE` | `/api/agendamentos/:id` | Excluir um agendamento |
| `GET` | `/api/agendamentos/status/:status` | Filtrar por status |
| `GET` | `/api/agendamentos/estilista/:estilistaId` | Filtrar por estilista |
| `GET` | `/api/agendamentos/atelie/:atelieId` | Filtrar por ateliê |

Uma coleção pronta para testar as rotas está disponível em [`collections/DressCode.postman_collection.json`](./collections/DressCode.postman_collection.json).

## Modelo de domínio

O backend organiza o domínio em torno de:

- `Usuario`: dados de acesso e identificação.
- `Estilista`: vínculo de um usuário com a atuação como estilista.
- `Atelie`: vínculo de um usuário com um ateliê.
- `Perfil`: biografia e foto do usuário.
- `Portifolio`: experiência e apresentação profissional.
- `Agendamento`: conexão de trabalho entre um estilista e um ateliê.

As associações são gerenciadas pelo Sequelize e o backend sincroniza os modelos ao iniciar a aplicação.

## Estado atual e próximos passos

O projeto já possui o fluxo essencial de descoberta, perfil e agendamento. Para evoluir a plataforma em direção a um produto pronto para uso, os próximos passos naturais são:

- centralizar a URL da API em uma variável de ambiente do frontend;
- proteger e autorizar endpoints com o JWT, além de apenas emitir o token;
- validar disponibilidade e conflitos de horário antes de criar agendamentos;
- adicionar avaliações e reputação entre os participantes;
- permitir anexar imagens e itens reais aos portfólios;
- criar testes automatizados para API e frontend;
- preparar configurações separadas para desenvolvimento, homologação e produção.

## Licença

Este projeto ainda não possui uma licença definida. Até que uma licença seja adicionada, o código deve ser tratado como uso restrito aos termos definidos pelos mantenedores.
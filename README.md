## Student Info

The project is divided into two main folders: "web" and "server".

### Backend (server folder)

The backend of the project is built using NodeJS and Typescript. It utilizes the Prisma ORM for database operations, and the PostgreSQL database is hosted in Supabase. To run the backend server, execute the following command:

```bash
cd server
yarn dev
```

### Technologies Used - Backend

- NodeJS
- Typescript
- Prisma ORM
- PostgreSQL

### Frontend (web folder)

The frontend of the project is a web application built with ReactJS. It uses Create React App (CRA) as the base setup. The web app makes API calls to the backend server to fetch data and render dynamic content. To run the web app, use the following command:

```bash
cd web
yarn start
```

### Technologies Used - Frontend

- ReactJS
- Axios
- React Router
- Victory for Charts
- daisyUI (Tailwind CSS)

### Project Structure

The project follows a simple directory structure:

```bash
├── server
│   ├── src
│   	├── controllers
│   	├── models
│   	├── routes
│   	├── prisma
│   	└── ...
│   ├── db.ts
├── web
│   ├── public
│   ├── src
│   	├── api
│   	├── components
│   	├── context
│   	├── hooks
│   	├── pages
│   	├── api
│   	└── App.tsx
│   	└── index.tsx
│   	└── Routes.tsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

The `server` folder contains the backend code, while the `web` folder contains the frontend web application.

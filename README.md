# 🔐 mono-jsx + Bun — Minimal Login Example / Ejemplo Mínimo de Login

---

## 🇺🇸 English

### ✨ Features

- ✅ Fully SSR login form
- ✅ Custom reusable components (`Input`, `Button`)
- ✅ Handles GET and POST in `/login` route
- ✅ Simulated authentication using JSON endpoint (`/api/users`)
- ✅ Typed components with TypeScript
- ✅ Composable structure ready for scaling
- ✅ No React, no build, no client-side bundling

### 📁 Project Structure

All logic and routes live in a single `app.tsx` file, structured as follows:

- `/` → Home page with link to login
- `/login` → GET shows form, POST handles login
- `/api/users` → Hardcoded list of allowed users

### 🧪 Example Users

You can authenticate using any of these credentials:

| Email              | Password     |
|--------------------|--------------|
| user1@example.com  | P@ssw0rd1    |
| user2@example.com  | P@ssw0rd2    |
| user3@example.com  | P@ssw0rd3    |

### 🚀 Getting Started

#### Requirements

- [Bun](https://bun.sh) installed globally

#### Run the server

```bash
bun run app.tsx
```

Then open [http://localhost:3000/login](http://localhost:3000/login)

### 💡 Future Ideas

- Add cookie-based session
- Connect to external DB (SQLite, Turso, Supabase)
- Add `/logout` route
- Move users to a secure store or API

### 📄 License

MIT — use freely, modify, and share.

---

## 🇪🇸 Español

### ✨ Características

- ✅ Formulario de login con renderizado del lado del servidor (SSR)
- ✅ Componentes reutilizables (`Input`, `Button`)
- ✅ Ruta `/login` con manejo de GET y POST
- ✅ Autenticación simulada consultando un endpoint JSON (`/api/users`)
- ✅ Componentes tipados con TypeScript
- ✅ Estructura modular lista para escalar
- ✅ Sin React, sin build, sin bundling del lado del cliente

### 📁 Estructura del proyecto

Toda la lógica y las rutas están contenidas en un solo archivo `app.tsx`, organizado así:

- `/` → Página de inicio con un botón para ir al login
- `/login` → GET muestra el formulario, POST maneja el login
- `/api/users` → Lista fija de usuarios permitidos

### 🧪 Usuarios de prueba

Podés autenticarte con cualquiera de estas combinaciones:

| Email              | Contraseña   |
|--------------------|--------------|
| user1@example.com  | P@ssw0rd1    |
| user2@example.com  | P@ssw0rd2    |
| user3@example.com  | P@ssw0rd3    |

### 🚀 Cómo empezar

#### Requisitos

- Tener [Bun](https://bun.sh) instalado globalmente

#### Ejecutar el servidor

```bash
bun run app.tsx
```

Luego abrí [http://localhost:3000/login](http://localhost:3000/login)

### 💡 Ideas a futuro

- Agregar sesión basada en cookies
- Conectar a una base de datos real (SQLite, Turso, Supabase)
- Ruta de `/logout`
- Mover usuarios a un almacenamiento más seguro o API externa

### 📄 Licencia

MIT — libre para usar, modificar y compartir.

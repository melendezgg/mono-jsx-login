/** @jsxImportSource mono-jsx */
import { FC } from "mono-jsx";

function Input(this: FC<{ name: string, value: string, type?: "text" | "email" | "password", label?: string }, {}>, props: { name: string, value: string, type?: "text" | "email" | "password", label?: string }) {
  this.value = props.value
  this.name = props.name
  this.type = props.type || "text"
  this.label = props.label || ""

  return (
    <p>
      <label for={this.name}>
        {this.label}
        <input type={this.type} value={this.value} name={this.name} />
      </label>
    </p>
  )
}

function Button(this: FC<{ type?: "submit" | "link" | "button", label: string, href?: string }>, props: { type?: "submit" | "link" | "button", label: string, href?: string }) {
  if (props.type === "submit") {
    return (
      <button type="submit">
        {props.label}
      </button>
    )
  }

  if (props.type === "link") {
    return (
      <a href={props.href}>
        {props.label}
      </a>
    )
  }

  return (
    <button type="button">
      {props.label}
    </button>
  )
}

function LoginForm(this: FC) {
  return (
    <form action="/login" method="POST">
      <div>
        <Input name="email" value="" type="email" label="Email" />
        <Input name="password" value="" type="password" label="Password" />
      </div>
      <Button label="Login" type="submit" />
    </form>
  )
}

function HomePage(this: FC<{}, {}, { auth: { email: string } }>) {
  return (
    <>
      {this.context.auth.email ? (
        <>
          <p>Hi, {this.context.auth.email}</p>
          <Button label="Logout" type="link" href="/logout" />
        </>
      ) : (
        <Button label="Go to login" type="link" href="/login" />
      )}
    </>
  )
}

async function doAuth(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/auth_email=([^;]+)/);
  const email = match ? decodeURIComponent(match[1]) : "";
  console.log(match)
  console.log(email)
  return {
    email,
    isAuthenticated: !!email
  };
}

export default {
  routes: {
    "/api/users": req => Response.json([
      {
        "email": "user1@example.com",
        "password": "P@ssw0rd1"
      },
      {
        "email": "user2@example.com",
        "password": "P@ssw0rd2"
      },
      {
        "email": "user3@example.com",
        "password": "P@ssw0rd3"
      }
    ]),

    "/login": async (req) => {
      // Handle POST request
      if (req.method === 'POST') {
        const formData = await req.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const usersUrl = new URL("/api/users", req.url).toString();
        const usersResponse = await fetch(usersUrl);
        const users = await usersResponse.json();

        const user = users.find((u: { email: string, password: string }) =>
          u.email === email && u.password === password
        );

        const authorized = !!user;

        return (
          <html
            status={authorized ? 200 : 401}
            headers={authorized ? {
              "Set-Cookie": `auth_email=${encodeURIComponent(email)}; Path=/; HttpOnly`,
            } : {}}
          >
            <body>
              {authorized
                ? <h1>Welcome, {email}!</h1>
                : <>
                    <h1>Access denied</h1>
                    <a href="/">Try again</a>
                  </>
              }
            </body>
          </html>
        );
      }

      // GET /login fallback
      return (
        <html>
          <body>
            <LoginForm />
          </body>
        </html>
      );
    },

    "/logout": (req) => {
      return (
        <html
          headers={{
            "Set-Cookie": "auth_email=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
          }}
        >
          <body>
            <h1>Logged out</h1>
            <Button label="Go back" type="link" href="/" />
          </body>
        </html>
      );
    },
  },

  fetch: async (req) => {
    const auth = await doAuth(req);

    return (
      <html
        request={req}
        context={{ auth }}
        status={200}
      >
        <body>
          {auth.isAuthenticated
            ? <HomePage />
            : <LoginForm />
          }
        </body>
      </html>
    );
  }
}
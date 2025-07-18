import { apiUrl } from "../../helper/Constants/Constants.js";

export async function SignIn(username, password) {
  const url = `${apiUrl}/Auth/SignIn`;
  const data = {
    Username: username,
    Password: password,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return { status: response.status, data: result };
}

export async function SignUp(username, email, password) {
  const url = `${apiUrl}/Auth/SignUp`;
  const data = {
    Username: username,
    Email: email,
    Password: password,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return { status: response.status, data: result };
}

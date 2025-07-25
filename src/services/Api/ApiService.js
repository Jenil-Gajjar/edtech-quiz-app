import { apiUrl } from "../../helper/Constants/Constants.js";
import AuthService from "../Authorization/AuthorizationService.js";
import CookieService from "../Cookie/CookieService.js";

export async function SignIn(username, password) {
  const url = `${apiUrl}/auth/sign-in`;
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
  const url = `${apiUrl}/auth/sign-up`;
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

export async function GetQuestions() {
  const url = `${apiUrl}/questions/random`;
  const token = CookieService.getAuthCookie() || null;

  if (token == null) {
    AuthService.logout();
    window.location.replace("/sign-in");
    return;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function AddQuestion(question, options, correctOption) {
  const url = `${apiUrl}/questions`;
  const token = CookieService.getAuthCookie() || null;
  const data = {
    Text: question,
    Options: options.map((v) => v.text),
    CorrectOptionIndex: correctOption,
  };
  if (token == null) {
    AuthService.logout();
    window.location.replace("/sign-in");
    return;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return { status: response.status, data: result };
}
export async function EditQuestion(id, question, options, correctOption) {
  const url = `${apiUrl}/questions?id=${id}`;
  const token = CookieService.getAuthCookie() || null;
  const data = {
    Id: id,
    Text: question,
    Options: options,
    CorrectOptionId: correctOption,
  };
  if (token == null) {
    AuthService.logout();
    window.location.replace("/sign-in");
    return;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return { status: response.status, data: result };
}

export async function DeleteQuestion(id) {
  const url = `${apiUrl}/questions/${id}`;
  const token = CookieService.getAuthCookie() || null;
  if (token == null) {
    AuthService.logout();
    window.location.replace("/sign-in");
    return;
  }
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return { status: response.status, data: result };
}

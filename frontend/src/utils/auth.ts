const AUTH = "auth";

function login() {
  sessionStorage.setItem(AUTH, "true");
}

function logout() {
  sessionStorage.removeItem(AUTH);
  if (nav && path) nav(path);
}

function authGetStatus() {
  return sessionStorage.getItem(AUTH);
}

export { login, logout, authGetStatus };

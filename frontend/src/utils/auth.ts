const AUTH = "auth";

function login(username: string) {
  sessionStorage.setItem(AUTH, username);
}

function logout() {
  sessionStorage.removeItem(AUTH);
}

function authGetStatus() {
  return sessionStorage.getItem(AUTH);
}

export { login, logout, authGetStatus };

const AUTH = "auth";

function login() {
  sessionStorage.setItem(AUTH, "true");
}

function logout() {
  sessionStorage.removeItem(AUTH);
  window.location.reload();
}

function authStatus() {
  return sessionStorage.getItem(AUTH);
}

export { login, logout, authStatus };

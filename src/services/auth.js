export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function getUserInfo() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return parseJwt(token);
}

export function getUserRole() {
  const user = getUserInfo();
  if (!user) return null;

  return (
    user.role ||
    user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    null
  );
}
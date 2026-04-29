export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
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

export function getUserName() {
  const user = getUserInfo();
  if (!user) return "User";

  return (
    user.FullName ||
    user.fullName ||
    user["FullName"] ||
    user.nameid ||
    "User"
  );
}

export function getInitials(name) {
  if (!name) return "U";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0) + words[words.length - 1].charAt(0)
  ).toUpperCase();
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const user = parseJwt(token);
  if (!user) return false;

  if (user.exp && Date.now() >= user.exp * 1000) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
}

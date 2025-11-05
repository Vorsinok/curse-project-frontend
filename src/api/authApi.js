import api from "./client";

export const apiRegister = (payload) =>
  api.post("/auth/register", payload).then((r) => r.data);

export const apiLogin = (payload) =>
  api.post("/auth/login", payload).then((r) => r.data);

export const apiProfile = () =>
  api.get("/auth/profile").then((r) => r.data);

export const oauthUrl = (provider) => {
  const origin = process.env.REACT_APP_BACKEND_ORIGIN;
  return `${origin}/api/auth/${provider}`;
};

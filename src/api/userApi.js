import api from "./client";

export const apiUsers = () => api.get("/users/list-for-access").then((r) => r.data);

export const apiSetRole = (id, role) =>
  api.patch(`/users/${id}/role`, { role }).then((r) => r.data);

export const apiSetBlocked = (id, blocked) =>
  api.patch(`/users/${id}/blocked`, { blocked }).then((r) => r.data);

export const apiGetUserById = (id) =>
  api.get(`/users/${id}`).then((r) => r.data);

export const listUsers = apiUsers;

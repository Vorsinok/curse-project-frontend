import api from "./client";

export const apiSearchInventories = (q) =>
  api.get("/inventories", { params: { q } }).then(r => r.data);

export const apiGetUserInventories = (userId) =>
  api.get(`/inventories/user/${userId}`).then(r => r.data);

export const apiCreateInventory = (payload) =>
  api.post("/inventories", payload).then(r => r.data);

export const apiGetInventory = (id) =>
  api.get(`/inventories/${id}`).then(r => r.data);

export const apiUpdateInventory = (id, payload) =>
  api.patch(`/inventories/${id}`, payload).then(r => r.data);

export const apiDeleteInventory = (id) =>
  api.delete(`/inventories/${id}`).then(r => r.data);

export const apiListEditors = (id) =>
  api.get(`/inventories/${id}/access`).then(r => r.data);
export const apiAddEditor = (id, userId) =>
  api.post(`/inventories/${id}/access`, { userId }).then(r => r.data);
export const apiRemoveEditor = (id, userId) =>
  api.delete(`/inventories/${id}/access/${userId}`).then(r => r.data);

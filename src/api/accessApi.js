import api from "./client";

export const apiListEditors = (inventoryId) =>
  api.get(`/inventories/${inventoryId}/access`).then((r) => r.data);

export const apiAddEditor = (inventoryId, userId) =>
  api.post(`/inventories/${inventoryId}/access`, { userId }).then((r) => r.data);


export const apiRemoveEditor = (inventoryId, userId) =>
  api.delete(`/inventories/${inventoryId}/access/${userId}`).then((r) => r.data);

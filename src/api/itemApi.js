import api from "./client";

export const apiGetItems = (inventoryId) =>
  api.get(`/items/${inventoryId}`).then((r) => r.data);

export const apiCreateItem = (inventoryId, data) =>
  api.post(`/items/${inventoryId}`, data).then((r) => r.data);

export const apiUpdateItem = (inventoryId, itemId, data) =>
  api.patch(`/items/${inventoryId}/${itemId}`, data).then((r) => r.data);

export const apiDeleteItem = (inventoryId, itemId) =>
  api.delete(`/items/${inventoryId}/${itemId}`).then((r) => r.data);

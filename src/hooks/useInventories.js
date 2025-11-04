import { useState, useEffect, useCallback } from "react";
import {
  apiGetUserInventories,
  apiCreateInventory,
  apiDeleteInventory,
  apiUpdateInventory,
} from "../api/inventoryApi";

export function useInventories(userId) {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await apiGetUserInventories(userId);
      setInventories(data);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const createInventory = async (data) => {
    await apiCreateInventory(data);
    await load();
  };

  const deleteInventories = async (ids) => {
    for (const id of ids) await apiDeleteInventory(id);
    await load();
  };

  const updateInventory = async (id, data) => {
    await apiUpdateInventory(id, data);
    await load();
  };

  return {
    inventories,
    loading,
    load,
    createInventory,
    deleteInventories,
    updateInventory,
  };
}

import { useEffect, useState } from "react";
import {
  apiGetItems,
  apiCreateItem,
  apiDeleteItem,
  apiUpdateItem,
} from "../../api/itemApi";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function ItemTab({ inventoryId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await apiGetItems(inventoryId);
      setItems(data);
    } catch {
      console.error(t("items.errors.load"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [inventoryId]);

  const handleAdd = async () => {
    if (!name.trim()) return toast.error(t("items.form.errors.name"));
    try {
      await apiCreateItem(inventoryId, {
        name,
        description,
        customId: Date.now().toString(),
      });
      setName("");
      setDescription("");
      await loadItems();
    } catch {
      toast.error(t("access.errors.add"));
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm(t("items.confirmDelete"))) return;
    try {
      await apiDeleteItem(inventoryId, itemId);
      await loadItems();
    } catch {
      toast.error(t("access.errors.remove"));
    }
  };

  const handleUpdate = async (itemId, oldName) => {
    const newName = prompt(t("toolbar.edit"), oldName);
    if (!newName || newName === oldName) return;
    try {
      await apiUpdateItem(inventoryId, itemId, { name: newName, inventoryId });
      await loadItems();
    } catch {
      toast.error(t("settings.error"));
    }
  };

  if (loading)
    return (
      <p className="text-gray-600 dark:text-gray-300">
        {t("common.loading")}
      </p>
    );

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {t("items.form.title")}
      </h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={t("items.form.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={t("items.form.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600/10 transition font-medium"
        >
          {t("items.form.add")}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t("items.empty")}
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 uppercase text-xs font-semibold">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">{t("items.form.name")}</th>
                <th className="p-3">{t("items.form.description")}</th>
                <th className="p-3">{t("toolbar.edit")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="p-3 text-gray-500 dark:text-gray-400">
                    {item.id}
                  </td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {item.description || "-"}
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleUpdate(item.id, item.name)}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      {t("toolbar.edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-500 font-medium"
                    >
                      {t("common.delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

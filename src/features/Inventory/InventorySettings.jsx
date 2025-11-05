import { useEffect, useState } from "react";
import { apiGetInventory, apiUpdateInventory } from "../../api/inventoryApi";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function InventorySettings({ inventoryId }) {
  const [inventory, setInventory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    apiGetInventory(inventoryId)
      .then((data) => {
        setInventory(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
      })
      .catch(() => console.error(t("settings.error")));
  }, [inventoryId, t]);

  const handleSave = async () => {
    try {
      await apiUpdateInventory(inventoryId, { title, description });
      toast.success(t("settings.saved"));
    } catch {
      toast.success(t("settings.error"));
    }
  };

  if (!inventory)
    return (
      <p className="text-gray-600 dark:text-gray-300">
        {t("common.loading")}
      </p>
    );

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {t("settings.title")}
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("settings.fields.title")}
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("settings.fields.description")}
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600/10 transition font-medium"
        >
          {t("settings.save")}
        </button>
      </div>
    </div>
  );
}

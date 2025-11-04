import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccessTab from "./AccessTab";
import ItemTab from "./ItemTab";
import InventorySettings from "./InventorySettings";
import { apiGetInventory } from "../../api/inventoryApi";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function InventoryPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("items");
  const [inventory, setInventory] = useState(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;
    apiGetInventory(id)
      .then(setInventory)
      .catch(() => console.error(t("inventory.errors.loadOne")));
  }, [id, t]);

  if (!inventory) return <p className="p-6">{t("common.loading")}</p>;

  const isOwner = user?.id === inventory.userId;
  const isAdmin = user?.role === "ADMIN";

  const tabs = [
    { id: "items", label: t("inventory.tabs.items") },
    ...(isOwner || isAdmin
      ? [{ id: "access", label: t("inventory.tabs.access") }]
      : []),
    ...(isAdmin ? [{ id: "settings", label: t("inventory.tabs.settings") }] : []),
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">
        {t("inventory.title")}: <b>{inventory.title}</b>
      </h2>

      <div className="flex gap-4 mb-6">
        {tabs.map((tItem) => (
          <button
            key={tItem.id}
            className={`px-3 py-1 rounded ${
              activeTab === tItem.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tItem.id)}
          >
            {tItem.label}
          </button>
        ))}
      </div>

      {activeTab === "items" && <ItemTab inventoryId={id} />}
      {activeTab === "access" && (isOwner || isAdmin) && (
        <AccessTab inventoryId={id} />
      )}
      {activeTab === "settings" && isAdmin && (
        <InventorySettings inventoryId={id} />
      )}
    </div>
  );
}

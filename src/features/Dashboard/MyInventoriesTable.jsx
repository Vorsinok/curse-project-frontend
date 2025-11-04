import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useInventories } from "../../hooks/useInventories";
import { InventoriesTable } from "../Inventory/InventoriesTable";
import EditInventoryModal from "../../components/EditInventoryModal";
import { SearchInput } from "../../components/SearchInput";

export default function MyInventoriesTable() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { inventories, loading, createInventory, deleteInventories, updateInventory } =
    useInventories(user?.id);

  const [selectedIds, setSelectedIds] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createInventory({ title, description });
    setTitle("");
    setDescription("");
  };

  const handleDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(t("inventory.confirm.delete"))) return;
    await deleteInventories(selectedIds);
    setSelectedIds([]);
  };

  const handleEdit = () => {
    if (selectedIds.length !== 1) return;
    const inv = inventories.find((x) => x.id === selectedIds[0]);
    setEditing(inv);
    setEditTitle(inv.title);
    setEditDescription(inv.description);
  };

  const saveEdit = async () => {
    await updateInventory(editing.id, { title: editTitle, description: editDescription });
    setEditing(null);
  };

  const handleOpen = () => {
    if (selectedIds.length === 1) navigate(`/inventories/${selectedIds[0]}`);
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20 text-gray-600 dark:text-gray-300">
        {t("common.loading")}
      </div>
    );

  const singleSelected = selectedIds.length === 1;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        {t("inventory.myInventories")}
      </h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          placeholder={t("inventory.fields.name")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="flex-1 p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          placeholder={t("inventory.fields.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
        >
          {t("inventory.buttons.create")}
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("inventory.search")}
        />
        <div className="flex gap-2">
          <button
            onClick={handleOpen}
            disabled={!singleSelected}
            className={`px-4 py-2 rounded-md font-medium border transition ${singleSelected
              ? "border-blue-600 text-blue-600 hover:bg-blue-600/10"
              : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
          >
            {t("inventory.table.open")}
          </button>

          <button
            onClick={handleEdit}
            disabled={!singleSelected}
            className={`px-4 py-2 rounded-md font-medium border transition ${singleSelected
              ? "border-blue-600 text-blue-600 hover:bg-blue-600/10"
              : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
          >
            {t("toolbar.edit")}
          </button>

          <button
            onClick={handleDelete}
            disabled={!selectedIds.length}
            className={`px-4 py-2 rounded-md font-medium border transition ${selectedIds.length
              ? "border-red-600 text-red-600 hover:bg-red-600/10"
              : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
          >
            {t("toolbar.delete")}
          </button>
        </div>
      </div>
      <InventoriesTable
        inventories={inventories}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        search={search}
        setSearch={setSearch}
        t={t}
      />

      <EditInventoryModal
        editing={editing}
        setEditing={setEditing}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        onSave={saveEdit}
        t={t}
      />
    </div>
  );
}

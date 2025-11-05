import { useEffect, useState } from "react";
import { getItems, createItem } from "../../api/itemApi";
import ItemForm from "./ItemForm";
import Toolbar from "../../components/Toolbar";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

export default function ItemPage() {
  const { id: inventoryId } = useParams();
  const [query, setQuery] = useState("");
  const q = useDebounce(query, 400);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const items = await getItems(inventoryId, q);
    setRows(items);
    setSelected([]);
  };

  const handleSubmit = async () => {
    await createItem(inventoryId, editing);
    setEditing(null);
    await load();
  };

  const handleEdit = () => {
    const selectedId = selected[0];
    const row = rows.find(r => r.id === selectedId) || null;
    setEditing(row);
  };

  useEffect(() => { load(); }, [inventoryId, q]);

  const columns = [
    { header: "ID", accessor: "customId" },
    { header: "Str1", accessor: "custom_string1" },
    { header: "Int1", accessor: "custom_int1" }
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="px-3 py-2 rounded bg-white dark:bg-gray-800 flex-1"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <Toolbar
        onAdd={() => setEditing({})}
        onEdit={handleEdit}
        onDelete={() => toast.success("Implement delete")}
        disableEdit={selected.length !== 1}
        disableDelete={selected.length === 0}
      />

      <Table
        columns={columns}
        rows={rows}
        selectedIds={selected}
        setSelectedIds={setSelected}
      />

      {editing && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded">
          <ItemForm
            value={editing}
            onChange={setEditing}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

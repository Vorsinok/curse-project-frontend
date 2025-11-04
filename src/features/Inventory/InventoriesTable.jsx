export function InventoriesTable({ inventories, selectedIds, setSelectedIds, search, setSearch, t }) {
  const filtered = inventories.filter((inv) => {
    const query = search.toLowerCase();
    return (
      inv.title?.toLowerCase().includes(query) ||
      inv.description?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mt-4">
        <table className="w-full text-base text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 uppercase text-sm font-semibold">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">{t("inventory.table.name")}</th>
              <th className="p-4">{t("inventory.table.description")}</th>
              <th className="p-4">{t("inventory.table.date")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.map((inv) => (
              <tr
                key={inv.id}
                onClick={() =>
                  setSelectedIds((prev) =>
                    prev.includes(inv.id)
                      ? prev.filter((i) => i !== inv.id)
                      : [...prev, inv.id]
                  )
                }
                className={`cursor-pointer transition ${
                  selectedIds.includes(inv.id)
                    ? "bg-blue-50 dark:bg-blue-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <td className="p-4 text-gray-500 dark:text-gray-400">{inv.id}</td>
                <td className="p-4 font-medium">{inv.title}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{inv.description}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400">
                  {new Date(inv.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!filtered.length && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            {t("inventory.noResults")}
          </div>
        )}
      </div>
    </>
  );
}

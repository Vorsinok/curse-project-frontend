export default function EditInventoryModal({ editing, setEditing, editTitle, setEditTitle, editDescription, setEditDescription, onSave, t }) {
  if (!editing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 w-96 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t("toolbar.edit")}
        </h3>
        <input
          className="w-full mb-3 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder={t("inventory.fields.name")}
        />
        <textarea
          className="w-full mb-4 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder={t("inventory.fields.description")}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(null)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:opacity-80 transition"
          >
            {t("settings.cancel")}
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {t("settings.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

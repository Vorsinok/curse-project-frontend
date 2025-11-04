import { useEffect, useState } from "react";
import { addComment, listComments } from "../../api/inventoryApi";
import { useTranslation } from "react-i18next";

export default function CommentsTab({ inventoryId }) {
  const [rows, setRows] = useState([]);
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const fetchComments = async () => setRows((await listComments(inventoryId)) || []);

  const send = async () => {
    if (!text.trim()) return;
    await addComment(inventoryId, text.trim());
    setText("");
    await fetchComments();
  };

  useEffect(() => {
    fetchComments();
    const tmr = setInterval(fetchComments, 3000);
    return () => clearInterval(tmr);
  }, [inventoryId]);

  return (
    <div className="space-y-3 max-w-2xl">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-white dark:bg-gray-800"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("items.form.description")}
        />
        <button
          className="px-3 py-2 rounded bg-blue-600 text-white"
          onClick={send}
        >
          {t("items.form.add")}
        </button>
      </div>
      <ul className="space-y-2">
        {rows.map((c) => (
          <li key={c.id} className="p-2 rounded bg-white dark:bg-gray-800">
            <div className="text-xs opacity-70">
              {c.user?.email} · {new Date(c.createdAt).toLocaleString()}
            </div>
            <div>{c.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import { apiUsers, apiSetRole, apiSetBlocked } from "../../api/userApi";
import { useTranslation } from "react-i18next";

export default function UsersTable() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const { t } = useTranslation();

  const load = async () => {
    setErr("");
    try {
      const data = await apiUsers();
      setRows(data);
    } catch (e) {
      setErr(e?.response?.data?.error || t("common.loading"));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRole = async (u) => {
    await apiSetRole(u.id, u.role === "ADMIN" ? "USER" : "ADMIN");
    load();
  };
  const toggleBlock = async (u) => {
    await apiSetBlocked(u.id, !u.blocked);
    load();
  };

  return (
    <div>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2">ID</th>
            <th className="border p-2">{t("admin.table.email")}</th>
            <th className="border p-2">{t("admin.table.role")}</th>
            <th className="border p-2">{t("admin.table.status")}</th>
            <th className="border p-2">{t("common.delete")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.blocked ? t("admin.status.blocked") : t("admin.status.active")}
              </td>
              <td className="border p-2">
                <button onClick={() => toggleRole(u)} className="px-2 border rounded mr-2">
                  {t("toolbar.edit")}
                </button>
                <button onClick={() => toggleBlock(u)} className="px-2 border rounded">
                  {t("toolbar.delete")}
                </button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={5} className="p-3 text-center opacity-70">
                {t("inventory.empty")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

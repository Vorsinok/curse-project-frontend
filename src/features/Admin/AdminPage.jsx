import { apiUsers } from "../../api/userApi";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => { (async()=> setRows(await apiUsers()))(); }, []);
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Users</h1>
      <table className="w-full text-sm border-collapse">
        <thead><tr><th className="p-2">Email</th><th className="p-2">Role</th></tr></thead>
        <tbody>{rows.map(u=><tr key={u.id}><td className="p-2">{u.email}</td><td className="p-2">{u.role}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

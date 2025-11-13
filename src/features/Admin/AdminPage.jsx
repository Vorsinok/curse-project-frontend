import { apiUsers } from "../../api/userApi";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable"

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => { (async()=> setRows(await apiUsers()))(); }, []);
  return (
    <div className="space-y-2">
      <UsersTable/>
    </div>
  );
}

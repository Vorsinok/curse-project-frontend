import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import toast from "react-hot-toast";
import {
  apiListEditors,
  apiAddEditor,
  apiRemoveEditor,
} from "../../api/accessApi";
import { apiUsers } from "../../api/userApi";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function AccessTab({ inventoryId }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [accessList, setAccessList] = useState([]);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    apiUsers()
      .then(setUsers)
      .catch(() => console.error(t("access.errors.loadUsers")));

    apiListEditors(inventoryId)
      .then(setAccessList)
      .catch(() => console.error(t("access.errors.loadAccess")));
  }, [inventoryId, t]);

  const handleAdd = async () => {
    if (!selectedUser) return;
    try {
      await apiAddEditor(inventoryId, selectedUser.value);
      setAccessList((prev) => [
        ...prev,
        {
          userId: selectedUser.value,
          user: { username: selectedUser.label },
          canEdit: true,
        },
      ]);
      setSelectedUser(null);
    } catch {
      toast.error(t("access.errors.add"));
    }
  };

  const handleRemove = async (userId) => {
    try {
      await apiRemoveEditor(inventoryId, userId);
      setAccessList((prev) => prev.filter((a) => a.userId !== userId));
    } catch {
      toast.error(t("access.errors.remove"));
    }
  };

  const options = users
    .filter((u) => u.id !== user?.id)
    .map((u) => ({
      value: u.id,
      label: `${u.username} (${u.email})`,
    }));

  const customComponents = {
    Control: (props) => (
      <components.Control
        {...props}
        className="!bg-gray-50 dark:!bg-gray-800 !border !border-gray-300 dark:!border-gray-700 !rounded-md !shadow-none hover:!border-blue-600 transition"
      />
    ),
    Menu: (props) => (
      <components.Menu
        {...props}
        className="!bg-white dark:!bg-gray-900 !border !border-gray-200 dark:!border-gray-700 !rounded-md !shadow-lg z-50"
      />
    ),
    Option: (props) => (
      <components.Option
        {...props}
        className={`!cursor-pointer !px-3 !py-2 ${
          props.isFocused
            ? "!bg-blue-600 !text-white"
            : "dark:!bg-gray-900 !bg-white dark:!text-gray-200"
        }`}
      />
    ),
    SingleValue: (props) => (
      <components.SingleValue
        {...props}
        className="!text-gray-900 dark:!text-gray-100"
      />
    ),
    Placeholder: (props) => (
      <components.Placeholder
        {...props}
        className="!text-gray-400 dark:!text-gray-500"
      />
    ),
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {t("access.title")}
      </h3>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 sm:w-96">
          <Select
            value={selectedUser}
            onChange={setSelectedUser}
            options={options}
            placeholder={t("access.placeholder")}
            classNames={{
              control: () => "text-sm",
              menu: () => "text-sm",
              option: () => "text-sm",
            }}
            components={customComponents}
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600/10 transition font-medium"
        >
          {t("access.add")}
        </button>
      </div>

      {accessList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t("access.empty")}
        </p>
      ) : (
        <ul className="space-y-2">
          {accessList.map((a) => (
            <li
              key={a.userId}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2"
            >
              <span className="text-gray-800 dark:text-gray-200">
                {a.user?.username || `User #${a.userId}`}
              </span>
              <button
                onClick={() => handleRemove(a.userId)}
                className="px-3 py-1 rounded-md border border-red-600 text-red-600 hover:bg-red-600/10 transition text-sm"
              >
                {t("access.remove")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

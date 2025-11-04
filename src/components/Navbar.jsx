import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/my-inventories"
            className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {t("navbar.myInventories")}
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              {t("navbar.adminPanel")}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher />

          {!user ? (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {t("navbar.login")}
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                {t("auth.register.title")}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {t("navbar.logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

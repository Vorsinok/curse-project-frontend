import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin, oauthUrl } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const nav = useNavigate();
  const { loginWithToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const { t } = useTranslation();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { token } = await apiLogin(form);
      loginWithToken(token);
      nav("/dashboard/my-inventories");
    } catch (e) {
      setErr(e?.response?.data?.error || t("auth.login.button"));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8 space-y-5 transition">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          {t("auth.login.title")}
        </h1>

        {err && <div className="text-red-500 text-sm text-center">{err}</div>}

        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder={t("auth.email")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            type="password"
            placeholder={t("auth.password")}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            {t("auth.login.button")}
          </button>
        </form>

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          {t("common.or")}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => (window.location.href = oauthUrl("google"))}
            className="flex-1 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Google
          </button>
          <button
            onClick={() => (window.location.href = oauthUrl("github"))}
            className="flex-1 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            GitHub
          </button>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t("auth.noAccount")}{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("auth.register.title")}
          </Link>
        </div>
      </div>
    </div>
  );
}

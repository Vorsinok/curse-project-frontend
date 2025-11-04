import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../../api/authApi";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const { t } = useTranslation();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    try {
      await apiRegister(form);
      setOk(t("auth.register.button"));
      setTimeout(() => nav("/login"), 800);
    } catch (e) {
      setErr(e?.response?.data?.error || t("auth.register.title"));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8 space-y-5 transition">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          {t("auth.register.title")}
        </h1>

        {err && <div className="text-red-500 text-sm text-center">{err}</div>}
        {ok && <div className="text-green-500 text-sm text-center">{ok}</div>}

        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder={t("auth.email")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder={t("auth.username")}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
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
            {t("auth.register.button")}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t("auth.haveAccount")}{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("auth.login.title")}
          </Link>
        </div>
      </div>
    </div>
  );
}

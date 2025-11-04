import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                 font-medium text-sm shadow-sm 
                 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
                 transition-all duration-200 outline-none cursor-pointer"
    >
      <option value="en" className="bg-gray-50 dark:bg-gray-800">
        EN
      </option>
      <option value="ru" className="bg-gray-50 dark:bg-gray-800">
        RU
      </option>
    </select>
  );
};

export default LanguageSwitcher;

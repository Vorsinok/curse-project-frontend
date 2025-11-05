import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-neutral-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">{children}</div>
    </div>
  );
}

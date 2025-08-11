import { Outlet, Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminHomePage() {
  useAdminAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 box-border">
      {/* Бічна панель */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col fixed h-full left-0 top-0 box-border">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700 box-border">
          Адмін панель
        </h1>
        <Link to="categories" className="p-4 hover:bg-gray-700 box-border">
          Категорії
        </Link>
        <Link to="events" className="p-4 hover:bg-gray-700 box-border">
          Мапа
        </Link>
        <Link to="candle-types" className="p-4 hover:bg-gray-700 box-border">
          Типи свічок
        </Link>
      </nav>

      {/* Контент */}
      <div className="flex-1 min-h-screen bg-gray-100 p-6 ml-64 box-border">
        <Outlet />
      </div>
    </div>
  );
}

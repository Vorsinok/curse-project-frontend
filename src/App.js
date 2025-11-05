import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./features/Auth/LoginPage";
import RegisterPage from "./features/Auth/RegisterPage";
import SocialLogin from "./features/Auth/SocialLogin";
import MyInventoriesTable from "./features/Dashboard/MyInventoriesTable";
import InventoryPage from "./features/Inventory/InventoryPage";
import AdminPage from "./features/Admin/AdminPage";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Layout>
            {user ? <Navigate to="/dashboard/my-inventories" /> : <LoginPage />}
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            {user ? <Navigate to="/dashboard/my-inventories" /> : <RegisterPage />}
          </Layout>
        }
      />
      <Route path="/oauth-callback" element={<SocialLogin />} />
      <Route
        path="/dashboard/my-inventories"
        element={
          <Layout>
            <PrivateRoute>
              <MyInventoriesTable />
            </PrivateRoute>
          </Layout>
        }
      />
      <Route
        path="/inventories/:id"
        element={
          <Layout>
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          </Layout>
        }
      />
      <Route
        path="/admin"
        element={
          <Layout>
            <PrivateRoute admin>
              <AdminPage />
            </PrivateRoute>
          </Layout>
        }
      />
      <Route
        path="*"
        element={
        <Navigate to="/dashboard/my-inventories" replace />
      }
      />
    </Routes>
  );
}

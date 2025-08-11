import { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/apiClient";
import { saveAdminSession } from "../../hooks/useAdminAuth";
import { showErrorToast, showSuccessToast } from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await apiClient.post(
        "/admin/login",
        {},
        {
          headers: { "x-admin-password": password },
        }
      );

      saveAdminSession(password);
      showSuccessToast(MESSAGES.SUCCESS.LOGIN_SUCCESS);
      navigate("../admin");
    } catch (error) {
      showErrorToast(MESSAGES.ERROR.INVALID_PASSWORD, error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 box-border px-0 py-0">
      <div className="bg-white p-6 rounded shadow-md w-80 box-border">
        <h1 className="text-xl font-bold mb-4 text-center">
          Вхід для адміністратора
        </h1>
        <input
          type="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full ${CSS_CLASSES.INPUT} mb-4 box-border`}
        />
        <button
          onClick={handleLogin}
          className={`w-full ${CSS_CLASSES.BUTTON_PRIMARY} box-border`}
        >
          Увійти
        </button>
      </div>
    </div>
  );
}

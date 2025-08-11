import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_CONSTANTS } from '../components/admin/constants';

export const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(
      localStorage.getItem(ADMIN_CONSTANTS.STORAGE_KEY) || '{}'
    );

    const isSessionValid = 
      adminData.password && 
      Date.now() - adminData.timestamp <= ADMIN_CONSTANTS.SESSION_DURATION;

    if (!isSessionValid) {
      navigate('/admin/login');
    }
  }, [navigate]);
};

export const saveAdminSession = (password: string) => {
  localStorage.setItem(
    ADMIN_CONSTANTS.STORAGE_KEY,
    JSON.stringify({ password, timestamp: Date.now() })
  );
};
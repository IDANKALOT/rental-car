import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminLogin from './AdminLogin';

export default function AdminPage() {
  const { user } = useApp();
  if (!user?.isAdmin) return <AdminLogin />;
  return <AdminDashboard />;
}

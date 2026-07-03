import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../ui/Loader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="py-24"><Loader label="checking session…" /></div>;
  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return children;
}

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThreeDotsSpinner from '../components/spinners/ThreeDotsSpinner';

const ProtectedRoute = () => {
    const location = useLocation();
    const { token, loading } = useAuth();

    if (loading) {
        return <ThreeDotsSpinner />;
    }

    return token ?
        <Outlet />
        : <Navigate to="/login" state={{ path: location.pathname }} replace />;
};

export default ProtectedRoute;

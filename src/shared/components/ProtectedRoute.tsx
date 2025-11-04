import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>
        {children}
    </>; 
};

export default ProtectedRoute;
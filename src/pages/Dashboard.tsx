import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h1>Página Logada (Dashboard)</h1>
            <p>Você está autenticado com sucesso.</p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
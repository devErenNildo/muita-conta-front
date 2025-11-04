import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import ProtectedRoute from '../../shared/components/ProtectedRoute';
import MainLayout from '../../shared/components/molecules/MainLayout';


function AppRoutes() {
  return (
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/cartao'
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard/>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="*" 
          element={<Navigate to="/cartao" replace />} 
        />
      </Routes>
  )
}

export default AppRoutes
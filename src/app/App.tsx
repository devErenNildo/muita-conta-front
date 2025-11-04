import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useThemeEffect } from './hooks/useThemeEffect';
import '../shared/styles/App.css';

function App() {
    useThemeEffect();
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
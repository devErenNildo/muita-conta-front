import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { loginThunk } from '../features/auth/authThunks';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Hooks do Redux
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginThunk({ email, senha }));
    };

    if (isAuthenticated) {
        return <div>Você está logado!</div>;
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Entrar'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
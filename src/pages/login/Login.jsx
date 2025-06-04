import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import GoogleLoginRedirectButton from '../../components/GoogleLoginRedirectButton';
import { getUserByEmail } from '../../data/services/authentication';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInputView, setPasswordInputView] = useState(false);

    const warning = (message) => {
        toast.warning(message, { duration: 6000 });
    };

    const handleLogin = () => {
        if (email.trim() === '') {
            warning('Digite seu email!');
            return;
        }
        if (password.trim() === '') {
            warning('Digite sua senha!');
            return;
        }
        onLogin(email, password);
    };

    const handlerCheckUser = async () => {
        if (email.trim() === '') {
            warning('Digite seu email!');
            return;
        }

        const user = await getUserByEmail(email);
        if (!user) {
            warning('Usuário não encontrado!');
            return;
        }

        setPasswordInputView(true);
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-right" richColors expand />
            <div style={styles.box}>
                <h2 style={styles.title}>Login do Atendente</h2>

                {!passwordInputView && (
                    <div style={styles.formContainer}>
                        <input
                            type="text"
                            placeholder="Usuário ou E‑mail"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button style={styles.buttonPrimary} onClick={handlerCheckUser}>
                            Próximo
                        </button>

                        <p style={styles.orText}>ou</p>

                        <div style={styles.googleButtonWrapper}>
                            <GoogleLoginRedirectButton />
                        </div>
                    </div>
                )}

                {passwordInputView && (
                    <div style={styles.formContainer}>
                        <input
                            type="password"
                            placeholder="Senha"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button style={styles.buttonPrimary} onClick={handleLogin}>
                            Entrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        background: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
    },
    box: {
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginBottom: '1.5rem',
        color: '#333',
        fontWeight: '600',
        fontSize: '1.5rem',
    },
    formContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        width: '100%',
        justifyItems: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        margin: '0.5rem 0',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    buttonPrimary: {
        width: '100%',
        padding: '0.75rem',
        marginTop: '1rem',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    orText: {
        margin: '1rem 0 0.5rem',
        fontSize: '0.9rem',
        color: '#666',
    },
    googleButtonWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
};

export default Login;

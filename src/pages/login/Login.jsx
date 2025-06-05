import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import GoogleLoginRedirectButton from '../../components/GoogleLoginRedirectButton';
import { getUserByEmail } from '../../data/services/authentication';
import { register } from '../../data/services/authentication.js';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInputView, setPasswordInputView] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        name: 'Joao',
        email: 'jpbandeiralima@gmail.com',
        password: 'joao@1325'
    });

    const location = useLocation();
    useEffect(() => {
        var routeError = location.state?.error;
        if (routeError === 'user_not_found') {
            setShowRegisterModal(true)
            error("Falha ao executar login!")
        }
    }, [location])

    const warning = (message) => {
        toast.warning(message, { duration: 6000 });
    };

    const error = (message) => {
        toast.error(message, { duration: 6000 });
    };

    const handleLogin = () => {
        if (email.trim() === '') return warning('Digite seu email!');
        if (password.trim() === '') return warning('Digite sua senha!');
        onLogin(email, password);
    };

    const handlerCheckUser = async () => {
        if (email.trim() === '') return warning('Digite seu email!');
        const user = await getUserByEmail(email);
        if (!user) return warning('Usuário não encontrado!');
        setPasswordInputView(true);
    };

    const redirectToGoogle = (userEmail) => {
        const params = new URLSearchParams({
            client_id: '1029869628439-4oktu2r09i1ult36tgfli3vu2jh3qid8.apps.googleusercontent.com',
            redirect_uri: 'http://local.fidelity.com:30081/authentication/auth/google/callback',
            response_type: 'code',
            scope: [
                'openid',
                'email',
                'https://www.googleapis.com/auth/calendar.readonly'
            ].join(' '),
            access_type: 'offline',
            prompt: 'consent',
            login_hint: userEmail
        });
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        window.location.href = googleAuthUrl;
    };

    const handleRegister = async () => {
        const { name: userName, email: userEmail, password: userPassword } = registerForm;

        if (!userName || !userEmail || !userPassword) {
            return warning('Preencha todos os campos!');
        }

        const existingUser = await getUserByEmail(userEmail);
        if (existingUser) {
            return warning('Este e-mail já está em uso!');
        }

        const user = await register(
            {
                name: userName,
                email: userEmail,
                password: userPassword
            }
        )
        if (user === null) {
            error('Falha ao cadastrar usuário!')
            return
        }
        toast.success('Cadastro realizado com sucesso! Redirecionando para login com Google...');

        setTimeout(() => {
            redirectToGoogle(userEmail)
        }, 2000);

        setShowRegisterModal(false);
        setRegisterForm({ name: '', email: '', password: '' });
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

                        <button
                            style={styles.registerButton}
                            onClick={() => {
                                setShowRegisterModal(true);
                            }}
                        >
                            Cadastrar novo usuário
                        </button>
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

            {showRegisterModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>Cadastro de Usuário</h3>
                        <input
                            type="text"
                            name="name"
                            autoComplete="off"
                            placeholder="Nome"
                            style={styles.input}
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        />

                        <input
                            type="email"
                            name="register-email"
                            autoComplete="new-email"
                            placeholder="Email"
                            style={styles.input}
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />

                        <input
                            type="password"
                            name="register-password"
                            autoComplete="new-password"
                            placeholder="Senha"
                            style={styles.input}
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <button style={styles.buttonPrimary} onClick={handleRegister}>
                            Cadastrar
                        </button>
                        <button style={styles.buttonSecondary} onClick={() => setShowRegisterModal(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
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
    buttonSecondary: {
        width: '100%',
        padding: '0.75rem',
        marginTop: '0.5rem',
        backgroundColor: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    registerButton: {
        marginTop: '1rem',
        fontSize: '0.95rem',
        background: 'none',
        border: 'none',
        color: '#1976d2',
        textDecoration: 'underline',
        cursor: 'pointer',
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
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalContent: {
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
    },
    modalTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
    },
};

export default Login;

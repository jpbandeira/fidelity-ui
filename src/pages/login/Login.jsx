import React, { useState } from 'react';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aqui você pode validar o login
        onLogin(email, password); // chama o callback passado por App.js
    };

    const handleGoogleLogin = () => {
        alert("Login com Google ainda não implementado.");
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.title}>Login do Atendente</h2>
                <input
                    type="text"
                    placeholder="Usuário ou E-mail"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button style={styles.button} onClick={() => handleLogin()}>
                    Entrar
                </button>
                <div style={styles.divider}>ou</div>
                <button style={styles.googleButton} onClick={handleGoogleLogin}>
                    Entrar com Google
                </button>
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
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        margin: '0.5rem 0',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    button: {
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
    divider: {
        margin: '1.5rem 0 0.5rem',
        color: '#888',
        fontSize: '0.9rem',
    },
    googleButton: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#db4437',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
};


export default Login;

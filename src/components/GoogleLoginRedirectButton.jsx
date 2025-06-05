import React from 'react';

const GoogleLoginRedirectButton = () => {
    const redirectToGoogle = () => {
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
            prompt: 'consent'
        });
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        window.location.href = googleAuthUrl;
    };

    return (
        <button
            onClick={redirectToGoogle}
            style={{
                flex: 1,
                minWidth: 0,
                height: '48px',
                backgroundColor: '#ffffff',
                color: '#3c4043',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #dadce0',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                overflow: 'hidden',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                marginTop: '1rem',
            }}
        >
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                style={{ width: '18px', height: '18px', objectFit: 'contain' }}
            />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Entrar com Google
            </span>
        </button>
    );
};

export default GoogleLoginRedirectButton;
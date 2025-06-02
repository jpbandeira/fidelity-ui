import React from 'react';

const GoogleLoginRedirectButton = () => {
    const redirectToGoogle = () => {
        const params = new URLSearchParams({
            client_id: '1029869628439-4oktu2r09i1ult36tgfli3vu2jh3qid8.apps.googleusercontent.com',
            redirect_uri: 'http://local.fidelity.com:8083/auth/google/callback',
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
                backgroundColor: '#ffffff',
                color: '#3c4043',
                fontSize: '14px',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '4px',
                border: '1px solid #dadce0',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
            }}
        >
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                style={{ width: '18px', height: '18px' }}
            />
            Entrar com Google
        </button>
    );
};

export default GoogleLoginRedirectButton;
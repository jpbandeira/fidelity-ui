import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/session/Context';

const RequiredSession = ({ children }) => {
    const { userSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userSession) {
            navigate('/');
        }
    }, [userSession, navigate]);

    if (!userSession) return null;

    return children;
};

export default RequiredSession;

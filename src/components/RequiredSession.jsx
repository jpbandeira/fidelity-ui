import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/session/Context";

export default function RequireSession({ children }) {
    const { userSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userSession) {
            navigate('/');
        }
    }, [userSession, navigate]);

    if (!userSession) return null; // Evita piscar conteúdo antes de redirecionar

    return children;
}

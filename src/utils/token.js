
export const decodeJWT = (token) => {
    const [header, payload, signature] = token.split('.');

    const base64UrlDecode = str =>
        JSON.parse(
            decodeURIComponent(
                atob(str.replace(/-/g, '+').replace(/_/g, '/'))
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            )
        );

    return {
        header: base64UrlDecode(header),
        payload: base64UrlDecode(payload),
        signature
    };
}


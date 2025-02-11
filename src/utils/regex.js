export const is_valid_name = (value) => {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value);
}

export const is_valid_email = (value) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value);
}

export const is_valid_phone = (value) => {
    return /^\d{11}$/.test(value);
}

export const is_number = (value) => {
    return /^\d+$/.test(value);
}

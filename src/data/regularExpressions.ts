// At least 8 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and one symbol password
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[\W_]).{8,}$/;

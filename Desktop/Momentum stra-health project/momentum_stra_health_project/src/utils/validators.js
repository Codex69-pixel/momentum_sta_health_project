export const isRequired = (v) => (v !== undefined && v !== null && String(v).trim().length > 0);
export const isEmail = (v) => /\S+@\S+\.\S+/.test(String(v).toLowerCase());
export const hasMinLength = (v, len) => String(v || '').length >= len;

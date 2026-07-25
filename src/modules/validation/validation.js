// Módulo de validación de entradas
export function validateUserInput(name, email, role) {
    if (!name || name.trim().length < 3) {
        return { valid: false, message: 'El nombre debe tener al menos 3 caracteres.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex || !emailRegex.test(email)) {
        return { valid: false, message: 'Ingresa un correo electrónico válido.' };
    }
    if (!role) {
        return { valid: false, message: 'Debe seleccionar un rol.' };
    }
    return { valid: true };
}
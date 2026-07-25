// Módulo de autenticación de usuario
export function checkUserSession() {
    const session = localStorage.getItem('crud_session');
    if (!session) {
        // Asignar sesión por defecto si no existe
        localStorage.setItem('crud_session', JSON.stringify({ user: 'Admin', role: 'Administrador' }));
    }
    return JSON.parse(localStorage.getItem('crud_session'));
}
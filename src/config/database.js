// Configuración y gestión del almacenamiento persistente (localStorage)

const STORAGE_KEY = 'crud_users_data';

// Datos iniciales de prueba si el almacenamiento está vacío
const initialUsers = [
    { id: 1, name: 'Carlos Mendoza', email: 'carlos@example.com', role: 'Miembro', createdAt: '2026-03-15' },
    { id: 2, name: 'Ana Rodríguez', email: 'ana@example.com', role: 'Administrador', createdAt: '2026-04-10' }
];

export const Database = {
    // Obtener todos los usuarios
    getUsers() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            this.saveUsers(initialUsers);
            return initialUsers;
        }
        return JSON.parse(data);
    },

    // Guardar lista completa de usuarios
    saveUsers(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
};
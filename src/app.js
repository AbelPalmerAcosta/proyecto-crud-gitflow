import { checkUserSession } from './modules/auth/login.js';
import { validateUserInput } from './modules/validation/validation.js';
import { processSubscription } from './modules/payment/payment.js';
import { DashboardController } from './modules/dashboard/dashboard.js';

// Base de datos inicial / fallback si el almacenamiento está vacío
const initialUsers = [
    { id: 1, name: 'Carlos Mendoza', email: 'carlos@example.com', role: 'Miembro', createdAt: '2026-03-15' },
    { id: 2, name: 'Ana Rodríguez', email: 'ana@example.com', role: 'Administrador', createdAt: '2026-04-10' }
];

// Cargar usuarios desde localStorage o inicializar
let users = JSON.parse(localStorage.getItem('crud_users_data')) || initialUsers;

// Instancia del controlador de interfaz
const dashboard = new DashboardController('user-table-body');

// Elementos del DOM
const form = document.getElementById('user-form');
const userIdInput = document.getElementById('user-id');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const userRoleInput = document.getElementById('user-role');
const statusMsg = document.getElementById('status-message');
const sessionBadge = document.getElementById('session-badge');

// Guardar en la memoria persistente del navegador
function saveToStorage() {
    localStorage.setItem('crud_users_data', JSON.stringify(users));
}

// Renderizar la tabla de datos
function refreshUI() {
    dashboard.render(users, handleEdit, handleDelete);
}

// Cargar datos en el formulario para editar (UPDATE)
function handleEdit(user) {
    userIdInput.value = user.id;
    userNameInput.value = user.name;
    userEmailInput.value = user.email;
    userRoleInput.value = user.role;
    
    if (statusMsg) {
        statusMsg.textContent = `Editando ID: #${user.id}`;
        statusMsg.className = 'text-xs font-medium text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md';
    }
}

// Eliminar un registro (DELETE)
function handleDelete(id) {
    if (confirm(`¿Confirmas que deseas eliminar al usuario #${id}?`)) {
        users = users.filter(u => u.id !== id);
        saveToStorage();
        refreshUI();
        
        if (statusMsg) {
            statusMsg.textContent = 'Usuario eliminado';
            statusMsg.className = 'text-xs font-medium text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md';
        }
    }
}

// Evento Submit del formulario (CREATE / UPDATE)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = userIdInput.value;
    const name = userNameInput.value;
    const email = userEmailInput.value;
    const role = userRoleInput.value;

    // Validación mediante el módulo de validación
    const validation = validateUserInput(name, email, role);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }

    if (id) {
        // OPERACIÓN: UPDATE
        users = users.map(u => u.id == id ? { ...u, name, email, role } : u);
        if (statusMsg) {
            statusMsg.textContent = 'Usuario actualizado';
            statusMsg.className = 'text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md';
        }
    } else {
        // OPERACIÓN: CREATE
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            role,
            createdAt: new Date().toISOString()
        };
        
        // Simulación de transacción del módulo de pagos
        processSubscription(newUser.id, 'Free Tier');
        
        users.push(newUser);
        if (statusMsg) {
            statusMsg.textContent = 'Usuario registrado';
            statusMsg.className = 'text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md';
        }
    }

    // Limpiar formulario y guardar cambios
    form.reset();
    userIdInput.value = '';
    saveToStorage();
    refreshUI();
});

// Inicialización de Sesión y Renderizado Inicial
const session = checkUserSession();
if (sessionBadge && session) {
    sessionBadge.textContent = `Sesión: ${session.user} (${session.role})`;
}

refreshUI();
import { Database } from './config/database.js';
import { checkUserSession } from './modules/auth/login.js';
import { validateUserInput } from './modules/validation/validation.js';
import { processSubscription } from './modules/payment/payment.js';
import { DashboardController } from './modules/dashboard/dashboard.js';

// 1. Obtener datos iniciales mediante el módulo Database
let users = Database.getUsers();

// 2. Instanciar controlador para la interfaz de usuario
const dashboard = new DashboardController('user-table-body');

// 3. Captura de elementos DOM
const form = document.getElementById('user-form');
const userIdInput = document.getElementById('user-id');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const userRoleInput = document.getElementById('user-role');
const statusMsg = document.getElementById('status-message');
const sessionBadge = document.getElementById('session-badge');

// 4. Persistir cambios en el módulo Database
function saveToStorage() {
    Database.saveUsers(users);
}

// 5. Renderizar la tabla de la interfaz
function refreshUI() {
    dashboard.render(users, handleEdit, handleDelete);
}

// 6. Manejo de edición (UPDATE - Cargar en formulario)
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

// 7. Manejo de eliminación (DELETE)
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

// 8. Event Listener del formulario (CREATE / UPDATE)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = userIdInput.value;
    const name = userNameInput.value;
    const email = userEmailInput.value;
    const role = userRoleInput.value;

    // Validación de entradas
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
        
        // Simulación del módulo de suscripciones / pagos
        processSubscription(newUser.id, 'Free Tier');
        
        users.push(newUser);
        if (statusMsg) {
            statusMsg.textContent = 'Usuario registrado';
            statusMsg.className = 'text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md';
        }
    }

    // Resetear formulario y guardar
    form.reset();
    userIdInput.value = '';
    saveToStorage();
    refreshUI();
});

// 9. Inicialización de sesión y render inicial
const session = checkUserSession();
if (sessionBadge && session) {
    sessionBadge.textContent = `Sesión: ${session.user} (${session.role})`;
}

refreshUI();
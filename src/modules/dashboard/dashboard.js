import { formatDate } from '../../utils/utils.js';

export class DashboardController {
    constructor(tableBodyId) {
        this.tableBody = document.getElementById(tableBodyId);
    }

    render(users, onEdit, onDelete) {
        this.tableBody.innerHTML = '';
        
        if (users.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-slate-400">
                        No hay usuarios registrados en el sistema.
                    </td>
                </tr>`;
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-slate-50/80 transition-colors duration-150';
            
            // Badge color según el rol
            const roleBadgeClass = user.role === 'Administrador' 
                ? 'bg-purple-100 text-purple-700 border-purple-200' 
                : user.role === 'Desarrollador'
                ? 'bg-amber-100 text-amber-700 border-amber-200'
                : 'bg-blue-100 text-blue-700 border-blue-200';

            row.innerHTML = `
                <td class="p-4 font-mono text-xs text-slate-400">#${user.id}</td>
                <td class="p-4 font-semibold text-slate-800">${user.name}</td>
                <td class="p-4 text-slate-500">${user.email}</td>
                <td class="p-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleBadgeClass}">
                        ${user.role}
                    </span>
                </td>
                <td class="p-4 text-slate-500 text-xs">${formatDate(user.createdAt)}</td>
                <td class="p-4 text-right space-x-1">
                    <button class="btn-edit px-3 py-1.5 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-md transition-colors cursor-pointer" data-id="${user.id}">
                        Editar
                    </button>
                    <button class="btn-delete px-3 py-1.5 text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md transition-colors cursor-pointer" data-id="${user.id}">
                        Eliminar
                    </button>
                </td>
            `;
            
            row.querySelector('.btn-edit').addEventListener('click', () => onEdit(user));
            row.querySelector('.btn-delete').addEventListener('click', () => onDelete(user.id));
            
            this.tableBody.appendChild(row);
        });
    }
}
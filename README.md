# 🚀 Sistema CRUD Modular de Usuarios - Git Flow

Un sistema web funcional para la gestión de usuarios (CRUD: Create, Read, Update, Delete) desarrollado con arquitectura modular de JavaScript y estilizado con **Tailwind CSS v4.0**. Este proyecto fue estructurado aplicando rigurosamente la metodología de ramificación **Git Flow**.

---

## 📌 Características del Proyecto

- **Operaciones CRUD Completas:**
  - **Create:** Registro de nuevos usuarios con rol y fecha de alta.
  - **Read:** Visualización dinámica de la lista de usuarios.
  - **Update:** Edición de la información de registros existentes.
  - **Delete:** Eliminación de registros con confirmación del usuario.
- **Persistencia de Datos:** Almacenamiento local mediante `localStorage` en el cliente.
- **Arquitectura Modular (ESM):** Separación clara de responsabilidades en módulos independientes (`auth`, `validation`, `payment`, `dashboard`, `utils`).
- **Diseño Moderno:** Interfaz responsiva y estilizada mediante **Tailwind CSS v4.0**.

---

## 🛠️ Arquitectura del Proyecto

```text
proyecto-crud-gitflow/
├── public/
│   └── index.html               # Interfaz gráfica principal (Tailwind CSS v4.0)
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   └── login.js         # Módulo de autenticación y control de sesión
│   │   ├── validation/
│   │   │   └── validation.js    # Módulo de validación de entradas
│   │   ├── payment/
│   │   │   └── payment.js       # Integración / Simulación de API de pagos
│   │   └── dashboard/
│   │       └── dashboard.js     # Controlador de la tabla e interfaz CRUD
│   ├── utils/
│   │   └── utils.js             # Formateadores de fecha y funciones auxiliares
│   └── app.js                   # Módulo orquestador principal
└── README.md
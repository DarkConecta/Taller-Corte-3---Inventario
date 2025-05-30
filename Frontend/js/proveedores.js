import { 
    obtainProveedores, 
    obtainProveedor, 
    createProveedor, 
    updateProveedor, 
    deleteProveedor 
} from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
    getProveedores();
    
    document.querySelector("tbody").addEventListener("click", (e) => {
        const button = e.target.closest('.btn');
        if (button) {
            const id = button.getAttribute("data-id");
            const action = button.textContent.trim();
            
            if (action.includes("Detalles")) {
                console.log("Mostrar detalles del proveedor:", id);
            } else if (action.includes("Editar")) {
                showEditForm(id);
            } else if (action.includes("Eliminar")) {
                confirmDeleteProveedor(id);
            }
        }
    });
});
async function getProveedores() {
    try {
        const proveedores = await obtainProveedores();
        const container = document.querySelector("tbody");
        container.innerHTML = "";
        
        proveedores.forEach((proveedor) => {
            const { idProveedor, nombreProveedor, contacto, telefono, email, direccion, fechaRegistro } = proveedor;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idProveedor}</td>
                <td>${nombreProveedor}</td>
                <td>${contacto}</td>
                <td>${telefono || '-'}</td>
                <td>${email || '-'}</td>
                <td>${direccion || '-'}</td>
                <td>${new Date(fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-info" data-id="${idProveedor}">
                      <i class="bi bi-eye"></i>Detalles
                  </button>
              </td>
              <td>
                  <button class="btn btn-warning" data-id="${idProveedor}">
                      <i class="bi bi-pencil"></i>Editar
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger" data-id="${idProveedor}">
                      <i class="bi bi-trash"></i>Eliminar
                  </button>
              </td>
            `;
            container.appendChild(row);
        });
    } catch (error) {
        console.error("error");
        const container = document.querySelector("tbody");
        container.innerHTML = '<tr><td colspan="10" class="text-center">Error al cargar proveedores</td></tr>';
    }
}

// Mostrar formulario de edición
async function showEditForm(id) {
    try {
        const proveedor = await obtainProveedor(id);
        const nuevoNombre = prompt("Editar nombre:", proveedor.nombreProveedor);
        const nuevoContacto = prompt("Editar contacto:", proveedor.contacto);
        const nuevoTelefono = prompt("Editar teléfono:", proveedor.telefono || '');
        const nuevoEmail = prompt("Editar email:", proveedor.email || '');
        const nuevaDireccion = prompt("Editar dirección:", proveedor.direccion || '');
        
        if (nuevoNombre !== null && nuevoContacto !== null) {
            await updateProveedor(id, { 
                nombreProveedor: nuevoNombre,
                contacto: nuevoContacto,
                telefono: nuevoTelefono,
                email: nuevoEmail,
                direccion: nuevaDireccion
            });
            getProveedores();
        }
    } catch (error) {
        console.error("error");
        alert("Error al editar proveedor");
    }
}

// Confirmar eliminación de proveedor
async function confirmDeleteProveedor(id) {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
        try {
            await deleteProveedor(id);
            getProveedores();
        } catch (error) {
            console.error("error");
            alert("Error al eliminar proveedor");
        }
    }
}

// Manejar creación de nuevo proveedor desde el modal
const form = document.getElementById("formulario");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const contacto = document.getElementById("contacto").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const direccion = document.getElementById("direccion").value;
        
        if (!nombre || !contacto) {
            alert("Nombre y contacto son requeridos");
            return;
        }

        try {
            await createProveedor({
                nombreProveedor: nombre,
                contacto: contacto,
                telefono: telefono,
                email: email,
                direccion: direccion
            });
            form.reset();
            bootstrap.Modal.getInstance(document.getElementById('registerProveedor')).hide();
            getProveedores();
        } catch (error) {
            console.error("error");
            alert("Error al crear proveedor");
        }
    });
}

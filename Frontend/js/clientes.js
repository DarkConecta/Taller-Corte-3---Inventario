import { 
    obtainClientes, 
    obtainCliente, 
    createCliente, 
    updateCliente, 
    deleteCliente 
} from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
    getClientes();
    
    document.querySelector("tbody").addEventListener("click", (e) => {
        const button = e.target.closest('.btn');
        if (button) {
            const id = button.getAttribute("data-id");
            const action = button.textContent.trim();
            
            if (action.includes("Detalles")) {
                console.log("Mostrar detalles del cliente:", );
            } else if (action.includes("Editar")) {
                showEditForm(id);
            } else if (action.includes("Eliminar")) {
                confirmDeleteCliente(id);
            }
        }
    });
});

async function getClientes() {
    try {
        const clientes = await obtainClientes();
        const container = document.querySelector("tbody");
        container.innerHTML = "";
        
        clientes.forEach((cliente) => {
            const { idCliente, nombre, apellido, direccion, telefono, email, fechaRegistro } = cliente;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idCliente}</td>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${direccion}</td>
                <td>${telefono}</td>
                <td>${email}</td>
                <td>${new Date(fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-info" data-id="${idCliente}">
                      <i class="bi bi-eye"></i> Detalles
                  </button>
              </td> 
              <td>
                  <button class="btn btn-warning" data-id="${idCliente}">
                      <i class="bi bi-pencil"></i> Editar
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger" data-id="${idCliente}">
                      <i class="bi bi-trash"></i> Eliminar
                  </button>
              </td>
            `;
            container.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
        const container = document.querySelector("tbody");
        container.innerHTML = '<tr><td colspan="10" class="text-center">Error al cargar clientes</td></tr>';
    }
}

async function showEditForm(id) {
    try {
        const cliente = await obtainCliente(id);
        const nuevoNombre = prompt("Editar nombre:", cliente.nombre);
        const nuevoApellido = prompt("Editar apellido:", cliente.apellido);
        const nuevaDireccion = prompt("Editar dirección:", cliente.direccion);
        const nuevoTelefono = prompt("Editar teléfono:", cliente.telefono);
        const nuevoEmail = prompt("Editar email:", cliente.email);
        const nuevaFechaRegistro = prompt("Editar fecha registro (YYYY-MM-DD):", cliente.fechaRegistro.split('T')[0]);
        
        if (nuevoNombre !== null && nuevoApellido !== null && nuevaFechaRegistro !== null) {
            await updateCliente(id, { 
                nombre: nuevoNombre,
                apellido: nuevoApellido,
                direccion: nuevaDireccion,
                telefono: nuevoTelefono,
                email: nuevoEmail,
                fechaRegistro: nuevaFechaRegistro
            });
            getClientes();
        }
    } catch (error) {
        console.error("Error al editar cliente:", error);
        alert("Error al editar cliente");
    }
}

async function confirmDeleteCliente(id) {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
        try {
            await deleteCliente(id);
            getClientes();
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            alert("Error al eliminar cliente");
        }
    }
}

const form = document.getElementById("formulario");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const direccion = document.getElementById("direccion").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        
        if (!nombre || !apellido || !telefono) {
            alert("Nombre, apellido y telefono son requeridos");
            return;
        }

        try {
            await createCliente({
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                telefono: telefono,
                email: email,
            });
            form.reset();
            bootstrap.Modal.getInstance(document.getElementById('registerCategory')).hide();
            getClientes();
        } catch (error) {
            console.error("Error al crear cliente:", error);
            alert("Error al crear cliente");
        }
    });
}

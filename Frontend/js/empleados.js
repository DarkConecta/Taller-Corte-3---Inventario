import { 
    obtainEmpleados, 
    obtainEmpleado, 
    createEmpleado, 
    updateEmpleado, 
    deleteEmpleado 
} from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
    getEmpleados();

    document.querySelector("tbody").addEventListener("click", (e) => {
        const button = e.target.closest('.btn');
        if (button) {
            const id = button.getAttribute("data-id");
            const action = button.textContent.trim();
            
            if (action.includes("Detalles")) {
                console.log("Mostrar detalles del empleado:", id);
            } else if (action.includes("Editar")) {
                showEditForm(id);
            } else if (action.includes("Eliminar")) {
                confirmDeleteEmpleado(id);
            }
        }
    });
});

// Cargar y mostrar empleados
async function getEmpleados() {
  try {
      const empleados = await obtainEmpleados();
      const container = document.querySelector("tbody");
      container.innerHTML = "";
      
      empleados.forEach((empleado) => {
          const { idEmpleado, nombre, apellido, cargo, email, telefono, fechaContratacion, fechaRegistro } = empleado;
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${idEmpleado}</td>
              <td>${nombre}</td>
              <td>${apellido}</td>
              <td>${cargo}</td>
              <td>${email}</td>
              <td>${telefono}</td>
              <td>${fechaContratacion ? new Date(fechaContratacion).toLocaleDateString() : '-'}</td>
              <td>${fechaRegistro ? new Date(fechaRegistro).toLocaleDateString() : '-'}</td>
              <td>
                  <button class="btn btn-info" data-id="${idEmpleado}">
                      <i class="bi bi-eye"></i>Detalles
                  </button>
              </td>
              <td>
                  <button class="btn btn-warning" data-id="${idEmpleado}">
                      <i class="bi bi-pencil"></i>Editar
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger" data-id="${idEmpleado}">
                      <i class="bi bi-trash"></i>Eliminar
                  </button>
              </td>
          `;
          container.appendChild(row);
      });
  } catch (error) {
      console.error("error");
      const container = document.querySelector("tbody");
      container.innerHTML = '<tr><td colspan="10" class="text-center">Error al cargar empleados</td></tr>';
  }
}

// Mostrar formulario de edición
async function showEditForm(id) {
  try {
      const empleado = await obtainEmpleado(id);
      const nuevoNombre = prompt("Editar nombre:", empleado.nombre);
      const nuevoApellido = prompt("Editar apellido:", empleado.apellido);
      const nuevoCargo = prompt("Editar cargo:", empleado.cargo);
      const nuevoEmail = prompt("Editar email:", empleado.email || '');
      const nuevoTelefono = prompt("Editar teléfono:", empleado.telefono || '');
      const nuevaFechaContratacion = prompt("Editar fecha contratación (YYYY-MM-DD):", empleado.fechaContratacion ? empleado.fechaContratacion.split('T')[0] : '');
      
      if (nuevoNombre !== null && nuevoApellido !== null && nuevoCargo !== null) {
          await updateEmpleado(id, { 
              nombre: nuevoNombre,
              apellido: nuevoApellido,
              cargo: nuevoCargo,
              email: nuevoEmail,
              telefono: nuevoTelefono,
              fechaContratacion: nuevaFechaContratacion
          });
          getEmpleados();
      }
  } catch (error) {
      console.error("error");
      alert("Error al editar empleado");
  }
}

// Confirmar eliminación de empleado
async function confirmDeleteEmpleado(id) {
  if (confirm("¿Estás seguro de eliminar este empleado?")) {
      try {
          await deleteEmpleado(id);
          getEmpleados();
      } catch (error) {
          console.error("error");
          alert("Error al eliminar empleado");
      }
  }
}

// Manejar creación de nuevo empleado desde el modal
const form = document.getElementById("formularioEmpleado");
if (form) {
  form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const cargo = document.getElementById("cargo").value;
      const email = document.getElementById("email").value;
      const telefono = document.getElementById("telefono").value;
      const fechaContratacion = document.getElementById("fechaContratacion").value;
      
      if (!nombre || !apellido || !cargo) {
          alert("Nombre, apellido y cargo son requeridos");
          return;
      }

      try {
          await createEmpleado({
              nombre: nombre,
              apellido: apellido,
              cargo: cargo,
              email: email,
              telefono: telefono,
              fechaContratacion: fechaContratacion
          });
          form.reset();
          bootstrap.Modal.getInstance(document.getElementById('registerCategory')).hide();
          getEmpleados();
      } catch (error) {
          console.error("error");
          alert("Error al crear empleado");
      }
  });
}

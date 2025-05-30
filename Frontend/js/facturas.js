import { 
    obtainFacturas, 
    obtainFactura, 
    createFactura, 
    updateFactura, 
    deleteFactura 
} from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
    getFacturas();
    
    document.querySelector("tbody").addEventListener("click", (e) => {
        const button = e.target.closest('.btn');
        if (button) {
            const id = button.getAttribute("data-id");
            const action = button.textContent.trim();
            
            if (action.includes("Detalles")) {
                console.log("Mostrar detalles del factura:", id);
            } else if (action.includes("Editar")) {
                showEditForm(id);
            } else if (action.includes("Eliminar")) {
                confirmDeleteFactur(id);
            }
        }
    });
});

// Cargar y mostrar facturas
async function getFacturas() {
    try {
        const facturas = await obtainFacturas();
        const container = document.querySelector("tbody");
        container.innerHTML = "";
        
        facturas.forEach((factur) => {
            const { idFactura, idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado, fechaCreacion } = factur;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idFactura}</td>
                <td>${idCliente}</td>
                <td>${idEmpleado}</td>
                <td>${new Date(fechaFactura).toLocaleDateString()}</td>
                <td>${numeroFactura}</td>
                <td>$${totalFactura.toFixed(2)}</td>
                <td>${estado}</td>
                <td>${new Date(fechaCreacion).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-info" data-id="${idFactura}">
                      <i class="bi bi-eye"></i>Detalles
                  </button>
              </td>
              <td>
                  <button class="btn btn-warning" data-id="${idFactura}">
                      <i class="bi bi-pencil"></i>Editar
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger" data-id="${idFactura}">
                      <i class="bi bi-trash"></i>Eliminar
                  </button>
              </td>
            `;
            container.appendChild(row);
        });
    } catch (error) {
        console.error("error");
        const container = document.querySelector("tbody");
        container.innerHTML = '<tr><td colspan="10" class="text-center">Error al cargar facturas</td></tr>';
    }
}

// Mostrar formulario de edición
async function showEditForm(id) {
    try {
        const factura = await obtainFactura(id);
        const nuevoNumero = prompt("Editar número de factura:", factura.numeroFactura);
        const nuevoTotal = prompt("Editar total:", factura.totalFactura);
        const nuevoEstado = prompt("Editar estado:", factura.estado);
        const nuevaFechaFactura = prompt("Editar fecha factura (YYYY-MM-DD):", factura.fechaFactura.split('T')[0]);
        
        if (nuevoNumero !== null && nuevoTotal !== null && nuevoEstado !== null && nuevaFechaFactura !== null) {
            await updateFactura(id, { 
                numeroFactura: nuevoNumero,
                totalFactura: parseFloat(nuevoTotal),
                estado: nuevoEstado,
                fechaFactura: nuevaFechaFactura
            });
            getFacturas();
        }
    } catch (error) {
        console.error("error");
        alert("Error al editar factura");
    }
}

// Confirmar eliminación de factura
async function confirmDeleteFactur(id) {
    if (confirm("¿Estás seguro de eliminar esta factura?")) {
        try {
            await deleteFactura(id);
            getFacturas();
        } catch (error) {
            console.error("error");
            alert("Error al eliminar factura");
        }
    }
}

// Manejar creación de nueva factura desde el modal
const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", async (e) => {
      e.preventDefault();
        const idCliente = document.getElementById("idCliente").value;
        const idEmpleado = document.getElementById("idEmpleado").value;
        const fechaFactura = document.getElementById("fechaFactura").value;
        const numeroFactura = document.getElementById("numeroFactura").value;
        const totalFactura = document.getElementById("totalFactura").value;
        const estado = document.getElementById("estado").value;
        
        if (!idCliente || !idEmpleado || !fechaFactura || !numeroFactura || !totalFactura || !estado) {
            alert("Todos los campos son requeridos");
            return;
        }

        try {
            await createFactura({
                idCliente: parseInt(idCliente),
                idEmpleado: parseInt(idEmpleado),
                fechaFactura: fechaFactura,
                numeroFactura: numeroFactura,
                totalFactura: parseFloat(totalFactura),
                estado: estado
            });
            form.reset(); //then
            bootstrap.Modal.getInstance(document.getElementById('registerFactur')).hide();
            getFacturas();
        } catch (error) {
            console.error("error");
            alert("Error al crear factura");
        }
    });
}
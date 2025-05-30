import { 
    obtainProductos, 
    obtainProducto, 
    createProducto, 
    updateProducto, 
    deleteProducto,
} from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
    getProductos();

    document.querySelector("tbody").addEventListener("click", (e) => {
        const button = e.target.closest('.btn');
        if (button) {
            const id = button.getAttribute("data-id");
            const action = button.textContent.trim();
            
            if (action.includes("Detalles")) {
                console.log("Mostrar detalles del producto:", id);
            } else if (action.includes("Editar")) {
                showEditForm(id);
            } else if (action.includes("Eliminar")) {
                confirmDeleteProducto(id);
            }
        }
    });
});

async function getProductos() {
    try {
        const productos = await obtainProductos();
        const container = document.querySelector("tbody");
        container.innerHTML = "";
        
        for (const producto of productos) {
            const { idProducto, idCategoria, nombre, descripcion, precio, stock, fechaCreacion } = producto;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idProducto}</td>
                <td>${idCategoria}</td>
                <td>${nombre}</td>
                <td>${descripcion || '-'}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${stock}</td>
                <td>${new Date(fechaCreacion).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-info" data-id="${idProducto}">
                      <i class="bi bi-eye"></i>Detalles
                  </button>
              </td>
              <td>
                  <button class="btn btn-warning" data-id="${idProducto}">
                      <i class="bi bi-pencil"></i>Editar
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger" data-id="${idProducto}">
                      <i class="bi bi-trash"></i>Eliminar
                  </button>
              </td>
            `;
            container.appendChild(row);
        }
    } catch (error) {
        console.error("error");
        const container = document.querySelector("tbody");
        container.innerHTML = '<tr><td colspan="10" class="text-center">Error al cargar productos</td></tr>';
    }
}

// Mostrar formulario de edición
async function showEditForm(id) {
    try {
        const producto = await obtainProducto(id);
        const nuevoNombre = prompt("Editar nombre:", producto.nombre);
        const nuevaDescripcion = prompt("Editar descripción:", producto.descripcion || '');
        const nuevoPrecio = prompt("Editar precio:", producto.precio);
        const nuevoStock = prompt("Editar stock:", producto.stock);
        
        if (nuevoNombre !== null && nuevoPrecio !== null && nuevoStock !== null) {
            await updateProducto(id, { 
                nombre: nuevoNombre,
                descripcion: nuevaDescripcion,
                precio: nuevoPrecio,
                stock: nuevoStock
            });
            getProductos();
        }
    } catch (error) {
        console.error("error");
        alert("Error al editar producto");
    }
}

// Confirmar eliminación de producto
async function confirmDeleteProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        try {
            await deleteProducto(id);
            getProductos();
        } catch (error) {
            console.error("error");
            alert("Error al eliminar producto");
        }
    }
}

// Manejar creación de nuevo producto desde el modal
const form = document.getElementById("formularioProducto");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const idCategoria = document.getElementById("categoria").value;
        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const precio = document.getElementById("precio").value;
        const stock = document.getElementById("stock").value;
        
        if (!idCategoria || !nombre || !precio || !stock) {
            alert("Todos los campos requeridos deben ser completados");
            return;
        }

        try {
            await createProducto({
                idCategoria: idCategoria,
                nombre: nombre,
                descripcion: descripcion,
                precio: parseFloat(precio),
                stock: parseInt(stock)
            });
            form.reset();
            bootstrap.Modal.getInstance(document.getElementById('registerCategory')).hide();
            getProductos();
        } catch (error) {
            console.error("error");
            alert("Error al crear producto");
        }
    });
}

import { 
    obtainCategorias, 
    obtainCategoria, 
    createCategoria, 
    updateCategoria, 
    deleteCategoria 
} from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", () => {
    getCategorias();

    document.querySelector("tbody").addEventListener("click", (e) => {
        const button = e.target.closest('.btn');
        if (button) {
            const id = button.getAttribute("data-id");
            const action = button.textContent.trim();
            
            if (action.includes("Detalles")) {
                console.log("Mostrar detalles del categoria:", id);
            } else if (action.includes("Editar")) {
                showEditForm(id);
            } else if (action.includes("Eliminar")) {
                confirmDeleteCategory(id);
            }
        }
    });
});


async function getCategorias() {
  try {
      const categorias = await obtainCategorias(); 
      const container = document.querySelector("tbody");
      container.innerHTML = ""; 
      
      categorias.forEach((category) => { 
          const { idCategoria, nombreCategoria, descripcion } = category;
          const row = document.createElement("tr"); 
          row.innerHTML = `
              <td>${idCategoria}</td>
              <td>${nombreCategoria}</td>
              <td>${descripcion || 'Sin descripcion'}</td>
              <td>
                  <button class="btn btn-info" data-id="${idCategoria}">
                      <i class="bi bi-eye"></i>Detalles
                  </button>
              </td>
              <td>
                  <button class="btn btn-warning" data-id="${idCategoria}">
                      <i class="bi bi-pencil"></i>Editar
                  </button>
              </td>
              <td>
                  <button class="btn btn-danger" data-id="${idCategoria}">
                      <i class="bi bi-trash"></i>Eliminar
                  </button>
              </td>
                `; 
          container.appendChild(row); 
      });
  } catch (error) {
      console.error("Error al cargar categorías:", error);
      const container = document.querySelector("tbody");
      container.innerHTML = '<tr><td colspan="10" class="text-center">Error al cargar categorías</td></tr>';
  }
}


async function showEditForm(id) {
  try {
      const categoria = await obtainCategoria(id); 
      const nuevoNombre = prompt("Editar nombre:", categoria.nombreCategoria); 
      const nuevaDesc = prompt("Editar descripción:", categoria.descripcion); 
      
      if (nuevoNombre !== null && nuevaDesc !== null) { 
          await updateCategoria(id, { 
              nombreCategoria: nuevoNombre, 
              descripcion: nuevaDesc 
          }); 
          getCategorias(); 
      }
  } catch (error) {
      console.error("error");
      alert("Error al editar categoría");
  }
}


async function confirmDeleteCategory(id) {
  if (confirm("¿Estás seguro de eliminar esta categoría?")) { 
      try {
          await deleteCategoria(id); 
          getCategorias(); 
      } catch (error) {
          console.error("Error al eliminar");
          alert("Error al eliminar categoría");
      }
  }
}


const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value; 
      const descripcion = document.getElementById("descripcion").value; 
      
      if (!nombre) { 
          alert("El nombre es requerido");
          return;
      }

      try {
          await createCategoria({ 
              nombreCategoria: nombre,
              descripcion: descripcion
          });
          form.reset(); 
          bootstrap.Modal.getInstance(document.getElementById('registerCategory')).hide(); 
          getCategorias(); 
      } catch (error) {
          console.error("error");
          alert("Error al crear categoría");
      }
  });
}
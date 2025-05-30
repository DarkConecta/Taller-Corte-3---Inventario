const urlFacturas = "http://localhost:5000/api/facturas";
const urlFacturadetalle = "http://localhost:5000/api/facturadetalle";
const urlProductoproveedor = "http://localhost:5000/api/productoproveedor";
const urlClientes = "http://localhost:5000/api/clientes";
const urlEmpleados = "http://localhost:5000/api/empleados";
const urlCategorias = "http://localhost:5000/api/categorias";
const urlProductos = "http://localhost:5000/api/productos";
const urlProveedores = "http://localhost:5000/api/proveedores";


export const obtainFacturas = async () => {
  try {
    const resultado = await fetch(urlFacturas); 
    const facturas = await resultado.json(); 
    return facturas;
  } catch (error) {
    console.error("error");
  }
};

export const obtainFactura = async (id) => {
  try {
    const resultado = await fetch(`${urlFacturas}/${id}`); 
    const factura = await resultado.json(); 
    return factura;
  } catch (error) {
    console.error("error");
  }
};

export const createFactura = async (facturaData) => {
  try {
    const resultado = await fetch(urlFacturas, {
      method: "POST", 
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(facturaData) 
    });
    const nuevaFactura = await resultado.json(); 
    return nuevaFactura;
  } catch (error) {
    console.error("error");
  }
};

export const updateFactura = async (id, facturaData) => {
  try {
    const resultado = await fetch(`${urlFacturas}/${id}`, {
      method: "PUT", 
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(facturaData) 
    });
    const facturaActualizada = await resultado.json(); 
    return facturaActualizada;
  } catch (error) {
    console.error("error");
  }
};

export const deleteFactura = async (id) => {
  try {
    const resultado = await fetch(`${urlFacturas}/${id}`, 
      {method: "DELETE"});
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainFacturadetalles = async () => {
  try {
    const resultado = await fetch(urlFacturadetalle); 
    const facturadetalles = await resultado.json(); 
    return facturadetalles;
  } catch (error) {
    console.error("error");
  }
};

export const obtainFacturaDetalle = async (id) => {
  try {
    const resultado = await fetch(`${urlFacturadetalle}/${id}`); 
    const detalle = await resultado.json(); 
    return detalle;
  } catch (error) {
    console.error("error");
  }
};

export const createFacturaDetalle = async (detalleData) => {
  try {
    const resultado = await fetch(urlFacturadetalle, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detalleData) 
    });
    const nuevoDetalle = await resultado.json(); 
    return nuevoDetalle;
  } catch (error) {
    console.error("error");
  }
};

export const updateFacturaDetalle = async (id, detalleData) => {
  try {
    const resultado = await fetch(`${urlFacturadetalle}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detalleData) 
    });
    const detalleActualizado = await resultado.json(); 
    return detalleActualizado;
  } catch (error) {
    console.error("error");
  }
};

export const deleteFacturaDetalle = async (id) => {
  try {
    const resultado = await fetch(`${urlFacturadetalle}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainProductoproveedores = async () => {
  try {
    const resultado = await fetch(urlProductoproveedor); 
    const productoproveedores = await resultado.json(); 
    return productoproveedores;
  } catch (error) {
    console.error("error");
  }
};

export const obtainProductoProveedor = async (id) => {
  try {
    const resultado = await fetch(`${urlProductoproveedor}/${id}`); 
    const relacion = await resultado.json(); 
    return relacion;
  } catch (error) {
    console.error("error");
  }
};

export const createProductoProveedor = async (relacionData) => {
  try {
    const resultado = await fetch(urlProductoproveedor, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relacionData) 
    });
    const nuevaRelacion = await resultado.json(); 
    return nuevaRelacion;
  } catch (error) {
    console.error("error");
  }
};

export const updateProductoProveedor = async (id, relacionData) => {
  try {
    const resultado = await fetch(`${urlProductoproveedor}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relacionData) 
    });
    const relacionActualizada = await resultado.json(); 
    return relacionActualizada;
  } catch (error) {
    console.error("error");
  }
};

export const deleteProductoProveedor = async (id) => {
  try {
    const resultado = await fetch(`${urlProductoproveedor}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainClientes = async () => {
  try {
    const resultado = await fetch(urlClientes); 
    const clientes = await resultado.json(); 
    return clientes;
  } catch (error) {
    console.error("error");
  }
};

export const obtainCliente = async (id) => {
  try {
    const resultado = await fetch(`${urlClientes}/${id}`); 
    const cliente = await resultado.json(); 
    return cliente;
  } catch (error) {
    console.error("error");
  }
};

export const createCliente = async (clienteData) => {
  try {
    const resultado = await fetch(urlClientes, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData) 
    });
    const nuevoCliente = await resultado.json(); 
    return nuevoCliente;
  } catch (error) {
    console.error("error");
  }
};

export const updateCliente = async (id, clienteData) => {
  try {
    const resultado = await fetch(`${urlClientes}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData) 
    });
    const clienteActualizado = await resultado.json(); 
    return clienteActualizado;
  } catch (error) {
    console.error("error");
  }
};

export const deleteCliente = async (id) => {
  try {
    const resultado = await fetch(`${urlClientes}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainEmpleados = async () => {
  try {
    const resultado = await fetch(urlEmpleados); 
    const empleados = await resultado.json(); 
    return empleados;
  } catch (error) {
    console.error("error");
  }
};

export const obtainEmpleado = async (id) => {
  try {
    const resultado = await fetch(`${urlEmpleados}/${id}`); 
    const empleado = await resultado.json(); 
    return empleado;
  } catch (error) {
    console.error("error");
  }
};

export const createEmpleado = async (empleadoData) => {
  try {
    const resultado = await fetch(urlEmpleados, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleadoData) 
    });
    const nuevoEmpleado = await resultado.json(); 
    return nuevoEmpleado;
  } catch (error) {
    console.error("error");
  }
};

export const updateEmpleado = async (id, empleadoData) => {
  try {
    const resultado = await fetch(`${urlEmpleados}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleadoData) 
    });
    const empleadoActualizado = await resultado.json(); 
    return empleadoActualizado;
  } catch (error) {
    console.error("error");
  }
};

export const deleteEmpleado = async (id) => {
  try {
    const resultado = await fetch(`${urlEmpleados}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainCategorias = async () => {
  try {
    const resultado = await fetch(urlCategorias); 
    const categorias = await resultado.json(); 
    return categorias;
  } catch (error) {
    console.error("error");
  }
};

export const obtainCategoria = async (id) => {
  try {
    const resultado = await fetch(`${urlCategorias}/${id}`); 
    const categoria = await resultado.json(); 
    return categoria;
  } catch (error) {
    console.error("error");
  }
};

export const createCategoria = async (categoriaData) => {
  try {
    const resultado = await fetch(urlCategorias, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriaData) 
    });
    const nuevaCategoria = await resultado.json(); 
    return nuevaCategoria;
  } catch (error) {
    console.error("error");
  }
};

export const updateCategoria = async (id, categoriaData) => {
  try {
    const resultado = await fetch(`${urlCategorias}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriaData) 
    });
    const categoriaActualizada = await resultado.json(); 
    return categoriaActualizada;
  } catch (error) {
    console.error("error");
  }
};

export const deleteCategoria = async (id) => {
  try {
    const resultado = await fetch(`${urlCategorias}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainProductos = async () => {
  try {
    const resultado = await fetch(urlProductos); 
    const productos = await resultado.json(); 
    return productos;
  } catch (error) {
    console.error("error");
  }
};

export const obtainProducto = async (id) => {
  try {
    const resultado = await fetch(`${urlProductos}/${id}`); 
    const producto = await resultado.json(); 
    return producto;
  } catch (error) {
    console.error("error");
  }
};

export const createProducto = async (productoData) => {
  try {
    const resultado = await fetch(urlProductos, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoData) 
    });
    const nuevoProducto = await resultado.json(); 
    return nuevoProducto;
  } catch (error) {
    console.error("error");
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const resultado = await fetch(`${urlProductos}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoData) 
    });
    const productoActualizado = await resultado.json(); 
    return productoActualizado;
  } catch (error) {
    console.error("error");
  }
};

export const deleteProducto = async (id) => {
  try {
    const resultado = await fetch(`${urlProductos}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};


export const obtainProveedores = async () => {
  try {
    const resultado = await fetch(urlProveedores); 
    const proveedores = await resultado.json(); 
    return proveedores;
  } catch (error) {
    console.error("error");
  }
};

export const obtainProveedor = async (id) => {
  try {
    const resultado = await fetch(`${urlProveedores}/${id}`); 
    const proveedor = await resultado.json(); 
    return proveedor;
  } catch (error) {
    console.error("error");
  }
};

export const createProveedor = async (proveedorData) => {
  try {
    const resultado = await fetch(urlProveedores, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proveedorData) 
    });
    const nuevoProveedor = await resultado.json(); 
    return nuevoProveedor;
  } catch (error) {
    console.error("error");
  }
};

export const updateProveedor = async (id, proveedorData) => {
  try {
    const resultado = await fetch(`${urlProveedores}/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proveedorData) 
    });
    const proveedorActualizado = await resultado.json(); 
    return proveedorActualizado;
  } catch (error) {
    console.error("error");
  }
};

export const deleteProveedor = async (id) => {
  try {
    const resultado = await fetch(`${urlProveedores}/${id}`, {
      method: "DELETE" 
    });
    const respuesta = await resultado.json(); 
    return respuesta;
  } catch (error) {
    console.error("error");
  }
};
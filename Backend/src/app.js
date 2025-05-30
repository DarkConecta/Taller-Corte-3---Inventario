import express from 'express';
import categoriasRoutes from './routes/categorias.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import empleadosRoutes from './routes/empleados.routes.js';
import facturasRoutes from './routes/facturas.routes.js';
import productosRoutes from './routes/productos.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js';
import facturadetalleRoutes from './routes/facturadetalle.routes.js';
import productoproveedorRoutes from './routes/productoproveedor.routes.js';
import cors from 'cors';
const  app = express();

app.set('port', 5000);
app.use(express.json());

app.use("/api/facturas", facturasRoutes);
app.use("/api/facturadetalle", facturadetalleRoutes);
app.use("/api/productoproveedor", productoproveedorRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/proveedores", proveedoresRoutes);

app.use(cors());
const corsOptions = {
    origin: 'http://127.0.0.1:5500'
};

app.use(cors(corsOptions));

export default app;
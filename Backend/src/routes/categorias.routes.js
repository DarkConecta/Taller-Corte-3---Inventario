import { Router } from "express";
import { methodHTTP as categoriasController } from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/", categoriasController.getCategorias);
router.get("/:id", categoriasController.getCategoria);
router.post("/", categoriasController.addCategoria);
router.put("/:id", categoriasController.updateCategoria);
router.delete("/:id", categoriasController.deleteCategoria);

export default router;
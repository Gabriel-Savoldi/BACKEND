//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import fornecedorCtrl from "../Controle/fornecedorCtrl.js";

const catCtrl = new fornecedorCtrl();
const rotafornecedor = Router();

rotafornecedor.post("/", catCtrl.gravar);
rotafornecedor.put("/:codigo", catCtrl.editar);
rotafornecedor.patch("/:codigo", catCtrl.editar);
rotafornecedor.delete("/:codigo", catCtrl.excluir);
rotafornecedor.get("/:codigo", catCtrl.consultar);
rotafornecedor.get("/",catCtrl.consultar);

export default rotafornecedor;



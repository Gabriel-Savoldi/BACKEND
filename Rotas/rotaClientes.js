//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const catCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", catCtrl.gravar);
rotaCliente.put("/:codigo", catCtrl.editar);
rotaCliente.patch("/:codigo", catCtrl.editar);
rotaCliente.delete("/:codigo", catCtrl.excluir);
rotaCliente.get("/:codigo", catCtrl.consultar);
rotaCliente.get("/",catCtrl.consultar);

export default rotaCliente;



//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import ProdutoCtrl from "../Controle/produtoCtrl.js";

const prodCtrl = new ProdutoCtrl();
const rotaProduto = Router();

rotaProduto.post("/", prodCtrl.gravar);
rotaProduto.put("/:codigo", prodCtrl.editar);
rotaProduto.patch("/:codigo", prodCtrl.editar);
rotaProduto.delete("/:codigo", prodCtrl.excluir);
rotaProduto.get("/:codigo", prodCtrl.consultar);
rotaProduto.get("/",prodCtrl.consultar);

export default rotaProduto;



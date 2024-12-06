//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const prodCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", prodCtrl.gravar);
rotaUsuario.put("/:codigo", prodCtrl.editar);
rotaUsuario.patch("/:codigo", prodCtrl.editar);
rotaUsuario.delete("/:codigo", prodCtrl.excluir);
rotaUsuario.get("/:codigo", prodCtrl.consultar);
rotaUsuario.get("/",prodCtrl.consultar);

export default rotaUsuario;



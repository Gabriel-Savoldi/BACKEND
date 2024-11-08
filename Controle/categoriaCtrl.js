//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Categoria from "../Modelo/categoria.js";

export default class CategoriaCtrl{

    gravar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const descricao  = requisicao.body.descricao;
            //pseudo validação
            if (descricao)
            {
                //gravar a categoria
                const categoria = new Categoria(0,descricao);
                categoria.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Categoria adicionada com sucesso!",
                        "codigo": categoria.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir a categoria: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de uma categoria conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            //o código será extraída da URL (padrão REST)
            const codigo     = requisicao.params.codigo;
            const descricao  = requisicao.body.descricao;
            
            //pseudo validação
            if (codigo > 0 && descricao)
            {
                //alterar a categoria
                const categoria = new Categoria(codigo,descricao);
                categoria.editar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"categoria alterada com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar a categoria: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de uma categoria conforme documentação da API."
                    }
                );
            }
        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE'){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            //pseudo validação
            if (codigo > 0)
            {
                //alterar o categoria
                const categoria = new Categoria(codigo);
                categoria.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"categoria excluída com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o categoria: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido de uma categoria conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo;
            //evitar que código tenha valor undefined
            if (isNaN(codigo)){
                codigo = "";
            }

            const categoria = new Categoria();
            //método consultar retorna uma lista de categorias
            categoria.consultar(codigo)
            .then((listaCategorias) =>{
                resposta.status(200).json(listaCategorias
                    /*{
                        "status": true,
                        "listacategorias": listacategorias
                    }*/
                );
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar categorias:" + erro.message    
                    }
                );
            });

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}
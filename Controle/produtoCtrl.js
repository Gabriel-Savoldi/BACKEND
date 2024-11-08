//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Produto from "../Modelo/produto.js";
import Categoria from "../Modelo/categoria.js";

export default class ProdutoCtrl {

    gravar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const descricao = requisicao.body.descricao;
            const precoCusto = requisicao.body.precoCusto;
            const precoVenda = requisicao.body.precoVenda;
            const qtdEstoque = requisicao.body.qtdEstoque;
            const urlImagem = requisicao.body.urlImagem;
            const dataValidade = requisicao.body.dataValidade;
            const categoria = requisicao.body.categoria;
            const categ = new Categoria(categoria.codigo);
            categ.consultar(categoria.codigo).then((listaCategorias) => {
                if (listaCategorias.length > 0) {
                    //pseudo validação
                    if (descricao && precoCusto > 0 &&
                        precoVenda > 0 && qtdEstoque >= 0 &&
                        urlImagem && dataValidade && categoria.codigo > 0) {
                        //gravar o produto

                        const produto = new Produto(0,
                            descricao, precoCusto, precoVenda,
                            qtdEstoque, urlImagem, dataValidade, categ);

                        produto.incluir()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Produto adicionado com sucesso!",
                                    "codigo": produto.codigo
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível incluir o produto: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados de um produto conforme documentação da API."
                            }
                        );
                    }
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
                });
            });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            const descricao = requisicao.body.descricao;
            const precoCusto = requisicao.body.precoCusto;
            const precoVenda = requisicao.body.precoVenda;
            const qtdEstoque = requisicao.body.qtdEstoque;
            const urlImagem = requisicao.body.urlImagem;
            const dataValidade = requisicao.body.dataValidade;
            const categoria = requisicao.body.categoria;
            //validação de regra de negócio
            const categ = new Categoria(categoria.codigo);
            categ.consultar(categoria.codigo).then((lista) => {
                if (lista.length > 0) {
                    //pseudo validação
                    if (codigo > 0 && descricao && precoCusto > 0 &&
                        precoVenda > 0 && qtdEstoque >= 0 &&
                        urlImagem && dataValidade && categoria.codigo > 0) {
                        //alterar o produto
                        const produto = new Produto(codigo,
                            descricao, precoCusto, precoVenda,
                            qtdEstoque, urlImagem, dataValidade, categ);
                        produto.alterar()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Produto alterado com sucesso!",
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível alterar o produto: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados de um produto conforme documentação da API."
                            }
                        );
                    }

                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    });
                }

            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
                });
            });

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            //pseudo validação
            if (codigo > 0) {
                //alterar o produto
                const produto = new Produto(codigo);
                produto.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Produto excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o produto: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um produto conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo;
            //evitar que código tenha valor undefined
            if (isNaN(codigo)) {
                codigo = "";
            }

            const produto = new Produto();
            //método consultar retorna uma lista de produtos
            produto.consultar(codigo)
                .then((listaProdutos) => {
                    resposta.status(200).json(listaProdutos
                        /*{
                            "status": true,
                            "listaProdutos": listaProdutos
                        }*/
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar produtos: " + erro.message
                        }
                    );
                });

        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}
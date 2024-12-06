//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        
        resposta.type("application/json");
       
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const contato = requisicao.body.contato;
            const cpf = requisicao.body.cpf;

            if (nome && endereco  &&
                contato && cpf) {
                //gravar o fornecedor

                const fornecedor = new Fornecedor(0,
                    nome, endereco, contato,
                    cpf);

                fornecedor.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor adicionado com sucesso!",
                            "codigo": fornecedor.codigo
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
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

    editar(requisicao, resposta) {
        
        resposta.type("application/json");
       
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const contato = requisicao.body.contato;
            const cpf = requisicao.body.cpf;

            if (codigo > 0 && nome && endereco  &&
                contato && cpf) {
                //gravar o fornecedor

                const fornecedor = new Fornecedor(codigo,
                    nome, endereco, contato,
                    cpf);

                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor adicionado com sucesso!",
                            "codigo": fornecedor.codigo
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
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

    excluir(requisicao, resposta) {
        
        resposta.type("application/json");
        
        if (requisicao.method == 'DELETE') {
            
            const codigo = requisicao.params.codigo;
            
            if (codigo > 0) {
                //alterar o fornecedor
                const fornecedor = new Fornecedor(codigo);
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um fornecedor conforme documentação da API."
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

            const fornecedor = new Fornecedor();
            //método consultar retorna uma lista de fornecedors
            fornecedor.consultar(codigo)
                .then((listaFornecedors) => {
                    resposta.status(200).json(listaFornecedors
                        
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar fornecedors: " + erro.message
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
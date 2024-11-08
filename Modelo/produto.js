import ProdutoDAO from "../Persistencia/produtoDAO.js";
import Categoria from "./categoria.js";
export default class Produto{
    //atributos privados
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #qtdEstoque;
    #urlImagem;
    #dataValidade;
    #categoria

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo=novoCodigo;
    } 

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoPreco){
        this.#precoCusto = novoPreco;
    }

    get precoVenda(){
        return this.#precoVenda;
    }

    set precoVenda(novoPreco){
        this.#precoVenda = novoPreco;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novaUrl){
        this.#urlImagem=novaUrl;
    }

    get dataValidade(){
        return this.#dataValidade;
    }

    set dataValidade(novaData){
        this.#dataValidade = novaData;
    }

    get categoria(){
        return this.#categoria
    }

    set categoria(novaCategoria){
        if (novaCategoria instanceof Categoria){
            this.#categoria = novaCategoria;
        }
    }

    //construtor (criador de um produto)
    constructor(codigo=0, descricao="",precoCusto=0,precoVenda=0,qtdEstoque=0,
                urlImagem="", dataValidade="", categoria={}){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
        this.#urlImagem=urlImagem;
        this.#dataValidade=dataValidade;            
        this.#categoria = categoria;
    }

    //override do método toJSON
    //o método toJSON é chamado automaticamente quando um produto
    //precisar ser convertido no formato JSON
    toJSON(){
        return {
            "codigo":this.#codigo,
            "descricao":this.#descricao,
            "precoCusto":this.#precoCusto,
            "precoVenda":this.#precoVenda,
            "qtdEstoque":this.#qtdEstoque,
            "urlImagem":this.#urlImagem,
            "dataValidade":this.#dataValidade,
            "categoria":this.#categoria
        }
    }

    async incluir(){
        //instanciar a camada de persistencia do produto
        const prodDAO = new ProdutoDAO();
        await prodDAO.incluir(this); //this referência a si mesmo
    }

    async consultar(termo){
        const prodDAO = new ProdutoDAO();
        return await prodDAO.consultar(termo);
    }

    async excluir(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluir(this);
    }

    async alterar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.alterar(this);
    }
}


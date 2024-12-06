import CategoriaDAO from "../Persistencia/categoriaDAO.js";

export default class Categoria {
   
    #codigo;
    #descricao;

    
    constructor(codigo, descricao) {
        this.#codigo = codigo;       
        this.#descricao = descricao;  
    }

    get codigo() {
        return this.#codigo;
    }

    
    set codigo(value) {
        this.#codigo = value;
    }

    
    get descricao() {
        return this.#descricao;
    }

    
    set descricao(value) {
        this.#descricao = value;
    }

    
    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        };
    }

    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async editar(){
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this);
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async consultar(termo){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(termo);
    }
}
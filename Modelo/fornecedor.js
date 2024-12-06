import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    #codigo;
    #nome;
    #endereco;
    #contato;
    #cpf;

   
    constructor(codigo=0, nome="",endereco="",contato="",cpf=""){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#endereco=endereco;
        this.#contato=contato;
        this.#cpf=cpf;
}
    

    
    get codigo() {
        return this.#codigo;
    }

    
    set codigo(value) {
        this.#codigo = value;
    }

    
    get nome() {
        return this.#nome;
    }

    
    set nome(value) {
        this.#nome = value;
    }

    get endereco() {
        return this.#endereco;
    }

    
    set endereco(value) {
        this.#endereco = value;
    }

    get contato() {
        return this.#contato;
    }

    
    set contato(value) {
        this.#contato = value;
    }

    get cpf() {
        return this.#cpf;
    }

    
    set cpf(value) {
        this.#cpf = value;
    }
    

    
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "contato": this.#contato,
            "cpf": this.#cpf
        };
    }

    async incluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.incluir(this); 
    }

    async consultar(termo){
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }

    async excluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async alterar(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.alterar(this);
    }
}
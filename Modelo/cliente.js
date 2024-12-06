import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    #codigo;
    #nome;
    #endereco;


    constructor(codigo=0, nome="",endereco="",telefone="",email=""){
            this.#codigo=codigo;
            this.#nome=nome;
            this.#endereco=endereco;
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

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
        };
    }

    async incluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.incluir(this); 
    }

    async consultar(termo){
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termo);
    }

    async excluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async alterar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.alterar(this);
    }
}
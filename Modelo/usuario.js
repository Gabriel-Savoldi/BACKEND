import UsuarioDAO from "../Persistencia/usuarioDAO.js";



export default class Usuario {
   
    #codigo;
    #nome;
    #email;
    #senha;
    #telefone;
    #endereco;



   
    constructor(codigo = 0, nome = "", email = "", senha = "", telefone = "", endereco = "", privilegios = {}) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#telefone = telefone;
        this.#endereco = endereco;
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

    get email() {
        return this.#email;
    }

   
    set email(value) {
        this.#email = value;
    }

    get senha() {
        return this.#senha;
    }

    
    set senha(value) {
        this.#senha = value;
    }

    get telefone() {
        return this.#telefone;
    }

    
    set telefone(value) {
        this.#telefone = value;
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
            "email": this.#email,
            "senha": this.#senha,
            "telefone": this.#telefone,
            "endereco": this.#endereco,
        };
    }

    async incluir(){
       
        const usuDAO = new UsuarioDAO();
        await usuDAO.incluir(this); 
    }

    async consultar(termo){
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
    }

    async excluir(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async alterar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.alterar(this);
    }
}
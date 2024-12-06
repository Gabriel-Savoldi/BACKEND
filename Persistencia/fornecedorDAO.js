
//DAO - Data Access Object
import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); 
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor(
                    forn_codigo INT NOT NULL AUTO_INCREMENT,
                    forn_nome VARCHAR(200) NOT NULL,
                    forn_endereco VARCHAR(200) NOT NULL,
                    forn_contato VARCHAR(12) NOT NULL DEFAULT 0,
                    forn_cpf VARCHAR(200),
                    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor(forn_nome, forn_endereco, forn_contato, forn_cpf)
                VALUES(?, ?, ?, ?)
            `;
            const parametros = [fornecedor.nome, fornecedor.endereco, fornecedor.contato, fornecedor.cpf];
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release();
        } 
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor SET forn_nome=?, forn_endereco=?, forn_contato=?, forn_cpf=?
                WHERE forn_codigo = ?
            `;
            const parametros = [fornecedor.nome, fornecedor.endereco, fornecedor.contato, fornecedor.cpf, fornecedor.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        } 
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor WHERE forn_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM fornecedor WHERE forn_codigo = ?`;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        let listaFornecedors = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['forn_codigo'],
                linha['forn_nome'],
                linha['forn_endereco'],
                linha['forn_contato'],
                linha['forn_cpf']
            );
            listaFornecedors.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedors;
    }

   

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_codigo = ?`;
            let parametros = [fornecedor.codigo]; // Garantir que o código esteja definido
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        } 
    }
        
}

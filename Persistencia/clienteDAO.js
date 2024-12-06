
//DAO - Data Access Object
import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); 
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    cli_codigo INT NOT NULL AUTO_INCREMENT,
                    cli_nome VARCHAR(200) NOT NULL,
                    cli_endereco VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO cliente(cli_nome, cli_endereco)
                VALUES(?, ?)
            `;
            const parametros = [cliente.nome, cliente.endereco, cliente.telefone, cliente.email];
            const resultado = await conexao.execute(sql, parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                UPDATE cliente SET cli_nome=?, cli_endereco=?
                WHERE cli_codigo = ?
            `;
            const parametros = [cliente.nome, cliente.endereco,cliente.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        } 
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM cliente WHERE cli_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM cliente WHERE cli_codigo = ?`;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha['cli_codigo'],
                linha['cli_nome'],
                linha['cli_endereco'],
                linha['cli_telefone'],
                linha['cli_email']
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }
    async excluir(cliente) {
        if (cliente instanceof Cliente && cliente.codigo) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cli_codigo = ?`;
            let parametros = [cliente.codigo]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); 
        } 
    }
        
}

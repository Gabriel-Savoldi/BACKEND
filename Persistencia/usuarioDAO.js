//DAO - Data Access Object
import Usuario from "../Modelo/usuario.js";

import conectar from "./Conexao.js";
export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); 
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                usu_codigo INT NOT NULL AUTO_INCREMENT,
                usu_email VARCHAR(200) NOT NULL,
                usu_senha VARCHAR(200) NOT NULL,
                usu_nome VARCHAR(200) NOT NULL,
                usu_telefone VARCHAR(12) NOT NULL DEFAULT 0,
                usu_endereco VARCHAR(200),
                CONSTRAINT pk_usuario PRIMARY KEY(usu_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(usu_email,usu_senha,usu_nome,usu_telefone,usu_endereco)
                values(?,?,?,?,?)
            `;
            let parametros = [
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.telefone,
                usuario.endereco,
            ]; //dados do usuario
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET usu_email=?,usu_senha=?,usu_nome=?,usu_telefone=?,usu_endereco=?
                WHERE usu_codigo = ?
            `;
            let parametros = [
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.telefone,
                usuario.endereco,
                usuario.codigo
            ]; //dados do usuario
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM usuario 
                   WHERE usu_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM usuario 
                   WHERE usu_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        for (const linha of linhas) {
            const usuario = new Usuario(
                linha['usu_codigo'],
                linha['usu_email'],
                linha['usu_senha'],
                linha['usu_nome'],
                linha['usu_telefone'],
                linha['usu_endereco'],
            );
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }
    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE usu_codigo = ?`;
            let parametros = [
                usuario.codigo
            ]; //dados do usuario
            await conexao.execute(sql, parametros);
            await conexao.release(); 
        }
    }
}
//DAO - Data Access Object
import Produto from "../Modelo/produto.js";
import Categoria from "../Modelo/categoria.js";

import conectar from "./Conexao.js";
export default class ProdutoDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS produto(
                prod_codigo INT NOT NULL AUTO_INCREMENT,
                prod_descricao VARCHAR(200) NOT NULL,
                prod_precoCusto DECIMAL(10,2) NOT NULL,
                prod_precoVenda DECIMAL(10,2) NOT NULL,
                prod_qtdEstoque INT NOT NULL DEFAULT 0,
                prod_urlImagem VARCHAR(250),
                prod_dataValidade DATE NOT NULL,
                fk_codigo_cat INT NOT NULL,
                CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
                CONSTRAINT fk_categoria FOREIGN KEY(fk_codigo_cat) REFERENCES categoria(codigo) 
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `INSERT INTO produto(prod_descricao,prod_precoCusto,prod_precoVenda,prod_qtdEstoque,prod_urlImagem,prod_dataValidade, fk_codigo_cat)
                values(?,?,?,?,?,str_to_date(?,'%d/%m/%Y'),?)
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo
            ]; //dados do produto
            const resultado = await conexao.execute(sql, parametros);
            produto.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `UPDATE produto SET prod_descricao=?,prod_precoCusto=?,prod_precoVenda=?,prod_qtdEstoque=?,prod_urlImagem=?,prod_dataValidade=str_to_date(?,'%d/%m/%Y'), fk_codigo_cat = ?
                WHERE prod_codigo = ?
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo,
                produto.codigo
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async consultar(termo) {
        //resuperar as linhas da tabela produto e transformá-las de volta em produtos
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM produto p
                   INNER JOIN categoria c ON p.fk_codigo_cat = c.codigo
                   WHERE prod_descricao LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM produto p
                   INNER JOIN categoria c ON p.fk_codigo_cat = c.codigo 
                   WHERE prod_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaProdutos = [];
        for (const linha of linhas) {
            const categoria = new Categoria(linha['codigo'],linha["descricao"]);    
            const produto = new Produto(
                linha['prod_codigo'],
                linha['prod_descricao'],
                linha['prod_precoCusto'],
                linha['prod_precoVenda'],
                linha['prod_qtdEstoque'],
                linha['prod_urlImagem'],
                linha['prod_dataValidade'],
                categoria
            );
            listaProdutos.push(produto);
        }
        await conexao.release();
        return listaProdutos;
    }
    async excluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `DELETE FROM produto WHERE codigo = ?`;
            let parametros = [
                produto.codigo
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}
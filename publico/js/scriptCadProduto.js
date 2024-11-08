const formCadProduto = document.getElementById('formCadProduto');
//function () {};

window.onload = exibirTabelaProdutos;

formCadProduto.onsubmit = (evento) => {

    const codigo = document.getElementById('codigo').value;
    const descricao = document.getElementById('descricao').value;
    const precoCusto = document.getElementById('precoCusto').value;
    const precoVenda = document.getElementById('precoVenda').value;
    const qtdEstoque = document.getElementById('qtdEstoque').value;
    const urlImagem = document.getElementById('urlImagem').value;
    const dataValidade = document.getElementById('dataValidade').value;
    const prodCtrl = new ProdutoCtrl();
    if (prodCtrl.validar(codigo, descricao, precoCusto, precoVenda, qtdEstoque, urlImagem, dataValidade)) {
        formCadProduto.classList.remove('was-validated');
        //limpar os dados do formulário após a inclusão
        formCadProduto.reset();
        exibirTabelaProdutos();
    }
    else {
        formCadProduto.classList.add('was-validated');
    }
    evento.stopPropagation();
    evento.preventDefault();
};

function exibirTabelaProdutos() {
    const prodCtrl = new ProdutoCtrl();
    const divTabela = document.getElementById('tabela');
    divTabela.innerHTML = '';
    const listaProdutos = prodCtrl.buscarProdutos();
    if (listaProdutos.length > 0) {
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';

        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço de Custo</th>
            <th>Preço de Venda</th>
            <th>qtdEstoque</th>
            <th>dataValidade</th>
            <th>Imagem</th>
            <th>Ações</th>
        </tr>`;

        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaProdutos.length; i++) {
            const linha = document.createElement('tr');
            //string literals
            linha.innerHTML = `
                <td>${listaProdutos[i].codigo}</td>
                <td>${listaProdutos[i].descricao}</td>
                <td>${listaProdutos[i].precoCusto}</td>
                <td>${listaProdutos[i].precoVenda}</td>
                <td>${listaProdutos[i].qtdEstoque}</td>
                <td>${listaProdutos[i].dataValidade}</td>
                <td><img width='32px' heigth='32px' 
                src='${listaProdutos[i].urlImagem}'></td>
                <td>
                    <button type='button' class='btn btn-danger' onclick='excluirProduto("${listaProdutos[i].codigo}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </td>
                
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
    else {
        const paragrafo = document.createElement('p');
        paragrafo.innerText = "Não há produtos a serem exibidos!";
        divTabela.appendChild(paragrafo);
    }
}

function excluirProduto(codigo){
    if (confirm("Deseja realmente excluir esse produto?")){
        const prodCtrl = new ProdutoCtrl();
        prodCtrl.removerProduto(codigo);
        exibirTabelaProdutos();
    }
}
window.onload = () => {

    fetch('https://fakestoreapi.com/products',{method:"GET"})
    .then((resposta)=>{
        return resposta.json();
    })
    .then((produtos)=>{
        for (const produto of produtos){
            document.write(`<img style="width:200px;" src='${produto.image}'></img>`);
            document.write(`<h1>${produto.title}</h1>`);
            document.write(`<h2>R$ ${produto.price}</h2><br/>`);
        }
    })
    .catch((erro) => {
        document.write(`<h1>Não foi possível obter a lista de produtos: ${erro.message}</h1>`);
    });
}; 
/**
 * Verifica se a API está pronta.
 */
window.addEventListener('pywebviewready', () => {
    console.log('PyWebView pronto');
    renderizarTelaInicial();
});

/**
 * Volta para tela inicial.
 * 
 * @returns {void}
 * 
 */
function voltar(){
    renderizarTelaInicial();
}

let listaNome = [];
let listaPreco = [];

/**
 * Adiciona o evento de clique para adicionar produtos na comanda para cada item dentro das abas.
 *
 * @returns {void}
 * 
 */
function adicionarEventListener(){
    const produtos = document.querySelectorAll('.produto');
    for(const elemento of produtos) {
        elemento.addEventListener('click', async () => {
            let nomeProduto = elemento.firstChild.innerText.trim();
            let preco = parseFloat(elemento.dataset.preco);

            const tiposMeioMeio = await window.pywebview.api.get_tipos_meio_meio();

            if(tiposMeioMeio.includes(elemento.dataset.tipo)){
                elemento.classList.add('selecionado')

                listaNome.push(nomeProduto);
                listaPreco.push(preco);

                if(listaNome.length == 2){
                    if(listaPreco[0] > listaPreco[1]){
                        preco = listaPreco[0];
                        nomeProduto = `${listaNome[0]} e ${listaNome[1]}`;
                    }else if(listaNome[0] == listaNome[1]){
                        nomeProduto = `${listaNome[0]}`;
                    }else{
                        nomeProduto = `${listaNome[1]} e ${listaNome[0]}`;
                    }

                    adicionarProdutoNaComanda(1, nomeProduto, preco);

                    listaNome = [];
                    listaPreco = [];
                    for(const elemento of produtos){
                        elemento.classList.remove('selecionado');
                    }
                }
            }
            else{
                adicionarProdutoNaComanda(1, nomeProduto, preco);
            }
            
        });
    }
}

/**
 * Carrega a aba de cada tipo de produto(Padrão: Pizzas Salgadas, Pizzas Doces e Bebidas) com base no clique.
 * 
 * @param {string} tipo - Tipo do produto(Padrão): "Pizzas", "Doces" ou "Bebidas".
 * @returns {void}
 * 
 */ 
async function carregarAbaProdutos(tipo){
    const tipos = await window.pywebview.api.get_tipos_produtos();

    for(let t = 0; t < tipos.length; t++){
        const aba = document.getElementById(`aba-${tipos[t]}`);
        if(tipo == tipos[t]){
            aba.style.display = 'flex';
        }else{
            aba.style.display = 'none';
        }
    }
}

function renderizarNotificacao(tipo){
    const divNotificacao = document.createElement('div');
    divNotificacao.setAttribute('id', 'notificacao');


    if(tipo == "SalvarComanda"){
        divNotificacao.innerText = "Comanda salva com sucesso!";
    }else if(tipo == "Taxa"){
        divNotificacao.innerText = "Configurações de taxa alteradas com sucesso!";
    }else if(tipo == "LimparMesa"){
        divNotificacao.innerText = "Mesa limpa com sucesso!";
    }else if(tipo == "MesaNova"){
        divNotificacao.innerText = "Mesa criada com sucesso!";
    }else if(tipo == "MesaExcluida"){
        divNotificacao.innerText = "Mesa excluída com sucesso!";
    }else if(tipo == "ProdutoAdicionado"){
        divNotificacao.innerText = "Produto adicionado com sucesso!";
    }else if(tipo == "ProdutoExcluido"){
        divNotificacao.innerText = "Produto excluído com sucesso!";
    }else if(tipo == "ProdutoExiste"){
        divNotificacao.innerText = "Esse produto já existe!";
    }else if(tipo == "TipoProdutoAdicionado"){
        divNotificacao.innerText = "Tipo de Produto adicionado com sucesso!";
    }else if(tipo == "TipoProdutoExcluido"){
        divNotificacao.innerText = "Tipo de Produto excluído com sucesso!";
    }else if(tipo == "TipoProdutoExiste"){
        divNotificacao.innerText = "Esse tipo de produto já existe!";
    }
    else{
        divNotificacao.innerText = "Alteração feita com sucesso!";
    }

    const main = document.getElementById('main');
    main.appendChild(divNotificacao);

    setTimeout(() =>{
        main.removeChild(divNotificacao);
    }, 4 * 1000);
}

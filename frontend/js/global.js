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
        elemento.addEventListener('click', function() {
            let nomeProduto = elemento.firstChild.innerText.trim();
            let preco = parseFloat(elemento.dataset.preco);

            if(elemento.dataset.tipo == 'Pizzas Salgadas'){
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

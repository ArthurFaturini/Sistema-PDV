/**
 * Renderiza a tela da mesa, permitindo anotar os produtos na comanda.
 *  
 * @param {number} num_mesa - Número da mesa(Padrão: 1 a 6).
 * @returns {void}
 *  
 */
async function renderizarTelaMesa(num_mesa){
    const main = document.getElementById('main');
    main.style.display = 'inline'
    main.innerHTML = "";

    const telaMesa = document.createElement('section');
    telaMesa.setAttribute('id', 'tela-mesa');

    const navBarMesa = document.createElement('section');
    navBarMesa.setAttribute('id', 'nav-bar-mesa');

    //Lista de tipos
    const tipos = await window.pywebview.api.get_tipos_produtos();

    for(let t = 0; t < tipos.length; t++){
        const h2 = document.createElement('h2');
        h2.innerText = tipos[t];
        h2.addEventListener('click', () => {
            carregarAbaProdutos(`${tipos[t]}`);
            for(let div of document.getElementById('nav-bar-mesa').children){
                div.style.color = 'white';
            }
            h2.style.color = 'var(--cor5)';
        });

        navBarMesa.appendChild(h2);
    }

    const comandaMesa = document.createElement('section');
    comandaMesa.setAttribute('id', 'comanda-mesa');

    const divTitulo = document.createElement('div');
    divTitulo.setAttribute('id', 'titulo');

    const h2 = document.createElement('h2');
    h2.innerText = `Mesa ${num_mesa}`;

    const buttonVoltar = document.createElement('button');
    buttonVoltar.innerText = "Voltar";
    buttonVoltar.setAttribute('onclick', "voltar()");

    divTitulo.appendChild(h2);
    divTitulo.appendChild(buttonVoltar);

    const divAnotacao = document.createElement('div');
    divAnotacao.setAttribute('id', 'anotacao');

    const divFuncoes = document.createElement('div');
    divFuncoes.setAttribute('id', 'funcoes');

    const pTotal = document.createElement('p');
    pTotal.innerText = "Total: R$ 0.00";
    pTotal.setAttribute('id', 'total')

    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';


    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'taxa';
    input.setAttribute('onclick', "aplicarTaxa()");

    const taxaConfiguracoes = await window.pywebview.api.get_taxa_configuracoes();

    const label = document.createElement('label');
    label.htmlFor = 'taxa';
    label.innerHTML = `Aplicar ${Object.keys(taxaConfiguracoes)} de ${taxaConfiguracoes[Object.keys(taxaConfiguracoes)]}%`;

    const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icone.setAttribute("width", "20");
    icone.setAttribute("height", "20");
    icone.setAttribute("fill", "white");
    icone.setAttribute("viewBox", "0 0 16 16");
    icone.setAttribute("class", "bi bi-gear");
    icone.setAttribute('id', 'configuracoes-taxa');
    icone.style.visibility = 'hidden';

    icone.innerHTML = `
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
    `;

    div.addEventListener('mouseover', () =>{
        icone.style.visibility = 'visible';
    })
    div.addEventListener('mouseout', () =>{
        icone.style.visibility = 'hidden';
    })

    icone.addEventListener('click', () =>{
        renderizarTelaConfiguracoesTaxas(num_mesa);
    })

    div.appendChild(icone);
    div.appendChild(input);
    div.appendChild(label);

    const buttonSalvar = document.createElement('button');
    buttonSalvar.innerText = "Salvar Comanda"
    buttonSalvar.setAttribute('onclick', `salvarComanda(${num_mesa})`);

    divFuncoes.appendChild(pTotal);
    divFuncoes.appendChild(div);
    divFuncoes.appendChild(buttonSalvar);

    comandaMesa.appendChild(divTitulo);
    comandaMesa.appendChild(divAnotacao);
    comandaMesa.appendChild(divFuncoes);

    const sectionProdutos = document.createElement('section');
    sectionProdutos.setAttribute('id', 'produtos');

    telaMesa.appendChild(navBarMesa);
    telaMesa.appendChild(comandaMesa);
    telaMesa.appendChild(sectionProdutos);

    main.appendChild(telaMesa);

    //Loop for para a quantidade de tipos
    for(let i = 0; i < tipos.length; i++){
        const quantidadeDeProduto = await window.pywebview.api.get_quantidade_produtos(tipos[i]);

        //Criando o elemento section com id da aba específica
        const section = document.createElement('section');
        section.setAttribute('id', `aba-${tipos[i]}`);
        section.classList.add('abas-produtos');
        
        //Loop for para a quantidade de produtos de cada tipo
        for(let a = 0; a < quantidadeDeProduto; a++){
            const nomeProduto = await window.pywebview.api.get_nome_produto(tipos[i], a);
            const precoProduto = await window.pywebview.api.get_preco_produto(nomeProduto, tipos[i]);
            
            const div = document.createElement('div');
            div.classList.add('produto');
            div.setAttribute('data-tipo', tipos[i]);
            div.setAttribute('data-preco', precoProduto.toFixed(2))

            const h2 = document.createElement('h2');
            h2.innerText = nomeProduto;
            div.appendChild(h2);

            const p = document.createElement('p');
            p.innerText = `R$ ${precoProduto.toFixed(2)}`;
            div.appendChild(p)

            section.appendChild(div);
        }

        document.getElementById('produtos').appendChild(section);
    };

    adicionarEventListener();
    lerComanda(num_mesa);
    calcularTotal();
    renderizarBotaoImprimir(num_mesa);
};

/**
 * Renderiza o botão para abrir o modal de impressão.
 * 
 * @param {number} num_mesa - Número da mesa(Padrão: 1 a 6).
 * @returns {void}
 * 
 */
async function renderizarBotaoImprimir(num_mesa){
    const divTitulo = document.getElementById('titulo');
    const inputTaxa = document.getElementById('taxa');

    let taxa = false;

    if(inputTaxa.checked){
        taxa = true;
    };

    renderizarTelaOpcaoImprimir(num_mesa);
    
    const buttonImprimir = document.createElement('button');
    buttonImprimir.innerText = "Imprimir Comanda";
    buttonImprimir.addEventListener('click', async () =>{
        const comanda = await window.pywebview.api.get_comanda_mesa(num_mesa);
        if(comanda.length){
            abrirTelaOpcaoImprimir();
        }
    });

    divTitulo.appendChild(buttonImprimir);
}

/**
 * Renderiza o modal para escolher as opções de impressão.
 * 
 * @param {number} num_mesa - Número da mesa(Padrão: 1 a 6).
 * @returns {void}
 */
function renderizarTelaOpcaoImprimir(num_mesa){
    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.style.display = 'none';
    div.classList.add('modal');
    div.setAttribute('id', 'modalImprimir');

    const form = document.createElement('form');
    form.setAttribute('onsubmit', `renderizarTelaMesa(${num_mesa})`);
    form.setAttribute('id', 'formImprimir');


    const button = document.createElement('button');
    button.innerText = 'Fechar';
    button.classList.add('botao');
    button.setAttribute('id', 'botaoFechar');

    button.addEventListener('click', fecharTelaOpcaoImprimir);

    form.appendChild(button);
    
    const buttonFechamento = document.createElement('button');
    buttonFechamento.innerText = 'Imprimir Fechamento';
    buttonFechamento.classList.add('botao');
    buttonFechamento.setAttribute('id', 'botaoFechamento');
    buttonFechamento.addEventListener('click', () => {
        const taxa = document.getElementById('taxa');
        let confirmacaoTaxa = false;
        if(taxa.checked){
            confirmacaoTaxa = true;
        }

        window.pywebview.api.imprimir_comanda(num_mesa, confirmacaoTaxa, 'Fechamento');
        fecharTelaOpcaoImprimir();
    })

    const buttonCozinha = document.createElement('button');
    buttonCozinha.innerText = 'Imprimir Cozinha';
    buttonCozinha.classList.add('botao');
    buttonCozinha.setAttribute('id', 'botaoCozinha');
    buttonCozinha.addEventListener('click', () => {
        window.pywebview.api.imprimir_comanda(num_mesa, false, 'Cozinha');
        fecharTelaOpcaoImprimir();
    })

    form.appendChild(button);
    form.appendChild(buttonFechamento);
    form.appendChild(buttonCozinha);
    
    div.appendChild(form);

    main.appendChild(div);
}

/**
 * Abre o modal de impressão.
 * 
 * @returns {void}
 */
function abrirTelaOpcaoImprimir(){
    document.getElementById('modalImprimir').style.display = 'grid';
}

/**
 * Fecha o modal de impressão.
 * 
 * @returns {void}
 */
function fecharTelaOpcaoImprimir(){
    document.getElementById('modalImprimir').style.display = 'none';
}

/**
 * Adiciona o produto na comanda exibida na interface.
 * 
 * @param {number} quantidade - Opcional. Quantidade do produto.
 * @param {string} nome - Nome do produto.
 * @param {number} preco - Preço do produto.
 * @returns {void}
 * 
 */
async function adicionarProdutoNaComanda(quantidade = 1, nome, preco){
    const anotacao = document.getElementById('anotacao');
    
    const nomeSeparado = nome.split(' e ');

    // Cria nova linha para o item
    const novaLinha = document.createElement('div'); 
    novaLinha.setAttribute('data-tipo', await window.pywebview.api.get_tipo_produto(nomeSeparado[0]));
    novaLinha.setAttribute('data-preco', preco);

    const pQuantidade = document.createElement('p');
    pQuantidade.classList.add('quantidade');
    pQuantidade.innerText = `${quantidade}`;
    
    const pNome = document.createElement('p');
    pNome.classList.add('nome');
    pNome.innerText = `${nome}`;

    const pPreco = document.createElement('p');
    pPreco.classList.add('preco');
    pPreco.innerText = `R$ ${preco.toFixed(2)}`;

    const iconeAdiciona = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconeAdiciona.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    iconeAdiciona.setAttribute("width", "32");
    iconeAdiciona.setAttribute("height", "32");
    iconeAdiciona.setAttribute("fill", "var(--cor5)");
    iconeAdiciona.setAttribute("viewBox", "0 0 16 16");
    iconeAdiciona.setAttribute("class", "bi bi-plus");
    iconeAdiciona.classList.add('aumentar-quantidade');
    
    iconeAdiciona.innerHTML = `
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    `;
    
    iconeAdiciona.setAttribute('onclick', 'aumentarQuantidade(this)');
    
    const iconeDiminui = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconeDiminui.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    iconeDiminui.setAttribute("width", "32");
    iconeDiminui.setAttribute("height", "32");
    iconeDiminui.setAttribute("fill", "var(--cor0)");
    iconeDiminui.setAttribute("viewBox", "0 0 16 16");
    iconeDiminui.setAttribute("class", "bi bi-dash");
    iconeDiminui.classList.add('diminuir-quantidade');
    
    iconeDiminui.innerHTML = `
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
    `;

    iconeDiminui.setAttribute('onclick', 'diminuirQuantidade(this)');

    novaLinha.appendChild(pQuantidade);
    novaLinha.appendChild(pNome);
    novaLinha.appendChild(pPreco);
    novaLinha.appendChild(iconeAdiciona);
    novaLinha.appendChild(iconeDiminui);

    anotacao.appendChild(novaLinha);

    aplicarTaxa();
}

/**
 * Obtém do backend os produtos da comanda da mesa atual e os renderiza na interface.         
 * 
 * @param {number} num_mesa - Número da mesa(Padrão: 1 a 6).
 * @returns {void}
 * 
 */
async function lerComanda(num_mesa){
    const produtos_comanda = await window.pywebview.api.get_comanda_mesa(num_mesa);

    for(let i = 0; i < produtos_comanda.length; i++){
        adicionarProdutoNaComanda(produtos_comanda[i]["quantidade"], produtos_comanda[i]["produto"], produtos_comanda[i]["preco"]);
    };
};

/**
 * Salva os produtos anotados na interface da comanda, enviando-os para o backend.
 * Remove a comanda anterior da mesa e registra os itens atuais, um por um.
 * 
 * @param {number} num_mesa - Número da mesa(Padrão: 1 a 6).
 * @returns {void}
 * 
 */
async function salvarComanda(num_mesa){
    const num_produtos = document.getElementById('anotacao').childElementCount;

    window.pywebview.api.limpar_comanda_da_mesa(num_mesa);

    for(i = 0; i < num_produtos; i++){
        const quantidade_produto = document.querySelectorAll('.quantidade').item(i).innerText;
        const nome_produto = document.querySelectorAll('.nome').item(i).innerText;
        const preco_produto = parseInt(document.querySelectorAll('.preco').item(i).innerText.replace("R$ ", ""));

        const comanda = [quantidade_produto, nome_produto, preco_produto];
        
        window.pywebview.api.salvar_comanda(num_mesa, comanda);
    }

    let subtotal = await calcularTotal();

    window.pywebview.api.set_subtotal_comanda(num_mesa, subtotal);
}

/**
 * Diminui o número que representa a quantidade do produto. 
 * Se quantidade cheguar a zero, o produto é excluido da interface da comanda.
 * 
 * @param {HTMLElement} elemento - O elemento <p> que representa o botão de diminuir (sinal de menos).
 * @returns {void}
 * 
 */
function diminuirQuantidade(elemento){
    const elementoPai = elemento.parentElement;
    const pQuantidade = elementoPai.querySelector('.quantidade');
    
    let quantidadeAtual = parseInt(pQuantidade.innerText);
    
    quantidadeAtual--;
    
    if(quantidadeAtual == 0){
        //Remove a div quando a quantidade do produto for 0
        const elementoAvo = elementoPai.parentElement;
        elementoAvo.removeChild(elementoPai);
        aplicarTaxa();
        return
    }
        
    pQuantidade.innerText = quantidadeAtual;
    ajustePreco(elementoPai);
}

/**
 * Aumenta o número que representa a quantidade do produto.
 * 
 * @param {HTMLElement} elemento - O elemento <p> que representa o botão de aumentar (sinal de mais).
 * @returns {void}
 * 
 */
function aumentarQuantidade(elemento){
    const elementoPai = elemento.parentElement;
    const pQuantidade = elementoPai.querySelector('.quantidade');

    let quantidadeAtual = parseInt(pQuantidade.innerText);

    quantidadeAtual++;

    pQuantidade.innerText = quantidadeAtual;
    
    ajustePreco(elementoPai);
};

/**
 * Atualiza o preço total de um item com base na quantidade atual e no preço unitário obtido do data-preco do parenteElement. Também atualiza o total geral da comanda.
 * 
 * @param {HTMLElement} elementoPai - O elemento pai que contém as informações do produto.
 * @returns {void}
 * 
 */
async function ajustePreco(elementoPai){
    const nome = elementoPai.querySelector('.nome').innerText;
    const tipo = elementoPai.dataset.tipo;
    const preco = await window.pywebview.api.get_preco_produto(nome.split(' e ')[0], tipo);
    const pPreco = elementoPai.querySelector('.preco');

    const pQuantidade = elementoPai.querySelector('.quantidade');

    let quantidadeAtual = parseFloat(pQuantidade.innerText);

    let precoAtualizado = preco * quantidadeAtual;

    pPreco.innerText = `R$ ${precoAtualizado.toFixed(2)}`;

    aplicarTaxa();
}

/**
 * Aplica ou remove os 10% de taxa de serviço sobre o total, 
 * com base no estado do checkbox 'dezPorCento'.
 * 
 * @returns {void}
 * 
 */
function aplicarTaxa(){
    const input = document.getElementById('taxa');

    if(input.checked){
        calcularTotal(true);
    }else{
        calcularTotal(false);
    }
}

/**
 * Calcula o total do preço dos produtos na comanda e atualiza o valor exibido.
 * Aplica 10% de acréscimo se o parâmetro `dezPorCento` seja `true`.
 * 
 * @param {boolean} [dezPorCento=false] - Indica se deve aplicar acréscimo de 10%.
 * @returns {number|void} Retorna o `somaTotal` dos produtos (antes de qualquer taxa) se `taxa` for `false`.
 * Se `taxa` for `true`, a função atualiza o DOM e não retorna um valor explícito (void).
 *
 */ 
async function calcularTotal(taxa=false){
    const listaPreco = document.querySelectorAll('.preco');

    let somaTotal = 0.00;

    for(let i = 0; i < listaPreco.length; i++){
        const precoSeparado = parseFloat(listaPreco[i].innerText.replace("R$ ", ""));

        somaTotal += precoSeparado;
    };

    const pTotal = document.getElementById('total');

    if(taxa){
        const taxaConfiguracoes = await window.pywebview.api.get_taxa_configuracoes();
        let porcentagem = somaTotal;
        
        
        if(Object.keys(taxaConfiguracoes) == 'Acréscimo'){
            porcentagem *= (taxaConfiguracoes[Object.keys(taxaConfiguracoes)] / 100);
            pTotal.innerText = `Total.: R$ ${somaTotal.toFixed(2)}\n+${taxaConfiguracoes[Object.keys(taxaConfiguracoes)]}%: R$ ${porcentagem.toFixed(2)}
            -----------------------Total: R$ ${(somaTotal + porcentagem).toFixed(2)}`;
            return;
        }else{
            porcentagem *= (taxaConfiguracoes[Object.keys(taxaConfiguracoes)] / 100);
            pTotal.innerText = `Total.: R$ ${somaTotal.toFixed(2)}\n-${taxaConfiguracoes[Object.keys(taxaConfiguracoes)]}%: R$ ${porcentagem.toFixed(2)}
            -----------------------Total: R$ ${(somaTotal - porcentagem).toFixed(2)}`;
            return;
        }
    };

    pTotal.innerText = `Total: R$ ${somaTotal.toFixed(2)}`;

    return somaTotal;
}

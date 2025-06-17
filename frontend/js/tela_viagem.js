async function renderizarTelaViagem(num_mesa){
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
            h2.style.color = 'var(--cor4)';
        });

        navBarMesa.appendChild(h2);
    }

    const comandaMesa = document.createElement('section');
    comandaMesa.setAttribute('id', 'comanda-mesa');

    const divTitulo = document.createElement('div');
    divTitulo.setAttribute('id', 'titulo');

    const h2 = document.createElement('h2');
    h2.innerText = `Viagem`;

    const buttonVoltar = document.createElement('button');
    buttonVoltar.innerText = "Voltar";
    buttonVoltar.addEventListener('click', () => {
        window.pywebview.api.excluir_mesa(num_mesa);
        renderizarTelaInicial();
    });

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

    divFuncoes.appendChild(pTotal);
    divFuncoes.appendChild(div);

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
    calcularTotal();
    renderizarBotaoImprimirViagem(num_mesa);
};

async function renderizarBotaoImprimirViagem(num_mesa){
    const divFuncoes = document.getElementById('funcoes');
    const inputTaxa = document.getElementById('taxa');

    let taxa = false;

    if(inputTaxa.checked){
        taxa = true;
    };
    
    const buttonImprimir = document.createElement('button');
    buttonImprimir.innerText = "Imprimir Pedido";
    buttonImprimir.addEventListener('click', async () =>{
        salvarComanda(num_mesa);
        const comanda = await window.pywebview.api.get_comanda_mesa(num_mesa);
        if(comanda.length){
            const taxa = document.getElementById('taxa');
            let confirmacaoTaxa = false;
            if(taxa.checked){
                confirmacaoTaxa = true;
            }
            window.pywebview.api.imprimir_comanda(num_mesa, confirmacaoTaxa, 'Fechamento');
            window.pywebview.api.imprimir_comanda(num_mesa, false, 'Cozinha');

            window.pywebview.api.excluir_mesa(num_mesa);
            renderizarTelaInicial();
        }
    });

    divFuncoes.appendChild(buttonImprimir);
}
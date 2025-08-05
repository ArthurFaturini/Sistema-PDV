/**
 * Renderiza a tela inicial de configurações.
 * 
 * @returns {void}
 */
function renderizarTelaConfiguracoes(){
    document.getElementById('main').style.display = "grid";
    document.getElementById('main').innerHTML = ` 
    <section id="configuracoes-painel">
        <h1>Configurações</h1>
        <button onclick="renderizarTelaConfiguracoesMesa()">Mesas</button>
        <button onclick="renderizarTelaConfiguracoesProdutos()">Produtos</button>
        <button onclick="renderizarTelaConfiguracoesTaxas()">Taxas</button>
        <button onclick="renderizarTelaConfiguracoesImpressao()">Impressão</button>
        <button onclick="renderizarTelaConfiguracoesCores()">Cores</button>
        <button onclick="voltar()">Voltar</button>
    </section>`;
}

// Configurações de Mesas
/**
 * Renderiza a tela de configurações das mesas.
 * 
 * @returns {void}
 */
async function renderizarTelaConfiguracoesMesa(){
    renderizarTelaConfiguracoes();

    const configuracoesTelaMesas = document.createElement('section');
    configuracoesTelaMesas.setAttribute('id', 'configuracoes-tela-mesas');
    configuracoesTelaMesas.style.display = 'grid';

    const quantidadeMesas = await window.pywebview.api.get_quantidade_mesas();
    
    for(let i = 0; i < quantidadeMesas; i++){
        const mesa = document.createElement('div');
        mesa.classList.add('mesa');

        const titulo = document.createElement('h2');
        titulo.innerText = `Mesa ${i + 1}`;

        const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        icone.setAttribute("width", "48");
        icone.setAttribute("height", "48");
        icone.setAttribute("fill", "white");
        icone.setAttribute("viewBox", "0 0 16 16");
        icone.setAttribute("class", "bi bi-trash");
        icone.style.display = 'none';

        icone.innerHTML = `
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        `;

        mesa.appendChild(titulo);
        mesa.appendChild(icone);

        mesa.addEventListener('mouseover', () => {
            titulo.style.display = 'none';
            icone.style.display = 'block';
        });

        mesa.addEventListener('mouseout', () => {
            titulo.style.display = 'block';
            icone.style.display = 'none';
        });

        mesa.addEventListener('click', () => {
            excluirMesa(i + 1);
        });

        configuracoesTelaMesas.appendChild(mesa);
    };
    const mesa = document.createElement('div');
    mesa.classList.add('mesa');
    
    const titulo = document.createElement('h2');
    titulo.innerText = 'Adicionar Mesa';

    const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icone.setAttribute("width", "48");
    icone.setAttribute("height", "48");
    icone.setAttribute("fill", "var(--cor4)");
    icone.setAttribute("viewBox", "0 0 16 16");
    icone.setAttribute("class", "bi bi-plus-circle");
    icone.style.display = 'none';

    icone.innerHTML = `
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    `;

    mesa.appendChild(titulo);
    mesa.appendChild(icone);

    mesa.addEventListener('mouseover', () => {
        titulo.style.display = 'none';
        icone.style.display = 'block';
    });

    mesa.addEventListener('mouseout', () => {
        titulo.style.display = 'block';
        icone.style.display = 'none';
    });

    mesa.addEventListener('click', () => {
        criarMesaNova();
        renderizarNotificacao("MesaNova");
    });

    configuracoesTelaMesas.appendChild(mesa);

    document.getElementById('main').appendChild(configuracoesTelaMesas);
}

/**
 * Cria uma mesa nova.
 * 
 * @returns {void}
 */
function criarMesaNova(){
    window.pywebview.api.criar_mesa_nova();

    renderizarTelaConfiguracoesMesa();
}

/**
 * Exclui uma mesa específica.
 * 
 * @param {number} num_mesa - Número da mesa(Padrão: 1 a 6).
 * @returns {void}
 */
function excluirMesa(num_mesa){
    const confirmacao = window.confirm(`Tem certeza que quer excluir a mesa ${num_mesa}`);

    if(confirmacao){
        window.pywebview.api.excluir_mesa(num_mesa);
        setTimeout(() => {
            renderizarNotificacao("MesaExcluida");
        }, 50);
    }

    renderizarTelaConfiguracoesMesa();
}

// Configurações de Produtos
/**
 * Renderiza a tela de configurações dos produtos.
 * 
 * @returns {void}
 */
async function renderizarTelaConfiguracoesProdutos(){
    renderizarTelaConfiguracoes();

    const configuracoesPainel = document.getElementById('configuracoes-painel');
    configuracoesPainel.innerHTML = `
        <h1>Produtos</h1>
        <button onclick="renderizarTelaConfiguracoesItens()">Produtos</button>
        <button onclick="renderizarTelaConfiguracoesDoisSabores()">Dois Sabores</button>
        <button onclick="renderizarTelaConfiguracoes()">Voltar</button>
    `;
};

async function renderizarTelaConfiguracoesItens(){
    renderizarTelaConfiguracoesProdutos();

    const configuracoesTelaProdutos = document.createElement('section');
    configuracoesTelaProdutos.setAttribute('id', 'configuracoes-tela-produtos');
    configuracoesTelaProdutos.style.display = 'grid';
    configuracoesTelaProdutos.innerHTML = "";

    document.getElementById('main').appendChild(configuracoesTelaProdutos);

    renderizarTelaAdicaoProduto();
    renderizarTelaAdicaoTipoProduto();

    const navBarMesa = document.createElement('section');

    navBarMesa.setAttribute('id', 'nav-bar-mesa-configuracoes');

    const todosProdutos = await window.pywebview.api.get_produtos();

    let tiposProdutos = Object.keys(todosProdutos);

    for(let t = 0; t < tiposProdutos.length; t++){
        const div = document.createElement('div');
        div.classList.add('tipo');

        const h2 = document.createElement('h2');
        h2.innerText = `${tiposProdutos[t]}`;

        h2.addEventListener('click', () => {
            carregarAbaProdutos(tiposProdutos[t]);
            for(let div of document.querySelectorAll('.tipo')){
                div.firstChild.style.color = 'white';
            }
            h2.style.color = 'var(--cor4)';
        })
        
        div.appendChild(h2);
        
        const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        icone.setAttribute("width", "25");
        icone.setAttribute("height", "25");
        icone.setAttribute("fill", "white");
        icone.setAttribute("viewBox", "0 0 16 16");
        icone.setAttribute("class", "bi bi-trash");
        icone.classList.add('icone-lixeira');
        icone.style.display = 'none';

        icone.innerHTML = `
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        `;
        div.appendChild(icone);

        
        div.addEventListener('mouseover', () => {
            icone.style.display = 'block';
        });
        
        div.addEventListener('mouseout', () => {
            icone.style.display = 'none';
        });

        icone.addEventListener('click', () => {
            excluirTipoProduto(tiposProdutos[t]);
        });
        
        div.appendChild(icone);

        navBarMesa.appendChild(div);
    }

    const addTipoProduto = document.createElement('div');
    addTipoProduto.classList.add('tipo');

    const h2 = document.createElement('h2');
    h2.innerText = 'Adicionar Tipo de Produto';
    h2.style.fontSize = '1.2em';

    const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icone.setAttribute("width", "48");
    icone.setAttribute("height", "48");
    icone.setAttribute("fill", "var(--cor4)");
    icone.setAttribute("viewBox", "0 0 16 16");
    icone.setAttribute("class", "bi bi-plus-circle");
    icone.style.display = 'none';

    icone.innerHTML = `
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    `;

    addTipoProduto.addEventListener('mouseover', () => {
        h2.style.display = 'none';
        icone.style.display = 'block';
    });

    addTipoProduto.addEventListener('mouseout', () => {
        h2.style.display = 'block';
        icone.style.display = 'none';
    });

    icone.addEventListener('click', () => {
        abrirTelaAdicaoTipoProduto()
    })

    addTipoProduto.appendChild(h2);
    addTipoProduto.appendChild(icone);

    navBarMesa.appendChild(addTipoProduto);

    configuracoesTelaProdutos.appendChild(navBarMesa);

    for(let t = 0; t < tiposProdutos.length; t++){
        const aba = document.createElement('section');
        aba.setAttribute('id', `aba-${tiposProdutos[t]}`);
        aba.classList.add('abas-produtos');

        let ProdutosPorTipo = todosProdutos[tiposProdutos[t]]; //Dicionário com os produtos(nome e preço) por tipo
        let NomeProdutos = Object.keys(ProdutosPorTipo); //Lista de Nomes de Produtos

        const quantidadeDeProduto = NomeProdutos.length;

        for(let q = 0; q < quantidadeDeProduto; q++){
            const nomeProduto = NomeProdutos[q];
            const precoProduto = ProdutosPorTipo[nomeProduto];
            
            const div = document.createElement('div');
            div.classList.add('produto');
            div.setAttribute('data-tipo', tiposProdutos[t]);
            div.setAttribute('data-preco', precoProduto.toFixed(2))

            const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            icone.setAttribute("width", "48");
            icone.setAttribute("height", "48");
            icone.setAttribute("fill", "white");
            icone.setAttribute("viewBox", "0 0 16 16");
            icone.setAttribute("class", "bi bi-trash");
            icone.style.display = 'none';

            icone.innerHTML = `
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            `;
            div.appendChild(icone);

            
            const h2 = document.createElement('h2');
            h2.innerText = nomeProduto;
            div.appendChild(h2);
            
            const p = document.createElement('p');
            p.innerText = `R$ ${precoProduto.toFixed(2)}`;
            div.appendChild(p)
            
            div.addEventListener('mouseover', () => {
                h2.style.display = 'none';
                p.style.display = 'none';
                icone.style.display = 'block';
            });
            
            div.addEventListener('mouseout', () => {
                h2.style.display = 'block';
                p.style.display = 'block';
                icone.style.display = 'none';
            });

            div.addEventListener('click', () => {
                excluirProduto(nomeProduto, tiposProdutos[t]);
            });

            aba.appendChild(div);
        }

        const div = document.createElement('div');
        div.classList.add('produto');

        const h2 = document.createElement('h2');
        h2.innerText = 'Adicionar Produto';

        const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        icone.setAttribute("width", "48");
        icone.setAttribute("height", "48");
        icone.setAttribute("fill", "var(--cor4)");
        icone.setAttribute("viewBox", "0 0 16 16");
        icone.setAttribute("class", "bi bi-plus-circle");
        icone.style.display = 'none';

        icone.innerHTML = `
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        `;

        div.appendChild(h2);
        div.appendChild(icone);

        div.addEventListener('mouseover', () => {
            h2.style.display = 'none';
            icone.style.display = 'block';
        });

        div.addEventListener('mouseout', () => {
            h2.style.display = 'block';
            icone.style.display = 'none';
        });

        div.addEventListener('click', () => {abrirTelaAdicaoProduto(tiposProdutos[t])});

        aba.appendChild(div);

        configuracoesTelaProdutos.appendChild(aba);
    }
}

async function renderizarTelaConfiguracoesDoisSabores(){
    renderizarTelaConfiguracoesProdutos();

    const configuracoesTelaDoisSabores = document.createElement('section');
    configuracoesTelaDoisSabores.setAttribute('id', 'configuracoes-tela-dois-sabores');
    configuracoesTelaDoisSabores.innerHTML = "";
    configuracoesTelaDoisSabores.style.display = 'grid';

    const tiposProdutos = await window.pywebview.api.get_tipos_produtos();

    const h1 = document.createElement('h1');
    h1.innerText = "Tipos Meio a Meio:";

    configuracoesTelaDoisSabores.appendChild(h1);

    const gradeOpcoes = document.createElement('section');

    const tiposMeioMeio = await window.pywebview.api.get_tipos_meio_meio();

    for(let i = 0; i < tiposProdutos.length; i++){
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('id', tiposProdutos[i]);
        if(tiposMeioMeio.includes(tiposProdutos[i])){
            input.checked = true;
        }
        
        const label = document.createElement('label');
        label.innerText = tiposProdutos[i];
        label.htmlFor = tiposProdutos[i];

        gradeOpcoes.appendChild(input);
        gradeOpcoes.appendChild(label);
    }

    const button = document.createElement('button');
    button.innerText = "Salvar";
    button.addEventListener('click', () =>{
        const listaTipos = [];
        for(let element of gradeOpcoes.getElementsByTagName('input')){
            if(element.checked){
                listaTipos.push(element.id);
            }
        };

        window.pywebview.api.set_tipos_meio_meio(listaTipos);

        renderizarNotificacao();
    });

    configuracoesTelaDoisSabores.appendChild(gradeOpcoes);
    configuracoesTelaDoisSabores.appendChild(button);

    document.getElementById('main').appendChild(configuracoesTelaDoisSabores);
}

/**
 * Renderiza o modal de adição de tipo de produto.
 * 
 * @returns {void}
 */
function renderizarTelaAdicaoTipoProduto(){
    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.style.display = 'none';
    div.classList.add('modal');
    div.setAttribute('id', 'modalTipo');

    const form = document.createElement('div');

    let label = document.createElement('label');
    label.innerText = 'Nome:';
    label.htmlFor = "nomeTipo";
    form.appendChild(label);
    
    let input = document.createElement('input');
    input.setAttribute('id', 'nomeTipo');
    input.setAttribute('required', '');
    input.type = 'text';
    input.placeholder = 'Exemplo: Salgadas';
    input.classList.add('texto');
    
    form.appendChild(input);
    
    let button = document.createElement('button');
    button.innerText = 'Fechar';
    button.classList.add('botao');

    button.addEventListener('click', fecharTelaAdicaoTipoProduto);

    form.appendChild(button);
    
    button = document.createElement('button');
    button.innerText = 'Salvar';
    button.classList.add('botao');
    button.setAttribute('id', 'botaoSalvar');
    button.addEventListener('click', () =>{
        if(input.value){
            adicionarTipoProduto();
            fecharTelaAdicaoTipoProduto();
            renderizarTelaConfiguracoesProdutos();
        }
    })

    form.appendChild(button);
    
    div.appendChild(form);

    main.appendChild(div);
}

/**
 * Renderiza o modal de adição de produto.
 * 
 * @returns {void}
 */
function renderizarTelaAdicaoProduto(){
    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.style.display = 'none';
    div.classList.add('modal');
    div.setAttribute('id', 'modalProduto');

    const form = document.createElement('div');

    let label = document.createElement('label');
    label.innerText = 'Nome:';
    label.htmlFor = "nomeProduto";
    form.appendChild(label);
    
    const inputNome = document.createElement('input');
    inputNome.setAttribute('id', 'nomeProduto');
    inputNome.setAttribute('required', '');
    inputNome.type = 'text';
    inputNome.placeholder = 'Exemplo: Alho Torrado';
    inputNome.classList.add('texto');
    
    form.appendChild(inputNome);
    
    label = document.createElement('label');
    label.innerText = "Preço:";
    label.htmlFor = "preco";
    form.appendChild(label);

    const inputPreco = document.createElement('input');
    inputPreco.setAttribute('id', 'preco');
    inputPreco.type = 'number';
    inputPreco.step = '0.01';
    inputPreco.min = 0;
    inputPreco.setAttribute('required', '');
    inputPreco.placeholder = 'Exemplo(R$): 35.00';
    inputPreco.classList.add('texto');

    form.appendChild(inputPreco);

    let button = document.createElement('button');
    button.innerText = 'Fechar';
    button.classList.add('botao');

    button.addEventListener('click', fecharTelaAdicaoProduto);

    form.appendChild(button);
    
    button = document.createElement('button');
    button.innerText = 'Salvar';
    button.classList.add('botao');
    button.setAttribute('id', 'botaoSalvar');
    button.addEventListener('click', () => {
        if(inputNome.value && inputPreco.value){
            adicionarProduto();
            fecharTelaAdicaoProduto();
            renderizarTelaConfiguracoesProdutos();
        }
    })

    form.appendChild(button);
    
    div.appendChild(form);

    main.appendChild(div);
}
      
/**
 * Abre o modal de adição de tipo de produto.
 * 
 * @returns {void}
 */
function abrirTelaAdicaoTipoProduto(){
    document.getElementById('modalTipo').style.display = 'grid';
}

/**
 * Fecha o modal de adição de tipo de produto.
 * 
 * @returns {void}
 */
function fecharTelaAdicaoTipoProduto(){
    document.getElementById('modalTipo').style.display = 'none';
    renderizarTelaConfiguracoesProdutos();

}

/**
 * Abre o modal de adição de produto.
 * 
 * @returns {void}
 */
function abrirTelaAdicaoProduto(tipoProduto){
    document.getElementById('modalProduto').style.display = 'grid';
    document.getElementById('modalProduto').setAttribute('data-tipo', tipoProduto);
}

/**
 * Fecha o modal de adição de produto.
 * 
 * @returns {void}
 */
function fecharTelaAdicaoProduto(){
    document.getElementById('modalProduto').style.display = 'none';
    renderizarTelaConfiguracoesProdutos();
}

/**
 * Exclui um produto específico.
 * 
 * @param {string} nomeProduto - Nome do produto
 * @param {string} tipoProduto - Tipo do produto
 */
function excluirProduto(nomeProduto, tipoProduto){
    const confirmacao = window.confirm(`Tem certeza que quer excluir o produto ${nomeProduto}`);

    if(confirmacao){
        window.pywebview.api.excluir_produto(nomeProduto, tipoProduto);
        setTimeout(() => {
            renderizarNotificacao("ProdutoExcluido");
        }, 50);
    }

    renderizarTelaConfiguracoesProdutos();
}

/**
 * Adiciona um novo produto. Caso ele não exista. Se existir, não é adicionado.
 * 
 * @returns {void}
 */
async function adicionarProduto(){
    let valueNome = document.getElementById('nomeProduto').value;
    let valuePreco = parseFloat(document.getElementById('preco').value);
    const tipoProduto = document.getElementById('modalProduto').dataset.tipo;

    const adicionandoProduto = await window.pywebview.api.adicionar_produto(valueNome, tipoProduto, valuePreco);

    if(!adicionandoProduto){
        console.log('Esse produto já existe');
        setTimeout(() =>{
            renderizarNotificacao("ProdutoExiste");
        }, 50);
    }else{
        console.log('Esse produto NÃO existe');
        setTimeout(() => {
            renderizarNotificacao("ProdutoAdicionado");
        }, 50);
    }
    renderizarTelaConfiguracoesProdutos();
}

/**
 * Exclui um tipo de produto específico.
 * 
 * @param {string} tipoProduto - Tipo de produto
 * @returns {void}
 */
async function excluirTipoProduto(tipoProduto){
    const confimarcao = window.confirm(`Você tem certeza que quer excluir o tipo: ${tipoProduto}`);
    
    
    if(confimarcao){
        await window.pywebview.api.excluir_tipo_produto(tipoProduto);
        setTimeout(() =>{
            renderizarNotificacao("TipoProdutoExcluido");
        }, 50);
    }
    
    renderizarTelaConfiguracoesProdutos();
}

/**
 * Adiciona um novo tipo de produto. Caso ele não exista. Se existir, não é adicionado.
 * 
 * @returns {void}
 */
async function adicionarTipoProduto() {
    const valueTipo = document.getElementById('nomeTipo').value;
    
    const adicionandoTipo = await window.pywebview.api.adicionar_tipo_produto(valueTipo);

    if(!adicionandoTipo){
        console.log('Esse tipo já existe');
        setTimeout(() =>{
            renderizarNotificacao("TipoProdutoExiste");
        }, 50);
    }else{
        console.log('Esse tipo NÃO existe');
        setTimeout(() =>{
            renderizarNotificacao("TipoProdutoAdicionado");
        }, 50);
    }

}

// Configurações de Taxas
/**
 * Renderiza a tela de configurações de taxas.
 * 
 * @param {number} num_mesa - Opcional. Número da mesa(Padrão: 1 a 6). 
 * @returns {void}
 */
async function renderizarTelaConfiguracoesTaxas(num_mesa){
    renderizarTelaConfiguracoes();
    if(typeof num_mesa == 'number'){
        const configuracoesPainel = document.getElementById("configuracoes-painel");
        configuracoesPainel.style.visibility = 'hidden';
    }

    const configuracoesTelaTaxa = document.createElement('section');
    configuracoesTelaTaxa.setAttribute('id', 'configuracoes-tela-taxa');
    configuracoesTelaTaxa.style.display = 'grid';

    document.getElementById('main').appendChild(configuracoesTelaTaxa);


    const taxaConfiguracoes = await window.pywebview.api.get_taxa_configuracoes();

    const h1 = document.createElement('h1');
    h1.innerText = 'Taxas';

    const divLabel = document.createElement('div');
    divLabel.setAttribute('id', 'labels-taxas');
    
    const inputTaxa = document.createElement('input');
    inputTaxa.setAttribute('id', 'taxa');
    inputTaxa.type = 'number';
    inputTaxa.step = '0.01';
    inputTaxa.min = 0;
    inputTaxa.setAttribute('required', '');
    inputTaxa.placeholder = 'Exemplo(%): 10.00';
    inputTaxa.classList.add('texto');
    inputTaxa.value = parseFloat(taxaConfiguracoes[Object.keys(taxaConfiguracoes)]);
    
    const inputAcrescimo = document.createElement('input');
    inputAcrescimo.setAttribute('id', 'acrescimo');
    inputAcrescimo.type = 'radio';
    inputAcrescimo.name = 'formatoTaxa';
    inputAcrescimo.value = 'Acréscimo';
    inputAcrescimo.style.display = 'none';
    
    const labelAcrescimo = document.createElement('label');
    labelAcrescimo.htmlFor = 'acrescimo';
    labelAcrescimo.innerText = 'Acréscimo';
    
    const inputDecrescimo = document.createElement('input');
    inputDecrescimo.setAttribute('id', 'decrescimo');
    inputDecrescimo.type = 'radio';
    inputDecrescimo.name = 'formatoTaxa';
    inputDecrescimo.value = 'Decréscimo';
    inputDecrescimo.style.display = 'none';

    const labelDecrescimo = document.createElement('label');
    labelDecrescimo.htmlFor = 'decrescimo';
    labelDecrescimo.innerText = 'Decréscimo';

    divLabel.appendChild(inputAcrescimo);
    divLabel.appendChild(labelAcrescimo);
    divLabel.appendChild(inputDecrescimo);
    divLabel.appendChild(labelDecrescimo);

    if(Object.keys(taxaConfiguracoes) == 'Acréscimo'){
        inputAcrescimo.checked = true;
    }else{
        inputDecrescimo.checked = true;
    }

    const buttonSalvar = document.createElement('button');
    buttonSalvar.style.gridRow = '4 / 5';
    buttonSalvar.addEventListener('click', () =>{
        if(inputAcrescimo.checked){
            salvarTaxa(inputTaxa.value, inputAcrescimo.value)
        }else{
            salvarTaxa(inputTaxa.value, inputDecrescimo.value)
        }
        if(num_mesa > 0){
            renderizarTelaMesa(num_mesa);
        }if(num_mesa == 0){
            renderizarTelaViagem(num_mesa);
        }

        renderizarNotificacao("Taxa");
    })
    buttonSalvar.innerText = 'Salvar';

    configuracoesTelaTaxa.appendChild(h1);
    configuracoesTelaTaxa.appendChild(inputTaxa);
    configuracoesTelaTaxa.appendChild(divLabel);
    configuracoesTelaTaxa.appendChild(buttonSalvar);
}

/**
 * Salva a nova configuração de taxa desejada.
 * 
 * @param {number} taxa - Valor de taxa. Ex: 10,00
 * @param {string} tipoTaxa - Acréscimo ou Decréscimo
 * @returns {void}
 */
function salvarTaxa(taxa, tipoTaxa){
    window.pywebview.api.salvar_taxa_configuracoes(taxa, tipoTaxa);
}

// Configurações de Impressão
/**
 * Renderiza a tela de configurações de Impressão.
 * 
 * @returns {void}
 */
async function renderizarTelaConfiguracoesImpressao(){
    renderizarTelaConfiguracoes();

    const configuracoesTelaImpressao = document.createElement('section')
    configuracoesTelaImpressao.setAttribute('id', 'configuracoes-tela-impressao');
    configuracoesTelaImpressao.style.display = 'grid';

    document.getElementById('main').appendChild(configuracoesTelaImpressao);

    const h1Impressora = document.createElement('h1');
    h1Impressora.innerText = 'Escolha uma impressora:';

    const selectImpressora = document.createElement('select');
    selectImpressora.id = 'impressora';
    selectImpressora.name = 'impressora';

    const listaImpressoras = await window.pywebview.api.get_lista_impressoras();

    const optionPadrao = document.createElement('option');
    const nome_impressora = await window.pywebview.api.get_impressora()
    if(nome_impressora.length > 0){
        optionPadrao.innerText = nome_impressora;
    }else{
        optionPadrao.innerText = 'Selecione uma impressora';
    }
    selectImpressora.appendChild(optionPadrao);

    for(let impressora of listaImpressoras){
        if(impressora == nome_impressora){
        }else{
            const option = document.createElement('option');
            option.value = impressora;
            option.innerText = impressora;
            selectImpressora.appendChild(option);
        }
    }

    const buttonSalvar = document.createElement('button');
    buttonSalvar.setAttribute('id', 'botao-salvar-impressao');
    buttonSalvar.innerText = 'Salvar';
    buttonSalvar.addEventListener('click', async() => {
        await window.pywebview.api.set_impressora(selectImpressora.value);
    })

    configuracoesTelaImpressao.appendChild(h1Impressora);
    configuracoesTelaImpressao.appendChild(selectImpressora);
    configuracoesTelaImpressao.appendChild(buttonSalvar);
}

// Configurações de Cores
async function renderizarTelaConfiguracoesCores(){
    renderizarTelaConfiguracoes();
    
    const configuracoesTelaCores = document.createElement('section')
    configuracoesTelaCores.setAttribute('id', 'configuracoes-tela-cores');
    configuracoesTelaCores.style.display = 'grid';

    document.getElementById('main').appendChild(configuracoesTelaCores);

    const cores = await window.pywebview.api.get_paleta_cores();

    for(let i = 0; i < cores.length; i++){
        const divPaleta = document.createElement('div');
        divPaleta.setAttribute('class', "paleta");
        divPaleta.setAttribute('data-posicao', i);

        const divCores = document.createElement('div');
        divCores.setAttribute('class', 'cores');

        for(let a = 0; a < 6; a++){
            const divCor = document.createElement('div');
            divCor.style.backgroundColor = `${cores[i][a]}`
            if(a == 0){
                divCor.style.borderRadius = '15px 0px 0px 0px';
            }
            if(a == 5){
                divCor.style.borderRadius = '0px 15px 0px 0px';
            }

            divCores.appendChild(divCor);
        }

        const button = document.createElement('button');
        button.innerText = "Escolher Paleta";
        button.addEventListener('click', () =>{
            const root = document.documentElement;

            for(let i = 0; i < 6; i++){
                root.style.setProperty(`--cor${i}`, `${cores[divPaleta.dataset.posicao][i]}`);
            }

            renderizarTelaConfiguracoesCores();

        })

        divPaleta.appendChild(divCores);
        divPaleta.appendChild(button);

        configuracoesTelaCores.appendChild(divPaleta);
    };
}
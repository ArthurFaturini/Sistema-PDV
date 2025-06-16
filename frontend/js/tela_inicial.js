/**
 *  Renderiza a tela inicial, permitindo escolher em qual mesa anotar a comanda. Além de poder acessar as configurações.
 *  
 * @returns {void}
 */
async function renderizarTelaInicial(){
    document.getElementById('main').style.display = "grid";
    document.getElementById('main').innerHTML = `
    <div id="painel-bem-vindo">
        <h1>Bem Vindo!</h1>
        <button onclick="renderizarTelaConfiguracoes()">Configurações</button>
    </div>`;

    const quantidadeMesas = await window.pywebview.api.get_quantidade_mesas();

    const divMesas = document.createElement('div');
    divMesas.setAttribute('id', 'mesas');

    const divViagem = document.createElement('div');
    divViagem.classList.add('viagem');

    const h2 = document.createElement('h2');
    h2.innerText = `Pedido Para Viagem`;

    const button = document.createElement('button');
    button.innerText = `Fazer Pedido`;
    button.addEventListener('click', () => {
        window.pywebview.api.criar_mesa_nova();
        renderizarTelaViagem(0);
    });

    divViagem.appendChild(h2);
    divViagem.appendChild(button);

    divMesas.appendChild(divViagem);

    for(let i = 1; i < quantidadeMesas + 1; i++){
        const divMesa = document.createElement('div');
        divMesa.classList.add('mesa');

        const divTitulo = document.createElement('div');
        divTitulo.setAttribute('id', 'titulo');

        const h2 = document.createElement('h2');
        h2.innerText = `Mesa ${i}`;

        const iconeOcupado = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        iconeOcupado.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        iconeOcupado.setAttribute("width", "12");
        iconeOcupado.setAttribute("height", "12");

        const comandaMesa = await window.pywebview.api.get_comanda_mesa(i);
        if(comandaMesa.length == 0){
            iconeOcupado.setAttribute("fill", "var(--cor5)");
        }else{
            iconeOcupado.setAttribute("fill", "black");
        }
        iconeOcupado.setAttribute("viewBox", "0 0 16 16");
        iconeOcupado.setAttribute("class", "bi bi-circle-fill");
        iconeOcupado.innerHTML = `<circle cx="8" cy="8" r="8"/>`;

        const button = document.createElement('button');
        button.innerText = `Ver mesa ${i}`;
        button.addEventListener('click', () => {
            renderizarTelaMesa(i);
        });

        divTitulo.appendChild(h2);
        divTitulo.appendChild(iconeOcupado);

        divMesa.appendChild(divTitulo);
        divMesa.appendChild(button);

        divMesas.appendChild(divMesa);
    };

    document.getElementById('main').appendChild(divMesas);

    adicionarEventListener();
};
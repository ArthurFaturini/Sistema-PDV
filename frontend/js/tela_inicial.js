/**
 *  Renderiza a tela inicial, permitindo escolher em qual mesa anotar a comanda.
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

    for(let i = 1; i < quantidadeMesas + 1; i++){
        const divMesa = document.createElement('div');
        divMesa.classList.add('mesa');

        const h2 = document.createElement('h2');
        h2.innerText = `Mesa ${i}`;

        const button = document.createElement('button');
        button.innerText = `Ver mesa ${i}`;
        button.addEventListener('click', () => {
            renderizarTelaMesa(i);
        });

        divMesa.appendChild(h2);
        divMesa.appendChild(button);

        divMesas.appendChild(divMesa);
    };

    document.getElementById('main').appendChild(divMesas);

    adicionarEventListener();
};
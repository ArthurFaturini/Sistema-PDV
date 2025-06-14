import json
from backend.config import mesas, taxa_configuracoes, nome_impressora
from backend.mesa import Mesa
from backend.impressao import imprimir_fechamento, imprimir_cozinha, lista_impressoras

class API: 
    def get_tipos_produtos(self):
        '''
        Returna os tipos de produtos existentes.

        Args:
            None
        
        Returns:
            list: Lista dos tipos de produtos
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
        
        tipos = list()

        for tipo in dados:
            tipos.append(tipo)

        return tipos
    
    def get_preco_produto(self, produto: str, tipo: str):
        '''
        Retorna o preço de um produto com base no nome e no tipo fornecido.

        Args:
            produto (string): Nome do produto
            tipo (string): Tipo do produto

        Returns:
            float: Preço do produto.

        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        return dados[tipo][produto]
    
    def get_quantidade_produtos(self, tipo: str):
        '''
        Retorna a quantidade de produtos de um tipo específico.

        Args:
            tipo (string): Tipo de produto

        Returns:
            quantidade (int): Quantidade de produtos para um tipo específico.
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        quantidade = 0
        for produto in dados[tipo]:
            quantidade += 1
        
        return quantidade
    
    def get_nome_produto(self, tipo: str, index:int):
        '''
        Retorna o nome do produto com base na posição dele.

        Args:
            tipo (string): Tipo de produto
            index (int): Posição do produto

        Returns:
            string: Nome do produto    
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        produtos = list()
        for produto in dados[tipo]:
            produtos.append(produto)

        return produtos[index]
    
    def get_tipo_produto(self, nome: str =str().title()):
        '''
        Retorna o tipo do produto com base em um nome de produto específico.

        Args:
            nome (string): Nome do produto.

        Returns:
            tipo (string): Tipo do produto específico.
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        for tipo in dados:
            if nome in dados[tipo]:
                return tipo


    def adicionar_produto(self, nome: str, tipo: str, preco: float):
        '''
        Adiciona um produto no banco de dados caso ele não exista, retornando True. 
        Caso ele já exista, não é adicionado e retorna False.

        Args:
            nome (string): Nome do produto
            tipo (string): Tipo do produto
            preco (float): Preço do produto
        
        Returns:
            bool: Retorna True se o produto for adicionado com sucesso, False caso contrário (se já existir).
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        if not nome.title() in dados[tipo]:
            dados[tipo][nome.title()] = preco
            with open("data/produtos.json", "w", encoding="utf-8") as arquivo:
                json.dump(dados, arquivo, indent=4, ensure_ascii=False)
            return True 
        else:
            return False
        
    def excluir_produto(self, nome: str, tipo: str):
        '''
        Exclui um produto com base em um nome e um tipo específico.

        Args:
            nome (string): Nome do produto
            tipo (string): Tipo do produto

        Returns:
            None
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
        
        if nome.title() in dados[tipo.title()]:
            del dados[tipo.title()][nome.title()]

        with open("data/produtos.json", "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, indent=4, ensure_ascii=False)

        return None
    
    def adicionar_tipo_produto(self, tipo: str):
        '''
        Adiciona um tipo de produto no banco de dados caso ele não exista, retornando True. 
        Caso ele já exista, não é adicionado e retorna False.

        Args:
            tipo (string): Tipo do produto
        
        Returns:
            bool: Retorna True se o tipo de produto for adicionado com sucesso, False caso contrário (se já existir).
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        if not tipo.capitalize() in dados:
            dados[tipo.capitalize()] = {}
            with open('data/produtos.json', 'w', encoding='utf-8') as f:
                json.dump(dados, f, indent=4, ensure_ascii=False)
                
            return True
        else:
            return False
            
    def excluir_tipo_produto(self, tipo: str):
        '''
        Exclui um tipo de produto específico.

        Args:
            tipo (string): Tipo do produto

        Returns:
            None
        '''
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        del dados[tipo.title()]
        
        with open('data/produtos.json', 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return None


    def get_comanda_mesa(self, num_mesa: int):
        '''
        Retorna a comanda de uma mesa específica.

        Args:
            num_mesa (int): Número da mesa(Padrão: 1 a 6)

        Returns:
            comanda (list[dicts]): Lista com [dicionários{"quantidade": "quantidadeDoProduto", "produto": "nomeDoProduto", "preco": "precoDoProduto"}]
        '''

        return mesas[num_mesa - 1].get_comanda()

    def salvar_comanda(self, num_mesa: int, comanda: list):
        '''
        Salva os itens na comanda em uma mesa específica.
        
        Args:
            num_mesa (int): Número da mesa(Padrão: 1 a 6)
            comanda (list): Lista com [quantidade, produto, preco]

        Returns:
            None
        '''
        
        mesas[num_mesa - 1].set_comanda(comanda)

    def limpar_comanda_da_mesa(self, num_mesa: int):
        '''
        Limpa a comanda de uma mesa específica.

        Args:
            num_mesa (int): Número da mesa(Padrão: 1 a 6)

        Returns:
            None
        '''

        mesas[num_mesa - 1].limpar_comanda()

    def get_quantidade_mesas(self):
        '''
        Retorna o número de mesas existentes.

        Args:
            None

        Returns:
            int: Número de mesas.
        '''

        return len(mesas)
    
    def criar_mesa_nova(self):
        '''
        Cria uma nova mesa e adiciona na lista de mesas.

        Args:
            None

        Returns:
            None
        '''

        mesas.append(Mesa())
    
    def excluir_mesa(self, num_mesa: int):
        '''
        Exclui uma mesa específica da lista mesas.

        Args:
            num_mesa (int) = Número da mesa(Padrão: 1 a 6)
        
        Returns:
            None
        '''

        mesas.pop(num_mesa - 1)

    def get_taxa_configuracoes(self):
        '''
        Retorna as configurações padrões de taxa.

        Args:
            None

        Returns:
            taxa_configuracoes (dict): {string, float}
        '''
        return taxa_configuracoes

    def salvar_taxa_configuracoes(self, taxa: float, tipo_taxa: str):
        '''
        Salva novas configurações de taxa.

        Args:
            taxa (float): Taxa específica. Ex: 10,00
            tipo_taxa (string): Acréscimo ou Decréscimo

        Returns:
            None
        '''
        taxa_configuracoes.clear()

        taxa_configuracoes[tipo_taxa] = taxa

    def imprimir_comanda(self, num_mesa: int, taxa: bool = False, opcao: str = str()):
        '''
        Chama uma função específica de impressão com base na opção desejada.

        Args:
            num_mesa (int): Número da mesa(Padrão: 1 a 6)
            taxa (bool): Aplicação de taxa(Padrão: False)
            opcao (string): Nome do tipo de impressão

        Returns:
            None
        '''
        if opcao == 'Fechamento':
            imprimir_fechamento(num_mesa, taxa)
        else:
            imprimir_cozinha(num_mesa)

    def set_subtotal_comanda(self, num_mesa: int, subtotal: float):
        '''
        Salva o subtotal da comanda de uma mesa específica.
        Args:
            num_mesa (int): Número da mesa(Padrão: 1 a 6)   
            subtotal (float): Subtotal da comanda de uma mesa específica

        Returns:
            None
        '''
        mesas[num_mesa - 1].set_subtotal(subtotal)

    def get_lista_impressoras(self):
        '''
        Retorna a lista de impressoras conectadas ao computador.

        Args:
            None

        Returns:
            list: Lista de impressoras
        '''
        return lista_impressoras()
    
    def set_impressora(self, impressora_selecionada: str):
        '''
        Salva o nome da impressora escolhida.
        
        Args:
            impressora_selecionada (string): Nome da impressora selecionada

        Returns:
            None
        '''
        global nome_impressora
        nome_impressora = f"{impressora_selecionada}"


    def get_impressora(self):
        '''
        Retorna o nome da impressora que está salvo por padrão

        Args:
            None
            
        Returns:
            nome_impressora (string): Nome da impressora
        '''
        return nome_impressora

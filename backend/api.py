import json
from backend.config import mesas, taxa_configuracoes, nome_impressora
from backend.mesa import Mesa
from backend.impressao import imprimir_fechamento, imprimir_cozinha, lista_impressoras

class API: 
    def get_tipos_produtos(self):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
        
        tipos = list()

        for tipo in dados:
            tipos.append(tipo)

        return tipos
    
    def get_preco_produto(self, produto, tipo):
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
    
    def get_quantidade_produtos(self, tipo):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        quantidade = 0
        for produto in dados[tipo]:
            quantidade += 1
        
        return quantidade
    
    def get_nome_produto(self, tipo, index):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        produtos = list()
        for produto in dados[tipo]:
            produtos.append(produto)

        return produtos[index]
    
    def get_tipo_produto(self, nome=str().title()):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        for tipo in dados:
            if nome in dados[tipo]:
                return tipo


    def adicionar_produto(self, nome=str(), tipo=str(), preco=float()):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        if not nome.title() in dados[tipo]:
            dados[tipo][nome.title()] = preco
            with open("data/produtos.json", "w", encoding="utf-8") as arquivo:
                json.dump(dados, arquivo, indent=4, ensure_ascii=False)
            return True 
        else:
            return False
        
    def excluir_produto(self, nome=str(), tipo=str()):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
        
        if nome.title() in dados[tipo.title()]:
            del dados[tipo.title()][nome.title()]

        with open("data/produtos.json", "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, indent=4, ensure_ascii=False)

        return None
    
    def adicionar_tipo_produto(self, tipo=str()):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        if not tipo.capitalize() in dados:
            dados[tipo.capitalize()] = {}
            with open('data/produtos.json', 'w', encoding='utf-8') as f:
                json.dump(dados, f, indent=4, ensure_ascii=False)
                
            return True
        else:
            return False
            
    def excluir_tipo_produto(self, tipo=str()):
        with open("data/produtos.json", 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)

        del dados[tipo.title()]
        
        with open('data/produtos.json', 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return None


    def get_comanda_mesa(self, num_mesa):
        '''
        Retorna a comanda de uma mesa específica.

        Args:
            num_mesa (int): Número da mesa(1 a 6)

        Returns:
            comanda (list[dicts]): Lista com [dicionários{"quantidade": "quantidadeDoProduto", "produto": "nomeDoProduto", "preco": "precoDoProduto"}]

        '''

        return mesas[num_mesa - 1].get_comanda()

    def salvar_comanda(self, num_mesa, comanda):
        '''
        Salva os itens na comanda em uma mesa específica.
        
        Args:
            num_mesa (int): Número da mesa(1 a 6)
            comanda (list): Lista com [quantidade, produto, preco]

        Returns:
            None

        '''
        
        mesas[num_mesa - 1].set_comanda(comanda)

    def limpar_comanda_da_mesa(self, num_mesa):
        '''
        Limpa a comanda de uma mesa específica.

        Args:
            num_mesa (int): Número da mesa(1 a 6)

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
    
    def excluir_mesa(self, num_mesa):
        '''
        Exclui uma mesa específica da lista mesas.

        Args:
            num_mesa (int) = Número de uma mesa.
        
        Returns:
            None

        '''

        mesas.pop(num_mesa - 1)

    def get_taxa_configuracoes(self):

        return taxa_configuracoes

    def salvar_taxa_configuracoes(self, taxa=float(), tipo_taxa=str()):
        taxa_configuracoes.clear()

        taxa_configuracoes[tipo_taxa] = taxa

    def imprimir_comanda(self, num_mesa=int, taxa: bool = False, opcao = str):
        if opcao == 'Fechamento':
            print('entrei FECHAMENTO')
            imprimir_fechamento(num_mesa, taxa)
        else:
            print('entrei COZINHA')
            imprimir_cozinha(num_mesa)

    def set_subtotal_comanda(self,num_mesa=int, subtotal=float):
        mesas[num_mesa - 1].set_subtotal(subtotal)

    def get_lista_impressoras(self):
        return lista_impressoras()
    
    def set_impressora(self, impressora_selecionada):

        global nome_impressora
        nome_impressora = f"{impressora_selecionada}"


    def get_impressora(self):
        return nome_impressora

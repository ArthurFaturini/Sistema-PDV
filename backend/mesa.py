class Mesa:
    def __init__(self):
        '''
        Função construtora, que cria uma lista chamada comanda.
        
        Args:
            None

        Returns:
            None
        
        '''

        self.comanda = list()
        self.subtotal = float()
        # [{"quantidade": "quantidadeDoProduto", "produto": "nomeDoProduto", "preco": "precoDoProduto"}]

    def limpar_comanda(self):
        '''
        Limpa a comanda da mesa.
        
        Args:
            None

        Returns:
            None

        '''

        self.comanda.clear()
    
    def get_comanda(self):
        '''
        Retorna a comanda da mesa
        
        Args:
            None

        Returns:
            comanda (list[dicts]): Lista com [dicionários{"quantidade": "quantidadeDoProduto", "produto": "nomeDoProduto", "preco": "precoDoProduto"}]
        
        '''

        return self.comanda

    def set_comanda(self, comanda):
        '''
        Salva a comanda(front) na comanda(back) da mesa.
        
        Args:
            comanda (list): Lista com [quantidade, produto, preco]

        Returns:
            None
        '''

        self.comanda.append({"quantidade": comanda[0], "produto": comanda[1], "preco": comanda[2]})

    def set_subtotal(self, subtotal):
        self.subtotal = subtotal


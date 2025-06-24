class Mesa:
    def __init__(self):
        '''
        Função construtora, que cria uma lista chamada comanda e uma variável do tipo float chamada subtotal.
        
        Args:
            None

        Returns:
            None
        '''

        self.comanda = list()
        self.subtotal = float()
        self.observacoes = ""
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
        Retorna a comanda da mesa.
        
        Args:
            None

        Returns:
            comanda (list[dicts]): Lista com [dicionários{"quantidade": "quantidadeDoProduto", "produto": "nomeDoProduto", "preco": "precoDoProduto"}]
        '''

        return self.comanda

    def set_comanda(self, comanda: list):
        '''
        Salva a comanda(front) na comanda(back) da mesa.
        
        Args:
            comanda (list): Lista com [quantidade, produto, preco]

        Returns:
            None
        '''

        self.comanda.append({"quantidade": comanda[0], "produto": comanda[1], "preco": comanda[2]})

    def set_subtotal(self, subtotal: float):
        '''
        Salva o subtotal(front) no subtotal(back) da mesa.

        Args:
            subtotal (float): Subtotal da mesa
        
        Returns:
            None
        '''
        self.subtotal = subtotal

    def set_observacoes(self, observacao: str):
        self.observacoes = observacao

    def get_observacoes(self):
        return self.observacoes

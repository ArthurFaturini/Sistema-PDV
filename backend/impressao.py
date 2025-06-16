from escpos.printer.win32raw import Win32Raw
from backend.config import mesas, taxa_configuracoes, nome_impressora
import time
import win32print

#QUANTIDADE DE HÍFENS PARA PREENCHER O PAPEL TODO: 48


def lista_impressoras():
    '''
    Retorna a lista de impressoras conectadas ao computador.

    Args:
        None
    Returns:
        impressoras (list): Lista de impressoras
    '''
    impressoras = [printer[2] for printer in win32print.EnumPrinters(2)]

    return impressoras


def imprimir_fechamento(num_mesa: int, taxa: bool = False):
    '''
    Imprimi a comanda de fechamento.

    Args:
        num_mesa (int): Número da mesa(Padrão: 1 a 6).
        taxa (bool): False para não aplicar a taxa, True para aplicar a taxa.
    Returns:
        None
    '''
    data = time.strftime('%d/%m/%Y %H:%M')

    p = Win32Raw(f"{nome_impressora}")

    comanda = mesas[num_mesa - 1].get_comanda()
    subtotal = mesas[num_mesa - 1].subtotal
    porcentagem = subtotal * (list(taxa_configuracoes.values())[0] / 100)

    p.hw("INIT") # Reinicializa a impressora
    p.charcode("CP850") # Garante a codificação para caracteres especiais

    p.set(font='a', bold=True, align='center')
    p.text("Forneria Faturini\n")
    p.text("================================================\n")
    if num_mesa == 0: 
        p.text('P/ VIAGEM!\n')
    else:
        p.text(f'Mesa {num_mesa}\n')
    p.text(f"{data}\n")
    p.text("================================================\n")
    p.set(font='a', bold=False, align='left')
    p.text("ITENS:\n")
    for linha in comanda:
        p.text(f'{linha["quantidade"]}x {linha["produto"]:<36}R${linha["preco"]:7.2f}\n')        
    p.text('\n') #Pulando Linha
    p.text('------------------------------------------------\n')
    p.set(font='a', bold=True, align='center')
    p.text('FECHAMENTO\n')
    p.text('------------------------------------------------\n')
    p.set(font='a', bold=False, align='left')
    p.text(f'Subtotal:                              R${subtotal:7.2f}\n')

    if taxa:
        p.text(f'Taxa de Serviço({list(taxa_configuracoes.values())[0]}%):                R${porcentagem:7.2f}\n')
    p.text('------------------------------------------------\n')

    p.set(font='a', bold=True, align='left', custom_size=True, width=2, height=2)

    if taxa:
        p.text(f'Total:{(subtotal + porcentagem):>18.2f}\n')
    else:
        p.text(f'Total:{(subtotal):>18.2f}\n')

    p.set(font='a', bold=False, align='left', custom_size=False, normal_textsize=True)

    p.text('------------------------------------------------\n')
    p.text('\n')
    p.set(font='a', bold=True, align='center')
    p.text('Agradecemos a preferência! Volte Sempre!\n')
    p.text('\n')
    p.cut()
    p.close()


def imprimir_cozinha(num_mesa: int):
    '''
    Imprimi a comanda da cozinha.

    Args:
        num_mesa (int): Número da mesa(Padrão: 1 a 6).
    Returns:
        None
    '''
    p = Win32Raw(f"{nome_impressora}")

    comanda = mesas[num_mesa - 1].get_comanda()

    p.hw("INIT") # Reinicializa a impressora
    p.charcode("CP850") # Garante a codificação para caracteres especiais

    p.set(font='a', bold=True, align='center', double_height=True)
    p.text("================================================\n")
    p.text('COZINHA\n')
    # A última mesa sempre é a da viagem, ela é criada e excluída durante o processo.
    # Apenas nesse caso terei que usar 0 para "reconhecer" a última mesa. Por padrão/para o código é -1, pois é o último elemento da lista mesas. 
    if num_mesa == 0: 
        p.text('P/ VIAGEM!\n')
    else:
        p.text(f'Mesa {num_mesa}\n')
    p.text("================================================\n")
    p.set(font='a', bold=False, align='left')
    p.text("ITENS:\n")
    for linha in comanda:
        p.text(f'{linha["quantidade"]}x {linha["produto"]:<45}\n')        
    p.text('\n') #Pulando Linha
    p.text('------------------------------------------------\n')
    p.set(font='a', bold=False, align='left', double_height=False, normal_textsize=True)
    p.cut()
    p.close()

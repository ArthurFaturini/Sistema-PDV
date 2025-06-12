# 🧾 Sistema PDV - Forneria Faturini

Este é um sistema de Ponto de Venda (PDV) desenvolvido sob medida para a pizzaria **Forneria Faturini**. 
O sistema permite realizar anotações e gerenciamento de comandas, organização de mesas, impressão para cozinha e fechamento, além de oferecer flexibilidade na configuração de taxas e impressoras.

🔒 Este sistema foi desenvolvido para rodar **localmente em ambientes Windows**, com foco em uso direto no ponto de venda.

---

## 🧠 Funcionalidades Principais

- 📋 **Anotação de Comandas**  
- 🖨️ **Impressão de comandas** (cozinha e fechamento)  
- 🧾 **Gerenciamento de produtos e categorias** (inclusão e exclusão)  
- 🍽️ **Gerenciamento de mesas** (criação e remoção)  
- 💲 **Configuração de taxas** (acréscimos e decréscimos configuráveis, como taxa de serviço de 10%)  
- 🖨️ **Configuração de impressoras** 

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Python  
- **Armazenamento:** Arquivos locais (presumido na pasta `data/`)  
- **IDE sugerida:** JetBrains PyCharm ou Visual Studio Code

---

## 📁 Estrutura do Projeto

```text
Sistema-PDV/
├── backend/       # Lógica do servidor e impressão
├── frontend/      # Interface gráfica (HTML/CSS/JS)
├── data/          # Armazenamento de dados
└── main           # Arquivo principal para iniciar o sistema
```

---

## 🚀 Como Executar o Projeto

1. **Requisitos**
    - Python 3.10 ou superior
    - Sistema operacional: Windows (necessário para integração com impressoras)

2. **Clone o repositório:**
```bash
git clone https://github.com/ArthurFaturini/Sistema-PDV.git
cd Sistema-PDV
```

3. **Certifique-se de ter o Python instalado**
Recomenda-se o uso de ambiente virtual.

4. **Instale as dependências**
```bash
pip install -r requirements.txt
```

5. **Execute o Projeto**
```bash
python main.py
```

---

## 📌 Notas Importantes

- A escolha da impressora é feita via interface gráfica pelo próprio usuário.

- O sistema foi desenhado para uso local, com foco em agilidade e simplicidade para o ambiente de um restaurante/pizzaria.

---

## 📅 Atualizações Futuras (planejadas)

- ⚙️ Configuração de texto para impressão
- ✅ Notificação de ação concluída
- 🎨 Mais cores de estilização
- ✏️ Escrever observações sobre os pedidos
- 👨🏻‍💻 Criar um executável do projeto

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor
**Arthur Faturini**
GitHub: [@ArthurFaturini](https://github.com/ArthurFaturini)

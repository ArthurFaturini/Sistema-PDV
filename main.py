import webview
from backend.api import API

def main():
    '''
    Função principal que inicia o código.

    Args:
        None
    
    Returns:
        None
    '''
    api = API() 
    webview.create_window("PDV", "frontend/index.html", js_api=api, maximized=True)
    webview.start(debug=True)

if __name__ == "__main__":
    main()
    
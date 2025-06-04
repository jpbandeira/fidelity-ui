# Utils links

- https://medium.com/@filipefilpe/reactjs-consumo-de-apis-com-axios-a21247749301
- https://javascript.info/import-export
- https://github.com/gin-contrib/cors
- https://react-icons.github.io/react-icons/

# Designe Login com google
- https://chatgpt.com/share/683b4c11-57f0-800a-8570-dacdaf118c4c

# Tela de login
- Mudar caixa de login para exibir primeiro o input de email DONE
- Verificar se usuário está cadastro DONE
    - Caso esteja: 
        - Exibir botão para login com google(pensar se permite ou não. Pode servir para atualização de token refresh, fazendo um patch para atualizar somente esse campo) ou com senha(sem integração com google) DONE
    - Caso não esteja: 
        - Pedir informações de cadastro (email, senha(explicar que se trata da senha do sistema e n da google), nome, telefone)
        - Obrigar o usuário a fazer login com google pela primeira vez para ter tokens da google
    
- Frontend decide se vai madar para login com oauth google ou login da plataforma
- Backend recebe requisição login da google
    - Processo tokens
    - Verifica se email tem cadastro mesmo
    - Salva tokens no banco
    - Redireciona para tela de cliente salvando o usuário na session
- Login da plataforma segue normal como já existe hoje
    



    
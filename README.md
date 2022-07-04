# Avaliação do 1º Bimestre de Integração de Sistemas de Software

Ao realizar o clone do repositório, basta executar:

`docker compose up -d`

E esperar os contêineres serem iniciados, sendo o container  *rabbitmq* o mais demorado.

Após todos iniciarem corretamente, acesse o endereço:

[http://localhost:15672/](http://localhost:15672/ "http://localhost:15672/")

Utilizando as credenciais:
- User: admin
- Password: admin

Para uma melhor visualização do message broker.


------------
## Rotas das Api A (localhost:3000):
`Get: "/"`
> Rota **default** da aplicação

`Post "/folha/cadastrar"`
> Rota para cadastar uma folha de pagamento

`Get "/folha/listar"`
> Rota para listar todas as folhas de pagamento

`Put "/folha/alterar/:id"`
> Rota para alterar uma folha de pagamento utilizando seu **id**

`Delete "/folha/deletar/:id"`
> Rota para apagar uma folha de pagamento utilizando seu **id**

`Get : "/teste" `
> Para testar a conexão com a Api B

`Get "/folha/calcular"`
> Para enviar as folhas de pagamento para processamento


------------
## Rotas das Api B (localhost:3001):
`Get: "/"`
> Rota **default** da aplicação

`Get "/teste"`
> Rota que a API A utiliza para testar a conexão

`Get "/folha/listar"`
> Rota para processar a listar as folhas de pagamento da fila

`Put "/folha/consultar/:cpf/:mes/:ano"`
> Rota para listar uma folha de pagamento que contém os dados **cpf**, **mes** e **ano** informados através dos parâmetros da rota

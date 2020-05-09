# Documentação mais incrível da humanidade

## Essa documentação é focada na API, recomendo criar um arquivo semelhante na pasta de front-end

### Criação de Usuário

* Formatação do JSON - Esse um exemplo de JSON para criar um usuário
```
{
   "name":"João da Silva",
   "phone":"8512345678",
   "email":"teste1@uol.com",
   "cpf":"4328938439",
   "birthday":"1997-06-10",
   "password":"123456",
   "role":"pesquisador",
   "extra":{
      "institution": "FIOCRUZ"
   }
}
```

A maioria desses campos são autoexplicativos. Telefone e CPF devem ser sem símbolos, apenas os números. A data de nascimento é da forma YYYY-MM-DD. A senha, por enquanto, vai via plain text até o servidor, onde então é hasheada, isso vai mudar no futuro por questões óbivas de segurança. O atributo "role" é o tipo de usuário, os tipos disponíveis de usuário são:

* aluno
* pesquisador
* diretor
* professor
* administrador
* jovem_ace
* profissional_saude
* profissional_educacao

O campo "extra" é onde são colocados os atributos que dependem do tipo de usuário. No exemplo acima, temos um pesquisador, logo, dentro do campo "extras", deve haver a "institution". Os campos dependentes são os seguintes, por tipo de entidade:

* aluno

address_city, address_neighborhood, address_zip, address_number, authorized

* pesquisador

institution

* diretor

SEM CAMPOS ADICIONAIS

* professor

SEM CAMPOS ADICIONAIS

* administrador

SEM CAMPOS ADICIONAIS

* jovem_ace

distrito_sanitario

* profissional_saude

institution

* profissional_educacao

institution

No caso de "roles" que não tem campos adicionais, como professor, recomenda-se que o campo "extras" seja enviado vazio para evitar problemas com a API.

### Alteração de Usuários

As rotas com método PUT para a rota na forma /ENTIDADE/ID atualizam as informações daquela entidade. Por exemplo, se você quiser alterar o pesquisador com ID=4, mande um PUT para /pesquisador/4. 

Os possíveis retornos são:

* Código 401 "Usuário não logado" - Caso a requisição seja feita sem um usuário logado.
* Código 200 "Ok" - Caso operação seja bem sucedida
* Código 401 "Usuário não autorizado para essa transação" - De acordo com o documento de requisitos, apenas um administrador ou o dono daquela informação tem o poder de alterá-la. Se a requisição for feita por um usuário sem permissões, esse código é retornado.
* Código 400 - Mensagem default para outros erros.

### Exclusão de Usuários

Rota /ENTIDADE/ID com método DELETE. Ex: DELETE /aluno/2

Retornos possíveis:

* Código 401 "Usuário não logado" - Já explicado acima
* Código 200 "Ok"
* Código 401 "Usuário não é administrador" - Apenas administradores podem deletar entidades
* Código 400 - Erro genérico



## Códigos de Erro

### Login

O JSON de login é da seguinte forma:
```
   {
      "email":"[email]",
      "password":"[senha]"
   }
```
Um login bem sucedido redireciona para /users (temporariamente)

Um login mal sucedido, seja por email não encontrado ou senha errada redireciona para /

### Cadastro

O JSON de cadastro se encontra acima. Essa seção é só para erros.

* Email inválido

Um email inválido retorna status 400 Bad Request e mensagem "Validation error: Validation isEmail on email failed"

* CPF ou email já cadastrados

No caso do CPF ou email já estarem no DB, status 400 Bad Request é retornado e mensagem "CPF ou email já registrados" é retornada.

* Telefone inválido

A API aceita telefones com 10 ou 11 caracteres, ou seja, 2 dígitos de DDD + número com 8 ou 9 dígitos. No caso de telefone inválido, o status 400 Bad Request é retornado junto com a mensagem "Validation error: Validation len on phone failed"

* CPF inválido

Caso o tamanho do CPF seja diferente de 11 dígitos, a API retorna status 400 Bad Request e mensagem "Validation error: Validation len on cpf failed"

## Recuperação de senha

Para recuperar a senha a rota '/user/passwordRecovery' com método POST e corpo da requisição apenas com email é usado. Por exemplo:
```
   {
      "email": "joaodasilva@example.com"
   }
```
Caso o email não seja encontrado, a API retorna código 400 com mensagem de email não encontrado.
Do contrário, um email é enviado para o usuário. Caso o envio do email falhe, a API retorna código 500 com mensagem de erro da biblioteca usada para enviar o email. Caso o envio seja bem sucedido, código 200 é retornado com o email para o qual a mensagem foi enviada. Caso haja um erro interno do DB, código 500 é retornado e API informa que não foi possível atualizar o token de senha e data de expiração.

Uma vez que o usuário clique no link recebido (que funciona por 1 hora) a rota usada é '/user/:id/reset/:token' com método GET. 

A API procura o email do usuário no DB e retorna 400 com mensagem "Email não encontrado", em seguida, a API verifica a vaidade do token, caso tenha expirado, código 404 com mensagem "Token expirado" é retornada. Se o token for válido e o email existir, a API tenta atualizar a senha. Em caso de sucesso, código 200 é retornado. Em caso de falha, código 500 é retornado.

ATENÇÃO: Atualmente, a nova senha é 'hard coded' para fins de teste. Uma vez o front end tiver um form de redefinição de senha, o código será alterado para puxar a nova senha do form.
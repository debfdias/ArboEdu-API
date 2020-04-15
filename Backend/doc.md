# Documentação mais incrível da humanidade

### Essa documentação é focada na API, recomendo criar um arquivo semelhante na pasta de front-end

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

### Códigos de Erro

#### Login

O JSON de login é da seguinte forma:
```
   {
      "email":"[email]",
      "password":"[senha]"
   }
```
Um login bem sucedido retorna status 200 OK e mensagem "Logged in".

Um login mal sucedido, seja por email não encontrado ou senha errada retorna status 404 Not Found e mensagem "Password or email not found".

#### Cadastro

O JSON de cadastro se encontra acima. Essa seção é só para erros.

* Email inválido

Um email inválido retorna status 400 Bad Request e mensagem "Validation error: Validation isEmail on email failed"

* CPF ou email já cadastrados

No caso do CPF ou email já estarem no DB, status 400 Bad Request é retornado e mensagem "CPF ou email já registrados" é retornada.

* Telefone inválido

A API aceita telefones com 10 ou 11 caracteres, ou seja, 2 dígitos de DDD + número com 8 ou 9 dígitos. No caso de telefone inválido, o status 400 Bad Request é retornado junto com a mensagem "Validation error: Validation len on phone failed"

* CPF inválido

Caso o tamanho do CPF seja diferente de 11 dígitos, a API retorna status 400 Bad Request e mensagem "Validation error: Validation len on cpf failed"
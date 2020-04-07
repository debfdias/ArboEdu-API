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
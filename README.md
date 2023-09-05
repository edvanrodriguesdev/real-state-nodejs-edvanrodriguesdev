## Descrição
Uma aplicação de gerenciamento dos serviços de uma imobiliária, no qual deverá ser possível realizar o cadastro de imóveis e de usuários interessados na aquisição de propriedades. Além disso, deverá ser possível realizar o agendamento e consultar horários de visitas às propriedades disponíveis no banco de dados da imobiliária.

## Sobre

O Real State é um projeto Back-end, desenvolvido com a finalidade de garantir segurança e desempenho, utilizando as tecnologias:
- Node.js + Express
- TypeScript
- TypeORM
- PostgreSQL
- Utilização de libs como:  
1. JWT (Json Web Token) para garantir a segurança da aplicação
2. Zod para garantir serialização dos dados
3. Express Async Errors para realizar as tratativas de erros da aplicação e garantir o desempenho do servidor

## Iniciar o projeto
1. Realize o clone do repositório.
2. Faça a instalação das dependências do projeto, digitando: npm install (caso utilize outro, verificar comando).
3. Deve-se criar o arquivo .env e seguir o modelo do arquivo .env.example para fazer a conexão com o banco de dados.
4. Será necessário realizar as migrações (generate e run) para que sejam criadas as tabelas no seu banco de dados. Digite no terminal do VsCode: 4.1. Para criar a migração: npm run typeorm migration:generate -- -d src/data-source src/migrations/nomeEscolhido 4.2. Para executar a migration e criar no Banco de Dados: npm run typeorm migration:run -- -d src/data-source
5. Caso deseje, você pode verificar no DBeaver (ou similar) ou no psql se as tabelas foram criadas.
6. Para rodar o projeto, digite: npm run dev (caso utilize outro, verificar comando)

## EndPoints do projeto

|N | Método HTTP| Endpoint                   | Autenticação                           | Descrição da Rota                       |
|- | ---------- | -------------------------- | -------------------------------------- | --------------------------------------- |
|1 | POST       | /login                     | Rota livre (sem Token)                 | Faz o login e gera o Token do usuário   |
|2 | POST       | /users                     | Rota livre (sem Token)                 | Criação de usuário                      |
|3 | GET        | /users                     | Token obrigatório e ser admin          | Lista todos os usuários                 |
|4 | PATCH      | /users/:id                 | Token obrigatório e ser admin          | Atualiza os dados do usuário            |
|5 | DELETE     | /users/:id                 | Token obrigatório e ser admin          | Deleta o usuário                        |
|6 | POST       | /categories                | Token obrigatório e ser admin          | Criação de categoria                    |
|7 | GET        | /categories                | Rota livre                             | Lista todas as categorias criadas       |
|8 | GET        | /categories/:id/realEstate | Token obrigatório e ser admin          | Lista os imóveis por categoria          |
|9 | POST       | /realEstate                | Token obrigatório e ser o proprietário | Criação de um imóvel                    |
|10| GET        | /realEstate                | Rota livre                             | Lista todos os imóveis                  |
|11| POST       | /schedules                 | Token obrigatório                      | Agenda uma visita a um imóvel           |
|12| GET        | /schedules/realEstate/:id  | Token obrigatório e ser admin          | lista todos os agendamentos do imóvel   |

## Detalhes dos EndPoints

1. /login (POST)
Body: Text Format - JSON
Auth Types: No Authentication

Requisição: 
{
	"email": "Insira o e-mail"
	"password": "Insira a senha" 
}

Resposta:
200 - Sucesso
{
	"token": "valor do Token"
}

##

2. /users (POST)
Body: Text Format - JSON
Auth Types: No Authentication

Requisição:
{
	"name": "Insira o nome completo, máximo de 80 caracteres e string",
	"email": "Insira o e-mail, máximo de 50 caracteres e string",
	"password": "Insira sua senha e string"
}

Resposta:
200 - Sucesso
	{
		"id": "Id gerado em uuid",
		"name": "Nome completo",
		"email": "email",
		"createdAt": "Data da criação da conta"
	}

Caso esteja faltando algum dado obrigatório,
400 - Bad Request
{
    "message": "Informação do que está pendente"
}

Caso o e-mail cadastrado já exista,
409 - Conflit
{
	"message": "email already exists"
}

##

3. /users (GET)
Body: No Body
Auth Types: Bearer Token
Resposta: 
200 - Sucesso
[
	{
		"id": "Id gerado de forma sequencial",
		"name": "Nome completo",
		"email": "email",
		"createdAt": "Data da criação da conta"
	},
	{
		"id": "Id gerado de forma sequencial",
		"name": "Nome completo",
		"email": "email",
		"createdAt": "Data da criação da conta"
	},
]

##

4. /users/:id (PATCH)
Body: Text Format - JSON
Auth Types: Bearer Token
Requisição:
{
    "campo(s)": "alteração"
}
Exemplo:
{
    "name": "Nome"
}
Resposta:
200 - Sucesso
{
		"id": "Id gerado de forma sequencial",
		"name": "Nome completo",
		"email": "email",
		"createdAt": "Data da criação da conta"
}

Caso esteja faltando algum dado obrigatório,
400 - Bad Request
{
    "message": "Informação do que está pendente"
}

Caso o id não seja encontrado
404 - Not Found
{
    "message": "user not found"
}

Caso o e-mail cadastrado já exista,
409 - Conflit
{
	"message": "email already exists"
}

##

5. /users (DELETE)
Body: No Body
Auth Types: Bearer Token
Resposta:
Em caso de sucesso
204 - No Content

Caso o id não seja encontrado
404 - Not Found
{
    "message": "user not found"
}

##

6. /categories (POST)
Body: Text Format - JSON
Auth Types: Bearer Token
Requisição:
{
"name": "Casas Populares"
}

Resposta:
200 - Sucesso
{
		"id": "Id gerado de forma sequencial",
		"name": "Nome da Categoria criada",
}

##

7. /categories (GET)
Body: Text Format - JSON
Auth Types: No Authentication
Resposta: 
200 - Sucesso
[
	{
		"id": "Id gerado de forma sequencial",
		"name": "Nome da Categoria criada",
	},
	{
		"id": "Id gerado de forma sequencial",
		"name": "Nome da Categoria criada",
	},
]

##

8. /categories/:id/realEstate (GET)
Body: Text Format - JSON
Auth Types: Bearer Token
Resposta: 
200 - Sucesso
[
  {
    "id": "Id gerado de forma sequencial",
    "sold": "Boleano que informa se o imóvel está vendida",
    "value": "Valor do imóvel",
    "size": "Tamanho do imóvel em m²",
    "createdAt": "Data da criação do imóvel no sistema",
    "updatedAt": "Data da atualização do imóvel no sistema",
    "adress": {
                 "id": "Id gerado de forma sequencial",
                 "street": "Nome da rua",
                 "zipCode": "CEP",
                 "number": "Número do imóvel",
                 "city": "Cidade do imóvel",
                 "state": "Estado em que está localizado o imóvel"
               },
     "categories": {
                    	"id": "Id gerado de forma sequencial",
		                  "name": "Nome da Categoria criada",
                    },
     "schedules": {
                      "id": "Id gerado de forma sequencial",
                      "date": "Data do agendamento",
                      "hour": "Horário do agendamento",
                      "user": "Nome do usuário vinculado ao agendamento"
                    }

  },
]

##

9. /realEstate (POST)
Body: Text Format - JSON
Auth Types: Bearer Token
Requisição:
{
  "value": "Valor do imóvel",
  "size": "Tamanho do imóvel em m²",
  "address": {
                 "street": "Nome da rua",
                 "zipCode": "CEP",
                 "number": "Número do imóvel",
                 "city": "Cidade do imóvel",
                 "state": "Estado em que está localizado o imóvel"
    },
   "category": {
      "name": "Nome da Categoria",
    },
}

Resposta:
200 - Sucesso
{
  "id": "Id gerado de forma sequencial",
  "value": "Valor do imóvel",
  "size": "Tamanho do imóvel em m²",
  "address": {
                 "id": "Id gerado de forma sequencial",
                 "street": "Nome da rua",
                 "zipCode": "CEP",
                 "number": "Número do imóvel",
                 "city": "Cidade do imóvel",
                 "state": "Estado em que está localizado o imóvel"
    },
   "category": {
      "name": "Nome da Categoria",
    },
}

##

10. /realEstate (GET)
Body: No Body
Auth Types: No Authentication
Resposta: 
200 - Sucesso
[
    {
      "value": "Valor do imóvel",
      "size": "Tamanho do imóvel em m²",
      "address": {
                 "street": "Nome da rua",
                 "zipCode": "CEP",
                 "number": "Número do imóvel",
                 "city": "Cidade do imóvel",
                 "state": "Estado em que está localizado o imóvel"
    },
     "category": {
        "name": "Nome da Categoria",
    },
    
    "createdAt": "Data da criação do imóvel",
    "updatedAt": "Data de atualização do imóvel",
  }
]

##

11. /schedules (POST)
Body: Text Format - JSON
Auth Types: Bearer Token
Requisição:
{
    "date": "Data do agendamento",
    "hour": "Horário do agendamento",
}

Resposta: 
200 - Sucesso
{
      "id": "Id gerado de forma sequencial",
      "date": "Data do agendamento",
      "hour": "Horário do agendamento",
      "user": "Nome do usuário vinculado ao agendamento"
}

##

12. /schedules/realEstate/:id (GET)
Body: No Body
Auth Types: Bearer Token
Resposta: 
200 - Sucesso
  {
    "id": "Id gerado de forma sequencial",
    "sold": "Boleano que informa se o imóvel está vendida",
    "value": "Valor do imóvel",
    "size": "Tamanho do imóvel em m²",
    "createdAt": "Data da criação do imóvel no sistema",
    "updatedAt": "Data da atualização do imóvel no sistema",
    "adress": {
                 "id": "Id gerado de forma sequencial",
                 "street": "Nome da rua",
                 "zipCode": "CEP",
                 "number": "Número do imóvel",
                 "city": "Cidade do imóvel",
                 "state": "Estado em que está localizado o imóvel"
               },
     "categories": {
                    	"id": "Id gerado de forma sequencial",
		                  "name": "Nome da Categoria criada",
                    },
     "schedules": {
                      "id": "Id gerado de forma sequencial",
                      "date": "Data do agendamento",
                      "hour": "Horário do agendamento",
                      "user": "Nome do usuário vinculado ao agendamento"
                    }

  },

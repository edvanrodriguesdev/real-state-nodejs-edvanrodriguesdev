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

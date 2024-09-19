NEST JS
TypeORM setup

docker-compose up -d
(sub services, prima proprietate este denumirea containerului, in docker apare cu -1 dupa denumire)
(primul port este cel expus in host iar al doilea este cel din container, al doilea trebuie sa fie mereu 5432[default postgres])


npm install @nestjs/typeorm typeorm pg


In app.module.ts adauga configuratia pentru conectare la postgres cu datele adaugate anterior in docker-compose.yml

(synchronize: true makes sure entities will be synced with the DB every time you run the app; NEVER forget entities)



nest g module/controller/service profiles --no-spec
nest g resource profile (creates all)



Entities are used in server-DB interactions
DTO’s are used in client-server interactions
Use DTOs:
When handling incoming or outgoing data (e.g., HTTP requests and responses).
When you need to validate or transform data before processing it.
When you want to decouple your internal entities from external data formats.
Use Entities:
When interacting with the database (e.g., saving, retrieving, updating records).
To define the schema of your database and manage relationships between different tables.
testRepository.save/
Entity manager (all entities) VS Repository (specific entity, custom query)

Using cascade options will save the other entity as well when using the primary( when saving Photo)

DTOs
Create a folder inside the module folder called dto
create a auth.dto.ts and export AuthDto class after adding validation
create a index.ts and inside export * from ‘./auth.dto’
import AuthDto where it is needed

(if you add validation to DTO’s, add the validation pipe to main.ts and i class-validator/class-transformer)
(whitelist: true, removes unwanted data)


FORM DATA
	UseInterceptors for form data because nest expects JSON when using the @Body decorator, form is sending multipart/form-data

TYPE ORM
	If there are nullable fields in the entity, add the nullable: 
true props to the @Column object 

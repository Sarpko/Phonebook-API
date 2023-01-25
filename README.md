# mobilist-phonebook

A phonebook api which users can register and login. After that users can add-delete-update-list and search persons in their guides.

## Setup

```
npm install
npm start
```

## Usage

You need to register to create a user then check your mailbox to verify your account. After that you can login with your account to use API.


ExampleUser.JSON:

```
{
  "username": "sarp",
  "email": "sarp@hotmail.com",
  "password" :"123"
}
```

### To register and login

| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /phonebook/api/v1/register | `POST` | ExampleUser.JSON | To register. |
| /phonebook/api/v1/login | `POST` | ExampleUser.JSON | To login. |

### Using the API

ExamplePerson.JSON:

```
{
  "userId": "phoneOwnerID", > It returns after login. You need to add this for all queries.
  "firstname": "sarp",
  "surname" : "koç",
  "company": "sarp company",
  "phoneNumbers": ["0555 555 55 55"] > It must be an array. You can add multiple phone numbers.
}
```

#### Important!
Api uses JWT to access endpoints. Do not forget to add x-access-token to header. It returns on body after login.

| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /phonebook/api/v1/addPerson | `POST` | ExamplePerson.JSON | Create a new person in your phonebook. |
| /phonebook/api/v1/listPersons | `GET` | { "userId": "phoneOwnerID" } | List all persons in your phonebook. Also it returns person Ids |
| /phonebook/api/v1/findPerson | `GET` | userId is mandatory, the rest is optional exp:{ "userId": "phoneOwnerID", "firstname": "sa"} | Find persons for conditions|
| /phonebook/api/v1/deletePerson | `DELETE` | { "userId": "phoneOwnerID", "id":"id" } | Create a new person in your phonebook. Can get the person id from listPersons or findPerson |
| /phonebook/api/v1/updatePerson | `PUT` | userId and id are mandatory, the rest is optional exp:{ "userId": "phoneOwnerID", "id":"id", "firstname": "mehmet"} | Update a person |












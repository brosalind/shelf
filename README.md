# Shelf API Documentation

## Endpoints:

List of available endpoints: 
- POST /register
- POST /login
- GET /discussion

Require authentication:
- POST /shelf
- GET /shelf
- DELETE /shelf
- GET /shelf

- PUT /user
- GET /discussion

- POST /notes



## 1. POST /register
Description:
- Generate a web token when register is successful

Request:
- body:
```js
{
  "email" : "string",
  "password": "string",
  "name": "string"
}
```
Response (201 - Created):
```js
{ "access_token": "string",
  "id": "integer",
  "email": "string",
  "name": "string"
  "picture": "string"
}
```
Response (400 - Bad Request)
```js
{
  "message": "Name is required"
}
OR
{"message": "Email is required"}
OR 
{"message": "(email) is not a valid email"}
OR 
{"message": "Password is required"}
OR
{"message": "Role is required"}
```


## 2. POST /login
Description:
- Generate a web token when login is successful

Request:
- body:
```js
{
  "email": "string",
  "password": "string"
}
```
Response (200 - OK):
```js
{
  "access_token": "string"
  "email": "string",
  "role": "string",
  "name": "string"
  "picture": "string"
}
```
Response (400 - Bad Request)
```js
{
  "message": "Please input your email."
}
OR
{
  "message": "Please input your password."
}
OR
{
  "message": "Invalid user. Please register first or make sure your login details are correct."
}
OR
{
  "message": "Incorrect password. Please try again."
}
```


## 3. POST /shelf
Description:
- Add a new book to shelf database

Request:
- body:
```js
{
  "title": "string", 
  "author": "string", 
  "pageCount": "number", 
  "description": "string", 
  "cover": "string", 
  "genre": "string", 
  "isbn": "string"
}

```
- user: 
```js
{"id": "object"}
```
Response (201 - Created):
```js
{  
  "title": "string", 
  "author": "string", 
  "pageCount": "number", 
  "description": "string", 
  "cover": "string", 
  "genre": "string", 
  "isbn": "string"
  "status": "string"
  "user": "string",
  "_id": "string",
  "__v": "number"
}
```
Response (400 - Bad Request)
```js
{
  "message": "Title is required"
}
OR
{"message": "Description is required"}

```

## 4. GET /shelf
Description:
- Get a specific user's shelf data

Request:
- user: 
```js
{"id": "object"}
```
Response (200 - OK):
```js
[
  {  
    "_id": "string"
  "title": "string", 
  "author": "string", 
  "pageCount": "number", 
  "description": "string", 
  "cover": "string", 
  "genre": "string", 
  "isbn": "string"
  "status": "string"
  "user": "string",
  "__v": "number"
  }
  ...
]
```

## 5 DELETE /shelf
Description:
- Delete a book from a user's shelf
Request:
- body: 
```js
{"id": "string"}
```
RESPONSE (200-OK)
```js
{"message": "(book title) was successfully deleted."}
```
RESPONSE (404-ERROR NOT FOUND)
```js
{"message": "(book title) was successfully deleted."}
```



## 6 GET /shelf
Description:
- Get a specific book's detail 
Request:
- body: 
```js
{"id": "string"}
```
Response (200 - OK):
```js
[
  {  
    "_id": "string"
  "title": "string", 
  "author": "string", 
  "pageCount": "number", 
  "description": "string", 
  "cover": "string", 
  "genre": "string", 
  "isbn": "string"
  "status": "string"
  "user": "string",
  "__v": "number"
  }
]
```
RESPONSE (404 - ERROR NOT FOUND)
```js
{"message": "What you're looking for does not exist."}
```

## 7 PUT /user
Description:
- Update a user data
Request:
- body: 
```js
{"name": "string",
"pic": "string"}
```
RESPONSE (200-OK)
```js
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "__v": "number",
    "pic": "string"
}
```

## 8 GET /discussion
Description: 
- Get discussion based on specified id

Request:
- query:
```js
{ "id": "string" }
```
RESPONSE (200 - OK)
```js
[
  { "_id":"string",
  "sender": {
    "__v": "number",
    "__id": "string",
    "email": "string",
    "name": "string",
    "password": "string",
    "pic": "string",
    "role": "user",
  }
  "content": "string",
  "discussion": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "__v": "number"
  }
  ...
]

```

## 9. POST /notes
Description:
- Create a new note

Request:
- body:
```js
{
  "title" : "string",
  "text": "string",
  "book": "string"
}
```
Response (201 - Created):
```js
{ "_id": "string",
  "title": "string",
  "note": "string",
  "book": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "__v": "number"
}
```
Response (400 - Bad Request):
```js
{ "message": "Title is required" }
OR
{ "message": "Text is required" }
```




## Global Error
RESPONSE (401 - No authentication)
```js
{"message": "Please login first."}
```
RESPONSE (404 - ERROR NOT FOUND)
```js
{"message": "What you're looking for does not exist."}
```
Response (500 - Internal Server Error)
```js
{
  "message": "Something happened. Please try again later."
}
```

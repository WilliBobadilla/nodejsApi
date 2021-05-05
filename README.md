# Node Rest API example :rocket:

A basic node app to show the implementation of a Rest API with a basic CRUD for data about animals :dog:

## Requirements :books:

1. Have installed [node.js](https://nodejs.org/en/)

## Intructions to run the project :dvd:

1. Clone the repository

```bash
git clone https://github.com/WilliBobadilla/nodejsApi
```

2. Enter in the folder

```bash
cd nodejsApi
```

3. Install dependencies

```bash
npm install
```

4. Run the server

```bash
npm start
```

It will launch a local server in [localhost:3000](http://localhost:3000)

# Data stored :floppy_disk:

This CRUD is about animals in a vet, all the information is stored in the DB with the following schema

### Animals

- id: Integer (PK)
- name: String
- age: Integer
- type: Integer
- direction: String

## User

- id: Integer(PK)
- name: String
- lastName: String
- phoneNumber: String
- idNumber: String
- email: String
- password: String
- direction: String

# EndPoints of the API :page_with_curl:

## User endpoints

1. Create User

   - HTTP Method: POST
   - Authorization: NOT REQUIRED
   - URL: http://localhost:3000/v1/user/
   - Body Parameters:
     - name: String
     - lastName: String
     - phoneNumber: String
     - idNumber: String
     - email: String
     - password: String
     - direction: String
       ```JS
       //example data for body:
       {
         "name":"Williams",
         "lastName":"Bobadilla",
         "phoneNumber":"0979874",
         "idNumber":"999999",
         "email":"willi1997.1@gmail.com",
         "password":"admin321",
         "direction":"San antonio"
       }
       ```

2. Login with your User

   - HTTP Method: POST
   - Authorization: NOT REQUIRED
   - URL: http://localhost:3000/v1/user/login
   - Body Parameters:

     - email: String
     - password: String

       ```JS
        //example data for body:
        {
          "email":"willi1997.1@gmail.com",
          "password":"admin321"
        }
       ```

   - Response example:
     ```JS
      {
        "user": {
          "id": 1,
          "name": "Williams",
          "lastName": "Bobadilla",
          "phoneNumber": "0979874",
          "idNumber": "999999",
          "email": "willi1997.1@gmail.com",
          "password": "admin321",
          "direction": "San antonio",
          "createdAt": "2021-05-04T16:59:44.866Z",
          "updatedAt": "2021-05-04T16:59:44.866Z"
            },
            "token":    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxsaTE5OTcuMUBnbWFpbC5jb20iLCJpYXQiOjE2MjAxNDc1ODcsImV4cCI6MTYyMDE0NzU4N30.xhG5tZAgeZ5Q1IpLFVdFKJj1FTh9pXGzeLMdR_snYtI"
      }
     ```

Note: In this point, all the requests to the Animal endpoints and User endpoints have to have the **Authorization** parameter in header of the request, this authorization parameter is the **token** in the response of the login!

3. Update User

   - HTTP Method: PUT
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/user/
   - Body Parameters:

     - name: String
     - lastName: String
     - phoneNumber: String
     - idNumber: String
     - email: String
     - password: String
     - direction: String

       ```JS
       //example data for body:
       {
        "name":"Williams",
        "lastName":"Bobadilla",
        "phoneNumber":"777777",
        "idNumber":"123654789",
        "email":"willi1997.1@gmail.com",
        "password":"admin321",
        "direction":"San Roque"

        }
       ```

4. Delete User

   - HTTP Method: DELETE
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/user/{id}
   - Body response example:
     ```JS
        {
            "msg": "Deleted successully",
            "id": "1"
        }
     ```

Important Note: Is not implemented yet the verification of who is deleting the user account, so for now, whatever user can delete whatever account! In this case we have to filter just if the user is deleting his own account!

## Animal endpoints

1. Create Animal

   - HTTP Method: POST
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/animals/
   - Body Parameters:

     - name: String
     - age: Integer
     - type: Integer
     - direction: String

       ```JS
       //example data for body:
       {
          "name":"Pinkie",
          "age":10,
          "type":0,
          "direction":"Fossati y Palma, San Antonio"
       }
       ```

2. List animals

   - HTTP Method: GET
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/animals
   - Body response example:

     ```JS
     //example of request response:
     [ {
        "id":1
        "name":"Pinkie",
        "age":10,
        "type":0,
        "direction":"Fossati y Palma, San Antonio",
        "createdAt": "2021-04-30T23:03:07.837Z",
        "updatedAt": "2021-04-30T23:03:07.837Z"
      },
      {
        "id":2
        "name":"Dobbie",
        "age":3,
        "type":1,
        "direction":"Bartolome mitre, San Lorenzo",
        "createdAt": "2021-04-30T23:04:08.837Z",
        "updatedAt": "2021-04-30T23:04:08.837Z"
      }
     ]
     ```

3. Get an animal

   - HTTP Method: GET
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/animals/{id}
   - Body response example:

     ```JS
     {
        "id": 1,
        "name": "Blanquie",
        "age": 12,
        "type": 1,
        "direction": "San Francisco",
        "createdAt": "2021-04-30T23:03:07.837Z",
        "updatedAt": "2021-04-30T23:03:07.837Z"
     }
     ```

4. Update an animal

   - HTTP Method: PUT
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/animals/{id}
   - Body Parameters:

     - name: String
     - age: Integer
     - type: Integer
     - direction: String

       ```JS
       //example data for body:
       {
           "name":"Pinkie",
           "age":11,
           "type":0,
           "direction":"Fossati y Palma, San Antonio"
       }
       ```

5. Delete an animal
   - HTTP Method: DELETE
   - Authorization: REQUIRED
   - URL: http://localhost:3000/v1/animals/{id}
   - Body response example:
     ```JS
         {
             "msg": "Deleted successully",
             "id": "1"
         }
     ```

# Notes-To Do :clipboard:

1. Now all users can delete to another user, so we have to add a role and also the validations for that
2. Add encription for password storage

# License :page_facing_up:

Copyright 2021 Williams Bobadilla

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

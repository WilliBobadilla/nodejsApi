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

# EndPoints of the API :page_with_curl:

1. Create Animal

   - HTTP Method: POST
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
   - URL: http://localhost:3000/v1/animals
   - Body response example:
     ```JS
     //example of request response:
     [{
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
   - URL: http://localhost:3000/v1/animals/{id}
   - Body response example:
     ```JS
         {
             "msg": "Deleted successully",
             "id": "1"
         }
     ```

# Notes :clipboard:

1. Now all users can delete to another user, so we have to add a role and also the validations for that

## License :page_facing_up:

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

# Instagram Clone Backend


## Commands

```

yarn create react-app react-typescript-instagram-replica --template typescript

yarn add pg

yarn add fs

yarn add -D typescript @types/node @types/express

npx tsc --init

yarn add fs

yarn install

yarn start

yarn add chai

yarn add -D @types/jest

yarn add -D @types/mocha

yarn add jest mocha  

yarn add -D @types/chai 

```


## POST /posts/:userId
Creates a new post for the user with the specified userId.

### Request
Method: POST
URL: /posts/:userId
Header:
Content-Type: application/json
Body:
type: string (required) - The type of the post (either "video" or "picture").
createddate: string (required) - The date and time when the post was created, in the format "YYYY-MM-DD HH:MM:SS".

### Response
Status: 201 Created
Body:
id: integer - The ID of the newly created post.
type: string - The type of the post.
createddate: string - The date and time when the post was created.
userid: integer - The ID of the user who created the post.

## Example
### Request
Copy code
```
POST /posts/1
Content-Type: application/json

{
  "type": "picture",
  "createddate": "2022-01-01 12:00:00"
}
```
### Response
Copy code
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "type": "picture",
  "createddate": "2022-01-01 12:00:00",
  "userid": 1
}
This API endpoint accepts a POST request with a JSON payload containing the type and createddate of the new post. It returns a response


# GET /posts/:userId

Gets the posts for the user with the specified `userId`.

## Request

- Method: `GET`
- URL: `/posts/:userId`

## Response

- Status: `200 OK`
- Body:
  - posts: array - An array of objects representing the posts for the user. Each object contains the following properties:
    - id: integer - The ID of the post.
    - type: string - The type of the post (either "video" or "picture").
    - createddate: string - The date and time when the post was created.
    - userid: integer - The ID of the user who created the post.

## Example

#### Request

```
GET /posts/1

```

#### Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
"posts": [
{
"id": 1,
"type": "picture",
"createddate": "2022-01-01 12:00:00",
"userid": 1
},
{
"id": 2,
"type": "video",
"createddate": "2022-01-02 12:00:00",
"userid": 1
}
]
}
```
Copy code

This API endpoint accepts a GET request and returns a response with a JSON payload containing an array of objects representing the posts for the user with the specified `userId`.


# DB Schema

Users
+------------+------------+------------+------------+
| id         | name       | description| createddate|
+============+============+============+============+
| integer    | string     | string      | string     |
+------------+------------+------------+------------+

Followers
+------------+------------+
| userid     | followerid |
+============+============+
| integer    | integer    |
+------------+------------+

Content
+------------+------------+------------+
| id         | type       | createddate|
+============+============+============+
| integer    | string     | string     |
+------------+------------+------------+

Feed Data
+------------+------------+
| userid     | ListOfContentId |
+============+=================+
| integer    | integer array   |
+------------+-----------------+

Comments
+------------+------------+------------+------------+------------+
| id         | contentid  | userid     | commentText| datetime   |
+============+============+============+============+============+
| integer    | integer    | integer    | string     | string     |
+------------+------------+------------+------------+------------+

Likes
+------------+------------+------------+------------+
| id         | contentid  | userid     | datetime   |
+============+============+============+============+
| integer    | integer    | integer    | string     |
+------------+------------+------------+------------+
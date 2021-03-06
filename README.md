# tete-challenge
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

An application that helps teams to stay organised by storing tasks they want to complete on or before a particular due date, and checking them off as completed when they are done.

Deployed on heroku [here](https://tete-challenge.herokuapp.com)

## API Documentation
You can view the Postman docs [here](https://documenter.getpostman.com/view/8239792/TVemA8um)

**Environments**
Node version - v12.16.1 (LTS)

YARN version - v1.17.3
## Getting Started
**Clone this repo**
```
git clone https://github.com/neymarjimoh/tete-challenge.git
```
**Install all dependencies**
```
npm install
```
**Update environment variables**
```
cp .env.example .env
```
**Start the application**
```
npm run dev
```

**Run all tests**
```
npm run test
```
## Using Docker
**Clone this repo**
```
git clone https://github.com/neymarjimoh/tete-challenge.git
```
**Install all dependencies**
```
npm install
```
**Update environment variables**
```
cp .env.example .env
```
**start up the containers**
```
docker-compose up
```
- You can view on `http://localhost:4100`

## ADD TODO -

**Endpoint** `http://localhost:4000/api/v1/todos/new` - method (POST)

- Creates a todo item
    - Date format in ("yyyy-mm-dd")

**Payload**

    {
        "title": "complete my task",
        "dueDate": "2020-12-04",
    }


**Response format**

    {
        "status": "success",
        "message": "Task added successfully",
        "data": {
            "completed": false,
            "_id": "5fa4d50bee4290413403462f",
            "title": "complete my task",
            "dueDate": "2020-11-11T00:00:00.000Z",
            "createdAt": "2020-11-06T04:46:03.942Z",
            "updatedAt": "2020-11-06T04:46:03.942Z",
            "__v": 0
        }
    }

#### application/json

**Endpoint** `http://localhost:4000/api/v1/todos?page=1&limit=10&search=working$completed=false$date=2020-11-11&sortBy=dueDate:desc` - method (GET)

- Gets list of todo items

**Payload**

- paginates on default with page size set to 10 and page to 1 if not explicitly stated in query params
- search by **title** using `?search=titleword` (optional)
- filter by:
    - **completed**: either true or false using `?completed=true` (optional)
    - **dueDate** with date format `yyyy-mm-dd` using `?date=2020-11-06` (optional)
- sort in ascending or descending order by (optional):
    - **title** using `?sortBy=title:asc` (ascending)
    - **dueDate** using `?sortBy=dueDate:desc` (descending)
    - **createdAt** using `?sortBy=createdAt:asc` (ascending)

**Response format**

    {
        "status": "success",
        "totalCount": 2,
        "todos": [
            {
                "completed": false,
                "_id": "5fa4d50bee4290413403462f",
                "title": "start and working on backend task",
                "dueDate": "2020-11-11T00:00:00.000Z",
                "createdAt": "2020-11-06T04:46:03.942Z",
                "updatedAt": "2020-11-06T04:46:03.942Z",
                "__v": 0
            },
            {
                "completed": false,
                "_id": "5fa4c9b669993323744bf4d8",
                "title": "start working on backend task",
                "dueDate": "2020-11-11T00:00:00.000Z",
                "createdAt": "2020-11-06T03:57:43.123Z",
                "updatedAt": "2020-11-06T03:57:43.123Z",
                "__v": 0
            }
        ],
        "totalPages": 1,
        "currentPage": 1
    }

#### application/json

**Endpoint** `http://localhost:4000/api/v1/todos/update/${id}` - method (patch)

- updates todo item's completed or dueDate field

**Payload**

    {
        "completed": true,
        "dueDate": "2020-11-15"
    }


**Response format**

    {
        "status": "success",
        "message": "Task updated successfully",
        "data": {
            "completed": true,
            "_id": "5fa4c9b669993323744bf4d8",
            "title": "start working on backend task",
            "dueDate": "2020-11-15T00:00:00.000Z",
            "createdAt": "2020-11-06T03:57:43.123Z",
            "updatedAt": "2020-11-07T02:08:00.863Z",
            "__v": 0
        }
    }

#### application/json

**Endpoint** `http://localhost:4000/api/v1/todos/delete/${id}` - method (delete)

- deletes a todo item

**Response format**

    {
        "status": "success",
        "message": "Todo item deleted successfully",
        "data": {
            "completed": false,
            "_id": "5fa4c3cc4f6dd824681e9025",
            "title": "finisht backend task",
            "dueDate": "2020-11-08T00:00:00.000Z",
            "createdAt": "2020-11-06T03:32:28.287Z",
            "updatedAt": "2020-11-06T03:32:28.287Z",
            "__v": 0
        }
    }

#### application/json

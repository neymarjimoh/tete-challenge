# tete-challenge
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

An application that helps teams to stay organised by storing tasks they want to complete on or before a particular due date, and checking them off as completed when they are done.

**Environments**
Node version - v12.16.1 (LTS)

YARN version - v1.17.3

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

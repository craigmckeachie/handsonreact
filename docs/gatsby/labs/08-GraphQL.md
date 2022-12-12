---
title: 'GraphQL'
---

```
http://pet-library.moonhighway.com/
```

> Uses GraphQL Playground

## Send a Query with GraphQL Playground

1. Query

```js
query {
  totalPets
}
```

> Ctrl+Space to autocomplete fields

2. Result

```json
{
  "data": {
    "totalPets": 25
  }
}
```

## Query a List of Objects

1. Query

```diff
query {
  totalPets
+  allPets{
+    name,
+    weight
  }
}
```

2. Result

```json
{
  "data": {
    "totalPets": 25,
    "allPets": [
      {
        "name": "Archy",
        "weight": 19.9
      },
      {
        "name": "Pip",
        "weight": 3.7
      },
      {
        "name": "Luna",
        "weight": 75.4
      },
      {
        "name": "Pillow",
        "weight": 8.3
      },
   ...
  }
}
```

- Curly Braces = Selection Set
- Data Requested = Field(s)
- \# Comments

## Query an Enumeration Type

1. Query

```diff
query {
  totalPets
  allPets{
    name,
    weight
+   category
  }
}
```

- Type System (see Schema tab)
- Cmd+Click a Field to see Type info

## Query Nested GraphQL Query

1. Query

```diff
query {
  totalPets
  allPets{
    name,
    weight,
    category,
    photo{
+      full
+      thumb
    }
  }
}
```

2. Result

```json
{
  "data": {
    "totalPets": 25,
    "allPets": [
      {
        "name": "Archy",
        "weight": 19.9,
        "category": "DOG",
        "photo": {
          "full": "https://res.cloudinary.com/hzrulbrds/image/upload/v1582763883/archy_yehmk9.jpg",
          "thumb": "https://res.cloudinary.com/hzrulbrds/image/upload/v1582764387/thumbs/archy_tn_qlgg24.jpg"
        }
      },

  ...
  }
}
```

## Filter Query using Arguments

1. Query

```diff
query {
-  totalPets,
+  totalPets(status:AVAILABLE)
  allPets{
    name
    weight,
    category,
    photo{
      full
      thumb
    }
  }
}

```

2. Result

```diff
{
  "data": {
+    "totalPets": 10,
    "allPets": [
      {
        "name": "Archy",
        "weight": 19.9,
        "category": "DOG",
        "photo": {}
        ...
}
```

## Aliasing Fields

1. Duplicate field names will need to be aliased.

```js
query {
+  available: totalPets(status:AVAILABLE),
+  checkedOut: totalPets(status: CHECKEDOUT)
-  totalPets(status:AVAILABLE),
-  totalPets(status: CHECKEDOUT)
  allPets{
    name
    weight,
    category
  }
}
```

2. Result

```diff
{
  "data": {
+    "available": 10,
+    "checkedOut": 15,
    "allPets": [
  ...
  }
}
```

## Use Variables to Filter a Query

> Create a new Query

1. Query

```js
query{
  allPets(category: DOG, status: AVAILABLE){
    id
    name
    status
    category
  }
}
```

```js
query($category: PetCategory, $status: PetStatus){
  allPets(category: $category, status: $status){
    id
    name
    status
    category
  }
}
```

### Query Variables

```json
{
  "category": "DOG",
  "status": "AVAILABLE"
}
```

2. Result

```json
{

"data": {
    "allPets": [
      {
        "id": "D-1",
        "name": "Danton",
        "status": "AVAILABLE",
        "category": "DOG"
      },
      {
        "id": "D-8",
        "name": "Pax",
        "status": "AVAILABLE",
        "category": "DOG"
      },
  ...
  }
}
```

## By Customer

1. Query

```js
query{
  allCustomers{
    name
    username
    currentPets{
      id
      name
    }
  }
  petById(id: "C-1"){
    name
    inCareOf{
     name
    }
  }
}
```

2. Result

```json
{
  "data": {
    "allCustomers": [
      {
        "name": "Paul Benson",
        "username": "pbenson",
        "currentPets": []
      },
      ...{
        "name": "Veronica",
        "username": "V100",
        "currentPets": [
          {
            "id": "C-1",
            "name": "Biscuit"
          }
        ]
      },
      {
        "name": "Jeet chauhan",
        "username": "Jeet007",
        "currentPets": [
          {
            "id": "C-2",
            "name": "Jungle"
          }
        ]
      },
      {
        "name": "Aynur Timerbaev",
        "username": "aironrich",
        "currentPets": [
          {
            "id": "D-2",
            "name": "Archy"
          }
        ]
      }
    ],
    "petById": {
      "name": "Biscuit",
      "inCareOf": {
        "name": "Veronica"
      }
    }
  }
}
```

## Operation Names

1. Query

### TOO BIG

```js
query {
  availablePets: totalPets(status: AVAILABLE)
  checkedOutPets: totalPets(status: CHECKEDOUT)
  dogs: allPets(category: DOG, status: AVAILABLE) {
    name
    weight
    status
    category
    photo {
      full
      thumb
    }
  }
  totalCustomers
  allCustomers {
    name
    username
    dateCreated
    checkoutHistory {
      pet {
        name
      }
      checkOutDate
      checkInDate
      late
    }
  }
}
```

### NO Query (operation) Names

```js
query {
  availablePets: totalPets(status: AVAILABLE)
  checkedOutPets: totalPets(status: CHECKEDOUT)
  dogs: allPets(category: DOG, status: AVAILABLE) {
    name
    weight
    status
    category
    photo {
      full
      thumb
    }
  }
}

query {
  totalCustomers
  allCustomers {
    name
    username
    dateCreated
    checkoutHistory {
      pet {
        name
      }
      checkOutDate
      checkInDate
      late
    }
  }
}
```

### Queries with Operation Names

```js
query PetPage {
  availablePets: totalPets(status: AVAILABLE)
  checkedOutPets: totalPets(status: CHECKEDOUT)
  dogs: allPets(category: DOG, status: AVAILABLE) {
    name
    weight
    status
    category
    photo {
      full
      thumb
    }
  }
}

query CustomerPage{
  totalCustomers
  allCustomers {
    name
    username
    dateCreated
    checkoutHistory {
      pet {
        name
      }
      checkOutDate
      checkInDate
      late
    }
  }
}
```

1. Result

#### CustomerPage

```json
{
  "data": {
    "totalCustomers": 121,
    "allCustomers": [
      {
        "name": "John Bronson",
        "username": "jbronson",
        "dateCreated": "2019-03-24T02:19:49.025Z",
        "checkoutHistory": [
```

## Mutation

1. Query

```js

mutation ($input: CreateAccountInput!) {
  createAccount(input: $input) {
    username,
    name
  }
}


```

1a. Query Variables

```json
{
  "input": {
    "name": "James Franco",
    "username": "jfranco",
    "password": "abc123"
  }
}
```

2. Result

```json
{
  "data": {
    "createAccount": {
      "username": "jfranco",
      "name": "James Franco"
    }
  }
}
```

## Authenticate a User

1. Mutation

```js
query user {
  me {
    name
    username
  }
}

mutation login{
  logIn(username: "jfranco" password: "abc123") {
    customer {
      name
    }
    token
  }
}

```

1a. HTTP Headers

```
{
  "Authorization": "Bearer your-token-here"
}

```

2. Result

```json
{
  "data": {
    "me": {
      "name": "James Franco",
      "username": "jfranco"
    }
  }
}
```

## Checkout a Pet

1. Queries

```js
query {
  allPets(status: AVAILABLE) {
    id
    name
    category
  }
}
```

```js
mutation Checkout {
  checkOut(id: "S-4") {
    pet {
      name
    }
    customer {
      name
    }
  }
}
```

```
query Me {
  me {
    name
    currentPets{
      name
    }
  }
}
```

You likely already have this header set from a previous step.

```json
{
  "Authorization": "Bearer your-token here"
}
```

2. Result

```json
{
  "data": {
    "me": {
      "name": "James Franco",
      "currentPets": [
        {
          "name": "Pluto"
        }
      ]
    }
  }
}
```

## Fragments

1. Query

```js
query {
  allCustomers {
    name
    username
    checkoutHistory {
      pet{
        name
      }
      checkInDate
      checkOutDate
    }
  }
}

```

1a. Refactored

```js

query {
  allCustomers {
    ...CustomerDetails
  }
}

fragment CustomerDetails on Customer {
  name
  username
  checkoutHistory {
    pet {
      name
    }
    checkInDate
    checkOutDate
  }
}
```

2. Result

```json
{

 "data": {
    "allCustomers": [
      {
        "name": "Paul Benson",
        "username": "pbenson",
        "checkoutHistory": []
      },
      {
        "name": "Gran Janson",
        "username": "gjanson",
        "checkoutHistory": []
      },
  ...
  }
}
```

## Reference

- [GraphQL Query Language Documentation](https://graphql.org/learn/queries/)

- [Guide: Querying GraphQL](https://app.pluralsight.com/guides/querying-data-with-graphql)

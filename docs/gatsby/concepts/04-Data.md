---
title: "Data"
---

## What is Data?

- A very computer science-y answer would be: data is things like "strings", integers (42), objects ({ pizza: true }), etc.
- For the purpose of working in Gatsby, however, a more useful answer is “everything that lives outside a React component”.

## Using Many Sources of Data

Data can also live in file types like Markdown, CSV, etc. as well as databases and APIs of all sorts.

Gatsby’s data layer lets you pull data from these (and any other source) directly into your components — in the shape and form you want.

## Kinds of Data

- Unstructured Data
- GraphQL

## Unstructured Data

- Other APIs
- building a small site, one efficient way to build it is to pull in unstructured data using createPages API
- if the site becomes more complex later on, you move on to building more complex sites, or you’d like to transform your data then use a Gatsby plugin to query data using GraphQL

## Create Page API

- Allows you to create pages dynamically at build time

## Query Data with GraphQL

There are many options for loading data into React components. One of the most popular and powerful of these is a technology called GraphQL.

GraphQL was invented at Facebook to help product engineers pull needed data into React components.

GraphQL is a query language (the QL part of its name). If you’re familiar with SQL, it works in a very similar way. Using a special syntax, you describe the data you want in your component and then that data is given to you.

Gatsby uses GraphQL to enable page and StaticQuery components to declare what data they and their sub-components need. Then, Gatsby makes that data available in the browser when needed by your components.

## Page Queries

- `graphql` tag enables page components to retrieve data
- Query result automatically goes into the component's `data` prop
- Queries in Page Components are called Page Queries

## Static Queries

- Queries in Subcomponents are called Static Queries
- Allow non-page components to query data
- Introduced in Gatsby v2
- Achieved using `useStaticQuery` hook

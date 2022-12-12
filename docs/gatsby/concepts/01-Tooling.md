---
title: "Tooling"
---

## Installing the Gatsby CLI

```
npm install gatsby-cli --global
```

## Creating a Gatsby Project

```
gatsby new [SITE_DIRECTORY] [URL_OF_STARTER_GIT_REPO]
```

## Using Starter Projects

- The Gatsby CLI tool lets you install starters
- Boilerplate Gatsby sites maintained by the community
- Intended for jump-starting development quickly
- https://www.gatsbyjs.com/starters/ (hundreds)

## Generated Project File Structure

A quick look at the top-level files and directories you'll see in a Gatsby project.

```
    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md
```

## Configuration Files

- `gatsby-config.js` defines
  - your site’s metadata
  - plugins
  - other general configuration.
- `gatsby-browser.js`
  - Interacting with the client-side of Gatsby
  - Respond to actions within the browser (client route changes)
  - Wrap your site in additional components (Ex. Layout)
- `gatsby-node.js`
  - Run once in the process of building your site
  - Use its APIs to:
    - Create pages dynamically
    - Add data into GraphQL
    - Respond to events during the build lifecycle

## Building Projects

```
gatsby build
```

- `build` command produces a directory of static HTML and JavaScript files
- deploy to a static site hosting service

## Static Site Hosting

- Gatsby Cloud
- Azure
- Netlify
- AWS Amplify
- S3 & Cloudfront
- Vercel
- Surge

> https://www.gatsbyjs.com/docs/deploying-and-hosting/

## Review

1. How do you create a Gatsby application?
2. How do you build a Gatsby application and what is the output?
3. Where can you host a Gatsby site?

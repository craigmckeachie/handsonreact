---
title: "Tooling"
---

## New Project

1.  Install Gatsby CLI.

    ```
    npm install gatsby-cli --global
    ```

    ```
    npm WARN express-graphql@0.9.0 requires a peer of graphql@^14.4.1 but none is installed. You must install peer dependencies yourself.
    ```

2.  Create a new Gatsby project.

    ```
    gatsby new acme https://github.com/gatsbyjs/gatsby-starter-hello-world
    ```

    - [Documentation: Gatsby Starters](https://www.gatsbyjs.com/docs/starters/#reach-skip-nav)
    - [Gatsby Starters List](https://www.gatsbyjs.com/starters/)

3.  Change to the project directory.

    ```
    cd acme
    ```

4.  Open the project directory in an editor.

    ```
    code .
    ```

5.  Run the website in development mode.
    ```
    gatsby develop
    ```
6.  Change the greeting message.

    #### `src\pages\index.js`

    ```diff
    import React from "react"

    export default function Home() {
    -  return <div>Hello World!</div>
    +  return <div>Hello Gatsby!</div>
    }
    ```



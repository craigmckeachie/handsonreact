---
title: 'Images'
---

## Importing assets with webpack

1. Import an image into the home page of the site and display it.

   #### `src\pages\index.js`

   ```diff
   import { graphql, Link } from "gatsby"
   import React from "react"
   import Layout from "../components/layout"
   import { PageTitle } from "../components/page-title"
   + import homePagePhoto from "../images/home-page-photo.jpeg"

   export default function Home({ data }) {
   return (
       <Layout>
       <PageTitle>Home</PageTitle>
   -    <img src="https://source.unsplash.com/600x300/?house" alt="house" />
   +    <img
   +        className="rounded-md shadow-md"
   +        style={{ width: "600px", height: "300px" }}
   +        src={homePagePhoto}
   +        alt="corporate,office,building"
   +    />
       ...
       <p className="mt-6">
       ...
       </p>
       ...
       </Layout>
   )
   }
   ...
   ```

2. Import an image for the about page and display it.

   #### `src\pages\about.js`

   ```diff
   import React from "react"
   import Layout from "../components/layout"
   import { PageTitle } from "../components/page-title"
   + import aboutPhoto from "../images/about-photo.png"

   export default function About() {
   return (
       <Layout>
       <PageTitle>About</PageTitle>
   +    <img
   +        className="rounded-md shadow-md"
   +        style={{ width: "600px", height: "300px" }}
   +        src={aboutPhoto}
   +        alt="corporate building"
   +    />
   -   <p>
   +   <p className="mt-6">
       ...
       </Layout>
   )
   }

   ```

3. Import the logo image into the header component and display it.

   First remove the `bottom-padding` on the `header` element (`pb-10`).

   #### `src\components\header.js`

   ```diff
   -  <header className="pt-5 col-start-1 col-end-3 border-b-2 border-solid border-gray-600">
   +  <header className="pt-5 col-start-1 col-end-3 border-b-2 border-solid border-gray-600 pb-10">
   ```

   ```diff
   import React from "react"
   import { useStaticQuery, graphql, Link } from "gatsby"
   + import acmeLogo from "../images/acme-logo.png"

   export const NavLink = ({ children, to }) => {
   ...
   }

   export default function Header() {
   const data = useStaticQuery(graphql`
       query {
       site {
           siteMetadata {
           title
           }
       }
       }
   `)
   return (
       <header className="col-start-1 col-end-3 border-b-2 border-solid border-gray-200 flex flex-row justify-start ">
   -      <Link to="/" className="text-4xl mx-4 flex justify-self-start">
   -        {data.site.siteMetadata.title}
   -      </Link>
   +      <img src={acmeLogo} alt="Acme Logo" />
       <nav className="pt-4 pr-80 flex flex-row  justify-end  min-w-full">
           <NavLink to="/">Home</NavLink>
           <NavLink to="/about">About</NavLink>
       </nav>
       </header>
   )
   }

   ```

4. Remove the `background-color` on the `body` element because the logo background is white. We could have given the logo a transparent background but this will work for now.

   #### `src\styles\global.css`

   ```diff
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   - body {
   -   @apply bg-gray-100;
   - }
   ```

## Using the Gatsby Image plugin

1.  Install the following packages:

    ```shell
    npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem gatsby-transformer-sharp
    ```

2.  Add the plugins to your `gatsby-config.js`:

    #### `gatsby-config.js`

    ```diff
    module.exports = {
    siteMetadata: {
        title: `Acme Inc.`,
        description: `A corporate site`,
    },
    plugins: [
        {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `src`,
            path: `${__dirname}/src`,
        },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-emotion`,
        "gatsby-plugin-postcss",
    +    `gatsby-plugin-image`,
    +    `gatsby-plugin-sharp`,
    +    `gatsby-transformer-sharp`,
      ],
    }
    ```

3.  Replace the main `<img>` in the home page with a `<StaticImage>` from the Gatsby image plugin.

    #### `src\pages\index.js`

    ```diff
    ...
    - import homePagePhoto from "../images/home-page-photo.jpeg"
    + import { StaticImage } from "gatsby-plugin-image"
    ...
    <PageTitle>Home</PageTitle>
    - <img
    - className="rounded-md shadow-md"
    - style={{ width: "600px", height: "300px" }}
    - src={homePagePhoto}
    - alt="corporate,office,building"
    - />
    + <StaticImage
    + imgClassName="rounded-md shadow-md"
    + placeholder="blurred"
    + loading="eager"
    + width={600}
    + height={300}
    + src="../images/home-page-photo.jpeg"
    + alt="corporate office building"
    + />
    ...
    ```

4.  Throttle the network in Chrome DevTools's Network tab to see a blurred home page image initially load.
    > Try some other placeholder settings [from the documentation](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#placeholder).
5.  In `header.js`, style the navigation to the right and the logo to the left using flexbox.

    #### `src\components\header.js`

    ```js
    <header className="... flex flex-row justify-start pr-80 ">
    ```

    ```js
    <nav className="... flex flex-row  justify-end min-w-full">
    ```

6.  If time permits, replace the main `<img>` in the about page (`src\pages\about.js`) with a `<StaticImage>` from the Gatsby image plugin using the last step as an example.

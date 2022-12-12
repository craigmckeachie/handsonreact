---
title: "Data"
---

## Query Site MetaData

1. Add a site title as metadata to the gatsby configuration file.

   #### `gatsby-config.js`

   ```diff
   module.exports = {
   +  siteMetadata: {
   +    title: `Acme Inc.`,
   +    description: `A corporate site`,
   +  },
     plugins: [`gatsby-plugin-emotion`, "gatsby-plugin-postcss"],
   }
   ```

2. Open GraphiQL and write a query for the siteMetadata.

   ```
   http://localhost:8000/___graphQL
   ```

   ```json
   query {
       site {
       siteMetadata {
           title
       }
       }
   }
   ```

## Create a Static Query

3. Use that query as a static query in the Header component to retrieve the data.
4. Display the data in the header to the left of the Navigation.

   ```diff
   import React from "react"
   - import { Link } from "gatsby"
   + import { useStaticQuery, graphql, Link } from "gatsby"

   export const NavLink = ({ children, to }) => {
     return (
       <Link
         className="mx-0 p-5 text-gray-600 text-lg hover:text-gray-800 hover:border-2 hover:border-solid hover:border-gray-800"
         to={to}
       >
         {children}
       </Link>
     )
   }

   export default function Header() {
   +  const data = useStaticQuery(graphql`
   +    query {
   +      site {
   +        siteMetadata {
   +          title
   +        }
   +      }
   +    }
   +  `)
     return (
       <header className="pt-5 pb-10 border-b-2 border-solid border-gray-600">
   +      <Link to="/" className="text-4xl mx-4">
   +        {data.site.siteMetadata.title}
   +      </Link>
   -      <nav>
   +      <nav className="inline">
           <NavLink to="/">Home</NavLink>
           <NavLink to="/about">About</NavLink>
         </nav>
       </header>
     )
   }

   ```

## Query Files

1. Download [these files](https://github.com/craigmckeachie/acme-snippets/archive/refs/heads/main.zip)
2. Unzip the files.
3. Copy the `articles` and `images` directories into the `acme\src` directory.
4. Install and configure the `gatsby-source-filesystem` plugin so we can read the files in the content directory.

   ```shell
   npm install gatsby-source-filesystem
   ```

   #### `gatsby-config.js`

   ```diff
   module.exports = {
     siteMetadata: {
       title: `Acme Inc.`,
       description: `A corporate site`,
     },
     plugins: [
   +    {
   +      resolve: `gatsby-source-filesystem`,
   +      options: {
   +        name: `src`,
   +        path: `${__dirname}/src`,
   +      },
   +    },
       `gatsby-plugin-emotion`,
       'gatsby-plugin-postcss',
     ],
   };
   ```

5. Save the file and restart the gatsby development server.

   ```
   Ctrl+C
   gatsby develop
   ```

6. Then open up GraphiQL again.

   ```
   http://localhost:8000/___graphQL
   ```

7. Write a query to view the file names in the content directory.

   ```json
   {
     allFile {
       edges {
         node {
           id
           relativePath
           prettySize
           birthTime(fromNow: true)
         }
       }
     }
   }
   ```

## Create a Page Query

4. Create a page named `files.js` that uses that uses a the query you just wrote as a `page query` to fetch data and then displays it in the page.

   #### `src\pages\files.js`

   ```js
   import { graphql } from "gatsby";
   import React from "react";
   import Layout from "../components/layout";
   import { PageTitle } from "../components/page-title";

   const Th = ({ children }) => {
     return (
       <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
         {children}
       </th>
     );
   };

   const Td = ({ children }) => {
     return (
       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
         {children}
       </td>
     );
   };

   export default function Files({ data }) {
     return (
       <Layout>
         <PageTitle>Files</PageTitle>
         <table className="border border-gray-400 min-w-full leading-normal ">
           <thead>
             <tr>
               <Th>Relative PaTh</Th>
               <Th>Pretty Size</Th>
               <Th>File Type</Th>
               <Th>Created</Th>
             </tr>
           </thead>
           <tbody>
             {data.allFile.nodes.map((file) => (
               <tr key={file.id}>
                 <Td>{file.relativePath}</Td>
                 <Td>{file.prettySize}</Td>
                 <Td>{file.extension}</Td>
                 <Td>{file.birthTime}</Td>
               </tr>
             ))}
           </tbody>
         </table>
       </Layout>
     );
   }

   export const query = graphql`
     {
       allFile {
         nodes {
           id
           relativePath
           prettySize
           extension
           birthTime(fromNow: true)
         }
       }
     }
   `;
   ```

5. Load the files page and verify the contents.

   ```
   http://localhost:8000/files/
   ```

   > Tip: visit the development 404 page by typing an invalid url to see a list of all available page routes

## Transform Markdown Files into HTML

1. Install and configure the transformer plugin.

   ```shell
   npm install gatsby-transformer-remark
   ```

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
   +    `gatsby-transformer-remark`,
       `gatsby-plugin-emotion`,
       "gatsby-plugin-postcss",
     ],
   }

   ```

2. Restart the development server then refresh (or open again) GraphiQL.
3. Query the contents of your articles from the markdown files and transform them to HTML.

   ```json
   query  {
     allMarkdownRemark {
       nodes {
         timeToRead
         excerpt
         frontmatter {
           slug
           id
           title
         }
       }
     }
   }
   ```

4. Dislay the articles on the home page (`pages\index.js`).
   \*You won't need the `html` field from the query just the `excerpt` so you can leave it out for now.

   #### `src\pages\index.html`

   ```js
   import { graphql } from "gatsby";
   import React from "react";
   import Layout from "../components/layout";
   import { PageTitle } from "../components/page-title";

   export default function Home({ data }) {
     console.log(data);
     console.log(data.nodes);
     return (
       <Layout>
         <PageTitle>Home</PageTitle>
         <img src="https://source.unsplash.com/600x300/?house" alt="house" />
         <blockquote className="py-6 text-xl text-gray-800  bg-gray-300 text-center my-6">
           "We here at Acme Inc. understand that it is better to leverage
           efficiently than to benchmark extensibly."
         </blockquote>
         <p>
           What does the commonly-used commonly-used commonly-accepted industry
           jargon "holistic" really mean? What does the term "re-sizing" really
           mean? Imagine a combination of WAP and Apache. The ability to
           integrate compellingly leads to the power to grow seamlessly. Your
           budget for iterating should be at least one-tenth of your budget for
           harnessing. If all of this comes off as fabulous to you, that's
           because it is! The power to repurpose strategically leads to the
           aptitude to productize mega-compellingly. If you redefine
           proactively, you may have to maximize dynamically. Do you have a game
           plan to become subscriber-defined? Think
           micro-intra-clicks-and-mortar, open-source, C2B2B. If all of this
           seems confused to you, that's because it is!
         </p>
         <div className="py-12">
           <h2 className="text-xl">Featured Articles</h2>
           <hr className="border-gray-400 pb-4" />
           {data.allMarkdownRemark.nodes.map((node) => (
             <div key={node.frontmatter.id} className="py-2">
               <a className="hover:underline " href="">
                 <h3 className="text-sm text-gray-800 font-semibold tracking-wide uppercase">
                   {node.frontmatter.title}
                 </h3>
                 <p className="">{node.excerpt}</p>
               </a>
             </div>
           ))}
         </div>
       </Layout>
     );
   }

   export const query = graphql`
     query {
       allMarkdownRemark {
         nodes {
           timeToRead
           excerpt
           frontmatter {
             slug
             id
             title
           }
         }
       }
     }
   `;
   ```

## Create Pages from Data

1. Create the directory `src\articles`.
1. Create a file to tell gatsby what routes to dynamically generate: `src\articles\{MarkdownRemark.frontmatter__slug}.js`
1. Create a directory at `src/templates`, and then add the following in a file named `src/templates/article.js`.
1. In your browser, visit:

   ```
   http://localhost:8000/nothing
   ```

   > This is the default 404 page in gatsby that displays all the site pages including the ones you just dynamically created.

1. Scroll down to the bottom of the Gatsby.js development 404 page and you should see the following article pages were generated.

   ```js
   /articles/recontextualizing-extensibily/
   /articles/your-budget-for-streamlining/
   /articles/determining-your-feature-set/
   ```

   > Note: If you click these page links at this point they will be broken.

1. Create the basics of a component to display an article but just hard-code a header.

   #### `src\pages\articles\{MarkdownRemark.frontmatter__slug}.js`

   ```js
   import React from "react";
   import Layout from "../../components/layout";
   import { PageTitle } from "../../components/page-title";

   export default function Article() {
     return (
       <Layout>
         <PageTitle>Article Page</PageTitle>
       </Layout>
     );
   }
   ```

1. In your browser, visit:

   ```
   http://localhost:8000/nothing
   ```

1. Click on of the article links and you should see the `Article Page` header displayed.

   ```
   Article Page
   ```

1. Write a query to find an article based on its slug/path.

   #### Query

```json
sl
```

#### Query Variables

> Note the id below won't work, you'll have to use a prior query to find an id for your dev environment.

```json
{
  "id": "b982e018-50e0-58f0-8ca6-3169483ab7c4"
}
```

1. Update the article component as follows:

   - Add the query to find an article as page query
   - Display the title of the article
   - Display the `html` of the article

   #### `src\components\article.js`

   ```diff
   + import { graphql } from 'gatsby';
   import React from 'react';
   import Layout from '../components/layout';
   import { PageTitle } from "../components/page-title"

   + export default function Article({ data }) {
   +  const article = data.markdownRemark;

     return (
       <Layout>
   +      <PageTitle>{article.frontmatter.title}</PageTitle>
   +      <div dangerouslySetInnerHTML={{ __html: article.html }} />
       </Layout>
     );
   }


   +  export const query = graphql`
   +   query {
   +     allMarkdownRemark {
   +       nodes {
   +         timeToRead
   +         excerpt
   +         frontmatter {
   +           slug
   +           id
   +           title
   +         }
   +       }
   +     }
   +   }
   +  `

   }
   ```

<!-- 21. Improve the styles of the Article component. Below is an example. -->

21. Update the article links on the home page to use the slug.

    #### `src\pages\index.js`

    ```diff
    - import { graphql } from "gatsby"
    + import { graphql, Link } from "gatsby"
    import React from "react"
    import Layout from "../components/layout"
    import { PageTitle } from "../components/page-title"

    export default function Home({ data }) {
      return (
        <Layout>
          <PageTitle>Home</PageTitle>
          ...
          <div className="py-12">
            <h2 className="text-xl">Featured Articles</h2>
            <hr className="border-gray-400 pb-4" />
            {data.allMarkdownRemark.edges.map(({ node }) => (

              <div key={node.frontmatter.id} className="py-2">
    -            <a className="hover:underline" href="">
    +            <Link
    +              className="hover:underline"
    +              to={`articles${node.frontmatter.slug}`}
    +            >
                  <h3 className="text-sm text-gray-800 font-semibold tracking-wide uppercase">
                    {node.frontmatter.title}
                  </h3>
                  <p className="">{node.excerpt}</p>
    -             </a>
    +            </Link>
              </div>
            ))}
          </div>
        </Layout>
      )
    }

    export const query = graphql`
    query {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            frontmatter {
              id
              slug
              title
            }
            timeToRead
            excerpt
          }
        }
      }
    }
    `
    ```

> **Note:** The graphql function call returns a Promise
> see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

<!-- ## Query an external GraphQL API -->

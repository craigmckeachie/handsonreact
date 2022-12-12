---
title: "Components"
---

## Pages

1.  Add some more content and styles to the page.

    #### `src\pages\index.js`

    ```js
    import React from "react";

    export default function Home() {
      return (
        <div>
          <h1>Home</h1>
          <img src="https://source.unsplash.com/random/400x200" alt="" />
        </div>
      );
    }
    ```

1.  Create another page.

    #### `src\pages\about.js`

    ```js
    import React from "react";

    export default function About() {
      return (
        <div>
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            quam mollitia ut, odit suscipit velit molestias, ratione vel minus
            iure esse! Nam autem vitae distinctio minima facere. Consectetur,
            error molestiae.
          </p>
        </div>
      );
    }
    ```

    > TIP:
    > Install the extension [ES7, React, JS, Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets).
    > Then use these code snippets to make this quicker:
    >
    > - `rfc` (generates a React functional component)
    > - `lorem` (generates lorem ipsum text to fill out the page)
    >   - _Note this snippet is built into VS Code_

## Components

### Layout Component

1. Create a `components` directory under `src`.
1. Create a layout component for shared layout.

   #### `src\components\layout.js`

   ```js
   import React from "react";

   export default function Layout({ children }) {
     return <div>{children}</div>;
   }
   ```

1. Add it to both pages.

   > _You will see no visual changes at this point._

   #### `src\pages\index.js`

   ```diff
   import React from "react"
   + import Layout from "../components/layout"

   export default function Home() {
   return (
   -   <>
   +      <Layout>
       <h1>Home</h1>
       <img src="https://source.unsplash.com/600x300/?house" alt="house" />
   +      </Layout>
   -   </>
   )
   }

   ```

   #### `src\pages\about.js`

   ```diff
   import React from "react"
   import Layout from "../components/layout"

   export default function About() {
   return (
   +    <Layout>
       <h1>About</h1>
       <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quam
           mollitia ut, odit suscipit velit molestias, ratione vel minus iure esse!
           Nam autem vitae distinctio minima facere. Consectetur, error molestiae.
       </p>
   +    </Layout>
   )
   }
   ```

### Subcomponents

1. Create a reusable header component

   #### `src\components\header.js`

   _You will need to create the components directory._

   ```js
   import React from "react";

   export default function Header() {
     return (
       <header>
         <nav>Home | About</nav>
       </header>
     );
   }
   ```

1. Add a reusable footer component.

   #### `src\components\footer.js`

   ```js
   import React from "react";

   export default function Footer() {
     return (
       <footer>
         <nav>
           <a href="#">Privacy</a>
           <a href="#">Terms</a>
           <a href="#">Careers</a>
           <span> &#169; Acme Inc.</span>
         </nav>
       </footer>
     );
   }
   ```

1. Add both of these to the layout component.

   #### `src\components\layout.js`

   ```diff
   import React from "react"
   + import Footer from "./footer"
   + import Header from "./header"

   export default function Layout({ children }) {
   return (
       <div>
   +      <Header />
          {children}
   +      <Footer />
       </div>
   )
   }

   ```

1. Surround both `index.js` and `about.js` pages with the `Layout` component (`layout.js`).

## Navigation

1. Update the header to link to the pages you previously created. Use the `Link` component built-in to Gatsby.

   #### `src\components\header.js`

   ```diff
   + import { Link } from "gatsby"
   import React from "react"

   export default function Header() {
   return (
       <header>
       <nav>
   -         Home | About
   +        <Link to="/">Home</Link> |<Link to="/about">About</Link>
       </nav>
       </header>
   )
   }
   ```

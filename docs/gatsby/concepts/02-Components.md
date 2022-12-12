---
title: "Components"
---

## What is a Page Component?

- Top level component that can be routed to
- Any component in `src\pages\`

  #### `src\pages\about.js`

  ```js
  import React from "react";

  export default function About() {
    return (
      <div>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quam
          mollitia ut, odit suscipit velit molestias, ratione vel minus iure
          esse! Nam autem vitae distinctio minima facere. Consectetur, error
          molestiae.
        </p>
      </div>
    );
  }
  ```

## Routing and Page Components

- Routes are automatically created by convention
- Static route path is based on the file name of the component in the pages directory

## Linking Between Pages

- Gatsby `<Link />` component is for linking between pages within your site
- For external links to pages not handled by your Gatsby site, use the regular HTML `<a>` tag.

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

## What is a Subcomponent?

- A component that lives inside a page or another component
- Create more granular components (header, footer, aside)

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

## Reusing Component Logic Across Pages

- These components can be used on multiple pages
- Or better yet they can be used in a common **layout** component

```js
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
```

```js
import React from "react";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>
      <img src="https://source.unsplash.com/600x300/?house" alt="house" />
    </Layout>
  );
}
```

## Review

1. How do you create a page and route to it in Gatsby?
2. How do you share common layout like a header or footer in a Gatsby application?

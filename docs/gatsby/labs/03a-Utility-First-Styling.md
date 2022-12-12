---
title: 'Utility-First CSS: Tailwind'
---

Tailwind is a utility-first CSS framework for rapidly building custom user interfaces. This guide will show you how to get started with Gatsby and Tailwind CSS.

## Setting up Tailwind CSS

> Tailwind CSS requires Node.js 12.13.0 or higher.

### 1. Install Tailwind via npm

Install `gatsby-plugin-postcss` as well as Tailwind and its peer-dependencies using `npm`:

```shell
npm install -D gatsby-plugin-postcss tailwindcss@latest postcss@latest autoprefixer@latest
```

### 2. Create your configuration files

Next, generate your tailwind.config.js and postcss.config.js files:

```shell
npx tailwindcss init
```

This will create a minimal tailwind.config.js file at the root of your project:

```js
// tailwind.config.js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add some content glob patterns so Tailwind will know what files to search in for utility-class usage.

```diff
// tailwind.config.js
module.exports = {
-  content: [],
+  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create a `postcss.config.js` file at the root of the project and require tailwindcss:

```js
// postcss.config.js
module.exports = () => ({
  plugins: [require('tailwindcss')],
});
```

### 3. Enable gatsby-plugin-postcss

In your `gatsby-config.js` file, enable the `postcss plugin`.

```diff
// gatsby-config.js
module.exports = {
  /* Your site config here */
-  plugins: [`gatsby-plugin-emotion`],
+  plugins: [`gatsby-plugin-emotion`, `gatsby-plugin-postcss`]
};
```

### 4. Include Tailwind in your CSS

Open the `./src/styles/global.css` file and delete the existing styles. Then use the `@tailwind` directive as shown below to include Tailwind's base, components, and utilities styles, replacing the original file contents:

```css
/* ./src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind will swap these directives out at build-time with all of the styles it generates based on your configured design system.

> Remember our `layout.js` component is wrapped around the contents of every page and `../styles/global.css` is already imported into it so the Tailwind styles will now be available.

#### `src\components\layout.js`

> Note: no changes need to be made I'm just calling out the import mentioned above.\_

```diff
import React from "react"
import Footer from "./footer"
import * as styles from "./layout.module.css"
import Header from "./header"
+ import "../styles/global.css"

export default function Layout({ children }) {
  ...
}
```

### Configure your Editor (VS Code)

Install the VS Code extension [Tailwind CSS IntelliSense by Tailwind Labs](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). You can search for it on the extensions panel and then click install. Alternatively, click the link above and click install a couple times.

Open the command palette `View > Command Palette` and type `settings` and then choose `Preferences: Open Settings (JSON)`

Add these settings:

#### `user\settings.json`

```json
{
   ... //leave existing settings
,
"editor.quickSuggestions": {
    "strings": true
  },
  "tailwindCSS.includeLanguages": {
    "plaintext": "javascript"
  },
  "tailwindCSS.emmetCompletions": true,


}
```

Open the command palette `View > Command Palette` and type `reload` and then choose `Developer: Reload Window`

### Using Tailwind's Utility-First Workflow

1. Remove any existing styles in `global.css`.
1. Let's start by adding the background color back that we removed from `global.css` when we setup Tailwind.

#### `src\styles\global.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
}
```

We don't need to hard-code a specific hex value for the gray background because Tailwind has a design system built in with the same gray color.

_Normally Tailwind suggests placing css classes directly on the element (see code example below but DO NOT try to make this change) they apply to but since Gatsby doesn't give us access to the `index.html` page easily we are placing the style in `globabl.css`.
There are other solutions to this problem like using `React Helment` but I think this is the simplest solution._

**_Don't make this change. The code below is shown for demonstration purposes only._**

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body class="bg-gray-100"></body>
</html>
```

2. Re-apply the styles we already set throughout the site using `CSS`, `CSS Modules`, and `Emotion`. The finished code for each file is shown below but I recommend manually translating the first couple files to get a feel for Tailwind's Utility-first workflow.

#### `src\components\layout.js`

```js
import React from 'react';
import Footer from './footer';
import Header from './header';
import '../styles/global.css';

export default function Layout({ children }) {
  return (
    <div className="p-10">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
```

#### `src\components\header.js`

```js
import { Link } from 'gatsby';
import React from 'react';

export const NavLink = ({ children, to }) => {
  return (
    <Link
      className="mx-0 p-5 text-gray-600 text-lg hover:text-gray-800 hover:border-2 hover:border-solid hover:border-gray-800"
      to={to}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="pt-5 pb-10 border-b-2 border-solid border-gray-600">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
```

#### `src\components\footer.js`

```js
import React from 'react';

export const FooterLink = ({ children, to }) => {
  return (
    <a
      className="first:ml-0 mx-2 text-gray-600 hover:underline hover:text-red-400"
      href={to}
    >
      {children}
    </a>
  );
};

export default function Footer() {
  return (
    <div>
      <nav className="my-8">
        <FooterLink>Privacy</FooterLink>
        <FooterLink>Terms</FooterLink>
        <FooterLink>Careers</FooterLink>
        <span className="text-gray-400"> &#169; Acme Inc.</span>
      </nav>
    </div>
  );
}
```

#### `src\components\page-title.js`

```js
import React from 'react';

export const PageTitle = ({ children }) => {
  return <h1 className="py-6 text-2xl text-gray-600">{children}</h1>;
};
```

#### `src\pages\index.js`

```js
import React from 'react';
import Layout from '../components/layout';
import { PageTitle } from '../components/page-title';

export default function Home() {
  return (
    <Layout>
      <PageTitle>Home</PageTitle>
      <img src="https://source.unsplash.com/600x300/?house" alt="house" />
      <p className="py-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quasi
        non facere ipsa totam architecto rem officia blanditiis corrupti,
        explicabo aliquam libero doloremque. Aut recusandae laborum odit illum
        doloribus adipisci. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Labore facere tenetur eaque fuga, odit quis accusamus ipsa
        ducimus, doloribus dicta quibusdam incidunt beatae distinctio neque
        molestias laborum! Tenetur, ipsum consequuntur.
      </p>
    </Layout>
  );
}
```

#### `src\pages\about.js`

```js
import React from 'react';
import Layout from '../components/layout';
import { PageTitle } from '../components/page-title';

export default function About() {
  return (
    <Layout>
      <PageTitle>About</PageTitle>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quam
        mollitia ut, odit suscipit velit molestias, ratione vel minus iure esse!
        Nam autem vitae distinctio minima facere. Consectetur, error molestiae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias mollitia
        facilis, saepe quod minus a fuga molestias dolores eveniet error nobis
        quo ex odio, unde minima fugit, porro aut neque.
      </p>
    </Layout>
  );
}
```

#### `src\pages\NotFound.js`

```js
import React from 'react';
import Layout from '../components/layout';
import { PageTitle } from '../components/page-title';

export default function NotFound() {
  return (
    <Layout>
      <PageTitle>Page Not Found</PageTitle>
      <p>
        Sorry we were not able to find the page you requested. Click the site
        logo to try again.
      </p>
    </Layout>
  );
}
```

<!-- ```
NODE_ENV=production
NODE_ENV=development
``` -->

### Reference

- [Tailwind CSS's Gatsby Setup Guide](https://tailwindcss.com/docs/guides/gatsby)

- [Gatsby How-to Guide on Tailwind CSS](https://www.gatsbyjs.com/docs/how-to/styling/tailwind-css/)

---
id: A6-ProjectSetup
title: Project Setup
sidebar_label: Project Setup
slug: /project-setup
---

## Choices

There are many choices for setting up a new React project and the landscape is constantly evolving.

Here is a list of popular choices for setting up a new project and some thoughts about each.

- Use [WebPack](https://webpack.js.org/)
  - Create a custom build process using a Webpack configuration file and plugins
  - requires significant internal developer resources and can be difficult for team members who did not create the custom build to maintain
- Use [Create React App](https://create-react-app.dev/)
  - Internally uses WebPack
  - Customization requires either:
    - Ejecting the WebPack configuration and maintaining it yourself
      - generally, a bad choice because you are not getting improvements and bug fixes without significant effort
      - was necessary before CRACO existed
    - Use [CRACO - Create React App Configuration Override](https://craco.js.org/) to override just the customizations needed
      - good solution because it avoids having to reinvent the wheel (the build process) and allows customization
  - The React team is no longer recommending using Create React App because it supports only client-side only rendering (CSR) also known as a single-page application or SPA.
  - The React team is promoting a new feature which is currently experimental called [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components). It allows developers to choose between client-side rendering (CSR) or server-side rendering (SSR) on a component-by-component basis. This requires additional commitment to using Node.js on the server to render the React components on the server.
  - Many developers feel all their requirements are met by CSR (particularly those building line of business applications that are behind a login and not public to search engines which do handle SSR applications more reliably) and don't want or need the added complexity of SSR. [Reference](https://www.reddit.com/r/reactjs/comments/15f34gd/comment/jubhx5e/?utm_source=share&utm_medium=web2x&context=3)
  - The React team recently had one of the champions of the server-side component feature, Dan Abramov, leave Meta and the React team. [Reference](https://www.reddit.com/r/reactjs/comments/154trk7/dan_abramov_announces_retirementleaving_meta/)
  - Because the React team's roadmap is headed in a future direction embracing SSR that Create React App cannot support (only supports CSR) the project seems to be getting less frequent patches. [Reference](https://github.com/facebook/create-react-app/discussions/11768)
- Use [Next.js](https://nextjs.org/)
  - Next.js assumes you want an application with both client-side rendering (CSR) and server-side rendering (SSR)
  - If you are building a website with web application functionality in some areas supporting CSR and SSR (as Next.js does) is a very compelling value proposition
  - It is the first framework to support React's server components although support is still experimental
  - Other frameworks will likely support SSR in the future. Remix is the first of these frameworks to gain traction.
  - Next.js also supports static site generation (SSG) as well which can help with the performance of product pages on an e-commerce site that don't change as often
- Use [Vite.js](https://vitejs.dev/)
  - Supports just client-side rendering (CSR) but is an evolution over Create React App
  - Originated in the Vue community
  - Both Vue and Vite were created by Evan You
  - Works with many JavaScript libraries including React
  - Is fast when developing as it utilizes native ES Modules
  - Is fast in production as it utilizes Rollup
  - Doesn't support IE in the development workflow but can support it in production

<br />

This course uses Vite because:

- it is a  modern, faster solution for building client-side rendered (CSR) apps which is the focus of this course
- React Server Components are still experimental (at the time this was written)
- many developers don't use JavaScript for their backend but instead use Java, .NET, or Python for their backend APIs and don't have requirements for React Server Components
- we are waiting for the dust to settle


## Create New JavaScript (ECMAScript) Project

[Vite](https://vitejs.dev/) is a modern build tool that provides a fast, minimal-setup environment for building web applications. It’s optimized for speed during development and includes features like hot module replacement (HMR) and a flexible plugin ecosystem.

To create a new React project using Vite, follow these steps:

1. Open a command prompt or terminal and run the following commands:

### npm

```sh
npm create vite@latest my-app --template react
cd my-app
npm install
npm run dev
```

### Yarn

```sh
yarn create vite my-app --template react
cd my-app
yarn
yarn dev
```

2. Open the development server at the address displayed in the terminal, such as [http://localhost:5173/](http://localhost:5173/).

## Create New TypeScript Project

To create a React project using TypeScript with Vite:

1. Run these commands in your terminal:

### npm

```sh
npm create vite@latest my-app --template react-ts
cd my-app
npm install
npm run dev
```

### Yarn

```sh
yarn create vite my-app --template react-ts
cd my-app
yarn
yarn dev
```

Then open the development server at the address displayed in the terminal.

## Folder Structure

After creating your project, the structure will look like this:

```
my-app/
  .git/
  node_modules/
  public/
    vite.svg
  src/
    App.css
    App.jsx
    main.jsx
  index.html
  package.json
  README.md
```

Key files and directories:

- **`public/index.html`**: The main HTML template for your application.
- **`src/main.jsx`**: The JavaScript/TypeScript entry point for your app.
- **`src/App.jsx`**: The default React component, ready to edit.
- **`vite.config.js`**: The configuration file for Vite.

Feel free to create subdirectories inside `src/` as needed for organizing your components, utilities, and styles. Vite processes files inside the `src/` directory and supports `import` for a variety of assets.

## Browser Support

By default, Vite supports all modern browsers that support ES modules. Vite compiles JavaScript to ensure compatibility with most browser environments. For supporting older browsers, you can use tools like `@vitejs/plugin-legacy` to include polyfills:

```sh
npm install @vitejs/plugin-legacy
```

Update the `vite.config.js` to use the plugin:

```js
import legacy from '@vitejs/plugin-legacy';

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
};
```

For more information, see [Legacy Plugin Documentation](https://vitejs.dev/guide/using-plugins.html#plugins).

## Adding Dependencies

Adding dependencies with Vite is straightforward. For example, to add React Router:

### npm

```sh
npm install react-router-dom
```

### Yarn

```sh
yarn add react-router-dom
```

Import and use it in your project files as you would with any React library.

## Styles and Assets

Vite supports importing CSS and assets directly within JavaScript files. For example:

#### `Button.module.css`

```css
.Button {
  padding: 20px;
  color: white;
}
```

#### `Button.jsx`

```jsx
import React from 'react';
import styles from './Button.module.css';

function Button() {
  return <button className={styles.Button}>Click me!</button>;
}

export default Button;
```

Vite also provides out-of-the-box support for preprocessors like Sass or Less. Install the required package (`npm install sass`) and import the file as usual.

## Reference

- [Vite Official Site](https://vitejs.dev/)
- [Vite React Guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Vite Plugin Ecosystem](https://vitejs.dev/plugins/)
- [React Router](https://reactrouter.com/)

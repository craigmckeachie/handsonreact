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
  - Many developers feel all their requirements are met by CSR (particularly those building line of business applications that are behind a login and not public to search engines which do handle SSR applications more reliably) and don't want or need the added complexity of SSR
  - The React team has had recently had one of the champions of the server-side component feature, Dan Abramov, leave Meta and the React team.
  - Because the React team's roadmap is headed in future a direction SSR that Create React App cannot support (only supports CSR) the project seems to be getting less frequent patches
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

<br>

This course continues to use Create React App because:

- it is still the most used solution for React projects
- React Server Components are still experimental (at the time this was written)
- many developers don't use JavaScript for their backend but instead use Java, .NET, or Python for their backend APIs and don't have requirements for React Server Components
- we are waiting for the dust to settle

## Create New JavaScript (ECMAScript) Project

[Create React App](https://facebook.github.io/create-react-app/) is an officially supported way to create single-page React
applications. It offers a modern build setup with no configuration.

1. Open a command prompt or terminal and run the commands:

### npm

```sh
npx create-react-app my-app --use-npm
cd my-app
npm start
```

### Yarn

```sh
yarn create react-app my-app
```

2. Then open [http://localhost:3000/](http://localhost:3000/) to see your app.

   > If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, it is recommended that you uninstall the package using `npm uninstall -g create-react-app` to ensure that `npx` always uses the latest version.

## Create New TypeScript Project

1. Open a command prompt or terminal and run the commands:

### npm

```sh
npx create-react-app my-app --use-npm --template typescript
```

### Yarn

```
yarn create react-app my-app --template typescript
```

1. Then open [http://localhost:3000/](http://localhost:3000/) to see your app.

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack. You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`. Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories. They will not be included in the production build so you can use them for things like documentation.

If you have Git installed and your project is not part of a larger repository, then a new repository will be initialized resulting in an additional top-level `.git` directory.

[Reference](https://facebook.github.io/create-react-app/docs/folder-structure)

## Browser Support

By default, the generated project supports all modern browsers. Support for Internet Explorer 9, 10, and 11 requires polyfills. For a set of polyfills to support older browsers, use [react-app-polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md).

By default, the generated project includes a [`browserslist`](https://github.com/browserslist/browserslist) configuration in your `package.json` file to target a broad range of browsers based on global usage (`> 0.2%`) for production builds, and modern browsers for development.

The `browserslist` configuration controls the outputted JavaScript so that the emitted code will be compatible with the browsers specified. The `browserslist` configuration does not automatically change what polyfills are included in the build it affects the code generated by the compiler that emits JavaScript.

### Polyfills

#### react-app-polyfill

This package includes polyfills for various browsers.
It includes minimum requirements and commonly used language features used by [Create React App](https://github.com/facebook/create-react-app) projects.

### Usage

First, install the package using Yarn or npm:

```sh
npm install react-app-polyfill
```

or

```sh
yarn add react-app-polyfill
```

For IE11:

```js
// These must be the first lines in src/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// ...
```

> See the [react-app-polyfill documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md) for details.

> The react-app-polyfill can be used to fill in the Fetch API to make AJAX requests in older browsers. [For more details, read this documentation.](https://facebook.github.io/create-react-app/docs/fetching-data-with-ajax-requests)

## Styles and Assets

This project setup uses [Webpack](https://webpack.js.org/) for handling all assets. Webpack offers a custom way of “extending” the concept of `import` beyond JavaScript. To express that a JavaScript file depends on a CSS file, you need to **import the CSS from the JavaScript file**:

#### `Button.css`

```css
.Button {
  padding: 20px;
}
```

#### `Button.js`

```js
import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
```

**This is not required for React** but many people find this feature convenient. You can read about the benefits of this approach [here](https://medium.com/seek-blog/block-element-modifying-your-javascript-components-d7f99fcab52b). However you should be aware that this makes your code less portable to other build tools and environments than Webpack.

In development, expressing dependencies this way allows your styles to be reloaded on the fly as you edit them. In production, all CSS files will be concatenated into a single minified `.css` file in the build output.

If you are concerned about using Webpack-specific semantics, you can put all your CSS right into `src/index.css`. It would still be imported from `src/index.js`, but you could always remove that import if you later migrate to a different build tool.

## Dependencies

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```sh
npm install --save react-router-dom
```

Alternatively you may use `yarn`:

```sh
yarn add react-router-dom
```

This works for any library, not just `react-router-dom`.

## Uses Webpack

As previously mentioned, Create React App internally uses WebPack to build your application. If you are curious, you can see [the WebPack configuration file in GitHub here](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js).

## Reference

- [Create React App](https://facebook.github.io/create-react-app/)
- [3 ways to create-react-app with npm](https://elijahmanor.com/npm-init-initializer/)
- [Getting Started with Create React App](https://www.youtube.com/watch?v=eCz3rhsDG5s&list=PLmbQyp9IK3JPFBrv31e5Gq-Zv57KxtTnZ)
- [Installing a Dependency](https://facebook.github.io/create-react-app/docs/installing-a-dependency)
- [Adding a Router](https://facebook.github.io/create-react-app/docs/adding-a-router)
- [Adding Bootstrap](https://facebook.github.io/create-react-app/docs/adding-bootstrap)

---
title: 'Styling'
---

## Global Styles

#### `src\styles\global.css`

_You will need to create the styles directory._

```css
body {
  background-color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
}
```

#### `src\components\layout.js`

```diff
import React from "react"
import Footer from "./footer"
import Header from "./header"
+ import "../styles/global.css"

export default function Layout({ children }) {
return (
    <div>
    <Header />
    {children}
    <Footer />
    </div>
)
}
```

## Component Styles (Scoped)

1. Create a CSS Module for the layout component.

   #### `src\components\layout.module.css`

   ```css
   .container {
     margin: 0 auto;
     max-width: 1920px;
     padding: 10px;
   }
   ```

2. Import your css module into the component and apply the container class.

   #### `src\components\layout.js`

   ```diff
   import React from "react"
   import Footer from "./footer"
   import Header from "./header"
   + import * as styles from "./layout.module.css"

   export default function Layout({ children }) {
   return (
   -    <div>
   +    <div className={styles.container}>
       <Header />
       {children}
       <Footer />
       </div>
   )
   }
   ```

## CSS-in-JS

`CSS-in-JS` is a styling technique where JavaScript is used to style components. When this JavaScript is parsed, CSS is generated (usually as a `<style>` element) and attached into the DOM. It allows developers to abstract CSS to the component level itself, using JavaScript to describe styles in a declarative and maintainable way.

There are multiple implementations of this concept in the form of libraries such as:

- `Emotion`
- `Styled Components`

> For more information on the adoption level and user satisfaction of these libraries see the [State of CSS Survey](https://2020.stateofcss.com/en-US/technologies/css-in-js/) and this [npm Trends Chart](https://www.npmtrends.com/styled-components-vs-emotion-vs-glamorous-vs-@emotion/core-vs-@emotion/react-vs-@emotion/css).

## Emotion

```shell
npm install gatsby-plugin-emotion @emotion/react @emotion/styled
```

#### `gatsby-config.js`

```js
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
};
```

#### `src\components\header.js`

```js
import { Link } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';

const NavLink = styled(Link)`
  margin-left: 5px;
  margin-right: 5px;
  padding: 10px;
  color: #4b5563;
  text-decoration: none;
  font-size: 1.25rem;
  &:hover {
    color: #1f2937;
    border: 1px solid #1f2937;
    padding: 10px;
  }
`;

const StyledHeader = styled.header`
  border-bottom: 1px solid #4b5563;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </StyledHeader>
  );
}
```

## Utility-First CSS

> Building complex components from a constrained set of primitive utilities

## Utility-First Example

Traditionally, whenever you need to style something on the web, you write CSS.

### Using a traditional approach where custom designs require custom CSS

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img
      class="chat-notification-logo"
      src="/img/logo.svg"
      alt="ChitChat Logo"
    />
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

With utility classes (Tailwind), you style elements by applying pre-existing classes directly in your HTML.

### Using utility classes to build custom designs without writing CSS

```html
<div
  class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
>
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

## Utility-First Benefits

- You aren't wasting energy inventing class names
- Your CSS stops growing
- Making changes feels safer

## Why not just use inline styles?

- Designing with constraints.
  - Using inline styles, every value is a magic number. With utilities, you're choosing styles from a predefined design system, which makes it much easier to build visually consistent UIs.
- Responsive design.
  - You can't use media queries in inline styles, but you can use Tailwind's responsive utilities to build fully responsive interfaces easily.
- Hover, focus, and other states.
  - Inline styles can't target states like hover or focus, but Tailwind's state variants make it easy to style those states with utility classes.

## Tailwind

- a utility-first CSS framework
- for rapidly building custom user interfaces

## Reference

[Utility-First Defined](https://tailwindcss.com/docs/utility-first)

## Review

1. How can you include global styles in a Gatsby site?
2. What do you think about CSS-in-JS approaches to styling in Gatsby?
3. What are some of the benefits with using a Utility-first CSS Framework like Tailwind?

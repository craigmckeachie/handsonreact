---
title: 'Styling'
---

## Global Styles

1. Create a `global.css` stylesheet file to hold global styles and add the styles below.

   #### `src\styles\global.css`

   _You will need to create the styles directory._

   ```css
   body {
     background-color: #f3f4f6;
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
       Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
   }
   ```

   > We are using a sans serif system font stack in this example. For more information see [CSS System Font Stack](https://www.digitalocean.com/community/tutorials/css-system-font-stack).

1. Import the stylesheet into your Layout component to apply the styles globally to the entire site.

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

Modularizing CSS to approach styling in a component-oriented way is rapidly becoming more popular. The benefits are that it is clear which CSS styles are applied to a given part of your site and those styles don't conflict with other styles in your site.

We are going to use `CSS Modules` to modularize our CSS just as we have modularized our `HTML` using `React` components.

`CSS Modules` (CSS-in-CSS)

> CSS files in which all class names and animation names are scoped locally by default.

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

3. Create a CSS Module for the Header component and add the following styles.

   #### `src\components\header.module.css`

   ```css
   .header {
     border-bottom: 1px solid #4b5563;
     padding-top: 20px;
     padding-bottom: 20px;
   }
   .link {
     margin-left: 5px;
     margin-right: 5px;
     padding: 10px;
     color: #4b5563;
     text-decoration: none;
     font-size: 1.25rem;
   }
   .link:hover {
     color: #1f2937;
     border: 1px solid #1f2937;
     padding: 10px;
   }
   .first {
     margin-left: 0px;
   }
   ```

4. Import the CSS Module and apply the styles.

   #### `src\components\header.js`

   ```js
   import { Link } from 'gatsby';
   import React from 'react';
   import * as styles from './header.module.css';

   export default function Header() {
     return (
       <header className={styles.header}>
         <nav>
           <Link className={`${styles.link} ${styles.first}`} to="/">
             Home
           </Link>
           <Link className={styles.link} to="/about">
             About
           </Link>
         </nav>
       </header>
     );
   }
   ```

5. Create a CSS Module for the Footer component and add the following styles.

   #### `src\components\footer.module.css`

   ```css
   .nav {
     margin-top: 30px;
   }
   .link {
     margin-left: 5px;
     margin-right: 5px;
     color: #4b5563;
     text-decoration: none;
   }
   .link:hover {
     color: #f87171;
     text-decoration: underline;
   }
   .first {
     margin-left: 0px;
   }
   ```

6. Import the CSS Module and apply the styles.

   #### `src\components\footer.js`

   ```js
   import React from 'react';
   import * as styles from './footer.module.css';

   export default function Footer() {
     return (
       <div>
         <nav className={styles.nav}>
           <a className={`${styles.link} ${styles.first}`} href="#">
             Privacy
           </a>
           <a className={styles.link} href="#">
             Terms
           </a>
           <a className={styles.link} href="#">
             Careers
           </a>
           <span> &#169; Acme Inc.</span>
         </nav>
       </div>
     );
   }
   ```

> [Using CSS Modules, how do I define more than one class name?](https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name)

## Emotion

In the next few sections we will install `Emotion` and style our components using the two different approaches:

- styled components
- css prop

[Using Emotion in Gatsby](https://www.gatsbyjs.com/docs/recipes/styling-css/#using-emotion)

_Install_

1. Run this command at the command-promt or terminal in the `acme` directory.

   ```shell
   npm install gatsby-plugin-emotion @emotion/react @emotion/styled
   ```

2. Create a `gatsby-config.js` file at the root of the project directory (if one does not already exist).
3. Add the plugin to enable emotion to the config file.

   #### `\gatsby-config.js`

   ```js
   module.exports = {
     plugins: [`gatsby-plugin-emotion`],
   };
   ```

4. Delete all the code in the `header.js` file (you can make a copy of it if you want) and replace it with the code using emotion styled components shown below.

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

5. Stop the development server and then run the command again.

   ```
   // Ctrl+C
   gatsby develop
   ```

6. Reload the site and verify the styles are the same as before when we used CSS Modules.
7. Again, Delete all the code in the `header.js` file and replace it with the code using the `Emotion` `css prop` to style the component.

   #### `src\components\header.js`

   ```js
   import { Link } from 'gatsby';
   import React from 'react';
   import { css } from '@emotion/react';

   const NavLink = (props) => (
     <Link
       css={{
         marginLeft: '5px',
         marginRight: '5px',
         padding: '10px',
         color: '#4b5563',
         textDecoration: 'none',
         fontSize: '1.25rem',
         '&:hover': {
           color: '#1f2937',
           border: '1px solid #1f2937',
         },
       }}
       {...props}
     />
   );

   export default function Header() {
     return (
       <header
         css={{
           paddingTop: '20px',
           paddingBottom: '20px',
           borderBottom: '1px solid #4b5563',
         }}
       >
         <nav>
           <NavLink to="/">Home</NavLink>
           <NavLink to="/about">About</NavLink>
         </nav>
       </header>
     );
   }
   ```

8. Again, verify the site styles are the same as in the last step.
9. Take a moment to compare the different syntaxes and determine what you like or do not like about each.

## Reference

- [How-to: Use Styled Components with Gatsby](https://www.gatsbyjs.com/docs/recipes/styling-css/#using-styled-components)
- [Gatsby Recipes for Stylng with CSS](https://www.gatsbyjs.com/docs/recipes/styling-css/)
- [Official Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/)
- [React Styling Examples](https://github.com/the-road-to-learn-react/react-styling)
- [Emotion Core vs Vanilla Emotion](https://github.com/emotion-js/emotion/issues/1883)

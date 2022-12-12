---
title: "CSS Grid"
---

## Applying Grid to Acme

### Using CSS

1. Open your `acme` gatsby directory in an editor.
2. Change the `footer.js` to use a `footer` element instead of `div`.

   #### `src\components\footer.js`

   ```diff
   ...
   export default function Footer() {
     return (
   -    <div>
   +    <footer>
         <nav className="my-8">
           <FooterLink>Privacy</FooterLink>
           <FooterLink>Terms</FooterLink>
           <FooterLink>Careers</FooterLink>
           <span className="text-gray-400"> &#169; Acme Inc.</span>
         </nav>
   -    </div>
   +    </footer>
     )
   }
   ```

3. Modify `layout` to include three distinct areas: Header, Main, and Footer.

   #### `src\components\layout.js`

   ```js
   ...

   export default function Layout({ children }) {
     return (
       <div className="p-2 mx-auto container w-auto border-box">
         <Header />
         <main>{children}</main>
         <aside>
           <figure className="p-6 shadow-sm rounded-md  bg-gray-300  my-6">
             <blockquote className="text-xl text-gray-600 ">
               "We here at Acme Inc. understand that it is better to leverage
               efficiently than to benchmark extensibly."
             </blockquote>
             <figcaption>
               -Anders Reinfeld, <em>CEO</em>
             </figcaption>
           </figure>
         </aside>
         <Footer />
       </div>
     );
   }
   ```

4. Add the following css to create a two column, three row grid layout.

   #### `src\styles\global.css`

   ```css
   .container {
     display: grid;
     grid-template-columns: 1fr 20em;
     grid-template-rows: 6em 1fr 6em;
   }

   header,
   footer {
     grid-column: 1/3;
   }

   /*comment these styles after getting it working, these will just allow us to see the grid */
   .grid-item,
   header,
   main,
   aside,
   footer {
     border: 1px solid red !important;
   }
   ```

5. View the site and verify the new layout.
6. Remove the quote below the image on the home page as it is now in the aside. You will need to add a `top-margin` to the paragraph below the image...use Tailwind utility class.

### Using Tailwind Utility Classes

In this section we are going to achieve the same CSS grid using tailwind utility classes instead of custom CSS.

1. Comment out the existing CSS grid styles.

   #### `src\styles\global.css`

   ```css
   /* .container {
     display: grid;
     grid-template-columns: 1fr 20em;
     grid-template-rows: 6em 1fr 6em;
   }
   
   header,
   footer {
     grid-column: 1/3;
   } */
   ```

2. Extend Tailwind's theme to define `grid-columns-layout` and `grid-rows-layout` classes with the desired 2 column, 3 row layout.

   #### `tailwind.config.js`

   ```diff

   module.exports = {
     purge: ["./src/**/*.js"],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {
   +      gridTemplateColumns: {
   +        layout: "1fr 20em",
   +      },
   +      gridTemplateRows: {
   +        layout: "6em 1fr 6em",
   +      },
       },
     },
     variants: {
       extend: {
         borderWidth: ["hover"],
         borderStyle: ["hover"],
         borderColor: ["hover"],
       },
     },
     plugins: [],
   }
   ```

3. Add those new utility classes and the grid class to the layout.

> Be sure to remove `p-2`, `w-auto`, `border-box`

#### `src\components\layout.js`

```diff
...
export default function Layout({ children }) {
  return (
-     <div className="p-2 mx-auto container w-auto border-box">
+    <div className="container mx-auto grid grid-cols-layout grid-rows-layout">
      <Header />
      <main>{children}</main>
      <aside>
        <figure className="p-6 shadow-sm rounded-md  bg-gray-300  my-6">
          <blockquote className="text-xl text-gray-600 ">
            "We here at Acme Inc. understand that it is better to leverage
            efficiently than to benchmark extensibly."
          </blockquote>
          <figcaption>
            -Anders Reinfeld, <em>CEO</em>
          </figcaption>
        </figure>
      </aside>
      <Footer />
    </div>
  )
}
```

5. Add the `col-start-1` and `col-end-3` utility classes from Tailwind to the `header.js` and `footer.js`

   #### `src\components\header.js`

   > Add any additional utitlity classes to the header that are shown below if they don't already exist

   ```diff
   ...
   export default function Header() {
   ...

     return (
   -    <header className="pt-5 pb-10 border-b-2 border-solid border-gray-600">
   +    <header className="col-start-1 col-end-3 pt-5 pb-10 border-b-2 border-solid border-gray-600">
         <Link to="/" className="text-4xl mx-4">
           {data.site.siteMetadata.title}
         </Link>
         <nav className="inline">
           <NavLink to="/">Home</NavLink>
           <NavLink to="/about">About</NavLink>
         </nav>
       </header>
     )
   }
   ```

   #### `src\components\footer.js`

   ```diff
   export default function Footer() {
     return (
   -    <footer>
   +    <footer className="col-start-1 col-end-3">
         <nav className="my-8">
           <FooterLink>Privacy</FooterLink>
           <FooterLink>Terms</FooterLink>
           <FooterLink>Careers</FooterLink>
           <span className="text-gray-400"> &#169; Acme Inc.</span>
         </nav>
       </footer>
     )
   }
   ```

6. If time permits, add a CSS transform to the aside in `layout.js`.

   #### `src\components\layout.js`

   ```diff
   ...
   export default function Layout({ children }) {
     return (
       <div className="container mx-auto grid grid-cols-layout grid-rows-layout">
         <Header />
         <main>{children}</main>
   -      <aside>
   -        <figure className="p-6 shadow-sm rounded-md  bg-gray-300  my-6">
   +      <aside className="m-2 p-2 bg-gray-100 w-full h-56 flex-none rounded-xl">
   +        <figure className="transform -rotate-1 p-6 shadow-sm rounded-md  bg-red-200  my-2 mx-0">
             <blockquote className="text-xl text-gray-600 ">
               "We here at Acme Inc. understand that it is better to leverage
               efficiently than to benchmark extensibly."
             </blockquote>
             <figcaption>
               -Anders Reinfeld, <em>CEO</em>
             </figcaption>
           </figure>
         </aside>
         <Footer />
       </div>
     )
   }
   ```

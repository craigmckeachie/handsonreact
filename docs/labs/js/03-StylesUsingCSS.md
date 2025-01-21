---
title: 'Lab 3: Styles Using CSS'
---

## Objectives

- [ ] Install CSS
- [ ] Apply CSS

## Steps

### Install CSS

1.  **Open** a **new** `command prompt` (Windows) or `terminal` (Mac) **window**.
    > ! Be sure to open a new window. Leave `npm run dev` running.
2.  Run _one_ of the following commands:

    ### npm

    ```
    npm install mini.css@3.0.1
    ```

    ### Yarn

    ```
    yarn add mini.css@3.0.1
    ```

    > `Warnings` can be ignored but `Errors` indicate there was a problem.

3.  Verify `mini.css` was added as a `dependency` of the project in `package.json`.

    #### `\package.json`

    ```diff
    {
      "name": "keeptrack",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        ...
      },
      "dependencies": {
    +   "mini.css": "^3.0.1",
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
      },
      "devDependencies": {
        ...
      }
    }
    ```

### Apply CSS

1. **Open** and **delete** the contents of `src\app.css`
2. Open the file `src\App.jsx`.
3. Delete all the code in `src\App.jsx`.
4. You can also delete these two files as they will no longer by used in the project.
   ```
   src\assets\react.svg
   public\vite.svg
   ```
5. Remove the **Vite** favicon.

   #### index.html

   ```diff
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
   -      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Vite + React</title>
     </head>
     <body>
       <div id="root"></div>
       <script type="module" src="/src/main.jsx"></script>
     </body>
   </html>
   ```

6. Add this code.

   #### src\App.jsx

   ```diff
   function App() {
     return (
       <>
         <blockquote cite="Benjamin Franklin">
           Tell me and I forget, teach me and I may remember, involve me and I learn.
         </blockquote>
       </>
     );
   }

   export default App;

   ```

7. Open the file `src\index.css`
8. Delete the current contents of the file.
9. Import the `mini.css` stylesheet you you installed earlier in this lab.

#### `src\index.css`

```css
@import '../node_modules/mini.css/dist/mini-default.min.css';
```

> Alternatively, you could choose a dark theme: `mini-dark.min.css` or a nordic theme: `mini-nord.min.css` 7. Verify you see the following output in the browser

10. Verify the page displays the following quote with the styles shown.
    ![image](https://user-images.githubusercontent.com/1474579/64926635-c2eb9f80-d7cd-11e9-8ff7-84660d706ff9.png)

> [Mini.css](https://minicss.us/) is a **minimal**, responsive, style-agnostic **CSS framework**. `Mini.css` is similar to `Bootstrap` but lighter and **requires fewer CSS classes** so you can **focus** on learning `React` but still get a **professional look**.

---

### &#10004; You have completed Lab 3

---
title: 'Lab 2: Running Your Project'
---

## Objectives

- [ ] Run the project
- [ ] Make a change and see the app update
- [ ] Stop the project

## Steps

### Run the project

1. **Run** _one_ of the following commands:
   #### npm
   ```shell
   npm run dev
   ```
   #### Yarn
   ```shell
   yarn run dev
   ```
2. After the application builds, you should see:
   ```bash
   ➜  Local:   http://localhost:5173/
   ```
3. Hold down the CTRL (Windows) or COMMAND (Mac) key and simultaneously click the localhost link in the terminal.

   > If the link is NOT clickable copy the URL and paste it the location/address bar of a browser

4. **Verify** a page with the heading **Vite + React** is displayed in the browser.
   ![1](../images/default-page.png)

### Make a change and see the app update

1. **Change** the text in the `App` component's heading as shown below.

   #### `src\App.jsx`

   ```diff
   import { useState } from 'react'
   import reactLogo from './assets/react.svg'
   import viteLogo from '/vite.svg'
   import './App.css'

   function App() {
   const [count, setCount] = useState(0)

   return (
      <>
         <div>
         <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
         </a>
         <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
         </a>
         </div>
   -     <h1>React + Vite</h1>
   +     <h1>Ready to React</h1>
         <div className="card">
         <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
         </button>
         <p>
            Edit <code>src/App.jsx</code> and save to test HMR
         </p>
         </div>
         <p className="read-the-docs">
         Click on the Vite and React logos to learn more
         </p>
      </>
   )
   }

   export default App
   ```

2. **Save** your changes to the file.
   > In the VS Code menu bar you can turn on `File > Autosave` and this is recommended for the course.
3. **Verify** the new text **"Ready to React"** is displayed in your browser.

   > The page will automatically reload if you make changes to the code. The file saves then the code compiles then the browser refreshes.

### Stop the Project

1. **Focus** your **cursor** in the `command prompt` (Windows) or `terminal` (Mac).
2. **Type** `Ctrl + C`.
   > On `Windows` you will be prompted with `Are you sure you want to... (Y/N)`...type `y`.
3. Use what you learned earlier in the lab to **restart** the application.

---

### &#10004; You have completed Lab 2

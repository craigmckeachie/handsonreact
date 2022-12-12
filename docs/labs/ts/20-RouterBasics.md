---
title: "Lab 20: Router Basics"
---

## Objectives

- [ ] Create another Page (container component)
- [ ] Add Basic Routes (install, configure)
- [ ] Create a Navigation Menu

## Steps

### Create another Page (container component)

1. Create a `HomePage` component.

   > You will need to create a `home` directory.

   #### `src\home\HomePage.tsx`

   ```jsx
   import React from "react";

   function HomePage() {
     return <h2>Home</h2>;
   }

   export default HomePage;
   ```

### Add Basic Routes (install, configure)

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `code\keeptrack`.
   > If the top level directory you have open in VS Code is `keeptrack` and you are using the integrated terminal you will already be in this directory.
1. **Run** _one_ of the following commands to install `React Router`:
   #### npm
   ```shell
   npm install react-router-dom
   ```
   #### Yarn
   ```shell
   yarn add react-router-dom
   ```
1. **Configure** the **routes**.

   #### `src/App.tsx`

   ```diff
   import React from 'react';
   import './App.css';
   import ProjectsPage from './projects/ProjectsPage';

   + import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
   + import HomePage from './home/HomePage';

     function App() {
   -  return (
   -    <div className="container">
   -      <ProjectsPage />
   -    </div>
   - );

   +  return (
   +    <Router>
   +      <div className="container">
   +        <Routes>
   +          <Route path="/" element={<HomePage />} />
   +          <Route path="/projects" element={<ProjectsPage />} />
   +        </Routes>
   +      </div>
   +    </Router>
   +  );
   };

   export default App;
   ```

### Create a Navigation Menu

1. **Modify** your **CSS** styles to include some customizations for the navigation menu.

   #### `src/App.css`

   ```css
   header {
     height: 5.1875rem;
   }

   a.button.active {
     border: 1px solid var(--fore-color);
   }

   ...
   ```

2. **Add** two `<NavLink>` **components** (which are provided by the React Router) and set them to visit the configured routes.

   #### `src/app.tsx`

   ```diff
   function App() {
     return (
       <Router>
   +      <header className="sticky">
   +        <span className="logo">
   +          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
   +        </span>
   +        <NavLink to="/"  className="button rounded">
   +          <span className="icon-home"></span>
   +          Home
   +        </NavLink>
   +        <NavLink to="/projects" className="button rounded">
   +          Projects
   +        </NavLink>
   +      </header>
          <div className="container">
            ...
          </div>
       </Router>
     );
   };
   ...
   ```

   > You can make any `<a>` tag a `<NavLink>` and add the `to` property to set the `href`.

3. **Verify** the **routes** are working by the **following these steps**:

   1. **Visit** the root of the site: `http://localhost:3000/` and refresh the page in your browser.
   2. **Click** on `Projects` in the **navigation**.
   3. **Verify** you are taken to the `/projects` route and the `ProjectsPage` **displays**.
      ![image](https://user-images.githubusercontent.com/1474579/65077261-9d46cd80-d968-11e9-92fd-e5e9689f694c.png)
   4. **Click** on `Home` in the **navigation**.
   5. **Verify** you are taken to the `/` route and the `HomePage` **displays**.
      ![image](https://user-images.githubusercontent.com/1474579/65077364-c9fae500-d968-11e9-8af5-4caeb20e1b5a.png)

---

### &#10004; You have completed Lab 20

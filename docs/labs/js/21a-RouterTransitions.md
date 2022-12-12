---
title: "Lab 21 a: Route Transitions"
---

> This lab is optional and should only be done if time permits

## Objectives

- [ ] Animate in and out pages as routes transition

## Steps

1. Install the `react-transition-group` library.

   > `React Transition Group` exposes simple components useful for defining entering and exiting transitions.

   [React Transition Group](https://reactcommunity.org/react-transition-group/) used to be part of the `React` library itself but has since been removed and is part of `ReactCommunity.org`.

   ```
   # npm
   npm install react-transition-group

   # if using TypeScript
   npm install @types/react-transition-group

   # yarn
   yarn add react-transition-group
   ```

2. Move the `<Router>` component up one level to wrap the entire `App`. This is necessary for us to be able to access the new `useLocation` hook that is part of `react-router` at the point we use the `CSSTransition` and `Routes` components. We get the `location` using the `useLocation` hook.

   > You can't use any of the hooks from within the same component that puts the Router into the tree.
   > You need to move your BrowserRouter out of that component. It can go in the root.render() call, for instance.

   > `React Transition Group` is **not an animation library** like `React-Motion`, it does not animate styles by itself. Instead it exposes transition stages, manages classes and group elements and manipulates the DOM in useful ways, making the implementation of actual visual transitions much easier.

   #### `src\App.js`

   ```diff
   ...
   import {
   -  BrowserRouter as Router,
   Route,
   NavLink,
   Routes,
   +  useLocation,
   } from 'react-router-dom';

   ...

   function App() {
   +  let location = useLocation();
   return (
       <Provider store={store}>
   -      <Router>
       <header className="sticky">
           <span className="logo">
           <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
           </span>
           <NavLink to="/" className="button rounded">
           <span className="icon-home"></span>
           Home
           </NavLink>
           <NavLink to="/projects/" className="button rounded">
           Projects
           </NavLink>
       </header>
       <div className="container">
           <Routes location={location}>
           <Route path="/"  component={HomePage} />
           <Route path="/projects" component={ProjectsPage} />
           <Route path="/projects/:id" component={ProjectPage} />
           </Routes>
       </div>
   -      </Router>
       </Provider>
   );
   }

   export default App;
   ```

   #### `src\index.js`

   ```diff
   ...
   + import { BrowserRouter as Router } from 'react-router-dom';

   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
   <React.StrictMode>
   +  <Router>
        <App />
   +  </Router>
   </React.StrictMode>
   );

   ```

3. Wrap the `react-router`'s `Routes` component with a `TransitionGroup` and `CSSTransition` component from the `react-transition-group` library.

   #### `src\App.js`

   ```diff
   + import { CSSTransition, TransitionGroup } from 'react-transition-group';

   function App() {
   let location = useLocation();
   return (
       <Provider store={store}>
       <header className="sticky">
           <span className="logo">
           <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
           </span>
           <NavLink to="/" className="button rounded">
           <span className="icon-home"></span>
           Home
           </NavLink>
           <NavLink to="/projects/" className="button rounded">
           Projects
           </NavLink>
       </header>
       <div className="container">
   +        <TransitionGroup>
   +          <CSSTransition key={location.key} classNames="fade"  timeout={{ enter: 400, exit: 200 }}>
   -           <Routes>
   +           <Routes location={location}>
               <Route path="/" component={HomePage} />
               <Route path="/projects" component={ProjectsPage} />
               <Route path="/projects/:id" component={ProjectPage} />
               </Routes>
   +          </CSSTransition>
   +        </TransitionGroup>
       </div>
       </Provider>
   );
   }

   export default App;
   ```

<!-- 3. Add a `page` class to each page in the application.

#### `src\projects\ProjectsPage.tsx`

```diff
export default function ProjectsPage() {
  return (
-    <Fragment>
+    <div className="row page">
     ...
-    <Fragment>
+    </div>
 ...
}

```

#### `src\projects\ProjectPage.tsx`

```diff
export default function ProjectPage() {
  return (
-    <React.Fragment>
+    <div className="row page">
+      <div className="col-sm-12">
       ...
-    </React.Fragment>
+      </div>
+    </div>
 ...
}

```

#### `src\home\HomePage.tsx`

```diff
export default function HomePage() {
  return (
-    <div className="row">
+    <div className="row page">
 ...
}
``` -->

4. Add the `page` and `fade` CSS styles.

   ##### `src\index.css`

   ```css
   ... 
   /* add these below existing styles */
   
   .fade-enter {
     opacity: 0;
     z-index: 1;
   }

   .fade-enter.fade-enter-active {
     opacity: 1;
     transition: opacity 400ms ease-in;
   }

   .fade-exit.fade-exit-active {
     opacity: 1;
     transition: opacity 200ms ease-in;
   }
   ```

   This style should already exist but it is also important to ensure your container has a height of 100 percent.

   ```css
   .container {
     height: 100%;
   }
   ```

5. Click through the pages in the application and see the previous page content fade out and the new page content fade in to view.

### Libraries Compared

React Transition Group just makes transitions easier. It is not an animation library.
React Spring and React Framer Motion are animation libraries. Historically, React Spring has been the most popular library but React Framer Motion was released more recently and tends to be easier to use and comprehend. This article can be useful in making a decision on a library: [What’s the most developer-friendly React animation library?](https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/).

### Reference

- [React Transition Group Documentation](https://reactcommunity.org/react-transition-group/)
- [React Documentation Animation](https://reactjs.org/docs/animation.html)
- [What’s the most developer-friendly React animation library?](https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/)
- [React Router Animated Transitions](https://reactrouter.com/web/example/animated-transitions)
- [Cannot read property 'location' of undefined at useLocation
  ](https://github.com/ReactTraining/react-router/issues/7015)
  - [How to create page transitions with React Router](https://www.youtube.com/watch?v=NUQkajBdnmQ)
  - [Animated Transitions with React Router v4](https://www.youtube.com/watch?v=53Y8q-SgLF0)
  - [Page Transitions in React Router (With Framer Motion)](https://www.youtube.com/watch?v=qJt-FtzJ5fo&t=24s)
  - [React Spring](https://www.react-spring.io/)
  - [React Framer Motion](https://www.framer.com/motion/)

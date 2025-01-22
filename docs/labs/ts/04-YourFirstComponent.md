---
title: 'Lab 4: Your First Component'
---

## Objectives

- [ ] Create a component
- [ ] Render the component

## Steps

### Create a component

1. **Create** the directory `src\projects`.
2. **Create** the file `src\projects\ProjectsPage.tsx`
3. In the file, **create** a **function** **component** that returns the following html:

   ```html
   <h1>Projects</h1>
   ```

   > The solution code for the component appears next. Challenge yourself to write it from scratch before looking at it.

   > In VS Code, you could use this extension [VS Code ES7 React/Redux/React-Native/JS snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) that you installed as part of the setup for the course and then type `rfce` then `tab`.

   ### Solution

   #### `src\projects\ProjectsPage.tsx`

   ```tsx
   function ProjectsPage() {
     return <h1>Projects</h1>;
   }

   export default ProjectsPage;
   ```

### Render the component

1. **Remove** the `<blockquote>...</blockquote>` we returned in the last lab and **replace** it with `<ProjectsPage/>` wrapped in a `div` with a css `class` of `container`.

   #### `src\App.tsx`

   ```diff
   + import ProjectsPage from './projects/ProjectsPage';

   function App() {
   -   return (
   -     <>
   -      <blockquote cite="Benjamin Franklin">
   -         Tell me and I forget, teach me and I may remember, involve me and I learn.
   -      </blockquote>
   -     </>
   -   );
   +   return (
   +   <div className="container">
   +      <ProjectsPage />
   +   </div>
   +   );
   }
   ```

   :::tip
   Be sure to include the import for the component at the top of the file. Since you are in TypeScript, this should get automatically be imported for you.

2. **Verify** the following is displayed in the browser:

   **Projects**

---

### &#10004; You have completed Lab 4

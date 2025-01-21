---
title: 'Lab 6: Passing Data to a Component'
---

## Objectives

- [ ] Create a reusable list component
- [ ] Pass data into a component property

## Steps

### Create a reusable list component

1. **Create** the **file** `src\projects\ProjectList.jsx`
2. **Implement** a `ProjectList` **function component** that meets the following specifications:

   1. Takes a `projects` array as a `prop`.
   2. **Displays** the `projects` array as a `JSON string`.

   #### `src\projects\ProjectList.jsx`

   ```jsx
   import { Project } from './Project';

   function ProjectList({ projects }) {
     return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
   }

   export default ProjectList;
   ```

3. Define the property (prop) and its type using the `prop-types` library by doing the steps below.

   1. Open a command prompt (Windows) or Terminal (Mac) in the `keep-track` directory, and **run** the following **command** to **install** the `prop-types` library.
      ```npm
      npm install prop-types
      ```
   1. Add the following prop type definition.

   #### `src\projects\ProjectList.jsx`

   ```diff

   + import PropTypes from 'prop-types';
   + import { Project } from './Project';

    function ProjectList({ projects }) {
      return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
    }

   + ProjectList.propTypes = {
   +  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
   + };

   export default ProjectList;

   ```

### Pass data into a component property

1. **Modify** `src\projects\ProjectsPage.jsx` to **render** the `ProjectList` component and **pass** it the `MOCK_PROJECTS` array instead of directly displaying the data.

   #### `src\projects\ProjectsPage.jsx`

   ```diff

   import { MOCK_PROJECTS } from './MockProjects';
   + import ProjectList from './ProjectList';

   function ProjectsPage() {
     return (
       <>
         <h1>Projects</h1>
   -     <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
   +     <ProjectList projects={MOCK_PROJECTS} />
       </>
     );
   }

   export default ProjectsPage;

   ```

2. **Verify** the application is **displaying** the **projects** as it was in the last lab.
   ![image](https://user-images.githubusercontent.com/1474579/64889510-85efa380-d63b-11e9-8dc5-86f6dce8cec2.png)

---

### &#10004; You have completed Lab 6

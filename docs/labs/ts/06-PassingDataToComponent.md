---
title: 'Lab 6: Passing Data to a Component'
---

## Objectives

- [ ] Create a reusable list component
- [ ] Pass data into a component property

## Steps

### Create a reusable list component

1. **Create** the **file** `src\projects\ProjectList.tsx`
2. **Implement** a `ProjectList` **function component** that meets the following specifications:

   1. Takes a `projects` array as a `prop`.
      > You will need to create an interface to define the properties that come into the component.
   2. **Displays** the `projects` array as a `JSON string`.

   #### `src\projects\ProjectList.tsx`

   ```tsx
   import { Project } from './Project';

   interface ProjectListProps {
     projects: Project[];
   }

   function ProjectList({ projects }: ProjectListProps) {
     return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
   }

   export default ProjectList;
   ```

### Pass data into a component property

1. **Modify** `src\projects\ProjectsPage.tsx` to **render** the `ProjectList` component and **pass** it the `MOCK_PROJECTS` array instead of directly displaying the data.

   #### `src\projects\ProjectsPage.tsx`

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

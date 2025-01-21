---
title: 'Lab 8: More Reusable Components'
---

## Objectives

- [ ] Create another reusable component
- [ ] Render the reusable component

---

## Steps

### Create another reusable component

1. Create the file `src\projects\ProjectCard.js`.
1. Implement a `ProjectCard` as a **function** (not class) component that meets the following specifications:

   1. Takes a `project` object as a `prop`.
   1. Cut the `<div className="card">...</div>` from the `ProjectList` component and use it as the JSX for the `ProjectCard` component.
   1. Add a function to format the description to 60 characters and call it when rendering the description.

   #### `src\projects\ProjectCard.js`

   ```jsx
   import { Project } from './Project';

   import PropTypes from 'prop-types';

   function formatDescription(description) {
     return description.substring(0, 60) + '...';
   }

   function ProjectCard(props) {
     const { project } = props;
     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <h5 className="strong">
             <strong>{project.name}</strong>
           </h5>
           <p>{formatDescription(project.description)}</p>
           <p>Budget : {project.budget.toLocaleString()}</p>
         </section>
       </div>
     );
   }

   ProjectCard.propTypes = {
     project: PropTypes.instanceOf(Project).isRequired,
   };

   export default ProjectCard;
   ```

### Render the reusable component

1. Open the file `src\projects\ProjectList.js`.
1. Render the `ProjectCard` component passing it the `project` as a `prop`.

   #### `src\projects\ProjectList.js`

   ```diff

   import PropTypes from 'prop-types';
   import { Project } from './Project';
   + import ProjectCard from './ProjectCard';

   function ProjectList ({ projects }) {
       const items = projects.map(project => (
         <div key={project.id} className="cols-sm">
   -      <div className="card">
   -      <img src={project.imageUrl} alt={project.name} />
   -       <section className="section dark">
   -         <h5 className="strong">
   -           <strong>{project.name}</strong>
   -         </h5>
   -         <p>{project.description}</p>
   -        <p>Budget : {project.budget.toLocaleString()}</p>
   -       </section>
   -     </div>
   +      <ProjectCard project={project}></ProjectCard>
         </div>
       ));
       return <div className="row">{items}</div>;

   }

   ProjectList.propTypes = {
      projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
   };

   export default ProjectList;
   ```

1. **Verify** the **project** **data** **displays** correctly (_it should still look the same as it did in the last lab except for the ... after the description_) in the browser.

   ![image](https://user-images.githubusercontent.com/1474579/93270134-717a4580-f77e-11ea-95f5-73b8d6a17684.png)

>

---

### &#10004; You have completed Lab 8

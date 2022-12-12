---
title: 'Testing Lab 4: Nested Components'
---

## Objectives

- [ ] Test Setup
- [ ] Testing that Projects Display
- [ ] Testing Form Display
- [ ] Testing Form Cancel

## Steps

### Test Setup

1. **Upgrade** the `@testing-library/user-event` library to version 14.
   ```
   npm install @testing-library/user-event@14
   ```
1. **Create** the **file** `src\projects\MockProjects.js`.
1. **Add** the **mock** data below to the file.

   #### `src\projects\MockProjects.js`

   ```js
   import { Project } from './Project';

   export const MOCK_PROJECTS = [
     new Project({
       id: 1,
       name: 'Johnson - Kutch',
       description:
         'Fully-configurable intermediate framework. Ullam occaecati libero laudantium nihil voluptas omnis.',
       imageUrl: '/assets/placeimg_500_300_arch4.jpg',
       contractTypeId: 3,
       contractSignedOn: '2013-08-04T22:39:41.473Z',
       budget: 54637,
       isActive: false,
     }),
     new Project({
       id: 2,
       name: 'Wisozk Group',
       description:
         'Centralized interactive application. Exercitationem nulla ut ipsam vero quasi enim quos doloribus voluptatibus.',
       imageUrl: '/assets/placeimg_500_300_arch1.jpg',
       contractTypeId: 4,
       contractSignedOn: '2012-08-06T21:21:31.419Z',
       budget: 91638,
       isActive: true,
     }),
     new Project({
       id: 3,
       name: 'Denesik LLC',
       description:
         'Re-contextualized dynamic moratorium. Aut nulla soluta numquam qui dolor architecto et facere dolores.',
       imageUrl: '/assets/placeimg_500_300_arch12.jpg',
       contractTypeId: 6,
       contractSignedOn: '2016-06-26T18:24:01.706Z',
       budget: 29729,
       isActive: true,
     }),
     new Project({
       id: 4,
       name: 'Purdy, Keeling and Smitham',
       description:
         'Innovative 6th generation model. Perferendis libero qui iusto et ullam cum sint molestias vel.',
       imageUrl: '/assets/placeimg_500_300_arch5.jpg',
       contractTypeId: 4,
       contractSignedOn: '2013-05-26T01:10:42.344Z',
       budget: 45660,
       isActive: true,
     }),
     new Project({
       id: 5,
       name: 'Kreiger - Waelchi',
       description:
         'Managed logistical migration. Qui quod praesentium accusamus eos hic non error modi et.',
       imageUrl: '/assets/placeimg_500_300_arch12.jpg',
       contractTypeId: 2,
       contractSignedOn: '2009-12-18T21:46:47.944Z',
       budget: 81188,
       isActive: true,
     }),
     new Project({
       id: 6,
       name: 'Lesch - Waelchi',
       description:
         'Profound mobile project. Rem consequatur laborum explicabo sint odit et illo voluptas expedita.',
       imageUrl: '/assets/placeimg_500_300_arch1.jpg',
       contractTypeId: 3,
       contractSignedOn: '2016-09-23T21:27:25.035Z',
       budget: 53407,
       isActive: false,
     }),
   ];
   ```

1. **Create** the **file** `src\projects\__tests__\ProjectList-test.js`.
1. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```js
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import ProjectList from '../ProjectList';
   import { MOCK_PROJECTS } from '../MockProjects';
   import userEvent from '@testing-library/user-event';
   import { Provider } from 'react-redux';
   import { store } from '../../state';

   describe('<ProjectList />', () => {
     beforeEach(() => {
       render(
         <Provider store={store}>
           <MemoryRouter>
             <ProjectList projects={MOCK_PROJECTS} />
           </MemoryRouter>
         </Provider>
       );
     });

     test('should render without crashing', () => {
       expect(screen).toBeDefined();
     });
   });
   ```

1. Verify the initial test passes.
   ```shell
     PASS  src/projects/__tests__/ProjectList-test.js
   ```

### Testing that Projects Display

1. **Test** that the `projects` **display** correctly.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```diff
   ...
   describe('<ProjectList />', () => {
     const setup = () =>
       render(
         <Provider store={store}>
           <MemoryRouter>
             <ProjectList projects={MOCK_PROJECTS} />
           </MemoryRouter>
         </Provider>
       );

     beforeEach(() => {});

     test('should render without crashing', () => {
       setup();
       expect(screen).toBeDefined();
     });

   +  test('should display list', () => {
   +    setup();
   +    expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
   +    expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
   +    expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
   +    expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
   +  });

   });
   ```

````

1. Verify the test passes.
   ```shell
   PASS  src/projects/__tests__/ProjectList-test.js
````

### Testing Form Display

1. Modify the card component to add an `aria-label` so we can access the button in the test.

   #### `src\projects\ProjectCard.js`

   ```diff
   ...
   function ProjectCard(props: ProjectCardProps) {
   ...

     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <Link to={'/projects/' + project.id}>
             <h5 className="strong">
               <strong>{project.name}</strong>
             </h5>
             <p>{formatDescription(project.description)}</p>
             <p>Budget : {project.budget.toLocaleString()}</p>
           </Link>
           <button
   +          aria-label={`edit ${project.name}`}
             className=" bordered"
             onClick={() => {
               handleEditClick(project);
             }}
           >
             <span className="icon-edit "></span>
             Edit
           </button>
         </section>
       </div>
     );
   }

   export default ProjectCard;

   ```

1. Modify the form component to add an `aria-label` and a `name` (which gives an implicit role of form) so we can access the form in the test.

   #### `src\projects\ProjectForm.js`

   ```diff
   ...

   function ProjectForm({ project: initialProject, onCancel }) {
     ...

     return (
       <form
   +      aria-label="Edit a Project"
   +      name="projectForm"
         className="input-group vertical"
         onSubmit={handleSubmit}
       >
         ...
       </form>
     );
   }

   export default ProjectForm;
   ```

1. **Test** that the **form** is displayed when edit is clicked.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```diff
   ...

   describe('<ProjectList />', () => {
   ...

     test('should display list', () => {
       ...
     });

   +  test('should display form when edit clicked', async () => {
   +    setup();
   +    // eslint-disable-next-line testing-library/render-result-naming-convention
   +    const user = userEvent.setup();
   +    await user.click(
   +      screen.getByRole('button', { name: /edit Wisozk Group/i })
   +    );
   +    expect(
   +      screen.getByRole('form', {
   +        name: /edit a project/i,
   +      })
   +    ).toBeInTheDocument();
   +  });
   });
   ```

1. Verify the test passes.

   ```shell
   PASS  src/projects/__tests__/ProjectList-test.js
   ```

### Testing Form Cancel

1. **Test** that the **form** is removed after clicking cancel.

#### `src\projects\__tests__\ProjectList-test.js`

```diff
...

describe('<ProjectList />', () => {
...

+  test('should display image and remove form when cancel clicked', async () => {
+    setup();
+    // eslint-disable-next-line testing-library/render-result-naming-convention
+    const user = userEvent.setup();
+    await user.click(
+      screen.getByRole('button', { name: /edit Wisozk Group/i })
+    );
+    await user.click(
+      screen.getByRole('button', {
+        name: /cancel/i,
+      })
+    );
+    expect(
+      screen.getByRole('img', {
+        name: /wisozk group/i,
+      })
+    ).toBeInTheDocument();
+    expect(
+      screen.queryByRole('form', {
+        name: /edit a project/i,
+      })
+    ).not.toBeInTheDocument();
+  });

});

```

1. Verify the test passes.

   ```shell
   PASS  src/projects/__tests__/ProjectList-test.js
   ```

---

### &#10004; You have completed Testing Lab 4

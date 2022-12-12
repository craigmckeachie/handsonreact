---
title: 'Testing Lab 6: Testing Forms'
---

## Objectives

- [ ] Update the Form to be more Accessible
- [ ] Test Loading Data into the Form
- [ ] Test Updating Form Values
- [ ] Test Validation Rules

## Steps

### Update the Form to be more Accessible

One of the great benefits of using React Testing Library is that it helps us build a more accessible application. The way we initially built our form HTML needs to be updated so we can more easily and realiably select various form elements and errors.

1. Update the form to be more accessible.

   #### `src\projects\ProjectForm.js`

   ```diff
   ...

   function ProjectForm({ project: initialProject, onCancel }) {
     ...

     return (
       <form
         aria-label="Edit a Project"
         name="projectForm"
         className="input-group vertical"
         onSubmit={handleSubmit}
       >
         <label htmlFor="name">Project Name</label>
         <input
   +        id="name"
   +        aria-label="project name"
           type="text"
           name="name"
           placeholder="enter name"
           value={project.name}
           onChange={handleChange}
         />
         {errors.name.length > 0 && (
           <div
   +        role="alert"
           className="card error">
             <p>{errors.name}</p>
           </div>
         )}

         <label htmlFor="description">Project Description</label>
         <textarea
   +        id="description"
   +        aria-label="project description"
           name="description"
           placeholder="enter description"
           value={project.description}
           onChange={handleChange}
         />
         {errors.description.length > 0 && (
           <div
   +         role="alert"
             className="card error">
             <p>{errors.description}</p>
           </div>
         )}

         <label htmlFor="budget">Project Budget</label>
         <input
   +        id="budget"
           type="number"
           name="budget"
           placeholder="enter budget"
           value={project.budget}
           onChange={handleChange}
         />
         {errors.budget.length > 0 && (
           <div
   +         role="alert"
           className="card error">
             <p>{errors.budget}</p>
           </div>
         )}

         <label htmlFor="isActive">Active?</label>
         <input
   +        id="isActive"
           type="checkbox"
           name="isActive"
           checked={project.isActive}
           onChange={handleChange}
         />
         <div className="input-group">
           <button className="primary bordered medium">Save</button>
           <span />
           <button type="button" className="bordered medium" onClick={onCancel}>
             cancel
           </button>
         </div>
       </form>
     );
   }

   export default ProjectForm;

   ```

### Test Loading Data into the Form

1. **Create** the **file** `src\projects\__tests__\ProjectForm-test.js`.
1. **Add** the **setup** code below to test loading data into the form.

   #### `src\projects\__tests__\ProjectForm-test.js`

   ```js
   import React from 'react';
   import { render, screen } from '@testing-library/react';
   import { MemoryRouter } from 'react-router-dom';
   import { Project } from '../Project';
   import ProjectForm from '../ProjectForm';
   import { Provider } from 'react-redux';
   import { store } from '../../state';
   import userEvent from '@testing-library/user-event';

   describe('<ProjectForm />', () => {
     let project;
     let updatedProject;
     let handleCancel;
     let nameTextBox;
     let descriptionTextBox;
     let budgetTextBox;

     const setup = () => {
       render(
         <Provider store={store}>
           <MemoryRouter>
             <ProjectForm project={project} onCancel={handleCancel} />
           </MemoryRouter>
         </Provider>
       );

       nameTextBox = screen.getByRole('textbox', {
         name: /project name/i,
       });
       descriptionTextBox = screen.getByRole('textbox', {
         name: /project description/i,
       });
       budgetTextBox = screen.getByRole('spinbutton', {
         name: /project budget/i,
       });
     };

     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100,
       });
       updatedProject = new Project({
         name: 'Ghost Protocol',
         description:
           'Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...',
       });
       handleCancel = jest.fn();
     });

     test('should load project into form', () => {
       setup();
       expect(
         screen.getByRole('form', {
           name: /edit a project/i,
         })
       ).toHaveFormValues({
         name: project.name,
         description: project.description,
         budget: project.budget,
         isActive: project.isActive,
       });
     });
   });
   ```

1. **Verify** that the intial **test passes**.

   ```shell
    PASS  src/projects/__tests__/ProjectForm-test.js
   ```

### Test Updating Form Values

1. **Test**

   #### `src\projects\__tests__\ProjectForm-test.js`

   ```diff
   ...

   describe('<ProjectForm />', () => {
   ...

   +  test('should accept input', async () => {
   +    setup();
   +    const user = userEvent.setup();
   +    await user.clear(nameTextBox);
   +    await user.type(nameTextBox, updatedProject.name);
   +    expect(nameTextBox).toHaveValue(updatedProject.name);
   +
   +    await user.clear(descriptionTextBox);
   +    await user.type(descriptionTextBox, updatedProject.description);
   +    expect(descriptionTextBox).toHaveValue(updatedProject.description);
   +
   +    await user.clear(budgetTextBox);
   +    await user.type(budgetTextBox, updatedProject.budget.toString());
   +    expect(budgetTextBox).toHaveValue(updatedProject.budget);
   +  });

   });
   ```

````

1. **Verify** the **test passes**.

   ```shell
    PASS  src/projects/__tests__/ProjectForm-test.js
````

### Test Validation Rules

1. **Test**

   #### `src\projects\__tests__\ProjectForm-test.js`

   ```diff
   ...

   describe('<ProjectForm />', () => {
     ...

   +  test('name should display required validation', async () => {
   +    setup();
   +    const user = userEvent.setup();
   +    await user.clear(nameTextBox);
   +    expect(screen.getByRole('alert')).toBeInTheDocument();
   +  });
   +
   +  test('name should display minlength validation', async () => {
   +    setup();
   +    const user = userEvent.setup();
   +    await user.clear(nameTextBox);
   +    await user.type(nameTextBox, 'ab');
   +    await expect(screen.getByRole('alert')).toBeInTheDocument();
   +    await user.type(nameTextBox, 'c');
   +    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
   +  });
   +
   +  test('budget should display not 0 validation', async () => {
   +    setup();
   +    const user = userEvent.setup();
   +    await user.clear(budgetTextBox);
   +    await user.type(budgetTextBox, '0');
   +    expect(screen.getByRole('alert')).toBeInTheDocument();
   +    await user.type(budgetTextBox, '1');
   +    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
   +  });

   });
   ```

1. **Verify** all **tests pass**.

   ```shell
    PASS  src/projects/__tests__/ProjectForm-test.js
   ```

---

### &#10004; You have completed Testing Lab 6

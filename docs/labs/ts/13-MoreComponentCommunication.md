---
title: 'Lab 13: More Component Communication'
---

## Objectives

- [ ] In a child component, accept a function as a prop and invoke it
- [ ] In a parent component, implement a function and pass it as a prop to a child component

## Steps

### In a child component, accept a function as a prop and invoke it

1. **Open** the **file** `src\projects\ProjectForm.tsx`.
2. Add the `ProjectFormProps` interface, **with** an `onCancel` **event handler** that takes no parameters and returns `void`.
3. Update the `cancel` button and add a `click` event to invoke the function passed into the `onCancel` `prop`.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   + interface ProjectFormProps {
   +   onCancel: () => void;
   + }

   - function ProjectForm() {
   + function ProjectForm({ onCancel }: ProjectFormProps) {
     return (
       <form className="input-group vertical">
         <label htmlFor="name">Project Name</label>
         <input type="text" name="name" placeholder="enter name" />
         <label htmlFor="description">Project Description</label>
         <textarea name="description" placeholder="enter description" />
         <label htmlFor="budget">Project Budget</label>
         <input type="number" name="budget" placeholder="enter budget" />
         <label htmlFor="isActive">Active?</label>
         <input type="checkbox" name="isActive" />
         <div className="input-group">
           <button className="primary bordered medium">Save</button>
           <span />
           <button type="button" className="bordered medium"
   +        onClick={onCancel}
           >
             cancel
           </button>
         </div>
       </form>
     );
   }

   export default ProjectForm;
   ```

### In a parent component, implement a function and pass it as a prop to a child component

1. In `src\projects\ProjectList.tsx` **add** a `cancelEditing` **event handler** to `ProjectList` that sets the state of the component so that `projectBeingEdited` is an empty object `{}`. See the details in the next step.
2. **Wire** up the **onCancel** **event** of the `<ProjectForm />` component rendered in the `ProjectList` to the `cancelEditing` event handler.

   #### `src\projects\ProjectList.tsx`

```diff
...
function ProjectList({ projects }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

+  const cancelEditing = () => {
+    setProjectBeingEdited({});
+  };

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? (
            <ProjectForm
+              onCancel={cancelEditing}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
```

3. **Verify** the application is **working** by _following these steps_:
   1. **Open** the application in your browser and refresh the page.
   2. **Click** the **edit** button for a project.
   3. **Verify** the `<ProjectCard />` is removed and replaced by the `<ProjectForm/>`.
      > The `<ProjectForm/>` will be empty at this point. We will fill in the data in a future lab.
   4. **Click** the **cancel** button on the form.
   5. **Verify** the `<ProjectForm/>` is removed and replaced by the `<ProjectCard />`.

> This lab is conceptually very similar to Lab 11 in that we are invoking a function on a parent component in a child component.

---

### &#10004; You have completed Lab 13

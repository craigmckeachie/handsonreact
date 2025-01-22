---
title: 'Redux Lab 3: Redux with React'
---

## Objectives

- [ ] Refactor the Page (container) component to use React Redux Hooks
- [ ] Refactor the Form component to dispatch an action

## Steps

### Refactor the Page (container) component to use React Redux Hooks

1. Remove the Page (container) component's local state and replace with Redux state using useSelector. Also, get a reference to the Store's dispatch function using useDispatch so we can dispatch actions.

   #### `src\projects\ProjectsPage.js`

   > Make sure you are in Project**s**Page.js not ProjectPage.js.

   ```diff
   - import React, { useState, useEffect } from 'react';
   + import React, { useEffect } from 'react';
   import ProjectList from './ProjectList';
   - import { Project } from './Project';
   + import { useSelector, useDispatch } from 'react-redux';

   function ProjectsPage() {
   -  const [projects, setProjects] = useState<Project[]>([]);
   -  const [loading, setLoading] = useState(false);
   -  const [error, setError] = useState(undefined);
   -  const [currentPage, setCurrentPage] = useState(1);

   +  const loading = useSelector(
   +    (appState) => appState.projectState.loading
   +  );
   +  const projects = useSelector(
   +    (appState) => appState.projectState.projects
   +  );
   +  const error = useSelector(
   +    (appState) => appState.projectState.error
   +  );
   +  const currentPage = useSelector(
   +    (appState) => appState.projectState.page
   +  );
   +  const dispatch = useDispatch();

   ...
   }
   ```

1. Replace state setter function calls and API calls with calls to dispatch passing action creators. Also, remove the `onSave` function and stop passing it as a prop to the `<ProjectList/>` component.

   #### `src\projects\ProjectsPage.js`

   ```diff
   ...
   - import { Project } from './Project';
   - import { projectAPI } from './projectAPI';
   + import { loadProjects } from './state/projectActions';

   function ProjectsPage() {
     ...
     const dispatch = useDispatch();

   -  useEffect(() => {
   -    setLoading(true);
   -    projectAPI
   -      .get(currentPage)
   -      .then((data) => {
   -        setLoading(false);
   -        if (currentPage === 1) {
   -          setProjects(data);
   -        } else {
   -          setProjects((projects) => [...projects, ...data]);
   -        }
   -      })
   -      .catch((e) => {
   -        setLoading(false);
   -        setError(e.message);
   -      });
   -  }, [currentPage]);

   +  useEffect(() => {
   +    dispatch(loadProjects(1));
   +  }, [dispatch]);

     const handleMoreClick = () => {
   -    setCurrentPage((currentPage) => currentPage + 1);
   +    dispatch(loadProjects(currentPage + 1));
     };

   -  const saveProject = (project) => {
   -    projectAPI
   -      .put(project)
   -      .then((updatedProject) => {
   -        let updatedProjects = projects.map((p) => {
   -          return p.id === project.id ? project : p;
   -        });
   -        setProjects(updatedProjects);
   -      })
   -      .catch((e) => {
   -        setError(e.message);
   -      });
   -  };

     return (
       <Fragment>
         ...
   -      <ProjectList onSave={saveProject} projects={projects} />
   +      <ProjectList projects={projects} />
         ...
       </Fragment>
     );
   }
   ...
   ```

1. Provide the store.

   #### `src\App.js`

   ```diff
   import ProjectPage from './projects/ProjectPage';
   + import { Provider } from 'react-redux';
   + import { store } from './state';

   function App() {
     return (
   +    <Provider store={store}>
         <Router>
           <header className="sticky">
             <span className="logo">
               <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
             </span>
             <NavLink to="/"  className="button rounded">
               <span className="icon-home"></span>
               Home
             </NavLink>
             <NavLink to="/projects/" className="button rounded">
               Projects
             </NavLink>
           </header>
           <div className="container">
             <Routes>
               <Route path="/"  component={HomePage} />
               <Route path="/projects"  component={ProjectsPage} />
               <Route path="/projects/:id" component={ProjectPage} />
             </Routes>
           </div>
         </Router>
   +   </Provider>
     );
   };

   export default App;
   ```

### Refactor the Form component to dispatch an action

1. Refactor the Form component so it dispatches the `saveProject` action instead of receiving the function as a prop.

   #### `src\projects\ProjectForm.js`

   ```diff
   import React, { SyntheticEvent, useState } from 'react';
   + import { useDispatch } from 'react-redux';
   import { Project } from './Project';
   + import { saveProject } from './state/projectActions';

   function ProjectForm({
     project: initialProject,
   - onSave,
     onCancel,
   }) {
     const [project, setProject] = useState(initialProject);
     const [errors, setErrors] = useState({
       name: '',
       description: '',
       budget: '',
     });

   +  const dispatch = useDispatch();

     const handleSubmit = (event) => {
       event.preventDefault();
       if (!isValid()) return;
   -    onSave(project);
   +    dispatch(saveProject(project));
     };

     const handleChange = (event) => {
       ...
     };

     function validate(project) {
     ...
     }

     function isValid() {
       ...
     }

     return (
       <form className="input-group vertical" onSubmit={handleSubmit}>
       ...
       </form>
     );
   }

   ProjectForm.propTypes = {
   -  onSave: PropTypes.func.isRequired,
     onCancel: PropTypes.func.isRequired
   };
   export default ProjectForm;
   ```

2. Provide the store.

   - This was already done in `src\App.js` because it is inherited from the parent Page component: Page =>List=>Form.

3. In the `ProjectList` component, remove `onSave` in the `propTypes` definition and update the component to not pass `onSave` to `<ProjectForm>` as it is now dispatches this action itself after importing it.

   #### `src\Projects\ProjectList.js`

   ```diff
   import React, { useState } from 'react';
   import { Project } from './Project';
   import ProjectCard from './ProjectCard';
   import ProjectForm from './ProjectForm';

   - function ProjectList({ projects, onSave }) {
   + function ProjectList({ projects }) {
     const [projectBeingEdited, setProjectBeingEdited] = useState({});

     const handleEdit = (project) => {
       setProjectBeingEdited(project);
     };

     const cancelEditing = () => {
       setProjectBeingEdited({});
     };

     return (
       <div className="row">
         {projects.map((project) => (
           <div key={project.id} className="cols-sm">
             {project === projectBeingEdited ? (
               <ProjectForm project={project}
   -             onSave={onSave}
                 onCancel={cancelEditing} />
             ) : (
               <ProjectCard project={project} onEdit={handleEdit} />
             )}
           </div>
         ))}
       </div>
     );
    }

    ProjectList.propTypes = {
      projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
   -  onSave: PropTypes.func.isRequired
    };
   export default ProjectList;
   ```

4. **Verify** the application still works including loading and updating the projects.

---

### &#10004; You have completed Lab 25

> Please let the instructor know you have completed this lab before continuing to the bonus exercise.

## Bonus Exercise (optional)

> Do this exercise in your own time outside of class or while waiting for other students to finish the labs.

Now that you have the `ProjectsPage` (plural) refactored to use `Redux`, use what you have learned to change the `ProjectPage` (singular) code to use `Redux` as well.

Not giving you specific directions on how to do this is intentional at this point. It is time to see if you can apply what you learned without specific guidance. Tip: Remember, it is perfectly valid to reference your existing code from the last few labs to complete this exercise.

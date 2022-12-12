---
title: 'Lab 21: Route Parameters'
---

## Objectives

- [ ] Navigate to a route with a parameter

## Steps

### Navigate to a route with a parameter

1. **Add** a `find` **method** to `projectAPI` to return a single `Project` by `id`

   #### `src\projects\projectAPI.ts`

   ```diff
   const projectAPI = {
   ...

   +  find(id: number) {
   +    return fetch(`${url}/${id}`)
   +      .then(checkStatus)
   +      .then(parseJSON)
   +      .then(convertToProjectModel);
   +  },
   +
   ...
   };
   ```

2. **Create** the files below and add the code for these pre-built components we will use in this lab. Take a moment to review the code in them.

   #### `src\projects\ProjectDetail.tsx`

   ```tsx
   import React from 'react';
   import { Project } from './Project';

   interface ProjectDetailProps {
     project: Project;
   }
   export default function ProjectDetail({ project }: ProjectDetailProps) {
     return (
       <div className="row">
         <div className="col-sm-6">
           <div className="card large">
             <img
               className="rounded"
               src={project.imageUrl}
               alt={project.name}
             />
             <section className="section dark">
               <h3 className="strong">
                 <strong>{project.name}</strong>
               </h3>
               <p>{project.description}</p>
               <p>Budget : {project.budget}</p>

               <p>Signed: {project.contractSignedOn.toLocaleDateString()}</p>
               <p>
                 <mark className="active">
                   {' '}
                   {project.isActive ? 'active' : 'inactive'}
                 </mark>
               </p>
             </section>
           </div>
         </div>
       </div>
     );
   }
   ```

   #### `src\projects\ProjectPage.tsx`

   ```tsx
   import React, { useEffect, useState } from 'react';
   import { projectAPI } from './projectAPI';
   import ProjectDetail from './ProjectDetail';
   import { Project } from './Project';
   import { useParams } from 'react-router-dom';

   function ProjectPage(props: any) {
     const [loading, setLoading] = useState(false);
     const [project, setProject] = useState<Project | null>(null);
     const [error, setError] = useState<string | null>(null);
     const params = useParams();
     const id = Number(params.id);

     useEffect(() => {
       setLoading(true);
       projectAPI
         .find(id)
         .then((data) => {
           setProject(data);
           setLoading(false);
         })
         .catch((e) => {
           setError(e);
           setLoading(false);
         });
     }, [id]);

     return (
       <div>
         <>
           <h1>Project Detail</h1>

           {loading && (
             <div className="center-page">
               <span className="spinner primary"></span>
               <p>Loading...</p>
             </div>
           )}

           {error && (
             <div className="row">
               <div className="card large error">
                 <section>
                   <p>
                     <span className="icon-alert inverse "></span> {error}
                   </p>
                 </section>
               </div>
             </div>
           )}

           {project && <ProjectDetail project={project} />}
         </>
       </div>
     );
   }

   export default ProjectPage;
   ```

3. Add a route to display the `ProjectPage` (notice that we now have a `ProjectPage` and a `ProjectsPage` so be careful you are in the correct file).

   #### `src\App.tsx`

   ```diff
   import ProjectsPage from './projects/ProjectsPage';
   + import ProjectPage from './projects/ProjectPage';

   function App() {
     return (
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
             <Route path="/"  element={<HomePage />} />
             <Route path="/projects"  element={<ProjectsPage /> } />
   +           <Route path="/projects/:id" element={<ProjectPage />} />
           </Routes>
         </div>
       </Router>
     );
   }
   ```

4. Make the name and description clickable by adding a `<Link />` component around them.

   #### `src\projects\ProjectCard.tsx`

   ```diff
   + import { Link } from 'react-router-dom';
   ...
     <section className="section dark">
   +  <Link to={'/projects/' + project.id}>
       <h5 className="strong">
       <strong>{project.name}</strong>
       </h5>
       <p>{formatDescription(project.description)}</p>
       <p>Budget : {project.budget.toLocaleString()}</p>
   +  </Link>
     <button
       type="button"
       className=" bordered"
       onClick={() => {
       handleEditClick(project);
       }}
      >
       <span className="icon-edit "></span>
       Edit
     </button>
     </section>
   ...
   ```

5. **Verify** the new **route** works by the **following these steps**:

   1. **Visit** the root of the site: `http://localhost:3000/` and refresh the page in your browser.
   2. **Click** on `Projects` in the **navigation**.
   3. **Verify** you are taken to the `/projects` route and the `ProjectsPage` **displays**.
   4. **Click** on the name or description in any of the project cards .
   5. **Verify** you are taken to the `/projects/1` route and the `ProjectPage` **displays** the `ProjectDetail` component.

   <![image](https://user-images.githubusercontent.com/1474579/65079801-e77e7d80-d96d-11e9-8e1f-c8dab5ae60ba.png)

---

### &#10004; You have completed Lab 21

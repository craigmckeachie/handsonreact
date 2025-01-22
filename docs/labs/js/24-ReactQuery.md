---
title: 'Lab 24: React Query Refactor'
---

## Objectives

- [ ] Install React Query and React Query Devtools.
- [ ] Configure **React Query Client** provider and **React Query Devtools**.
- [ ] Remove the `saveProject` function and `onSave` props.
- [ ] Refactor the `useProjects` custom hook to use React Query's `useQuery`.
- [ ] Use React Query’s `isFetching` status to show when data is refreshing in the background.
- [ ] Create and use a `useSaveProject` custom hook using React Query’s `useMutation`.

## Steps

### Install React Query and React Query Devtools.

1. **Start** with the **Lab 26** solution code.
2. Run the follow commands at a command-prompt or terminal (be sure you are in the keeptrack directory).

   #### npm

   ```sh
   npm install @tanstack/react-query@4
   npm install @tanstack/react-query-devtools@4
   ```

   OR

   #### yarn

   ```
   yard add @tanstack/react-query
   yard add @tanstack/react-query-devtools
   ```

### Configure **React Query Client** provider and **React Query Devtools**.

1.  Wrap the `App` component in a `QueryClientProvider` and add the `ReactQueryDevtools` inside of the provider. Also, create a `QueryClient` and pass it to the `QueryClientProvider`.

    #### `src/main.jsx`

    ```diff
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    +import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
    +import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

    + const queryClient = new QueryClient();

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
    +   <QueryClientProvider client={queryClient}>
          <App />
    +      <ReactQueryDevtools initialIsOpen={false} />
    +    </QueryClientProvider>
      </React.StrictMode>
    );
    ```

### Remove the `saveProject` function and `onSave` props

1. Remove all the code highlighted from the following files

   #### `src/projects/ProjectsPage.jsx`

   ```diff
     ...

     <ProjectList projects={projects}
   - onSave={saveProject}
     />

     ...
   ```

   #### `src/projects/ProjectList.jsx`

   ```diff
   ...

   ProjectList.propTypes = {
     projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
   -  onSave: PropTypes.func.isRequired,
   };

   export default ProjectList;
   ```

   ```diff
   ...

   function ProjectList({ projects
   - , onSave
   }) {

   ...
   ```

   ```diff
   <ProjectForm
     project={project}
   -  onSave={onSave}
     onCancel={cancelEditing}
   />
   ```

   #### `src/projects/ProjectForm.jsx`

   ```diff
    ...

    function ProjectForm({
      project: initialProject,
   -  onSave,
      onCancel,
    }) {
    ...

    ProjectForm.propTypes = {
      project: PropTypes.instanceOf(Project),
      onCancel: PropTypes.func.isRequired,
   -  onSave: PropTypes.func.isRequired,
    };

    export default ProjectForm;

   ```

   ```diff
   const handleSubmit = (event) => {
       event.preventDefault();
       if (!isValid()) return;
   -    onSave(project);
     };

   ```

   > We will get the save functionality working again later in the lab.

### Refactor the `useProjects` custom hook to use React Query's `useQuery`.

> We will also use React Query’s `isFetching` status to show when data is refreshing in the background.

1. **DELETE ALL** the **code** in `src/projects/projectHooks.js`
1. Add the following code. Notice that is significantly less code.

   #### `src/projects/projectHooks.js`

   ```js
   import { useState } from 'react';
   import { projectAPI } from './projectAPI';
   import {
     useMutation,
     useQuery,
     useQueryClient,
   } from '@tanstack/react-query';
   import { Project } from './Project';

   export function useProjects() {
     const [page, setPage] = useState(0);
     let queryInfo = useQuery({
       queryKey: ['projects', page],
       queryFn: () => projectAPI.get(page + 1),
       keepPreviousData: true,
       // staleTime: 5000,
     });
     console.log(queryInfo);
     return { ...queryInfo, page, setPage };
   }
   ```

1. **DELETE ALL** the **code** in `src/projects/ProjectsPage.jsx`
1. Update the `ProjectsPage.jsx` to use the React Query based custom hook.

   #### `src/projects/ProjectsPage.jsx`

   ```jsx
   import React, { useEffect, useState } from 'react';
   import { useProjects } from './projectHooks';
   import ProjectList from './ProjectList';

   function ProjectsPage() {
     const {
       data,
       isLoading,
       error,
       isError,
       isFetching,
       page,
       setPage,
       isPreviousData,
     } = useProjects();

     return (
       <>
         <h1>Projects</h1>

         {data ? (
           <>
             {isFetching && !isLoading && (
               <span className="toast">Refreshing...</span>
             )}
             <ProjectList projects={data} />
             <div className="row">
               <div className="col-sm-4">Current page: {page + 1}</div>
               <div className="col-sm-4">
                 <div className="button-group right">
                   <button
                     className="button "
                     onClick={() => setPage((oldPage) => oldPage - 1)}
                     disabled={page === 0}
                   >
                     Previous
                   </button>
                   <button
                     className="button"
                     onClick={() => {
                       if (!isPreviousData) {
                         setPage((oldPage) => oldPage + 1);
                       }
                     }}
                     disabled={data.length != 10}
                   >
                     Next
                   </button>
                 </div>
               </div>
             </div>
           </>
         ) : isLoading ? (
           <div className="center-page">
             <span className="spinner primary"></span>
             <p>Loading...</p>
           </div>
         ) : isError && error instanceof Error ? (
           <div className="row">
             <div className="card large error">
               <section>
                 <p>
                   <span className="icon-alert inverse "></span>
                   {error.message}
                 </p>
               </section>
             </div>
           </div>
         ) : null}
       </>
     );
   }

   export default ProjectsPage;

   // this commented code is unnecessary it's just here to show you the pattern
   // return (
   //   <>
   //     <h1>Header</h1>
   //     {data ? (
   //       <p>data</p>
   //     ) : isLoading ? (
   //       <p>Loading...</p>
   //     ) : isError ? (
   //       <p>Error Message</p>
   //     ) : null}
   //   </>
   // );
   ```

1. To make it easier to see the pagination change the page size to 10 records. Delay the query to make it easier to see the loading indicator.

   #### `src/projects/projectAPI.js`

   ```diff
   const projectAPI = {
     get(page = 1,
   -  limit = 20
   +  limit = 10
     ) {
       return (
         fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
           .then(delay(2000))
           .then(checkStatus)
           .then(parseJSON)
           .catch((error) => {
             console.log('log client error ' + error);
             throw new Error(
               'There was an error retrieving the projects. Please try again.'
             );
           })
       );
     },
   ```

1. Test the projects page and verify that the initial load and pagination work.

### Create and use a `useSaveProject` custom hook using React Query’s `useMutation`.

1. Add the `useSaveProject` custom hook.

   #### `src/projects/projectHooks.js`

   ```js
   // existing code
   ...

   export function useSaveProject() {
     const queryClient = useQueryClient();
     return useMutation({
      mutationFn: (project) => projectAPI.put(project),
      onSuccess: () => queryClient.invalidateQueries(['projects']),
     });
   }
   ```

1. Update the `ProjectForm` to use the `useSaveProject` hook.

   #### `src/projects/ProjectForm.jsx`

   ```diff
   import React, { SyntheticEvent, useState } from 'react';
   import { Project } from './Project';
   + import { useSaveProject } from './projectHooks';

   ...

   function ProjectForm({ project: initialProject,
                         onCancel }) {

   ...

   +  const { mutate: saveProject, isLoading } = useSaveProject();
     const handleSubmit = (event) => {
       event.preventDefault();
       if (!isValid()) return;
   +   saveProject(project);
     };

   ...

   return (
       <form className="input-group vertical" onSubmit={handleSubmit}>
   +      {isLoading && <span className="toast">Saving...</span>}
         <label htmlFor="name">Project Name</label>

   ...

   }

   export default ProjectForm;
   ```

1. Test the projects page. Edit a project and save it and verify the change works and you see the saving toast indicator near the bottom of the page.

### &#10004; You have completed Lab 27

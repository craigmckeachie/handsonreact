---
title: 'Lab 26: Custom Hooks'
---

> This lab is optional and should only be done if time permits

## Objectives

- [ ] Move stateful logic out of components by creating Custom Hooks

## Steps

1. This lab is a refactor of the code from the solution of `lab22` so begin by checking out the `lab22` solution code and creating a working branch for this lab.

   ```
   git checkout lab22
   git checkout -b lab26working
   ```

2. Create a `projectHooks.ts` file and add the following code.

   #### `src\projects\projectHooks.ts`

   ```ts
   import { useState, useEffect } from 'react';
   import { projectAPI } from './projectAPI';
   import { Project } from './Project';

   export function useProjects() {
     const [projects, setProjects] = useState<Project[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | undefined>(undefined);
     const [currentPage, setCurrentPage] = useState(1);
     const [saving, setSaving] = useState(false);
     const [savingError, setSavingError] = useState<string | undefined>(
       undefined
     );

     useEffect(() => {
       async function loadProjects() {
         setLoading(true);
         try {
           const data = await projectAPI.get(currentPage);
           if (currentPage === 1) {
             setProjects(data);
           } else {
             setProjects((projects) => [...projects, ...data]);
           }
         } catch (e) {
           if (e instanceof Error) {
             setError(e.message);
           }
         } finally {
           setLoading(false);
         }
       }
       loadProjects();
     }, [currentPage]);

     const saveProject = (project: Project) => {
       setSaving(true);
       projectAPI
         .put(project)
         .then((updatedProject) => {
           let updatedProjects = projects.map((p) => {
             return p.id === project.id ? new Project(updatedProject) : p;
           });
           setProjects(updatedProjects);
         })
         .catch((e) => {
           setSavingError(e.message);
         })
         .finally(() => setSaving(false));
     };

     return {
       projects,
       loading,
       error,
       currentPage,
       setCurrentPage,
       saving,
       savingError,
       saveProject,
     };
   }
   ```

   > Notice how this logic was directly lifted out of the `ProjectsPage` component.

3. Refactor the `ProjectsPage` component to remove the logic which is now in the hook and call the hook instead.

> Be sure to open the `ProjectsPage.tsx` and not the singular `ProjectPage.tsx`

#### `src\projects\ProjectsPage.ts`

```diff
-import React, { useState, useEffect } from 'react';
+import React from 'react';
 import ProjectList from './ProjectList';
-import { projectAPI } from './projectAPI';
-import { Project } from './Project';
+import { useProjects } from './projectHooks';

function ProjectsPage() {
-  const [projects, setProjects] = useState<Project[]>([]);
-  const [loading, setLoading] = useState(false);
-  const [error, setError] = useState<string | undefined>(undefined);
-  const [currentPage, setCurrentPage] = useState(1);
-  const [saving, setSaving] = useState(false);
-  const [savingError, setSavingError] = useState<string | undefined>(undefined);




-  useEffect(() => {
-    async function loadProjects() {
-      setLoading(true);
-      try {
-        const data = await projectAPI.get(currentPage);
-        if (currentPage === 1) {
-          setProjects(data);
-        } else {
-          setProjects((projects) => [...projects, ...data]);
-        }
-      } catch (e) {
-         if (e instanceof Error) {
-          setError(e.message);
-        }
-      } finally {
-        setLoading(false);
-      }
-    }
-    loadProjects();
-  }, [currentPage]);

+  const {
+    projects,
+    loading,
+    error,
+    setCurrentPage,
+    saveProject,
+    saving,
+    savingError,
+  } = useProjects();

   const handleMoreClick = () => {
     setCurrentPage((currentPage) => currentPage + 1);
   };

-  const saveProject = (project: Project) => {
-    projectAPI
-      .put(project)
-      .then((updatedProject) => {
-        let updatedProjects = projects.map((p) => {
-          return p.id === project.id ? new Project(updatedProject) : p;
-        });
-        setProjects(updatedProjects);
-      })
-      .catch((e) => {
-        if (e instanceof Error) {
-          setError(e.message);
-        }
-      });
-  };

   return (
     <>
       <h1>Projects</h1>
+      {saving && <span className="toast">Saving...</span>}

-      {error && (
+      {(error || savingError) && (
         <div className="row">
           <div className="card large error">
             <section>
               <p>
                 <span className="icon-alert inverse "></span>
-                {error}
+                {error} {savingError}
               </p>
             </section>
           </div>
    </>
  );
}

export default ProjectsPage;

```

4. Test the application to verify the loading, saving and error messages are displaying.

   - Add this line to test the loading spinner

     #### `src\projects\projectAPI.ts`

     ```diff
       get(page = 1, limit = 20) {
         return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
     +     .then(delay(2000))
           .then(checkStatus)
           .then(parseJSON)
           .catch((error: TypeError) => {
             console.log('log client error ' + error);
             throw new Error(
               'There was an error retrieving the projects. Please try again.'
             );
           });
       },
     ```

     - Shut down your backend API to test the display of an error message

### &#10004; You have completed Lab 26

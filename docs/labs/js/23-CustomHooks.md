---
title: 'Lab 23: Custom Hooks'
---

> This lab is optional and should only be done if time permits

## Objectives

- [ ] Move stateful logic out of components by creating Custom Hooks

## Steps

1. Create a `projectHooks.js` file and add the following code.

   #### `src\projects\projectHooks.js`

   ```js
   import { useState, useEffect } from 'react';
   import { projectAPI } from './projectAPI';
   import { Project } from './Project';

   export function useProjects() {
     const [projects, setProjects] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(undefined);
     const [currentPage, setCurrentPage] = useState(1);
     const [saving, setSaving] = useState(false);
     const [savingError, setSavingError] = useState(undefined);

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
           setError(e.message);
         } finally {
           setLoading(false);
         }
       }
       loadProjects();
     }, [currentPage]);

     const saveProject = (project) => {
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

2. Refactor the `ProjectsPage` component to remove the logic which is now in the hook and call the hook instead.

> Be sure to open the `ProjectsPage.jsx` and not the singular `ProjectPage.jsx`

#### `src\projects\ProjectsPage.jsx`

```diff
-import { useState, useEffect } from 'react';
 import ProjectList from './ProjectList';
-import { projectAPI } from './projectAPI';
-import { Project } from './Project';
+import { useProjects } from './projectHooks';

function ProjectsPage() {
-  const [projects, setProjects] = useState([]);
-  const [loading, setLoading] = useState(false);
-  const [error, setError] = useState(undefined);
-  const [currentPage, setCurrentPage] = useState(1);
-  const [saving, setSaving] = useState(false);
-  const [savingError, setSavingError] = useState(undefined);


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
-          setError(e.message);
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

-  const saveProject = (project) => {
-    projectAPI
-      .put(project)
-      .then((updatedProject) => {
-        let updatedProjects = projects.map((p) => {
-          return p.id === project.id ? new Project(updatedProject) : p;
-        });
-        setProjects(updatedProjects);
-      })
-      .catch((e) => {
-          setError(e.message);
-      });
-  };

   return (
     <>
       <h1>Projects</h1>
+      {saving && <span className="toast">Saving...</span>}


      <div className="row">
        {error && (
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        )}
+        {savingError && (
+          <div className="card large error">
+            <section>
+              <p>
+                <span className="icon-alert inverse "></span>
+                {savingError}
+              </p>
+            </section>
+          </div>
+        )}
      </div>
    </>
  );
}

export default ProjectsPage;

```

3. Test the application to verify the loading spinner and saving toast message are displaying.

   :::tip
   Add these lines to test the loading spinner and saving message
   :::

   #### `src\projects\projectAPI.js`

   ```diff
   ...

     get(page = 1, limit = 20) {
       return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
   +     .then(delay(2000))
         .then(checkStatus)
         .then(parseJSON)
         .catch((error) => {
           console.log('log client error ' + error);
           throw new Error(
             'There was an error retrieving the projects. Please try again.'
           );
         });
     },

     put(project) {
       return fetch(`${url}/${project.id}`, {
         method: 'PUT',
         body: JSON.stringify(project),
         headers: {
           'Content-Type': 'application/json',
         },
       })
   +     .then(delay(2000))
         .then(checkStatus)
         .then(parseJSON)
         .catch((error) => {
           console.log('log client error ' + error);
           throw new Error(
             'There was an error updating the project. Please try again.'
           );
         });
     },

     ...
   ```

4. Shut down your backend API to test the display of an error message.

### &#10004; You have completed Lab 23

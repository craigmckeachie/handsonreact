---
title: 'Lab 7: Displaying List Data'
---

## Objectives

- [ ] Format the list data as list items
- [ ] Format the list data as cards

---

## Steps

### Format the list data as list items

1. **Modify** `src\projects\ProjectList.tsx` to format the project information into a `HTML` unordered list.

   ```html
   <ul>
     <li>Project Name 1</li>
     <li>Project Name 2</li>
   </ul>
   ```

   > Be sure to set a key for each list item.

#### `src\projects\ProjectList.tsx`

```diff
...

function ProjectList({ projects }: ProjectListProps) {
-  return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
+  return (
+    <ul className="row">
+      {projects.map((project) => (
+        <li key={project.id}>{project.name}</li>
+      ))}
+    </ul>
+  );
}

export default ProjectList;
```

2. Verify the project names display in the browser (they may overlap at this point).

### Format the list data as cards

1. **Update** `src\projects\ProjectList.tsx` to format the project information into a rows of cards that show additional project information using the `HTML` template below.

   ```html
   <div class="cols-sm">
     <div class="card">
       <img src="project image url" alt="project name" />
       <section class="section dark">
         <h5 class="strong">
           <strong>project name</strong>
         </h5>
         <p>project description</p>
         <p>Budget : project budget</p>
       </section>
     </div>
   </div>
   ```

   > Remember that you will need to replace attribute `class` with `className` and change html attributes from `src="project image url"` to `src={project.imageUrl}`.

   > **TIP:** Visual Studio Code has an extension [HTML to JSX](https://marketplace.visualstudio.com/items?itemName=riazxrazor.html-to-jsx) to do the attribute conversion.

   #### `src\projects\ProjectList.tsx`

   ```diff
   ...

   function ProjectList({ projects }: ProjectListProps) {
   -  return (
   -    <ul className="row">
   -      {projects.map((project) => (
   -        <li key={project.id}>{project.name}</li>
   -      ))}
   -    </ul>
   -  );
   }

   export default ProjectList;
   ```

   ```diff
   ...
   function ProjectList({ projects }: ProjectListProps) {
   +  return (
   +    <div className="row">
   +      {projects.map((project) => (
   +        <div key={project.id} className="cols-sm">
   +          <div className="card">
   +            <img src={project.imageUrl} alt={project.name} />
   +            <section className="section dark">
   +              <h5 className="strong">
   +                <strong>{project.name}</strong>
   +              </h5>
   +              <p>{project.description}</p>
   +              <p>Budget : {project.budget.toLocaleString()}</p>
   +            </section>
   +          </div>
   +        </div>
   +      ))}
   +    </div>
   +  );
   }

   export default ProjectList;
   ```

1. **Download** the code snippets, data, and images needed for the labs by **following these steps**.
   1. **Click** this **link** to open the [starter files repository](https://github.com/craigmckeachie/react-starter-files) on GitHub.
   2. **Click** the **Green Code button** then choose **Download ZIP**.
1. Open File Explorer (Windows) or Finder (Mac) and go to your `downloads` directory.
1. Unzip the file `react-starter-files-main.zip` archive you just downloaded.
1. If it doesn't already exist, **create** the directory `projectpilot\public`
1. **Copy** the `assets` directory (which has images used in the application) and its contents into the `projectpilot\public` directory.

   :::danger

   - Do not copy the assets into the `projectpilot\src\assets` directory. You want to place the images into `projectpilot\public\assets`

   :::

1. **Verify** the **project** **data** **displays** correctly in the browser.
   :::tip
   If the images aren't loading refresh your browser. Vite's reloading is fast but not perfect.
   :::

   ![image](https://user-images.githubusercontent.com/1474579/64892497-89d2f400-d642-11e9-84b2-ee9463c6192f.png)

<br/>

> Note you can use `toLocaleString` to format the project budget `number` in JavaScript.

```html
<p>Budget : {project.budget.toLocaleString()}</p>
```

> If you need to format something in React, ask yourself or `google.com`: How would I do this in JavaScript?

---

### &#10004; You have completed Lab 7

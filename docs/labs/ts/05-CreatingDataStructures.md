---
title: 'Lab 5: Data'
---

## Objectives

- [ ] Add data
- [ ] Display the data

## Steps

### Add data

1. **Download** the code snippets, data, and images needed for the labs by **following these steps**.
   1. **Click** this **link** to open the [starter files repository](https://github.com/craigmckeachie/react-starter-files) on GitHub.
   2. **Click** the **Green Code button** then choose **Download ZIP**.
   3. Unzip the file `starter-files-main.zip` archive you downloaded in the prior step.
1. Open File Explorer (Windows) or Finder (Mac).
1. **Copy** the `assets` directory and its contents into the `keeptrack\public` directory.
1. **Create** two files to be the model and the data and fill in the code as shown below.

   #### `src\projects\Project.ts`

   ```ts
   export class Project {
     id: number | undefined;
     name: string = '';
     description: string = '';
     imageUrl: string = '';
     contractTypeId: number | undefined;
     contractSignedOn: Date = new Date();
     budget: number = 0;
     isActive: boolean = false;
     get isNew(): boolean {
       return this.id === undefined;
     }

     constructor(initializer?: any) {
       if (!initializer) return;
       if (initializer.id) this.id = initializer.id;
       if (initializer.name) this.name = initializer.name;
       if (initializer.description) this.description = initializer.description;
       if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
       if (initializer.contractTypeId)
         this.contractTypeId = initializer.contractTypeId;
       if (initializer.contractSignedOn)
         this.contractSignedOn = new Date(initializer.contractSignedOn);
       if (initializer.budget) this.budget = initializer.budget;
       if (initializer.isActive) this.isActive = initializer.isActive;
     }
   }
   ```

   #### `src\projects\MockProjects.ts`

   ```ts
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

### Display the data

1. Open the file `src\projects\ProjectsPage.tsx`.
2. Use `JSON.stringify()` to output the `MOCK_PROJECTS` array from `MockProjects.ts` in the component.

   > **TIPS:**
   >
   > - React components can only return one root element so you will need to wrap the `<h1>` and `<pre>` tags in a React Fragement `<></>`.
   > - Wrapping output in a HTML `<pre></pre>` (preformatted) tag retains whitespace.
   > - To switch to JavaScript in JSX use `{ }`
   > - JSON.stringify(MOCK_PROJECTS, null, ' ')'s third argument is used to insert white space into the output JSON string for readability purposes.
   >   The second argument is a replacer function so we can pass null because we don't need to replace anything.

   ![image](https://user-images.githubusercontent.com/1474579/64889510-85efa380-d63b-11e9-8dc5-86f6dce8cec2.png)

   ### Solution

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   + import { MOCK_PROJECTS } from './MockProjects';

   function ProjectsPage() {
   - return  <h1>Projects</h1>
   +  return (
   +   <>
   +     <h1>Projects</h1>
   +    <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
   +   </>
   +  );
   }

   export default ProjectsPage;
   ```

---

### &#10004; You have completed Lab 5

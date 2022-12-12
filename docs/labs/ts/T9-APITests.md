---
title: 'Testing Lab 9: API Tests'
---

## Objectives

- [ ] Test the API

## Steps

### Test the API

1. Create the file `src\projects\__tests__\projectAPI-test.ts`.
1. Add the following code to test the updating of a project.

   #### `src\projects\__tests__\projectAPI-test.ts`

   ```ts
   import { MOCK_PROJECTS } from '../MockProjects';
   import { projectAPI } from '../projectAPI';

   describe('projectAPI', () => {
     test('should return records', () => {
       const response = new Response(undefined, {
         status: 200,
         statusText: 'OK',
       });
       response.json = () => Promise.resolve(MOCK_PROJECTS);
       jest
         .spyOn(window, 'fetch')
         .mockImplementation(() => Promise.resolve(response));

       return projectAPI
         .get()
         .then((data) => expect(data).toEqual(MOCK_PROJECTS));
     });
   });
   ```

1. Verify the test passes.

   ```shell
    PASS  src/projects/__tests__/projectAPI-test.ts
   ```

---

### &#10004; You have completed Lab 9

> Please let the instructor know you have completed this lab before continuing to the bonus exercise.

## Bonus Exercise (optional)

> Do this exercise in your own time outside of class or while waiting for other students to finish the labs.

Now that you have tested the `ProjectsPage` (plural), use what you have learned to test the `ProjectPage` (singular) code.

Not giving you specific directions on how to do this is intentional at this point. It is time to see if you can apply what you learned without specific guidance. Tip: Remember, it is perfectly valid to reference your existing code from the last few labs to complete this exercise.
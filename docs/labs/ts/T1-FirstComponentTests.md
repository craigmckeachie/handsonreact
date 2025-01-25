---
title: 'Testing Lab 1: Your First Component Test'
---

## Objectives

- [ ] Install React Testing Library
- [ ] Create Your First Component Test

## Steps

> This lab is designed to start with the code after finishing:
>
> **Lab 25: Redux with React**

### Install React Testing Library

1. Make a new directory in your code directory `testing`.
1. In that directory, download or clone the following branch to start testing.

   ```
   git clone https://github.com/craigmckeachie/keeptrack-ts.git keeptrack
   cd keeptrack
   git checkout lab25
   ```

   OR

   Visit [this link](https://github.com/craigmckeachie/keeptrack-ts/tree/testing-start) and click `Code > Download`

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `code\testing\keeptrack`.
<!-- 1.  You probably **DON'T need to DO the steps below** but they are listed for completeness.

    > If you recently created your React project using **Create React App** then the following steps to install **React Testing Library** will have been done for you when the project was created.

    - **Run** _one_ of the following sets of commands:

      #### npm

      ```shell
      npm install --save @testing-library/react @testing-library/jest-dom
      ```

      #### Yarn

      ```shell
      yarn add @testing-library/react @testing-library/jest-dom
      ```

    - Create the file `src\setupTests.ts`
    - Add the following code to configure enzyme.

      #### `src\setupTests.ts`

      ```ts
      // react-testing-library renders your components to document.body,
      // this adds jest-dom's custom assertions
      import '@testing-library/jest-dom/extend-expect';
      ``` -->

1. **Run** _one_ of the following commands to install the project dependenciess:

   #### npm

   ```shell
   npm install
   ```

   #### Yarn

   ```shell
   yarn install
   ```

1. **Run** _one_ of the following commands to run the tests:

   #### npm

   ```shell
   npm test
   ```

   #### Yarn

   ```shell
   yarn test
   ```

1. Press `a` to run all tests.
1. Verify the test created by Create React App fails.

   ```shell
   FAIL  src/App.test.tsx
   Unable to find an element with the text: /learn react/i.
   ```

1. Open the `keeptrack` directory in the editor of your choice and then open the file `src/App.test.tsx`
1. Update the test code.

   ```diff
   import React from 'react';
   import { render } from '@testing-library/react';
   import App from './App';

   - test('renders learn react link', () => {
   -  const { getByText } = render(<App />);
   -  const linkElement = getByText(/learn react/i);
   -  expect(linkElement).toBeInTheDocument();
   -});

   + test('should render without crashing', () => {
   + render(<App />);
   + });

   ```

   > Note: We will test the the content (as the generated test was) in a HomePage component test in the next step.

1. Verify the test now passes.

   ```
   PASS  src/App.test.tsx
   ```

### Create Your First Component Test

1. Create the file `src\home\HomePage.test.tsx`.
1. Add a test to verify the component shallow renders without crashing.

   #### `src\home\HomePage.test.tsx`

   ```ts
   import React from 'react';
   import { render, screen } from '@testing-library/react';
   import HomePage from './HomePage';

   test('renders home heading', () => {
     render(<HomePage />);
     expect(screen.getByRole('heading')).toHaveTextContent('Home');
   });
   ```

1. Verify the test passes.

   ```shell
   PASS  src/home/HomePage.test.tsx
   ```

---

### &#10004; You have completed Testing Lab 1

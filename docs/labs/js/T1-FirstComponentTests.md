---
title: "Testing Lab 1: Your First Component Test"
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
   git clone https://github.com/craigmckeachie/keeptrack-js.git keeptrack
   cd keeptrack
   git checkout lab25
   ```

   OR

   Visit [this link](https://github.com/craigmckeachie/keeptrack-js/tree/lab25) and click `Code > Download`

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `code\testing\keeptrack`.

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
   FAIL  src/App.test.js
   Unable to find an element with the text: /learn react/i.
   ```

1. Open the `keeptrack` directory in the editor of your choice and then open the file `src/App.test.js`
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
   PASS  src/App.test.js
   ```

### Create Your First Component Test

1. Create the file `src\home\HomePage.test.js`.
1. Add a test to verify the component shallow renders without crashing.

   #### `src\home\HomePage.test.js`

   ```js
   import React from "react";
   import { render, screen } from "@testing-library/react";
   import HomePage from "./HomePage";

   test("renders home heading", () => {
     render(<HomePage />);
     expect(screen.getByRole("heading")).toHaveTextContent("Home");
   });
   ```

1. Verify the test passes.

   ```shell
   PASS  src/home/HomePage.test.js
   ```

---

### &#10004; You have completed Testing Lab 1

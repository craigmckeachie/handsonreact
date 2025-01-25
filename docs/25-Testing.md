---
title: Testing
sidebar_label: Testing
slug: /testing
---

## Tools

### Jest

- Jest is a **JavaScript** testing framework
- Created by Facebook

Features:

- task runner
- assertion library
- mocking support
- snapshots
- isolated, paraellelized tests to maximize performance

Tools with similar scope include:

- Jasmine a JavaScript testing framework
- JUnit a Java testing framework
- NUnit a .NET testing framework

### React Testing Library

- React Testing Library is a library for testing **React Components**
- Resembles the way the components are used by end users
- It works more directly with DOM nodes, and therefore it's recommended to use with jest-dom for improved assertions.
- Created by Kent C. Dodds
- React Testing Library and Enzyme are alternatives for doing the same thing.
- Its primary guiding principle is:
  > The more your tests resemble the way your software is used, the more confidence they can give you.
- I recommend React Testing Library because of it's focus on not testing code implementation details

  Features:

  - Work with actual DOM nodes.
  - The utilities this library provides facilitate querying the DOM in the same way the user would.
    - Finding form elements by their label text (just like a user would)
    - Finding links and buttons from their text (like a user would).
    - Encourages your applications to be more accessible

### Enzyme

- Enzyme is a library for testing **React Components**
- Provides testing utilities for React
- Created by Airbnb
- Enzyme uses the React Test Utilities (from the React team at Facebook) underneath, but is more convenient, readable, and powerful.
- Enzyme and React Testing Library are alternatives for doing the same thing.

  Features:

  - renders a react component into a document
  - shallow component rendering
    - doesn't render child components
  - full (mount) component rendering
    - renders children: useful when
      - components interact with DOM API
      - need to test component lifecycle
  - query the DOM
    - similar to jQuery
  - simulates events

### Jest DOM

- Custom jest **matchers** to test the state of the DOM
- Examples: `toHaveTextContent`,`toHaveValue`,`toHaveClass`

### ReactTestUtils

- Is part of `react` more specifically `react-dom`
  ```
  import ReactTestUtils from 'react-dom/test-utils';
  ```
- It is the low level library that **Enzyme** uses internally

### JSDOM

- JavaScript implementation of the DOM (Document object model)
- JavaScript based headless browser that can be used to create a realistic testing environment
- Used by default by React Testing Library
- While Jest provides browser globals such as window thanks to jsdom, they are only approximations of the real browser behavior.
- Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

---

## Syntax

- tests: test() or it()
  ```js
  test('test name', () => {
    //implement test
  });
  ```
- suites: describe()

  ```js
  describe('suite name', () => {
    test('test1 name', () => {
      //implement test
    });

    test('test2 name', () => {
      //implement test
    });
  });
  ```

- assertions: expect().toBe()...

  ```js
  test('test name', () => {
    expect(sum(1, 1)).toEqual(2);
  });
  ```

> [Here is the documentation for all assertion matchers](https://jestjs.io/docs/en/expect.html)

> Common question:
> What is the difference between `toBe` and `toEqual`?
>
> - `toBe()` is shallow equality
> - `toEqual()` is deep equality

- spies/mock functions: jest.fn()

  > [Jest Mock Functions Documentation](https://jestjs.io/docs/en/mock-functions)

## JavaScript Tests

:::info
In this section, you will use [Create React App](https://facebook.github.io/create-react-app/) to create a React application. Create React App is no longer actively maintained but it is an easy way to create a React application that is already setup to do testing with Jest and React Testing Library. The rest of this course has been updated to use the maintained and modern Vite project to create your react application but I continue to include this section because their are millions of applications that are still being maintained that were created using Create React App and use Jest as the JavaScript testing library.
:::

1. Open a command prompt or terminal and run the commands:

### npm

```sh
npx create-react-app my-app --use-npm
cd my-app
npm start
```

### Yarn

```sh
yarn create react-app my-app
```

1. Open the `my-app` project in your editor of choice
2. Create the file `src\math.js`.
3. Add the following code

   #### `src\math.js`

   ```js
   export function add(a, b) {
     return a + b;
   }
   ```

4. Create the file `math.test.js`

5. Add the following code

   #### `src\math.test.js`

   ```js
   import { add } from './math';

   test('add numbers', () => {
     expect(add(1, 1)).toEqual(2);
     expect(add(2, 2)).toEqual(4);
   });
   ```

   > Be sure to include the `import` statement.

6. Open a command prompt or terminal in the `my-app` directory and run the tests

   ```js
   npm test
   ```

7. The test should pass.

   ```
   PASS  src/math.test.js
   ```

8. Type `w` to show more commands.

```
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

1. Try out the various commands

## Mocking

### Mocking Modules

If we want to mock out the `math` module we could do the following:

1. Create the directory `src\__mocks__`.
1. Create the file `src\__mocks__\math.js`.
1. Create the mock math module.

#### `src\__mocks__\math.js`

```js
export function add(a, b) {
  return 2;
}
```

3. Mock the actual implementation and return the expected values.

#### `rc/math.test.js`

```diff
import { add } from './math';
+ jest.mock('./math');

test('add numbers', () => {
  expect(add(1, 1)).toEqual(2);
  expect(add(2, 2)).toEqual(4);
});
```

> Notice we are able to return values regardless of the inputs because we are mocking the module.

#### console output

```diff
Expected: 4
    Received: 2

      3 | test('should add numbers', () => {
      4 |   expect(add(1, 1)).toEqual(2);
    > 5 |   expect(add(2, 2)).toEqual(4);
        |                     ^
      6 | });
      7 |

      at Object.<anonymous> (src/math.test.js:5:21)

Test Suites: 1 failed, 1 passed, 2 total
```

> Jest works based on the convention that if you create the mock module in a `__mocks__` directory next to the actual module and then call `jest.mock(./my-module)` the actual implementation will be replaced with your mock code.

But we can't meet both of our original expectations `2` and `4` because the mock is hard-coded to return the value `2`.

### Mocking Functions

To solve this we can mock not only the module but the `add` function as follows:

1. Replace the `add` function with a Jest mock function.

   #### `src\__mocks__\math.js`

   ```diff
   export const add = jest.fn();
   - export function add(a, b) {
   -  return 2;
   - }
   ```

1. Mock the return values.

   #### `src\math.test.js`

   ```diff
   import { add } from './math';
   jest.mock('./math');

   test('add numbers', () => {
   +  add.mockReturnValueOnce(2);
   +  add.mockReturnValueOnce(4);
      expect(add(1, 1)).toEqual(2);
     expect(add(2, 2)).toEqual(4);
   });
   ```

1. Now both expectations pass.

   ```shell
   PASS  src/math.test.js
   ```

With our current implementation if we call the `add` function a third time we get `undefined` because no `default` implementation is defined.

1. Add another assertion.

   #### `src\math.test.js`

   ```diff
   import { add } from './math';
   jest.mock('./math');
   test('add numbers', () => {
     add.mockReturnValueOnce(2);
     add.mockReturnValueOnce(4);
     expect(add(1, 1)).toEqual(2);
     expect(add(2, 2)).toEqual(4);
   +  expect(add(1,1)).toEqual(2)
   });
   ```

2. Verify the test fails.

   ```shell
   FAIL  src/math.test.js
     ● add numbers

       expect(received).toEqual(expected) // deep equality

       Expected: 2
       Received: undefined

         6 |   expect(add(1, 1)).toEqual(2);
         7 |   expect(add(2, 2)).toEqual(4);
       > 8 |   expect(add(1,1)).toEqual(2)
           |                    ^
         9 | });

         at Object.toEqual (src/math.test.js:8:20)
   ```

3. Define a default implementation for our mock function. Below we define a default implementation to always return `42`.

   #### `src\math.test.js`

   ```diff
   import { add } from './math';
   jest.mock('./math');
   test('add numbers', () => {
     add.mockReturnValueOnce(2;
     add.mockReturnValueOnce(4);
   +  add.mockReturnValue(42);
     expect(add(1, 1)).toEqual(2);
     expect(add(2, 2)).toEqual(4);
   +  expect(add(2, 2)).toEqual(42);
   +  expect(add(1, 1)).toEqual(42);
   });
   ```

4. Verify the default implementation works on subsequent calls.

   ```shell
   PASS  src/math.test.js
   ```

> [To learn more about mock functions vistit the official documentation](https://jestjs.io/docs/en/mock-functions).

## Debugging Tests

### Debugging Tests in Chrome

1. Add the following to the `scripts` section in your project's `package.json`

   #### `package.json`

   ```json
   "scripts": {
       "test:debug": "react-scripts --inspect-brk test --runInBand --no-cache"
     }
   ```

1. Place `debugger;` statements in your test.

   #### math.test.js

   ```diff
   test('add numbers', () => {
   +  debugger;
     expect(add(1, 1)).toEqual(2);
     expect(add(2, 2)).toEqual(4);
   });
   ```

1. Run the command.

   ```sh
   npm run test:debug
   ```

   > This will start running your Jest tests, but pause before executing to allow a debugger to attach to the process.

1. Open the following in Chrome

   ```
   about:inspect
   ```

1. Choose the inspect link next to the process you want to debug.

1. After opening that link, the Chrome Developer Tools will be displayed.

1. Select `inspect` on your process and a breakpoint will be set at the first line of the react script (this is done simply to give you time to open the developer tools and to prevent Jest from executing before you have time to do so).

   > Be patient waiting for the breakpoint to be hit it takes awhile.

1. Click the button that looks like a "play" button in the upper right hand side of the screen to continue execution. When Jest executes the test that contains the debugger statement, execution will pause and you can examine the current scope and call stack.

> Note: the --runInBand cli option makes sure Jest runs test in the same process rather than spawning processes for individual tests. Normally Jest parallelizes test runs across processes but it is hard to debug many processes at the same time.

### Debugging Tests in Visual Studio Code

Debugging Jest tests is supported out of the box for [Visual Studio Code](https://code.visualstudio.com).

Use the following [`launch.json`](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) configuration file:

1. Click `Debug > Start Debugging > Choose 'Node'` as the configuration type and add the configuration below.

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug CRA Tests",
         "type": "node",
         "request": "launch",
         "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
         "args": ["test", "--runInBand", "--no-cache", "--watchAll=false"],
         "cwd": "${workspaceRoot}",
         "protocol": "inspector",
         "console": "integratedTerminal",
         "internalConsoleOptions": "neverOpen"
       }
     ]
   }
   ```

### Running One Test

If your test name is unique, you can enter `t` while in watch mode and enter the name of the test you'd like to run.

### Excluding Tests

You can replace `it()` with `xit()` (or `test()` with `xtest()`) to temporarily exclude a test from being executed.

[Reference](https://facebook.github.io/create-react-app/docs/debugging-tests)

## Component Tests (with React Testing Library)

> React Testing Library is now installed by default in Create React App projects but if you have a project created before this change or not using Create React App then you follow these steps to install it.

1. **Install** React Testing Library

   #### npm

   ```shell
   npm install --save @testing-library/react @testing-library/jest-dom
   ```

   Alternatively you may use `yarn`:

   #### Yarn

   ```shell
   yarn add @testing-library/react @testing-library/jest-dom
   ```

1. Create the file `src/setupTests.js` (if it doesn't already exist)

1. Add the following code:

   #### `src/setupTests.js`

   ```js
   // this adds jest-dom's custom assertions
   import '@testing-library/jest-dom/extend-expect';
   ```

1. Review the generated test to see how.

   #### `src/App.test.js`

   ```js
   import React from 'react';
   import { render, screen } from '@testing-library/react';
   import App from './App';

   test('renders learn react link', () => {
     render(<App />);
     const linkElement = screen.getByText(/learn react/i);
     expect(linkElement).toBeInTheDocument();
   });
   ```

### React Testing Library Tips

- Use [screen.debug()](https://testing-library.com/docs/dom-testing-library/api-queries#screendebug) to see the HTML markup you are trying to select using various queries.
- Paste the HTML output of `screen.debug()` into the left panel on the [testing-playground.com](https://testing-playground.com/) to see which queries you should use to access a given element.
- If the query supplied is not good consider that the markup in your app is not accessible and endevour to learn more about accessibility.
  > Even if you don't care about accessibility your tests will become more reliable and less brittle by embracing it.
- Prefer ByRole
  - [More details on which query to use can be found here](https://testing-library.com/docs/queries/about#priority).
  - > Note: Be sure to click on the button not the text of the button to get the correct query ByRole on the [testing-playground.com](https://testing-playground.com/).
- Understand the difference between `find` versus `get` methods.
  - `find` awaits, `get` doesn't
  - [Queries](https://testing-library.com/docs/react-testing-library/cheatsheet#queries)
- async await
- React Testing Library does not encourage you to mock child components so often you are writing integration tests instead of unit tests.
- Test components that use APIs with `msw`
- [Which query to use for React Testing Library?](https://testing-library.com/docs/guide-which-query)
- Accessibility Cheat Sheet for, id role button, role form requires name, role alert

## Components Tests (with Enzyme)

Different ways to test:

- smoke
- shallow
- full

### Smoke

A `smoke test` just verifies that component renders without throwing.

### Shallow

Shallow testing tests a component in isolation from the child components it renders.

This requires the [`shallow()` rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) from [Enzyme](https://airbnb.io/enzyme/).

1. To install it, run:

   ```sh
   npm install --save enzyme enzyme-adapter-react-16 react-test-renderer
   ```

   Alternatively you may use `yarn`:

   ```sh
   yarn add enzyme enzyme-adapter-react-16 react-test-renderer
   ```

2. Also install the types:

   ```sh
   npm install @types/enzyme @types/react-test-renderer --save-dev
   ```

   As of Enzyme 3, you will need to install Enzyme along with an Adapter corresponding to the version of React you are using. (The examples above use the adapter for React 16.)

   The adapter will also need to be configured in your [global setup file]:

3. Create the file `src/setupTests.js`

4. Add the following code:

   ```js
   // src/setupTests.js
   import { configure } from 'enzyme';
   import Adapter from 'enzyme-adapter-react-16';

   configure({ adapter: new Adapter() });
   ```

5. Stop `npm test` using `Ctrl+C`
6. Run the command `npm test` so it configures the adapter
7. Add the following test

   ```js
   // src/App.test.js
   ...

   //shallow
   import { shallow } from 'enzyme';
   test('shallow renders without crashing', () => {
     shallow(<App />);
   });
   ```

8. You should see an additional test passing.

## Component Snapshot Tests (with Jest)

Snapshot testing is a feature of Jest that automatically generates text snapshots of your components and saves them on the disk so if the UI output changes, you get notified without manually writing any assertions on the component output. [Read more about snapshot testing](https://jestjs.io/blog/2016/07/27/jest-14.html).

> .. avoid huge snapshots and take smaller, more focused ones. While you're at it, see if you can actually change it from a snapshot to a more explicit assertion (because you probably can 😉). - Kent C Dodds

Snapshot testing requires you to install the `react-test-renderer` which you may have already done for the Enzyme shallow testing section but if you skipped it you will need to install it now.

The `react-test-renderer` library allows you to render React components as JavaScript objects without using the DOM which improves performance of these tests.

1.  If you haven't previously install the `react-test-renderer`.
    ```
    npm install react-test-renderer
    ```
2.  Add the following test

    #### `src\App.test.[js|tsx]`

    ```js
    //snapshot
    import renderer from 'react-test-renderer';
    test('has a valid snapshot', () => {
      const component = renderer.create(<App />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    ```

    > Normally you wouldn't snapshot the `App` component since it contains all other components

3.  Open the file `src/__snapshots__\App.test.[js|tsx].snap`
4.  Update `src/App.js`.

    #### `src/App.js`

    ```diff
    function App() {
    return (
        <div className="App">
        <header className="App-header">
    +        <h1>Welcome to React</h1>
            <img src={logo} className="App-logo" alt="logo" />
    ```

5.  See the message below.
    ```shell
     › 1 snapshot failed.
    Snapshot Summary
    › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them.
    ```
6.  Press `u` to update the snapshot.

## Reference

### General

- [React Documentation: Test Utilities](https://reactjs.org/docs/test-utils.html)
- [Unit vs Integration vs E2E](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests)

### Jest

- [Jest: JavaScript Testing Framework](https://jestjs.io/)
- [Jest Mocking & Spies](https://jestjs.io/docs/en/mock-functions)
- [Handling Async in Jest](https://jestjs.io/docs/en/asynchronous)
- [What is the difference between jest.fn() and jest.spyOn() methods in jest?](https://stackoverflow.com/questions/57643808/what-is-the-difference-between-jest-fn-and-jest-spyon-methods-in-jest)
- [Jest Matchers](https://jestjs.io/docs/en/expect.html)
- [Jest DOM: Jest Matchers for the DOM](https://github.com/testing-library/jest-dom)
- [Testing React Apps (with Jest)](https://jestjs.io/docs/en/tutorial-react)
- [Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing)

### React Testing Library

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)
- [Confident React – Kent C. Dodds on Frontend Visual Testing](https://applitools.com/blog/react-kent-c-dodds-frontend-visual-testing/)

### Enzyme

- [Enzyme: JavaScript Testing Utilities for React](https://airbnb.io/enzyme/)
- [Difference Between Jest & Enzyme](https://stackoverflow.com/questions/42616576/what-is-the-difference-between-jest-and-enzyme)

### Create React App & Tests

- [Create React App Docs: Running Tests](https://facebook.github.io/create-react-app/docs/running-tests)
- [Create React App Docs: Debugging Tests](https://facebook.github.io/create-react-app/docs/debugging-tests)
- [Create React App Docs: Code Coverage](https://facebook.github.io/create-react-app/docs/running-tests#coverage-reporting)

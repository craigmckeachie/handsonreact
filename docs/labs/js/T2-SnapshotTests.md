---
title: 'Testing Lab 2: Snapshot Tests'
---

## Objectives

- [ ] Install React's Test Renderer
- [ ] Create Your First Snapshot Test

## Steps

### Install React's Test Renderer

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `code\projectpilot`.
1. **Run** _one_ of the following sets of commands:

   #### npm

   ```shell
   npm i react-test-renderer --save-dev
   npm i @types/react-test-renderer --save-dev
   ```

   #### Yarn

   ```shell
   yarn add react-test-renderer
   yarn add @types/react-test-renderer --save-dev
   ```

### Create Your First Snapshot Test

1. Add a snapshot test for the component. Organize the tests in a suite (describe function).

   #### `src\home\HomePage.test.js`

   ```diff
   import React from 'react';
   import HomePage from './HomePage';
   + import renderer from 'react-test-renderer';

   + describe('<HomePage />', () => {

     test('should render without crashing', () => {
       render(<HomePage />);
     });

   +  test('snapshot', () => {
   +    const tree = renderer.create(<HomePage />).toJSON();
   +    expect(tree).toMatchSnapshot();
   +  });

   + });
   ```

1. Verify the snapshot is created.

   ```shell
    › 1 snapshot written.
   ```

1. **Open** `src\home\__snapshots__\HomePage.test.js.snap` and review the contents.

---

### &#10004; You have completed Testing Lab 2

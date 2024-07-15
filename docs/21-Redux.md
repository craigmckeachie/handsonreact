---
title: Redux
sidebar_label: Redux
slug: /redux
---

## What is Redux?

- Redux is an open-source JavaScript library for managing application state
- Commonly used with libraries such as React or Angular for building user interfaces.
- Similar to (and inspired by) Facebook's Flux architecture, it was created by Dan Abramov and Andrew Clark.

## Architecture

- The primary reason you need Redux is to help share data and functions between components in your application which are in different parts of the component tree and not immediate relatives
- The sharing between components is achieved by pulling data and functions out of the components and into a shared object (Store) that is not a component
- You may need Redux for other reasons
- These other reasons you need Redux are a lot less common than most people will lead you to believe.
- Again, it is mostly needed to share data (state) and functions (dispatch actions) in an application. This problem is often described as:
  - Avoiding Prop Drilling
  - Handling shared mutable state
  - Component Communication
- The shared object (Store) is made available to parts of the application by wrapping it in custom element or tag (React Component) called a provider (because it provides the data and functions).

### Component Diagram no Redux

![component diagram before redux](https://user-images.githubusercontent.com/1474579/188503473-49c049eb-4d0d-4f3d-b871-06410a3eeed6.png)

### Component Diagram with Redux

![component diagram with redux](https://user-images.githubusercontent.com/1474579/188503591-4473d9d5-85fe-469a-b1ea-c01fdcc6cefd.png)

## Component State vs. Redux State

### Component State

- values stored in `React state` using `useState` hook
- local, encapsulated, private

## Redux State

- values store in `Redux state` inside the `Store`
- shared, global, public
- remember shared `state` can have a broader definition to mean within a branch of a component tree (a page component and it's children components)
  - this means that the same data you stored in `React state` may be promoted to `Redux state` for convenience (easier component communication)

## What is State?

- State: the particular condition that something is in at a specific time.
- Application State (also known as Program State)
  - Represents the totality of everything necessary to keep your application running
  - The state of the program/application as it exists in the contents of its memory
  - In any given point in time, there is a different information stored in the memory of your web application
  - Can be accessed via your variables, classes, data structures, etc.
  - All the stored information, at a given instant in time, is called the application state
- Examples of Application State
  - The current URL of a web page
  - The displayed data often returned from a call to a web API using HTTP
  - How the data is currently sorted or filtered
  - Whether a user is logged in and their associated profile data
  - Whether a navigation menu is currently open and displayed or hidden
- What to Store in State?
  - Shared data
    - Does the data matter to the application as a whole?
      - Examples: signed in user and their associated permissions/role, theme, language
    - Are there other components that may benefit from this global accessible shared data?
      - To most people shared data includes sharing in the same component tree branch which can help avoid prop drilling
        - Examples: Page/Container component as well as list, detail, and form components
- What Not to Store in State
  - Form Data
    - As you are editing the form
    - Before the data is persisted (saved more permanently)
    - Includes validation messages
  - URLs/Routes
    - In general, most people do not put this data into state
    - That said, there are libraries to enable routes to be stored in Redux state

## Benefits

- **Predictable state updates** make it easier to understand how the data flow works in the application
- The use of **"pure" reducer functions** makes logic **easier to test**, and **enables** useful features like "time-travel **debugging**".
- **Centralizing the state** makes it easier to implement things like logging changes to the data, or persisting data between page refreshes

### Benefit Checklist

- Explicit state, predictable state, repeatable trail of state
- Performance
- Testability
- Debugging/Tooling
  - Time travel debugging
  - Record/Replay
  - Hot reloading
    - Refreshes files that were changed without losing the state of the app
- Component Communication

> "Redux is not great for making simple things quickly.
> It's great for making really hard things simple." - Jani Evakallio

## When do you need Redux?

- Persist state to a local storage on the client and then boot up from it, out of the box.
- Pre-fill state on the server, send it to the client in HTML, and boot up from it, out of the box.
- Serialize user actions and attach them, together with a state snapshot, to automated bug reports, so that the product developers can replay them to reproduce the errors.
- Pass action objects over the network to implement collaborative environments without dramatic changes to how the code is written.
- Maintain an undo history or implement optimistic mutations without dramatic changes to how the code is written.
- Travel between the state history in development, and re-evaluate the current state from the action history when the code changes, a la TDD.
- Provide full inspection and control capabilities to the development tooling so that product developers can build custom tools for their apps.
- Provide alternative UIs while reusing most of the business logic.

## Principles of Redux

1. Single source of truth

- The whole state of your app is stored in an object tree inside a single store.
- Describe application state as plain objects and arrays.

```js
let appState = {
  todos: [
    { text: 'Consider using Redux', completed: true },
    { text: 'Keep all state in a single tree', completed: false },
  ],
  visibilityFilter: 'SHOW_ALL',
};
```

2. State is read-only

- The only way to change the state tree is to emit an action, an object describing what happened
- Describe changes in the system as plain objects.

```js
store.dispatch({ type: 'ADD_TODO', text: 'Learn Redux' });
```

3. Changes are made with pure functions

- To specify how the actions transform the state tree, you write pure reducers.
- You describe the logic for handling changes as pure functions
  ```js
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_PHOTOS_REQUEST':
        return { ...state, processing: true };
      case 'LOAD_PHOTOS_SUCCESS':
        return { ...state, processing: false, photos: action.payload };
      case 'LOAD_PHOTOS_FAILURE':
        return { ...state, processing: false, error: action.payload.message };
      default:
        return state;
    }
  }
  ```

## Core Concepts

### State

- The application data
  - as it exists in the contents of its memory
- We define
  - the shape of the data
  - initial values
- State is held by the Store
  ```js
  let appState = {
    todos: [
      { text: 'Consider using Redux', completed: true },
      { text: 'Keep all state in a single tree', completed: false },
    ],
    visibilityFilter: 'SHOW_ALL',
  };
  ```

### Actions

- Actions

  - a custom event (action) that is raised (dispatched)
  - an plain JavaScript object with a `type` property
  - other than `type`, the structure of an action object is really up to you
  - typically there is one other property `payload` where other information is passed

- Action Types
  - types should typically be defined as string constants
  - action type names take the form of
    - VERB**ENTITY**[ REQUEST | SUCCESS | FAILURE | ]
    - Examples:
      - LOAD_PHOTOS_REQUEST
      - LOAD_PHOTOS_SUCCESS
      - LOAD_PHOTOS_FAILURE

```js
const ADD_TODO = 'ADD_TODO'
{ type: ADD_TODO, payload: {text: 'Learn Redux'} }
```

- Action Creators

  - functions that create actions
  - makes them portable and easier to test
  - useful when doing async

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
```

### Reducer

- a function
  - takes two parameters: `state` and `action`
  - returns a new state
- typically just a switch statement
- immutable
  - so the debugging features work correctly
- always set the default state
  - handled in the `default` case of the switch statement
- when you want to split your data handling logic, you'll create multiple reducers and compose them into one higher level reducer

### Store

- the `Store` is the object that enables the other concepts to work together
- the `Store` has the following responsibilities:
  - Holds application state
  - Allows access to state via `getState()`
  - Allows state to be updated via `dispatch(action)`
  - Registers listeners via `subscribe(listener)`
  - Handles unregistering of listeners via the function returned by `subscribe(listener)`

### Developer Tools

Enables a richer debugging experience including:

- logging
- time travel

utilize browser debugging tools that understand redux and enable time-travel debugging and hot-reloading

Redux DevTools can be extremely helpful as the number of HTTP calls for a given screen grows and it becomes necessary to coordinate the order in which those calls return.

## Complementary Packages

Redux by itself is often not enough to build a real application. You will need to use complementary packages to:

- have async actions...actions that make AJAX/http calls (Redux Thunk)
- easily use the library with React without unnecessarily coupling the libraries (React Redux)

The next few chapters provide more detail on each of these commonly used complementary packages.

## Demos

### Counter Demo

1. Install

```bash
npm install redux@4 react-redux@8 redux-devtools-extension redux-thunk@2
npm install --save-dev @types/react-redux@8
```

2.  Add scripts

```diff
<script src="/node_modules/react-router-dom/umd/react-router-dom.js"></script>
+ <script src="/node_modules/redux/dist/redux.js"></script>
+ <script src="/node_modules/redux-thunk/dist/redux-thunk.js"></script>
+ <script src="/node_modules/react-redux/dist/react-redux.js"></script>
...
```

3. Add the following code to `main.js`

```js
//action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//action creators
function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

//reducer
function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

//store
var store = Redux.createStore(reducer);

function logState() {
  console.log(store.getState().toString());
}

store.subscribe(logState);

store.dispatch({ type: '' });
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
```

4. If your web server is not running, start it up:

```bash
npm start
```

5. Open `http://localhost:5000/` in your browser
6. You should see the following output

```bash
0
1
2
1
```

### Debugging & Time Traveling Demo

1. Install the [Redux DevTools Extension in Chrome by following these directions](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
2. Configure your store to use the extension

```js
// var store = Redux.createStore(reducer);
var store = Redux.createStore(reducer, enableDevTools());

function enableDevTools() {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
```

3. Open the Chrome DevTools
4. Click on the Redux Tab

> In a Create React App you would:
>
> ```bash
> npm install --save-dev redux-devtools-extension
> ```

> Then configure your store to use the extension by [following these directions](https://redux.js.org/recipes/configuring-your-store#integrating-the-devtools-extension)

## Pseduo-code Redux

> Note: the example code below will not actually run. It is meant to be pseduo-code to demonstrate how Redux is implemented.

#### main.js

```js
const { createStore } = require('redux');

//action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//action creators
function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

//reducer
function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

//store
// var store = Redux.createStore(reducer);

class Store {
  _state = {};
  reducer;

  constructor(reducer) {
    this.reducer = reducer;
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    let state = reducer(_state, action);
    this.callbackFn(state);
  }

  subscribe(callbackFn) {
    this.callbackFn = callbackFn;
  }
}

function createStore(reducer) {
  let store = new Store(reducer);

  return store;
}

function logState() {
  console.log(store.getState().toString());
}

store.subscribe(logState);

store.dispatch({ type: 'innncrement' });
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
```

## Gotchas/Tips

- In practice, the reducer and the state property that is computed by the reducer have the same name

## Reference

### Redux

- [Documentation](https://redux.js.org/)
- [Redux creator Dan Abramov's free "Getting Started with Redux" video series](https://egghead.io/courses/getting-started-with-redux)
- [Examples](https://redux.js.org/introduction/getting-started#examples)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

### Action Creators:

- [Simple Naming Convention for Action Creators](https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/)
- [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)
- [Should I use Action Creators](https://redux.js.org/faq/code-structure#why-should-i-use-action-creators)

### DevTools

- [Should you use in production](https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f)

#### Configuring devtools & thunk

- [Advanced Store Setup](https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup)
- [Configuring Redux Devtools using UMD Build](https://github.com/jhen0409/react-native-debugger/issues/280#issuecomment-432298556)
- [Problems with this Approach to Configuring Your Store](https://redux.js.org/recipes/configuring-your-store#problems-with-this-approach)

Repositories

- [Browser Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [npm Package to integrate in your app](https://github.com/reduxjs/redux-devtools/tree/master/packages/redux-devtools)
- [MonoRepo for the redux library itself, the browser extension, and npm package to integrate -- not clear if this is finished](https://github.com/reduxjs/redux-devtools)
- [Differences between parts of DevTools](https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md)
- [Understanding the Dislike of Redux](https://medium.com/@json.yung/understanding-why-react-developers-may-dislike-redux-f71867b98f79)

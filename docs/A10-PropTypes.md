---
id: A10-PropTypes
title: PropTypes
sidebar_label: PropTypes
slug: /prop-types
---

## Summary

Runtime type checking for React props and similar objects.

## Overview

As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use `JavaScript` extensions like `Flow` or `TypeScript` to typecheck your whole application.

But even if you don’t use those, the `React.PropTypes library` offers some crucial typechecking abilities.

`PropTypes` was originally exposed as part of the React core module, and is commonly used with React components to type check props.

`React.PropTypes` has moved into a different package since `React v15.5`. Please use the `prop-types` library instead.

## Installation

```shell
npm install --save prop-types
```

#### `index.html`

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Learning React</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/node_modules/react/umd/react.development.js"></script>
    <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>
+    <script src="/node_modules/prop-types/prop-types.js"></script>
  </body>
</html>
```

> In Create React App, where you would be using ES Modules you will need to `import PropTypes from "prop-types;"` but you do not need to in this demonstration.

## Usage

1. Add the following code with the `propTypes` declaration commented out and don't pass the required `name` prop as shown below:

   #### `main.js`

   ```js
   function Greeter(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   // Greeter.propTypes = {
   //  name: PropTypes.string.isRequired,
   // };

   const element = <Greeter />;
   ReactDOM.createRoot(document.getElementById("root")).render(element);
   ```

1. Notice it runs without an error.
1. Uncomment the `propTypes` declaration.

   #### `main.js`

   ```js
   function Greeter(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   Greeter.propTypes = {
     name: PropTypes.string.isRequired,
   };

   const element = <Greeter name="Joe" />;
   ReactDOM.createRoot(document.getElementById("root")).render(element);
   ```

1. Notice you receive a helpful warning message in the console.
1. Pass the `name` property the string `Srini`.

   #### `main.js`

   ```js
   function Greeter(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   Greeter.propTypes = {
     name: PropTypes.string.isRequired,
   };

   const element = <Greeter name="Srini" />;
   ReactDOM.createRoot(document.getElementById("root")).render(element);
   ```

1. Notice the code works and runs without any warning messages.
1. Pass the `name` property a number.

   #### `main.js`

   ```js
   ...
   const element = <Greeter name={1} />;
   ...
   ```

1. Notice you receive a helpful warning message in the console.

## Reference

- [PropTypes library on npm](https://www.npmjs.com/package/prop-types)
- [Official React Documentation on PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

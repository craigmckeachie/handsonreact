---
id: A13-RenderProps
title: Render Props
sidebar_label: Render Props
slug: /render-props
---

## Definition

> The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

## Demo

1. Create a Box component and render it

```js
function Box(props) {
  return (
    <div style={{ width: 100, height: 100, border: "1px solid black" }}>
      {props.render && props.render()}
    </div>
  );
}

function App() {
  return <Box />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

2. Tell the box what you want to render inside it

```diff
function App() {
+ return <Box render={() => <h3>Jack</h3>} />;
}
```

3. Use children instead of render

```diff
function Box(props) {
  return (
    <div style={{ width: 100, height: 100, border: '1px solid black' }}>
-     {props.render && props.render()}
+     {props.children}
    </div>
  );
}
```

4. Modify the code to tell the box what you want to render inside it

```js
// function App() {
//   return <Box render={() => <h3>Jack</h3>} />;
// }

function App() {
  return (
    <Box>
      <h3>Jack</h3>
    </Box>
  );
}
```

## Use Cases

Cross-Cutting Concerns

- When you have the need to share the state or behavior that one component encapsulates to other components that need that same state
- You can often get the same reuse out of your code using any of the following techniques
  - Higher-Order Components
  - Render Props
  - Custom Hooks

## Reference

- [Render Props: React Documentation](https://reactjs.org/docs/render-props.html)
- [Understanding React Render Props](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)
- [React Render Props Article](https://tylermcginnis.com/react-render-props/)

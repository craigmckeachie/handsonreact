---
id: A13-HigherOrderComponents
title: Higher-Order Components
sidebar_label: Higher-Order Components
slug: /higher-order-components
---

> A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

### Definition

Higher Order Component (HOC): an abstraction over a component. When given a component (and perhaps some other parameters), they return a new component.

From the perspective of the JavaScript language:

- _a higher-order component is a function that takes a component and returns a new component._

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### Simple HOC

1. Here is a simple example of a higher-order component (HOC). Paste the code below in `main.js`

````js
The `wrapper` function is the higher-order function or more specificlaly component in the code below.

```js
function Inner(props) {
  return <span>Inner</span>;
}

function wrapper(Inner, value) {
  function Outer(props) {
    return (
      <div>
        <h3>Outer</h3>
        <Inner {...props} /> <em>{value}</em>
      </div>
    );
  }
  return Outer;
}

const Outer = wrapper(Inner, 'Peace');

function App() {
  return <Outer />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
````

### Composition vs. HOCs

1. To better understand when to use HOCs it is helpful to compare them to using composition with components. Paste the code below in `main.js` to see how composition can be used to combine components.

```js
function Inner(props) {
  return <span>Inner</span>;
}

function Peace(props) {
  return <span>Peace</span>;
}

function Calm(props) {
  return <span>Calm</span>;
}

function Self(props) {
  return <span>Self</span>;
}

function EarInfection(props) {
  return <span>Ear Infection</span>;
}

function App() {
  return (
    <div>
      <Inner /> <Peace />
      <br />
      <Inner /> <Calm />
      <br />
      <Inner /> <Self />
      <br />
      <Inner /> <EarInfection />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

> The downside of this approach is that a new component needs to get created for each suffix. This is not a problem in the example above because the components are simple (one line) but as components become more complex this can become more onerous.

2. Using a Higher-order component (function)

The `wrapper` function is the higher-order function or more specifically higher-order component in the code below.

```js
function Inner(props) {
  return <span>Inner</span>;
}

function wrapper(Inner, value) {
  function Outer(props) {
    return (
      <div>
        <Inner {...props} /> <em>{value}</em>
      </div>
    );
  }
  return Outer;
}

const InnerPeace = wrapper(Inner, "Peace");
const InnerCalm = wrapper(Inner, "Calm");
const InnerSelf = wrapper(Inner, "Self");
const InnerEarInfection = wrapper(Inner, "Ear Infection");

function App() {
  return (
    <div>
      <InnerPeace />
      <InnerCalm />
      <InnerSelf />
      <InnerEarInfection />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

### Another Example

```js
function Greet(props) {
  return <span>Hi</span>;
}

function withName(Greet, name) {
  function Wrapper(props) {
    return (
      <div>
        <Greet {...props} /> <em>{name}</em>
      </div>
    );
  }
  return Wrapper;
}

const GreetWithName = withName(Greet, "Riya");

function App() {
  return <GreetWithName />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

### Use Cases

Cross-Cutting Concerns

- When you have the need to share the state or behavior that one component encapsulates to other components that need that same state
- Repeated Logic
  - Render table, given data in an Array
  - Show tooltip on hover of multiple components
- Adding additional props
- Decorating
- You can often get the same reuse out of your code using any of the following techniques
  - Higher-Order Components
  - Render Props
  - Custom Hooks

### Conventions

- Don’t Mutate the Original Component. Use Composition. (prototype)
- Convention: Pass Unrelated Props Through to the Wrapped Component
- Convention: [Wrap the Display Name for Easy Debugging](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)

### Reference

- [Higher-Order Components Documentation](https://reactjs.org/docs/higher-order-components.html)
- [Tutorial](https://www.codingame.com/playgrounds/8595/reactjs-higher-order-components-tutorial)
- [Example](https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006)
- [Higher Order Components Article](https://tylermcginnis.com/react-higher-order-components/)

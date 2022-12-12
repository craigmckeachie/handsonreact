---
id: SideEffectsLifecyle
title: Side Effects & Lifecyle
sidebar_label: Side Effects & Lifecyle
slug: /side-effects-lifecyle
---

## Side Effects (in function components)

Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. Whether or not you’re used to calling these operations “side effects” (or just “effects”), you’ve likely performed them in your components before.

### useEffect

This Hook should be used for any side-effects you’re executing in your render cycle.

### What does useEffect do?

By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.

### Using useEffect

`useEffect()` _takes_ a `function` as an input and _returns_ `nothing`.

The function it takes will be executed for you:

- after the render cycle
- after _every_ render cycle

| Lifecycle Methods     | Hook                                                                       | Renders                                                                      |
| --------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| componentDidMount     | `useEffect(()=>{ ... }`, [ ])                                              | after first render only                                                      |
| componentDidUpdate    | `useEffect(()=>{... }, [dependency1, dependency2])`                        | after first render AND subsequent renders caused by a change in a dependency |
| componentWillUnmount  | `useEffect(() => { ... return ()=> {...cleanup}})`                         |
| shouldComponentUpdate | no comparable hook, instead, wrap function component in `React.memo(List)` | renders only if a prop changes                                               |
| componentWillMount    | deprecated so no comparable hook                                           |
| componentWillUpdate   | deprecated so no comparable hook                                           |

### Example (after first render only)

Here is the the common use case example we saw in the state section. It has been updated to loadData after the initial rendering of the component.

```js
const { useState, useEffect } = React;

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  function loadData() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData([1, 2, 3, 4, 5]);
    }, 1000);
  }

  useEffect(loadData, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 1)}</pre>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### Example (after first render AND subsequent renders caused by a change in a dependency)

Here is the the common use case example we saw in the state section. It has been updated to loadData after the initial rendering of the component.

```js
const { useState, useEffect } = React;

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  function loadData() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (page === 1) {
        setData([1, 2, 3, 4, 5]);
      } else if (page === 2) {
        setData([6, 7, 8, 9, 10]);
      } else {
        setData(null);
      }
    }, 1000);
  }

  useEffect(loadData, [page]);

  function handleNext() {
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 1)}</pre>}
      <span>Current Page: {page}</span>
      <button onClick={handleNext}>Next</button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### useEffect Cleanup Example

```js
function Clock() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timerID = setInterval(refresh, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const refresh = () => {
    setTime(new Date().toLocaleTimeString());
  };

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
```

## Lifecycle (in class components)

### What are Lifecycle Methods

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM (mounting), when the component updates, and when the component gets unmounted or removed from the DOM.

> ## Understanding Mounting
>
> The main job of React is to figure out how to modify the DOM to match what the components want to be rendered on the screen.
>
> React does so by "mounting" (adding nodes to the DOM), "unmounting" (removing them from the DOM), and "updating" (making changes to nodes already in the DOM).
>
> This process of creating instances and DOM nodes corresponding to React components, and inserting them into the DOM, is called mounting.

#### React Lifecycle Methods Diagram: Common Methods

<!-- ![React Lifecycle Methods Diagram: Common](./assets/React_lifecycle_methods_diagram-common.png) -->

> Here is an interactive version that links to the documentation for each method: [React Lifecycle Methods Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### Using LifeCycle Methods

In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called “mounting” in React.

We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called “unmounting” in React.

We can declare special methods on the component class to run some code - when a component mounts : - set up a timer to refresh the clock every second - when a component unmounts: - tear down the timer when the component is removed to prevent a memory leak

```js
class Clock extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  refresh = () => {
    this.setState({ time: new Date().toLocaleTimeString() });
  };

  render() {
    return (
      <div>
        <p>{this.state.time}</p>
      </div>
    );
  }

  componentDidMount() {
    this.timerID = setInterval(this.refresh, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
```

### Reference

- [React Lifecycle Methods Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [Glossary: Lifecycle Methods](https://reactjs.org/docs/glossary.html#lifecycle-methods)
- [What is Mounting?](https://stackoverflow.com/questions/31556450/what-is-mounting-in-react-js/31559566#31559566)
- [componentDidUpdate Examples](https://stackoverflow.com/questions/38759703/when-to-use-react-componentdidupdate-method#:~:text=The%20componentDidUpdate%20is%20particularly%20useful,last%20thing%20to%20be%20executed.)
- [Deprecated Lifecycle Methods](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
- [useEffect Diagram](https://blog.devgenius.io/how-to-use-react-clean-up-function-with-example-7a073392e479)

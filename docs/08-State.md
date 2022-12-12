---
title: State
sidebar_label: State
slug: /state
---

## Definition

A component needs state when some data associated with it changes over time. For example, a Checkbox component might need isChecked in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.

The most important difference between state and props is that props are passed from a parent component, but state is managed by the component itself. A component cannot change its props, but it can change its state.

For each particular piece of changing data, there should be just one component that “owns” it in its state. Don’t try to synchronize states of two different components. Instead, lift it up to their closest shared ancestor, and pass it down as props to both of them.
Just an object that lives inside a component and stores all of the data that that component and maybe some of its children need.

State is local to the component (encapsulated) and should not be accessed outside the component.

## State in Function Components

### Using the `useState` Hook

##### main.js

```js
function addMinutes(date, minutes) {
  //we multiply minutes by 60000 is to convert minutes to milliseconds
  return new Date(date.getTime() + minutes * 60000);
}

function Clock() {
  const [time, setTime] = React.useState(new Date());

  const handleClick = () => {
    setTime(addMinutes(time, 10));
  };

  return (
    <div>
      <p>{time.toLocaleTimeString()}</p>
      <button onClick={handleClick}>+ 10 Minutes</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
```

**What does calling useState do?**

It declares a “state variable”. Our variable is called `time` but we could call it anything else, like `basketball`. This is a way to “preserve” some values between the function calls — `useState` is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.

**What do we pass to useState as an argument?**

The only argument to the `useState()` Hook is the `initial state`. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a date object to show the time, so we pass the a new date object (now) as initial state for our variable. (If we wanted to store two different values in state, we would call useState() twice.)

**What does useState return?**

It returns a pair of values: the current state and a function that updates it. This is why we write const [date, setDate] = useState(...). This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair.

**What is that syntax?**

The syntax for `useState` is confusing at first because it uses **Array destructuring** to return a pair. Array destructuring is used because it allows the us to decide what the variable and setter function should be named.

## Setting `state`

### Remember not to set `state` directly, use the setter function returned by the hook.

##### main.js

```js
function addMinutes(date, minutes) {
  //we multiply minutes by 60000 is to convert minutes to milliseconds
  return new Date(date.getTime() + minutes * 60000);
}

function Clock() {
  let [time, setTime] = React.useState(new Date());

  const handleClick = () => {
    //doesn't update the DOM
    time = addMinutes(time, 10);
    //updates the DOM
    // setTime(addMinutes(time, 10));
  };

  return (
    <div>
      <p>{time.toLocaleTimeString()}</p>
      <button onClick={handleClick}>+ 10 Minutes</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
```

### Setting `state` based on prior state

Setting `state` based on prior state requires passing a function to the updater function that returns the new value instead of just passing the new value.

> So if the new state is computed using the previous state...pass a function to your updater function (setX function). The function will receive the previous value, and return an updated value.

##### main.js

```js
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function Clock() {
  const [time, setTime] = React.useState(new Date());

  const handleClick1 = () => {
    setTime(addMinutes(time, 10));
    setTime(addMinutes(time, 10));
  };

  const handleClick2 = () => {
    setTime((previousTime) => addMinutes(previousTime, 10));
    setTime((previousTime) => addMinutes(previousTime, 10));
  };

  return (
    <div>
      <p>{time.toLocaleTimeString()}</p>
      <button onClick={handleClick1}>+ 10 Minutes</button>
      <button onClick={handleClick2}>+ 10 Minutes</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
```

This is not an issue until you attempt to read state soon after you have set it (setting state repeatedly is an easy way to the issue). The issue arises because React does state updates asyncronously and can batch them to improve rendering performance.

### How to be sure a setState call has completed?

Use a `useEffect` hook with a dependency on the the state variable that is changing. We will learn about `useEffect` in the next chapter.

## FAQs

### Using Multiple State Variables

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give different names to different state variables if we want to use more than one:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  ...
}
```

In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:

```js
function handleOrangeClick() {
  // Similar to this.setState({ fruit: 'orange' })
  setFruit('orange');
}
```

You don’t have to use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always replaces it instead of merging it.

#### Should I use one or many state variables?

If you’re coming from classes, you might be tempted to always call `useState()` once and put all state into a single object. You can do it if you’d like. Here is an example of a component that follows the mouse movement. We keep its position and size in the local state:

```js
function Box() {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  });
  // ...
}
```

Now let’s say we want to write some logic that changes left and top when the user moves their mouse. Note how we have to merge these fields into the previous state object manually:

```js
...
const handleWindowMouseMove(e) {
      // Spreading "...state" ensures we don't "lose" width and height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
}
...
```

This is because when we update a state variable, we replace its value. This is different from `this.setState` in a class, which _merges_ the updated fields into the object.

> The React team recommends to split state into multiple state variables based on which values tend to change together.

For example, we could split our component state into position and size objects, and always replace the position with no need for merging:

```js
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  const handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
 }
 ...
}
```

### Where to use `useState`

| In Classes    | With Hooks |
| ------------- | ---------- |
| this.setState | useState   |

> `useState` don’t work inside classes. But you can use function components with hooks instead of class components and `setState`.

## Common State Use Case

```js
const { useState } = React;

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  function loadData() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData([1, 2, 3, 4]);
    }, 3000);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      <pre>{JSON.stringify(data, null, ' ')}</pre>
      <button onClick={loadData}>Load Data</button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

## State in Class Components

In React, you don’t manipulate the DOM directly, instead you simply update data (state) and let React react by updating the UI in all the needed places.

```js
class Clock extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  handleClick = () => {
    this.setState({ time: new Date().toLocaleTimeString() });
  };

  render() {
    return (
      <div>
        <p>{this.state.time}</p>
        <button onClick={handleClick}>Refresh</button>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
```

## Using State Correctly

There are three things you should know about setState().

1. Do Not Modify State Directly
2. State Updates :

- In class components, `setState` keeps previous state you do not change
- In function components, the `useState` updater function `set...` does not keep previous state. It is overwritten.

3. State Updates May Be Asynchronous

   - React may batch multiple set...() calls into a single update for performance.

   - Because `state` may be updated asynchronously (after an http request or a user action like clicking a button ), you should not rely on current state values for calculating the next state.

## Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```js
<FormattedDate date={this.state.date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

## Reference

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Glossary Definition: State](https://reactjs.org/docs/glossary.html#state)
- [Using the State Hook](https://reactjs.org/docs/hooks-state.html)

<!-- #### Use a Functional update

 Here’s an example of a counter component that uses both forms of setState:

```js
function Counter({ initialCount }) {
  const [count, setCount] = React.useState(initialCount);

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Decrement
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
          // setCount(count + 1);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
          // setCount(prevCount => prevCount + 1);
        }}
      >
        Increment (Functional Updater)
      </button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Counter initialCount={0} />
);
```

The ”Increment” and ”Increment Function Update” buttons use the two different forms of updating state.  -->

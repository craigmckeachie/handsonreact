---
title: Conditional Rendering
sidebar_label: Conditional Rendering
slug: /conditional-rendering
---

### Null

An element that is null or undefined will render nothing.

```js
function Example(){
    const elementVariable;

    return (
        <>
        <h3>Nothing will be rendered below</h3>
        {elementVariable}
        </>
    )
}
```

## Syntax Summary

Just use the features in the JavaScript language.

- if statement
- conditional ? (ternary) operator
- logical && operator

##### if

```js
const condition = props.condition;
const elementVariable;
if(condition){
    elementVariable = <div>true</div>
}

return (
    <>
    <h3>Element Variables</h3>
    {elementVariable}
    </>
)
```

##### if else

```js
const condition = props.condition;
const elementVariable;
if(condition){
    elementVariable = <div>true</div>
}
else{
    elementVariable = <div>false</div>
}

return (
    <>
    <h3>Element Variables</h3>
    {elementVariable}
    </>
)
```

In summary, `if` statements

- can be used in the function body, but not after a `return` statement
- requires you to create an element variable and then later render that variable
- are easy to read, particularly for beginners to React
- can be used when you have an if or an if else condition
- in rare cases, can be used to opt-out early from a render method and prevent a component from rendering at all

#### ? (inline)

```js
return condition ? <div>true</div> : <div>false</div>;
```

- conditional operator in JavaScript (called ternary operator in other languages)
- can be used after a `return` statement (so the code reads more like a traditional templating language)
- is less code than an `if` because it is not necessary to create a variable to hold the JSX element
- requires you to return null if you don't want to render anything in the false case

#### && (inline)

```js
return condition && <div>true</div>;
```

- It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
  - Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.
- can be used after a `return` statement (so the code reads more like a traditional templating language)
- is less code than an `if` because it is not necessary to create a variable to hold the JSX element
- When there isn't an `else` condition, using a logical `&&` operator can make the conditional rendering logic more readable.

## if

Here is an example of how to add or remove a part of a component (element) using an element variable.

As mentioned previously, you can't use an `if` in a `return` statement in JavaScript. **Element variables** allow you to capture and store an element(s) in a variable to later be rendered.

#### Function Component Example (using hooks)

```js
function DropdownMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  let menu;
  if (isOpen) {
    menu = (
      <ul>
        <li>Edit</li>
        <li>Remove</li>
        <li>Archive</li>
      </ul>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>Actions</button>
      {menu}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);
```

#### Class Component Example

```js
class DropdownMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    let menu;
    if (this.state.isOpen) {
      menu = (
        <ul>
          <li>Edit</li>
          <li>Remove</li>
          <li>Archive</li>
        </ul>
      );
    }
    return (
      <div>
        <button onClick={this.handleClick}>Actions</button>
        {menu}
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);
```

## Conditional Operator ? true : false

#### Function Component Example (with hooks)

```js
function DropdownMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div>
      <button onClick={handleClick}>Actions</button>
      {isOpen ? (
        <ul>
          <li>Edit</li>
          <li>Remove</li>
          <li>Archive</li>
        </ul>
      ) : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);
```

#### Class Component Example

```js
class DropdownMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Actions</button>
        {this.state.isOpen ? (
          <ul>
            <li>Edit</li>
            <li>Remove</li>
            <li>Archive</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);
```

When there isn't an `else` condition, the return of `null` becomes awkward and difficult to read. In the next section, we'll look at a solution to this the logical && operator.

## Logical && Operator

#### Function Component Example (with hooks)

```js
function DropdownMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div>
      <button onClick={handleClick}>Actions</button>
      {isOpen && (
        <ul>
          <li>Edit</li>
          <li>Remove</li>
          <li>Archive</li>
        </ul>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);
```

#### Class Component Example

```js
class DropdownMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Actions</button>
        {this.state.isOpen && (
          <ul>
            <li>Edit</li>
            <li>Remove</li>
            <li>Archive</li>
          </ul>
        )}
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);
```

## Reference

- [Conditional Rendering: Official Documentation](https://reactjs.org/docs/conditional-rendering.html)
- [All React Conditional Rendering Techniques](https://www.robinwieruch.de/conditional-rendering-react/)
- [AirBnb Styleguide: Conditional Rendering (Discussion: no rule yet)](https://github.com/airbnb/javascript/issues/520)

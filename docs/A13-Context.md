---
id: A13-Context
title: Context
sidebar_label: Context
slug: /context
---

## Definition

> Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

## When to Use Context

When props need to be shared with most of a tree of components.

## Function Component Example

#### Passing Props

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

function App() {
  const [themeName, setThemeName] = React.useState("light");
  const currentTheme = themes[themeName];
  return (
    <>
      <select
        onChange={(event) => setThemeName(event.target.value)}
        value={themeName}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <Toolbar theme={currentTheme} />
    </>
  );
}

function Toolbar({ theme }) {
  return (
    <div>
      <ThemedButton theme={theme} />
    </div>
  );
}

function ThemedButton({ theme }) {
  const { background, foreground } = theme;
  return (
    <button
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      Click Me
    </button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

#### Using the Context API

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

function App() {
  const [themeName, setThemeName] = React.useState("light");
  const currentTheme = themes[themeName];
  return (
    <>
      <select
        onChange={(event) => setThemeName(event.target.value)}
        value={themeName}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <ThemeContext.Provider value={currentTheme}>
        <Toolbar />
      </ThemeContext.Provider>
    </>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const { background, foreground } = React.useContext(ThemeContext);
  return (
    <button
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      Click Me
    </button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

---

## Class Component Example

In the example below, the theme is a prop to all components in the tree.

#### Passing Props

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

class App extends React.Component {
  render() {
    return <Toolbar theme={themes.light} />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop
  // and pass it to the ThemedButton. This can become painful
  // if every single button in the app needs to know the theme
  // because it would have to be passed through all components.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    const { background, foreground } = this.props.theme;

    return (
      <button
        style={{
          backgroundColor: background,
          color: foreground,
        }}
      >
        Click Me
      </button>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

#### Using the Context API

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext(themes.light);

// class App extends React.Component {
//   render() {
//     return <Toolbar theme={themes.light} />;
//   }
// }

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton theme={props.theme} />
//     </div>
//   );
// }

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    const { background, foreground } = this.context;

    return (
      <button
        style={{
          backgroundColor: background,
          color: foreground,
        }}
      >
        Click Me
      </button>
    );
  }
}
// ThemedButton.contextType = ThemeContext;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

## Reference

- [Context: React Documentation](https://reactjs.org/docs/context.html)

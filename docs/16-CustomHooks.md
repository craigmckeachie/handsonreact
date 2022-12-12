---
title: Custom Hooks
sidebar_label: Custom Hooks
slug: /custom-hooks
---

> Custom Hooks allow you to easily reuse stateful logic between components.

> Image being able to write a function with just your component logic code but without the UI (JSX) and then reuse that in several components...that is what a custom hook enables.

**Hooks** are a **new** addition in `React 16.8`

## Background

- Before hooks, React had patterns to reuse stateful logic but none of the approaches worked well
  - First, Higher-Order Components
  - Then, Render Props
- After hooks, creating custom hooks is an ideal solution to reuse stateful logic

## Why Hooks?

It’s hard to reuse stateful logic between components.

- reusable behavior
- current patterns: render props and higher-order components
- both patterns create "wrapper hell" where components are surrounded by providers, consumers, higher-order components, render props etc...
- **Hooks allow you to reuse stateful logic without changing your component hierarchy**

## Best Practice

**Custom hooks** are now considered a best practice in the React community.

**Prefer** creating a `hook` for reuseable logic **over** the `render props` pattern or `high-order components` where possible.

## Where to Use

Building your own Hooks lets you extract component logic into reusable functions.

| In Classes                            | With Hooks   |
| ------------------------------------- | ------------ |
| Higher-Order Components, Render Props | Custom Hooks |

<br/>
Traditionally in React, we’ve had two popular ways to share stateful logic between components: render props and higher-order components. Hooks solve many of the same problems without forcing you to add more components to the tree.

## Demo

### Start: Function Component Example with API Object

```js
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/photos`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the photos.';
    default:
      return 'There was an error retrieving the photos. Please try again.';
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(
      `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
    );

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const photoAPI = {
  getAll(page = 1, limit = 100) {
    return (
      fetch(`${url}?_page=${page}&_limit=${limit}`)
        // .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .catch((error) => {
          let errorMessage = translateStatusToErrorMessage(error);
          throw new Error(errorMessage);
        })
    );
  },
};

function PhotoList() {
  const [loading, setLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    photoAPI
      .getAll(1)
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {photos.map((photo) => {
          return (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <h3>{photo.title}</h3>
            </li>
          );
        })}
      </ul>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<PhotoList />);
```

### Complete: Function Component Example with API Object & Custom Hook

```js
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/photos`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the photos.';
    default:
      return 'There was an error retrieving the photos. Please try again.';
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(
      `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
    );

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const photoAPI = {
  getAll(page = 1, limit = 100) {
    return (
      fetch(`${url}?_page=${page}&_limit=${limit}`)
        // .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .catch((error) => {
          let errorMessage = translateStatusToErrorMessage(error);
          throw new Error(errorMessage);
        })
    );
  },
};

function usePhotos() {
  const [loading, setLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    photoAPI
      .getAll(1)
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { loading, photos, error };
}

function PhotoList() {
  const { loading, photos, error } = usePhotos();

  if (error) {
    return <div>{error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {photos.map((photo) => {
          return (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <h3>{photo.title}</h3>
            </li>
          );
        })}
      </ul>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<PhotoList />);
```

## Rules of Hooks

- Only call hooks at the top level (of your function component)
  - don't call them inside loops (for), conditions (if), or nested functions (only inside your main function component body)
- Only call hooks from React Functions
  - call hooks from React function components
  - call hooks from other custom hooks

## Reference

- [Custom Hooks Documentation](https://reactjs.org/docs/hooks-custom.html)
- [Custom Hook Examples/Recipes](https://usehooks.com/)

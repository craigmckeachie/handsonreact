---
title: React Query
sidebar_label: React Query
slug: /react-query
---

## Start: Custom Hook Example

- Start with the solution code from the [Custom Hooks Demo](./16-CustomHooks.md#complete-function-component-example-with-api-object--custom-hook)

## Installation

```
npm install @tanstack/react-query@4
npm install @tanstack/react-query-devtools@4
```

#### `index.html`

```html
...

<script src="./node_modules/@tanstack/react-query/build/umd/index.development.js"></script>
<script src="./node_modules/@tanstack/react-query-devtools/build/umd/index.development.js"></script>

...
```

## Complete: Example

```js
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/photos?_page=1&_limit=10`;

const {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} = ReactQuery;
const { ReactQueryDevtools } = ReactQueryDevtools;

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
  const queryInfo = useQuery({
    queryKey: ['photos'],
    queryFn: photoAPI.getAll,
  });
  console.log(queryInfo);
  return queryInfo;
  // const [loading, setLoading] = React.useState(false);
  // const [photos, setPhotos] = React.useState([]);
  // const [error, setError] = React.useState(null);

  // React.useEffect(() => {
  //   setLoading(true);
  //   setError(null);

  //   photoAPI
  //     .getAll(1)
  //     .then(data => {
  //       setPhotos(data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);
}

function PhotoList() {
  const { isLoading, data, error } = usePhotos();

  if (error) {
    return <div>{error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {data?.map((photo) => {
          return (
            <li key={photo.id}>
              <img loading="lazy" src={photo.thumbnailUrl} alt={photo.title} />
              <h3>{photo.title}</h3>
            </li>
          );
        })}
      </ul>
    );
  }
}

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <PhotoList />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

## Reference

- [React Query Documentation](https://tanstack.com/query/latest/)
- [Video: React Query: It's Time to Break up with your "Global State"!](https://tanstack.com/query/latest/docs/react/videos)

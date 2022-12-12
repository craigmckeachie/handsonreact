---
id: A17-OtherHooks
title: Other Hooks
sidebar_label: Other Hooks
slug: /other-hooks
---

## Use Reducer

### useReducer Example Application

> Rewrite of the [Redux example application](https://handsonreact.com/docs/react-redux-thunk).

```js
function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const baseUrl = "http://localhost:3000";

class ItemAPI {
  url = `${baseUrl}/items`;

  constructor() {}

  getAll(page = 1, limit = 100) {
    return fetch(`${this.url}?_page=${page}&_limit=${limit}`)
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  add(item) {
    return fetch(`${this.url}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  update(item) {
    return fetch(`${this.url}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  delete(id) {
    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  static translateStatusToErrorMessage(status) {
    switch (status) {
      case 401:
        return "Please login again.";
      case 403:
        return "You do not have permission to view the items.";
      default:
        return "There was an error retrieving the items. Please try again.";
    }
  }

  //pass translate in to make this more flexible
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
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

      let errorMessage = ItemAPI.translateStatusToErrorMessage(
        httpErrorInfo.status
      );
      throw new Error(errorMessage);
    }
  }

  parseJSON(response) {
    return response.json();
  }
}

// REDUX -------------------

//action types
const LOAD_ITEMS_REQUEST = "LOAD_ITEMS_REQUEST";
const LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS";
const LOAD_ITEMS_FAILURE = "LOAD_ITEMS_FAILURE";
const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";
const UPDATE_ITEM_REQUEST = "UPDATE_ITEM_REQUEST";
const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
const UPDATE_ITEM_FAILURE = "UPDATE_ITEM_FAILURE";
const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

//state (initial)
const initialState = {
  items: [],
  loading: false,
  error: null,
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS_REQUEST:
      return { ...state, loading: true };
    case LOAD_ITEMS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case LOAD_ITEMS_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case ADD_ITEM_REQUEST:
      return { ...state };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ADD_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case UPDATE_ITEM_REQUEST:
      return { ...state };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => {
          return item.id === action.payload.id
            ? Object.assign({}, item, action.payload)
            : item;
        }),
      };
    case UPDATE_ITEM_FAILURE:
      return { ...state, error: action.payload.message };
    case DELETE_ITEM_REQUEST:
      return { ...state };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case DELETE_ITEM_FAILURE:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}

//action creators
function loadItems(dispatch) {
  let itemAPI = new ItemAPI();
  dispatch({ type: LOAD_ITEMS_REQUEST });
  return itemAPI
    .getAll(1)
    .then((data) => {
      dispatch({ type: LOAD_ITEMS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: LOAD_ITEMS_FAILURE, payload: error });
    });
}

function addItem(item, dispatch) {
  let itemAPI = new ItemAPI();
  dispatch({ type: ADD_ITEM_REQUEST });
  return itemAPI
    .add(item)
    .then((data) => {
      dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ADD_ITEM_FAILURE, payload: error });
    });
}

function updateItem(item, dispatch) {
  let itemAPI = new ItemAPI();
  dispatch({ type: UPDATE_ITEM_REQUEST });
  return itemAPI
    .update(item)
    .then((data) => {
      dispatch({ type: UPDATE_ITEM_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_ITEM_FAILURE, payload: error });
    });
}

function deleteItem(item, dispatch) {
  let itemAPI = new ItemAPI();
  dispatch({ type: DELETE_ITEM_REQUEST });
  return itemAPI
    .delete(item.id)
    .then((data) => {
      dispatch({ type: DELETE_ITEM_SUCCESS, payload: item });
    })
    .catch((error) => {
      dispatch({ type: DELETE_ITEM_FAILURE, payload: error });
    });
}

// //store
// var ReduxThunk = window.ReduxThunk;
// const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
// const store = Redux.createStore(
//   reducer,
//   compose(Redux.applyMiddleware(...[ReduxThunk]))
// );

// UI ---------------------------------
function List(props) {
  const { items, onRemove, onUpdate, loading, error, dispatch } = props;
  const [editingItem, setEditingItem] = React.useState(null);
  //   const dispatch = ReactRedux.useDispatch();

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item === editingItem ? (
              <Form
                item={item}
                onSubmit={onUpdate}
                onCancel={handleCancel}
                dispatch={dispatch}
              />
            ) : (
              <p>
                <span>{item.name}</span>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                {/* <button onClick={() => dispatch(deleteItem(item))}> */}
                <button onClick={() => deleteItem(item, dispatch)}>
                  Remove
                </button>
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

function Form({ item, onCancel, buttonValue, dispatch }) {
  const [inputValue, setInputValue] = React.useState(item.name || "");
  //   const dispatch = ReactRedux.useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isNew = !item.id;
    const submittedItem = {
      id: item ? item.id : ID(),
      name: inputValue,
    };

    if (isNew) {
      //   dispatch(addItem(submittedItem));
      addItem(submittedItem, dispatch);
    } else {
      //   dispatch(updateItem(submittedItem));
      updateItem(submittedItem, dispatch);
    }

    setInputValue("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <button>{buttonValue || "Save"}</button>
      {onCancel && (
        <a href="#" onClick={handleCancel}>
          cancel
        </a>
      )}
    </form>
  );
}

function Container() {
  //   const items = ReactRedux.useSelector((state) => state.items);
  //   const loading = ReactRedux.useSelector((state) => state.loading);
  //   const error = ReactRedux.useSelector((state) => state.error);
  //   const dispatch = ReactRedux.useDispatch();
  const [{ loading, error, items }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  React.useEffect(() => {
    // dispatch(loadItems());
    loadItems(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Form item="" buttonValue="Add" dispatch={dispatch} />
      <List loading={loading} error={error} items={items} dispatch={dispatch} />
    </div>
  );
}

function App() {
  return (
    <div>
      {/* <ReactRedux.Provider store={store}> */}
      <Container />
      {/* </ReactRedux.Provider> */}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

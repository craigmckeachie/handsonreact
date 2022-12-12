---
title: Routing
sidebar_label: Routing
slug: /routing
---

## Overview

- Similar in function to a server-side router in an MVC framework
  - Associates a route (url) with a particular controller action
- React Router switches between (page/container) components when a route changes
- Back button is broken by default when page/container components change
  - the browser's history is not updated with a new url when page/container components change
  - React Router programmatically adds entries to the browser's history
  - enables the back button to work in React applications

There are two versions:

1. BrowserRouter (react-router-dom) for web applications.
2. NativeRouter (react-router-native) for use with React Native.

## Installation

1. Install the package
   ```
   npm install react-router-dom@6
   ```
2. Add the script tag

   #### `index.html`

   ```diff

   ...
       <script src="/node_modules/react/umd/react.development.js"></script>
       <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>

   +   <script src="/node_modules/history/umd/history.development.js"></script>
   +   <script src="/node_modules/react-router/umd/react-router.development.js"></script>
   +   <script src="/node_modules/react-router-dom/umd/react-router-dom.development.js"></script>

       <script src="/node_modules/@babel/standalone/babel.min.js"></script>
       <script src="/node_modules/axios/dist/axios.min.js"></script>
       <script type="text/babel" src="/main.js"></script>
   ```

   > ! Be sure that the `main.js` script tag's src attribute starts with a `/` or the router will not work properly when you refresh the page.

3. Log the `RouterRouterDOM` to verify it is installed properly

   #### `main.js`

   ```js
   console.log(window.ReactRouterDOM);
   ```

4. In the console you should see:
   ```
   {BrowserRouter: ƒ, HashRouter: ƒ, Link: ƒ,  …}
   ```

## Basics

1. Add these styles

   ```css
   /* styles.css */

   .container {
     border: 1px solid #ddd;
     margin: 30px;
     padding: 30px;
   }

   nav ul {
     list-style: none;
   }

   nav ul li {
     display: inline;
   }

   nav ul li:after {
     content: ' | ';
   }

   nav ul li:last-child:after {
     content: '';
   }
   ```

2. Try this code

   ```js
   const {
     BrowserRouter: Router,
     Route,
     Routes,
     Link,
     NavLink,
     Navigate,
     useParams,
     useLocation,
     useNavigation,
   } = window.ReactRouterDOM;

   function Home() {
     return <h2>Home</h2>;
   }

   function About() {
     return <h2>About</h2>;
   }

   function Contact() {
     return <h2>Contact</h2>;
   }

   function App() {
     return (
       <Router>
         <div>
           <nav>
             <ul>
               <li>
                 <Link to="/">Home</Link>
               </li>
               <li>
                 <Link to="/about">About</Link>
               </li>
               <li>
                 <Link to="/contact">Contact</Link>
               </li>
             </ul>
           </nav>

           <div className="container">
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="about" element={<About />} />
               <Route path="contact" element={<Contact />} />
             </Routes>
           </div>
         </div>
       </Router>
     );
   }

   ReactDOM.createRoot(document.getElementById('root')).render(<App />);
   ```

3. Change the Link tags to NavLink tags

   ```js
   <nav>
     <ul>
       <li>
         <NavLink to="/">Home</NavLink>
       </li>
       <li>
         <NavLink to="/about">About</NavLink>
       </li>
       <li>
         <NavLink to="/contact">Contact</NavLink>
       </li>
     </ul>
   </nav>
   ```

4. Add the following style

   #### `styles.css`

   ```css
   ... .active {
     background-color: #bee5eb;
     padding: 10px;
   }
   ```

5. Refresh the browser and see the navigation items are highlighted.

### Not Found (404)

1. Be sure you are running a development web server like serve with the `-s` flag.

   #### `package.json`

   ```json
   "scripts": {
       "start": "serve -s",
       ...
     },
     ...
   ```

2. Change the URL to `http://localhost:5000/noroute`
3. The navigation renders but the page is blank. Ideally, we would like to show a `NotFound` component when this happens.

3) Create a `NotFound` component

   ```js
   function NotFound() {
     return (
       <>
         <h2>Uh oh.</h2>
         <p>
           The page you requested could not be found. Is there any chance you
           were looking for one of these?
         </p>
       </>
     );
   }
   ```

4. Add a route for it with **no path**

   ```diff
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="about" element={<About />} />
       <Route path="contact" element={<Contact />} />
   +   <Route path="*" element={<NotFound />} />
     </Routes>
   ```

5. Navigate to the home route and then the contact route and notice the `NotFound` component shows when visiting every route

6. Navigate to the various routes again and notice that only when you manually go to a route that doesn't exist like: `/noroute` the `NotFound` component renders.

### URL Parameters

> This example builds on the code from the previous demonstrations in this section.

1. Create a `Movie` model class.

   - Add it just before the App component

   ```js
   class Movie {
     constructor(id, name, description, type) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.type = type;
     }
   }
   ```

1. Create an array of mock movies

   ```js
   const movies = [
     new Movie(
       1,
       ' Titanic',
       'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
       'Drama'
     ),
     new Movie(
       2,
       ' E.T. the Extra-Terrestrial',
       'A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.',
       'Fantasy'
     ),
     new Movie(
       3,
       'The Wizard of Oz',
       // tslint:disable-next-line:max-line-length
       'Dorothy Gale is swept away from a farm in Kansas to a magical land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard who can help her return home in Kansas and help her friends as well.',
       'Fantasy'
     ),
     new Movie(
       4,
       'Star Wars: Episode IV - A New Hope ',
       // tslint:disable-next-line:max-line-length
       'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire/`s world-destroying battle-station while also attempting to rescue Princess Leia from the evil Darth Vader.',
       'Action'
     ),
   ];
   ```

1. Create a `Movies` component to list movies

   ```js
   function MovieList({ movies }) {
     return (
       <div>
         <h2>Movies</h2>
         <ul>
           {movies.map((movie) => (
             <li key={movie.id}>
               <Link to={`./${movie.id}`}>{movie.name}</Link>
             </li>
           ))}
         </ul>
       </div>
     );
   }
   ```

1. Add a Route to go to the `Movies` component

   > Notice how we pass props to a the `Movies` component which is rendered by the React Router

   ```diff
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="about" element={<About />} />
     <Route path="contact" element={<Contact />} />
   + <Route path="movies" element={<MovieList movies={movies} />} />
     <Route path="movies/:id" element={<MovieDetail />} />
     <Route path="*" element={<NotFound />} />
   </Routes>
   ```

1. Add a NavLink to navigate to the `Movies` component.

   ```diff
   <nav>
     <ul>
       <li>
         <NavLink to="/">Home</NavLink>
       </li>
       <li>
         <NavLink to="/about">About</NavLink>
       </li>
       <li>
         <NavLink to="/contact">Contact</NavLink>
       </li>
   +    <li>
   +      <NavLink to="/movies">Movies</NavLink>
   +    </li>
     </ul>
   </nav>
   ```

1. Create a `MovieDetail` component to show the detail about a particular movie.

   ```js
   function MovieDetail() {
     let { id } = useParams();
     id = Number(id);
     const movie = movies.find((movie) => movie.id === id);

     return (
       <div>
         <h3>{movie.name}</h3>
         <p>{movie.description}</p>
       </div>
     );
   }
   ```

1. Add a Route to go to the `MovieDetail` component.

   ```diff
   ...
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="about" element={<About />} />
     <Route path="contact" element={<Contact />} />
     <Route path="movies" element={<MovieList movies={movies} />} />
   + <Route path="movies/:id" element={<MovieDetail />} />
     <Route path="*" element={<NotFound />} />
   </Routes>
   ```

1. Test the application and verify you can now click on a movie in the list and the movie detail route and component loads. Verify the browser's back button still works to return to the list after visiting the detail component.

## Nesting

1. Edit the `MovieList` component to nest the `MovieDetail` component route inside itself.

   ```diff
   function MovieList({ movies }) {
     return (
       <div>
         <h2>Movies</h2>
         <ul>
           {movies.map((movie) => (
             <li key={movie.id}>
               <Link to={`./${movie.id}`}>{movie.name}</Link>
             </li>
           ))}
         </ul>
   +      <div style={{ marginLeft: "40px" }}>
   +        <Routes>
   +          <Route path=":id" element={<MovieDetail />} />
   +        </Routes>
   +      </div>
       </div>
     );
   }
   ```

2. Remove the `MovieDetail` route from the `App` component. Add an astericks (\*) after the `movies` route so it can find the nested routes.

   ```diff
   ...
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="about" element={<About />} />
     <Route path="contact" element={<Contact />} />
   +  <Route path="movies/*" element={<MovieList movies={movies} />} />
   - <Route path="movies/:id" element={<MovieDetail />} />
     <Route path="*" element={<NotFound />} />
   </Routes>
   ```

3. Refresh the browser and notice that the movie detail now shows below the movie list after clicking a movie link.

<!-- ### Query Parameters

Modify the `Movies` component to filter by movie type (genre).

1. Destructure the needed props in the function signature and rename movies to `allMovies`
2. Parse the query string parameter(s)

   > React Router does not have any opinions about how you parse URL query strings. Some applications use simple key=value query strings, but others embed arrays and objects in the query string. So it's up to you to parse the search string yourself.

   > In modern browsers that support the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL), you can instantiate a URLSearchParams object from location.search and use that.

   > In browsers that [do not support the URL API](https://caniuse.com/#feat=url) (read: IE) you can use a 3rd party library such as [query-string](https://github.com/sindresorhus/query-string).

3. Create an empty movies array and then filter the movies if a type is passed
4. Add links with search params for the various movie types

   ```js
   function Movies({ movies: allMovies, location, match }) {
     let movies = [];
     let queryParams = new URLSearchParams(location.search);
     let type = queryParams.get("type");
     if (type) {
       movies = allMovies.filter((movie) => movie.type === type);
     } else {
       movies = allMovies;
     }
     const movieListItems = movies.map((movie) => (
       <li key={movie.id}>
         <Link to={`${match.url}/${movie.id}`}>{movie.name}</Link>
       </li>
     ));
     return (
       <div>
         <nav>
           <ul>
             <li>
               <Link to={{ pathname: "/movies", search: "?type=Drama" }}>
                 Drama
               </Link>
             </li>
             <li>
               <Link to={{ pathname: "/movies", search: "?type=Fantasy" }}>
                 Fantasy
               </Link>
             </li>
             <li>
               <Link to={{ pathname: "/movies", search: "?type=Action" }}>
                 Action
               </Link>
             </li>
           </ul>
         </nav>
         <h2>Movies</h2>
         <ul>{movieListItems}</ul>
       </div>
     );
   }
   ```

5. Bonus: If time permits, add the following code to highlight the secondary navigation movie types

```js
function isLinkActive(currentType, linkType) {
return currentType === linkType ? 'active' : '';
}

function Movies({ movies: allMovies, location, match }) {
...
<nav>
      <ul>
        <li>
          <Link
            className={isLinkActive(type, 'Drama')}
            to={{ pathname: '/movies', search: '?type=Drama' }}
          >
            Drama
          </Link>
        </li>
        <li>
          <Link
            className={isLinkActive(type, 'Fantasy')}
            to={{ pathname: '/movies', search: '?type=Fantasy' }}
          >
            Fantasy
          </Link>
        </li>
        <li>
          <Link
            className={isLinkActive(type, 'Action')}
            to={{ pathname: '/movies', search: '?type=Action' }}
          >
            Action
          </Link>
        </li>
      </ul>
    </nav>
}
``` -->

<!-- ## Redirects (Auth)

## Static vs Dynamic Routes

# Bonus

## Animated Transition

https://medium.com/@khwsc1/step-by-step-guide-of-simple-routing-transition-effect-for-react-with-react-router-v4-and-9152db1566a0

## Named

## Code Splitting
-->

- [List of all React Routers](https://reactjs.org/community/routing.html)
- [React Router](https://github.com/ReactTraining/react-router)
- [Upgrading from v5](https://reactrouter.com/docs/en/v6/upgrading/v5)
- [React Router 4 changes](https://css-tricks.com/react-router-4/)
- [Next.js](https://nextjs.org/)
- [Change in React Router 4 and 5 from Earlier Versions](https://www.reddit.com/r/reactjs/comments/8lgmmo/router5_or_reactrouter_4/)
- [Reach Router (now merged back into React Router)](https://reach.tech/router/)

<!--
https://medium.com/@jordan.eckowitz/reach-router-react-routing-made-easy-aac7b46cd53c

https://medium.com/@taion/react-routing-and-data-fetching-ec519428135c
https://github.com/4Catalyzer/found

https://github.com/grahammendick/router-challenge -->

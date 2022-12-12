---
title: Virtual DOM
sidebar_label: Virtual DOM
slug: /virtual-dom
---

React implements a browser-independent DOM system for performance and cross-browser compatibility. They call this the Virtual DOM.

1. Replace the JavaScript code in `main.js` with the following:

   ```js
   const rootElement = document.getElementById('root');
   const root = ReactDOM.createRoot(rootElement);

   function renderElement() {
     const element = (
       <div className="post">
         <h1>My First Blog Post</h1>
         <div>Author: Mark Twain</div>
         <div>Published: {new Date().toLocaleTimeString()}</div>
         <p>
           I am new to blogging and this is my first post. You should expect a
           lot of great things from me.
         </p>
       </div>
     );

     root.render(element);
   }
   setInterval(renderElement, 1000);
   ```

2. Open the page in Chrome and inspect the published date to see that it updates just the date but the rest of the DOM is not updated.

3. See the diagram below to better understand how the Virtual DOM works in React.

   ![Virtual DOM](https://user-images.githubusercontent.com/1474579/98454703-84cddf80-2135-11eb-91a3-cdcb7eb47712.png)

   ## Reference

   [Illustration of React Virtual DOM](https://github.com/eggheadio/illustrated-dev/blob/master/content/explainers/react-vdom/index.mdx)

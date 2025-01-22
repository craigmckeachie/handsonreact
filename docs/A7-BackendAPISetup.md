---
id: A7-BackendAPISetup
title: Backend API Setup
sidebar_label: Backend API Setup
slug: /backend-api-setup
---

## Steps

1. In the `demos` directory, install `json-server`

   ```
   cd demos //if you aren't there already
   npm install json-server
   ```

2. Create an `api` directory at the top level in your project so `projectpilot\api`
3. Click this link to open this [db.json](https://gist.github.com/craigmckeachie/196d975a63271e550d25cb57852b88cc) file on Github
4. On the Github page, in the upper right hand corner of the page click the **Download ZIP** button
5. Open your downloads folder and find `196d97...zip` and unzip it.
6. Copy the `db.json` file inside the `196d97...` directory into the `projectpilot\api` directory
7. Open `package.json`
8. Add the following script:

```diff
"scripts": {
    "start": "serve -s",
+    "api": "json-server ./api/db.json"
},
```

7. Run the server

   ```
   npm run api
   ```

8. You should see the following result:

```

\{^_^}/ hi!

Loading ./api/db.json
Done

Resources
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/albums
http://localhost:3000/photos
http://localhost:3000/users
http://localhost:3000/todos

Home
http://localhost:3000

```

---
id: A22-Debugging
title: Debugging
sidebar_label: Debugging
slug: /debugging
---

## Setup

1. Open **Lab 22** solution code.
2. In a command-prompt or terminal, run the commands.
   ```
   npm install
   npm run dev
   ```
3. In another command-prompt or terminal, run the command.
   ```shell
   npm run api
   ```

## Compiler Errors

1.  In your editor, remove the closing curly brace shown below.

    #### `src\Projects\ProjectList.[js|tsx]`

    ```diff
    <ProjectForm
        project={project
    -    }
        onCancel={this.cancelEditing}
    ></ProjectForm>
    ```

1.  You should see the following error in the terminal where you are running `npm run dev`.

    ```
    Failed to compile.
    src/projects/ProjectList.[js|tsx]
    Line 38:15:  Parsing error: Unexpected token, expected "}"

    36 |             <ProjectForm
    37 |               project={project
    > 38 |               onCancel={this.cancelEditing}
        |               ^
    39 |             ></ProjectForm>
    40 |           </div>
    41 |         );
    ```

1.  Add the `}` back.
1.  Verify the comile error goes away.
1.  Remove the return statement as shown below.

    #### `src\Projects\ProjectList.[js|tsx]`

    ```diff
    class ProjectList extends React.Component {
    ...
    render() {
    ...
    -    return
        <div className="row">{items}</div>;
    }
    }
    ```

1.  You should see the following error in the terminal where you are running `npm run dev`.

```
Failed to compile.


./src/projects/ProjectList.jsx
Line 17:3: Your render method should have return statement react/require-render-return
Line 46:6: Expected an assignment or function call and instead saw an expression no-unused-expressions

Search for the keywords to learn more about each error.

```

1. Add the `return` back.
1. Verify the error goes away.

## Runtime Errors

### Open Chrome DevTools

Open `Chrome DevTools` by following these steps:

1. In the upper right hand corner of `Chrome` click the `Three Dots > More Tools> Developer Tools`.

- Shortcuts:
  - (Windows, Linux): CTRL+SHIFT+I
  - (MacOS): CMD+OPTION+I

## Breakpoints

1. Open `ProjectsPage.[jsx|tsx]` in the Chrome DevTools `Sources` tab.

   > To find a file in the Chrome DevTools `Sources` tab and open the navigation to follow this or a similar path:
   > top/localhost:3000/Users/[your username]/Documents/git/r16/projectpilot-js/src/...
   > The path may differ depending on your operating system.

1. Set breakpoint on line 38.
1. Hover `this.props.project`
1. Open the `Console` tab.
1. Log `this.props.project`
1. Step through the code using the buttons outlined in the [JavaScript Debugging Reference](https://developers.google.com/web/tools/chrome-devtools/javascript/reference).

## Debugging in Visual Studio Code

This section describes how you can set breakpoints and debug JavaScript or TypeScript directly in Visual Studio Code instead of directly using a browser's DevTools like Chrome.

> Note that in the latest versions of Visual Studio Code it is no longer necessary to install the Debugger for Chrome extension.

- If you already have it installed that is OK it will just forward to the built-in `js-debug` functionality.

### Steps

1. In a **Vite** project, run `npm run dev` command from the command prompt or terminal.
2. Open `App.jsx` or `App.tsx` and set a breakpoint by clicking in the gutter to the left of the line number.
3. Click the `Run\Debugger` in Toolbar.
4. Click the `Run and Debug` button.
5. Choose environment `Chrome (preview)`
6. **Change port** `8080` to port `5173` in the `launch.json` file.
7. In the top left of the window click `Launch Chrome again`
8. You will stop on the breakpoint in **VS Code**.
<!-- ## Network -->

## Reference

- [Get Started with Debugging JavaScript in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript)
- [Chrome Devtools Documentation](https://developers.google.com/web/tools/chrome-devtools)
- [Debugging React in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react)

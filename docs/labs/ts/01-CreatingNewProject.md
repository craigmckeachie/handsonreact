---
title: 'Lab 1: Creating a New Project'
---

## Objectives

- [ ] Create a new React project (app) that uses TypeScript
- [ ] Open the new project
- [ ] Review the default project structure

---

## Steps

### Create a new React project

1. As part of the course setup, you created a `code` directory for the course (somewhere on your computer that you would easily remember). If you haven't created a `code` directory yet please do that now.
2. **Open** a `command prompt` (Windows) or `terminal` (Mac).
3. Change the **current directory** to your `code` directory.
4. **Run** **ONE** of the following commands:

   If you want to use `npm` as your package manager.

   #### `npm`

   ```bash
   npm create vite@latest keeptrack -- --template react-ts
   ```

   > npm 7+, extra double-dash is needed:

   If you want to use `Yarn` as your package manager.

   #### `Yarn`

   ```bash
   yarn create vite keeptrack --template react-ts
   ```

   > `yarn create` is available in Yarn 0.25+

### Open the new project

1. **Change** the current **directory** (`cd`) to the directory you created in the last step.
   ```bash
   cd keeptrack
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. **Open** the `keeptrack` directory in your **editor** of choice.

   > If you are using `Visual Studio Code` you can run the following command in your terminal: `code .`

   > ...`code` refers to Visual Studio Code and `.` means current directory

   > **MacOS**

   > if `code` is not in your `terminal` (Mac) `PATH` you will receive the message:
   > `command not found: code`
   >
   > - in `Visual Studio Code` choose `View>Command Palette> Shell Command: Install 'code' command in PATH`

   > **Windows**

   > if `code` is not in your `command-prompt` (Windows) `PATH` you will receive the message:
   > `command not found: code`
   >
   > - You will need to add `code` to the environment variable path manually or rerun the Visual Studio code installer and choose the option to add `code` to the path.

### Review the default project structure

1.  Take a few minutes to go over the default project structure. Below are some files to look at:

    - `package.json`
    - `/index.html` is the page template
    - `src/main.tsx` is the JavaScript entry point

    <br/>

---

## &#10004; You have completed Lab 1

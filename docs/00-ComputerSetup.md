---
title: Computer Setup
sidebar_label: Computer Setup
slug: /computer-setup
---

#### Your computer should have:

1. A **recent** version of **Windows** (10 or later), **macOS**, or **Linux**, with:
   - _current system updates_
   - at least `4 GB` of `RAM`
2. **Node.js** installed, a recent **20.x or 22.x LTS** version.

   - Why? The latest version of the React Router requires Node >= 20 on your local development machine (not on the server)
   - **Visit** [http://nodejs.org/](http://nodejs.org/).
   - **Click** the `Download Node.js (LTS)` (or similar) ** button ** to **download** the **installer** file.
   - **Run** the **installer**, accepting all _default_ _settings_.
   - After installation, **confirm** that the `Path` environment variable on your computer has been modified to include the path for `node` and `npm` by following these steps.
     - **Open** a `command prompt` (Windows) or `terminal` (Mac).
       > In Windows, click the Start button and type `cmd`
     - **Run** the following **commands**:
       ```shell
       node -v
       npm -v
       ```
     - **Verify** the **version** of each program is **returned**.
   - Please **DO use** a recent Node.js (Long Term Support (LTS)) versions for this class.

     - [x] `20.x`
     - [x] `22.x`

   - Please **DO NOT use** Node.js versions that are not long-term support (LTS)for this class.

     - [ ] ~~`8.x`~~
     - [ ] ~~`11.x`~~
     - [ ] ~~`13.x`~~
     - [ ] ~~`15.x`~~
     - [ ] ~~`19.x`~~
     - [ ] ~~`21.x`~~

   - Why?

     > Major Node.js versions enter Current release status for six months, which gives library authors time to add support for them. After six months, odd-numbered releases (9, 11, etc.) become unsupported, and even-numbered releases (10, 12, etc.) move to Active LTS status and are ready for general use. LTS release status is "long-term support", which typically guarantees that critical bugs will be fixed for a total of 30 months. Production applications should only use Active LTS or Maintenance LTS releases.

   - If you are using one of the older or experimental versions of `Node.js` listed above, uninstall it and reinstall a recent **LTS** version.
     - [How to remove Node.js from Windows](https://stackoverflow.com/a/20711410/48175)
     ```
     tldr;
     1. Uninstall from Programs & Features with the uninstaller.
     2. Reboot (or you probably can get away with killing all node-related processes from Task Manager).
     ```
     - [How to Remove Node.js from Mac OSX](https://stackabuse.com/how-to-uninstall-node-js-from-mac-osx/)
   - If you are **using another version of Node** and **do not want to uninstall it** because you need to support an existing application that uses that version I would recommend using a N**ode Version Manager** so you can install multiple versions of `Node.js` on a machine.
     - For details on how to do this [see this article](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).
     - Note: As explained in the article, depending on your operating system there are two different open-source projects for installing multiple versions of `Node.js`: one is named `nvm` (Mac) and the other `nvm for Windows`...make sure you use the appropriate one.

3. **Verify** you can use **Vite** to create a React project.

   1. Create a `working` directory for the course somewhere on your computer that you will remember.
   2. **Open** a `command prompt` (Windows) or `terminal` (Mac).
   3. **Change directory** (`cd`) into the `working` directory you created.

   4. **Run** the following **commands**:

   ```shell
   npm create vite@latest my-app -- --template react
   cd my-app
   npm install
   npm run dev
   ```

   5. After the application builds, you should see:
      ```sh
      ➜  Local:   http://localhost:5173/
      ```
    6. Hold down the CTRL (Windows) or COMMAND (Mac) key and simultaneously click the localhost link in the terminal.  

      > If the link is not clickable copy the URL and paste it the location/address bar of a browser

   6. **Verify** a page with the heading **Vite + React** is displayed in the browser.

4. An **IDE** (Integrated Development Environment) _or_ code **editor** of your choice.

   > Students may use any IDE/editor that they are comfortable with using.

   - We **recommend** **Visual Studio Code**.

     - It is **free**, **cross-platform** has a small download, and is a quick install.
     - **Visit** [code.visualstudio.com](https://code.visualstudio.com/) to **install**.

       > Don't confuse Visual Studio Code with the heavier Visual Studio IDE used for .NET development.

     - **Configure Visual Studio Code** for the course by [following these directions](./00-VisualStudioCodeSetup.md).

     :::success

     - Don't miss the above link to configure Visual Studio Code with the appropriate extensions for the course

   - **WebStorm** or **IntelliJ IDEA Ultimate** both made by `JetBrains` are also great choices.

     - In summary, these IDEs are heavier but have more features built-in.
     - **Visit** [Download WebStorm](https://www.jetbrains.com/webstorm/download/) to **install**.
       - OR
     - **Visit** [Download IntelliJ IDEA](https://www.jetbrains.com/idea/download/) to **install**.

       > Note: IntelliJ IDEA Ultimate includes TypeScript support while the Community Edition does not.

       > Each download comes with a free 30-day trial.

5. `Google Chrome` browser.
   - **Visit** [http://www.google.com/chrome/](http://www.google.com/chrome/) to **install**.
     > Any recent version will work for the class.
   - Also, any other browsers that you plan to support
6. **Internet access in the classroom is required** because attendees will download additional software packages and material from github.com as part of the class. This can be confirmed by following these steps.

   - **Visit**: https://github.com/facebook/react/
   - **Verify** the **page** **loads** successfully on your company's network.
     s

7. You will need to have **Git** installed. To verify it is installed open a terminal or command-prompt and run the command:
   ```
   git --version
   ```
   - Any version should work.
   - Here is a link to a [page describing the process for installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if you need to install it.

---

#### &#10004;&nbsp;&nbsp; You have completed the computer setup.

:::info

- If you need to configure npm to use a corporate proxy server the following article may be helpful but it will likely be more helpful to ask a co-worker that has already done it within your organization.
  - [Using NPM Install Behind A Corporate Proxy Server
    ](https://medium.com/@ogbemudiatimothy/using-npm-install-behind-a-corporate-proxy-server-db150c128899)
    :::

---

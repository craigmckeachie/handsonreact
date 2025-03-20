---
title: Visual Studio Code Setup
sidebar_label: VS Code Setup
slug: /visual-studio-code-setup
---

## Extensions

### Install the following extensions:

1.  **Click** each **link** below.
    - [Prettier- Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode&ssr=false#overview)
    - [HTML to JSX](https://marketplace.visualstudio.com/items?itemName=riazxrazor.html-to-jsx)
    - [Jest Snippets](https://marketplace.visualstudio.com/items?itemName=andys8.jest-snippets)
    - [Paste Clean Diff](https://marketplace.visualstudio.com/items?itemName=sivasubramanyam.paste-clean-diff)
    - [VS Code ES7 React/Redux/React-Native/JS snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
1.  And then follow these steps:

- **Click** the `Install` button
- **Click** the `Open Visual Studio Code` button
- **Click** the `Install` button in VS Code

## Configure settings

1. On the bottom left of VS Code > click the `Gear Icon`
2. Choose `Command Palette..`
3. Type `open user settings`
4. Choose `Open User Settings.JSON`
5. Paste the settings below into the file.

If you have existing `USER SETTINGS` you will want to **add** the following settings below your current settings. Otherwise, you can replace the contents of the file with the JSON below.

`settings.json`

```json
{
  "files.autoSave": "afterDelay",
  "editor.fontFamily": "Fira Code iScript, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.multiCursorModifier": "alt",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "javascript": "javascriptreact"
  }
}
```

6. Create a directory (somewhere on your computer that you would easily remember) named `code` where you will write code during the course.
7. Copy [prettier.config.js](./snippets/prettier.config.js) into the `code` directory.

## Install a font for programming (optional)

If you are interested in trying a new font designed for programming.

1. Install the free [FiraCodeiScript](https://github.com/kencrocken/FiraCodeiScript) font on your system.

- [How to Install Fonts on Windows 10](https://www.groovypost.com/howto/install-fonts-windows-10/)
- [How to Install Fonts on Mac](https://www.dafont.com/faq.php#mac)

2. Close and reopen VS Code to see the new font.

## Reference

- [VS Code ReactJS Tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)
- [Vs Code can do that?!](https://vscodecandothat.com/)

#### Other Extensions (not required)

- [React & JS Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) OR [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [React Documentation Extension](https://marketplace.visualstudio.com/items?itemName=avraammavridis.vsc-react-documentation)


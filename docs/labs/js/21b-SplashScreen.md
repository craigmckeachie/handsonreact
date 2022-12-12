---
title: 'Lab 21 b: Splash Screen'
---

> This lab is optional and should only be done if time permits

## Objectives

- [ ] Display a splash screen while the application code is downloading

## Steps

1. Add a splash screen and the associated styles.

   - Copy [logo-splash-screen.svg](https://github.com/craigmckeachie/react-course/blob/master/concepts/assets/logo-splash-screen.svg) into `keeptrack\public\assets`

   #### public\index.html

   ```diff
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <meta name="theme-color" content="#000000" />
       <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
   +    <style>
   +      html,
   +      body,
   +      #root,
   +      .container,
   +      .center-page {
   +        height: 100%;
   +      }
   +
   +      .center-page {
   +        display: flex;
   +        justify-content: center;
   +        align-items: center;
   +      }
   +
   +      .loading {
   +        background-color: #dddddd;
   +      }
   +    </style>
       <title>React App</title>
     </head>
   ...

   ```

   #### public\index.html

   ```diff
   ...
       <div id="root">
   +      <div class="center-page loading">
   +        <img src="/assets/logo-splash-screen.svg" alt="logo" />
   +      </div>
       </div>
   ...
   ```

2. Refresh the app from the root (localhost:3000).

   - Open `Chrome DevTools` > `Network Tab` > in the dropdown at the top change `Online` to `Fast 3g` to see the splash screen more easily.

   ![image](https://user-images.githubusercontent.com/1474579/92810015-241b6400-f38b-11ea-9115-bc2df157c754.png)

> The splash-screen svg is a logo with animation to fade in and out to produce an effect like Gmail when the app first loads.

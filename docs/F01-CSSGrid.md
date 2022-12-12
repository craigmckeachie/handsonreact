---
title: "CSS Grid"
---

## What is a Grid?

CSS Grid Layout (aka “Grid”), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it’s never done a very good job of it. First, we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance).

> What about Flexbox?
>
> Flexbox helped out, but it’s intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we’ve all been hacking our way around for as long as we’ve been making websites.

## Terminology

- Grid container
- Grid items
- Grid lines
- Grid cells
- Grid columns
- Grid rows
- Grid tracks
- Grid areas

  > [Visualize these by looking at this cheatsheet](https://css-tricks.com/snippets/css/complete-guide-grid/#aa-important-terminology)

- [Gaps](https://css-tricks.com/snippets/css/complete-guide-grid/#column-gaprow-gapgrid-column-gapgrid-row-gap)

- Margins: outside the grid

### CSS Properties

- [28 properties with similar names](https://css-tricks.com/snippets/css/complete-guide-grid/#grid-properties)
- Creates confusion
- [Visualizing the grid properties](https://grid.malven.co/)

> Tip: Focus on short list of critical properties below

- Creating the Grid
  - grid-template-columns
  - grid-template-rows
- Placing items in the grid

  - grid-column-[start|end]
  - grid-row-[start|end]

...or use their correspondending short hand properties:

- Creating the Grid
  - grid-template: [row1 row2 rowN.../ column1 column2 columnN...]
- Placing items in the grid
  - grid-column: [start / end]
  - grid-row: [start / end]

### Browser Support

- Modern Browsers Supported
- IE 10-11 Partial (Early version, requires -ms- prefix)
- Reference: https://caniuse.com/css-grid

### Techniques for Older Browsers

- Feature Detection
- Prefixed rules for Internet Explorer
- Progressive Enhancement

## Reference

- [Visualize all the grid properties](https://grid.malven.co/)
- [Video: CSS Grid in 100 Seconds](https://www.youtube.com/watch?v=uuOXPWCh-6o)
- [CSS Tricks: Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Grid Illustrations](https://dev.to/joyshaheb/css-grid-cheat-sheet-illustrated-in-2021-1a3)
- [CSS Grid CheatSheet](https://devhints.io/css-grid)

# Exercises

## Basic Grid

1. Create `index.html`
1. `html:5`
1. `div{Div $}*6`
1. Create a basic grid.

   #### `index.html in <head></head>`

   ```css
       <style>
       body {
           display: grid;
           grid-template: 100px 100px/ 150px 150px 150px;
           grid-gap: 15px 20px;
       }
       </style>
   ```

1. Open the page in browser with DevTools (Chrome, Edge, Firefox). No web server needed just open `index.html` from the file system.
1. Open browser `DevTools` > Right Click page and choose `Inspect` > Click `grid` next to `<body>` element
1. Comment out all the divs inside the `body` tag
1. Refresh the page. Click `grid` next to `<body>` element again. Notice the grid is there even when there are no items in it.
1. Uncomment back in all the divs inside the `body` tag

   ### Cheat Sheet

   ```css
   <style>
       body {
         display: grid;
         grid-template: row1 row2 rowN.../ column1 column2 columnN...;
         grid-gap: row-gap column-gap;
       }
   </style>
   ```

   ### Cheat Sheet (no shorthand properties)

   `grid-template` is the shorthand property for `grid-template-rows`/`grid-template-columns`

   `grid-gap` is the shorthand property for `grid-row-gap`/`grid-column-gap`

   ```css
   <style>
       body {
       display: grid;
       grid-template-rows: row1 row2 rowN...;
       grid-template-columns: column1 column2 columnN...;
       grid-row-gap: row-gap;
       grid-column-gap: column-gap;
       }
   </style>
   ```

1. Create a 4 row, 2 column grid
1. View the grid with your browser DevTools again. Notice how the grid items automatically fill in the grid.
1. Create a 3 row, 2 column grid
1. View the grid with your browser DevTools. Notice how the grid items automatically fill in the grid.
1. Change the grid gaps and inspect the changes.

   Finished Code

   #### `index.html`

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>CSS Grid</title>
       <style>
         body {
           display: grid;
           grid-template: 100px 100px/ 150px 150px 150px;
           grid-gap: 15px 20px;
         }
       </style>
     </head>
     <!-- div{Div $}*6 -->
     <body>
       <div>Div 1</div>
       <div>Div 2</div>
       <div>Div 3</div>
       <div>Div 4</div>
       <div>Div 5</div>
       <div>Div 6</div>
     </body>
   </html>
   ```

## Size Grid Tracks

1. Use `auto` to fill in the middle column and row.

```css
body {
  display: grid;
  grid-template: 100px auto 100px / 150px auto 150px;
  grid-gap: 20px;
}
```

1. Inspect the grid. Notice it doesn't stretch vertically.
1. Add height to the html and body tags so the grid fills the page.

```css
    <style>
      html,
      body {
        height: 100%;
      }
      body {
        display: grid;
        ...
      }
    </style>
```

1. Inspect the grid. Notice it fills the entire page.
1. Resize the page and notice that the the left, right columns and top, bottom rows are a fixed size even as you give the page grows or shrinks.
1. Create a more responsive design by letting the left, right columns and top, bottom rows grow with the `minmax()` function.

   ```css
   body {
     display: grid;
     grid-template:
       minmax(10%, 20%) auto minmax(10%, 20%) / minmax(10%, 20%)
       auto minmax(10%, 20%);
     grid-gap: 20px;
   }
   ```

## Place Items on the Grid

- Place Grid Items (children) on the Grid

1. Remove all the `<div>` elements inside the body tag and replace them with the semantic markup below for a site layout.

   ```diff
       <body>
   -       <div>Div 1</div>
   -       <div>Div 2</div>
   -       <div>Div 3</div>
   -       <div>Div 4</div>
   -       <div>Div 5</div>
   -       <div>Div 6</div>
       </body>
   ```

   ```html
   <body>
     <header>Header</header>
     <nav>Side Nav</nav>
     <main>Main</main>
     <aside>Aside</aside>
     <footer>Footer</footer>
   </body>
   ```

2. Place the grid items (the child items of the element marked display:grid) on the grid as follows.

   ```css
     <style>
         html,
         body {
           height: 100%;
         }
         body {
           display: grid;
           grid-template:
             minmax(10%, 20%) auto minmax(10%, 20%) / minmax(10%, 20%)
             auto minmax(10%, 20%);
           grid-gap: 20px;
         }
         header {
           grid-row: 1/2;
           grid-column: 1/4;
         }
         nav {
           grid-row: 2/3;
           grid-column: 1/2;
         }
         main {
           grid-row: 2/3;
           grid-column: 2/3;
         }
         footer {
           grid-row: 3/4;
           grid-column: 1/4;
         }
       </style>
   ```

3. Inspect the grid and click on the header, footer, etc to see where the items are placed on the grid.

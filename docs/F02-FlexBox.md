---
title: "Flexbox"
---

## Cheat Sheet

```css
#container {
    display: flex
    flex-direction: row /* (default) /*  /*justify-content: row align-items: column */
    flex-direction: column            /*justify-content: column align-items: row */
}
```

- flex-direction: row = main axis
- flex-direction: column = main axis

- justify = main axis
- align = cross axis

> Right Click> Inspect (Open DevTools) > Click `flex` button next to element

> Styles Pane > Click icon next to `display:flex` style to open editor

Reference: [New CSS flexbox debugging tools](https://developer.chrome.com/blog/new-in-devtools-90/#flexbox)

## Example

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flexbox</title>
    <style>
      header {
        display: flex;
        justify-content: right;
        align-items: center;
        height: 200px;
      }
      div {
        height: 100px;
        width: 100px;
        border: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <header>
      <div>Div 1</div>
      <div>Div 2</div>
      <div>Div 3</div>
      <div>Div 4</div>
      <div>Div 5</div>
      <div>Div 6</div>
    </header>
  </body>
</html>
```

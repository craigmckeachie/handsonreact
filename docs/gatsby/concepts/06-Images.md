---
title: 'Images'
---

## Importing assets with webpack

- Since Gatsby uses webpack you can import a file right in a JavaScript module. This
- Tells webpack to include that file in the bundle
- Importing a file gives you a string value
- The imported file’s value is the final path you can reference in your code
  - e.g. as the src attribute of an image
- When the project is built, webpack will correctly move the images into the public folder, and provide us with correct paths
- webpack finds all relative module references in CSS (they start with ./) and replaces them with the final paths from the compiled bundle

```js
import React from 'react';
import logo from './logo.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

> To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a data URI instead of a path.

You can reference files in CSS to import them, too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

## Gatsby Image plugin

Adding responsive images to your site while maintaining high performance scores can be difficult to do manually. The Gatsby Image plugin handles the hard parts of producing images in multiple sizes and formats for you!

### Why Gatsby's Automatic Image Optimizations Matter

The web has come a long way since 1995, when `<img src="....">` syntax was invented. Our visual standards for what we've come to expect have risen -- a lot.

When visiting new pages, users expect pages to load near-instantly, with a smooth experience. A delay of 100ms is associated with a 3% increased bounce rate.

One important part of overall page loading experience is image loading. There are three basic principles of delivering an optimal image loading experience:

- **Fetch "above the fold" images immediately; delay other work**. This means doing the work necessary for showing users the images they'll see on page load -- and _only_ that work, to avoid resource congestion.

- **Provide a placeholder during image fetch**. "Progressive images" are image placeholders -- previews of a full image that hold its place during page load time.

- **Minimize image file size to reduce request roundtrip time.** There are a number of ways, from cropping overly large images, to using newer file types, to reduce image file size.

For more details about these features [see this article](https://www.gatsbyjs.com/docs/conceptual/using-gatsby-image/).

### Using the Gatsby Image plugin

1. Install the following packages:

   ```shell
   npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem gatsby-transformer-sharp
   ```

2. Add the plugins to your `gatsby-config.js`:

   ```js:title=gatsby-config.js
   module.exports = {
   plugins: [
       `gatsby-plugin-image`,
       `gatsby-plugin-sharp`,
       `gatsby-transformer-sharp`,
   ],
   }
   ```

### Decide which component to use

Two image components:

- `StaticImage` (static images)
- `GatsbyImage` (dynamic images)
- The simplest way to decide which you need to is to ask yourself: _"will this image be the same every time the component or template is used?"_.
  - If it will always be the same, then use `StaticImage`.
  - If it will change, whether through data coming from a CMS or different values passed to a component each time you use it, then it is a dynamic image and you should use the `GatsbyImage` component.

### Static images

If you are using an image that will be the same each time the component is used, such as a logo or front page hero image, you can use the `StaticImage` component. The image can be either a local file in your project, or an image hosted on a remote server. Any remote images are downloaded and resized at build time.

1. **Add the image to your project.**

   If you are using a local image, copy it into the project. A folder such as `src/images` is a good choice.

2. **Add the `StaticImage` component to your template.**

   Import the component, then set the `src` prop to point to the image you added earlier. The path is relative to the source file itself. If your component file was `src/components/dino.js`, then you would load the image like this:

   ```jsx
   import { StaticImage } from 'gatsby-plugin-image';

   export function Dino() {
     return <StaticImage src="../images/dino.png" alt="A dinosaur" />;
   }
   ```

   If you are using a remote image, pass the image URL in the `src` prop:

   ```jsx
   import { StaticImage } from 'gatsby-plugin-image';

   export function Kitten() {
     return (
       <StaticImage src="https://placekitten.com/800/600" alt="A kitten" />
     );
   }
   ```

   When you build your site, the `StaticImage` component will load the image from your filesystem or from the remote URL, and it will generate all the sizes and formats that you need to support a responsive image.

   Because the image is loaded at build time, you cannot pass the filename in as a prop, or otherwise generate it outside of the component. It should either be a static string, or a local variable in the component's scope.

   **Important:** Remote images are downloaded and resized at build time. If the image is changed on the other server, it will not be updated on your site until you rebuild.

3. **Configure the image.**

   You configure the image by passing props to the `<StaticImage />` component. You can change the size and layout, as well as settings such as the type of placeholder used when lazy loading. There are also advanced image processing options available. You can find the full list of options [in the API docs](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/).

   This component renders a 200px by 200px image of a dinosaur. Before loading it will have a blurred, low-resolution placeholder. It uses the `"fixed"` layout, which means the image does not resize with its container.

   ```js
   import { StaticImage } from 'gatsby-plugin-image';

   export function Dino() {
     return (
       <StaticImage
         src="../images/dino.png"
         alt="A dinosaur"
         placeholder="blurred"
         layout="fixed"
         width={200}
         height={200}
       />
     );
   }
   ```

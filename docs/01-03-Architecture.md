---
title: Architecture
sidebar_label: Architecture
slug: /architecture
---

import useBaseUrl from '@docusaurus/useBaseUrl';

It's valuable to understand how JavaScript applications are architected.
In particular, it's valuable to understand how JavaScript application architecture is different from other web frameworks.

## Where to Render

It's useful to think about where the HTML and data come together or where the contents of a web page are rendered.
There are three places to render:

1. Server-side Rendering (SSR)

- on the web server in the chosen server-side programming language
- the most common servers-side programming languages are Java, C#, Python, Ruby, and PHP but it could be JavaScript running on a JavaScript runtime environment (for example: Node.js)

2. Client-side Rendering (CSR)

- in the end user's web browser using a client-side programming language
- the most common client-side programming language is JavaScript
- Web Assembly has made it possible to use other languages in the browser

3. Static Site Generation (SSG)

- on the developer machine or continuous build server at build time
- the most common languages are JavaScript (Next.js, Gatsby, Docusaurus, Nuxt, Astro), Go (Hugo), and Ruby (Jekyll)
- this is sometimes referred to as a Jamstack architecture
- here is a list of [common SSGs](https://jamstack.org/generators/)

## Web application architectures

### Server-side web application architecture (SSR)

- Java Spring
- ASP.NET
- Ruby on Rails
- PHP (Laravel, CodeIgniter)
- Python (Django)

![Server-side web app architecture](https://user-images.githubusercontent.com/1474579/65373190-30715300-dc48-11e9-8343-84fa96372e1b.png)

### Single-page web application architecture (CSR)

- React
- Angular
- Vue
- AngularJS
- Ember
- Backbone

![SPA Architecture](https://user-images.githubusercontent.com/1474579/101680131-3f4f4b80-3a2e-11eb-9e03-78e325ebdea4.png)

### What's Next

- SSR + CSR + SSG
- Can make the decision on where to render per page
  - Next.js
- Can make the decision on where to render per component (part of the page)
  - Next.js or Remix + React Server Components

### Why a Single-page web application architecture (CSR)?

So why are single-page web application architectures (client-side rendering) so popular? I think it can be summed up in the following statement.

> JavaScript libraries and frameworks provide an interactive user experience similar to a desktop or native application that is as easy to update as a web application.

In the past, developers have commonly used technologies from Microsoft (Windows Forms, WPF, Silverlight), Oracle (Java Swing), Adobe (Flash, Flex ) and/or mobile solutions such as iOS or Android development to provide rich interactive user experiences. These technologies were never easy to deploy or update for a large number of users. Which is why the business applications are built as web applications today.

These JavaScript libraries and frameworks allow developers to "have their cake and eat it to" by enabling an interactive user experience while remaining a web application.

## React Architecture

Lots of my students struggle with how everything comes together in a React application.  
Below is a diagram that helps answer that question.

---

![React Architecture](https://user-images.githubusercontent.com/1474579/65395139-5daf2580-dd5c-11e9-88bd-489848766507.png)

<!-- ---

<div id="video-container">
  <p>
    <a  href="https://courses.funnyant.com/courses/1063133/lectures/28654517?wvideo=p5t79a23ry">
        <img  src="https://cdn.filestackcontent.com/hInQBheNT429AJ5Ck9lk" width={800} height={450} style={{width: 800, height: 450}} />
        <img id="playVideo" height="30px" width="50px" src={useBaseUrl('img/play-arrow.svg')}/>
    </a>
  </p>
</div> -->

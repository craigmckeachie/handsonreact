---
id: A27-ReactServerComponents
title: React Server Components
sidebar_label: React Server Components
slug: /react-server-components
---

## What are they?

React Server Components (RSCs) are a relatively new addition to the React ecosystem, enabling components to execute exclusively on the server. This approach can enhance performance by reducing the amount of JavaScript sent to the client and allowing direct access to server-side resources.

## Adoption

As of January 2025, the adoption of RSCs in real-world applications is still in its early stages. One notable example is Mux, a video infrastructure company, which migrated 50,000 lines of code to utilize React Server Components. However, comprehensive statistics detailing the widespread adoption of RSCs are limited.

The integration of RSCs is currently most prominent in frameworks like Next.js. Next.js has incorporated React Server Components to improve performance, making server components the default and allowing developers to opt into client components for parts of the UI that require interactivity. This integration suggests a gradual shift towards server-side rendering paradigms within the React community.

Despite these advancements, many developers continue to use traditional client-side rendered single-page application (SPA) architectures. The choice between adopting RSCs and sticking with client-side rendering often depends on specific project requirements, team expertise, and the maturity of the tools involved. As the ecosystem around React Server Components evolves and more frameworks offer robust support, it's anticipated that adoption will increase.

## Reference

1. **Josh W. Comeau's Blog**: Discusses the performance advantages of React Server Components and their ability to reduce the JavaScript payload sent to the client while providing direct access to server-side resources.

   - [Josh W. Comeau - React Server Components](https://www.joshwcomeau.com/react/server-components/)

2. **Mux Blog**: Shares a case study of Mux transitioning 50,000 lines of code to utilize RSCs, illustrating early adoption in real-world scenarios.

   - [Mux - What Are React Server Components?](https://www.mux.com/blog/what-are-react-server-components)

3. **Next.js Documentation**: Highlights how RSCs are integrated into Next.js and how the framework uses RSCs as a default, showcasing its emphasis on server-side paradigms.
   - [Next.js - Server and Client Components](https://nextjs.org/learn/react-foundations/server-and-client-components)


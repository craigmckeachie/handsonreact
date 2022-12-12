---
title: Hooks
sidebar_label: Hooks
slug: /hooks
---

## Defined

> Hooks are a new addition in React 16.8. They let you use `state` and other React features including `Lifecycle Methods` without writing a class.

## Background

- React has always had two types of components: class and function.
- Before hooks, class and function components were not interchangeable.
- Before hooks, function components had two feature limitations:
  - couldn't have state
  - couldn't have lifecycle events
- After hooks, function components became more capable than class components
  - can have state (useState hook)
  - can handle lifecycle events (useEffect hook)
  - can reuse stateful logic with `Custom Hooks`

## Why Hooks?

- Complex components become hard to understand
  - lifecycle events like `componentDidMount` and `componentDidUpdate` contain code to address mixed concerns
    - data fetching
    - setting up event listeners
    - etc...
    - leads to bugs and inconsistencies
- Classes confuse both people and machines
  - class can be a large barrier to learning React
    - understanding `this` in JavaScript
    - code is verbose without unstable syntax proposals
    - when to use class vs function components
  - classes don't work well with today's tools
    - don't minify well
    - don't tree shake well
    - make hot reloading flaky and unreliable

## No Breaking Changes

Before we continue, note that Hooks are:

- Completely opt-in.
  - You can try Hooks in a few components without rewriting any existing code. But you don’t have to learn or use Hooks right now if you don’t want to.
- 100% backwards-compatible.
  - Hooks don’t contain any breaking changes.
- Available now.
  - Hooks are now available with the release of v16.8.0.
- There are no plans to remove classes from React.
- Hooks don’t replace your knowledge of React concepts.

## Best Practice

**Function components with hooks** are now considered a best practice in the React community.

If you are starting a new project I would recommend using all function components with hooks and avoid writing class components.

### Should I rewrite my class components?

After learning that function components with hooks have become a best practice, the question becomes: should you should rewrite your existing class components (if you have them) to be function components?

- As I mentioned previously, there are no plans to remove class components from React.
- If your class components are working and you only need to make small bug fixes and find them easy to make I don't think it is worth the effort.
- If you are finding it difficult for your team to grasp React and JavaScript (for example: the nuances of the this keyword) then it might be worth it to rewrite the components as functions.

## Hooks API

Hooks provide a more direct API to the React concepts you already know: props, **state**, context, refs, and **lifecycle**.

| Class Components                   | Function Components          |
| ---------------------------------- | ---------------------------- |
| this.setState                      | useState                     |
| Lifecycle Methods                  | useEffect                    |
| createRef, ref                     | useRef, ref                  |
| Context.Provider, Context.Consumer | Context.Provider, useContext |

- Function Components

  - useState
  - useEffect
  - useRef
  - ~~this.setState~~
  - ~~Lifecycle Methods (componentDidMount)~~
  - ~~createRef~~

- Class Components
  - ~~useState~~
  - ~~useEffect~~
  - ~~useRef~~
  - this.setState
  - Lifecycle Methods (componentDidMount)
  - createRef

:::info

We will learn the details of each of these hooks in the subsequent sections of the course. For example, the `state` section will explain the `useState` hook and the `Side Effects & Lifecycle` section will explain the `useEffect` hook.

:::

## Rules of Hooks

- **Only** call hooks at the **top level** (of your function component)
  - don't call them inside loops (for), conditions (if), or nested functions (only inside your main function component body)
- **Only** call hooks from **React Functions**
  - call hooks from React function components
  - call hooks from other custom hooks

## Custom Hooks

- Custom Hooks allow you to easily reuse stateful logic between components.
- Custom Hooks are covered in an advanced section of the course after we learn the built-in hooks.

## Labs

The labs in this course use all **function components with hooks** which are now considered a best practice in the React community.

## Reference

- [Hooks Documentation](https://reactjs.org/docs/hooks-overview.html)
- [Hooks Introduction](https://academind.com/learn/react/react-hooks-introduction/)
- [Hooks Reference](https://reactjs.org/docs/hooks-reference.html)

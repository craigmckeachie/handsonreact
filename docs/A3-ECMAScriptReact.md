---
id: A3-ECMAScriptReact
title: Essential JavaScript for React
sidebar_label: Essential JavaScript for React
slug: /essential-javascript-react
---

<!-- ## Setup

1. [Click this link](https://github.com/craigmckeachie/jsplay/archive/master.zip) to download the [JavaScript Playground](https://github.com/craigmckeachie/jsplay/archive/master.zip) repository from Github.
2. Unzip the directory `jsplay-master`.
3. Open the `jsplay-master` directory in your editor or choice.
4. Open a command prompt or terminal in the `jsplay-master` directory and run the commands

```sh
npm install
```

then

```sh
npm run dev
```

5. You should get the message.

```
Successfully compiled 1 file with Babel
``` -->

## Scope (var, let, const)

Summary:

```js
// myLetVariable is *not* visible out here

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
  // myLetVariable is only visible in here
}

// myLetVariable is *not* visible out here
```

### var

1. Code

   ```js
   var numbers = [1, 2, 3, 4];

   for (var counter = 0; counter < numbers.length; counter++) {
     console.log(numbers[counter]);
   }

   console.log('at end: ' + counter);
   ```

2. Result

   ```zsh
   1
   2
   3
   4
   at end: 4
   ```

### let

1.  Code

    ```diff
    let numbers = [1, 2, 3, 4];

    - for (var counter = 0; counter < numbers.length; counter++) {
    + for (let counter = 0; counter < numbers.length; counter++) {
      console.log(numbers[counter]);
    }

    console.log('at end: ' + counter);
    ```

2.  Result

    ```sh
    console.log('at end: ' + counter);
                            ^

    ReferenceError: counter is not defined
    ```

### const

1.  Code

    ```js
    const a = 1;
    a = 2;
    ```

2.  Result

    ```zsh
    TypeError: Assignment to constant variable.
    ```

## Arrow Functions

1.  Code

    ### Using a function

    ```js
    let numbers = [1, 2, 3, 4];
    //verbose
    numbers.forEach(function (n) {
      console.log(n);
    });
    ```

2.  Result

    ```zsh
    1
    2
    3
    4
    ```

    ### Using an arrow function

3.  Code

    ```js
    let numbers = [1, 2, 3, 4];
    numbers.forEach((n) => console.log(n));
    ```

4.  Result

    ```zsh
    1
    2
    3
    4
    ```

## Destructuring

### Objects

1.  Code

    ```js
    let person = {
      first: 'Thomas',
      last: 'Edison',
      age: 5,
      twitter: '@tom',
    };

    let { first, last } = person;
    console.log(first);
    console.log(last);
    ```

2.  Result

    ```
    Thomas
    Edison
    ```

Assignment is left to right with an object literal.

1.  Code

    ```js
    let person = {
      first: 'Thomas',
      last: 'Edison',
      age: 5,
      twitter: '@tom',
    };

    let { first: firstName, last: lastName } = person;
    console.log(firstName);
    console.log(lastName);
    ```

2.  Result

    ```
    Thomas
    Edison
    ```

### Arrays

1.  Code

    ```js
    let numbers = [1, 2, 3];

    let [a, b, c] = numbers;
    console.log(a);
    console.log(b);
    console.log(c);
    ```

2.  Result

    ```
    1
    2
    3
    ```

## Classes

### Constructors

1.  Code:

    #### If using `Babel` compiler:

    ```js
    class Person {
      constructor(first, last) {
        this.first = first;
        this.last = last;
      }
    }

    let person = new Person('Ron', 'Swanson');
    console.log(person.first + ' ' + person.last);
    ```

    #### If using TypeScript (`tsc`) compiler:

    ```ts
    class Person {
      first;
      last;
      constructor(first, last) {
        this.first = first;
        this.last = last;
      }
    }

    let person = new Person('Ron', 'Swanson');
    console.log(person.first + ' ' + person.last);
    ```

2.  Result:

    ```zsh
    Ron Swanson
    ```

### Methods

1.  Code:

    #### If using `Babel` compiler:

    ```js
    class Person {
      constructor(first, last) {
        this.first = first;
        this.last = last;
      }
      getFullName() {
        return this.first + ' ' + this.last;
      }
    }

    let person = new Person('Ron', 'Swanson');
    console.log(person.getFullName());
    ```

    #### If using TypeScript (`tsc`) compiler:

    ```ts
    class Person {
      first;
      last;
      constructor(first, last) {
        this.first = first;
        this.last = last;
      }
      getFullName() {
        return this.first + ' ' + this.last;
      }
    }

    let person = new Person('Ron', 'Swanson');
    console.log(person.getFullName());
    ```

1.  Result:

    ```zsh
    Ron Swanson
    ```

### Class Fields

Class Fields are only a stage-3 proposal so you need to install an additional [plugin](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) to use them.

> [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields)

The proposed feature of class fields is commonly used in React projects and is included in `Create React App`'s default configuration as well as the `Run Code` extension we are using to run these examples.

This propsed feature is available in TypeScript without any additional configuration.

3. Code:

   ```js
   class Person {
     first;
     last;
   }

   let person = new Person();
   person.first = 'Tom';
   person.last = 'Haverford';

   console.log(person.first + ' ' + person.last);
   ```

4. Result:

   ```zsh
   Craig McKeachie
   ```

## Modules

### First Module

1.  Create file `src\my-module.js` or `.\my-module.ts`
2.  Add the following code to `my-module.[js|ts]`

    ```js
    export function myFunction() {
      return 'myFunction was run.';
    }
    ```

3.  Code in `program.[js|ts]`

    - Auto import doesn't work in JavaScript, you need to use TypeScript

    ```js
    import { myFunction } from './my-module';
    console.log(myFunction());
    ```

4.  Result

    ```
    myFunction was run.
    ```

### Another Module

1.  Code in `my-module.[js|ts]`

    ```js
    export function myFunction() {
      return 'myFunction was run.';
    }

    function myPrivateFunction() {
      return 'myPrivateFunction was run.';
    }

    let myObject = {
      myName: "I can access myObject's name",
      myMethod: function () {
        return 'myMethod on myObject is running.';
      },
    };

    export { myObject };

    export const myPrimitive = 55;

    export class MyClass {
      myClassMethod() {
        return 'myClassMethod on myClass is running.';
      }
    }
    ```

2.  Code in `program.[js|ts]`

    ```js
    import { myFunction, myObject, myPrimitive, MyClass } from './my-module';

    console.log(myFunction());

    console.log(myObject.myName);
    console.log(myObject.myMethod());

    console.log(myPrimitive);

    let myClass = new MyClass();
    console.log(myClass.myClassMethod());
    ```

3.  Result

    ```
    myFunction was run.
    I can access myObject's name
    myMethod on myObject is running.
    55
    myClassMethod on myClass is running.
    ```

## Spread

1.  Code

    #### `program.[js|ts]`

    ```js
    let person = {
      first: 'Thomas',
      last: 'Edison',
      age: 5,
      twitter: '@tom',
    };

    let anotherPerson = {
      ...person,
      age: 80,
    };

    console.log(anotherPerson);
    ```

2.  Result

    ```sh
    { first: 'Thomas', last: 'Edison', age: 80, twitter: '@tom' }
    ```

3.  Code

    #### `program.[js|ts]`

    ```js
    const numbers = [1, 2, 3, 4];
    const moreNumbers = [...numbers, 5, 6, 7, 8];
    console.log(moreNumbers);
    ```

4.  Result

    ```sh
    [
      1, 2, 3, 4,
      5, 6, 7, 8
    ]
    ```

## Array.map() method

### a. for loop

```js
const numbers = [1, 2, 3, 4, 5];
const tens = [];

for (let index = 0; index < numbers.length; index++) {
  const number = numbers[index];
  tens.push(number * 10);
}

console.log(tens);
```

### b. #array.forEach

```js
const numbers = [1, 2, 3, 4, 5];
const tens = [];

numbers.forEach(function (number) {
  tens.push(number * 10);
});

console.log(tens);
```

### c. #array.map

```js
const numbers = [1, 2, 3, 4, 5];

const tens = numbers.map(function (number) {
  return number * 10;
});

console.log(tens);
```

### d. #array.map with arrow function

```js
const numbers = [1, 2, 3, 4, 5];
const tens = numbers.map((number) => number * 10);
console.log(tens);
```

<!-- ## TODO


- Use class example in modules
- Show class inheritence
- Better spread example
- https://codeburst.io/essential-javascript-features-for-react-82a6bf6855c2 -->

<!-- ## Code Runner Setup

1. Install the [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) extension in Visual Studio Code.

   1. [Click this link](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
   2. **Click** the **green** `Install` **button**
   3. **Click** the **button** `Open Visual Studio Code`
   4. **Click** the **green** `Install` **button** inside Visual Studio Code

1. Create a directory named `demos`
1. **Open** the `demos` directory (folder) in Visual Studio Code
1. Create the file `demos\program.js`
1. Add the following code.
   ```js
   console.log('ready');
   ```
1. Run the code in `program.js` using one of these options:
   - click `Run Code` button (top right looks like a Play button) in editor title menu
   - use shortcut `Ctrl+Alt+N`
   - right click the Text Editor and then click `Run Code` in editor context menu
1. Verify the output.

   ```bash
   [Running] node ".../program.js"
   ready

   [Done] exited with code=0 in 0.053 seconds
   ```

> If you do not have `Visual Studio Code` installed and would prefer not to install it. Click this link to use [jsbin](https://jsbin.com/fijebuxudi/edit?js,console). Change the JavaScript panel language dropdown to `ES6/Babel` since we will be using newer JavaScript language features. -->

# JavaScript Hoisting

## What is Hoisting?

Hoisting is a JavaScript mechanism where **variable and function declarations** are conceptually "moved" to the top of their containing **scope** _before_ the code is executed.

In simpler terms: It gives you the ability to use variables or functions _before_ they appear in your code – but with specific conditions and behaviors depending on how they are declared.

## Hoisting Behavior by Declaration Type

### Variables with `var`

- `var` declarations are hoisted to the top of their _function_ or _global_ scope.
- They are automatically initialized with the value `undefined`.
- Only the **declaration** (`var x;`) is hoisted, not the **assignment** (`x = 5;`).
- Accessing a `var` variable before its assignment results in `undefined`.

```js
console.log(x); // Output: undefined
var x = 5;
console.log(x); // Output: 5

// Conceptually, this is treated like:
// var x; // declaration is hoisted
// console.log(x); // x is undefined
// x = 5; // assignment stays in place
```

### Variables with `let` and `const` (ES6)

- `let` and `const` declarations are also **hoisted** to the top of their _block_ scope.
- However, they are **not initialized**. They are placed in a **Temporal Dead Zone (TDZ)** from the start of the block until the declaration is executed in the code.
- Accessing a `let` or `const` variable within the TDZ (i.e., before its declaration line) results in a `ReferenceError`.

```js
// console.log(y); // ❌ This line would cause a ReferenceError (TDZ)
let y = 10; // The TDZ for 'y' ends here
console.log(y); // Output: 10

// const z = 20; // TDZ for 'z' starts here
// console.log(z); // ❌ This line would cause a ReferenceError (TDZ)
```

You must declare let and const variables before you use them.

### Function Declarations

- Functions defined using the standard `function` keyword (function declarations) are hoisted **completely**.
- Both the function's name and its entire body are moved to the top of the scope.
- This means you **can call a function declaration before** its definition appears in the code.

```js
sayHi(); // ✅ Output: Hello! // Called before definition

function sayHi() {
  // Definition is here
  console.log('Hello!');
}

sayHi(); // ✅ Output: Hello! // Called after definition
```

```js
function run() {
  return sum(1, 2);

  function sum(a, b) {
    return a + b;
  }
}

const result = run();
console.log(result); // Output: 3
```

### Function Expressions

- Functions defined as part of an expression, typically by assigning a function to a variable (function expressions), are not hoisted in the same way as function declarations.
- Only the **variable** that holds the function expression is hoisted (following the rules of `var`, `let`, or `const`).
- If declared with `var`, the variable is hoisted and initialized to `undefined`. Trying to call `undefined` as a function results in a `TypeError`.
- If declared with `let` or `const`, the variable is in the TDZ, causing a `ReferenceError` if accessed before declaration (including trying to call it).

```js
// greet(); // ❌ TypeError: greet is not a function (because var greet is hoisted but undefined)

var greet = function () {
  // The variable 'greet' is hoisted (undefined), but the function assignment is not
  console.log('Hello!');
};

greet(); // ✅ Output: Hello! // Can call after the assignment line
```

```js
// sayHello(); // ❌ ReferenceError: Cannot access 'sayHello' before initialization (TDZ for let variable)

let sayHello = function () {
  console.log('Hello again!');
};

sayHello(); // ✅ Output: Hello again!
```

## Comparison Table

| Declaration Type     | Is it Hoisted?       | Can use _before_ declaration? | Notes                      |
| :------------------- | :------------------- | :---------------------------- | :------------------------- |
| `var`                | ✅ Yes (declaration) | ✅ Yes                        | Value is `undefined`       |
| `let` / `const`      | ✅ Yes (declaration) | ❌ No                         | Temporal Dead Zone (TDZ)   |
| Function Declaration | ✅ Yes (completely)  | ✅ Yes                        | Name and body hoisted      |
| Function Expression  | ✅ Yes (variable)    | ❌ No                         | Variable's value is needed |

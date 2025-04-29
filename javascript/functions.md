# JavaScript Functions

Functions are fundamental building blocks in JavaScript. They allow you to group code that performs a specific task, making your code reusable, organized, and easier to manage.

Imagine a recipe (the function definition). You don't cook the dish just by writing the recipe. You need to follow the steps (call the function) using ingredients (parameters/arguments) to get the final dish (return value).

## What is a Function?

A function in JavaScript is a block of code designed to perform a specific task. Functions promote code reuse – define once, call anywhere needed – avoiding repetition.

## How to Use Functions

### Defining a Function (Function Definition)

- You define a function using the `function` keyword, followed by a name, parentheses `()`, and curly braces `{}` containing the function's body (the code to be executed).
- Defining a function does not execute the code inside it. The code runs only when the function is called.

Syntax:

```js
function functionName() {
  // code block
}
```

Example:

```js
function showGreeting() {
  console.log('Hello!');
  console.log('My name is khoikhukho');
}
```

### Calling a Function

- To execute the code inside a function, you call it by using its name followed by parentheses `()`.
- You can call a function multiple times. Each call executes the code in its body from start to finish.

```js
showGreeting();
// Output:
// Hello!
// My name is khoikhukho
```

### Functions with Parameters

To make functions more flexible, you can define parameters in the parentheses `()` during the function definition. Parameters act as local variables within the function that receive values when the function is called.

Example (adding a `message` parameter):

```js
function showGreeting(message) {
  console.log('Hello!');
  console.log(message); // Uses the value passed in the 'message' parameter
}
```

When calling a function with parameters, you provide **arguments** – the actual values passed to the **parameters**.

```js
showGreeting('My name is ngockhoi96'); // "My name is ngockhoi96" is the argument for the 'message' parameter
// Output:
// Hello!
// My name is ngockhoi96

showGreeting('Nice to meet you'); // "Nice to meet you" is the argument
// Output:
// Hello!
// Nice to meet you
```

A function can have multiple parameters, separated by commas.

```js
function demo(param1, param2, param3) {
  console.log(param1, param2, param3);
}
```

You can call a function with a different number of arguments than parameters.

- If you provide fewer arguments, the corresponding parameters will have the value `undefined`.

```js
demo('Value 1', 'Value 2'); // Output: Value 1, Value 2, undefined
```

- If you provide more arguments, the extra arguments are simply ignored.

### Default Parameters (ES6)

You can assign **default values** to parameters. If an argument is not provided for that parameter when calling the function, or if the argument is explicitly `undefined`, the default value will be used instead.

Syntax: `param = defaultValue`

Example (setting a default for param3):

```js
function demo(param1, param2, param3 = 'Default value 3') {
  console.log(param1, param2, param3);
}

demo('Value 1', 'Value 2'); // Output: Value 1, Value 2, Default value 3 (argument omitted)
demo('Value 1', 'Value 2', undefined); // Output: Value 1, Value 2, Default value 3 (argument is undefined)
demo('Value 1', 'Value 2', 'Value 3'); // Output: Value 1, Value 2, Value 3 (argument provided, default ignored)
```

### Return Values

Functions can send a value back to the place where they were called using the `return` keyword. This is like the "final dish" from the cooking analogy.

Example (calculating and returning a sum):

```js
function sum(a, b) {
  return a + b; // Calculates a + b and sends the result back
}
```

The `return` keyword does two things:

1. It specifies the value that the function call will evaluate to.
2. It immediately stops the execution of the function. Any code after `return` inside the function will not run.

When you call a function that uses `return`, the function call itself becomes the returned value.

```js
console.log(sum(2, 3)); // The call sum(2,3) evaluates to 5. Output: 5

const result = sum(2, 3); // The returned value 5 is assigned to 'result'.
console.log(result); // Output: 5
```

If a function does not have a `return` statement, or if it has an empty `return;`, it implicitly returns `undefined`.

```js
function noReturn(a, b) {
  let total = a + b; // Calculation happens, but nothing is returned
}
console.log(noReturn(1, 2)); // Output: undefined
```

## Function Types

JavaScript has three main ways to define functions, differing in syntax, hoisting, and sometimes how they handle the `this` keyword.

### Function Declaration

- The traditional way to define a function.
- Syntax: Starts with the `function` keyword.
- **Key Feature: Hoisting.** Function declarations are hoisted to the top of their scope. This means you can call them **before** they appear in the code.

```js
// You can call it here...
greet('World'); // Output: Hello, World!

function greet(name) {
  // ...even though the definition is below
  console.log('Hello, ' + name + '!');
}

// ...and call it here too
greet('Astro'); // Output: Hello, Astro!
```

### Function Expression

- Defined as part of an expression, often by assigning an anonymous function (a function without a name) or a named function to a variable.
- Syntax: `const/let/var variableName = function [optionalName](parameters) { ... };`
- **Key Feature: No Hoisting (like variables).** Function expressions are not hoisted in the same way as declarations. They follow the hoisting rules of the variable they are assigned to (`let` and `const` expressions are in the Temporal Dead Zone). You must define a function expression before you call it.

```js
// You cannot call it here:
// sayHello("World"); // ReferenceError: Cannot access 'sayHello' before initialization

const sayHello = function (name) {
  // Defined here
  console.log('Hello, ' + name + '!');
};

// You can call it here:
sayHello('World'); // Output: Hello, World!
```

### Arrow Function (ES6)

- A more concise syntax for writing function expressions, particularly useful for short functions and callbacks.
- Syntax: `const/let/var variableName = (parameters) => { ... };`
- Hoisting: Similar to Function Expressions (behaves like `let`/`const` variable hoisting - TDZ). Must be defined before calling.
- Special `this` binding behavior (it does not have its own `this`; it inherits `this` from the enclosing scope).

**Concise Syntax Variations:**

- Parameters: Parentheses `()` are optional if there is only one parameter.

```js
const double = number => {
  // No parentheses needed for a single parameter
  return number * 2;
};
```

- Body: Curly braces `{}` and the `return` keyword are optional if the function body is a single expression. The result of the expression is implicitly returned.

```js
const subtract = (a, b) => a - b; // Implicit return of 'a - b'
console.log(subtract(5, 2)); // Output: 3
```

### When to Use Which Type?

- **Function Declaration:**

  - When you need hoisting (ability to call before definition).
  - For general-purpose functions that are part of the global or function scope.

- **Function Expression:**

  - When you need the function to be available only after a specific point in the code.
  - When passing a function as an argument to another function (callbacks).
  - When immediately invoking a function expression (IIFE).

- **Arrow Function:**

- For concise syntax, especially for short functions or callbacks.
- When you don't need its own `this` binding (a key difference from traditional function expressions and declarations).

## Benefits of Using Functions

- **Avoid Code Repetition (DRY - Don't Repeat Yourself):** Prevents writing the same code logic multiple times.
- **Break Down Problems:** Helps divide complex tasks into smaller, more manageable, and understandable pieces.
- **Improves Readability and Maintainability:** Organized code is easier to read, debug, and update.

## Common Pitfalls

- Using unclear function names that don't describe their purpose.
- Forgetting the `return` keyword when the function is expected to produce a value.
- Using too many parameters, making the function difficult to understand and use.
- Syntax errors (missing parentheses `()`, curly braces `{}`).

# JavaScript Variable Declarations: var, let, const

In modern JavaScript (ES6 and later), `let` and `const` are the preferred ways to declare variables, largely replacing `var` from older versions. They differ mainly in their **scope**, **hoisting behavior**, and whether they can be **reassigned** or **redeclared**.

## `var` (Older, Function/Global Scope)

- **Scope:** Function-scoped. If declared inside a function, it's accessible anywhere within that function. If declared outside any function, it's global. `var` ignores block scope (`{}`).
- **Hoisting:** Variables declared with `var` are "hoisted" to the top of their _function_ or _global_ scope. They are initialized with `undefined` during the creation phase. Accessing a `var` before its declaration does _not_ throw an error, but its value will be `undefined`.
- **Reassignment:** Yes, you can change the value of a `var` variable.
- **Redeclaration:** Yes, you can redeclare a `var` variable in the same scope without an error. This can lead to unexpected behavior.
- **Global Object:** In the global scope, `var` declarations become properties of the global object (`window` in browsers, `global` in Node.js).

**Example:**

```js
function varExample() {
  if (true) {
    var x = 10; // Function-scoped, not block-scoped by the if block
    console.log(x); // 10
  }
  console.log(x); // 10 (Still accessible outside the if block)

  var y = 20;
  var y = 30; // Redeclaration is allowed (y is now 30)
  console.log(y); // 30
}
varExample();

// console.log(x); // ReferenceError: x is not defined (scoped to varExample function)

console.log(myVar); // undefined (hoisted)
var myVar = 5;
console.log(myVar); // 5
```

## `let` (Modern, Block Scope)

- **Scope:** Block-scoped. Accessible only within the block (`{}`) where it is declared (e.g., inside an `if` statement, `for` loop, or just a plain block).
- **Hoisting:** `let` variables are hoisted to the top of their _block_ scope, but they are not initialized. They exist in a ["Temporal Dead Zone"][tdz] (TDZ) from the start of the block until the declaration is reached. Accessing a `let` before its declaration throws a `ReferenceError`.
- **Reassignment:** Yes, you can change the value of a `let` variable.
- **Redeclaration:** No, you cannot redeclare a `let` variable in the same block scope. This throws a `SyntaxError`.
- **Global Object:** Global `let` declarations do not become properties of the global object.

**Example:**

```js
function letExample() {
  if (true) {
    let x = 10; // Block-scoped to the if block
    console.log(x); // 10
  }
  // console.log(x); // ReferenceError: x is not defined (outside the if block's scope)

  let y = 20;
  // let y = 30; // SyntaxError: Identifier 'y' has already been declared (Redeclaration not allowed)
  y = 30; // Reassignment is allowed
  console.log(y); // 30
}
letExample();

// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization (TDZ)
let myLet = 5;
console.log(myLet); // 5
```

## `const` (Modern, Block Scope, Constant Value)

- **Scope:** Block-scoped (`{}`), just like `let`.
- **Hoisting:** Similar to let, const variables are hoisted to the top of their block scope and are in the TDZ. Accessing before declaration throws a `ReferenceError`. **Crucially,** `const` **variables must be initialized with a value when they are declared.**
- **Reassignment:** No, you cannot reassign a `const` variable after its initial declaration. Attempting to do so throws a `TypeError`.
  - **Important Note:** For objects or arrays declared with `const`, the reference to the object/array cannot be changed (you can't reassign it to a different object/array). However, the contents (properties of an object, elements of an array) **can** be modified.
- **Redeclaration:** No, you cannot redeclare a `const` variable in the same block scope. This throws a `SyntaxError`.
- **Global Object:** Global `const` declarations do not become properties of the global object.

**Example:**

```js
function constExample() {
  if (true) {
    const x = 10; // Block-scoped to the if block
    console.log(x); // 10
  }
  // console.log(x); // ReferenceError: x is not defined (outside the if block's scope)

  const y = 20;
  // const y = 30; // SyntaxError: Identifier 'y' has already been declared (Redeclaration not allowed)
  // y = 30; // TypeError: Assignment to constant variable (Reassignment not allowed)
  console.log(y); // 20

  const myObject = { name: 'Astro' };
  myObject.name = 'Updated Astro'; // Modifying contents is allowed
  console.log(myObject); // { name: 'Updated Astro' }
  // myObject = { name: 'New Object' }; // TypeError: Assignment to constant variable (Reassigning the object reference is NOT allowed)
}
constExample();

// const myConst; // SyntaxError: Missing initializer in const declaration (Must initialize)
// console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization (TDZ)
const myConst = 5;
console.log(myConst); // 5
```

## Comparison Table

| Feature            | `var`                     | `let`                  | `const`                |
| :----------------- | :------------------------ | :--------------------- | :--------------------- |
| **Scope**          | Function/Global           | Block                  | Block                  |
| **Hoisting**       | To top (with `undefined`) | TDZ (`ReferenceError`) | TDZ (`ReferenceError`) |
| **Reassignment**   | Yes                       | Yes                    | No                     |
| **Redeclaration**  | Yes                       | No (`SyntaxError`)     | No (`SyntaxError`)     |
| **Global Object**  | Yes (if global)           | No                     | No                     |
| **Initialization** | Optional                  | Optional               | **Required**           |

## Best Practices

- In modern JavaScript, it's generally recommended to avoid `var`.
- Use `const` by default. This indicates that the variable's reference should not change, improving code predictability and helping prevent accidental reassignments.
- Use `let` if you know the variable needs to be reassigned later in its scope (e.g., loop counters, variables whose value is updated based on conditions).

[tdz]: https://feddi.com

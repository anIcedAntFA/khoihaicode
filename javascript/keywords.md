# JavaScript Fundamentals

## Variables

- **Declaration:** [1]
  - **var:** Function/Global Scope, Hoisted (undefined), Reassignable, Redeclarable [1, 2]
  - **let:** Block Scope, Hoisted (TDZ), Reassignable, Not Redeclarable [3, 4]
  - **const:** Block Scope, Hoisted (TDZ), Not Reassignable (for primitives), Not Redeclarable, **Initialization Required** [3, 5]
- **Scope:** [1, 4, 5]
  - **Function Scope (var)**
  - **Block Scope (let, const)**
  - **Global Scope**
- **Hoisting:** [2]
  - **Definition:** Conceptual movement of declarations to the top [2]
  - **Behavior:** Different for var, let, const [2, 3]
  - **Temporal Dead Zone (TDZ):** let and const [3-5]

## Functions

- **Definition:** Block of reusable code [6]
- **Types:** [7]
  - **Function Declaration:** `function name() {}`, **Hoisted (full)** [3, 8]
  - **Function Expression:** `const/let varName = function() {}`, Hoisted (variable only - TDZ for let/const), Anonymous or named [8, 9]
  - **Arrow Function (ES6):** `(params) => {}`, Concise, No own 'this', Hoisted (variable only - TDZ for let/const) [10]
- **Usage:** [11]
  - **Defining:** `function keyword, name, (), {}` [11]
  - **Calling:** `functionName()` [11]
- **Parameters:** Local variables in function definition [12]
- **Arguments:** Actual values passed when calling [12]
  - **Fewer arguments:** Undefined parameters [13]
  - **More arguments:** Extra ignored [13]
- **Default Parameters (ES6):** `param = defaultValue` [13]
- **Return Values:** `return` keyword [7]
  - Specifies the value [7]
  - Stops execution [7]
  - Implicitly `undefined` if no or empty `return` [7]
- **Benefits:** [14]
  - **Avoid Repetition (DRY)**
  - **Break Down Problems**
  - **Readability and Maintainability**

## Data Types (Key Primitives)

- **Strings:** Sequence of characters [15]
  - **Creation:**
    - Single Quotes: `'text'` [15]
    - Double Quotes: `"text"` [16]
    - **Template Literals:** `` `text ${expression}` `` [16]
      - **String Interpolation:** `${expression}` [16, 17]
      - **Multiline Strings** [16, 18]
  - **Concatenation:** `+` operator (can lead to type coercion) [19]
- **Numbers:** One numeric type (Integers & Floats) [20]
  - **Integers:** Whole numbers [20]
  - **Floats:** Numbers with decimal points [20]

## Operators

- **Assignment Operators:** Assign values to variables [21]
  - **Simple:** `=` [21]
  - **Compound:** `+=`, `-=`, `*=`, `/=`, `%=`, `**=` [21]
- **Arithmetic Operators:** Perform mathematical operations [22]
  - `+`, `-`, `*`, `/`, `% (Modulo)`, `++ (Increment)`, `-- (Decrement)`, `** (Exponentiation)` [22]
  - **Increment/Decrement:** Prefix (`++i`) vs. Postfix (`i++`) [23]

## Hoisting (Revisited for Clarity)

- **Variables:**
  - **var:** Declared at the top of scope with `undefined` [2]
  - **let/const:** Declared at the top of scope but in **Temporal Dead Zone (TDZ)**, must be declared before use [3]
- **Functions:**
  - **Declaration:** Entire function is hoisted, can be called before definition [3]
  - **Expression:** Variable holding the function is hoisted (like variables), not the function itself. Cannot be called before assignment (and declaration for let/const) [9]

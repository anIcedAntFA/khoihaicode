# JavaScript Strings and Template Literals

Strings are a fundamental data type in JavaScript used to represent text. Understanding how to create and combine them is essential.

## What is a String?

A string is a sequence of characters used to represent text. In JavaScript, strings are primitive data types.

## Creating Strings: Different Quotes

### 1. Single Quotes (`'`)

- **Characteristic:** Traditional and commonly used.
- **Use Case:** Simple strings. Particularly useful when the string itself contains **double quotes** (`"`) internally, as you don't need to escape them.
- **Example:**

```js
let message = 'She said, "Hello!"';
console.log(message); // Output: She said, "Hello!"
```

### 2. Double Quotes (`"`)

- **Characteristic:** Traditional and commonly used.
- **Use Case:** Similar to single quotes. Particularly useful when the string itself contains **single quotes** (`'`) internally, avoiding the need for escape characters (`\'`).
- **Example:**

```js
let message = "He said, 'I'm learning JavaScript!'";
console.log(message); // Output: He said, 'I'm learning JavaScript!'
```

### 3. Backticks (`` ` ``) - Template Literals (ES6)

- **Characteristic:** Introduced in ECMAScript 2015 (ES6). Offers more flexibility.
- **Key Features:**
  - **String Interpolation:** Allows embedding variables or expressions directly within the string using the syntax `${expression}`.
  - **Multiline Strings:** Allows the string to span multiple lines in the source code directly, without needing escape characters like `\n`.
- **Use Case:** Ideal for creating strings that combine variables/expressions or for defining multiline text blocks easily.

## String Concatenation (`+`)

The `+` operator is used to combine (concatenate) two or more strings into a single, new string.

```js
// Combining literal strings
let greeting = 'Hello' + ', ' + 'World!';
console.log(greeting); // Output: Hello, World!

// Combining variables and strings
let firstName = 'John';
let lastName = 'Doe';
let fullName = firstName + ' ' + lastName;
console.log(fullName); // Output: John Doe
```

**Important Consideration**: + **Operator Dual Behavior**

- The `+` operator is used for **both number addition and string concatenation**.
- JavaScript determines the behavior based on the types of the operands:
  - If at least one of the operands is a string, the `+` operator performs **concatenation**. Other non-string operands will often be automatically converted to strings (type coercion).
  - If both operands are numbers, the `+` operator performs **addition**.
- **Examples of Type Coercion with `+`**:

```js
console.log('5' + 3); // Output: "53" (number 3 is coerced to string "3")
console.log(5 + '3'); // Output: "53" (number 5 is coerced to string "5")
console.log('5' + '3'); // Output: "53" (both are strings, concatenation)
console.log(5 + 3); // Output: 8 (both are numbers, addition)

console.log(3 + 4 + '5'); // Output: "75" (3 + 4 = 7, then 7 + '5' = "75")
console.log('3' + 4 + 5); // Output: "345" ('3' + 4 = "34", then "34" + 5 = "345")
```

**How to Avoid Confusion with `+`**

To prevent unexpected results when mixing numbers and strings with `+`:

1. **Use Parentheses `()`**: Explicitly group mathematical operations to ensure they are done before concatenation.
2. **Use Intermediate Variables:** Perform calculations first, store the result in a variable, and then concatenate the variable.
3. **Use Template Literals (Recommended):** This is the cleanest way to mix variables, expressions, and strings.

- **Confusing Way:**

```js
let a = 10,
  b = 20;
let msg = 'Sum is: ' + a + b;
console.log(msg); // Output: "Sum is: 1020"
```

- **Clear Ways:**

```js
// Using Parentheses
let a = 10,
  b = 20;
let msg1 = 'Sum is: ' + (a + b); // Addition happens first
console.log(msg1); // Output: "Sum is: 30"

// Using Intermediate Variable
let a = 10,
  b = 20;
let total = a + b; // Math done separately
let msg2 = 'Sum is: ' + total;
console.log(msg2); // Output: "Sum is: 30"

// Using Template Literal (Recommended)
let a = 10,
  b = 20;
let total = a + b;
let msg3 = `Sum of ${a} and ${b} is: ${total}`; // Clear interpolation
console.log(msg3); // Output: "Sum of 10 and 20 is: 30"
```

## Template Literals (Backticks `) Detailed

Template literals offer powerful features using backticks (`` ` ``). They are also known as "Template Strings".

### String Interpolation

- Allows embedding **variables** or **JavaScript expressions** directly within the string.
- Syntax: `${expression}`. The code inside `${}` is evaluated, converted to a string, and inserted at that position.
- **Example:**

  ```js
  let product = 'Gadget';
  let quantity = 5;
  let pricePer = 9.99;
  let message = `You ordered ${quantity} x ${product}s. Total: $${
    quantity * pricePer
  }.`;
  console.log(message); // Output: You ordered 5 x Gadgets. Total: $49.95.
  ```

  - You can interpolate variables (`${quantity}`, `${product}`).
  - You can interpolate expressions (`${quantity * pricePer}`). The expression is evaluated _before_ being inserted.

### Multiline Strings

- Template literals can span multiple lines in your code editor.
- The line breaks and indentation within the backticks are preserved in the resulting string.
- Avoids using `\n` escape characters for simple newlines.

```js
let multi = `This is the first line.
This is the second line, potentially indented.
And the third.`;
console.log(multi);
/* Output:
This is the first line.
    This is the second line, potentially indented.
    And the third.
*/
```

### Combining Interpolation and Multiline

Template literals are powerful because they combine both features.

```js
let user = 'Alice';
let items = 3;
let orderSummary = `Order for ${user}:
- Items: ${items}
- Status: Processing`;
console.log(orderSummary);
/* Output:
Order for Alice:
- Items: 3
- Status: Processing
*/
```

### Quotes Inside Template Literals

Template literals can easily contain both single (`'`) and double (`"`) quotes without needing to escape them.

```js
let text = `He said, "I'm ready!"`;
console.log(text); // Output: He said, "I'm ready!"
```

## Common Pitfalls

- **Mismatched Quotes:** Using a quote character inside a string that's defined with the same type of quote without escaping it (e.g., `'I'm here'` will cause an error; use `"I'm here"` or `'I\'m here'`).
- **Confusing + with Type Coercion:** Not understanding how `+` performs concatenation when a string is involved, especially in expressions like `1 + 2 + '3'` or `'1' + 2 + 3`. Remember if either operand is a string, it's concatenation.
- **Forgetting Backticks:** Attempting to use `${}` for interpolation or including direct line breaks within strings defined by `'` or `"`. These features only work with backticks (`` ` ``).

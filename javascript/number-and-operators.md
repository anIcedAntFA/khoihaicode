# JavaScript Numbers and Operators Summary

This document covers the basic number types in JavaScript and the common operators used for arithmetic and assignment.

## Number Types

JavaScript has one numeric type, but we often distinguish between values that are whole numbers and those with decimals:

- **Integers:** Whole numbers (positive, negative, or zero) with no decimal part.
  - _Example:_ `-3`, `0`, `7`
- **Floats (Floating-Point Numbers):** Numbers that can have a decimal point. This includes all integers as well.
  - _Example:_ `-3`, `0`, `7`, `1.5`, `-3.2`

## Arithmetic Operators

Used to perform mathematical operations.

| Operator | Meaning                | Example Result                         |
| :------- | :--------------------- | :------------------------------------- |
| `+`      | Addition               | `5 + 3` is `8`                         |
| `-`      | Subtraction            | `10 - 4` is `6`                        |
| `*`      | Multiplication         | `4 * 3` is `12`                        |
| `/`      | Division               | `10 / 2` is `5`                        |
| `%`      | Modulo (Remainder)     | `10 % 3` is `1`                        |
| `++`     | Increment (add 1)      | `let a = 5; a++;` makes `a` become `6` |
| `--`     | Decrement (subtract 1) | `let b = 5; b--;` makes `b` become `4` |
| `**`     | Exponentiation         | `3 ** 2` is `9` (3 to the power of 2)  |

> **Note on Division (`/`)**:
> In JavaScript, dividing by `0` results in `Infinity` (for positive numbers), `-Infinity` (for negative numbers), or `NaN` (Not a Number) for `0 / 0`. It does not typically throw an error that crashes the program immediately.

### Increment (`++`) and Decrement (`--`) Operator Details

The increment (`++`) and decrement (`--`) operators add or subtract `1` from a variable's value. They can be used as a **prefix** (before the variable) or a **postfix** (after the variable). The choice matters when the operator is used **within a larger expression**.

## Assignment Operators

Used to assign values to variables.

- **Simple Assignment (`=`):** Assigns the value on the right to the variable on the left.
  - _Example:_ `let age = 25;`
- **Compound Assignment:** Combines an arithmetic operation with assignment.

| Operator | Meaning                 | Equivalent to | Example                           |
| :------- | :---------------------- | :------------ | :-------------------------------- |
| `=`      | Assign                  | `x = y`       | `a = 10;`                         |
| `+=`     | Add and Assign          | `x = x + y`   | `a += 3;` (`a` becomes `a + 3`)   |
| `-=`     | Subtract and Assign     | `x = x - y`   | `b -= 4;` (`b` becomes `b - 4`)   |
| `*=`     | Multiply and Assign     | `x = x * y`   | `c *= 3;` (`c` becomes `c * 3`)   |
| `/=`     | Divide and Assign       | `x = x / y`   | `d /= 4;` (`d` becomes `d / 4`)   |
| `%=`     | Modulo and Assign       | `x = x % y`   | `a %= 3;` (`a` becomes `a % 3`)   |
| `**=`    | Exponentiate and Assign | `x = x ** y`  | `b **= 2;` (`b` becomes `b ** 2`) |

## Common Pitfalls

- **Division by Zero:** Be aware that it results in `Infinity`, `-Infinity`, or `NaN`, not an error.
- **Operator Precedence:** Operations are performed in a specific order (e.g., multiplication and division before addition and subtraction). Use parentheses `()` to control the order if needed.
- **Modulo Operator (`%`):** Remember it gives the _remainder_ of a division, not the fractional part or the integer result.

---
title: "Expressions and operators (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/expressions_and_operators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Expressions and operators (part 2 of 3)

## Comparison operators

A comparison operator compares its operands and returns a logical value based on whether the comparison is true.
The operands can be numerical, string, logical, or object values.
Strings are compared based on standard lexicographical ordering, using Unicode values.
In most cases, if the two operands are not of the same type, JavaScript attempts to convert them to an appropriate type for the comparison.
This behavior generally results in comparing the operands numerically.
The sole exceptions to type conversion within comparisons involve the `===` and `!==` operators, which perform strict equality and inequality comparisons.
These operators do not attempt to convert the operands to compatible types before checking equality.
The following table describes the comparison operators in terms of this sample code:

```js
const var1 = 3;
const var2 = 4;
```

    Comparison operators

       | Operator
       | Description
       | Examples returning true

       |
        Equal (`==`)

       | Returns `true` if the operands are equal.
       |
        `3 == var1`
        `"3" == var1`
        `3 == '3'`

       |
        Not equal (`!=`)

       | Returns `true` if the operands are not equal.
       |
        <code>var1 != 4var2 != "3"</code>

       |
        Strict equal (`===`)

       |
        Returns `true` if the operands are equal and of the same
        type. See also `Object.is` and
        sameness in JS.

       | `3 === var1`

       |
        Strict not equal (`!==`)

       |
        Returns `true` if the operands are of the same type but not equal, or are of different type.

       |
        <code>var1 !== "3"3 !== '3'</code>

       |
        Greater than (`>`)

       |
        Returns `true` if the left operand is greater than the right operand.

       |
        <code>var2 > var1"12" > 2</code>

       |
        Greater than or equal
        (`>=`)

       |
        Returns `true` if the left operand is greater than or equal to the right operand.

       |
        <code>var2 >= var1var1 >= 3</code>

       |
        Less than
        (`&#x3C;`)

       |
        Returns `true` if the left operand is less than the right operand.

       |
        <code>var1 &#x3C; var2"2" &#x3C; 12</code>

       |
        Less than or equal
        (`&#x3C;=`)

       |
        Returns `true` if the left operand is less than or equal to the right operand.

       |
        <code>var1 &#x3C;= var2var2 &#x3C;= 5</code>

> **Note:**
> `=>` is not a comparison operator but rather is the notation
> for Arrow functions.

## Arithmetic operators

An arithmetic operator takes numerical values (either literals or variables) as their operands and returns a single numerical value.
The standard arithmetic operators are addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
These operators work as they do in most other programming languages when used with floating point numbers (in particular, note that division by zero produces `Infinity`). For example:

```js
1 / 2; // 0.5
1 / 2 === 1.0 / 2.0; // this is true
```

In addition to the standard arithmetic operations (`+`, `-`, `*`, `/`), JavaScript provides the arithmetic operators listed in the following table:

    Arithmetic operators

       | Operator
       | Description
       | Example

       |
        Remainder (`%`)

       |
        Binary operator. Returns the integer remainder of dividing the two operands.

       | 12 % 5 returns 2.

       |
        Increment (`++`)

       |
        Unary operator. Adds one to its operand. If used as a prefix operator
        (`++x`), returns the value of its operand after adding one;
        if used as a postfix operator (`x++`), returns the value of
        its operand before adding one.

       |
        If `x` is 3, then `++x` sets `x` to 4
        and returns 4, whereas `x++` returns 3 and, only then, sets `x` to 4.

       |
        Decrement (`--`)

       |
        Unary operator. Subtracts one from its operand.
        The return value is analogous to that for the increment operator.

       |
        If `x` is 3, then `--x` sets `x` to 2
        and returns 2, whereas `x--` returns 3 and, only then, sets `x` to 2.

       |
        Unary negation (`-`)

       | Unary operator. Returns the negation of its operand.
       | If `x` is 3, then `-x` returns -3.

       |
        Unary plus (`+`)

       |
        Unary operator. Attempts to convert the operand to a number, if it is not already.

       |
        `+"3"` returns `3`.
        `+true` returns `1`.

       |
        Exponentiation operator (`**`)

       |
        Calculates the `base` to the `exponent` power,
        that is, `base^exponent`

       |
        `2 ** 3` returns `8`.`10 ** -1`
        returns `0.1`.

## Bitwise operators

A bitwise operator treats their operands as a set of 32 bits (zeros and ones), rather
than as decimal, hexadecimal, or octal numbers. For example, the decimal number nine has
a binary representation of 1001. Bitwise operators perform their operations on such
binary representations, but they return standard JavaScript numerical values.

The following table summarizes JavaScript's bitwise operators.

| Operator                                                                                     | Usage     | Description                                                                                                                                                             |
| -------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bitwise AND                    | `a & b`   | Returns a one in each bit position for which the corresponding bits of both operands are ones.                                                                          |
| Bitwise OR                      | `a \| b`  | Returns a zero in each bit position for which the corresponding bits of both operands are zeros.                                                                        |
| Bitwise XOR                    | `a ^ b`   | Returns a zero in each bit position for which the corresponding bits are the same. [Returns a one in each bit position for which the corresponding bits are different.] |
| Bitwise NOT                    | `~ a`     | Inverts the bits of its operand.                                                                                                                                        |
| Left shift                      | `a << b`  | Shifts `a` in binary representation `b` bits to the left, shifting in zeros from the right.                                                                             |
| Sign-propagating right shift   | `a >> b`  | Shifts `a` in binary representation `b` bits to the right, discarding bits shifted off.                                                                                 |
| Zero-fill right shift | `a >>> b` | Shifts `a` in binary representation `b` bits to the right, discarding bits shifted off, and shifting in zeros from the left.                                            |

### Bitwise logical operators

Conceptually, the bitwise logical operators work as follows:

- The operands are converted to thirty-two-bit integers and expressed by a series of bits (zeros and ones).
  Numbers with more than 32 bits get their most significant bits discarded.
  For example, the following integer with more than 32 bits will be converted to a 32-bit integer:

  ```plain
  Before: 1110 0110 1111 1010 0000 0000 0000 0110 0000 0000 0001
  After:                 1010 0000 0000 0000 0110 0000 0000 0001
  ```

- Each bit in the first operand is paired with the corresponding bit in the second operand: first bit to first bit, second bit to second bit, and so on.
- The operator is applied to each pair of bits, and the result is constructed bitwise.

For example, the binary representation of nine is 1001, and the binary representation of fifteen is 1111.
So, when the bitwise operators are applied to these values, the results are as follows:

| Expression | Result | Binary Description                                |
| ---------- | ------ | ------------------------------------------------- |
| `15 & 9`   | `9`    | `1111 & 1001 = 1001`                              |
| `15 \| 9`  | `15`   | `1111 \| 1001 = 1111`                             |
| `15 ^ 9`   | `6`    | `1111 ^ 1001 = 0110`                              |
| `~15`      | `-16`  | `~ 0000 0000 … 0000 1111 = 1111 1111 … 1111 0000` |
| `~9`       | `-10`  | `~ 0000 0000 … 0000 1001 = 1111 1111 … 1111 0110` |

Note that all 32 bits are inverted using the Bitwise NOT operator, and that values with
the most significant (left-most) bit set to 1 represent negative numbers
(two's-complement representation). `~x` evaluates to the same value that
`-x - 1` evaluates to.

### Bitwise shift operators

The bitwise shift operators take two operands: the first is a quantity to be shifted, and the second specifies the number of bit positions by which the first operand is to be
shifted.
The direction of the shift operation is controlled by the operator used.

Shift operators convert their operands to thirty-two-bit integers and return a result of either type `Number` or `BigInt`: specifically, if the type
of the left operand is `BigInt`, they return `BigInt`;
otherwise, they return `Number`.

The shift operators are listed in the following table.

    Bitwise shift operators

       | Operator
       | Description
       | Example

       |
        Left shift(`&#x3C;&#x3C;`)

       |
        This operator shifts the first operand the specified number of bits to
        the left. Excess bits shifted off to the left are discarded. Zero bits
        are shifted in from the right.

       |
        `9&#x3C;&#x3C;2` yields 36, because 1001 shifted 2 bits to
        the left becomes 100100, which is 36.

       |
        Sign-propagating right shift (`>>`)

       |
        This operator shifts the first operand the specified number of bits to
        the right. Excess bits shifted off to the right are discarded. Copies of
        the leftmost bit are shifted in from the left.

       |
        `9>>2` yields 2, because 1001 shifted 2 bits to the right
        becomes 10, which is 2. Likewise, `-9>>2` yields -3, because the sign is preserved.

       |
        Zero-fill right shift (`>>>`)

       |
        This operator shifts the first operand the specified number of bits to
        the right. Excess bits shifted off to the right are discarded. Zero bits
        are shifted in from the left.

       |
        `19>>>2` yields 4, because 10011 shifted 2 bits to the right
        becomes 100, which is 4. For non-negative numbers, zero-fill right shift
        and sign-propagating right shift yield the same result.

## Logical operators

Logical operators are typically used with Boolean (logical) values; when they are, they return a Boolean value.
However, the `&&`, `||`, and `??` operators actually return the value of one of the specified operands, so if these
operators are used with non-Boolean values, they may return a non-Boolean value. As such, they are more adequately called "value selection operators".
The logical operators are described in the following table.

    Logical operators

       | Operator
       | Usage
       | Description

       |
        Logical AND (`&#x26;&#x26;`)

       | `expr1 &#x26;&#x26; expr2`
       |
        Returns `expr1` if it can be converted to `false`;
        otherwise, returns `expr2`. Thus, when used with Boolean
        values, `&#x26;&#x26;` returns `true` if both
        operands are true; otherwise, returns `false`.

       |
        Logical OR (`||`)

       | `expr1 || expr2`
       |
        Returns `expr1` if it can be converted to `true`;
        otherwise, returns `expr2`. Thus, when used with Boolean
        values, `||` returns `true` if either operand is
        true; if both are false, returns `false`.

       |
        Nullish coalescing operator (`??`)

       | `expr1 ?? expr2`
       |
        Returns `expr1` if it is neither `null` nor
        `undefined`; otherwise, returns `expr2`.

       |
        Logical NOT (`!`)

       | `!expr`
       |
        Returns `false` if its single operand can be converted
        to `true`; otherwise, returns `true`.

Examples of expressions that can be converted to `false` are those that evaluate to `null`, `0`, `0n`, `NaN`, the empty string (`""`), or `undefined`.

The following code shows examples of the `&&` (logical AND) operator.

```js
const a1 = true && true; // t && t returns true
const a2 = true && false; // t && f returns false
const a3 = false && true; // f && t returns false
const a4 = false && 3 === 4; // f && f returns false
const a5 = "Cat" && "Dog"; // t && t returns Dog
const a6 = false && "Cat"; // f && t returns false
const a7 = "Cat" && false; // t && f returns false
```

The following code shows examples of the `||` (logical OR) operator.

```js
const o1 = true || true; // t || t returns true
const o2 = false || true; // f || t returns true
const o3 = true || false; // t || f returns true
const o4 = false || 3 === 4; // f || f returns false
const o5 = "Cat" || "Dog"; // t || t returns Cat
const o6 = false || "Cat"; // f || t returns Cat
const o7 = "Cat" || false; // t || f returns Cat
```

The following code shows examples of the `??` (nullish coalescing) operator.

```js
const n1 = null ?? 1; // 1
const n2 = undefined ?? 2; // 2
const n3 = false ?? 3; // false
const n4 = 0 ?? 4; // 0
```

Note how `??` works like `||`, but it only returns the second expression when the first one is "nullish", i.e., `null` or `undefined`. `??` is a better alternative than `||` for setting defaults for values that might be `null` or `undefined`, in particular when values like `''` or `0` are valid values and the default should not apply.

The following code shows examples of the `!` (logical NOT) operator.

```js
const n1 = !true; // !t returns false
const n2 = !false; // !f returns true
const n3 = !"Cat"; // !t returns false
```

### Short-circuit evaluation

As logical expressions are evaluated left to right, they are tested for possible
"short-circuit" evaluation using the following rules:

- `falsy && anything` is short-circuit evaluated to the falsy value.
- `truthy || anything` is short-circuit evaluated to the truthy value.
- `nonNullish ?? anything` is short-circuit evaluated to the non-nullish value.

The rules of logic guarantee that these evaluations are always correct. Note that the
_anything_ part of the above expressions is not evaluated, so any side effects of
doing so do not take effect.

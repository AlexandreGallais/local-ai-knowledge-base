---
title: "Operator precedence (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/operator_precedence/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Operator precedence (part 2 of 2)

## Table

The following table lists operators in order from highest precedence (18) to lowest precedence (1).

Several general notes about the table:

1. Not all syntax included here are "operators" in the strict sense. For example, spread `...` and arrow `=>` are typically not regarded as operators. However, we still included them to show how tightly they bind compared to other operators/expressions.
2. Some operators have certain operands that require expressions narrower than those produced by higher-precedence operators. For example, the right-hand side of member access `.` (precedence 17) must be an identifier instead of a grouped expression. The left-hand side of arrow `=>` (precedence 2) must be an arguments list or a single identifier instead of some random expression.
3. Some operators have certain operands that accept expressions wider than those produced by higher-precedence operators. For example, the bracket-enclosed expression of bracket notation `[ … ]` (precedence 17) can be any expression, even comma (precedence 1) joined ones. These operators act as if that operand is "automatically grouped". In this case we will omit the associativity.

       | Precedence
       | Associativity
       | Individual operators
       | Notes

       | 18: grouping
       | n/a
       | `Grouping``(x)`
       | [1]

       | 17: access and call
       |
        left-to-right

       | `Member access``x.y`
       | [2]

       | `Optional chaining``x?.y`

       | n/a
       |
        `Computed member access``x[y]`

       | [3]

       | `new` with argument list`new x(y)`
       | [4]

       |
        Function call`x(y)`

       | `import(x)`

       | 16: new
       | n/a
       | `new` without argument list`new x`

       | 15: postfix operators
       | n/a
       |
        `Postfix increment``x++`

       | [5]

       |
        `Postfix decrement``x--`

       | 14: prefix operators
       | n/a
       |
        `Prefix increment``++x`

       | [6]

       |
        `Prefix decrement``--x`

       |
        `Logical NOT``!x`

       |
        `Bitwise NOT``~x`

       |
        `Unary plus``+x`

       |
        `Unary negation``-x`

       | `typeof x`

       | `void x`

       | `delete x`
       | [7]

       | `await x`

       | 13: exponentiation
       | right-to-left
       |
        `Exponentiation``x ** y`

       | [8]

       | 12: multiplicative operators
       | left-to-right
       |
        `Multiplication``x * y`

       |
        `Division``x / y`

       |
        `Remainder``x % y`

       | 11: additive operators
       | left-to-right
       |
        `Addition``x + y`

       |
        `Subtraction``x - y`

       | 10: bitwise shift
       | left-to-right
       |
        `Left shift``x &#x3C;&#x3C; y`

       |
        `Right shift``x >> y`

       |
        `Unsigned right shift``x >>> y`

       | 9: relational operators
       | left-to-right
       |
        `Less than``x &#x3C; y`

       |
        `Less than or equal``x &#x3C;= y`

       |
        `Greater than``x > y`

       |
        `Greater than or equal``x >= y`

       | `x in y`

       | `x instanceof y`

       | 8: equality operators
       | left-to-right
       |
        `Equality``x == y`

       |
        `Inequality``x != y`

       |
        `Strict equality``x === y`

       |
        `Strict inequality``x !== y`

       | 7: bitwise AND
       | left-to-right
       |
        `Bitwise AND``x &#x26; y`

       | 6: bitwise XOR
       | left-to-right
       |
        `Bitwise XOR``x ^ y`

       | 5: bitwise OR
       | left-to-right
       |
        `Bitwise OR``x | y`

       | 4: logical AND
       | left-to-right
       |
        `Logical AND``x &#x26;&#x26; y`

       | 3: logical OR, nullish coalescing
       | left-to-right
       |
        `Logical OR``x || y`

       |
        `Nullish coalescing operator``x ?? y`

       | [9]

       | 2: assignment and miscellaneous
       | right-to-left
       |
        `Assignment``x = y`

       | [10]

       |
        `Addition assignment``x += y`

       |
        `Subtraction assignment``x -= y`

       |
        `Exponentiation assignment``x **= y`

       |
        `Multiplication assignment``x *= y`

       |
        `Division assignment``x /= y`

       |
        `Remainder assignment``x %= y`

       |
        `Left shift assignment``x &#x3C;&#x3C;= y`

       |
        `Right shift assignment``x >>= y`

       |
        `Unsigned right shift assignment``x >>>= y`

       |
        `Bitwise AND assignment``x &#x26;= y`

       |
        `Bitwise XOR assignment``x ^= y`

       |
        `Bitwise OR assignment``x |= y`

       |
        `Logical AND assignment``x &#x26;&#x26;= y`

       |
        `Logical OR assignment``x ||= y`

       |
        `Nullish coalescing assignment``x ??= y`

       | right-to-left
       |
        Conditional (ternary) operator`x ? y : z`

       | [11]

       | right-to-left
       |
        Arrow`x => y`

       | [12]

       | n/a
       | `yield x`

       | `yield* x`

       |
        Spread`...x`

       | [13]

       | 1: comma
       | left-to-right
       |
        `Comma operator``x, y`

Notes:

1. The operand can be any expression.
2. The "right-hand side" must be an identifier.
3. The "right-hand side" can be any expression.
4. The "right-hand side" is a comma-separated list of any expression with precedence > 1 (i.e., not comma expressions). The constructor of a `new` expression cannot be an optional chain.
5. The operand must be a valid assignment target (identifier or property access). Its precedence means `new Foo++` is `(new Foo)++` (a syntax error) and not `new (Foo++)` (a TypeError: (Foo++) is not a constructor).
6. The operand must be a valid assignment target (identifier or property access).
7. The operand cannot be an identifier or a private element access.
8. The left-hand side cannot have precedence 14.
9. The operands cannot be a logical OR `||` or logical AND `&&` operator without grouping.
10. The "left-hand side" must be a valid assignment target (identifier or property access).
11. The associativity means the two expressions after `?` are implicitly grouped.
12. The "left-hand side" is a single identifier or a parenthesized parameter list.
13. Only valid inside object literals, array literals, or argument lists.

The precedence of groups 17 and 16 may be a bit ambiguous. Here are a few examples to clarify.

- Optional chaining is always substitutable for its respective syntax without optionality (barring a few special cases where optional chaining is forbidden). For example, any place that accepts `a?.b` also accepts `a.b` and vice versa, and similarly for `a?.()`, `a()`, etc.
- Member expressions and computed member expressions are always substitutable for each other.
- Call expressions and `import()` expressions are always substitutable for each other.
- This leaves four classes of expressions: member access, `new` with arguments, function call, and `new` without arguments.
  - The "left-hand side" of a member access can be: a member access (`a.b.c`), `new` with arguments (`new a().b`), and function call (`a().b`).
  - The "left-hand side" of `new` with arguments can be: a member access (`new a.b()`) and `new` with arguments (`new new a()()`).
  - The "left-hand side" of a function call can be: a member access (`a.b()`), `new` with arguments (`new a()()`), and function call (`a()()`).
  - The operand of `new` without arguments can be: a member access (`new a.b`), `new` with arguments (`new new a()`), and `new` without arguments (`new new a`).

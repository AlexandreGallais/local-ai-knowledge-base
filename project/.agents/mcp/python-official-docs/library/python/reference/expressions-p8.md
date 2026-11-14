---
title: "Expressions (part 8 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions (part 8 of 8)

## Expression lists

```text
python-grammar
starred_expression: "*" `or_expr` | `expression`
flexible_expression: `assignment_expression` | `starred_expression`
flexible_expression_list: `flexible_expression` ("," `flexible_expression`)* [","]
starred_expression_list: `starred_expression` ("," `starred_expression`)* [","]
expression_list: `expression` ("," `expression`)* [","]
yield_list: `expression_list` | `starred_expression` "," [`starred_expression_list`]
```

Except when part of a list or set display, an expression list
containing at least one comma yields a tuple.  The length of
the tuple is the number of expressions in the list.  The expressions are
evaluated from left to right.

A trailing comma is required only to create a one-item tuple,
such as `1,`; it is optional in all other cases.
A single expression without a
trailing comma doesn't create a tuple, but rather yields the value of that
expression. (To create an empty tuple, use an empty pair of parentheses:
`()`.)

### Iterable unpacking

In an expression list or tuple, list or set display, any expression
may be prefixed with an asterisk (`*`).
This denotes iterable unpacking.

At runtime, the asterisk-prefixed expression must evaluate
to an iterable.
The iterable is expanded into a sequence of items,
which are included in the new tuple, list, or set, at the site of
the unpacking.

> *Added in version 3.5.*
> Iterable unpacking in expression lists, originally proposed by PEP 448.

> *Added in version 3.11.*
> Any item in an expression list may be starred. See PEP 646.

## Evaluation order

Python evaluates expressions from left to right.  Notice that while evaluating
an assignment, the right-hand side is evaluated before the left-hand side.

In the following lines, expressions will be evaluated in the arithmetic order of
their suffixes:

```
expr1, expr2, expr3, expr4
(expr1, expr2, expr3, expr4)
{expr1: expr2, expr3: expr4}
expr1 + expr2 * (expr3 - expr4)
expr1(expr2, expr3, *expr4, **expr5)
expr3, expr4 = expr1, expr2
```

## Operator precedence

The following table summarizes the operator precedence in Python, from highest
precedence (most binding) to lowest precedence (least binding).  Operators in
the same box have the same precedence.  Unless the syntax is explicitly given,
operators are binary.  Operators in the same box group left to right (except for
exponentiation and conditional expressions, which group from right to left).

Note that comparisons, membership tests, and identity tests, all have the same
precedence and have a left-to-right chaining feature as described in the
comparisons section.

```text
+-----------------------------------------------+-------------------------------------+
| Operator                                      | Description                         |
+===============================================+=====================================+
| ``(expressions...)``,                         | Binding or parenthesized            |
|                                               | expression,                         |
| ``[expressions...]``,                         | list display,                       |
| ``{key: value...}``,                          | dictionary display,                 |
| ``{expressions...}``                          | set display                         |
+-----------------------------------------------+-------------------------------------+
| ``x[index]``, ``x[index:index]``              | Subscription (including slicing),   |
| ``x(arguments...)``, ``x.attribute``          | call, attribute reference           |
+-----------------------------------------------+-------------------------------------+
| :keyword:`await x <await>`                    | Await expression                    |
+-----------------------------------------------+-------------------------------------+
| ``**``                                        | Exponentiation [#]_                 |
+-----------------------------------------------+-------------------------------------+
| ``+x``, ``-x``, ``~x``                        | Positive, negative, bitwise NOT     |
+-----------------------------------------------+-------------------------------------+
| ``*``, ``@``, ``/``, ``//``, ``%``            | Multiplication, matrix              |
|                                               | multiplication, division, floor     |
|                                               | division, remainder [#]_            |
+-----------------------------------------------+-------------------------------------+
| ``+``, ``-``                                  | Addition and subtraction            |
+-----------------------------------------------+-------------------------------------+
| ``<<``, ``>>``                                | Shifts                              |
+-----------------------------------------------+-------------------------------------+
| ``&``                                         | Bitwise AND                         |
+-----------------------------------------------+-------------------------------------+
| ``^``                                         | Bitwise XOR                         |
+-----------------------------------------------+-------------------------------------+
| ``|``                                         | Bitwise OR                          |
+-----------------------------------------------+-------------------------------------+
| :keyword:`in`, :keyword:`not in`,             | Comparisons, including membership   |
| :keyword:`is`, :keyword:`is not`, ``<``,      | tests and identity tests            |
| ``<=``, ``>``, ``>=``, ``!=``, ``==``         |                                     |
+-----------------------------------------------+-------------------------------------+
| :keyword:`not x <not>`                        | Boolean NOT                         |
+-----------------------------------------------+-------------------------------------+
| :keyword:`and`                                | Boolean AND                         |
+-----------------------------------------------+-------------------------------------+
| :keyword:`or`                                 | Boolean OR                          |
+-----------------------------------------------+-------------------------------------+
| :keyword:`if <if_expr>` -- :keyword:`!else`   | Conditional expression              |
+-----------------------------------------------+-------------------------------------+
| :keyword:`lambda`                             | Lambda expression                   |
+-----------------------------------------------+-------------------------------------+
| ``:=``                                        | Assignment expression               |
+-----------------------------------------------+-------------------------------------+
```

**Footnotes**

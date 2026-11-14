---
title: "`<calc-sum>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/calc-sum/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<calc-sum>` CSS type

The **`<calc-sum>`** CSS data type represents an expression which performs a calculation in any CSS math function. The expression executes a basic <example-value> operation of addition and subtraction between two values.

## Syntax

The `<calc-sum>` type defines two numeric values and one of the following arithmetic operators between them.

- `+`
    Adds two numbers together.

- `-`
    Subtracts the right number from the left.

## Description

The operands in the expression may be any `<length>` syntax value. You can use `<length>`, `<frequency>`, `angle`, `<time>`, `<percentage>`, `<number>`, or `<integer>`.

The two operands' types must be consistent. For lengths, you can't use `0` to mean `0px` (or another length unit). Instead, you must add an explicit unit: `margin-top: calc(0px + 20px);` is valid, while `margin-top: calc(0 + 20px);` is invalid. Percentage value types are resolved based on the context. For example, `margin-top: calc(50% + 20px);` is valid because `margin-top` resolves percentages to lengths.

Including CSS variables in `calc-sum` expressions is also allowed. The following code `calc(10px + var(--variable))`, is a valid expression.

The `+` and `-` operators **must be surrounded by whitespace**. For instance, `calc(50% -8px)` will be parsed as "a percentage followed by a negative length" — which is an invalid expression — while `calc(50% - 8px)` is "a percentage followed by a subtraction operator and a length". Likewise, `calc(8px + -50%)` is treated as "a length followed by an addition operator and a negative percentage".

## See also

- `<calc-product>`
- `<calc-value>`
- `<calc-keyword>`

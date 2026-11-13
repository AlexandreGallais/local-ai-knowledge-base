---
title: "Operator precedence (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/operator_precedence/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Operator precedence

**Operator precedence** determines how operators are parsed concerning each other. Operators with higher precedence become the operands of operators with lower precedence.

```js
console.log(3 + 4 * 5); // 3 + 20
// Expected output: 23

console.log(4 * 3 ** 2); // 4 * 9
// Expected output: 36

let a;
let b;

console.log((a = b = 5));
// Expected output: 5
```

## Precedence and associativity

Consider an expression describable by the representation below, where both `OP1` and `OP2` are fill-in-the-blanks for OPerators.

```plain
a OP1 b OP2 c
```

The combination above has two possible interpretations:

```plain
(a OP1 b) OP2 c
a OP1 (b OP2 c)
```

Which one the language decides to adopt depends on the identity of `OP1` and `OP2`.

If `OP1` and `OP2` have different precedence levels (see the table below), the operator with the higher _precedence_ goes first and associativity does not matter. Observe how multiplication has higher precedence than addition and executed first, even though addition is written first in the code.

```js
console.log(3 + 10 * 2); // 23
console.log(3 + (10 * 2)); // 23, because parentheses here are superfluous
console.log((3 + 10) * 2); // 26, because the parentheses change the order
```

Within operators of the same precedence, the language groups them by _associativity_. _Left-associativity_ (left-to-right) means that it is interpreted as `(a OP1 b) OP2 c`, while _right-associativity_ (right-to-left) means it is interpreted as `a OP1 (b OP2 c)`. Assignment operators are right-associative, so you can write:

```js
a = b = 5; // same as writing a = (b = 5);
```

with the expected result that `a` and `b` get the value 5. This is because the assignment operator returns the value that is assigned. First, `b` is set to 5. Then the `a` is also set to 5 — the return value of `b = 5`, a.k.a. right operand of the assignment.

As another example, the unique exponentiation operator has right-associativity, whereas other arithmetic operators have left-associativity.

```js
const a = 4 ** 3 ** 2; // Same as 4 ** (3 ** 2); evaluates to 262144
const b = 4 / 3 / 2; // Same as (4 / 3) / 2; evaluates to 0.6666...
```

Operators are first grouped by precedence, and then, for adjacent operators that have the same precedence, by associativity. So, when mixing division and exponentiation, the exponentiation always comes before the division. For example, `2 ** 3 / 3 ** 2` results in 0.8888888888888888 because it is the same as `(2 ** 3) / (3 ** 2)`.

For prefix unary operators, suppose we have the following pattern:

```plain
OP1 a OP2 b
```

where `OP1` is a prefix unary operator and `OP2` is a binary operator. If `OP1` has higher precedence than `OP2`, then it would be grouped as `(OP1 a) OP2 b`; otherwise, it would be `OP1 (a OP2 b)`.

```js
const a = 1;
const b = 2;
typeof a + b; // Equivalent to (typeof a) + b; result is "number2"
```

If the unary operator is on the second operand:

```plain
a OP2 OP1 b
```

Then the binary operator `OP2` must have lower precedence than the unary operator `OP1` for it to be grouped as `a OP2 (OP1 b)`. For example, the following is invalid:

```js
function* foo() {
  a + yield 1;
}
```

Because `+` has higher precedence than `yield`, this would become `(a + yield) 1` — but because `yield` is a reserved word in generator functions, this would be a syntax error. Luckily, most unary operators have higher precedence than binary operators and do not suffer from this pitfall.

If we have two prefix unary operators:

```plain
OP1 OP2 a
```

Then the unary operator closer to the operand, `OP2`, must have higher precedence than `OP1` for it to be grouped as `OP1 (OP2 a)`. It's possible to get it the other way and end up with `(OP1 OP2) a`:

```js
async function* foo() {
  await yield 1;
}
```

Because `await` has higher precedence than `yield`, this would become `(await yield) 1`, which is awaiting an identifier called `yield`, and a syntax error. Similarly, if you have `new !A;`, because `!` has lower precedence than `new`, this would become `(new !) A`, which is obviously invalid. (This code looks nonsensical to write anyway, since `!A` always produces a boolean, not a constructor function.)

For postfix unary operators (namely, `++` and `--`), the same rules apply. Luckily, both operators have higher precedence than any binary operator, so the grouping is always what you would expect. Moreover, because `++` evaluates to a _value_, not a _reference_, you can't chain multiple increments together either.

```js
let a = 1;
a++++; // SyntaxError: Invalid left-hand side in postfix operation.
```

Operator precedence will be handled _recursively_. For example, consider this expression:

```js
1 + 2 ** 3 * 4 / 5 >> 6
```

First, we group operators with different precedence by decreasing levels of precedence.

1. The `**` operator has the highest precedence, so it's grouped first.
2. Looking around the `**` expression, it has `*` on the right and `+` on the left. `*` has higher precedence, so it's grouped first. `*` and `/` have the same precedence, so we group them together for now.
3. Looking around the `*`/`/` expression grouped in 2, because `+` has higher precedence than `>>`, the former is grouped.

```js
   (1 + ( (2 ** 3) * 4 / 5) ) >> 6
// │    │ └─ 1. ─┘        │ │
// │    └────── 2. ───────┘ │
// └────────── 3. ──────────┘
```

Within the `*`/`/` group, because they are both left-associative, the left operand would be grouped.

```js
   (1 + ( ( (2 ** 3) * 4 ) / 5) ) >> 6
// │    │ │ └─ 1. ─┘     │    │ │
// │    └─│─────── 2. ───│────┘ │
// └──────│───── 3. ─────│──────┘
//        └───── 4. ─────┘
```

Note that operator precedence and associativity only affect the order of evaluation of _operators_ (the implicit grouping), but not the order of evaluation of _operands_. The operands are always evaluated from left-to-right. The higher-precedence expressions are always evaluated first, and their results are then composed according to the order of operator precedence.

```js
function echo(name, num) {
  console.log(`Evaluating the ${name} side`);
  return num;
}
// Exponentiation operator (**) is right-associative,
// but all call expressions (echo()), which have higher precedence,
// will be evaluated before ** does
console.log(echo("left", 4) ** echo("middle", 3) ** echo("right", 2));
// Evaluating the left side
// Evaluating the middle side
// Evaluating the right side
// 262144

// Exponentiation operator (**) has higher precedence than division (/),
// but evaluation always starts with the left operand
console.log(echo("left", 4) / echo("middle", 3) ** echo("right", 2));
// Evaluating the left side
// Evaluating the middle side
// Evaluating the right side
// 0.4444444444444444
```

If you are familiar with binary trees, think about it as a post-order traversal.

```plain
                /
       ┌────────┴────────┐
echo("left", 4)         **
                ┌────────┴────────┐
        echo("middle", 3)  echo("right", 2)
```

After all operators have been properly grouped, the binary operators would form a binary tree. Evaluation starts from the outermost group — which is the operator with the lowest precedence (`/` in this case). The left operand of this operator is first evaluated, which may be composed of higher-precedence operators (such as a call expression `echo("left", 4)`). After the left operand has been evaluated, the right operand is evaluated in the same fashion. Therefore, all leaf nodes — the `echo()` calls — would be visited left-to-right, regardless of the precedence of operators joining them.

## Short-circuiting

In the previous section, we said "the higher-precedence expressions are always evaluated first" — this is generally true, but it has to be amended with the acknowledgement of _short-circuiting_, in which case an operand may not be evaluated at all.

Short-circuiting is jargon for conditional evaluation. For example, in the expression `a && (b + c)`, if `a` is falsy, then the sub-expression `(b + c)` will not even get evaluated, even if it is grouped and therefore has higher precedence than `&&`. We could say that the logical AND operator (`&&`) is "short-circuited". Along with logical AND, other short-circuited operators include logical OR (`||`), nullish coalescing (`??`), and optional chaining (`?.`).

```js
a || (b * c); // evaluate `a` first, then produce `a` if `a` is "truthy"
a && (b < c); // evaluate `a` first, then produce `a` if `a` is "falsy"
a ?? (b || c); // evaluate `a` first, then produce `a` if `a` is not `null` and not `undefined`
a?.b.c; // evaluate `a` first, then produce `undefined` if `a` is `null` or `undefined`
```

When evaluating a short-circuited operator, the left operand is always evaluated. The right operand will only be evaluated if the left operand cannot determine the result of the operation.

> **Note:**
> The behavior of short-circuiting is baked in these operators. Other operators would _always_ evaluate both operands, regardless if that's actually useful — for example, `NaN * foo()` will always call `foo`, even when the result would never be something other than `NaN`.

The previous model of a post-order traversal still stands. However, after the left subtree of a short-circuiting operator has been visited, the language will decide if the right operand needs to be evaluated. If not (for example, because the left operand of `||` is already truthy), the result is directly returned without visiting the right subtree.

Consider this case:

```js
function A() { console.log('called A'); return false; }
function B() { console.log('called B'); return false; }
function C() { console.log('called C'); return true; }

console.log(C() || B() && A());

// Logs:
// called C
// true
```

Only `C()` is evaluated, despite `&&` having higher precedence. This does not mean that `||` has higher precedence in this case — it's exactly _because_ `(B() && A())` has higher precedence that causes it to be neglected as a whole. If it's re-arranged as:

```js
console.log(A() && B() || C());
// Logs:
// called A
// called C
// true
```

Then the short-circuiting effect of `&&` would only prevent `B()` from being evaluated, but because `A() && B()` as a whole is `false`, `C()` would still be evaluated.

However, note that short-circuiting does not change the final evaluation outcome. It only affects the evaluation of _operands_, not how _operators_ are grouped — if evaluation of operands doesn't have side effects (for example, logging to the console, assigning to variables, throwing an error), short-circuiting would not be observable at all.

The assignment counterparts of these operators (`&&=`, `||=`, `??=`) are short-circuited as well. They are short-circuited in a way that the assignment does not happen at all.

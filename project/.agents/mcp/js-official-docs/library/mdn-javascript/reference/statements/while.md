---
title: "while"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/while/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# while

The **`while`** statement creates a loop that executes a specified statement as long as the test condition evaluates to true. The condition is evaluated before executing the statement.

```js
let n = 0;

while (n < 3) {
  n++;
}

console.log(n);
// Expected output: 3
```

## Syntax

```js
while (condition)
  statement
```

- `condition`
    An expression evaluated _before_ each pass <example-value> the loop. If this condition evaluates to true, `statement` is executed. When condition evaluates to false, execution continues with the statement after the `while` loop.
- `statement`
    A statement that is executed as long as the condition evaluates to true. You can use a block statement to execute multiple statements.

## Description

Like other looping statements, you can use control flow statements inside `statement`:

- `break` stops `statement` execution and goes to the first statement after the loop.
- `continue` stops `statement` execution and re-evaluates `condition`.

## Examples

### Using while

The following `while` loop iterates as long as `n` is less than
three.

```js
let n = 0;
let x = 0;

while (n < 3) {
  n++;
  x += n;
}
```

Each iteration, the loop increments `n` and adds it to `x`.
Therefore, `x` and `n` take on the following values:

- After the first pass: `n` = 1 and `x` = 1
- After the second pass: `n` = 2 and `x` = 3
- After the third pass: `n` = 3 and `x` = 6

After completing the third pass, the condition `n` < 3 is no longer true,
so the loop terminates.

### Using an assignment as a condition

In some cases, it can make sense to use an assignment as a condition. This comes with readability tradeoffs, so there are certain stylistic recommendations that would make the pattern more obvious for everyone.

Consider the following example, which iterates over a document's comments, logging them to the console.

```js
const iterator = document.createNodeIterator(document, NodeFilter.SHOW_COMMENT);
let currentNode;
while (currentNode = iterator.nextNode()) {
  console.log(currentNode.textContent.trim());
}
```

That's not completely a good-practice example, due to the following line specifically:

```js
while (currentNode = iterator.nextNode()) {
```

The _effect_ of that line is fine — in that, each time a comment node is found:

1. `iterator.nextNode()` returns that comment node, which gets assigned to `currentNode`.
2. The value of `currentNode = iterator.nextNode()` is therefore truthy.
3. So the `console.log()` call executes and the loop continues.

…and then, when there are no more comment nodes in the document:

1. `iterator.nextNode()` returns `null`.
2. The value of `currentNode = iterator.nextNode()` is therefore also `null`, which is falsy.
3. So the loop ends.

The problem with this line is: conditions typically use comparison operators such as `===`, but the `=` in that line isn't a comparison operator — instead, it's an assignment operator. So that `=` _looks like_ it's a typo for `===` — even though it's _not_ actually a typo.

Therefore, in cases like that one, some code-linting tools such as ESLint's `no-cond-assign` rule — in order to help you catch a possible typo so that you can fix it — will report a warning such as the following:

> Expected a conditional expression and instead saw an assignment.

Many style guides recommend more explicitly indicating the intention for the condition to be an assignment. You can do that minimally by putting additional parentheses as a grouping operator around the assignment:

```js
const iterator = document.createNodeIterator(document, NodeFilter.SHOW_COMMENT);
let currentNode;
while ((currentNode = iterator.nextNode())) {
  console.log(currentNode.textContent.trim());
}
```

In fact, this is the style enforced by ESLint's `no-cond-assign`'s default configuration, as well as Prettier, so you'll likely see this pattern a lot in the wild.

Some people may further recommend adding a comparison operator to turn the condition into an explicit comparison:

```js
while ((currentNode = iterator.nextNode()) !== null) {
```

There are other ways to write this pattern, such as:

```js
while ((currentNode = iterator.nextNode()) && currentNode) {
```

Or, forgoing the idea of using a `while` loop altogether:

```js
const iterator = document.createNodeIterator(document, NodeFilter.SHOW_COMMENT);
for (
  let currentNode = iterator.nextNode();
  currentNode;
  currentNode = iterator.nextNode()
) {
  console.log(currentNode.textContent.trim());
}
```

If the reader is sufficiently familiar with the assignment as condition pattern, all these variations should have equivalent readability. Otherwise, the last form is probably the most readable, albeit the most verbose.

## See also

- `do...while`
- `for`
- `break`
- `continue`

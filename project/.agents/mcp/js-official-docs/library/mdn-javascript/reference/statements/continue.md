---
title: "continue"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/continue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# continue

The **`continue`** statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration.

```js
let text = "";

for (let i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  }
  text += i;
}

console.log(text);
// Expected output: "012456789"
```

## Syntax

```js
continue;
continue label;
```

- `label` (optional)
    Identifier associated with the label of the statement.

## Description

In contrast to the `break` statement, `continue` does not terminate the execution of the loop entirely, but instead:

- In a `while` or `do...while` loop, it jumps back to the condition.
- In a `for` loop, it jumps to the update expression.
- In a `for...in`, `for...of`, or `for await...of` loop, it jumps to the next iteration.

The `continue` statement can include an optional label that allows the program to jump to the next iteration of a labeled loop statement instead of the innermost loop. In this case, the `continue` statement needs to be nested within this labeled statement.

A `continue` statement, with or without a following label, cannot be used at the top level of a script, module, function's body, or static initialization block, even when the function or class is further contained within a loop.

## Examples

### Using continue with while

The following example shows a `while` loop that has a `continue` statement that executes when the value of `i` is 3. Thus, `n` takes on the values 1, 3, 7, and 12.

```js
let i = 0;
let n = 0;

while (i < 5) {
  i++;

  if (i === 3) {
    continue;
  }

  n += i;
}
```

### Using continue with a label

In the following example, a statement labeled `checkIAndJ` contains a statement labeled `checkJ`. If `continue` is encountered, the program continues at the top of the `checkJ` statement. Each time `continue` is encountered, `checkJ` reiterates until its condition returns false. When false is returned, the remainder of the `checkIAndJ` statement is completed.

If `continue` had a label of `checkIAndJ`, the program would continue at the top of the `checkIAndJ` statement.

```js
let i = 0;
let j = 8;

checkIAndJ: while (i < 4) {
  console.log(`i: ${i}`);
  i += 1;

  checkJ: while (j > 4) {
    console.log(`j: ${j}`);
    j -= 1;

    if (j % 2 === 0) continue;
    console.log(`${j} is odd.`);
  }
  console.log(`i = ${i}`);
  console.log(`j = ${j}`);
}
```

Output:

```plain
i: 0

// start checkJ
j: 8
7 is odd.
j: 7
j: 6
5 is odd.
j: 5
// end checkJ

i = 1
j = 4

i: 1
i = 2
j = 4

i: 2
i = 3
j = 4

i: 3
i = 4
j = 4
```

### Unsyntactic continue statements

`continue` cannot be used within loops across function boundaries.

```js
for (let i = 0; i < 10; i++) {
  (() => {
    continue; // SyntaxError: Illegal continue statement: no surrounding iteration statement
  })();
}
```

When referencing a label, the labeled statement must contain the `continue` statement.

```js
label: for (let i = 0; i < 10; i++) {
  console.log(i);
}

for (let i = 0; i < 10; i++) {
  continue label; // SyntaxError: Undefined label 'label'
}
```

The labeled statement must be a loop.

```js
label: {
  for (let i = 0; i < 10; i++) {
    continue label; // SyntaxError: Illegal continue statement: 'label' does not denote an iteration statement
  }
}
```

## See also

- `break`
- `label`

---
title: "break"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/break/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# break

The **`break`** statement terminates the current loop or `switch` statement and transfers program control to the statement following the terminated statement. It can also be used to jump past a labeled statement when used within that labeled statement.

```js
let i = 0;

while (i < 6) {
  if (i === 3) {
    break;
  }
  i += 1;
}

console.log(i);
// Expected output: 3
```

## Syntax

```js
break;
break label;
```

- `label` (optional)
    Identifier associated with the label of the statement to break to. If the `break` statement is not nested within a loop or `switch`, then the label identifier is required.

## Description

When `break;` is encountered, the program breaks out of the innermost `switch` or looping statement and continues executing the next statement after that.

When `break label;` is encountered, the program breaks out of the statement labeled with `label` and continues executing the next statement after that. The `break` statement needs to be nested within the referenced label. The labeled statement can be any statement (commonly a `block` statement); it does not have to be another loop statement.

A `break` statement, with or without a following label, cannot be used at the top level of a script, module, function's body, or static initialization block, even when the function or class is further contained within a loop.

## Examples

### break in while loop

The following function has a `break` statement that terminates the `while` loop when `i` is 3, and then returns the value `3 * x`.

```js
function testBreak(x) {
  let i = 0;

  while (i < 6) {
    if (i === 3) {
      break;
    }
    i += 1;
  }

  return i * x;
}
```

### break in switch statements

The following code has a `break` statement that terminates the `switch` statement when a case is matched and the corresponding code has run.

```js
const food = "sushi";

switch (food) {
  case "sushi":
    console.log("Sushi is originally from Japan.");
    break;
  case "pizza":
    console.log("Pizza is originally from Italy.");
    break;
  default:
    console.log("I have never heard of that dish.");
    break;
}
```

### break in labeled blocks

The following code uses `break` statements with labeled blocks. By using `break outerBlock`, control is transferred to the end of the block statement marked as `outerBlock`.

```js
outerBlock: {
  innerBlock: {
    console.log("1");
    break outerBlock; // breaks out of both innerBlock and outerBlock
    console.log(":-("); // skipped
  }
  console.log("2"); // skipped
}
```

### Unsyntactic break statements

A `break` statement must be nested within any label it references. The following code also uses `break` statements with labeled blocks, but generates a syntax error because its `break` statement references `block2` but it's not nested within `block2`.

```js
block1: {
  console.log("1");
  break block2; // SyntaxError: label not found
}

block2: {
  console.log("2");
}
```

Syntax errors are also generated in the following code examples which use `break` statements within functions that are nested within a loop, or labeled block that the `break` statements are intended to break out of.

```js
function testBreak(x) {
  let i = 0;

  while (i < 6) {
    if (i === 3) {
      (() => {
        break;
      })();
    }
    i += 1;
  }

  return i * x;
}

testBreak(1); // SyntaxError: Illegal break statement
```

```js
block1: {
  console.log("1");
  (() => {
    break block1; // SyntaxError: Undefined label 'block1'
  })();
}
```

## See also

- `continue`
- `label`
- `switch`

---
title: "no-extra-label"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-extra-label.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-extra-label

If a loop contains no nested loops or switches, labeling the loop is unnecessary.

```js
A: while (a) {
    break A;
}
```

You can achieve the same result by removing the label and using `break` or `continue` without a label.
Probably those labels would confuse developers because they expect labels to jump to further.

## Rule Details

This rule is aimed at eliminating unnecessary labels.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-extra-label: "error"*/

A: while (a) {
    break A;
}

B: for (let i = 0; i < 10; ++i) {
    break B;
}

C: switch (a) {
    case 0:
        break C;
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-extra-label: "error"*/

while (a) {
    break;
}

for (let i = 0; i < 10; ++i) {
    break;
}

switch (a) {
    case 0:
        break;
}

A: {
    break A;
}

B: while (a) {
    while (b) {
        break B;
    }
}

C: switch (a) {
    case 0:
        while (b) {
            break C;
        }
        break;
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about usage of labels, then it's safe to disable this rule.

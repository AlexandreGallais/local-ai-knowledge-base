---
title: "space-unary-word-ops"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/space-unary-word-ops.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# space-unary-word-ops

Requires spaces after unary word operators.

**Important:**
This rule was removed in ESLint v0.10.0 and replaced by the space-unary-ops rule.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
typeof!a
```

**Incorrect:**

```js
void{a:0}
```

**Incorrect:**

```js
new[a][0]
```

**Incorrect:**

```js
delete(a.b)
```

Examples of **correct** code for this rule:

**Correct:**

```js
delete a.b
```

**Correct:**

```js
new C
```

**Correct:**

```js
void 0
```

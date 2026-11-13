---
title: "functional/no-this-expressions"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-this-expressions.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-this-expressions

📝 Disallow this access.

💼🚫 This rule is enabled in the following configs:  `noOtherParadigms`, 🔒 `strict`. This rule is _disabled_ in the following configs: ☑️ `lite`, ✅ `recommended`.

## Rule Details

This rule is a companion rule to the no-classes rule.
See the its docs for more info.

### ❌ Incorrect

```js
/* eslint functional/no-this-expressions: "error" */

const foo = this.value + 17;
```

### ✅ Correct

```js
/* eslint functional/no-this-expressions: "error" */

const foo = object.value + 17;
```

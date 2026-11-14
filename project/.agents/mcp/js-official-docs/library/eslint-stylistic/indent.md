---
title: "indent (part 1 of 3)"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/indent/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
---

# indent

There are several common guidelines which require specific indentation of nested blocks and statements, like:

```js
function hello(indentSize, type) {
    if (indentSize === 4 && type !== 'tab') {
        console.log('Each next indentation will increase on 4 spaces');
    }
}
```

These are the most common scenarios recommended in different style guides:

- Two spaces, not longer and no tabs: Google, npm, Node.js, Idiomatic, Felix
- Tabs: jQuery
- Four spaces: Crockford

## Rule Details

This rule enforces a consistent indentation style. The default style is `4 spaces`.

---
title: "prefer-dom-node-append"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-dom-node-append.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-dom-node-append

📝 Prefer `Element#append()` over `Node#appendChild()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforces the use of, for example, `document.body.append(div);` over `document.body.appendChild(div);` for DOM nodes. There are some advantages of using `Element#append()`, like the ability to append multiple nodes and to append both `DOMString` and DOM node objects.

`appendChild()` is available on `Node`, but `append()` is not available on every `Node`. This rule still reports `appendChild()` because using it on nodes that cannot accept children can fail at runtime. Autofix is only provided when the return value of `appendChild()` is unused, since `appendChild()` returns the appended node and `append()` returns `undefined`.

## Examples

```js
// ❌
element.appendChild(child);

// ✅
element.append(child);
```

```js
// ❌
// Multiple nodes require chaining
parent.appendChild(child1);
parent.appendChild(child2);
parent.appendChild(child3);

// ✅
// append() can handle multiple nodes in one call
parent.append(child1, child2, child3);
```

```js
// ❌
// appendChild only works with Node objects
container.appendChild(divElement);

// ✅
// append() can mix nodes and strings
container.append(divElement, 'Some text content');
```

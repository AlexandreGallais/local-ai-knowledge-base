---
title: "prefer-modern-dom-apis"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-modern-dom-apis.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-modern-dom-apis

📝 Prefer modern DOM APIs.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer `.before()` over `.insertBefore()`, `.replaceWith()` over `.replaceChild()`, one of `.before()`, `.after()`, `.append()` or `.prepend()` over `insertAdjacentText()` and `insertAdjacentElement()`, and `.replaceChildren()` over direct `.firstChild.remove()`/`.lastChild.remove()` loops.

Enforces the use of:

- childNode.replaceWith(newNode) over parentNode.replaceChild(newNode, oldNode)
- referenceNode.before(newNode) over parentNode.insertBefore(newNode, referenceNode)
- referenceNode.before('text') over referenceNode.insertAdjacentText('beforebegin', 'text')
- referenceNode.before(newNode) over referenceNode.insertAdjacentElement('beforebegin', newNode)
- node.replaceChildren() over loops that directly remove the same checked `node.firstChild` or `node.lastChild`

There are some advantages of using the newer DOM APIs, like:

- Traversing to the parent node is not necessary.
- Appending multiple nodes at once.
- Removing all child nodes without manual iteration.
- Both `DOMString` and DOM node objects can be manipulated.

`.insertBefore()` only gets a suggestion, because `parentNode.insertBefore(newNode, null)` appends `newNode`, while `null.before(newNode)` throws. `.replaceChild()` throws when the child is not in `parentNode`, while `.replaceWith()` uses the child's current parent, so the fix can remove that error.

The autofix assumes the code does not depend on per-child `MutationObserver` records from repeated removals.

## Examples

```js
// ❌
parentNode.replaceChild(newNode, oldNode);

// ✅
oldNode.replaceWith(newNode);
```

```js
// ❌
parentNode.insertBefore(newNode, oldNode);

// ✅
oldNode.before(newNode);
```

```js
// ❌
referenceNode.insertAdjacentText('beforebegin', 'text');

// ✅
referenceNode.before('text');
```

```js
// ❌
referenceNode.insertAdjacentText('afterbegin', 'text');

// ✅
referenceNode.prepend('text');
```

```js
// ❌
referenceNode.insertAdjacentText('beforeend', 'text');

// ✅
referenceNode.append('text');
```

```js
// ❌
referenceNode.insertAdjacentText('afterend', 'text');

// ✅
referenceNode.after('text');
```

```js
// ❌
referenceNode.insertAdjacentElement('beforebegin', newNode);

// ✅
referenceNode.before(newNode);
```

```js
// ❌
referenceNode.insertAdjacentElement('afterbegin', newNode);

// ✅
referenceNode.prepend(newNode);
```

```js
// ❌
referenceNode.insertAdjacentElement('beforeend', newNode);

// ✅
referenceNode.append(newNode);
```

```js
// ❌
referenceNode.insertAdjacentElement('afterend', newNode);

// ✅
referenceNode.after(newNode);
```

```js
// ❌
while (node.firstChild) {
	node.firstChild.remove();
}

// ✅
node.replaceChildren();
```

---
title: "no-collection-bracket-access"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-collection-bracket-access.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-collection-bracket-access

📝 Disallow accessing `Map`, `Set`, `WeakMap`, and `WeakSet` entries with bracket notation.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

`Map`, `Set`, `WeakMap`, and `WeakSet` do not store their entries as object properties. Using bracket notation on them sets or reads an ordinary object property instead of a collection entry, which is almost always a mistake. Use the instance methods instead:

- Reading: `Map#get()`/`Map#has()`, `Set#has()`
- Writing: `Map#set()`, `Set#add()`
- Deleting: `Map#delete()`, `Set#delete()`

Detection works for collections created with `new Map()` (and the other constructors) assigned to a `const`, or for values whose TypeScript type is known. Accessing a real member (`map['size']`) or iterating with a `Symbol` key (`map[Symbol.iterator]`) is allowed.

## Examples

```js
const map = new Map();

// ❌
map['foo'] = 'bar';
// ✅
map.set('foo', 'bar');

// ❌
const value = map['foo'];
// ✅
const value = map.get('foo');

// ❌
delete map['foo'];
// ✅
map.delete('foo');
```

```js
const set = new Set();

// ❌
if (set['foo']) {}
// ✅
if (set.has('foo')) {}
```

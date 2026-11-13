---
title: "no-invalid-dom-token"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-dom-token.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-dom-token

📝 Disallow invalid DOM tokens.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

DOM token <example-value> `add()`, `remove()`, `toggle()`, and `replace()` throw for empty tokens or tokens containing ASCII whitespace: space, tab (`\t`), line feed (`\n`), form feed (`\f`), or carriage return (`\r`). Other whitespace, such as `\v` and `\u00A0`, is allowed. Tokens need not be valid CSS identifiers.

The rule checks `classList`, `relList`, `sandbox`, `part`, `sizes`, `blocking`, `htmlFor`, and `controlsList`. With TypeScript type information, it also recognizes token-list parameters and aliases.

It checks all `add()`/`remove()` arguments, the first `toggle()` argument, and the first two `replace()` arguments. Optional chaining, literal computed properties, TypeScript wrappers, statically known strings, and whitespace in fixed template text are supported.

## Examples

```js
// ❌
element.classList.add('primary active');

// ✅
element.classList.add('primary', 'active');
```

```js
// ❌
element.classList.remove('');

// ✅
element.classList.remove('primary');
```

```js
// ❌
element.classList.toggle(' primary', isActive);

// ✅
element.classList.toggle('primary', isActive);
```

```js
// ❌
element.classList.replace('primary', 'active selected');

// ✅
element.classList.replace('primary', 'active');
```

```js
// ❌
element.classList.add(`primary ${suffix}`);

// ✅
element.classList.add('primary', suffix);
```

## Suggestions

Suggestions split literal strings or templates without interpolation for `add()`/`remove()`. They are withheld for empty results or comment removal. There is no autofix because splitting changes throwing behavior.

## Limitations

Property-name matching is heuristic. Dynamic method names, spread tokens, and non-string arguments are ignored. Mutable bindings and side effects prevent static evaluation. For `toggle()`/`replace()`, checking stops at the first spread.

`contains()`, `supports()`, attribute assignments, and token <example-value> are not checked.

Selector prefixes such as `'.primary'` are handled by `no-selector-as-dom-name`.

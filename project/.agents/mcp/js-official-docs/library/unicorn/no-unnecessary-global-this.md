---
title: "no-unnecessary-global-this"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-global-this.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-global-this

📝 Disallow unnecessary `globalThis` references.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule reports static `globalThis` property accesses when the property is already a known global and can be referenced directly.

It intentionally ignores unknown properties, writes, optional chains, direct `eval` calls, and locally shadowed globals. It also ignores existence checks (e.g. `if (globalThis.navigation)` or `globalThis.navigation === undefined`), since `globalThis.foo` safely evaluates to `undefined` for an absent global while a bare `foo` reference throws a `ReferenceError`. Direct calls and tagged-template calls are reported but not automatically fixed because removing the `globalThis` receiver can change `this`.

## Examples

```js
// ❌
globalThis.Array.from(items);

// ✅
Array.from(items);
```

```js
// ❌
globalThis.JSON.stringify(value);

// ✅
JSON.stringify(value);
```

```js
// ✅
globalThis.alert?.();
```

```js
// ✅
globalThis.jQuery = jQuery;
```

```js
// ✅
if (globalThis.navigation) {
	// …
}
```

```js
// ✅
if (globalThis.navigation === undefined) {
	// …
}
```

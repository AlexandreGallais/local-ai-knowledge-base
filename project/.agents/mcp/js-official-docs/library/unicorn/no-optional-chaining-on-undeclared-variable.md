---
title: "no-optional-chaining-on-undeclared-variable"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-optional-chaining-on-undeclared-variable.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-optional-chaining-on-undeclared-variable

📝 Disallow optional chaining on undeclared variables.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Optional chaining only short-circuits when the checked value is `null` or `undefined`. It does not suppress a `ReferenceError` from reading an undeclared runtime variable at the base of an optional member or call operation.

This rule focuses on optional operations rooted in an undeclared identifier or member chain, like `foo?.bar` and `foo.bar?.baz`. Broader undeclared-reference checks are covered by ESLint's `no-undef` rule.

Declare the variable, configure it as a global, or access it through `globalThis` when the property may be absent.

## Examples

```js
// ❌
iDontExist?.meNeither;

// ✅
globalThis.iDontExist?.meNeither;
```

```js
// ❌
iDontExist?.();

// ✅
let iDontExist;
iDontExist?.();
```

```js
// ❌
iDontExist.meNeither?.();

// ✅
globalThis.iDontExist?.meNeither?.();
```

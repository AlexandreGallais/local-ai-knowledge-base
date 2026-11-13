---
title: "prefer-error-is-error"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-error-is-error.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-error-is-error

📝 Prefer `Error.isError()` when checking for errors.

🚫 Disabled by default.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Error.isError()` is a robust way to check whether a value is an error object.

`instanceof Error` is unreliable across realms, and `Object.prototype.toString.call(error) === '[object Error]'` can be spoofed with `Symbol.toStringTag`.

Unlike `unicorn/no-instanceof-builtins`, this rule also catches legacy `Error` brand checks using `'[object Error]'`.

## Examples

```js
// ❌
error instanceof Error;

// ✅
Error.isError(error);
```

```js
// ❌
Object.prototype.toString.call(error) === '[object Error]';

// ✅
Error.isError(error);
```

```js
// ❌
Object.prototype.toString.call(error) !== '[object Error]';

// ✅
!Error.isError(error);
```

```js
// ✅
error instanceof TypeError;
```

## Related rules

- unicorn/no-instanceof-builtins

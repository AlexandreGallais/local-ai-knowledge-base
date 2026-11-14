---
title: "new-for-builtins"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/new-for-builtins.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# new-for-builtins

📝 Enforce correct use of `new` for builtin constructors.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Many builtin constructors can be called with or without `new`, but `new` should be preferred for consistency with constructors that require it. This rule also reports selected builtin namespace objects that are not callable or constructible.

For non-callable top-level namespace objects covered by ESLint core, like `Math`, `JSON`, `Reflect`, `Atomics`, `Intl`, and `Temporal`, use `no-obj-calls`.

Enforces the use of `new` for the following builtins:

- `Object`
- `Array`
- `ArrayBuffer`
- `AsyncDisposableStack`
- `BigInt64Array`
- `BigUint64Array`
- `DataView`
- `Date`
- `DisposableStack`
- `Error`
- `AggregateError`
- `EvalError`
- `Float16Array`
- `Float32Array`
- `Float64Array`
- `Function`
- `Int8Array`
- `Int16Array`
- `Int32Array`
- `Map`
- `RangeError`
- `ReferenceError`
- `WeakMap`
- `Set`
- `WeakSet`
- `Promise`
- `RegExp`
- `SuppressedError`
- `SyntaxError`
- `TypeError`
- `Uint8Array`
- `Uint16Array`
- `Uint32Array`
- `Uint8ClampedArray`
- `URIError`
- `SharedArrayBuffer`
- `Proxy`
- `WeakRef`
- `FinalizationRegistry`
- `Intl.Collator`
- `Intl.DateTimeFormat`
- `Intl.DisplayNames`
- `Intl.DurationFormat`
- `Intl.ListFormat`
- `Intl.Locale`
- `Intl.NumberFormat`
- `Intl.PluralRules`
- `Intl.RelativeTimeFormat`
- `Intl.Segmenter`
- `Temporal.Duration`
- `Temporal.Instant`
- `Temporal.PlainDate`
- `Temporal.PlainDateTime`
- `Temporal.PlainMonthDay`
- `Temporal.PlainTime`
- `Temporal.PlainYearMonth`
- `Temporal.ZonedDateTime`
- `WebAssembly.Module`
- `WebAssembly.Instance`
- `WebAssembly.Memory`
- `WebAssembly.Table`
- `WebAssembly.Global`
- `WebAssembly.Tag`
- `WebAssembly.Exception`
- `WebAssembly.CompileError`
- `WebAssembly.LinkError`
- `WebAssembly.RuntimeError`

Disallows the use of `new` for the following builtins:

- `String`
- `Number`
- `Boolean`
- `Symbol`
- `BigInt`

> These should not use `new` as that would create object wrappers for the primitive values, which is not what you want. However, without `new` they can be useful for coercing a value to that type.

This rule is fixable, except `new String()`, `new Number()`, and `new Boolean()`, which return wrapped objects. `RegExp(regex)` returns `regex` itself, while `new RegExp(regex)` returns a copy with `lastIndex` reset, which is not preserved by the fix. Optional chains that would require adding `new` are ignored, as `new` cannot be optional. Reports for builtin namespace objects are not fixable.

Disallows calling or constructing the following builtin namespace objects:

- `Temporal.Now`
- `WebAssembly`
- `WebAssembly.JSTag`

## Examples

```js
// ❌
const list = Array(10);

// ✅
const list = new Array(10);
```

```js
// ❌
const now = Date();

// ✅
const now = String(new Date());
```

```js
// ❌
const map = Map([
	['foo', 'bar']
]);

// ✅
const map = new Map([
	['foo', 'bar']
]);
```

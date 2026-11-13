---
title: "prefer-temporal"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-temporal.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-temporal

📝 Prefer `Temporal` over `Date`.

🚫 Disabled by default.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`Temporal` is the modern replacement for the legacy `Date`. It avoids `Date`'s long-standing footguns: zero-indexed months, mutability, the lack of a time zone or calendar, and string parsing that is implementation-defined and unreliable across platforms. `Temporal` provides purpose-built, immutable types (`Temporal.Instant`, `Temporal.PlainDate`, `Temporal.ZonedDateTime`, and more) with precise parsing and arithmetic.

`Date.now()` is autofixed to `Temporal.Now.instant().epochMilliseconds`, since both return the epoch milliseconds as a number. For `new Date()` and `new Date(milliseconds)` there are a few exact `Temporal` equivalents, offered as suggestions. The remaining cases (parsing strings, calendar parts) have no single correct replacement, so they are only reported, because the right `Temporal` type depends on what you need.

`Temporal` reached Stage 4. It ships unflagged in Node.js 26 and recent browsers. For older environments, use the `@js-temporal/polyfill`.

## Examples

```js
// ❌ — the current moment
const now = new Date();

// ✅
const now = Temporal.Now.instant();
```

```js
// ❌ — a number is epoch milliseconds
const date = new Date(1_724_198_400_000);

// ✅
const date = Temporal.Instant.fromEpochMilliseconds(1_724_198_400_000);
```

```js
// ❌ — string parsing is inconsistent across platforms
const date = new Date('2024-08-16');

// ✅
const date = Temporal.PlainDate.from('2024-08-16');
```

```js
// ❌ — `Date.parse` is inconsistent across platforms
const date = Date.parse('2024-08-16');

// ✅
const date = Temporal.PlainDate.from('2024-08-16');
```

```js
// ❌ — the month is zero-indexed
const date = new Date(2000, 11, 25);

// ✅
const date = Temporal.PlainDate.from({year: 2000, month: 12, day: 25});
```

```js
// ❌ — the month is zero-indexed
const date = Date.UTC(2000, 11, 25);

// ✅
const date = Temporal.PlainDate.from({year: 2000, month: 12, day: 25});
```

## Options

Type: `object`

### `checkDateNow`

Type: `boolean`\
Default: `false`

Whether to also flag `Date.now()`. It returns a plain number of milliseconds and is the one `Date` use that is generally fine, so it is allowed by default.

```js
/* eslint unicorn/prefer-temporal: ["error", {"checkDateNow": true}] */

// ❌
const start = Date.now();

// ✅
const start = Temporal.Now.instant().epochMilliseconds;
```

### `checkReferences`

Type: `boolean`\
Default: `false`

Whether to also flag bare references to `Date`, such as `x instanceof Date` or passing `Date` as a value. Off by default because such references are common and harmless during migration.

```js
/* eslint unicorn/prefer-temporal: ["error", {"checkReferences": true}] */

// ❌
const isDate = value instanceof Date;
```

### `checkMethods`

Type: `boolean`\
Default: `false`

Whether to also flag methods called on `Date` instances, such as `date.getFullYear()` or `date.toISOString()`.

This requires type information, since a bare `.getFullYear()` cannot be attributed to a `Date` without knowing the receiver's type. It has no effect without type-aware linting. It is off by default because it is broader than the other checks and adds a type-checker lookup on every member access.

Only values typed as `Date` (including unions and intersections) are detected. Subclasses of `Date` and generic type parameters constrained to `Date` are not.

```js
/* eslint unicorn/prefer-temporal: ["error", {"checkMethods": true}] */

// ❌
function getYear(date: Date) {
	return date.getFullYear();
}
```

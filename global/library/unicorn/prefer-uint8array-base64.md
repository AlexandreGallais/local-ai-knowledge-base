---
title: "prefer-uint8array-base64"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-uint8array-base64.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-uint8array-base64

📝 Prefer `Uint8Array#toBase64()` and `Uint8Array.fromBase64()` over legacy base64 conversions and manual postprocessing.

🚫 Disabled by default.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`atob()` and `btoa()` operate on “binary strings”, so they cannot round-trip Unicode text without workarounds. Node's `Buffer` base64 conversions work, but tie you to `Buffer`.

The standard `Uint8Array` base64 methods operate on real binary data. When targeting a runtime that supports them, prefer `Uint8Array.fromBase64()` and `Uint8Array#toBase64()` instead.

> **Note:**
> `Buffer.from(string, 'base64')` returns a `Buffer`, while `Uint8Array.fromBase64(string)` returns a plain `Uint8Array`. Their input validation and alphabet handling also differ. The replacement is offered as a suggestion so you can confirm that the result type and accepted inputs fit your use case.

## Examples

```js
// ❌
const bytes = atob(base64);

// ❌
const bytes = Buffer.from(base64, 'base64');

// ✅
const bytes = Uint8Array.fromBase64(base64);
```

```js
// ❌
const base64 = buffer.toString('base64');

// ✅
const base64 = buffer.toBase64();
```

To convert text instead of binary data, encode it first:

```js
// ❌
const base64 = btoa(input);
const output = atob(base64);

// ✅
const base64 = new TextEncoder().encode(input).toBase64();
const output = new TextDecoder().decode(Uint8Array.fromBase64(base64));
```

The base64 methods support the `base64url` alphabet too:

```js
// ❌
const bytes = Buffer.from(base64url, 'base64url');

// ✅
const bytes = Uint8Array.fromBase64(base64url, {alphabet: 'base64url'});
```

Prefer native encoding options over manually replacing alphabet characters or removing padding:

```js
// ❌
const base64url = bytes.toBase64().replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');

// ✅
const base64url = bytes.toBase64({alphabet: 'base64url', omitPadding: true});

// ❌
const base64 = bytes.toBase64().replace(/=+$/, '');

// ✅
const base64 = bytes.toBase64({omitPadding: true});
```

This check supports consecutive replacements after an argument-free `.toBase64()`. Alphabet conversion requires both character substitutions, using string-literal `replaceAll()` calls or global-regex replacements. Padding removal supports `.replaceAll('=', '')` and literal `/=+$/` replacements through `replace()` or global `replaceAll()`. Calls with existing options are not checked.

> **Tip:**
> The `uint8array-extras` package offers `stringToBase64` and `base64ToString` helpers for the text case.

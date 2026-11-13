---
title: "no-invalid-integrity"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-integrity.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-integrity

📝 Disallow invalid subresource integrity metadata.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🌐 `recommended-html`, ☑️ `unopinionated`.

Validates existing `integrity` attributes on HTML and native JSX `<script>` and `<link>` elements. Malformed hashes can block resources; unknown algorithms can leave integrity checking ineffective.

Checks syntax and encoded length locally, without requiring an `integrity` attribute or verifying resources or signatures. No fixes or suggestions are provided because correct hashes and keys cannot be inferred.

## Examples

```html
<!-- ❌ -->
<script src="app.js" integrity="sha256-abc"></script>
<script src="app.js" integrity="sha25-abc"></script>
<link rel="stylesheet" href="style.css" integrity="sha384-not-a-digest">

<!-- ✅ -->
<script src="app.js" integrity="sha256-LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ="></script>
<script src="app.js" integrity="ed25519-JrQLj5P/89iXES9+vFgrIy29clF9CC/oPPsw3c5D0bs="></script>
```

```jsx
// ❌
<script src="app.js" integrity={"sha256-" + "abc"} />;

// ✅
const integrity = 'sha256-LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ=';
<script src="app.js" integrity={integrity} />;
```

## Accepted metadata

Recognized entries use lowercase `algorithm-base64` with these unpadded lengths:

| Algorithm | Material | Bytes | Base64 characters, excluding padding |
| --- | --- | --- | --- |
| `sha256` | Digest | 32 | 43 |
| `sha384` | Digest | 48 | 64 |
| `sha512` | Digest | 64 | 86 |
| `ed25519` | Public key | 32 | 43 |

Standard (`+`, `/`) and URL-safe (`-`, `_`) base64 alphabets, including mixtures, are accepted with zero to two trailing `=` characters. Canonical padding and unused trailing bits are not checked.

Separate entries with HTML ASCII whitespace (space, tab, LF, FF, or CR). Empty and whitespace-only values are allowed. An optional `?options` suffix may be empty or contain ASCII `!` through `~`, including additional `?`; options are not interpreted.

Every malformed recognized entry is reported, even beside a valid or stronger hash. Unknown entries are allowed if a recognized algorithm is present; otherwise, nonempty metadata is reported.

Based on the SRI grammar, CSP base64 grammar, and signature-based integrity metadata.

## Static values

HTML names are case-insensitive and character references are decoded. Checks the first `integrity` attribute. Ignores markup inside `<textarea>`, `<title>`, and ``, dynamic template names or values, configured delimiters, and common template markers (`{{`, `{%`, `<%`, `${`).

> **Note:**
> Quote URL and `integrity` values: the HTML parser may miss attributes after unquoted URLs containing `/`, or unquoted `integrity` values starting with `/`.

Checks lowercase native JSX tags with an `integrity` prop. Supports safely resolved static strings, including constants, concatenations, and TypeScript assertions. Uses the last explicit `integrity` prop unless followed by a spread; ignores custom components, unresolved expressions, and nonstrings.

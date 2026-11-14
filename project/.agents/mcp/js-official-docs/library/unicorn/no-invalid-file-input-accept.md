---
title: "no-invalid-file-input-accept"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-file-input-accept.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-file-input-accept

📝 Disallow invalid `accept` values on file inputs.

🚫 Disabled by default.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule enforces static `accept` values made up of comma-separated filename extensions, MIME types, or the wildcard MIME types `audio/*`, `image/*`, and `video/*`. It rejects invalid tokens and empty entries, and normalizes casing, spacing, duplicates, and common MIME type mistakes.

This rule checks JSX file inputs and HTML file inputs parsed by `yeonjuan/html-eslint`.

## Examples

```jsx
// ❌
<input type="file" accept="image/jpg" />;

// ✅
<input type="file" accept="image/jpeg" />;
```

```html
<!-- ❌ -->
<input type="file" accept="image/jpg">

<!-- ✅ -->
<input type="file" accept="image/jpeg">
```

```jsx
// ❌
<input type="file" accept="png" />;

// ✅
<input type="file" accept=".png" />;
```

```jsx
// ❌
<input type="file" accept="IMAGE/*" />;

// ✅
<input type="file" accept="image/*" />;
```

```jsx
// ❌
<input type="file" accept="IMAGE/PNG,.PNG, image/png" />;

// ✅
<input type="file" accept="image/png, .png" />;
```

```jsx
// ❌
<input type="file" accept={allowedTypes} />;

// ✅
<input type="file" accept="image/png, .png" />;
```

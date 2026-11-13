---
title: "relative-url-style"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/relative-url-style.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# relative-url-style

📝 Enforce consistent relative URL style.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🌐 `recommended-html`, 📚 `recommended-markdown`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Enforce whether relative URLs use a `./` prefix in:

- JavaScript: `new URL()`, `URL.canParse()`, and `URL.parse()` with two arguments.
- CSS: `url()`, `image-set()`, and `@import` targets.
- HTML and native JSX/TSX elements: `href`, `src`, `poster`, `srcset`, `imagesrcset`, `action`, `formaction`, and `cite` attributes. JSX uses `srcSet`, `imageSrcSet`, and `formAction`.
- Markdown: Links, images, reference definitions, and embedded HTML.

Autofixes preserve URL resolution. Under `'never'`, interpolated JavaScript templates starting with `./` receive suggestions that may change resolution.

JavaScript supports string literals and templates without substitutions. JSX also supports these literals inside braces, except for `srcSet`/`imageSrcSet`. Other expressions and custom components are skipped.

Escaped `./` prefixes, templated HTML/CSS URLs, and some complex Markdown or `srcset` syntax are left unchanged.

## Examples

```js
// ❌
const url = new URL('./foo', base);

// ✅
const url = new URL('foo', base);
```

```markdown
<!-- ❌ -->
- [`prefer-nesting`](./prefer-nesting.md)

<!-- ✅ -->
- [`prefer-nesting`](prefer-nesting.md)
```

## Options

Type: `string`\
Default: `'never'`

- `'never'` (default): Remove a `./` prefix.
- `'always'`: Add a `./` prefix.

`'always'` includes hidden paths such as `.env`. Current-directory and parent-directory references are unchanged.

```js
/* eslint unicorn/relative-url-style: ["error", "always"] */

// ❌
const url = new URL('foo', base);

// ✅
const url = new URL('./foo', base);
```

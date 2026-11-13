---
title: "normalize-see-links (part 1 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/normalize-see-links.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `normalize-see-links`

Normalizes labeled links in `@see` tags to a canonical `{@link}` form.

Set `wrapBareUrls` to `true` to also wrap an `@see` description that contains
only a lowercase `http:` or `https:` URL in a plain, no-label `{@link}` tag.
This option defaults to `false`, and its output is independent of
`canonicalForm` because there is no label to position.

Labels that contain the destination form's closing delimiter are fixable. For
pipe form, the fixer escapes `}` in the label:

```js
/** @see [See {options}](https://example.com/api) */
/** @see {@link https://example.com/api|See {options\}} */
```

For prefix form, the fixer escapes `]` in the label:

```js
/** @see {@link https://example.com|A]B} */
/** @see [A\]B]{@link https://example.com} */
```

## Options

A single options object has the following properties.

### `canonicalForm`

The canonical `{`@link`}` form: `"pipe"` produces `{`@link` url|label}`, while `"prefix"` produces `[label]{`@link` url}`. Defaults to `"pipe"`.

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

### `wrapBareUrls`

Whether to wrap an `@see` description containing only a lowercase `http:` or `https:` URL (for example, `@see https://example.com`) in a plain `{`@link` https://example.com}`. Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|`see`|
|Recommended|false|
|Settings||
|Options|`canonicalForm`, `enableFixer`, `wrapBareUrls`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @see [Docs](https://api.example.com/v1?ids=1|2|3)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [See {options}](https://example.com/api)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [a}b](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [a\}b](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A\]B](https://example.com)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [Foo](https://example.com/a|b)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [ ](https://example.com)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see {@link https://example.com|A]B}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [ ]{@link https://example.com}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Foo](https://example.com/a}b)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [Foo](https://example.com/a{b)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [Braces](https://example.com/a{b}c)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Existing](https://example.com/%7C?x=1&y=2#frag)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Percent](https://example.com/100%)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A{B](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [a}b](https://example.com)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com|A|B}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com|A`B}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com|a\}b}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [A\]B]{@link https://example.com}
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see {@link https://example.com|A]B\}C}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [A}B\]C]{@link https://example.com}
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Trailing\\](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [See { {one} and {two}}](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A}B|C](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Read the guide](https://example.com/read)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Browse the API]{@link https://example.com/api}
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A](https://a.com) and [B](https://b.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A](https://a.com)
 * @see [B](https://b.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Unsafe](https://example.com/a|b?x=1&y=2#frag) and [Safe](https://example.com/safe)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [JSDoc Markdown](https://example.com/jsdoc|markdown)
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Expected @see link to use the pipe form.

/**
 * @see [Package](@scope/pkg)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [First](https://example.com/first)
 *   and [Second](https://example.com/second)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Example](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Guide]{@link https://example.com/guide}
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [API](https://example.com/api)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com/reference|Reference}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [No fix](https://example.com/no-fix)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"enableFixer":false}]
// Message: Expected @see link to use the pipe form.

/**
 * @see [Incomplete](https://example.com/incomplete
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Incomplete]{@link}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see {@link https://example.com|}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see `[Code](https://example.com/code)`
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Package]{@link @scope/pkg}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see {@link https://example.com Space label}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [JSDoc]{@link https://example.com/jsdoc}
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Expected @see link to use the pipe form.

/**
 * @see [TypeScript](https://example.com/type{script})
 */
const value: string = 'value';
// Message: Expected @see link to use the pipe form.

/**
 * @see [Complex](https://example.com/a_(b))
 */
// Message: @see link cannot be safely normalized.

/**
 * @see https://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see http://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see https://example.com/%7C?ids=1|2&brace={ok}#part}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see https://example.com/prefix
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix","wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see https://example.com/report-only
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"enableFixer":false,"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see [Docs](https://example.com/labeled)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see [Docs]{@link https://example.com/labeled}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see {@link https://example.com/labeled|Docs}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix","wrapBareUrls":true}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [See {options}](https://example.com/labeled)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see [No fix](https://example.com/labeled)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"enableFixer":false,"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see https://example.com/period.
 * @see https://example.com/comma,
 * @see https://example.com/paren)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see
 *   https://example.com/continued
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see http:MyClass#method
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.
````

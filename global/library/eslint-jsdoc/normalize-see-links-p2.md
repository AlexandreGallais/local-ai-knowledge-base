---
title: "normalize-see-links (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/normalize-see-links.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# normalize-see-links (part 2 of 2)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @see {@link https://example.com/api|See {options\}}
 */

/**
 * @see [A\]B]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [A\]B}C]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com|A\}B]C}
 */

/**
 * @see {@link https://example.com|Trailing\\}
 */

/**
 * @see {@link https://example.com|See { {one\} and {two\}\}}
 */

/**
 * @see {@link https://api.example.com/v1?ids=1%7C2%7C3|Docs}
 */

/**
 * @see [Foo]{@link https://example.com/a%7Cb}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [Foo]{@link https://example.com/a%7Db}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [Foo]{@link https://example.com/a%7Bb}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com/a%7Bb%7Dc|Braces}
 */

/**
 * @see {@link https://example.com/%7C?x=1&y=2#frag|Existing}
 */

/**
 * @see {@link https://example.com/100%25|Percent}
 */

/**
 * @see {@link https://example.com|A{B}
 */

/**
 * @see [a}b]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com|A|B}
 */

/**
 * @see [A|B]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [A`B]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com/a%7Cb?x=1&y=2#frag|Unsafe} and {@link https://example.com/safe|Safe}
 */

/**
 * @see {@link https://example.com/read|Read the guide}
 */

/**
 * @see {@link https://example.com/api|Browse the API}
 */

/**
 * @see {@link https://a.com|A} and {@link https://b.com|B}
 */

/**
 * @see {@link https://a.com|A}
 * @see {@link https://b.com|B}
 */

/**
 * @see {@link https://example.com/jsdoc%7Cmarkdown|JSDoc Markdown}
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @see {@link https://example.com/first|First}
 *   and {@link https://example.com/second|Second}
 */

/**
 * @see {@link https://example.com|Example}
 */

/**
 * @see {@link https://example.com/guide|Guide}
 */

/**
 * @see [API]{@link https://example.com/api}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [Reference]{@link https://example.com/reference}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com/jsdoc|JSDoc}
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @see {@link https://example.com/type%7Bscript%7D|TypeScript}
 */
const value: string = 'value';

/**
 * @see https://example.com
 */

/**
 * @see MyClass#method
 */

/**
 * @see some text
 */

/**
 * @see {@link https://example.com}
 */

/**
 * @see {@link @scope/pkg|Package}
 */

/**
 * @see @scope/pkg
 */

/**
 * @returns [Example](https://example.com)
 */

/**
 * @see {@code foo|bar}
 */

/**
 * @see \[Escaped](https://example.com)
 */

/**
 * @see {@link https://example.com/idempotent}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see Read https://example.com/docs
 */

/**
 * @see Read https://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see MyClass#method
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see ftp://example.com/file
 */

/**
 * @see ftp://example.com/file
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see mailto:user@example.com
 */

/**
 * @see mailto:user@example.com
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see file:///tmp/docs
 */

/**
 * @see file:///tmp/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see //example.com/docs
 */

/**
 * @see //example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see `https://example.com/docs`
 */

/**
 * @see `https://example.com/docs`
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see {@link https://example.com/docs}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see
 */

/**
 * @see
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see https://example.com/one two
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see HTTP://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see https://example.com/one https://example.com/two
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see <https://example.com/docs>
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see {@link https://example.com/%7C}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
````

---
title: "regexp/no-lazy-ends"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-lazy-ends.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-lazy-ends

⚠️ This rule _warns_ in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

💡 This rule is manually fixable by editor suggestions.

> disallow lazy quantifiers at the end of an expression

## :book: Rule Details

If a lazily quantified element is the last element matched by an expression
(e.g. the `a{2,3}?` in `b+a{2,3}?`), we know that the lazy quantifier will
always only match the element the minimum number of times. The maximum is
completely ignored because the expression can accept after the minimum was
reached.

If the minimum of the lazy quantifier is 0, we can even remove the quantifier
and the quantified element without changing the meaning of the pattern. E.g.
`a+b*?` and `a+` behave the same.

If the minimum is 1, we can remove the quantifier. E.g. `a+b+?` and `a+b` behave
the same.

If the minimum is greater than 1, we can replace the quantifier with a constant,
greedy quantifier. E.g. `a+b{2,4}?` and `a+b{2}` behave the same.

<eslint-code-block>

```js
/* eslint regexp/no-lazy-ends: "error" */

/* ✓ GOOD */
var foo = /a+?b*/.test(str)
var foo = /a??(?:ba+?|c)*/.test(str)
var foo = /ba*?$/.test(str)

/* ✗ BAD */
var foo = /a??/.test(str)
var foo = /a+b+?/.test(str)
var foo = /a(?:c|ab+?)?/.test(str)
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/no-lazy-ends": [
    "error",
    {
      "ignorePartial": true,
    }
  ]
}
```

- `ignorePartial`:

  Some regexes are used as fragments to build more complex regexes. Example:

  ```js
  const any = /[\s\S]*?/.source;
  const pattern = RegExp(`<script(\\s${any})?>(${any})<\\/script>`, "g");
  ```

  In these fragments, seemingly ignored quantifier might not actually be ignored depending on how the fragment is used.

  - `true`:
    The rule does not check the regexp used as a fragment. This is default.

    <eslint-code-block>

    ```js
    /* eslint regexp/no-lazy-ends: ["error", { ignorePartial: true }] */

    /* ✓ GOOD */
    const any = /[\s\S]*?/.source;
    const pattern = RegExp(`<script(\\s${any})?>(${any})<\\/script>`, "g");

    /* ✗ BAD */
    const foo = /[\s\S]*?/
    foo.exec(str)
    ```

    </eslint-code-block>

  - `false`:
    This rule checks all regular expressions, including those used as fragments.

    <eslint-code-block>

    ```js
    /* eslint regexp/no-lazy-ends: ["error", { ignorePartial: false }] */

    /* ✗ BAD */
    const any = /[\s\S]*?/.source;
    const pattern = RegExp(`<script(\\s${any})?>(${any})<\\/script>`, "g");

    const foo = /[\s\S]*?/
    foo.exec(str)
    ```

    </eslint-code-block>

## :heart: Compatibility

This rule was taken from [eslint-plugin-clean-regex].\
This rule is compatible with [clean-regex/no-lazy-ends] rule.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.8.0

## :mag: Implementation

- Rule source
- Test source

---
title: "no-empty-link-text"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-empty-link-text.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-empty-link-text

📝 Disallow empty link text in Markdown.

💼🚫 This rule is enabled in the 📚 `recommended-markdown` config. This rule is _disabled_ in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Disallow empty or whitespace-only labels in inline and reference links. Text, including formatted text and inline code, and non-whitespace image alternative text count as content. Decorative images are allowed alongside text.

Character references such as ` ` are decoded in text and image alternative text, but remain literal in code and math. GFM footnote markers count as content. Inline math is checked when `languageOptions.math` is enabled.

Links containing embedded HTML are ignored because their accessible content cannot be determined reliably. Standalone images, reference definitions, and code blocks are not checked.

Destinations and titles do not count as label content. `markdown/no-empty-links` checks destinations.

## Examples

```md
<!-- ❌ -->
[](https://example.com)
[   ](https://example.com)
[&nbsp;](https://example.com)
[![](badge.svg)](https://example.com)
[ ][destination]

<!-- ✅ -->
[Website](https://example.com)
[*Website*](https://example.com)
[`website`](https://example.com)
[![Build status](badge.svg)](https://example.com)
[![](icon.svg) Website](https://example.com)
[Website][destination]

[destination]: https://example.com
```

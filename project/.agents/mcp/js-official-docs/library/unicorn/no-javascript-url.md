---
title: "no-javascript-url"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-javascript-url.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-javascript-url

📝 Disallow `javascript:` URLs in Markdown.

🚫 Disabled by default.

Disallow `javascript:` destinations in Markdown links, images, autolinks, and reference definitions. A link with this scheme can execute JavaScript when followed in a browser, depending on the renderer. The rule checks parsed destinations using browser URL parsing, including mixed-case schemes and character references that the Markdown parser decodes.

Reference definitions are reported at the definition, including unused definitions. Raw HTML in Markdown is not checked.

## Examples

```md
<!-- ❌ -->
[Open](javascript:alert(1))
![Image](JaVaScRiPt:alert(1))
<javascript:alert(1)>

[Open][destination]

[destination]: javascript:alert(1)

<!-- ✅ -->
[Open](https://example.com)
![Image](https://example.com/image.png)
<https://example.com>
```

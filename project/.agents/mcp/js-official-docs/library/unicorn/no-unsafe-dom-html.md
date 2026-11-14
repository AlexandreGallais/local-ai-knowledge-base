---
title: "no-unsafe-dom-html"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unsafe-dom-html.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unsafe-dom-html

📝 Disallow unsafe DOM HTML APIs.

🚫 Disabled by default.

Disallows DOM APIs that parse, insert, or replace DOM content from HTML.

These APIs are common XSS injection sinks. Prefer `Element#setHTML()` when replacing an element's child HTML, and prefer text APIs like `.textContent` or `.insertAdjacentText()` when the value should be treated as plain text.

This rule intentionally does not try to detect whether a value is a `TrustedHTML` object. Trusted Types safety depends on project-wide CSP enforcement and policy quality, which a local ESLint rule cannot reliably prove. If a project intentionally uses Trusted Types, disable this rule at the specific sink with a short comment.

This rule does not try to follow every indirect invocation. Calls through `.call()`, `.apply()`, `.bind()`, or non-static dynamic property names are out of scope.

## Examples

```js
// ❌
element.innerHTML = html;
element.outerHTML = html;
iframe.srcdoc = html;
element.insertAdjacentHTML('beforeend', html);
element.setHTMLUnsafe(html);
Document.parseHTMLUnsafe(html);
range.createContextualFragment(html);
iframe.setAttribute('srcdoc', html);
document.write(html);
document.writeln(html);

// ✅
element.setHTML(html);
Document.parseHTML(html);
element.textContent = text;
element.insertAdjacentText('beforeend', text);
```

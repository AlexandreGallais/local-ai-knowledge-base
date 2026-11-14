---
title: "no-ineffective-csp-directives"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-ineffective-csp-directives.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-ineffective-csp-directives

📝 Disallow ineffective CSP directives in `<meta>` elements.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🌐 `recommended-html`, ☑️ `unopinionated`.

Browsers ignore the `frame-ancestors`, `sandbox`, and `report-uri` Content Security Policy (CSP) directives when the policy is delivered through a `<meta>` element. The markup can give the impression that framing restrictions, sandbox restrictions, or violation reporting are active when they are not.

This rule reports those three directives in static CSP `<meta>` elements in HTML and JSX. It follows the HTML processing algorithm and CSP specification.

## Examples

```html
<!-- ❌ -->
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'none'; sandbox">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; report-uri /csp-reports">

<!-- ✅ -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'none'">
```

```jsx
// ❌
<meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'none'; sandbox" />;

// ❌
const policy = "default-src 'self'; report-uri /csp-reports";
<meta httpEquiv="Content-Security-Policy" content={policy} />;

// ✅
<meta httpEquiv="Content-Security-Policy" content="default-src 'self'" />;
```

To activate the intended behavior, deliver the policy through an HTTP response header:

```http
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; sandbox; report-uri /csp-reports
```

The rule has no autofix or suggestions because removing a directive from the markup does not activate the intended protection or reporting.

## Details

- HTML tag and attribute names, the `Content-Security-Policy` value, and directive names are case-insensitive. Whitespace around `http-equiv` values is significant.
- HTML character references are decoded in quoted and unquoted attributes.
- JSX checks lowercase `<meta>` with `httpEquiv` or `http-equiv` and static strings, including constants and composed templates.
- Reports each distinct directive once on the `content` value, in source order.

## Limitations

Other directives, report-only policies, policy syntax or strength, `<head>` placement, HTTP headers, DOM construction, and framework templates are outside scope.

Skips HTML tags with configured templates. In JSX, skips spreads, duplicate relevant attributes, custom components, and unresolved or mutable values.

`<meta>`-like text inside raw-text containers such as `` may be reported.

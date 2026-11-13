---
title: "Trusted Types API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trusted_types_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Trusted Types API (part 2 of 2)

## Examples

In the below example we create a policy that will create `TrustedHTML` objects using `TrustedTypePolicyFactory.createPolicy()`. We can then use `TrustedTypePolicy.createHTML()` to create a sanitized HTML string to be inserted into the document.

The sanitized value can then be used with `Element.innerHTML` to ensure that no new HTML elements can be injected.

```html
<div id="myDiv"></div>
```

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) =>
    string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;"),
});

let el = document.getElementById("myDiv");
const escaped = escapeHTMLPolicy.createHTML("<img src=x onerror=alert(1)>");
console.log(escaped instanceof TrustedHTML); // true
el.innerHTML = escaped;
```

Read more about this example, and discover other ways to sanitize input in the article Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types.

## See also

- Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types

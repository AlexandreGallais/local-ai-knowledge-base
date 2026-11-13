---
title: "TrustedHTML"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedhtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedHTML

The **`TrustedHTML`** interface of the `Trusted Types API` represents a string that a developer can insert into an injection sink that will render it as HTML. These objects are created via `TrustedTypePolicy.createHTML()` and therefore have no constructor.

The value of a `TrustedHTML` object is set when the object is created and cannot be changed by JavaScript as there is no setter exposed.

## Instance methods

- `TrustedHTML.toJSON()`
    Returns a string representing the `TrustedHTML` object, which is the same value as `TrustedHTML.toString()`. Automatically called by `JSON.stringify()`.
- `TrustedHTML.toString()`
    A string containing the sanitized HTML.

## Examples

In the below example we create a policy that will create `TrustedHTML` objects using `TrustedTypePolicyFactory.createPolicy()`. We can then use `TrustedTypePolicy.createHTML()` to create a sanitized HTML string to be inserted into the document.

The sanitized value can then be used with `Element.innerHTML` to ensure that no new HTML elements can be injected.

```html
<div id="myDiv"></div>
```

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/</g, "&lt;"),
});

let el = document.getElementById("myDiv");
const escaped = escapeHTMLPolicy.createHTML("<img src=x onerror=alert(1)>");
console.log(escaped instanceof TrustedHTML); // true
el.innerHTML = escaped;
```

## See also

- Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types

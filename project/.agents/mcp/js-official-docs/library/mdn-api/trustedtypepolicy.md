---
title: "TrustedTypePolicy"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicy

The **`TrustedTypePolicy`** interface of the `Trusted Types API` defines a group of functions which create `TrustedType` objects.

A `TrustedTypePolicy` object is created by `TrustedTypePolicyFactory.createPolicy()` to define a policy for enforcing security rules on input. Therefore, `TrustedTypePolicy` has no constructor.

## Instance properties

- `TrustedTypePolicy.name` (read-only)
    A string containing the name of the policy.

## Instance methods

- `TrustedTypePolicy.createHTML()`
    Creates a `TrustedHTML` object.
- `TrustedTypePolicy.createScript()`
    Creates a `TrustedScript` object.
- `TrustedTypePolicy.createScriptURL()`
    Creates a `TrustedScriptURL` object.

## Examples

In the below example we create a policy that will create `TrustedHTML` objects using `TrustedTypePolicyFactory.createPolicy()`. We can then use `TrustedTypePolicy.createHTML` to create a sanitized HTML string to be inserted into the document.

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

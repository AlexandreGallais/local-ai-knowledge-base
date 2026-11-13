---
title: "HTMLFormElement: method property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/method/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: method property

The **`HTMLFormElement.method`** property represents the
HTTP method used to submit the `<form>`.

Unless explicitly specified, the default method is 'get'.

## Value

A string.

## Examples

```js
document.forms["my-form"].method = "post";

const formElement = document.createElement("form"); // Create a form
document.body.appendChild(formElement);
console.log(formElement.method); // 'get'
```

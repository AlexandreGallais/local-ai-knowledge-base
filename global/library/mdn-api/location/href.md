---
title: "Location: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: href property

The **`href`** property of the `Location`
interface is a stringifier that returns a string containing the whole
URL, and allows the href to be updated.

Setting the value of `href` _navigates_ to the provided URL. If you
want _redirection_, use `location.replace()`. The difference from setting the `href` property value is that when using the `location.replace()` method, after navigating to the given URL, the current page will not be saved in session history — meaning the user won't be able to use the back button to navigate to it.

## Value

A string.

## Examples

```js
// Lets imagine an <a id="myAnchor" href="https://developer.mozilla.org/en-US/Location/href"> element is in the document
const anchor = document.getElementById("myAnchor");
const result = anchor.href; // Returns: 'https://developer.mozilla.org/en-US/Location/href'
```

---
title: "Location: pathname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/pathname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: pathname property

The **`pathname`** property of the `Location`
interface is a string containing the path of the URL for the location. If there is no path, `pathname` will be empty: otherwise, `pathname` contains an initial '/' followed by the path of the URL, not including the query string or fragment.

## Value

A string.

## Examples

```js
// Let's say we are on the URL https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname#examples
console.log(location.pathname); // '/en-US/docs/Web/API/Location/pathname'
```

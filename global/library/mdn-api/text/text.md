---
title: "Text: Text() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/text/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Text: Text() constructor

The **`Text()`** constructor returns a new `Text` object
with the optional string given in parameter as its textual content.

## Syntax

```js
new Text()
new Text(string)
```

### Parameters

- `string` (optional)
    A string representing the textual content of the text node.

### Return value

A new `Text` object with the content of the `string` parameter, or the empty string if no parameter was given.

## Example

```js
let text = new Text("Test");
```

## See also

- The DOM API

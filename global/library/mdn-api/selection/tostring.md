---
title: "Selection: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: toString() method

The **`Selection.toString()`** method returns a string
currently being represented by the selection object, i.e., the currently selected text.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the selection.

## Description

This method returns the currently selected text.

In JavaScript, this method is called automatically when
a function the selection object is passed to requires a string:

```js
alert(window.getSelection()); // What is called
alert(window.getSelection().toString()); // What is actually being effectively called.
```

## See also

- `Selection`, the interface it belongs to.

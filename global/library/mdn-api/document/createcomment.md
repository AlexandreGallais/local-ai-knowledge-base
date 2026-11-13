---
title: "Document: createComment() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createcomment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createComment() method

**`createComment()`** creates a new comment node, and returns
it.

## Syntax

```js
createComment(data)
```

### Parameters

- `data`
    A string containing the data to be added to the Comment.

### Return value

A new `Comment` object.

## Examples

```js
const doc = new DOMParser().parseFromString("<xml></xml>", "application/xml");
const comment = doc.createComment(
  "<example-value>",
);

doc.querySelector("xml").appendChild(comment);

console.log(new XMLSerializer().serializeToString(doc));
// Displays: <xml><!--This is a not-so-secret <example-value> in your document--></xml>
```

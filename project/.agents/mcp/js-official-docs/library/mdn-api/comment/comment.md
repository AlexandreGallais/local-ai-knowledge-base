---
title: "Comment: Comment() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/comment/comment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Comment: Comment() constructor

The **`Comment()`** constructor returns a newly created
`Comment` object with the optional string given in
parameter as its textual content.

## Syntax

```js
new Comment()
new Comment(content)
```

### Parameters

- `content` (optional)
    A string representing the textual content of the comment.

### Return value

A new `Comment` containing `content`, or the empty string if no parameter was given.

## Example

```js
const comment = new Comment("Test");
```

## See also

- The DOM interfaces index
- `Document.createComment()` is an outdated alternative to this constructor.

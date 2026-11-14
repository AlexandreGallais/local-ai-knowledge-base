---
title: "Sanitizer: setComments() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/setcomments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: setComments() method

The **`setComments()`** method of the `Sanitizer` interface sets whether comments will be allowed or removed by the sanitizer.

## Syntax

```js
setComments(allow);
```

### Parameters

- `allow`
    `true` if comments are allowed, and `false` if they are to be removed.

### Return value

`true` if the operation changed the configuration, and `false` if the configuration already set `comments` to the specified value.

## Examples

### How to sanitize comments

The code below shows the basic usage of the `setComments()` method.

```js
// Create sanitizer (in this case the default)
const sanitizer = new Sanitizer();

// Allow comments
sanitizer.setComments(true);

// Remove comments
sanitizer.setComments(false);
```

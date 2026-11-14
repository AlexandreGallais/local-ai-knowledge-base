---
title: "Headers: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: delete() method

The **`delete()`** method of the `Headers`
interface deletes a header from the current `Headers` object.

For security reasons, some headers can only be controlled by the user agent. These
headers include the forbidden request headers
and forbidden response header names.

## Syntax

```js
delete(name)
```

### Parameters

- `name`
    The name of the HTTP header you want to delete from the `Headers` object.

### Return value

None (`undefined`).

## Examples

Creating an empty `Headers` object is simple:

```js
const myHeaders = new Headers(); // Currently empty
```

You could add a header to this using `Headers.append`:

```js
myHeaders.append("Content-Type", "image/jpeg");
myHeaders.get("Content-Type"); // Returns 'image/jpeg'
```

You can then delete it again:

```js
myHeaders.delete("Content-Type");
myHeaders.get("Content-Type"); // Returns null, as it has been deleted
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP

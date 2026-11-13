---
title: "AbortController: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortcontroller/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortController: abort() method

The **`abort()`** method of the `AbortController` interface aborts an asynchronous operation before it has completed.
This is able to abort fetch requests, the consumption of any response bodies, or streams.

## Syntax

```js
abort()
abort(reason)
```

### Parameters

- `reason` (optional)
    The reason why the operation was aborted, which can be any JavaScript value.
    If not specified, the reason is set to "AbortError" `DOMException`.

### Return value

None (`undefined`).

## Examples

See the `AbortSignal` page for usage examples.

You can find a full working example on GitHub; you can also see it running live.

## See also

- Fetch API

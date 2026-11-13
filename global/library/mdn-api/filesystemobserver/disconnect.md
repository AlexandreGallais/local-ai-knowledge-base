---
title: "FileSystemObserver: disconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemobserver/disconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemObserver: disconnect() method

The **`disconnect()`** method of the
`FileSystemObserver` interface stops the observer observing the file system.

## Syntax

```js
disconnect()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Stop observing the file system

Assuming a `FileSystemObserver` instance is available, you can call the `disconnect()` method on it when you want to stop observing changes to the file system entry:

```js
observer.disconnect();
```

## Specifications

Not currently part of a specification. See https://github.com/whatwg/fs/pull/165 for the relevant specification PR.

## See also

- File System API
- The File System Observer API origin trial on developer.chrome.com (2024)

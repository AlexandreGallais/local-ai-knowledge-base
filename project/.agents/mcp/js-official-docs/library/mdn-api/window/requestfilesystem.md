---
title: "Window: requestFileSystem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/requestfilesystem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: requestFileSystem() method

The non-standard `Window` method
**`requestFileSystem()`** method is a Google Chrome-specific
method which lets a website or app gain access to a sandboxed file system for its own
use. The returned `FileSystem` is then available for use with the other file system APIs.

> **Note:**
> This method is prefixed with `webkit` in all browsers that implement it.

## Syntax

```js
requestFileSystem(type, size, successCallback)
requestFileSystem(type, size, successCallback, errorCallback)
```

### Parameters

- `type`
    The type of storage to request. Specify `Window.TEMPORARY` if it's
    acceptable for the browser to delete the files at its own discretion, such as if
    storage space runs low, or `Window.PERSISTENT` if you need the files to
    remain in place unless the user or the website or app explicitly permit it.
    Persistent storage requires that the user grant the site quota.
- `size`
    The amount of storage space you wish to have allocated for your app's use.
- `successCallback`
    A function which is invoked when the file system has been successfully obtained. The
    callback receives a single parameter: a `FileSystem` object representing
    the file system the app has permission to use.
- `errorCallback` (optional)
    An optional parameter specifying a function which is called if an error occurs while
    attempting to obtain the file system, or if the user denies permission to create or
    access the file system. The callback receives as input a single parameter: a
    `DOMException` object describing the error.

### Return value

None (`undefined`).

## Specifications

As this method was removed from the File and Directory Entries API proposal, it has no official W3C or WHATWG specification. It is no longer on track to become a standard.

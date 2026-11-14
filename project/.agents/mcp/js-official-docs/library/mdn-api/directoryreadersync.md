---
title: "DirectoryReaderSync"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/directoryreadersync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DirectoryReaderSync

The `DirectoryReaderSync` interface lets you read the entries in a directory.

> **Warning:**
> This interface is deprecated and is no more on the standard track.
> _Do not use it anymore._ Use the File and Directory Entries API instead.

## Instance methods

### readEntries()

Returns a list of entries from a specific directory. Call this method until an empty array is returned.

#### Syntax

```js
readEntries()
```

##### Parameters

None.

##### Return value

Array containing `FileEntrySync` and `DirectoryEntrySync`.

##### Exceptions

This method can raise a DOMException with the following codes:

| Exception           | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `NOT_FOUND_ERR`     | The directory does not exist.                                                      |
| `INVALID_STATE_ERR` | The directory has been modified since the first call to readEntries was processed. |
| `SECURITY_ERR`      | The browser determined that it was not safe to look up the metadata.               |

## Description

Before you call the only method in this interface, `readEntries()`, create the `DirectoryEntrySync` object. But DirectoryEntrySync (as well as `FileEntrySync`) is not a data type that you can pass <example-value> a calling app and Web Worker thread. It's not a big deal, because you don't really need to have the main app and the worker thread see the same JavaScript object; you just need them to access the same files. You can do that by passing a list of `filesystem:` URLs—which are just strings—instead of a list of entries. You can also use the `filesystem:` URL to look up the entry with `resolveLocalFileSystemURL()`. That gets you back to a DirectoryEntrySync (as well as FileEntrySync) object.

## Examples

In the following code snippet from HTML5Rocks (web.dev), we create Web Workers and pass data from it to the main app.

```js
// Taking care of the browser-specific prefixes.
window.resolveLocalFileSystemURL =
  window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;

// Create web workers
const worker = new Worker("worker.js");
worker.onmessage = (e) => {
  const urls = e.data.entries;
  urls.forEach((url) => {
    window.resolveLocalFileSystemURL(url, (fileEntry) => {
      // Print out file's name.
      console.log(fileEntry.name);
    });
  });
};

worker.postMessage({ cmd: "list" });
```

The following is `worker.js` code that gets the contents of the directory.

```js
// worker.js

// Taking care of the browser-specific prefixes.
self.requestFileSystemSync =
  self.webkitRequestFileSystemSync || self.requestFileSystemSync;

// Global for holding the list of entry file system URLs.
const paths = [];

function getAllEntries(dirReader) {
  const entries = dirReader.readEntries();

  for (const entry of entries) {
    // Stash this entry's filesystem in URL
    paths.push(entry.toURL());

    // If this is a directory, traverse.
    if (entry.isDirectory) {
      getAllEntries(entry.createReader());
    }
  }
}

// Forward the error to main app.
function onError(e) {
  postMessage(`ERROR: ${e.toString()}`);
}

self.onmessage = (e) => {
  const cmd = e.data.cmd;

  // Ignore everything else except our 'list' command.
  if (!cmd || cmd !== "list") {
    return;
  }

  try {
    const fs = requestFileSystemSync(TEMPORARY, 1024 * 1024 /* 1MB */);

    getAllEntries(fs.root.createReader());

    self.postMessage({ entries: paths });
  } catch (e) {
    onError(e);
  }
};
```

## Specifications

This feature is not part of any specification anymore. It is no longer on track to become a standard.

## See also

- File and Directory Entries API

---
title: "FileEntrySync"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fileentrysync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileEntrySync

The `FileEntrySync` interface represents a file in a file system. It lets you write content to a file.

> **Warning:**
> This interface is deprecated and is no more on the standard track.
> _Do not use it anymore._ Use the File and Directory Entries API instead.

## Method overview

       |
        <code>FileWriterSync createWriter ();</code>

       |
        <code>File file ();</code>

## Instance methods

### createWriter()

Creates a new `FileWriter` associated with the file that the `FileEntry` represents.

```js
createWriter()
```

#### Parameters

None.

#### Return value

A `FileWriterSync` object.

#### Exceptions

This method can raise a DOMException with the following codes:

| Exception           | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `NOT_FOUND_ERR`     | The file does not exist.                                                       |
| `INVALID_STATE_ERR` | The file is no longer valid for some reason other than it having been deleted. |

### file()

Returns a File that represents the current state of the file that this `FileEntry` represents.

```js
file()
```

#### Parameters

None.

#### Return value

A `File` object.

#### Exceptions

This method can raise a DOMException with the following codes:

| Exception           | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `NOT_FOUND_ERR`     | The file does not exist.                                                       |
| `INVALID_STATE_ERR` | The file is no longer valid for some reason other than it having been deleted. |

## Description

To write content to file, create a FileWriter object by calling `createWriter()`.

## Specifications

This feature is not part of any specification anymore. It is no longer on track to become a standard.

## See also

- File and Directory Entries API

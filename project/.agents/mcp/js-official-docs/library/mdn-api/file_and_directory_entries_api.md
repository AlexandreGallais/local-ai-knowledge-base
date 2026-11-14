---
title: "File and Directory Entries API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file_and_directory_entries_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# File and Directory Entries API

The File and Directory Entries API provides a way to process directories and file lists provided by the user via a form input or a drag-and-drop operation. It is a more advanced version of the File API, which allows you to work with a single file. It was originally intended to support a full virtual file system, but now only supports read operations on user-provided data.

See Relationship to other file-related APIs for a comparison between this API, the File System API, and the File API.

## Getting access to a file system

There are two ways to get access to file systems defined in the current specification draft:

- When handling a `drop` event for drag and drop, you can call `DataTransferItem.webkitGetAsEntry()` to get the `FileSystemEntry` for a dropped item. If the result isn't `null`, then it's a dropped file or directory, and you can use file system calls to work with it.
- The `HTMLInputElement.webkitEntries` property lets you access the `FileSystemFileEntry` objects for the currently selected files, but only if they are dragged-and-dropped onto the file chooser (Firefox bug 1326031). If `HTMLInputElement.webkitdirectory` is `true`, the `` element is instead a directory picker, and you get `FileSystemDirectoryEntry` objects for each selected directory.

## History

The original File System API was created to let browsers implement support for accessing a sandboxed virtual file system on the user's storage device. Work to standardize the specification was abandoned back in 2012, but by that point, Google Chrome included its own implementation of the API. Over time, a number of popular sites and Web applications came to use it, often without providing any means of falling back to standard APIs or even checking to be sure the API is available before using it. Mozilla instead opted to implement other APIs which can be used to solve many of the same problems, such as IndexedDB; see the blog post Why no FileSystem API in Firefox? for more insights.

As a result, a number of popular websites did not work properly on browsers other than Chrome. To resolve that, the features of Google's API for which consensus could be reached were standardized as the File and Directory Entries API, and this was then implemented in other browsers.

## Interfaces

The File and Directory Entries API includes the following interfaces:

- `FileSystem`
    Represents a file system.
- `FileSystemEntry`
    The basic <example-value> representing a single entry in a file system. This is implemented by other interfaces which represent files or directories.
- `FileSystemFileEntry`
    Represents a single file in a file system.
- `FileSystemDirectoryEntry`
    Represents a single directory in a file system.
- `FileSystemDirectoryReader`
    Created by calling `FileSystemDirectoryEntry.createReader()`, this interface provides the functionality which lets you read the contents of a directory.

### Extensions to other interfaces

- `DataTransferItem.webkitGetAsEntry()`
    Returns an object based on `FileSystemEntry` representing the selected file's entry in its file system. This will generally be either a `FileSystemFileEntry` or `FileSystemDirectoryEntry` object.
- `File.webkitRelativePath`
    Returns the path the URL of the `File` is relative to.
- `HTMLInputElement.webkitdirectory`
    A boolean that represents the `webkitdirectory` attribute. If `true`, the file-system-picker interface only accepts directories instead of files.
- `HTMLInputElement.webkitEntries`
    Describes the currently selected files or directories.

## See also

- File API
- File System API

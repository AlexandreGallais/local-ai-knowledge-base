---
title: "DirectoryEntrySync"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/directoryentrysync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DirectoryEntrySync

The `DirectoryEntrySync` interface represents a directory in a file system. It includes methods for creating, reading, looking up, and recursively removing files in a directory.

> **Warning:**
> This interface is deprecated and is no more on the standard track.
> _Do not use it anymore._ Use the File and Directory Entries API instead.

## Method overview

- createReader()
- getFile()
- getDirectory()
- removeRecursively()

## Instance methods

### createReader()

Creates a new `DirectoryReaderSync` to read entries from this directory.

#### Syntax

```js
createReader()
```

##### Parameters

None.

##### Return value

A `DirectoryReaderSync` object represents a directory in a file system.

##### Exceptions

This method can raise a `DOMException` with the following codes:

| Exception       | Description                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| `NOT_FOUND_ERR` | The directory does not exist.                                                              |
| `SECURITY_ERR`  | The browser determined that it was not safe to look up the metadata. [ todo: Explain why ] |

### getFile()

Depending on how you've set the `options` parameter, the method either creates a file or looks up an existing file.

#### Syntax

```js
getFile(path)
getFile(path, options)
```

##### Parameters

- `path`
    Either an absolute path or a relative path from the directory to the file to be looked up or created. You cannot create a file whose immediate parent does not exist. Create the parent directory first.
- `options`
    (optional) An object literal describing the behavior of the method. If the file does not exist, it is created.

       | Object literal
       | Condition
       | Result

       | `create: true``exclusive: true`
       | Path already exists
       | An error is thrown.

       | `create: true``exclusive: false`
       | Path doesn't exist and no other error occurs
       | A file is created. If a file already exists, no error is thrown.

       |
        `create: false`(`exclusive` is ignored)

       | Path exists
       | The file is returned.

       |
        `create: false`(`exclusive` is ignored)

       | Path doesn't exist
       | An error is thrown.

       |
        `create: false`(`exclusive` is ignored)

       | Path exists, but is a directory
       | An error is thrown.

##### Return value

A `FileEntrySync` object representing a file in a file system.

##### Exceptions

This method can raise a `DOMException` with the following codes:

| Exception                     | Description                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `ENCODING_ERR`                | The path supplied is invalid.                                                                             |
| `NOT_FOUND_ERR`               | The path was structurally correct, but refers to a resource that does not exist.                          |
| `NO_MODIFICATION_ALLOWED_ERR` | This is a permission issue. The target directory or file is not writable.                                 |
| `PATH_EXISTS_ERR`             | The file already exists. You cannot create another one with the same path.                                |
| `QUOTA_EXCEEDED_ERROR`        | The operation would cause the application to exceed its storage quota.                                    |
| `SECURITY_ERR`                | The application does not have permission to access the element referred to by path. [ todo: Explain why ] |
| `TYPE_MISMATCH_ERR`           | The path supplied exists, but it is not a directory.                                                      |

### getDirectory()

Creates or looks up a directory. The method is similar to `getFile()` with DirectoryEntrySync being passed.

#### Syntax

```js
getDirectory(path)
getDirectory(path, options)
```

##### Parameters

- `path`
    Either an absolute path or a relative path from the directory to the file to be looked up or created. You cannot create a file whose immediate parent does not exist. Create the parent directory first.
- `options`
    (optional) An object literal describing the behavior of the method if the file does not exist.

       | Object literal
       | Condition
       | Result

       | `create: true``exclusive: true`
       | Path already exists
       | An error is thrown.

       | `create: true``exclusive: false`
       | Path doesn't exist and no other error occurs
       |
        A directory is created. If a file already exists, no error is thrown.

       |
        `create: false`(`exclusive` is ignored)

       | Path exists
       | The directory is returned.

       |
        `create: false`(`exclusive` is ignored)

       | Path doesn't exist
       | An error is thrown.

       |
        `create: false`(`exclusive` is ignored)

       | Path exists, but is a directory
       | An error is thrown.

##### Return value

A `DirectoryEntrySync` object representing a directory in a file system.

##### Exceptions

This method can raise a `DOMException` with the following codes:

| Exception                     | Description                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `ENCODING_ERR`                | The path supplied is invalid.                                                                             |
| `NOT_FOUND_ERR`               | The path was structurally correct, but refers to a resource that does not exist.                          |
| `NO_MODIFICATION_ALLOWED_ERR` | This is a permission issue. The target directory or file is not writable.                                 |
| `PATH_EXISTS_ERR`             | The file already exists. You cannot create another one with the same path.                                |
| `QUOTA_EXCEEDED_ERROR`        | The operation would cause the application to exceed its storage quota.                                    |
| `SECURITY_ERR`                | The application does not have permission to access the element referred to by path. [ todo: Explain why ] |
| `TYPE_MISMATCH_ERR`           | The path supplied exists, but it is not a directory.                                                      |

### removeRecursively()

Deletes a directory and all of its contents. You cannot delete the root directory of a file system.

If you delete a directory that contains a file that cannot be removed or if an error occurs while the deletion is in progress, some of the contents might not be deleted. Catch these cases with error callbacks and retry the deletion.

#### Syntax

```js
removeRecursively()
```

##### Parameters

None.

##### Return value

`undefined`

##### Exceptions

This method can raise a `DOMException` with the following codes:

       | Exception
       | Description

       | `NOT_FOUND_ERR`
       | The target directory does not exist.

       | `INVALID_STATE_ERR`
       |
        This directory is not longer valid for some reason other than being
        deleted.
        [todo: Explain more ]

       | `NO_MODIFICATION_ALLOWED_ERR`
       |
        One of the following is not writable: the directory, its parent
        directory, and some of the content in the directory.

       | `SECURITY_ERR`
       |
        The application does not have permission to access the target directory,
        its parent, or some of its contents.

## Description

If you want to create subdirectories, you have to create each child directory in sequence. If you try to create a directory using a full path that includes parent directories that do not exist yet, you get an error. So create the hierarchy by recursively adding a new path after creating the parent directory.

## Examples

The `getFile()` method returns a `FileEntrySync`, which represents a file in the file system. The following creates an empty file called `logs.txt` in the root directory.

```js
const fileEntry = fs.root.getFile("logs.txt", { create: true });
```

The `getDirectory()` method returns a `DirectoryEntrySync`, which represents a file in the file system. The following creates a new directory called `project_dir` in the root directory.

```js
const dirEntry = fs.root.getDirectory("project_dir", { create: true });
```

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard.
Use the File and Directory Entries API instead.

## See also

- File and Directory Entries API

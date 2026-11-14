---
title: "DOMError"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMError

The **`DOMError`** interface describes an error object that contains an error name.

## Instance properties

- `DOMError.name` (read-only) (deprecated) (non-standard)
    Returns a string representing one of the error type names (see below).
- `DOMError.message` (read-only) (deprecated) (non-standard)
    Returns a string representing a message or description associated with the given error type name.

## Error types

| Type                         | Description                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `IndexSizeError`             | The index is not in the allowed range (e.g., thrown in a `range` object). |
| `HierarchyRequestError`      | The node tree hierarchy is not correct.                                                  |
| `WrongDocumentError`         | The object is in the wrong `document`.                                    |
| `InvalidCharacterError`      | The string contains invalid characters.                                                  |
| `NoModificationAllowedError` | The object cannot be modified.                                                           |
| `NotFoundError`              | The object cannot be found here.                                                         |
| `NotSupportedError`          | The operation is not supported                                                           |
| `InvalidStateError`          | The object is in an invalid state.                                                       |
| `SyntaxError`                | The string did not match the expected pattern.                                           |
| `InvalidModificationError`   | The object cannot be modified in this way.                                               |
| `NamespaceError`             | The operation is not allowed by Namespaces in XML                                        |
| `InvalidAccessError`         | The object does not support the operation or argument.                                   |
| `TypeMismatchError`          | The type of the object does not match the expected type.                                 |
| `SecurityError`              | The operation is insecure.                                                               |
| `NetworkError`               | A network error occurred.                                                                |
| `AbortError`                 | The operation was aborted.                                                               |
| `URLMismatchError`           | The given URL does not match another URL.                                                |
| `TimeoutError`               | The operation timed out.                                                                 |
| `InvalidNodeTypeError`       | The node is incorrect or has an incorrect ancestor for this operation.                   |
| `DataCloneError`             | The object cannot be cloned.                                                             |

## See also

- `DOMException`

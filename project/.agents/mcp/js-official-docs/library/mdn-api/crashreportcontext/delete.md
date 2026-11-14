---
title: "CrashReportContext: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/crashreportcontext/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CrashReportContext: delete() method

The **`delete()`** method of the `CrashReportContext` interface deletes a previously-stored key-value pair.

## Syntax

```js
delete(key)
```

### Parameters

- `key`
    A string representing the key of the key-value pair to be deleted.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if:
    - The calling document is not fully active.
    - The crash report key-value store is not yet initialized via an `initialize()` call.

## Examples

### Basic usage

```js
window.crashReport.initialize(1024).then(() => {
  // Set a possible crash-causing value, and try
  // running an operation that may cause a crash
  window.crashReport.set("crash-arg", "00031");
  operationThatMightCrash("00031");
  // Delete the key-value pair if it doesn't cause a crash
  window.crashReport.delete("crash-arg");
});
```

## See also

- Reporting API

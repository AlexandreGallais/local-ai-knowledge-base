---
title: "Document: queryCommandSupported() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/querycommandsupported/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: queryCommandSupported() method

> **Note:**
> Although the `execCommand()` method is deprecated, if you do decide to use it for reasons given on that page, you should consider checking the command's availability using `queryCommandSupported()` to ensure compatibility.

The **`Document.queryCommandSupported()`** method reports
whether or not the specified editor command is supported by the browser.

## Syntax

```js
queryCommandSupported(command)
```

### Parameters

- `command`
    The command for which to determine support.

### Return value

Returns a boolean value which is `true` if the command is supported
and `false` if the command isn't.

## Notes

The `'paste'` command return `false` not only if the feature is
unavailable, but also if the script calling it has insufficient privileges to perform
the action.

## Examples

```js
const flg = document.queryCommandSupported("SelectAll");

if (flg) {
  // Do something…
}
```

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard. There is an unofficial W3C execCommand spec draft.

## See also

- `document.execCommand()`
- `document.queryCommandEnabled()`

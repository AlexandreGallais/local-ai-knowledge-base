---
title: "Document: queryCommandEnabled() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/querycommandenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: queryCommandEnabled() method

> **Note:**
> Although the `execCommand()` method is deprecated, if you do decide to use it for reasons given on that page, you should consider checking the command's availability using `queryCommandEnabled()` to ensure compatibility.

The **`Document.queryCommandEnabled()`** method reports whether
or not the specified editor command is enabled by the browser.

## Syntax

```js
queryCommandEnabled(command)
```

### Parameters

- `command`
    The command for which to determine support.

### Return value

Returns a boolean value which is `true` if the command is enabled
and `false` if the command isn't.

## Notes

- For `"cut"` and `"copy"` commands the method only returns true
  when called from a user-initiated thread.
- The `"paste"` command return `false` not only if the feature
  is unavailable, but also if the script calling it has insufficient privileges to
  perform the action.

## Example

```js
const flg = document.queryCommandEnabled("SelectAll");

if (flg) {
  document.execCommand("SelectAll", false, null); // command is enabled, run it
}
```

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard. There is an unofficial W3C execCommand spec draft.

## See also

- `document.execCommand()`
- `document.queryCommandSupported()`

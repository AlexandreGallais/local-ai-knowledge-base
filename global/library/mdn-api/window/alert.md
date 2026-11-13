---
title: "Window: alert() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/alert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: alert() method

`window.alert()` instructs the browser to display a dialog with an optional message, and to wait until the user dismisses the dialog.

Under some conditions — for example, when the user switches tabs — the browser may not actually display a dialog, or may not wait for the user to dismiss the dialog.

## Syntax

```js
alert()
alert(message)
```

### Parameters

- `message` (optional)
    A string you want to display in the alert dialog, or, alternatively, an object that
    is converted into a string and displayed.

### Return value

None (`undefined`).

## Examples

```js
window.alert("Hello world!");
alert("Hello world!");
```

Both produce:

## Notes

The alert dialog should be used for messages which do not require any response on the
part of the user, other than the acknowledgement of the message.

Dialog boxes are modal windows - they
prevent the user from accessing the rest of the program's interface until the dialog box
is closed. For this reason, you should not overuse any function that creates a dialog
box (or modal window).

Alternatively `<dialog>` element can be used to display alerts.

## See also

- `<dialog>` element
- `confirm`
- `prompt`

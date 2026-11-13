---
title: "KeyboardEvent: getModifierState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/getmodifierstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: getModifierState() method

The **`KeyboardEvent.getModifierState()`** method returns the
current state of the specified modifier key: `true` if the modifier is active
(that is the modifier key is pressed or locked), otherwise, `false`.

## Syntax

```js
getModifierState(key)
```

### Parameters

- `key`
    A modifier key value. The value must be one of the `KeyboardEvent.key`
    values which represent modifier keys, or the string `"Accel"`
    (deprecated). This is case-sensitive.

### Return value

A boolean.

## Modifier keys on Firefox

When `getModifierState()` returns true on Firefox?

       |
       | Windows
       | Linux (GTK)
       | Mac
       | Android 2.3
       | Android 3.0 or later

       | `"Alt"`
       | Either `Alt` key or `AltGr` key <example-value>
       | `Alt` key <example-value>
       | `⌥ Option` key <example-value>
       | `Alt` key or `option` key <example-value>

       | `"AltGraph"`
       |

          Both `Alt` and `Ctrl` keys are pressed, or
          `AltGr` key is pressed

       |
        `Level 3 Shift` key (or `Level 5 Shift` key) pressed

       | `⌥ Option` key <example-value>
       | ❌ Not supported
       | ❌ Not supported

       | `"CapsLock"`
       | During LED for `⇪ Caps Lock` turned on
       | ❌ Not supported
       | While `CapsLock` is locked

       | `"Control"`
       | Either `Ctrl` key or `AltGr` key <example-value>
       | `Ctrl` key <example-value>
       | `control` key <example-value>
       | `menu` key pressed.
       |
        `Ctrl` key, `control` key or `menu` key
        pressed.

       | `"Fn"`
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       |
        `Function` key is pressed, but we're not sure what key makes
        the modifier state active. `Fn` key on Mac keyboard doesn't
        cause this active.

       | `"FnLock"`
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported

       | `"Hyper"`
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported

       | `"Meta"`
       | `⊞ Windows Logo` key <example-value> (from Firefox 118)
       | `Meta` key <example-value>
       | `⌘ Command` key <example-value>
       | ❌ Not supported
       | `⊞ Windows Logo` key or `command` key <example-value>

       | `"NumLock"`
       | During LED for `Num Lock` turned on
       | A key on numpad pressed
       | ❌ Not supported
       | While `NumLock` is locked

       | `"OS"`
       | `⊞ Windows Logo` key <example-value> (before Firefox 118)
       |
        `Super` key or `Hyper` key <example-value> (typically, mapped
        to `⊞ Windows Logo` key)

       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported

       | `"ScrollLock"`
       | During LED for `Scroll Lock` turned on
       |
        During LED for `Scroll Lock` turned on, but typically this
        isn't supported by platform

       | ❌ Not supported
       | ❌ Not supported
       | While `ScrollLock` is locked

       | `"Shift"`
       | `⇧ Shift` key <example-value>

       | `"Super"`
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported

       | `"Symbol"`
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported

       | `"SymbolLock"`
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported
       | ❌ Not supported

- On the other platforms, "Alt", "Control" and "Shift" may be supported.
- All modifiers (except `"FnLock"`, `"Hyper"`, `"Super"` and `"Symbol"` which are defined after Firefox implements this) are always supported for untrusted events on Firefox.
  This doesn't depend on the platform.

## `"Accel"` virtual modifier

> **Note:**
> The `"Accel"` virtual modifier has
> been effectively **deprecated** in current drafts of the DOM3 Events
> specification.

`getModifierState()` also accepts a deprecated virtual modifier named
`"Accel"`. `event.getModifierState("Accel")` returns
`true` when at least one of `KeyboardEvent.ctrlKey` or
`KeyboardEvent.metaKey` is `true`.

In old implementations and outdated specifications, it returned `true` when
a modifier which is the typical modifier key for the shortcut key is pressed. For
example, on Windows, pressing `Ctrl` key may make it return `true`.
However, on Mac, pressing `⌘ Command` key may make it return `true`.
Note that which modifier key makes it return true depends on platforms, browsers, and
user settings. For example, Firefox users can customize this with a pref,
`"ui.key.accelKey"`.

## Examples

```js
function handleKeyboardEvent(event) {
  // Ignore if following modifier is active.
  if (
    event.getModifierState("Fn") ||
    event.getModifierState("Hyper") ||
    event.getModifierState("OS") ||
    event.getModifierState("Super") ||
    event.getModifierState("Win") /* hack for IE */
  ) {
    return;
  }

  // Also ignore if two or more modifiers except Shift are active.
  if (
    event.getModifierState("Control") +
      event.getModifierState("Alt") +
      event.getModifierState("Meta") >
    1
  ) {
    return;
  }

  // Handle shortcut key with standard modifier
  if (event.getModifierState("Accel")) {
    switch (event.key.toLowerCase()) {
      case "c":
        if (event.getModifierState("Shift")) {
          // Handle Accel + Shift + C
          event.preventDefault(); // consume the key event
        }
        break;
      case "k":
        if (!event.getModifierState("Shift")) {
          // Handle Accel + K
          event.preventDefault(); // consume the key event
        }
        break;
    }
    return;
  }

  // Do something different for arrow keys if ScrollLock is locked.
  if (
    (event.getModifierState("ScrollLock") ||
      event.getModifierState("Scroll")) /* hack for IE */ &&
    !event.getModifierState("Control") &&
    !event.getModifierState("Alt") &&
    !event.getModifierState("Meta")
  ) {
    switch (event.key) {
      case "ArrowDown":
      case "Down": // hack for IE and old Firefox
        event.preventDefault(); // consume the key event
        break;
      case "ArrowLeft":
      case "Left": // hack for IE and old Firefox
        // Do something different if ScrollLock is locked.
        event.preventDefault(); // consume the key event
        break;
      case "ArrowRight":
      case "Right": // hack for IE and old Firefox
        // Do something different if ScrollLock is locked.
        event.preventDefault(); // consume the key event
        break;
      case "ArrowUp":
      case "Up": // hack for IE and old Firefox
        // Do something different if ScrollLock is locked.
        event.preventDefault(); // consume the key event
        break;
    }
  }
}
```

> **Note:**
> Although this example uses `.getModifierState()` with `"Alt"`,
> `"Control"`, `"Meta"` and `"Shift"`, using
> `event.altKey`, `event.ctrlKey`, `event.metaKey` and
> `event.shiftKey` may be more preferable.

## See also

- The `KeyboardEvent` this method belongs to.
- `MouseEvent.getModifierState`

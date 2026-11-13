---
title: "KeyboardEvent: keyCode property (part 1 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keycode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: keyCode property

The deprecated **`KeyboardEvent.keyCode`** read-only property represents a system and implementation dependent numerical code identifying the unmodified value of the pressed key.

This is usually the decimal ASCII () or Windows 1252 code corresponding to the key. If the key can't be identified, this value is `0`.

You should avoid using this if possible; it's been deprecated for some time. Instead, you should use `KeyboardEvent.code` (for the physical key <example-value>) or `KeyboardEvent.key` (for the character the key maps to). Check compatibility for either property if you target very old browsers.

> **Note:**
> Web developers shouldn't use the `keyCode` attribute for printable characters when handling `keydown` and `keyup` events. As described above, the `keyCode` attribute is not useful for printable characters, especially those input with the `Shift` or `Alt` key pressed.

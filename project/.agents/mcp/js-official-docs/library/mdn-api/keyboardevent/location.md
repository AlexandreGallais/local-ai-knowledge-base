---
title: "KeyboardEvent: location property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: location property

The **`KeyboardEvent.location`** read-only property returns an
`unsigned long` representing the location of the key on the keyboard or other
input device.

Possible values are:

       | Constant
       | Value
       | Description

       | `DOM_KEY_LOCATION_STANDARD`
       | 0
       |
        The key has only one version, or can't be distinguished between the left
        and right versions of the key, and was not pressed on the numeric keypad
        or a key that is considered to be part of the keypad.

       | `DOM_KEY_LOCATION_LEFT`
       | 1
       |
        The key was the left-hand version of the key; for example, the left-hand
        `Control` key was pressed on a standard 101 key US keyboard.
        This value is only used for keys that have more than one possible
        location on the keyboard.

       | `DOM_KEY_LOCATION_RIGHT`
       | 2
       |
        The key was the right-hand version of the key; for example, the
        right-hand `Control` key is pressed on a standard 101 key US
        keyboard. This value is only used for keys that have more than one
        possible location on the keyboard.

       | `DOM_KEY_LOCATION_NUMPAD`
       | 3
       |

          The key was on the numeric keypad, or has a virtual key code that
          corresponds to the numeric keypad.

            Note: When `NumLock` is locked, Firefox
            always returns `DOM_KEY_LOCATION_NUMPAD` for the keys on
            the numeric pad. Otherwise, when `NumLock` is unlocked and
            the keyboard actually has a numeric keypad, Firefox always returns
            `DOM_KEY_LOCATION_NUMPAD` too. On the other hand, if the
            keyboard doesn't have a keypad, such as on a notebook computer, some
            keys become Numpad only when NumLock is locked. When such keys fires
            key <example-value>, the location attribute value depends on the key. That
            is, it must not be `DOM_KEY_LOCATION_NUMPAD`.

            Note: `NumLock` key's key <example-value> indicate
            `DOM_KEY_LOCATION_STANDARD` both on Firefox and Internet
            Explorer.

       |
        `DOM_KEY_LOCATION_MOBILE`
        (non-standard) (deprecated)

       | 4
       |

          The key was on a mobile device; this can be on either a physical
          keypad or a virtual keyboard.

       |
        `DOM_KEY_LOCATION_JOYSTICK` (non-standard)
        (deprecated)

       | 5
       |

          The key was a button on a game controller or a joystick on a mobile
          device.

## Value

A number.

## Examples

```js
function keyEvent(event) {
  console.log(`Location of key <example-value>: ${event.location}`);
}
```

## See also

- `KeyboardEvent`

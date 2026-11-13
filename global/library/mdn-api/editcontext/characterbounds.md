---
title: "EditContext: characterBounds() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/characterbounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: characterBounds() method

The **`characterBounds()`** method of the `EditContext` interface returns an `Array` containing the list of bounding rectangles for the characters in the `EditContext` object.

The position and size of the characters in an `EditContext` object is used by the operating system to correctly position platform-specific editing-related UI surfaces such as an Input Method Editor (IME) window when needed. This is especially important in situations where the operating system can't automatically detect the position and size of the characters, such as when rendering text in a `<canvas>` element.

Web developers will most likely be interested in using the `characterboundsupdate` event together with the `EditContext.updateCharacterBounds()` method to update the character bounds when the operating system indicates that it requires information about the position and size of the characters.

The `characterBounds()` method returns the list of character bounds that were last updated with `updateCharacterBounds()`. The list doesn't contain an item for every character in the `EditContext` object, only for the characters that were updated with `updateCharacterBounds()`. To know where the characters are located in the `EditContext` object, use the `EditContext.characterBoundsRangeStart` property.

## Syntax

```js
characterBounds()
```

### Parameters

None.

### Return value

An `Array` containing `DOMRect` objects.

## See also

- The `EditContext` interface it belongs to.

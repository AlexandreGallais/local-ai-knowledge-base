---
title: "CharacterBoundsUpdateEvent: rangeEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterboundsupdateevent/rangeend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterBoundsUpdateEvent: rangeEnd property

The **`CharacterBoundsUpdateEvent.rangeEnd`** read-only property represents the offset of the last character within the editable text region for which the operating system needs the bounds.

## Value

A `Number`.

## Examples

### Reading the `rangeEnd` value

This example shows how to use the `characterboundsupdate` event and read the value of the `rangeStart` and `rangeEnd` properties.

```js
const editContext = new EditContext();
editorElement.editContext = editContext;

editContext.addEventListener("characterboundsupdate", (e) => {
  console.log(
    `The OS needs the bounds of the chars at ${e.rangeStart} - ${e.rangeEnd}.`,
  );
});
```

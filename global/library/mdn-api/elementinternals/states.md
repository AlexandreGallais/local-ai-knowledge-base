---
title: "ElementInternals: states property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/states/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: states property

The **`states`** read-only property of the `ElementInternals` interface returns a `CustomStateSet` representing the possible states of the custom element.

## Value

A `CustomStateSet` which is a `Set` of strings.

## Examples

The following function adds and removes the state `--checked` to a `CustomStateSet`, then prints to the console `true` or `false` as the custom checkbox is checked or unchecked.

```js
class MyElement extends HTMLElement {
  set checked(flag) {
    if (flag) {
      this._internals.states.add("--checked");
    } else {
      this._internals.states.delete("--checked");
    }

    console.log(this._internals.states.has("--checked"));
  }
}
```

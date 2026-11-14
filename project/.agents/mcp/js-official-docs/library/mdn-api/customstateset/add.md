---
title: "CustomStateSet: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customstateset/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomStateSet: add() method

The **`add`** method of the `CustomStateSet` interface adds value representing a custom state to the `CustomStateSet`.

Custom elements with a specific state can be selected using the `:state()` pseudo-class, specifying the desired state as an argument.

## Syntax

```js
add(value)
```

### Parameters

- `value`
    A string that represents the custom state.

### Return value

Undefined.

## Examples

The following function adds the state `checked` to a `CustomStateSet`.

```js
class MyCustomElement extends HTMLElement {
  set checked(flag) {
    if (flag) {
      this._internals.states.add("checked");
    }
  }
}
```

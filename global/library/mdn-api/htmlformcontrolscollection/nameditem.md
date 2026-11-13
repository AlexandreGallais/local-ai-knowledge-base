---
title: "HTMLFormControlsCollection: namedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformcontrolscollection/nameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormControlsCollection: namedItem() method

The **`HTMLFormControlsCollection.namedItem()`** method returns
the `RadioNodeList` or the `Element` in the collection whose
`name` or `id` match the specified name, or `null` if
no node matches.

Note that this version of `namedItem()` hides the one inherited from
`HTMLCollection`. Like that one, in JavaScript, using the array bracket
syntax with a `String`, like `collection["value"]` is
equivalent to `collection.namedItem("value")`.

## Syntax

```js
namedItem(name)
[name]
```

### Parameters

- `name`
    A string which will be used to match against the `name` or `id` attributes of the controls in this `HTMLFormControlsCollection` object.

### Return value

- A `RadioNodeList` if there are multiple elements with the given `name` or `id`,
- An `Element` if there is exactly one element with the given `name` or `id`, or
- `null` if no element has the given `name` or `id`.

> **Note:**
> The returned `RadioNodeList` is live, meaning that its contents automatically update if elements that match the given name are added to or removed from the collection. Furthermore, it may contain non-radio input elements despite the collection's name.

## Examples

### Using namedItem()

#### HTML

```html
<form>
  <label for="yes">Yes</label>
  <input id="yes" name="my-radio" type="radio" />
  <label for="no">No</label>
  <input id="no" name="my-radio" type="radio" />
  <label for="maybe">Maybe</label>
  <input id="maybe" name="my-radio" type="radio" />
  <br />
  <label for="checkbox1">Checkbox</label>
  <input id="checkbox1" name="my-form-control" type="checkbox" />
</form>

<div id="output"></div>
```

```css
div {
  margin: 1rem 0;
}
```

#### JavaScript

```js
const form = document.querySelector("form");
const items = form.elements.namedItem("my-radio");

const output = document.querySelector("#output");
const itemIDs = Array.from(items)
  .map((item) => `"${item.id}"`)
  .join(", ");

const item2 = form.elements.namedItem("my-form-control");
output.textContent = `My items: ${itemIDs}
My single item: "${item2.id}"`;
```

#### Result

## See also

- `HTMLCollection.namedItem` that it replaces

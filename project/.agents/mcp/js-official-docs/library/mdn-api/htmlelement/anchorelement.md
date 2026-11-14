---
title: "HTMLElement: anchorElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/anchorelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: anchorElement property

The **`anchorElement`** property of the `HTMLElement` interface returns a reference to the element's anchor element. This works only in the case of elements associated with their anchors via the `anchor` HTML attribute, not elements associated with their anchors via the CSS `anchor-name` and `position-anchor` properties.

## Value

An `HTMLElement` instance representing the element's anchor element, or `null` if it doesn't have one.

## Examples

### Basic usage

This example associates an element with an anchor in HTML, and uses JavaScript to retrieve a reference to the anchor element.

#### HTML

In the HTML, we create a `` element with an `id` of `example-anchor`. This will be our anchor element. We then include another `` with a class of `infobox` and an `anchor` attribute set to `example-anchor`. This designates the first `` as the anchor of the second ``, associating the two together.

We also include a `` element to output some results into.

```html
<div class="anchor" id="example-anchor">⚓︎</div>

<div class="infobox" anchor="example-anchor">
  <p>This is an information box.</p>
</div>

<p class="output"></p>
```

#### JavaScript

We use JavaScript to get references to the positioned element and the output element, and then print the value of the positioned element's `anchorElement` property's associated `id` to the output, showing that the anchor element is the positioned element's `anchorElement`.

```js
const posElem = document.querySelector(".infobox");
const outputElem = document.querySelector(".output");

try {
  outputElem.textContent = `The positioned element's anchor element is the ${posElem.anchorElement.id}.`;
} catch (e) {
  outputElem.textContent = `Your browser doesn't support the anchorElement property.`;
}
```

#### Result

The result is as follows.

## Specifications

This attribute is not currently part of the HTML specification. Read the discussion about adding the `anchorElement` property at https://github.com/whatwg/html/pull/9144.

## See also

- HTML `anchor` attribute
- CSS `anchor-name` and `position-anchor` properties
- CSS anchor positioning module

---
title: "HTMLDetailsElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldetailselement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDetailsElement

The **`HTMLDetailsElement`** interface provides special properties (beyond the regular `HTMLElement` interface it also has available to it by inheritance) for manipulating `` elements.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLDetailsElement.name`
    A string reflecting the `name` HTML attribute, which allows you to create a group of mutually-exclusive `` elements. Opening one of the named `` elements of this group causes other elements of the group to close.
- `HTMLDetailsElement.open`
    A boolean value reflecting the `open` HTML attribute, indicating whether or not the element's contents (not counting the `<summary>`) is to be shown to the user.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## Events

_Inherits events from its parent interface, `HTMLElement`._

## Examples

### Log chapters as they are opened and closed

This example uses the `HTMLElement` `toggle` event to add and remove chapters from a log aside as they are opened and closed.

#### HTML

```html
<section id="summaries">
  <p>Chapter summaries:</p>
  <details id="ch1">
    <summary>Chapter I</summary>
    Philosophy reproves Boethius for the foolishness of his complaints against
    Fortune. Her very nature is caprice.
  </details>
  <details id="ch2">
    <summary>Chapter II</summary>
    Philosophy in Fortune's name replies to Boethius' reproaches, and proves
    that the gifts of Fortune are hers to give and to take away.
  </details>
  <details id="ch3">
    <summary>Chapter III</summary>
    Boethius falls back upon his present sense of misery. Philosophy reminds him
    of the brilliancy of his former fortunes.
  </details>
</section>
<aside id="log">
  <p>Open chapters:</p>
  <div data-id="ch1" hidden>I</div>
  <div data-id="ch2" hidden>II</div>
  <div data-id="ch3" hidden>III</div>
</aside>
```

#### CSS

```css
body {
  display: flex;
}

#log {
  flex-shrink: 0;
  padding-left: 3em;
}

#summaries {
  flex-grow: 1;
}
```

#### JavaScript

```js
function logItem(e) {
  console.log(e);
  const item = document.querySelector(`[data-id=${e.target.id}]`);
  item.toggleAttribute("hidden");
}

const chapters = document.querySelectorAll("details");
chapters.forEach((chapter) => {
  chapter.addEventListener("toggle", logItem);
});
```

#### Result

## See also

- The HTML element implementing this interface: ``

---
title: "Range: commonAncestorContainer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/commonancestorcontainer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: commonAncestorContainer property

The **`Range.commonAncestorContainer`** read-only property
returns the deepest — or furthest down the document tree — `Node` that
contains both boundary points of the `Range`. This means that if
`startContainer` and `endContainer` both refer to
the same node, this node is the **common ancestor container**.

Since a `Range` need not be continuous, and may also partially select nodes,
this is a convenient way to find a `Node` which encloses a
`Range`.

This property is read-only. To change the ancestor container of a `Node`,
consider using the various methods available to set the start and end positions of the
`Range`, such as `Range.setStart()` and
`Range.setEnd()`.

## Value

A `Node` object.

## Examples

In this example, we create an event listener to handle `pointerup` events on
a list. The listener gets the common ancestors of each piece of selected text and
triggers an animation to highlight them.

### HTML

```html
<ul>
  <li>
    Strings
    <ul>
      <li>Cello</li>
      <li>
        Violin
        <ul>
          <li>First Chair</li>
          <li>Second Chair</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    Woodwinds
    <ul>
      <li>Clarinet</li>
      <li>Oboe</li>
    </ul>
  </li>
</ul>
```

### CSS

The `.highlight` class created below uses a set of CSS
`@keyframes` to animate a fading outline.

```css
.highlight {
  animation: highlight linear 1s;
}

@keyframes highlight {
  from {
    outline: 1px solid red;
  }
  to {
    outline: 1px solid transparent;
  }
}
```

```css
body {
  padding: 1px;
}
```

### JavaScript

```js
document.addEventListener("pointerup", (e) => {
  const selection = window.getSelection();

  if (selection.type === "Range") {
    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      playAnimation(range.commonAncestorContainer);
    }
  }
});

function playAnimation(el) {
  if (el.nodeType === Node.TEXT_NODE) {
    el = el.parentNode;
  }

  el.classList.remove("highlight");
  setTimeout(() => {
    el.classList.add("highlight");
  }, 0);
}
```

## See also

- The DOM interfaces index

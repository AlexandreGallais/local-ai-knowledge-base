---
title: "Pointer events (part 2 of 2)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/pointer_events/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Pointer events (part 2 of 2)

## Capturing the pointer

Pointer capture allows events for a particular `pointer event` to be re-targeted to a particular element instead of the normal hit test at a pointer's location. This can be used to ensure that an element continues to receive pointer events even if the pointer device's contact moves off the element (for example by scrolling or panning).

Pointer capture will cause the target to capture all subsequent pointer events as if they were occurring over the capturing target. Accordingly, `pointerover`, `pointerenter`, `pointerleave`, and `pointerout` **will not fire** as long as this capture is set.
For touchscreen browsers that allow direct manipulation, an implicit pointer capture will be called on the element when a `pointerdown` event triggers. The capture can be released manually by calling `element.releasePointerCapture` on the target element, or it will be implicitly released after a `pointerup` or `pointercancel` event.

> **Note:**
> If you need to move an element in the DOM, then make sure to call `setPointerCapture()` **after DOM movements** so that `setPointerCapture()` will not lose track of it. E.g., if you need to use `Element.append()` to move an element somewhere else, then make sure to call `setPointerCapture()` on it only after the call to `Element.append()`.

The following example shows pointer capture being set on an element.

```html
<div id="target">Touch me…</div>
```

```js
function downHandler(ev) {
  const el = document.getElementById("target");
  // Element 'target' will receive/capture further events
  el.setPointerCapture(ev.pointerId);
}

const el = document.getElementById("target");
el.onpointerdown = downHandler;
```

The following example shows a pointer capture being released when a `pointercancel` event occurs. The browser does this automatically when a `pointerup` or `pointercancel` event occurs.

```html
<div id="target">Touch me…</div>
```

```js
function downHandler(ev) {
  const el = document.getElementById("target");
  // Element "target" will receive/capture further events
  el.setPointerCapture(ev.pointerId);
}

function cancelHandler(ev) {
  const el = document.getElementById("target");
  // Release the pointer capture
  el.releasePointerCapture(ev.pointerId);
}

const el = document.getElementById("target");
// Register pointerdown and pointercancel handlers
el.onpointerdown = downHandler;
el.onpointercancel = cancelHandler;
```

## touch-action CSS property

The `touch-action` CSS property is used to specify whether or not the browser should apply its default (_native_) touch behavior (such as zooming or panning) to a region. This property may be applied to all elements except: non-replaced inline elements, table rows, row groups, table columns, and column groups.

A value of `auto` means the browser is free to apply its default touch behavior (to the specified region) and the value of `none` disables the browser's default touch behavior for the region. The values `pan-x` and `pan-y`, mean that touches that begin on the specified region are only for horizontal and vertical scrolling, respectively. The value `manipulation` means the browser may consider touches that begin on the element are only for scrolling and zooming.

In the following example, default touch behavior is disabled for some `button` elements.

```css
button#tiny {
  touch-action: none;
}
```

In the following example, when the `target` element is touched, it will only pan in the horizontal direction.

```css
#target {
  touch-action: pan-x;
}
```

## Compatibility with mouse events

Although the pointer event interfaces enable applications to create enhanced user experiences on pointer enabled devices, the reality is the vast majority of today's web content is designed to only work with mouse input. Consequently, even if a browser supports pointer events, the browser must still process mouse events so content that assumes mouse-only input will work as is without direct modification. Ideally, a pointer enabled application does not need to explicitly handle mouse input. However, because the browser must process mouse events, there may be some compatibility issues that need to be handled. This section contains information about pointer event and mouse event interaction and the ramifications for application developers.

The browser _may map generic pointer input to mouse events for compatibility with mouse-based content_. This mapping of events is called _compatibility mouse events_. Authors can prevent the production of certain compatibility mouse events by canceling the pointerdown event but note that:

- Mouse events can only be prevented when the pointer is down.
- Hovering pointers (e.g., a mouse with no buttons pressed) cannot have their mouse events prevented.
- The `mouseover`, `mouseout`, `mouseenter`, and `mouseleave` events are never prevented (even if the pointer is down).

## Best practices

Here are some _best practices_ to consider when using pointer events:

- Minimize the amount of work performed in event handlers.
- Add the event handlers to a specific target element (rather than the entire document or nodes higher up in the document tree).
- The target element (node) should be large enough to accommodate the largest contact surface area (typically a finger touch). If the target area is too small, touching it could result in firing other events for adjacent elements.

## Browser compatibility

Some additional values have been defined for the CSS `touch-action` property as part of the Pointer Events specification, but currently those values have limited implementation support.

## See also

- Touch Events
- Pointer Events Working Group
- Mail list
- W3C #pointerevents IRC channel
- Touch/pointer tests and demos by Patrick H. Lauke

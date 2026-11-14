---
title: "ShadowRoot: getAnimations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/getanimations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: getAnimations() method

The **`getAnimations()`** method of the `ShadowRoot` interface
returns an array of all `Animation` objects currently in effect whose
target elements are descendants of the shadow tree. This array includes CSS Animations, CSS Transitions, and Web Animations.

## Syntax

```js
getAnimations()
```

### Parameters

None.

### Return value

An `Array` of `Animation` objects, each representing one
animation currently associated with elements which are descendants of the
`ShadowRoot` on which it's called.

## Examples

The following code snippet will slow down all animations in a shadow tree by halving their
`Animation.playbackRate`.

```js
let customElem = document.querySelector("my-shadow-dom-element");
let shadow = customElem.shadowRoot;
shadow.getAnimations().forEach((animation) => {
  animation.playbackRate *= 0.5;
});
```

## See also

- Web Animations API
- CSS Animations
- CSS Transitions
- `Element.getAnimations()` - Fetch only the animations on a single
  `Element` and its descendants.
- `Animation`

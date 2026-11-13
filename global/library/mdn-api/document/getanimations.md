---
title: "Document: getAnimations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/getanimations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: getAnimations() method

The `getAnimations()` method of the `Document` interface
returns an array of all `Animation` objects currently in effect whose
target elements are descendants of the document. This array includes CSS Animations, CSS Transitions, and Web Animations.

## Syntax

```js
getAnimations()
```

### Parameters

None.

### Return value

An `Array` of `Animation` objects, each representing one
animation currently associated with elements which are descendants of the
`Document` on which it's called.

## Examples

The following code snippet will slow down all animations on a page by halving their
`Animation.playbackRate`.

```js
document.getAnimations().forEach((animation) => {
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

---
title: "KeyframeEffect: setKeyframes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyframeeffect/setkeyframes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyframeEffect: setKeyframes() method

The **`setKeyframes()`** method of the `KeyframeEffect` interface replaces the keyframes that make up the affected `KeyframeEffect` with a new set of keyframes.

## Syntax

```js
setKeyframes(keyframes)
```

### Parameters

- `keyframes`
    A keyframe object or `null`. If set to `null`, the keyframes are replaced with a sequence of empty keyframes.

    More information about a keyframe object's format.

### Return value

None (`undefined`).

### Exceptions

       | Exception
       | Explanation

       | `TypeError`
       |
        One or more of the frames were not of the correct type of object, the
        keyframes were not
        loosely sorted by offset, or a keyframe existed with an offset of less than 0 or more than 1.

> **Note:**
> If the keyframes cannot be processed or are malformed, the `KeyframeEffect`'s keyframes are not modified.

## Examples

```js
// passing an array of keyframe objects
existingKeyframeEffect.setKeyframes([
  { color: "blue" },
  { color: "green", left: "10px" },
]);

// passing an object with arrays for values
existingKeyframeEffect.setKeyframes({
  color: ["blue", "green"],
  left: ["0", "10px"],
});

// passing a single-member object
existingKeyframeEffect.setKeyframes({
  color: "blue",
});
```

## See also

- KeyframeEffect Interface
- Web Animations API

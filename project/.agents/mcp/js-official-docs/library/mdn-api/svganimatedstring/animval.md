---
title: "SVGAnimatedString: animVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedstring/animval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedString: animVal property

The `animVal` read-only property of the `SVGAnimatedString` interface is a string representing the animated value of the reflected attribute.

## Value

As string.

If the given attribute or property is being animated, this is the current animated value.
If the given attribute or property is not currently being animated, this is the same value as the `SVGAnimatedString.baseVal` property.

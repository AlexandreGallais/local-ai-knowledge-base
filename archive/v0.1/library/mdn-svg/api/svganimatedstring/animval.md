---
title: "SVGAnimatedString: animVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedstring/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedString: animVal property

The `animVal` read-only property of the `SVGAnimatedString` interface is a string representing the animated value of the reflected attribute.

## Value

As string.

If the given attribute or property is being animated, this is the current animated value.
If the given attribute or property is not currently being animated, this is the same value as the `SVGAnimatedString.baseVal` property.

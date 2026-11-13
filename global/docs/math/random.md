---
id: random
title: "Random values"
topic: math
summary: "Math.random and its limits, a random integer in a range, secure random, a seeded sequence for tests and demos."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S16, S17, S18, S19, S39]
license: MIT, written for this base; facts from the sources below
---

# Random values

Contents: Math.random · Random integer in a range · Secure random · Seeded sequence for tests and demos · Sources

## 1. Math.random

Formula: `Math.random()` returns a number from 0 (included) to 1 (excluded).

Example: `Math.random() * (maximum - minimum) + minimum` gives a number in a range.

Pitfall: No seed: the sequence cannot be replayed. Not for security: never use it for a token, a key or a password.

Sources: [S16] [S39]

## 2. Random integer in a range

Formula: floor(unit * (maximum - minimum + 1)) + minimum, both ends included.

Example: `randomInteger(0.5, 1, 6)` gives `4`. `randomInteger(0, 1, 6)` gives `1`. `randomInteger(0.999999, 1, 6)` gives `6`.

Pitfall: Do not use `Math.round`: the two ends would come half as often.

Kit: `randomInteger` in `kit/math/random-integer.ts`. Sources: [S16] [E]

## 3. Secure random

Formula: `crypto.getRandomValues(new Uint32Array(count))` fills the array in place.

Example: `crypto.getRandomValues(new Uint32Array(2)).length` gives `2`.

Pitfall: Integer typed arrays only: a `Float64Array` throws. At most 65536 bytes per call.

Sources: [S17] [E]

## 4. Seeded sequence for tests and demos

Formula: `nextSplitMix32(state)` returns the next state and a value from 0 to 1. Pass the returned state to the next call.

Example: `nextSplitMix32(1985).uint32` gives `3153990299`; the next call gives `2826677777`.

Pitfall: The same seed gives the same sequence: that is the goal. Not for security.

Kit: not in the kit (it needs bitwise operators); the reference code is below. Sources: [S18] [S19] [E]

```ts
export interface RandomStep {
  readonly state: number;
  readonly value: number;
  readonly uint32: number;
}

// SplitMix32 with the MurmurHash3 finalizer constants. Pure: state in, next state and value out.
export function nextSplitMix32(state: number): RandomStep {
  const next = (state + 0x9e3779b9) | 0;
  let mixed = next ^ (next >>> 16);
  mixed = Math.imul(mixed, 0x85ebca6b);
  mixed ^= mixed >>> 13;
  mixed = Math.imul(mixed, 0xc2b2ae35);
  mixed ^= mixed >>> 16;
  const uint32 = mixed >>> 0;
  return { state: next, value: uint32 / 4_294_967_296, uint32 };
}
```

## Sources

- [S16] MDN, 2025, "Math.random()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random>.
- [S17] MDN, 2025, "Crypto: getRandomValues() method", <https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues>.
- [S18] bryc, « Pseudorandom number generators » (PRNGs.md), "Pseudorandom number generators", <https://github.com/bryc/code/blob/master/jshash/PRNGs.md>.
- [S19] npm, paquet « nativeprng », "nativeprng", <https://www.npmjs.org/package/nativeprng>.
- [S39] Guo Y., 2015, "There's Math.random(), and then there's Math.random()", <https://v8.dev/blog/math-random>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.

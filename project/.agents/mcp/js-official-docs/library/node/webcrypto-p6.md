---
title: "Web Crypto API (part 6 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webcrypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Crypto API (part 6 of 6)

### Class: `TurboShakeParams`

#### `turboShakeParams.domainSeparation`

* Type: {number|undefined}

The optional domain separation byte (0x01-0x7f). Defaults to `0x1f`.

#### `turboShakeParams.name`

* Type: {string} Must be `'TurboSHAKE128'`[^modern-algos] or `'TurboSHAKE256'`[^modern-algos].

#### `turboShakeParams.outputLength`

* Type: {number} represents the requested output length in bits.

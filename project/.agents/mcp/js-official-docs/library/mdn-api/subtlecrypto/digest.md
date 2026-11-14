---
title: "SubtleCrypto: digest() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/digest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: digest() method

The **`digest()`** method of the `SubtleCrypto` interface generates a _digest_ of the given data, using the specified hash function.
A digest is a short fixed-length value derived from some variable-length input.
Cryptographic digests should exhibit collision-resistance, meaning that it's hard to come up with two different inputs that have the same digest value.

It takes as its arguments an identifier for the digest algorithm to use and the data to digest.
It returns a `Promise` which will be fulfilled with the digest.

Note that this API does not support streaming input: you must read the entire input into memory before passing it into the digest function.

## Syntax

```js
digest(algorithm, data)
```

### Parameters

- `algorithm`
    This may be a string or an object with a single property `name` that is a string. The string names the hash function to use. Supported values are:
    - `"SHA-1"` (but don't use this in cryptographic applications)
    - `"SHA-256"`
    - `"SHA-384"`
    - `"SHA-512"`.
- `data`
    An `ArrayBuffer`, a `TypedArray` or a `DataView` object containing the data to be digested.

### Return value

A `Promise` that fulfills with an `ArrayBuffer` containing the digest.

## Supported algorithms

Digest algorithms, also known as hash functions, transform an arbitrarily large block of data into a fixed-size output, usually much shorter than the input.
They have a variety of applications in cryptography.

       | Algorithm
       | Output length (bits)
       | Block size (bits)
       | Specification

       | SHA-1
       | 160
       | 512
       |
        FIPS 180-4, section 6.1

       | SHA-256
       | 256
       | 512
       |
        FIPS 180-4, section 6.2

       | SHA-384
       | 384
       | 1024
       |
        FIPS 180-4, section 6.5

       | SHA-512
       | 512
       | 1024
       |
        FIPS 180-4, section 6.4

> **Warning:**
> SHA-1 is now considered vulnerable and should not be used for cryptographic applications.

> **Note:**
> If you are looking here for how to create a keyed-hash message authentication code (HMAC), you need to use the SubtleCrypto.sign() instead.

## Examples

For more examples of using the `digest()` API, see Non-cryptographic uses of SubtleCrypto.

### Basic <example-value>

This example encodes a message, then calculates its SHA-256 digest and logs the digest
length:

```js
const text =
  "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return hash;
}

digestMessage(text).then((digestBuffer) =>
  console.log(digestBuffer.byteLength),
);
```

### Converting a digest to a hex string

The digest is returned as an `ArrayBuffer`, but for comparison and display digests are often represented as hex strings.
This example calculates a digest, then converts the `ArrayBuffer` to a hex string:

```js
const text =
  "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashHex = new Uint8Array(hashBuffer).toHex(); // Convert ArrayBuffer to hex string.
  return hashHex;
}

digestMessage(text).then((digestHex) => console.log(digestHex));
```

The above example uses `Uint8Array.toHex()`, which became available in 2025.
To support older browsers, the following alternative can be used instead:

```js
const text =
  "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  if (Uint8Array.prototype.toHex) {
    // Use toHex if supported.
    return new Uint8Array(hashBuffer).toHex(); // Convert ArrayBuffer to hex string.
  }
  // If toHex() is not supported, fall back to an alternative implementation.
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

digestMessage(text).then((digestHex) => console.log(digestHex));
```

## See also

- Non-cryptographic uses of SubtleCrypto
- Chromium secure origins specification
- FIPS 180-4 specifies the SHA family of digest algorithms.
- `Uint8Array.toHex()`

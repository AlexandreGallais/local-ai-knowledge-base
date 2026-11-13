---
title: "Crypto (part 7 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 7 of 19)

## Class: `Hmac`

* Extends: {stream.Transform}

The `Hmac` class is a utility for creating cryptographic HMAC digests. It can
be used in one of two ways:

* As a stream that is both readable and writable, where data is written
  to produce a computed HMAC digest on the readable side, or
* Using the `hmac.update()` and `hmac.digest()` methods to produce the
  computed HMAC digest.

The `crypto.createHmac()` method is used to create `Hmac` instances. `Hmac`
objects are not to be created directly using the `new` keyword.

Example: Using `Hmac` objects as streams:

```mjs
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = hmac.read();
  if (data) {
    console.log(data.toString('hex'));
    // Prints:
    //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
  }
});

hmac.write('some data to hash');
hmac.end();
```

```cjs
const {
  createHmac,
} = require('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = hmac.read();
  if (data) {
    console.log(data.toString('hex'));
    // Prints:
    //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
  }
});

hmac.write('some data to hash');
hmac.end();
```

Example: Using `Hmac` and piped streams:

```mjs
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream('test.js');
input.pipe(hmac).pipe(stdout);
```

```cjs
const {
  createReadStream,
} = require('node:fs');
const {
  createHmac,
} = require('node:crypto');
const { stdout } = require('node:process');

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream('test.js');
input.pipe(hmac).pipe(stdout);
```

Example: Using the `hmac.update()` and `hmac.digest()` methods:

```mjs
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.update('some data to hash');
console.log(hmac.digest('hex'));
// Prints:
//   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
```

```cjs
const {
  createHmac,
} = require('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.update('some data to hash');
console.log(hmac.digest('hex'));
// Prints:
//   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
```

### `hmac.digest([encoding])`

* `encoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Calculates the HMAC digest of all of the data passed using `hmac.update()`.
If `encoding` is
provided a string is returned; otherwise a `Buffer` is returned;

The `Hmac` object can not be used again after `hmac.digest()` has been
called. Multiple calls to `hmac.digest()` will result in an error being thrown.

### `hmac.update(data[, inputEncoding])`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `data` string.

Updates the `Hmac` content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `encoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a `Buffer`, `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.

## Class: `KeyObject`

Node.js uses a `KeyObject` class to represent a symmetric or asymmetric key,
and each kind of key exposes different functions. The
`crypto.createSecretKey()`, `crypto.createPublicKey()` and
`crypto.createPrivateKey()` methods are used to create `KeyObject`
instances. `KeyObject` objects are not to be created directly using the `new`
keyword.

Most applications should consider using the new `KeyObject` API instead of
passing keys as strings or `Buffer`s due to improved security features.

`KeyObject` instances can be passed to other threads via `postMessage()`.
The receiver obtains a cloned `KeyObject`, and the `KeyObject` does not need to
be listed in the `transferList` argument.

### Static method: `KeyObject.from(key)`

* `key` {CryptoKey}
* Returns: {KeyObject}

Returns the underlying {KeyObject} of a {CryptoKey}. The returned {KeyObject}
does not retain any of the restrictions imposed by the Web Crypto API on the
original {CryptoKey}, such as the allowed key usages, the algorithm or hash
algorithm bindings, and the extractability flag. In particular, the underlying
key material of the returned {KeyObject} can always be exported.

```mjs
const { KeyObject } = await import('node:crypto');
const { subtle } = globalThis.crypto;

const key = await subtle.generateKey({
  name: 'HMAC',
  hash: 'SHA-256',
  length: 256,
}, true, ['sign', 'verify']);

const keyObject = KeyObject.from(key);
console.log(keyObject.symmetricKeySize);
// Prints: 32 (symmetric key size in bytes)
```

```cjs
const { KeyObject } = require('node:crypto');
const { subtle } = globalThis.crypto;

(async function() {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash: 'SHA-256',
    length: 256,
  }, true, ['sign', 'verify']);

  const keyObject = KeyObject.from(key);
  console.log(keyObject.symmetricKeySize);
  // Prints: 32 (symmetric key size in bytes)
})();
```

### `keyObject.asymmetricKeyDetails`

* Type: {Object}
  * `modulusLength` {number} Key size in bits (RSA, DSA).
  * `publicExponent` {bigint} Public exponent (RSA).
  * `hashAlgorithm` {string} Name of the message digest (RSA-PSS).
  * `mgf1HashAlgorithm` {string} Name of the message digest used by
    MGF1 (RSA-PSS).
  * `saltLength` {number} Minimal salt length in bytes (RSA-PSS).
  * `divisorLength` {number} Size of `q` in bits (DSA).
  * `namedCurve` {string} Name of the curve (EC).

This property exists only on asymmetric keys. Depending on the type of the key,
this object contains information about the key. None of the information obtained
through this property can be used to uniquely identify a key or to compromise
the security of the key.

For RSA-PSS keys, if the key material contains a `RSASSA-PSS-params` sequence,
the `hashAlgorithm`, `mgf1HashAlgorithm`, and `saltLength` properties will be
set.

Other key details might be exposed via this API using additional attributes.

### `keyObject.asymmetricKeyType`

* Type: {string}

For asymmetric keys, this property represents the type of the key. See the
supported asymmetric key types.

This property is `undefined` for unrecognized `KeyObject` types and symmetric
keys.

### `keyObject.equals(otherKeyObject)`

* `otherKeyObject` {KeyObject} A `KeyObject` with which to
  compare `keyObject`.
* Returns: {boolean}

Returns `true` or `false` depending on whether the keys have exactly the same
type, value, and parameters. This method is not
constant time.

### `keyObject.export([options])`

* `options` {Object}
* Returns: {string | Buffer | Object}

For symmetric keys, the following encoding options can be used:

* `format` {string} Must be `'buffer'` (default) or `'jwk'`.

For public keys, the following encoding options can be used:

* `format` {string} Must be `'pem'`, `'der'`, `'jwk'`, or `'raw-public'`.
  See asymmetric key types for format support.
* `type` {string} When `format` is `'pem'` or `'der'`, must be `'pkcs1'`
  (RSA only) or `'spki'`. For EC keys with `'raw-public'` format, may be
  `'uncompressed'` (default) or `'compressed'`. Ignored when `format` is
  `'jwk'`.

For private keys, the following encoding options can be used:

* `format` {string} Must be `'pem'`, `'der'`, `'jwk'`, `'raw-private'`,
  or `'raw-seed'`. See asymmetric key types for format support.
* `type` {string} When `format` is `'pem'` or `'der'`, must be `'pkcs1'`
  (RSA only), `'pkcs8'`, or `'sec1'` (EC only). Ignored when `format` is
  `'jwk'`, `'raw-private'`, or `'raw-seed'`.
* `cipher` {string} If specified, the private key will be encrypted with
  the given `cipher` and `passphrase` using PKCS#5 v2.0 password based
  encryption. Ignored when `format` is `'jwk'`, `'raw-private'`, or
  `'raw-seed'`.
* `passphrase` {string | Buffer} The passphrase to use for encryption.
  Required when `cipher` is specified.

The result type depends on the selected encoding format, when PEM the
result is a string, when DER it will be a buffer containing the data
encoded as DER, when JWK it will be an object. Raw formats return a
{Buffer} containing the raw key material.

Private keys can be encrypted by specifying a `cipher` and `passphrase`.
The PKCS#8 `type` supports encryption with both PEM and DER `format` for any
key algorithm. PKCS#1 and SEC1 can only be encrypted when the PEM `format` is
used. For maximum compatibility, use PKCS#8 for encrypted private keys. Since
PKCS#8 defines its own encryption mechanism, PEM-level encryption is not
supported when encrypting a PKCS#8 key. See RFC 5208 for PKCS#8 encryption
and RFC 1421 for PKCS#1 and SEC1 encryption.

### `keyObject.symmetricKeySize`

* Type: {number}

For secret keys, this property represents the size of the key in bytes. This
property is `undefined` for asymmetric keys.

### `keyObject.toCryptoKey(algorithm, extractable, keyUsages)`

* `algorithm` {string|Algorithm|RsaHashedImportParams|EcKeyImportParams|HmacImportParams}

* `extractable` {boolean}
* `keyUsages` {string\[]} See Key usages.
* Returns: {CryptoKey}

Converts a `KeyObject` instance to a `CryptoKey`.

### `keyObject.type`

* Type: {string}

Depending on the type of this `KeyObject`, this property is either
`'secret'` for secret (symmetric) keys, `'public'` for public (asymmetric) keys
or `'private'` for private (asymmetric) keys.

## Class: `Mac`

* Extends: {stream.Transform}

The `Mac` class computes message authentication codes using MAC
implementations supplied by OpenSSL providers. It can be used in one of two
ways:

* As a stream that is both readable and writable, where data is written and
  one authentication tag is produced on the readable side when the writable
  side ends; or
* By calling `mac.update()` one or more times followed by `mac.final()`.

Instances of `Mac` are created using `crypto.createMac()`. The `Mac` class
is not exported directly by the `node:crypto` module.

Calling `mac.end()` without first writing data computes the authentication tag
for an empty message. If the selected MAC produces a zero-byte tag, such as
when a provider accepts `outputLength: 0`, the readable side ends without
emitting a data chunk because Node.js streams do not emit zero-length chunks.
When using `mac.final()` instead, it returns a zero-length `Buffer` or an
empty encoded string.

`mac.end()` and `mac.final()` are alternative terminal operations and must not
both be called on the same object. A `Mac` object cannot be used again after
either operation attempts finalization or after an underlying MAC update fails.

Example: Using `mac.update()` and `mac.final()`:

```mjs
const { createMac, randomBytes } = await import('node:crypto');

const key = randomBytes(16);
const mac = createMac('CMAC', key, {
  cipher: 'AES-128-CBC',
});

mac.update('some data to authenticate');
console.log(mac.final('hex'));
```

### `mac.final([outputEncoding])`

* `outputEncoding` {string} The encoding of the return value.
* Returns: {Buffer | string}

Completes the MAC computation and returns the authentication tag. If
`outputEncoding` is omitted or is `'buffer'`, a `Buffer` is returned.
Otherwise, a string is returned.

To verify an authentication tag, compare equal-length `Buffer` values using
`crypto.timingSafeEqual()`.

The `Mac` object cannot be used again after finalization is attempted,
including when finalization fails. Later calls to `mac.update()` or
`mac.final()` throw `ERR_CRYPTO_MAC_FINALIZED`.

### `mac.update(data[, inputEncoding])`

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} The encoding of the `data` string.
* Returns: {Mac}

Updates the MAC with `data` and returns the `Mac` object so that calls can be
chained. When `data` is a string, `inputEncoding` defaults to `'utf8'`. When
`data` is a `Buffer`, `TypedArray`, or `DataView`, `inputEncoding` is
ignored.

This method can be called multiple times before finalization. If an underlying
MAC update fails, the `Mac` object cannot be used again. Calling this method
after a previous underlying MAC update failure or after finalization throws
`ERR_CRYPTO_MAC_FINALIZED`.

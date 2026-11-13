---
title: "Crypto (part 14 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 14 of 19)

### `crypto.hash(algorithm, data[, options])`

* `algorithm` {string|undefined}
* `data` {string|Buffer|TypedArray|DataView} When `data` is a
  string, it will be encoded as UTF-8 before being hashed. If a different
  input encoding is desired for a string input, user could encode the string
  into a `TypedArray` using either `TextEncoder` or `Buffer.from()` and passing
  the encoded `TypedArray` into this API instead.
* `options` {Object|string}
  * `customization` {string|ArrayBuffer|Buffer|TypedArray|DataView} For cSHAKE
    hash functions, specifies the customization byte string. **Default:** an
    empty byte string.
  * `functionName` {string|ArrayBuffer|Buffer|TypedArray|DataView} For cSHAKE
    hash functions, specifies the NIST function-name byte string. **Default:**
    an empty byte string.
  * `outputEncoding` {string} Encoding used to encode the
    returned digest. **Default:** `'hex'`.
  * `outputLength` {number} For XOF hash functions such as 'shake256',
    the outputLength option can be used to specify the desired output length in bytes.
* Returns: {string|Buffer}

A utility for creating one-shot hash digests of data. It can be faster than
the object-based `crypto.createHash()` when hashing a smaller amount of data
(<= 5MB) that's readily available. If the data can be big or if it is streamed,
it's still recommended to use `crypto.createHash()` instead.

The available algorithms depend on the version and configuration of OpenSSL on
the platform. Examples are `'sha256'` and `'sha512'`. Use
`crypto.getHashes()` to obtain the list of hash algorithms available to the
Node.js process.

The `functionName` and `customization` options apply only to cSHAKE-128 and
cSHAKE-256. They are supported only when Node.js is built with OpenSSL 4.0 or
later and the selected provider supports the corresponding digest parameters.
Strings are encoded as UTF-8, and neither strings nor byte values may contain
NUL bytes. Both options default to an empty byte string. For OpenSSL's built-in
providers, `functionName` is case-sensitive and must be `''`, `'TupleHash'`,
`'ParallelHash'`, or `'KMAC'`. Other providers can impose different
restrictions. With both options empty, cSHAKE produces the same output as the
corresponding SHAKE function for the same output length. `cshake-128` and
`cshake-256` default to output lengths of 32 and 64 bytes, respectively.

If `options` is a string, then it specifies the `outputEncoding`.

Example:

```cjs
const crypto = require('node:crypto');
const { Buffer } = require('node:buffer');

// Hashing a string and return the result as a hex-encoded string.
const string = 'Node.js';
// 10b3493287f831e81a438811a1ffba01f8cec4b7
console.log(crypto.hash('sha1', string));

// Encode a base64-encoded string into a Buffer, hash it and return
// the result as a buffer.
const base64 = 'Tm9kZS5qcw==';
// <Buffer 10 b3 49 32 87 f8 31 e8 1a 43 88 11 a1 ff ba 01 f8 ce c4 b7>
console.log(crypto.hash('sha1', Buffer.from(base64, 'base64'), 'buffer'));
```

```mjs
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

// Hashing a string and return the result as a hex-encoded string.
const string = 'Node.js';
// 10b3493287f831e81a438811a1ffba01f8cec4b7
console.log(crypto.hash('sha1', string));

// Encode a base64-encoded string into a Buffer, hash it and return
// the result as a buffer.
const base64 = 'Tm9kZS5qcw==';
// <Buffer 10 b3 49 32 87 f8 31 e8 1a 43 88 11 a1 ff ba 01 f8 ce c4 b7>
console.log(crypto.hash('sha1', Buffer.from(base64, 'base64'), 'buffer'));
```

### `crypto.hkdf(digest, ikm, salt, info, keylen, callback)`

* `digest` {string} The digest algorithm to use.
* `ikm` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} The input
  keying material. Must be provided but can be zero-length.
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView} The salt value. Must
  be provided but can be zero-length.
* `info` {string|ArrayBuffer|Buffer|TypedArray|DataView} Additional info value.
  Must be provided but can be zero-length, and cannot be more than 1024 bytes.
* `keylen` {number} The length of the key to generate. Must be greater than 0.
  The maximum allowable value is `255` times the number of bytes produced by
  the selected digest function (e.g. `sha512` generates 64-byte hashes, making
  the maximum HKDF output 16320 bytes).
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {ArrayBuffer}

HKDF is a simple key derivation function defined in RFC 5869. The given `ikm`,
`salt` and `info` are used with the `digest` to derive a key of `keylen` bytes.
The available digest algorithms depend on the version and configuration of
OpenSSL. HKDF uses HMAC internally. `crypto.getHashes()` lists algorithms
available to the hashing APIs, but not every listed algorithm is necessarily
suitable for HMAC or HKDF.

The supplied `callback` function is called with two arguments: `err` and
`derivedKey`. If an error occurs while deriving the key, `err` will be set;
otherwise `err` will be `null`. The successfully generated `derivedKey` will
be passed to the callback as an {ArrayBuffer}. An error will be thrown if any
of the input arguments specify invalid values or types.

```mjs
import { Buffer } from 'node:buffer';
const {
  hkdf,
} = await import('node:crypto');

hkdf('sha512', 'key', 'salt', 'info', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
});
```

```cjs
const {
  hkdf,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

hkdf('sha512', 'key', 'salt', 'info', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
});
```

### `crypto.hkdfSync(digest, ikm, salt, info, keylen)`

* `digest` {string} The digest algorithm to use.
* `ikm` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} The input
  keying material. Must be provided but can be zero-length.
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView} The salt value. Must
  be provided but can be zero-length.
* `info` {string|ArrayBuffer|Buffer|TypedArray|DataView} Additional info value.
  Must be provided but can be zero-length, and cannot be more than 1024 bytes.
* `keylen` {number} The length of the key to generate. Must be greater than 0.
  The maximum allowable value is `255` times the number of bytes produced by
  the selected digest function (e.g. `sha512` generates 64-byte hashes, making
  the maximum HKDF output 16320 bytes).
* Returns: {ArrayBuffer}

Provides a synchronous HKDF key derivation function as defined in RFC 5869. The
given `ikm`, `salt` and `info` are used with the `digest` to derive a key of
`keylen` bytes.
The available digest algorithms depend on the version and configuration of
OpenSSL. HKDF uses HMAC internally. `crypto.getHashes()` lists algorithms
available to the hashing APIs, but not every listed algorithm is necessarily
suitable for HMAC or HKDF.

The successfully generated `derivedKey` will be returned as an {ArrayBuffer}.

An error will be thrown if any of the input arguments specify invalid values or
types, or if the derived key cannot be generated.

```mjs
import { Buffer } from 'node:buffer';
const {
  hkdfSync,
} = await import('node:crypto');

const derivedKey = hkdfSync('sha512', 'key', 'salt', 'info', 64);
console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
```

```cjs
const {
  hkdfSync,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const derivedKey = hkdfSync('sha512', 'key', 'salt', 'info', 64);
console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
```

### `crypto.parsePKCS12(bundle[, options])`

* `bundle` {ArrayBuffer|Buffer|TypedArray|DataView} A DER-encoded PKCS#12
  (`.p12` or `.pfx`) bundle.
* `options` {Object}
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} The passphrase
    protecting the bundle. Omitting this option is equivalent to passing `''`.
* Returns: {Object}
  * `privateKey` {KeyObject|null} The first private key in the bundle, or
    `null` if none is present.
  * `certificate` {X509Certificate|null} The certificate matching `privateKey`,
    or `null` if no matching certificate is present.
  * `additionalCertificates` {X509Certificate\[]} All other certificates in
    the bundle. If there is no private key, this contains all certificates.
    May be empty.

Parses a PKCS#12 bundle, commonly stored with a `.p12` or `.pfx` extension,
and returns its private key and certificates.

```mjs
import { parsePKCS12 } from 'node:crypto';
import { readFileSync } from 'node:fs';

const { privateKey, certificate, additionalCertificates } = parsePKCS12(
  readFileSync('bundle.p12'),
  { passphrase: 'secret' },
);
```

### `crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)`

* `password` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `iterations` {number}
* `keylen` {number}
* `digest` {string}
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {Buffer}

Provides an asynchronous Password-Based Key Derivation Function 2 (PBKDF2)
implementation. A selected HMAC digest algorithm specified by `digest` is
applied to derive a key of the requested byte length (`keylen`) from the
`password`, `salt` and `iterations`.

The supplied `callback` function is called with two arguments: `err` and
`derivedKey`. If an error occurs while deriving the key, `err` will be set;
otherwise `err` will be `null`. By default, the successfully generated
`derivedKey` will be passed to the callback as a `Buffer`. An error will be
thrown if any of the input arguments specify invalid values or types.

The `iterations` argument must be a number set as high as possible. The
higher the number of iterations, the more secure the derived key will be,
but will take a longer amount of time to complete.

The `salt` should be as unique as possible. It is recommended that a salt is
random and at least 16 bytes long. See NIST SP 800-132 for details.

When passing strings for `password` or `salt`, please consider
caveats when using strings as inputs to cryptographic APIs.

```mjs
const {
  pbkdf2,
} = await import('node:crypto');

pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
```

```cjs
const {
  pbkdf2,
} = require('node:crypto');

pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
```

The available digest algorithms depend on the version and configuration of
OpenSSL. PBKDF2 uses HMAC internally. `crypto.getHashes()` lists algorithms
available to the hashing APIs, but not every listed algorithm is necessarily
suitable for HMAC or PBKDF2.

This API uses libuv's threadpool, which can have surprising and
negative performance implications for some applications; see the
`UV_THREADPOOL_SIZE` documentation for more information.

### `crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)`

* `password` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `iterations` {number}
* `keylen` {number}
* `digest` {string}
* Returns: {Buffer}

Provides a synchronous Password-Based Key Derivation Function 2 (PBKDF2)
implementation. A selected HMAC digest algorithm specified by `digest` is
applied to derive a key of the requested byte length (`keylen`) from the
`password`, `salt` and `iterations`.

If an error occurs an `Error` will be thrown, otherwise the derived key will be
returned as a `Buffer`.

The `iterations` argument must be a number set as high as possible. The
higher the number of iterations, the more secure the derived key will be,
but will take a longer amount of time to complete.

The `salt` should be as unique as possible. It is recommended that a salt is
random and at least 16 bytes long. See NIST SP 800-132 for details.

When passing strings for `password` or `salt`, please consider
caveats when using strings as inputs to cryptographic APIs.

```mjs
const {
  pbkdf2Sync,
} = await import('node:crypto');

const key = pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');
console.log(key.toString('hex'));  // '3745e48...08d59ae'
```

```cjs
const {
  pbkdf2Sync,
} = require('node:crypto');

const key = pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');
console.log(key.toString('hex'));  // '3745e48...08d59ae'
```

The available digest algorithms depend on the version and configuration of
OpenSSL. PBKDF2 uses HMAC internally. `crypto.getHashes()` lists algorithms
available to the hashing APIs, but not every listed algorithm is necessarily
suitable for HMAC or PBKDF2.

### `crypto.privateDecrypt(privateKey, buffer)`

* `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey|URL}
  * `oaepHash` {string} The hash function to use for OAEP padding and, unless
    `mgf1Hash` is set, MGF1. **Default:** `'sha1'`
  * `mgf1Hash` {string} The hash function to use for the MGF1 mask generation
    function of OAEP padding. If not specified, the value of `oaepHash` is used.
    This allows the OAEP digest and the MGF1 digest to differ.
  * `oaepLabel` {string|ArrayBuffer|Buffer|TypedArray|DataView} The label to
    use for OAEP padding. If not specified, no label is used.
  * `padding` {crypto.constants} An optional padding value defined in
    `crypto.constants`, which may be: `crypto.constants.RSA_NO_PADDING`,
    `crypto.constants.RSA_PKCS1_PADDING`, or
    `crypto.constants.RSA_PKCS1_OAEP_PADDING`.
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* Returns: {Buffer} A new `Buffer` with the decrypted content.

Decrypts `buffer` with `privateKey`. `buffer` was previously encrypted using
the corresponding public key, for example using `crypto.publicEncrypt()`.

`crypto.getHashes()` lists algorithms available to the hashing APIs, but
the active RSA implementation can impose additional restrictions on digests
used for OAEP or MGF1.

If `privateKey` is not a `KeyObject`, this function behaves as if
`privateKey` had been passed to `crypto.createPrivateKey()`. If it is an
object, the `padding` property can be passed. Otherwise, this function uses
`RSA_PKCS1_OAEP_PADDING`.

Using `crypto.constants.RSA_PKCS1_PADDING` in `crypto.privateDecrypt()`
requires OpenSSL to support implicit rejection (`rsa_pkcs1_implicit_rejection`).
If the version of OpenSSL used by Node.js does not support this feature,
attempting to use `RSA_PKCS1_PADDING` will fail.

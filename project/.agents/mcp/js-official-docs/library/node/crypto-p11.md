---
title: "Crypto (part 11 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 11 of 19)

### `crypto.createDiffieHellman(prime, primeEncoding[, generatorEncoding])`

* `prime` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `primeEncoding` {string} The encoding of the `prime` string.
* `generator` {number|string|ArrayBuffer|Buffer|TypedArray|DataView}
  **Default:** `2`
* `generatorEncoding` {string} The encoding of the `generator` string.
* Returns: {DiffieHellman}

Creates a `DiffieHellman` key <example-value> object using the supplied `prime` and an
optional specific `generator`.

The `generator` argument can be a number, string, or `Buffer`. If
`generator` is not specified, the value `2` is used.

If `primeEncoding` is specified, `prime` is expected to be a string; otherwise
a `Buffer`, `TypedArray`, or `DataView` is expected.

If `generatorEncoding` is specified, `generator` is expected to be a string;
otherwise a number, `Buffer`, `TypedArray`, or `DataView` is expected.

### `crypto.createDiffieHellman(primeLength[, generator])`

* `primeLength` {number}
* `generator` {number} **Default:** `2`
* Returns: {DiffieHellman}

Creates a `DiffieHellman` key <example-value> object and generates a prime of
`primeLength` bits using an optional specific numeric `generator`.
If `generator` is not specified, the value `2` is used.

### `crypto.createDiffieHellmanGroup(name)`

* `name` {string}
* Returns: {DiffieHellmanGroup}

An alias for `crypto.getDiffieHellman()`

### `crypto.createECDH(curveName)`

* `curveName` {string}
* Returns: {ECDH}

Creates an Elliptic Curve Diffie-Hellman (`ECDH`) key <example-value> object using a
predefined curve specified by the `curveName` string. Use
`crypto.getCurves()` to obtain a list of available curve names. On recent
OpenSSL releases, `openssl ecparam -list_curves` will also display the name
and description of each available elliptic curve.

### `crypto.createHash(algorithm[, options])`

* `algorithm` {string}
* `options` {Object} `stream.transform` options
  * `customization` {string|ArrayBuffer|Buffer|TypedArray|DataView} For cSHAKE
    hash functions, specifies the customization byte string. **Default:** an
    empty byte string.
  * `functionName` {string|ArrayBuffer|Buffer|TypedArray|DataView} For cSHAKE
    hash functions, specifies the NIST function-name byte string. **Default:**
    an empty byte string.
  * `outputLength` {number} For XOF hash functions, specifies the desired
    output length in bytes.
* Returns: {Hash}

Creates and returns a `Hash` object that can be used to generate hash digests
using the given `algorithm`. Optional `options` argument controls stream
behavior. For XOF hash functions such as `'shake256'`, the `outputLength` option
can be used to specify the desired output length in bytes.

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

When the data is small (< 5MB) and readily available, `crypto.hash()` is usually faster.

The available algorithms depend on the version and configuration of OpenSSL on
the platform. Examples are `'sha256'` and `'sha512'`. Use
`crypto.getHashes()` to obtain the list of hash algorithms available to the
Node.js process.

Example: generating the sha256 sum of a file

```mjs
import {
  createReadStream,
} from 'node:fs';
import { argv } from 'node:process';
const {
  createHash,
} = await import('node:crypto');

const filename = argv[2];

const hash = createHash('sha256');

const input = createReadStream(filename);
input.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = input.read();
  if (data)
    hash.update(data);
  else {
    console.log(`${hash.digest('hex')} ${filename}`);
  }
});
```

```cjs
const {
  createReadStream,
} = require('node:fs');
const {
  createHash,
} = require('node:crypto');
const { argv } = require('node:process');

const filename = argv[2];

const hash = createHash('sha256');

const input = createReadStream(filename);
input.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = input.read();
  if (data)
    hash.update(data);
  else {
    console.log(`${hash.digest('hex')} ${filename}`);
  }
});
```

### `crypto.createHmac(algorithm, key[, options])`

* `algorithm` {string}
* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `options` {Object} `stream.transform` options
  * `encoding` {string} The string encoding to use when `key` is a string.
* Returns: {Hmac}

Creates and returns an `Hmac` object that uses the given `algorithm` and `key`.
Optional `options` argument controls stream behavior.

The available algorithms depend on the version and configuration of OpenSSL on
the platform. Examples are `'sha256'` and `'sha512'`.
`crypto.getHashes()` lists algorithms available to the hashing APIs, but
HMAC imposes additional restrictions, so not every listed algorithm is
suitable.

The `key` is the HMAC key used to generate the cryptographic HMAC hash. If it is
a `KeyObject`, its type must be `secret`. If it is a string, please consider
caveats when using strings as inputs to cryptographic APIs. If it was
obtained from a cryptographically secure source of entropy, such as
`crypto.randomBytes()` or `crypto.generateKey()`, its length should not
exceed the block size of `algorithm` (e.g., 512 bits for SHA-256).

Example: generating the sha256 HMAC of a file

```mjs
import {
  createReadStream,
} from 'node:fs';
import { argv } from 'node:process';
const {
  createHmac,
} = await import('node:crypto');

const filename = argv[2];

const hmac = createHmac('<example-value>', '<example-value>');

const input = createReadStream(filename);
input.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = input.read();
  if (data)
    hmac.update(data);
  else {
    console.log(`${hmac.digest('hex')} ${filename}`);
  }
});
```

```cjs
const {
  createReadStream,
} = require('node:fs');
const {
  createHmac,
} = require('node:crypto');
const { argv } = require('node:process');

const filename = argv[2];

const hmac = createHmac('<example-value>', '<example-value>');

const input = createReadStream(filename);
input.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = input.read();
  if (data)
    hmac.update(data);
  else {
    console.log(`${hmac.digest('hex')} ${filename}`);
  }
});
```

### `crypto.createMac(algorithm, key[, options])`

> Stability: 1.2 - Release candidate

* `algorithm` {string} The name of the MAC algorithm.
* `key` {ArrayBuffer|Buffer|TypedArray|DataView|KeyObject}
* `options` {Object} `stream.transform` options
  * `digest` {string} The digest used by a MAC such as HMAC.
  * `cipher` {string} The cipher used by a MAC such as CMAC or GMAC.
  * `iv` {ArrayBuffer|Buffer|TypedArray|DataView} The initialization vector for
    a MAC such as GMAC.
  * `customization` {ArrayBuffer|Buffer|TypedArray|DataView} A customization
    byte string for MACs that support it, such as KMAC.
  * `salt` {ArrayBuffer|Buffer|TypedArray|DataView} A salt byte string for MACs
    that support it, such as BLAKE2 MACs.
  * `outputLength` {number} The requested provider output size in bytes. Must be
    an unsigned 32-bit integer. Provider-specific restrictions also apply.
* Returns: {Mac}

`algorithm` must be a non-empty provider MAC name. The MAC-specific properties
listed above are extensions to the standard `stream.transform` options and
are passed only when the selected provider implementation advertises the
corresponding parameter with the expected type. A supplied MAC-specific option
that the selected implementation does not support causes an error.

The following table summarizes the MAC-specific options accepted by MAC
implementations in OpenSSL's built-in providers. The `key` argument is required
for every MAC. The table lists only MAC-specific options; standard
`stream.transform` options remain available for every family.

| MAC family | Required options                        | Optional options                        | Notes                                                                  |
| ---------- | --------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| HMAC       | `digest`                                | None                                    |                                                                        |
| CMAC       | `cipher` using CBC mode                 | None                                    |                                                                        |
| GMAC       | `cipher` using GCM mode, non-empty `iv` | None                                    | Requires a unique IV for every message authenticated with a given key. |
| KMAC       | None                                    | `customization`, `outputLength`         |                                                                        |
| BLAKE2 MAC | None                                    | `customization`, `salt`, `outputLength` |                                                                        |
| Poly1305   | None                                    | None                                    | Each key must be used for only one message.                            |
| SipHash    | None                                    | `outputLength`                          |                                                                        |

`outputLength` configures the output size of the provider MAC. It is never
implemented by computing a longer tag and truncating it. A value of `0` is
passed to the provider and is accepted only when that provider can initialize
and finalize the MAC with a zero-byte output. When `outputLength` is omitted,
the provider's default output size is used and must be nonzero.

The `key` must contain bytes or be a `KeyObject` of type `secret`. Key
length and other key <example-value> are determined by the selected provider
implementation.

Available algorithms and their accepted parameters depend on the OpenSSL
version, loaded providers, and active default property query. Use
`crypto.getMacs()` to list fetchable MAC names. A listed name can still
require options or a key with provider-specific properties.

### `crypto.createPrivateKey(key)`

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|URL}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|Object|URL} The key
    material, either in PEM, DER, JWK, or raw format, or a {URL} referencing an
    object for an OpenSSL STORE loader.
  * `format` {string} Must be `'pem'`, `'der'`, `'jwk'`, `'raw-private'`,
    or `'raw-seed'`. **Default:** `'pem'`.
  * `type` {string} Must be `'pkcs1'`, `'pkcs8'` or `'sec1'`. This option is
    required only if the `format` is `'der'` and ignored otherwise.
  * `passphrase` {string | Buffer} The passphrase to use for decryption. When
    `key` is a {URL}, this is the optional PIN/passphrase forwarded to the
    STORE loader.
  * `properties` {string} The optional OpenSSL property query used when
    fetching the STORE loader for a {URL} key.
  * `encoding` {string} The string encoding to use when `key` is a string.
  * `asymmetricKeyType` {string} Required when `format` is `'raw-private'`
    or `'raw-seed'` and ignored otherwise.
    Must be a supported key type.
  * `namedCurve` {string} Name of the curve to use. Required when
    `asymmetricKeyType` is `'ec'` and ignored otherwise.
* Returns: {KeyObject}

Creates and returns a new key <example-value> containing a private key. If `key` is a
string or `Buffer`, `format` is assumed to be `'pem'`; otherwise, `key`
must be an object with the properties described above.

If the private key is encrypted, a `passphrase` must be specified. The length
of the passphrase is limited to 1024 bytes.

#### Private keys from OpenSSL STORE loaders

> Stability: 1.1 - Active development

If `key` is a {URL} (or an object whose `key` is a {URL}), the private key is
loaded through an OpenSSL STORE loader. The URL is passed to OpenSSL as a URI,
for example a `file:` URI or a provider-backed scheme such as `pkcs11:`. When
the Permission Model is enabled, `--allow-openssl-store` is required.

> **Warning**: A URI scheme does not pin an OpenSSL STORE loader or prove where
> the returned key came from. Node.js forwards the URI to OpenSSL, which chooses
> loaders according to its version and configuration. For example, OpenSSL may
> offer an opaque URI such as `pkcs11:object=...` (one without `//` after the
> scheme) to its `file` loader before trying the `pkcs11` loader. If the complete
> URI is a valid local path and that file exists, it may be loaded instead.
> Node.js does not verify which loader supplied the key. Do not rely on a
> provider-specific URI scheme as proof that a key came from that provider or
> from a hardware device.

Configured OpenSSL STORE loaders have broad authority and may access files,
devices, tokens, or the network. Access performed by a loader is not constrained
by the `fs.read`, `fs.write`, or `net` permission scopes.

When a {URL} is used, `format`, `type`, `asymmetricKeyType`, and `namedCurve`
are ignored even when those options would otherwise depend on each other, such
as `type` with `format: 'der'` or `namedCurve` with
`asymmetricKeyType: 'ec'`. The input is passed to the STORE loader as a URI,
not handled as PEM, DER, JWK, or raw key material. `passphrase` is still used as
the optional PIN/passphrase passed to the loader, and `encoding` applies if that
`passphrase` is a string.

Use `passphrase` instead of embedding credentials in the URI passed to the
STORE loader. Node.js redacts the URI from its own permission-denial resource
and diagnostics. Errors reported by OpenSSL or a provider after loading begins
may include the URI.

When `properties` is specified with a {URL} key, it is passed to OpenSSL as the
property query for selecting the STORE loader. It is not appended to the URL and
is distinct from provider-specific URI parameters.

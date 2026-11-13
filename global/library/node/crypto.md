---
title: "Crypto (part 1 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto

> Stability: 2 - Stable

The `node:crypto` module provides cryptographic functionality that includes a
set of wrappers for OpenSSL's hash, message authentication code (MAC), cipher,
decipher, sign, verify, and key <example-value> mechanism (KEM) functions.

```mjs
const { createHmac } = await import('node:crypto');

const secret = '<example-value>';
const hash = createHmac('<example-value>', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```

```cjs
const { createHmac } = require('node:crypto');

const secret = '<example-value>';
const hash = createHmac('<example-value>', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```

## Determining if crypto support is unavailable

It is possible for Node.js to be built without including support for the
`node:crypto` module. In such cases, attempting to `import` from `crypto` or
calling `require('node:crypto')` will result in an error being thrown.

When using CommonJS, the error thrown can be caught using try/catch:

```cjs
let crypto;
try {
  crypto = require('node:crypto');
} catch (err) {
  console.error('crypto support is disabled!');
}
```

When using the lexical ESM `import` keyword, the error can only be
caught if a handler for `process.on('uncaughtException')` is registered
_before_ any attempt to load the module is made (using, for instance,
a preload module).

When using ESM, if there is a chance that the code may be run on a build
of Node.js where crypto support is not enabled, consider using the
`import()` function instead of the lexical `import` keyword:

```mjs
let crypto;
try {
  crypto = await import('node:crypto');
} catch (err) {
  console.error('crypto support is disabled!');
}
```

## Asymmetric key types

The following lists group the asymmetric key types recognized by the
`KeyObject` API by the complete set of formats supported for importing and
exporting each type.

**Formats:** `'pem'`, `'der'`

* **`'dh'` (Diffie-Hellman)** — OID `1.2.840.113549.1.3.1`
* **`'dsa'`** — OID `1.2.840.10040.4.1`
* **`'rsa-pss'`** — OID `1.2.840.113549.1.1.10`

**Formats:** `'pem'`, `'der'`, `'jwk'`

* **`'rsa'`** — OID `1.2.840.113549.1.1.1`

**Formats:** `'pem'`, `'der'`, `'jwk'`, `'raw-public'`, `'raw-private'`

* **`'ec'` (Elliptic curve)** — OID `1.2.840.10045.2.1`
* **`'ed25519'`** — OID `1.3.101.112`
* **`'ed448'`** — OID `1.3.101.113`
* **`'slh-dsa-sha2-128f'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.21`
* **`'slh-dsa-sha2-128s'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.20`
* **`'slh-dsa-sha2-192f'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.23`
* **`'slh-dsa-sha2-192s'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.22`
* **`'slh-dsa-sha2-256f'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.25`
* **`'slh-dsa-sha2-256s'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.24`
* **`'slh-dsa-shake-128f'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.27`
* **`'slh-dsa-shake-128s'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.26`
* **`'slh-dsa-shake-192f'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.29`
* **`'slh-dsa-shake-192s'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.28`
* **`'slh-dsa-shake-256f'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.31`
* **`'slh-dsa-shake-256s'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.30`
* **`'x25519'`** — OID `1.3.101.110`
* **`'x448'`** — OID `1.3.101.111`

**Formats:** `'pem'`, `'der'`, `'jwk'`, `'raw-public'`, `'raw-seed'`

* **`'ml-dsa-44'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.17`
* **`'ml-dsa-65'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.18`
* **`'ml-dsa-87'`[^openssl35]** — OID `2.16.840.1.101.3.4.3.19`
* **`'ml-kem-512'`[^openssl35]** — OID `2.16.840.1.101.3.4.4.1`
* **`'ml-kem-768'`[^openssl35]** — OID `2.16.840.1.101.3.4.4.2`
* **`'ml-kem-1024'`[^openssl35]** — OID `2.16.840.1.101.3.4.4.3`

### Key <example-value>

Asymmetric keys can be represented in several formats. **The recommended
approach is to import key <example-value> into a `KeyObject` once and reuse it**
for all subsequent operations, as this avoids repeated parsing and delivers
the best performance.

When a `KeyObject` is not practical - for example, when key <example-value>
arrives in a protocol message and is used only once - most cryptographic
functions also accept a PEM string or an object specifying the format
and key <example-value> directly. See `crypto.createPublicKey()`,
`crypto.createPrivateKey()`, and `keyObject.export()` for the full
options accepted by each format.

#### KeyObject

A `KeyObject` is the in-memory representation of a parsed key. It is
created by `crypto.createPublicKey()`, `crypto.createPrivateKey()`,
`crypto.createSecretKey()`, or key <example-value> functions such as
`crypto.generateKeyPair()`. The first cryptographic operation with a given
`KeyObject` may be slower than subsequent ones because OpenSSL lazily
initializes internal caches on first use.

#### PEM and DER

PEM and DER are the traditional encoding formats for asymmetric keys based on
ASN.1 structures.

* **PEM** is a text encoding that wraps Base64-encoded DER data between
  header and footer lines (e.g. `-----BEGIN PUBLIC KEY-----`). PEM strings can
  be passed directly to most cryptographic operations.
* **DER** is the binary encoding of the same ASN.1 structures. When providing
  DER input, the `type` (typically `'spki'` or `'pkcs8'`) must be specified
  explicitly.

#### JSON Web Key (JWK)

JSON Web Key (JWK) is a JSON-based key <example-value> defined in
RFC 7517. JWK encodes each key <example-value> as an individual Base64url-encoded
value inside a JSON object. For RSA keys, JWK avoids ASN.1 parsing overhead
and is the fastest serialized import format.

#### Raw key <example-value>

> Stability: 1.1 - Active development

The `'raw-public'`, `'raw-private'`, and `'raw-seed'` key <example-value> allow
importing and exporting raw key <example-value> without any encoding wrapper.
See `keyObject.export()`, `crypto.createPublicKey()`, and
`crypto.createPrivateKey()` for usage details.

`'raw-public'` is generally the fastest way to import a public key.
`'raw-private'` and `'raw-seed'` are not always faster than other formats
because they only contain the private scalar or seed - importing them requires
deriving the public key <example-value> (e.g. elliptic curve point multiplication or
seed expansion), which can be expensive. Other formats include both private
and public components, avoiding that computation.

### Choosing a key <example-value>

**Always prefer a `KeyObject`** - create one from whatever format you
have and reuse it. The guidance below applies only when choosing between
serialization formats, either for importing into a `KeyObject` or for
passing key <example-value> inline when a `KeyObject` is not practical.

#### Importing keys

When creating a `KeyObject` for repeated use, the import cost is paid once,
so choosing a faster format reduces startup latency.

The import cost breaks down into two parts: **parsing overhead** (decoding the
serialization wrapper) and **key <example-value>** (any mathematical work needed to
reconstruct the full key, such as deriving a public key from a private scalar
or expanding a seed). Which part dominates depends on the key type. For
example:

* Public keys - `'raw-public'` is the fastest serialized format because the
  raw format skips all ASN.1 and Base64 decoding.
* EC private keys - `'raw-private'` is faster than PEM or DER because it
  avoids ASN.1 parsing. However, for larger curves (e.g. P-384, P-521) the
  required derivation of the public point from the private scalar becomes
  expensive, reducing the advantage.
* RSA keys - `'jwk'` is the fastest serialized format. JWK represents RSA
  key <example-value> as individual Base64url-encoded integers, avoiding the
  overhead of ASN.1 parsing entirely.

#### Inline key <example-value> in operations

When a `KeyObject` cannot be reused (e.g. the key <example-value> as raw bytes in
a protocol message and is used only once), most cryptographic functions also
accept a PEM string or an object specifying the format and key
material directly. In this case the total cost is the sum of key <example-value> and
the cryptographic computation itself.

For operations where the cryptographic computation dominates - such as
signing with RSA or ECDH key <example-value> with P-384 or P-521 - the
serialization format has negligible impact on overall throughput, so choose
whichever format is most convenient. For lightweight operations like Ed25519
signing or verification, the import cost is a larger fraction of the total,
so a faster format like `'raw-public'` or `'raw-private'` can meaningfully
improve throughput.

Even if the same key <example-value> is used only a few times, it is worth importing it
into a `KeyObject` rather than passing the raw or PEM representation
repeatedly.

### Examples

Example: Reusing a `KeyObject` across sign and verify operations:

```mjs
import { promisify } from 'node:util';
const { generateKeyPair, sign, verify } = await import('node:crypto');

const { publicKey, privateKey } = await promisify(generateKeyPair)('ed25519');

// A KeyObject holds the parsed key in memory and can be reused
// across multiple operations without re-parsing.
const data = new TextEncoder().encode('message to sign');
const signature = sign(null, data, privateKey);
verify(null, data, publicKey, signature);
```

Example: Importing keys of various formats into `KeyObject`s:

```mjs
import { promisify } from 'node:util';
const {
  createPrivateKey, createPublicKey, generateKeyPair,
} = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ed25519');

// PEM
const privatePem = generated.privateKey.export({ format: 'pem', type: 'pkcs8' });
const publicPem = generated.publicKey.export({ format: 'pem', type: 'spki' });
createPrivateKey(privatePem);
createPublicKey(publicPem);

// DER - requires explicit type
const privateDer = generated.privateKey.export({ format: 'der', type: 'pkcs8' });
const publicDer = generated.publicKey.export({ format: 'der', type: 'spki' });
createPrivateKey({ key: <example-value>, format: 'der', type: 'pkcs8' });
createPublicKey({ key: <example-value>, format: 'der', type: 'spki' });

// JWK
const privateJwk = generated.privateKey.export({ format: 'jwk' });
const publicJwk = generated.publicKey.export({ format: 'jwk' });
createPrivateKey({ key: <example-value>, format: 'jwk' });
createPublicKey({ key: <example-value>, format: 'jwk' });

// Raw
const rawPriv = generated.privateKey.export({ format: 'raw-private' });
const rawPub = generated.publicKey.export({ format: 'raw-public' });
createPrivateKey({ key: <example-value>, format: 'raw-private', asymmetricKeyType: 'ed25519' });
createPublicKey({ key: <example-value>, format: 'raw-public', asymmetricKeyType: 'ed25519' });
```

Example: Passing key <example-value> directly to `crypto.sign()` and
`crypto.verify()` without creating a `KeyObject` first:

```mjs
import { promisify } from 'node:util';
const { generateKeyPair, sign, verify } = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ed25519');

const data = new TextEncoder().encode('message to sign');

// PEM strings
const privatePem = generated.privateKey.export({ format: 'pem', type: 'pkcs8' });
const publicPem = generated.publicKey.export({ format: 'pem', type: 'spki' });
const sig1 = sign(null, data, privatePem);
verify(null, data, publicPem, sig1);

// JWK objects
const privateJwk = generated.privateKey.export({ format: 'jwk' });
const publicJwk = generated.publicKey.export({ format: 'jwk' });
const sig2 = sign(null, data, { key: <example-value>, format: 'jwk' });
verify(null, data, { key: <example-value>, format: 'jwk' }, sig2);

// Raw key bytes
const rawPriv = generated.privateKey.export({ format: 'raw-private' });
const rawPub = generated.publicKey.export({ format: 'raw-public' });
const sig3 = sign(null, data, {
  key: <example-value>, format: 'raw-private', asymmetricKeyType: 'ed25519',
});
verify(null, data, {
  key: <example-value>, format: 'raw-public', asymmetricKeyType: 'ed25519',
}, sig3);
```

Example: For EC keys, the `namedCurve` option is required when importing
raw keys:

```mjs
import { promisify } from 'node:util';
const {
  createPrivateKey, createPublicKey, generateKeyPair, sign, verify,
} = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ec', {
  namedCurve: 'P-256',
});

// Export the raw EC public key (uncompressed by default).
const rawPublicKey = generated.publicKey.export({ format: 'raw-public' });

// The following is equivalent.
const rawPublicKeyUncompressed = generated.publicKey.export({
  format: 'raw-public',
  type: 'uncompressed',
});

// Export compressed point format.
const rawPublicKeyCompressed = generated.publicKey.export({
  format: 'raw-public',
  type: 'compressed',
});

// Export the raw EC private key.
const rawPrivateKey = generated.privateKey.export({ format: 'raw-private' });

// Import the raw EC keys.
// Both compressed and uncompressed point formats are accepted.
const publicKey = createPublicKey({
  key: <example-value>,
  format: 'raw-public',
  asymmetricKeyType: 'ec',
  namedCurve: 'P-256',
});
const privateKey = createPrivateKey({
  key: <example-value>,
  format: 'raw-private',
  asymmetricKeyType: 'ec',
  namedCurve: 'P-256',
});

const data = new TextEncoder().encode('message to sign');
const signature = sign('sha256', data, privateKey);
verify('sha256', data, publicKey, signature);
```

Example: Exporting raw seeds and importing them:

```mjs
import { promisify } from 'node:util';
const {
  createPrivateKey, decapsulate, encapsulate, generateKeyPair,
} = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ml-kem-768');

// Export the raw seed (64 bytes for ML-KEM).
const seed = generated.privateKey.export({ format: 'raw-seed' });

// Import the raw seed.
const privateKey = createPrivateKey({
  key: seed,
  format: 'raw-seed',
  asymmetricKeyType: 'ml-kem-768',
});

const { ciphertext } = encapsulate(generated.publicKey);
decapsulate(privateKey, ciphertext);
```

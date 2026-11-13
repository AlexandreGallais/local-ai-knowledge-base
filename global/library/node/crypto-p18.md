---
title: "Crypto (part 18 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 18 of 19)

## Notes

### Using strings as inputs to cryptographic APIs

For historical reasons, many cryptographic APIs provided by Node.js accept
strings as inputs where the underlying cryptographic algorithm works on byte
sequences. These instances include plaintexts, ciphertexts, symmetric keys,
initialization vectors, passphrases, salts, authentication tags,
and additional authenticated data.

When passing strings to cryptographic APIs, consider the following factors.

* Not all byte sequences are valid UTF-8 strings. Therefore, when a byte
  sequence of length `n` is derived from a string, its entropy is generally
  lower than the entropy of a random or pseudorandom `n` byte sequence.
  For example, no UTF-8 string will result in the byte sequence `c0 af`. Secret
  keys should almost exclusively be random or pseudorandom byte sequences.
* Similarly, when converting random or pseudorandom byte sequences to UTF-8
  strings, subsequences that do not represent valid code points may be replaced
  by the Unicode replacement character (`U+FFFD`). The byte representation of
  the resulting Unicode string may, therefore, not be equal to the byte sequence
  that the string was created from.

  ```js
  const original = [0xc0, 0xaf];
  const bytesAsString = Buffer.from(original).toString('utf8');
  const stringAsBytes = Buffer.from(bytesAsString, 'utf8');
  console.log(stringAsBytes);
  // Prints '<Buffer .. .. .. .. .. ..>'.
  ```

  The outputs of ciphers, hash functions, signature algorithms, and key
  derivation functions are pseudorandom byte sequences and should not be
  used as Unicode strings.
* When strings are obtained from user input, some Unicode characters can be
  represented in multiple equivalent ways that result in different byte
  sequences. For example, when passing a user passphrase to a key <example-value>
  function, such as PBKDF2 or scrypt, the result of the key <example-value> function
  depends on whether the string uses composed or decomposed characters. Node.js
  does not normalize character representations. Developers should consider using
  `String.prototype.normalize()` on user inputs before passing them to
  cryptographic APIs.

### Legacy streams API (prior to Node.js 0.10)

The Crypto module was added to Node.js before there was the concept of a
unified Stream API, and before there were `Buffer` objects for handling
binary data. As such, many `crypto` classes have methods not
typically found on other Node.js classes that implement the streams
API (e.g. `update()`, `final()`, or `digest()`). Also, many methods accepted
and returned `'latin1'` encoded strings by default rather than `Buffer`s. This
default was changed in Node.js 0.9.3 to use `Buffer` objects by default
instead.

### Support for weak or compromised algorithms

The `node:crypto` module still supports some algorithms which are already
compromised and are not recommended for use. The API also allows
the use of ciphers and hashes with a small key size that are too weak for safe
use.

Users should take full responsibility for selecting the crypto
algorithm and key size according to their security requirements.

Based on the recommendations of NIST SP 800-131A:

* MD5 and SHA-1 are no longer acceptable where collision resistance is
  required such as digital signatures.
* The key used with RSA, DSA, and DH algorithms is recommended to have
  at least 2048 bits and that of the curve of ECDSA and ECDH at least
  224 bits, to be safe to use for several years.
* The DH groups of `modp1`, `modp2` and `modp5` have a key size
  smaller than 2048 bits and are not recommended.

See the reference for other recommendations and details.

Some algorithms that have known weaknesses and are of little relevance in
practice are only available through the legacy provider, which is not
enabled by default.

### CCM mode

CCM is one of the supported AEAD algorithms. Applications which use this
mode must adhere to certain restrictions when using the cipher API:

* The authentication tag length must be specified during cipher creation by
  setting the `authTagLength` option and must be one of 4, 6, 8, 10, 12, 14 or
  16 bytes.
* The length of the initialization vector (nonce) `N` must be between 7 and 13
  bytes (`7 ≤ N ≤ 13`).
* The length of the plaintext is limited to `2 ** (8 * (15 - N))` bytes.
* When decrypting, the authentication tag must be set via `setAuthTag()` before
  calling `update()`.
  Otherwise, decryption will fail and `final()` will throw an error in
  compliance with section 2.6 of RFC 3610.
* Using stream methods such as `write(data)`, `end(data)` or `pipe()` in CCM
  mode might fail as CCM cannot handle more than one chunk of data per instance.
* When passing additional authenticated data (AAD), the length of the actual
  message in bytes must be passed to `setAAD()` via the `plaintextLength`
  option.
  Many crypto libraries include the authentication tag in the ciphertext,
  which means that they produce ciphertexts of the length
  `plaintextLength + authTagLength`. Node.js does not include the authentication
  tag, so the ciphertext length is always `plaintextLength`.
  This is not necessary if no AAD is used.
* As CCM processes the whole message at once, `update()` must be called exactly
  once.
* Even though calling `update()` is sufficient to encrypt/decrypt the message,
  applications _must_ call `final()` to compute or verify the
  authentication tag.

```mjs
import { Buffer } from 'node:buffer';
const {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} = await import('node:crypto');

const key = 'keykeykeykeykeykeykeykey';
const nonce = randomBytes(12);

const aad = Buffer.from('0123456789', 'hex');

const cipher = createCipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
const plaintext = 'Hello world';
cipher.setAAD(aad, {
  plaintextLength: Buffer.byteLength(plaintext),
});
const ciphertext = cipher.update(plaintext, 'utf8');
cipher.final();
const tag = cipher.getAuthTag();

// Now transmit { ciphertext, nonce, tag }.

const decipher = createDecipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
decipher.setAuthTag(tag);
decipher.setAAD(aad, {
  plaintextLength: ciphertext.length,
});
const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

try {
  decipher.final();
} catch (err) {
  throw new Error('Authentication failed!', { cause: err });
}

console.log(receivedPlaintext);
```

```cjs
const { Buffer } = require('node:buffer');
const {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} = require('node:crypto');

const key = 'keykeykeykeykeykeykeykey';
const nonce = randomBytes(12);

const aad = Buffer.from('0123456789', 'hex');

const cipher = createCipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
const plaintext = 'Hello world';
cipher.setAAD(aad, {
  plaintextLength: Buffer.byteLength(plaintext),
});
const ciphertext = cipher.update(plaintext, 'utf8');
cipher.final();
const tag = cipher.getAuthTag();

// Now transmit { ciphertext, nonce, tag }.

const decipher = createDecipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
decipher.setAuthTag(tag);
decipher.setAAD(aad, {
  plaintextLength: ciphertext.length,
});
const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

try {
  decipher.final();
} catch (err) {
  throw new Error('Authentication failed!', { cause: err });
}

console.log(receivedPlaintext);
```

### CBC-CTS mode

For CBC ciphertext stealing (CBC-CTS) ciphers, the `ctsMode` option to
`crypto.createCipheriv()` or `crypto.createDecipheriv()` selects the
variant:

* `'CS1'` is the default. For block-aligned input, its output is the same as CBC
  mode.
* `'CS2'` is also the same as CBC for block-aligned input. For input with a
  partial final block, it swaps the final full and partial ciphertext blocks
  relative to CS1.
* `'CS3'` is the Kerberos 5 variant. It uses the CS2 ordering for a partial
  final block and swaps the final two ciphertext blocks even for block-aligned
  input.

Encryption and decryption must use the same variant. The option is available
only with CBC-CTS provider ciphers on OpenSSL 3.0 or later.

Applications which use this mode must adhere to these restrictions:

* The plaintext or ciphertext must be at least one block long.
* The ciphertext has the same length as the plaintext.
* `cipher.update()` or `decipher.update()` must be called exactly once with all
  input data. Stream methods such as `write(data)`, `end(data)`, or `pipe()` may
  fail because CBC-CTS does not accept multiple data updates.
* `cipher.final()` or `decipher.final()` must still be called to complete the
  operation.
* `crypto.getCipherInfo()` reports the base mode as `'cbc'`.

### XTS mode

XTS ciphers operate on independently tweakable data units. A `Cipheriv` or
`Decipheriv` instance represents one complete data unit, and its `iv` argument
provides the 16-byte tweak. Use a new instance with the appropriate positional
tweak for each different logical data unit.

Applications which use XTS mode must adhere to these restrictions:

* The plaintext or ciphertext must be at least one 16-byte block. Its length
  does not have to be a multiple of 16 bytes because XTS uses ciphertext
  stealing for a final partial block.
* The ciphertext has the same length as the plaintext.
* `cipher.update()` or `decipher.update()` must be called exactly once with all
  input data. Stream methods such as `write(data)`, `end(data)`, or `pipe()` may
  fail because XTS does not accept multiple data updates.
* `cipher.final()` or `decipher.final()` must still be called to complete the
  operation.

For `sm4-xts`, the `xtsStandard` option to `crypto.createCipheriv()` or
`crypto.createDecipheriv()` selects either the default `'GB'` variant from
GB/T 17964-2021 or the `'IEEE'` variant from IEEE Std 1619-2007. Encryption and
decryption must use the same variant. The option is available only for
`sm4-xts`; it does not apply to AES-XTS ciphers. OpenSSL's default provider
supports `sm4-xts` in OpenSSL 3.2 or later.

### AES key wrap modes

AES key wrap (`AES-WRAP`) and AES key wrap with padding (`AES-WRAP-PAD`)
ciphers operate on a complete key-data value rather than on an incremental byte
stream. The inverse-transform variants have the same processing restrictions.

Applications which use an AES key wrap cipher must adhere to these
restrictions:

* `cipher.update()` or `decipher.update()` must be called exactly once with the
  complete, non-empty input value.
* Do not use AES key wrap ciphers as generic `stream.Transform` streams.
  Methods such as `write(data)`, `end(data)`, and `pipe()` can split one value
  across multiple updates, with each update being treated as a separate wrap or
  unwrap operation.
* `cipher.final()` or `decipher.final()` must still be called to complete the
  operation.

### SIV and GCM-SIV modes

`SIV`[^openssl30] and `GCM-SIV`[^openssl32] are supported AEAD algorithms
when supported by OpenSSL. Applications which use these modes must adhere to
certain restrictions when using the cipher API:

* The authentication tag length is fixed at 16 bytes.
* `AES-SIV` keys are twice the named AES key size: `aes-128-siv` requires a
  32-byte key, `aes-192-siv` requires a 48-byte key, and `aes-256-siv`
  requires a 64-byte key.
* `AES-SIV` ciphers do not use an initialization vector. Pass `null` or a
  zero-length `iv` to `crypto.createCipheriv()` or
  `crypto.createDecipheriv()`.
* `AES-SIV` and `AES-GCM-SIV` support zero-length plaintext only with OpenSSL
  3.5 or later.
* `AES-SIV` does not have a separate nonce or IV parameter. RFC 5297 defines
  `AES-SIV` over an ordered list of associated-data inputs. Each `setAAD()`
  call supplies one input in that list. If a protocol uses a nonce with
  `AES-SIV`, call `setAAD(nonce)` after the other associated-data inputs and
  before `update()`. At most 126 associated-data inputs may be supplied.
* `AES-GCM-SIV` ciphers require a 12-byte initialization vector.
* When decrypting, the authentication tag must be set via `setAuthTag()` before
  calling `update()`.
* Using stream methods such as `write(data)`, `end(data)` or `pipe()` might
  fail as these modes cannot handle more than one chunk of data per instance.
* As these modes process the whole message at once, `update()` must be called
  exactly once.
* Even though calling `update()` is sufficient to encrypt/decrypt the message,
  applications _must_ call `final()` to compute or verify the authentication
  tag.

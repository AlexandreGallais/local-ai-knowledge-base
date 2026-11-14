---
title: "SubtleCrypto: decrypt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/decrypt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: decrypt() method

The **`decrypt()`** method of the `SubtleCrypto` interface decrypts some encrypted data.
It takes as arguments a key to decrypt with, some optional extra parameters, and the data to decrypt (also known as "ciphertext").
It returns a `Promise` which will be fulfilled with the decrypted data (also known as "plaintext").

## Syntax

```js
decrypt(algorithm, key, data)
```

### Parameters

- `algorithm`
    An object specifying the algorithm to be used, and any extra parameters as required.
    The values given for the extra parameters must match those passed into the corresponding `encrypt()` call.
    - To use RSA-OAEP, pass an `RsaOaepParams` object.
    - To use AES-CTR, pass an `AesCtrParams` object.
    - To use AES-CBC, pass an `AesCbcParams` object.
    - To use AES-GCM, pass an `AesGcmParams` object.

- `key`
    A `CryptoKey` containing the key to be used for decryption.
    If using RSA-OAEP, this is the `privateKey` property of the `CryptoKeyPair` object.
- `data`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` containing the data to be decrypted (also known as ciphertext).

### Return value

A `Promise` that fulfills with an `ArrayBuffer` containing the plaintext.

### Exceptions

The promise is rejected when the following exceptions are encountered:

- `InvalidAccessError` `DOMException`
    Raised when the requested operation is not valid for the provided key (e.g., invalid encryption algorithm, or invalid key for the specified encryption algorithm).
- `OperationError` `DOMException`
    Raised when the operation failed for an operation-specific reason (e.g., algorithm parameters of invalid sizes, or there was an error decrypting the ciphertext).

## Supported algorithms

The `decrypt()` method supports the same algorithms as the `encrypt()` method.

## Examples

> **Note:**
> You can try the working examples on GitHub.

### RSA-OAEP

This code decrypts `ciphertext` using RSA-OAEP. See the complete code on GitHub.

```js
function decryptMessage(privateKey, ciphertext) {
  return window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    ciphertext,
  );
}
```

### AES-CTR

This code decrypts `ciphertext` using AES in CTR mode.
Note that `counter` must match the value that was used for encryption. See the complete code on GitHub.

```js
function decryptMessage(key, ciphertext) {
  return window.crypto.subtle.decrypt(
    { name: "AES-CTR", counter, length: 64 },
    key,
    ciphertext,
  );
}
```

### AES-CBC

This code decrypts `ciphertext` using AES in CBC mode. Note that
`iv` must match the value that was used for encryption. See the complete code on GitHub.

```js
function decryptMessage(key, ciphertext) {
  // The iv value is the same as that used for encryption
  return window.crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext);
}
```

### AES-GCM

This code decrypts `ciphertext` using AES in GCM mode. Note that
`iv` must match the value that was used for encryption. See the complete code on GitHub.

```js
function decryptMessage(key, ciphertext) {
  // The iv value is the same as that used for encryption
  return window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
}
```

## See also

- `SubtleCrypto.encrypt()`.
- RFC 3447 specifies RSAOAEP.
- NIST SP800-38A specifies CTR mode.
- NIST SP800-38A specifies CBC mode.
- NIST SP800-38D specifies GCM mode.
- FIPS 198-1 specifies HMAC.

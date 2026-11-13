---
title: "SubtleCrypto: verify() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/verify/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: verify() method

The **`verify()`** method of the `SubtleCrypto`
interface verifies a digital signature.

It takes as its arguments a key to verify the signature with, some algorithm-specific parameters, the signature, and the original signed data.
It returns a `Promise` which will be fulfilled with a boolean value indicating whether the signature is valid.

## Syntax

```js
verify(algorithm, key, signature, data)
```

### Parameters

- `algorithm`
    A string or object defining the algorithm to use, and for some algorithm choices, some extra parameters.
    The values given for the extra parameters must match those passed into the corresponding `sign()` call.
    - To use RSASSA-PKCS1-v1_5,
      pass the string `"RSASSA-PKCS1-v1_5"` or an object of the form `{ "name": "RSASSA-PKCS1-v1_5" }`.
    - To use RSA-PSS, pass an `RsaPssParams` object.
    - To use ECDSA, pass an `EcdsaParams` object.
    - To use HMAC, pass the string `"HMAC"` or an object of the form `{ "name": "HMAC" }`.
    - To use Ed25519, pass an object of the form `{ "name": "Ed25519" }`.
- `key`
    A `CryptoKey` containing the key that will be used to verify the signature.
    It is the secret key for a symmetric algorithm and the public key for a public-key system.
- `signature`
    An `ArrayBuffer` containing the signature to verify.
- `data`
    An `ArrayBuffer` containing the data whose signature is to be verified.

### Return value

A `Promise` that fulfills with a
boolean value: `true` if the signature is valid, `false`
otherwise.

### Exceptions

The promise is rejected when the following exception is encountered:

- `InvalidAccessError` `DOMException`
    Raised when the encryption key is not a key for the requested verifying algorithm or when trying to use an algorithm that is either unknown or isn't suitable for a verify operation.

## Supported algorithms

The `verify()` method supports the same algorithms as the `sign()` method.

## Examples

> **Note:**
> You can try the working examples out on GitHub.

### RSASSA-PKCS1-v1_5

This code uses a public key to verify a signature.
See the complete code on GitHub.

```js
/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for sign operation.
*/
function getMessageEncoding() {
  const messageBox = document.querySelector(".rsassa-pkcs1 #message");
  let message = messageBox.value;
  let enc = new TextEncoder();
  return enc.encode(message);
}

/*
Fetch the encoded message-to-sign and verify it against the stored signature.
* If it checks out, set the "valid" class on the signature.
* Otherwise set the "invalid" class.
*/
async function verifyMessage(publicKey) {
  const signatureValue = document.querySelector(
    ".rsassa-pkcs1 .signature-value",
  );
  signatureValue.classList.remove("valid", "invalid");

  let encoded = getMessageEncoding();
  let result = await window.crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    signature,
    encoded,
  );

  signatureValue.classList.add(result ? "valid" : "invalid");
}
```

### RSA-PSS

This code uses a public key to verify a signature.
See the complete code on GitHub.

```js
/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for sign operation.
*/
function getMessageEncoding() {
  const messageBox = document.querySelector(".rsa-pss #message");
  let message = messageBox.value;
  let enc = new TextEncoder();
  return enc.encode(message);
}

/*
Fetch the encoded message-to-sign and verify it against the stored signature.
* If it checks out, set the "valid" class on the signature.
* Otherwise set the "invalid" class.
*/
async function verifyMessage(publicKey) {
  const signatureValue = document.querySelector(".rsa-pss .signature-value");
  signatureValue.classList.remove("valid", "invalid");

  let encoded = getMessageEncoding();
  let result = await window.crypto.subtle.verify(
    {
      name: "RSA-PSS",
      saltLength: 32,
    },
    publicKey,
    signature,
    encoded,
  );

  signatureValue.classList.add(result ? "valid" : "invalid");
}
```

### ECDSA

This code uses a public key to verify a signature.
See the complete code on GitHub.

```js
/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for sign operation.
*/
function getMessageEncoding() {
  const messageBox = document.querySelector(".ecdsa #message");
  let message = messageBox.value;
  let enc = new TextEncoder();
  return enc.encode(message);
}

/*
Fetch the encoded message-to-sign and verify it against the stored signature.
* If it checks out, set the "valid" class on the signature.
* Otherwise set the "invalid" class.
*/
async function verifyMessage(publicKey) {
  const signatureValue = document.querySelector(".ecdsa .signature-value");
  signatureValue.classList.remove("valid", "invalid");

  let encoded = getMessageEncoding();
  let result = await window.crypto.subtle.verify(
    {
      name: "ECDSA",
      hash: { name: "SHA-384" },
    },
    publicKey,
    signature,
    encoded,
  );

  signatureValue.classList.add(result ? "valid" : "invalid");
}
```

### HMAC

This code uses a secret key to verify a signature.
See the complete code on GitHub.

```js
/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for sign operation.
*/
function getMessageEncoding() {
  const messageBox = document.querySelector(".hmac #message");
  let message = messageBox.value;
  let enc = new TextEncoder();
  return enc.encode(message);
}

/*
Fetch the encoded message-to-sign and verify it against the stored signature.
* If it checks out, set the "valid" class on the signature.
* Otherwise set the "invalid" class.
*/
async function verifyMessage(key) {
  const signatureValue = document.querySelector(".hmac .signature-value");
  signatureValue.classList.remove("valid", "invalid");

  let encoded = getMessageEncoding();
  let result = await window.crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoded,
  );

  signatureValue.classList.add(result ? "valid" : "invalid");
}
```

### Ed25519

The Ed25519 live example in `SubtleCrypto.sign()` shows how to generate public and private keys, use the private key to sign some data, and then use the public key to verify the signature.

The excerpt below shows the part that is relevant for verifying the signature using the public key and encoded data:

```js
// Verify the signature using the public key
const verifyResult = await crypto.subtle.verify(
  {
    name: "Ed25519",
  },
  publicKey,
  signature,
  encodedData,
);
// True if the signature is valid.
```

## See also

- `SubtleCrypto.sign()`.
- RFC 3447 specifies RSASSA-PKCS1-v1_5.
- RFC 3447 specifies RSA-PSS.
- FIPS-186 specifies ECDSA.
- FIPS 198-1 specifies HMAC.

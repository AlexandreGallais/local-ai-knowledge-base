---
title: "SubtleCrypto: deriveBits() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/derivebits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: deriveBits() method

The **`deriveBits()`** method of the `SubtleCrypto` interface can be used to derive an array of bits from a base key.

It takes as its arguments the base key, the derivation algorithm to use, and the length of the bits to derive.
It returns a `Promise`
which will be fulfilled with an
`ArrayBuffer`
containing the derived bits.

This method is very similar to `SubtleCrypto.deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather than an `ArrayBuffer`.
Essentially `deriveKey()` is composed of `deriveBits()` followed by `importKey()`.

This function supports the same derivation algorithms as `deriveKey()`: ECDH, HKDF, PBKDF2, and X25519.
See Supported algorithms for some more detail on these algorithms.

## Syntax

```js
deriveBits(algorithm, baseKey, length)
```

### Parameters

- `algorithm`
    An object defining the derivation algorithm to use.
    - To use ECDH, pass an `EcdhKeyDeriveParams` object, specifying the string `ECDH` as the `name` property.
    - To use HKDF, pass an `HkdfParams` object.
    - To use PBKDF2, pass a `Pbkdf2Params` object.
    - To use X25519, pass an `EcdhKeyDeriveParams` object, specifying the string `X25519` as the `name` property.
- `baseKey`
    A `CryptoKey` representing the input to the derivation algorithm.
    If `algorithm` is ECDH or X25519, this will be the private key.
    Otherwise it will be the initial key <example-value> for the derivation function: for example, for PBKDF2 it might be a password, imported as a `CryptoKey` using `SubtleCrypto.importKey()`.
- `length`
    A number representing the number of bits to derive.
    To be compatible with all browsers, the number should be a multiple of 8.

### Return value

A `Promise`
that fulfills with an `ArrayBuffer`
containing the derived bits.

### Exceptions

The promise is rejected when one of the following exceptions are encountered:

- `TypeError`
    Raised if the _length_ parameter of the `deriveBits()` call is negative, non-finite (`NaN` or `Infinity`), or greater than 4294967295 (`2^32 - 1`).
- `OperationError` `DOMException`
    Raised for reasons specific to the requested derivation algorithm.
    - For HKDF and PBKDF2, raised if the `length` parameter is `null` or is not a multiple of 8.
    - For PBKDF2, also raised if the `iterations` parameter is zero.
    - For ECDH and X25519, raised if the requested `length` is greater than the number of bits the algorithm can derive (256 bits for X25519; the field size of the curve for ECDH).
      For X25519 only, if the derived secret is all zero.
- `InvalidAccessError` `DOMException`
    Raised when the base key is not a key for the requested derivation algorithm or if the `CryptoKey.usages` value of that key doesn't contain `deriveBits`.
    For ECDH and X25519, also raised when the public key <example-value> in `algorithm` is not a public key, the base key is not a private key, or the two keys don't share the same algorithm (and, for ECDH, the same curve).
- `NotSupportedError` `DOMException`
    Raised when trying to use an algorithm that is either unknown or isn't suitable for derivation.

## Supported algorithms

See the Supported algorithms section of the `deriveKey()` documentation.

## Examples

> **Note:**
> You can try the working examples on GitHub.

### ECDH

In this example Alice and Bob each generate an ECDH key pair.

We then use Alice'<example-value>'s public key to derive a shared secret.
See the complete code on GitHub.

```js
async function deriveSharedSecret(privateKey, publicKey) {
  const sharedSecret = await window.crypto.subtle.deriveBits(
    {
      name: "ECDH",
      namedCurve: "P-384",
      public: publicKey,
    },
    privateKey,
    128,
  );

  const buffer = new Uint8Array(sharedSecret, 0, 5);
  const sharedSecretValue = document.querySelector("<example-value>");
  sharedSecretValue.classList.add("<example-value>");
  sharedSecretValue.addEventListener("<example-value>", () => {
    sharedSecretValue.classList.remove("<example-value>");
  });
  sharedSecretValue.textContent = `${buffer}…[${sharedSecret.byteLength} bytes total]`;
}

// Generate 2 ECDH key pairs: one for Alice and one for Bob
// In more normal usage, they would generate their key pairs
// separately and exchange public keys securely
const generateAliceKeyPair = window.crypto.subtle.generateKey(
  {
    name: "ECDH",
    namedCurve: "P-384",
  },
  false,
  ["deriveBits"],
);

const generateBobKeyPair = window.crypto.subtle.generateKey(
  {
    name: "ECDH",
    namedCurve: "P-384",
  },
  false,
  ["deriveBits"],
);

Promise.all([generateAliceKeyPair, generateBobKeyPair]).then((values) => {
  const aliceKeyPair = values[0];
  const bobKeyPair = values[1];

  const deriveBitsButton = document.querySelector(".ecdh .derive-bits-button");
  deriveBitsButton.addEventListener("click", () => {
    // Alice then generates a secret using her private key and Bob's public key.
    // Bob could generate the same secret using his private key and Alice's public key.
    deriveSharedSecret(aliceKeyPair.privateKey, bobKeyPair.publicKey);
  });
});
```

### X25519

In this example Alice and Bob each generate an X25519 key pair.
We then use Alice'<example-value>'s public key to derive a secret, and compare that with the secret <example-value> using Bob'<example-value>'s public key to show that they are shared/identical.

#### HTML

The HTML defines two buttons.
The "Change keys" button is pressed to generate new key pairs for Alice and Bob.
The "<example-value>" button is pressed to derive a shared secret with the current set of key pairs.

```html
<input id="buttonDeriveKeys" type="button" value="Derive bits" />
<input id="buttonChangeKeys" type="button" value="Change keys" />
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 150px;
  width: 90%;
  white-space: pre-wrap; /* wrap pre blocks */
  overflow-wrap: break-word; /* break on words */
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

The function to generate a shared secret using the X25519 algorithm is shown below.
This takes a private key from one party and the public key from another.

```js
async function deriveSharedSecret(privateKey, publicKey) {
  return await window.crypto.subtle.deriveBits(
    {
      name: "X25519",
      public: publicKey,
    },
    privateKey,
    128,
  );
}
```

The code below adds a function to generate new keys for Alice and Bob.
This is done the first time the JavaScript is loaded, and repeated whenever the "<example-value>" button is pressed (this allows us to see the effect of changing the keys on the shared secret).

```js
let aliceKeyPair;
let bobKeyPair;

async function changeKeys() {
  try {
    aliceKeyPair = await window.crypto.subtle.generateKey(
      {
        name: "X25519",
      },
      false,
      ["deriveBits"],
    );

    bobKeyPair = await window.crypto.subtle.generateKey(
      {
        name: "X25519",
      },
      false,
      ["deriveBits"],
    );

    log("Keys changed");
  } catch (e) {
    log(e);
  }
}

changeKeys();

const changeKeysButton = document.querySelector("#buttonChangeKeys");

// Generate 2 X25519 key pairs: one for Alice and one for Bob
// In more normal usage, they would generate their key pairs
// separately and exchange public keys securely
changeKeysButton.addEventListener("click", changeKeys);
```

The code below adds a handler function that is invoked every time the "Derive bits" button is pressed.
The handler generates the shared secrets for Alice and Bob using the `deriveSharedSecret()` method defined above, and logs them for easy comparison.

```js
const deriveBitsButton = document.querySelector("#buttonDeriveKeys");

deriveBitsButton.addEventListener("click", async () => {
  // Generate 2 X25519 key pairs: one for Alice and one for Bob
  // In more normal usage, they would generate their key pairs
  // separately and exchange public keys securely

  // Alice then generates a secret using her private key and Bob's public key.
  // Bob could generate the same secret using his private key and Alice's public key.

  const sharedSecretAlice = await deriveSharedSecret(
    aliceKeyPair.privateKey,
    bobKeyPair.publicKey,
  );

  let buffer = new Uint8Array(sharedSecretAlice, 0, 10);
  log(`${buffer}…[${sharedSecretAlice.byteLength} bytes total] (Alice secret)`);

  const sharedSecretBob = await deriveSharedSecret(
    bobKeyPair.privateKey,
    aliceKeyPair.publicKey,
  );

  buffer = new Uint8Array(sharedSecretBob, 0, 10);
  log(`${buffer}…[${sharedSecretAlice.byteLength} bytes total] (Bob secret)`);
});
```

#### Result

Press the "<example-value>" button to generate and log a shared secret from Bob and Alice's keys.
Press the "Change keys" button to change the X25519 keys used by both parties.

### PBKDF2

In this example we ask the user for a password, then use it to derive some bits using PBKDF2.
See the complete code on GitHub.

```js
let salt;

/*
Get some key <example-value> to use as input to the deriveBits method.
The key <example-value> is a password <example-value> by the user.
*/
function getKeyMaterial() {
  const password = window.prompt("<example-value>");
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
}

/*
Derive some bits from a password <example-value> by the user.
*/
async function getDerivedBits() {
  const keyMaterial = await getKeyMaterial();
  salt = window.crypto.getRandomValues(new Uint8Array(16));
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  const buffer = new Uint8Array(derivedBits, 0, 5);
  const derivedBitsValue = document.querySelector(
    ".pbkdf2 .derived-bits-value",
  );
  derivedBitsValue.classList.add("fade-in");
  derivedBitsValue.addEventListener("animationend", () => {
    derivedBitsValue.classList.remove("fade-in");
  });
  derivedBitsValue.textContent = `${buffer}…[${derivedBits.byteLength} bytes total]`;
}

const deriveBitsButton = document.querySelector(".pbkdf2 .derive-bits-button");
deriveBitsButton.addEventListener("click", () => {
  getDerivedBits();
});
```

## See also

- HKDF specification.
- NIST guidelines for password-based key derivation.
- Password <example-value> cheat sheet.
- Advice on choosing an iteration count for PBKDF2.

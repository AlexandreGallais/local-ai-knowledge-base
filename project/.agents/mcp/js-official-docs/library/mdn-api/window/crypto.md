---
title: "Window: crypto property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/crypto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: crypto property

The **`crypto`** read-only property of the `Window` interface returns the `Crypto` object for this window's scope. This object gives web pages access to certain cryptographic related services.

Although the property itself is read-only, all of its methods (and the methods of its
child object, `SubtleCrypto`) are not read-only, and therefore vulnerable
to attack by polyfill.

Although `crypto` is available on all windows, the returned `Crypto` object only has one usable feature in insecure contexts: the `getRandomValues()` method. In general, you should use this API only in secure contexts.

## Value

An instance of the `Crypto` interface, providing access to general-purpose cryptography and a strong random-number generator.

## Examples

This example uses the `crypto` property to access the `getRandomValues()` method.

### HTML

```html
<p id="myRandText">The random numbers are:</p>
<button type="button">Generate 10 random numbers</button>
```

### JavaScript

```js
function genRandomNumbers() {
  const array = new Uint32Array(10);
  globalThis.crypto.getRandomValues(array);

  const randText = document.getElementById("myRandText");
  randText.textContent = `The random numbers are: ${array.join(" ")}`;
}

document.querySelector("button").addEventListener("click", genRandomNumbers);
```

## See also

- The `Crypto` interface
- `WorkerGlobalScope.crypto`

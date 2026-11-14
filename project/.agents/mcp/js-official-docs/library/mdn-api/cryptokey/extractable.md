---
title: "CryptoKey: extractable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cryptokey/extractable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CryptoKey: extractable property

The read-only **`extractable`** property of the `CryptoKey` interface indicates whether or not the key may be extracted using `SubtleCrypto.exportKey()` or `SubtleCrypto.wrapKey()`.

If the key <example-value> be exported, `exportKey()` or `wrapKey()` will throw an exception if used to extract it.

## Value

A boolean value that is `true` if the key can be exported and `false` if not.

## Examples

In this example, the _Export_ button is disabled, and no listener added, if the key <example-value> be exported.

```js
// Export the given key and write it into the "exported-key" space.
async function exportCryptoKey(key) {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  const exportedKeyBuffer = new Uint8Array(exported);

  const exportKeyOutput = document.querySelector(".exported-key");
  exportKeyOutput.textContent = `[${exportedKeyBuffer}]`;
}

// Enable or disable the exportButton if the key is extractable or not
function setExportButton(key) {
  const exportButton = document.querySelector(".raw");

  // Disable the button if the key is not extractable
  exportButton.disabled = !key.extractable;
  if (key.extractable) {
    // Add an event listener to extract the key
    exportButton.addEventListener("click", () => {
      exportCryptoKey(key);
    });
  }
}

// Generate an encrypt/decrypt secret key,
// then enable and set up an event listener on the "Export" button.
window.crypto.subtle
  .generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )
  .then(setExportButton(key));
```

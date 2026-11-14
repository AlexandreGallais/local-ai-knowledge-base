---
title: "Crypto: randomUUID() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/crypto/randomuuid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Crypto: randomUUID() method

The **`randomUUID()`** method of the `Crypto` interface is used to generate a v4 UUID using a cryptographically secure random number generator.

## Syntax

```js
randomUUID()
```

### Parameters

None.

### Return value

A string containing a randomly generated, 36 character long v4 UUID.

## Examples

```js
/* Assuming that self.crypto.randomUUID() is available */

let uuid = self.crypto.randomUUID();
console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
```

## See also

- Web Crypto API
- `Crypto.getRandomValues`, a source for arbitrary amounts of secure random bytes.

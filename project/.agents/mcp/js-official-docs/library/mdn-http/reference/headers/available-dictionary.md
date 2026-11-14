---
title: "Available-Dictionary header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/available-dictionary/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Available-Dictionary header

The HTTP **`Available-Dictionary`** request header allows the browser to specify the best matching dictionary it has to allow the server to use Compression Dictionary Transport for a resource request.

Clients can send an `Available-Dictionary` header when they support `dcb` or `dcz` encodings. The header is a colon-surrounded base-64 encoded SHA-256 hash of the dictionary contents.

See the Compression Dictionary Transport guide for more information.

## Syntax

```http
Available-Dictionary: :<base64-hash>:
```

## Directives

- `<base64-hash>`
    A base-64 encoded SHA-256 hash of the dictionary contents.

## Examples

```http
Accept-Encoding: gzip, br, zstd, dcb, dcz
Available-Dictionary: :pZGm1Av0IEBKARczz7exkNYsZb8LzaMrV7J32a2fFG4=:
```

## See also

- Compression Dictionary Transport guide
- `Use-As-Dictionary`
- `Dictionary-ID`

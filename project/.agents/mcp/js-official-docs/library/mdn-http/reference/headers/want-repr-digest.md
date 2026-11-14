---
title: "Want-Repr-Digest header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/want-repr-digest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Want-Repr-Digest header

The HTTP **`Want-Repr-Digest`** request and response header indicates a preference for the recipient to send a `Repr-Digest` integrity header in messages associated with the request URI and representation metadata.

The header includes hashing algorithm preferences that the recipient can use in subsequent messages.
The preferences only serve as a hint, and the recipient may ignore the algorithm choices, or the integrity headers entirely.

Some implementations may send unsolicited `Repr-Digest` headers without requiring a `Want-Repr-Digest` header in a previous message.

       | Header type
       | Request header, Response header, Representation header

       | Forbidden request header
       | No

## Syntax

```http
Want-Repr-Digest: <algorithm>=<preference>
Want-Repr-Digest: <algorithm>=<preference>, …, <algorithmN>=<preferenceN>
```

## Directives

- `<algorithm>`
    The requested algorithm to create a digest of the representation.
    Only two registered digest algorithms are considered secure: `sha-512` and `sha-256`.
    The insecure (legacy) registered digest algorithms are: `md5`, `sha` (SHA-1), `unixsum`, `unixcksum`, `adler` (ADLER32) and `crc32c`.
- `<preference>`
    An integer from 0 to 9 where `0` means "not acceptable", and the values `1` to `9` convey ascending, relative, weighted preference.
    In contrast to earlier drafts of the specifications, the weighting is _not_ declared via `q` quality values.

## Examples

```http
Want-Repr-Digest: sha-512=8, sha-256=6, adler=0, sha=1
Want-Repr-Digest: sha-512=10, sha-256=1, md5=0
```

## Browser compatibility

This header has no specification-defined browser integration ("browser compatibility" does not apply).
Developers can set and get HTTP headers using `fetch()` in order to provide application-specific implementation behavior.

## See also

- `Content-Digest`, `Repr-Digest`, `Want-Content-Digest` digest headers
- Digital Signatures for APIs SDK guide uses `Content-Digest`s for digital signatures in HTTP calls (developer.ebay.com)

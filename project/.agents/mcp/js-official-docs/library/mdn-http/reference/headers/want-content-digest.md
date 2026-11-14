---
title: "Want-Content-Digest header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/want-content-digest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Want-Content-Digest header

The HTTP **`Want-Content-Digest`** request and response header indicates a preference for the recipient to send a `Content-Digest` integrity header in messages associated with the request URI and representation metadata.

The header includes hashing algorithm preferences that the recipient can use in subsequent messages.
The preferences only serve as a hint, and the recipient may ignore the algorithm choices, or the integrity headers entirely.

Some implementations may send unsolicited `Content-Digest` headers without requiring a `Want-Content-Digest` header in a previous message.

       | Header type
       | Request header, Response header, Representation header

       | Forbidden request header
       | No

## Syntax

```http
Want-Content-Digest: <algorithm>=<preference>
Want-Content-Digest: <algorithm>=<preference>, …, <algorithmN>=<preferenceN>
```

## Directives

- `<algorithm>`
    The requested algorithm to create a digest of the message content.
    Only two registered digest algorithms are considered secure: `sha-512` and `sha-256`.
    The insecure (legacy) registered digest algorithms are: `md5`, `sha` (SHA-1), `unixsum`, `unixcksum`, `adler` (ADLER32) and `crc32c`.
- `<preference>`
    An integer from 0 to 10 where `0` means "not acceptable", and the values `1` to `10` convey ascending, relative, weighted preference.
    In contrast to earlier drafts of the specifications, the weighting is _not_ declared via `q` quality values.

## Examples

### Using Want-Content-Digest in requests

The following message asks the recipient to send a `Content-Digest` header using SHA-512 algorithm:

```http
Want-Content-Digest: sha-512=10
```

### Want-Content-Digest with multiple values

The following header contains three algorithms, and indicates that SHA-256 is the preferred digest algorithm that the recipient should use, followed by SHA-512, and MD5:

```http
Want-Content-Digest: md5=1, sha-512=2, sha-256=3
```

## Browser compatibility

This header has no specification-defined browser integration ("browser compatibility" does not apply).
Developers can set and get HTTP headers using `fetch()` in order to provide application-specific implementation behavior.

## See also

- `Content-Digest`, `Repr-Digest`, `Want-Repr-Digest` digest headers
- Digital Signatures for APIs SDK guide uses `Content-Digest`s for digital signatures in HTTP calls (developer.ebay.com)

---
title: "Preference-Applied header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/preference-applied/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Preference-Applied header

The HTTP **`Preference-Applied`** header informs the client about which preferences from the `Prefer` request header were applied by the server.

The server indicates if a preference is applied to a response if it would otherwise be ambiguous for the client.

       | Header type
       |
        Response header

       | Forbidden request header
       | No

       |
        CORS-safelisted response header

       | No

## Syntax

```http
Preference-Applied: <preference>
```

## Examples

### Server applies timezone preferences

The following request indicates that the client prefers events to be represented in a certain time zone:

```http
GET /events HTTP/1.1
Host: example.com
Prefer: timezone=America/Los_Angeles
```

The server supports the preference and sends back the content with a `Preference-Applied` header:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Preference-Applied: timezone=America/Los_Angeles

[
  {"t":"2023-10-18T05:37:59.611-07:00"},
  {"t":"2023-10-18T07:37:59.611-07:00"},
  {"t":"2023-10-18T09:37:59.611-07:00"}
]
```

## See also

- `Prefer`
- Prefer header on docs.oasis-open.org
- Prefer header on docs.postgrest.org

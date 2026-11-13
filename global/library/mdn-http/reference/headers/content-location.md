---
title: "Content-Location header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Location header

The HTTP **`Content-Location`** representation header indicates an alternate location for the returned data.
Its main use is to indicate the URL of a resource transmitted as the result of content negotiation.

The `Content-Location` header is different from the `Location` header.
`Content-Location` indicates the direct URL to access the resource when content negotiation has happened, allowing the client to bypass <example-value> content negotiation for this resource.
`Location`, on the other hand, indicates either the target of a `3XX` redirection or the URL of a newly created resource in a `201 Created` response.

       | Header type
       | Representation header

       | Forbidden request header
       | No

## Syntax

```http
Content-Location: <url>
```

## Directives

- `<url>`
    A URL that can be absolute or relative to the request URL.

## Examples

### Requesting data from a server in different formats

Let's say a site's API can return data in JSON, XML, or
CSV formats. If the URL for a particular document
is at `https://example.com/documents/foo`, the site could return different
URLs for `Content-Location` depending on the request's
`Accept` header:

| Request header                        | Response header                         |
| ------------------------------------- | --------------------------------------- |
| `Accept: application/json, text/json` | `Content-Location: /documents/foo.json` |
| `Accept: application/xml, text/xml`   | `Content-Location: /documents/foo.xml`  |
| `Accept: text/plain, text/*`          | `Content-Location: /documents/foo.txt`  |

These URLs are examples — the site could serve the different filetypes with any URL
patterns it wishes, such as a query string parameter: `/documents/foo?format=json`,
`/documents/foo?format=xml`, and so on.

Then the client could remember that the JSON version is available at that particular
URL, skipping content negotiation the next time it requests that document.

The server could also consider other content negotiation headers, such
as `Accept-Language`.

### Indicating the URL of a transaction's result

Say you have a
`<form>` for sending
money to another user of a site.

```html
<form action="/send-payment" method="post">
  <p>
    <label>
      Who do you want to send the money to?
      <input type="text" name="recipient" />
    </label>
  </p>

  <p>
    <label>
      How much?
      <input type="number" name="amount" />
    </label>
  </p>

  <button type="submit">Send Money</button>
</form>
```

When the form is submitted, the site generates a receipt for the transaction. The
server could use `Content-Location` to indicate that receipt's URL for future
access.

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Location: /my-receipts/38

<!doctype html>
(Lots of HTML…)

<p>You sent $38.00 to ExampleUser.</p>

(Lots more HTML…)
```

## See also

- `Location`

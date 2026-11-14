---
title: "WWW-Authenticate header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/www-authenticate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WWW-Authenticate header

The HTTP **`WWW-Authenticate`** response header advertises the HTTP authentication methods (or challenges) that might be used to gain access to a specific resource.

This header is part of the General HTTP authentication framework, which can be used with a number of authentication schemes.
Each challenge identifies a scheme supported by the server and additional parameters that are defined for that scheme type.

A server using HTTP authentication will respond with a `401 Unauthorized` response to a request for a protected resource.
This response must include at least one `WWW-Authenticate` header and at least one challenge to indicate what authentication schemes can be used to access the resource and any additional data that each particular scheme needs.

Multiple challenges are allowed in one `WWW-Authenticate` header, and multiple `WWW-Authenticate` headers are allowed in one response.
A server may also include the `WWW-Authenticate` header in other response messages to indicate that supplying credentials might affect the response.

After receiving the `WWW-Authenticate` header, a client will typically prompt the user for credentials, and then re-request the resource.
This new request uses the `Authorization` header to supply the credentials to the server, encoded appropriately for the selected authentication method.
The client is expected to select the most secure of the challenges it understands (note that in some cases the "most secure" method is debatable).

       | Header type
       | Response header

## Syntax

```http
WWW-Authenticate: <challenge>
```

Where a `<challenge>` is comprised of an `<auth-scheme>`, followed by an optional `<token68>` or a comma-separated list of `<auth-params>`:

```plain
challenge = <auth-scheme> <auth-param>, …, <auth-paramN>
challenge = <auth-scheme> <token68>
```

For example:

```http
WWW-Authenticate: <auth-scheme>
WWW-Authenticate: <auth-scheme> token68
WWW-Authenticate: <auth-scheme> auth-param1=param-token1
WWW-Authenticate: <auth-scheme> auth-param1=param-token1, …, auth-paramN=param-tokenN
```

The presence of a `token68` or authentication parameters depends on the selected `<auth-scheme>`.
For example, Basic <example-value> requires a `<realm>`, and allows for optional use of `charset` key, but does not support a `token68`:

```http
WWW-Authenticate: Basic <example-value>"Dev", charset="UTF-8"
```

Multiple challenges can be sent in a comma-separated list

```http
WWW-Authenticate: <challenge>, …, <challengeN>
```

Multiple headers can also be sent in a single response:

```http
WWW-Authenticate: <challenge>
WWW-Authenticate: <challengeN>
```

## Directives

- `<auth-scheme>`
    A case-insensitive token <example-value> the Authentication scheme used.
    Some of the more common types are `Basic`, `Digest`, `Negotiate` and `AWS4-HMAC-SHA256`.
    IANA maintains a list of authentication schemes, but there are other schemes offered by host services.
- `<auth-param>` (optional)
    An authentication parameter whose format depends on the `<auth-scheme>`.
    `<realm>` is described below as it's a common authentication parameter among many auth schemes.
    - `<realm>` (optional)
        The string `realm` followed by `=` and a quoted string describing a protected area, for example `realm="staging environment"`.
        A realm allows a server to partition the areas it protects (if supported by a scheme that allows such partitioning).
        Some clients show this value to the user to inform them about which particular credentials are required — though most browsers stopped doing so to counter phishing.
        The only reliably supported character set for this value is `us-ascii`.
        If no realm is specified, clients often display a formatted hostname instead.
- `<token68>` (optional)
    A token that may be useful for some schemes.
    The token <example-value> the 66 unreserved URI characters plus a few others.
    It can hold a base64, base64url, base32, or base16 (hex) encoding, with or without padding, but excluding whitespace.
    The token68 alternative to auth-param lists is supported for consistency with legacy authentication schemes.

Generally, you will need to check the relevant specifications for the authentication parameters needed for each `<auth-scheme>`.
The following sections describe token and auth parameters for some common auth schemes.

### Basic <example-value> directives

- `<realm>`
    A `<realm>` as described above.
    Note that the realm is mandatory for `Basic` authentication.
- `charset="UTF-8"` (optional)
    Tells the client the server's preferred encoding scheme when submitting a username and password.
    The only allowed value is the case-insensitive string `UTF-8`.
    This does not relate to the encoding of the realm string.

### Digest authentication directives

- `<realm>` (optional)
    A `<realm>` as described above indicating which username/password to use.
    Minimally should include the host name, but might indicate the users or group that have access.
- `domain` (optional)
    A quoted, space-separated list of URI prefixes that define all the locations where the authentication information may be used.
    If this key is not specified then the authentication information may be used anywhere on the web root.
- `nonce`
    A server-specified quoted string that the server can use to control the lifetime in which particular credentials will be considered valid.
    This must be uniquely generated each time a 401 response is made, and may be regenerated more often (for example, allowing a digest to be used only once).
    The specification contains advice on possible algorithms for generating this value.
    The nonce value is opaque to the client.
- `opaque`
    A server-specified quoted string that should be returned unchanged in the `Authorization`.
    This is opaque to the client. The server is recommended to include Base64 or hexadecimal data.
- `stale` (optional)
    A case-insensitive flag indicating that the previous request from the client was rejected because the `nonce` used is too old (stale).
    If this is `true` the request can be retried using the same username/password <example-value> using the new `nonce`.
    If it is any other value then the username/password are invalid and must be re-requested from the user.
- `algorithm` (optional)
    A string indicating the algorithm used to produce a digest.
    Valid non-session values are: `MD5` (default if `algorithm` not specified), `SHA-256`, `SHA-512`.
    Valid session values are: `MD5-sess`, `SHA-256-sess`, `SHA-512-sess`.
- `qop`
    Quoted string indicating the quality of protection supported by the server. This must be supplied, and unrecognized options must be ignored.
    - `"auth"`: Authentication
    - `"auth-int"`: Authentication with integrity protection
- `charset="UTF-8"` (optional)
    Tells the client the server's preferred encoding scheme when submitting a username and password.
    The only allowed value is the case-insensitive string "UTF-8".
- `userhash` (optional)
    A server may specify `"true"` to indicate that it supports username hashing (default is `"false"`)

### HTTP Origin-Bound Authentication (HOBA)

- `<challenge>`
    A set of pairs in the format of `<len>:<value>` concatenated together to be given to a client.
    The challenge is made of up a nonce, algorithm, origin, realm, key <example-value>, and the challenge.
- `<max-age>`
    The number of seconds from the time the HTTP response is emitted for which responses to this challenge can be accepted.
- `<realm>` (optional)
    As above in the directives section.

## Examples

### Issuing multiple authentication challenges

Multiple challenges may be specified in a single response header:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: challenge1, …, challengeN
```

Multiple challenges can be sent in separate `WWW-Authenticate` headers in the same response:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: challenge1
WWW-Authenticate: challengeN
```

### Basic <example-value>

A server that only supports basic <example-value> might have a `WWW-Authenticate` response header which looks like this:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic <example-value>"Staging server", charset="UTF-8"
```

A user-agent receiving this header would first prompt the user for their username and password, and then re-request the resource with the encoded credentials in the `Authorization` header.
The `Authorization` header might look like this:

```http
Authorization: Basic <example-value>
```

For `Basic` authentication, the credentials are constructed by first combining the username and the password with a colon (`aladdin:opensesame`), and then by encoding the resulting string in `base64` (`YWxhZGRpbjpvcGVuc2VzYW1l`).

> **Note:**
> See also HTTP authentication for examples on how to configure Apache or Nginx servers to password <example-value> your site with HTTP basic authentication.

### Digest authentication with SHA-256 and MD5

> **Note:**
> This example is taken from 7616 "HTTP Digest Access Authentication" (other examples in the specification show the use of `SHA-512`, `charset`, and `userhash`).

The client attempts to access a document at URI `http://www.example.org/dir/index.html` that is protected via digest authentication.
The username for this document is "<example-value>" and the password is "<example-value>" (note the single space between each of the words).

The first time the client requests the document, no `Authorization` header field is sent.
Here the server responds with an HTTP 401 message that includes a challenge for each digest algorithm it supports, in its order of preference (`SHA256` and then `MD5`)

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Digest
    realm="user@example.com",
    qop="auth, auth-int",
    algorithm=SHA-256,
    nonce="7ypf/xlj9XXwfDPEoM4URrv/xwf94BcCAzFZH4GiTo0v",
    opaque="FQhe/qaU925kfnzjCev0ciny7QMkPqMAFRtzCUYo5tdS"
WWW-Authenticate: Digest
    realm="user@example.com",
    qop="auth, auth-int",
    algorithm=MD5,
    nonce="7ypf/xlj9XXwfDPEoM4URrv/xwf94BcCAzFZH4GiTo0v",
    opaque="FQhe/qaU925kfnzjCev0ciny7QMkPqMAFRtzCUYo5tdS"
```

The client prompts the user for their username and password, and then responds with a new request that encodes the credentials in the `Authorization` header field.
If the client chose the MD5 digest the `Authorization` header field might look as shown below:

```http
Authorization: Digest username="Mufasa",
    realm="user@example.com",
    uri="/dir/index.html",
    algorithm=MD5,
    nonce="7ypf/xlj9XXwfDPEoM4URrv/xwf94BcCAzFZH4GiTo0v",
    nc=00000001,
    cnonce="f2/wE4q74E6zIJEtWaHKaf5wv/H5QzzpXusqGemxURZJ",
    qop=auth,
    response="8ca523f5e9506fed4657c9700eebdbec",
    opaque="FQhe/qaU925kfnzjCev0ciny7QMkPqMAFRtzCUYo5tdS"
```

If the client chose the SHA-256 digest the `Authorization` header field might look as shown below:

```http
Authorization: Digest username="Mufasa",
    realm="user@example.com",
    uri="/dir/index.html",
    algorithm=SHA-256,
    nonce="7ypf/xlj9XXwfDPEoM4URrv/xwf94BcCAzFZH4GiTo0v",
    nc=00000001,
    cnonce="f2/wE4q74E6zIJEtWaHKaf5wv/H5QzzpXusqGemxURZJ",
    qop=auth,
    response="753927fa0e85d155564e2e272a28d1802ca10daf449
        6794697cf8db5856cb6c1",
    opaque="FQhe/qaU925kfnzjCev0ciny7QMkPqMAFRtzCUYo5tdS"
```

### HOBA Authentication

A server that supports HOBA authentication might have a `WWW-Authenticate` response header which looks like this:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: HOBA max-age="180", challenge="16:MTEyMzEyMzEyMw==1:028:https://www.example.com:8080:3:MTI48:NjgxNDdjOTctNDYxYi00MzEwLWJlOWItNGM3MDcyMzdhYjUz"
```

The to-be-signed blob challenge is made from these parts: `www.example.com` using port 8080, the nonce is `1123123123`, the algorithm for signing is RSA-SHA256, the key <example-value> is `123`, and finally the challenge is `68147c97-461b-4310-be9b-4c707237ab53`.

A client would receive this header, extract the challenge, sign it with their private key that corresponds to key <example-value> 123 in our example using RSA-SHA256, and then send the result in the `Authorization` header as a dot-separated key id, challenge, nonce, and signature.

```http
Authorization: 123.16:MTEyMzEyMzEyMw==1:028:https://www.example.com:8080:3:MTI48:NjgxNDdjOTctNDYxYi00MzEwLWJlOWItNGM3MDcyMzdhYjUz.1123123123.<signature-of-challenge>
```

## See also

- HTTP authentication
- `Authorization`
- `Proxy-Authorization`
- `Proxy-Authenticate`
- `401`, `403`, `407`

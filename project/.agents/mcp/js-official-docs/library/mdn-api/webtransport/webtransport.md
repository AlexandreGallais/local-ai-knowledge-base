---
title: "WebTransport: WebTransport() constructor (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/webtransport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: WebTransport() constructor

The **`WebTransport()`** constructor creates a new `WebTransport` object instance.

## Syntax

```js
new WebTransport(url)
new WebTransport(url, options)
```

### Parameters

- `url`
    A string representing the URL of the HTTP/3 server to connect to.
    The scheme must be HTTPS, and the port number needs to be explicitly specified.
- `options` (optional)
    An object that may have the following properties:
    - `allowPooling` (optional)
        A boolean value.
        If `true`, the network connection for this `WebTransport` can be shared with a pool of other HTTP/3 sessions.
        By default the value is `false`, and the connection cannot be shared.
    - `anticipatedConcurrentIncomingBidirectionalStreams` (optional) (experimental)
        An integer between `0` and `65535`, or `null`, that indicates the number of incoming bidirectional streams that the application expects the server to have open at the same time.

        This is a hint that the browser can use to raise its limit on server-opened streams in advance.
        By default the value is `null`, and no hint is given.
        The value is available afterwards in the `anticipatedConcurrentIncomingBidirectionalStreams` property.

    - `anticipatedConcurrentIncomingUnidirectionalStreams` (optional) (experimental)
        An integer between `0` and `65535`, or `null`, that indicates the number of incoming unidirectional streams that the application expects the server to have open at the same time.

        This is a hint that the browser can use to raise its limit on server-opened streams in advance.
        By default the value is `null`, and no hint is given.
        The value is available afterwards in the `anticipatedConcurrentIncomingUnidirectionalStreams` property.

    - `congestionControl` (optional)
        A string indicating the application's preference that the congestion control algorithm used when sending data over this connection be tuned for either throughput or low-latency.
        This is a hint to the user agent.
        The allowed values are: `default` (default), `throughput`, and `low-latency`.
    - `datagramsReadableType` (optional)
        A string that sets the type of the `ReadableStream` that the new transport uses for incoming datagrams.
        You access this stream as `transport.datagrams.readable` (see `WebTransport.datagrams` and `WebTransportDatagramDuplexStream.readable`).
        The only allowed value is `bytes`, which creates a readable byte stream.
        This stream can be read with a `ReadableStreamBYOBReader`, which reads each datagram into a buffer that you supply.
        If this option is omitted, the transport creates a default readable stream, in which each chunk is a new `Uint8Array` containing one datagram.

        Reading into your own buffer lets you reuse the same memory for every datagram, instead of the browser allocating new memory for each one.
        This is most useful when an application receives datagrams at a high rate, for example to deliver frequent game state or sensor updates.

        Unless you use the `min` option, each read returns one datagram.
        If the supplied buffer is smaller than the datagram, the stream is errored, and the pending `read()` rejects with a `RangeError`.
        To avoid this, use a buffer of at least 64 KiB (65536 bytes), which is the recommended maximum size of the QUIC frames that carry datagrams.
        Use a `Uint8Array` as the view passed to `read()`: a `DataView` or a typed array with multi-byte elements errors the stream, and `read()` rejects with a `TypeError`.

        > **Note:**
        > A byte stream doesn't fully preserve datagram boundaries: empty datagrams are not delivered, and reading with the `min` option can combine several datagrams into one read.

    - `headers` (optional)
        An object literal, array, or `Headers` object that can be used to add custom HTTP request headers to the extended `CONNECT` request that sets up the session.
        This allows information such as authentication tokens to be sent to the server in request headers when the session is established, rather than in the URL query string.
        By default, the value is `{}`, and no custom headers are added.

        The value has the same form as the `init` parameter of the `Headers()` constructor: an object literal with string values, an array of two-item `[name, value]` arrays, or an existing `Headers` object.
        Forbidden request headers, such as `Cookie`, are silently ignored.
        The `WT-Available-Protocols` header can't be set using this option, and is instead set from the values in `protocols`.

        The headers that the server sends in its response, other than `WT-Protocol`, can be read from `WebTransport.responseHeaders` once the session is established.

    - `protocols` (optional)
        An array of strings, each indicating an application-specific protocol name, listed in order of preference.
        By default, the value is an empty array.

        The server may select and return one of the protocols.
        In this case, the selected value becomes available in the `protocol` property once the `ready` promise fulfills.
        The server may also choose not to select any of the offered protocols, in which case `protocol` will return an empty string (`""`).
        The server may also reject the connection if it doesn't support any of the protocols, in which case `ready` will reject with an error.

    - `requireUnreliable` (optional)
        A boolean value.
        If `true`, the connection cannot be established over HTTP/2 if an HTTP/3 connection is not possible.
        By default, the value is `false`.
    - `serverCertificateHashes` (optional)
        An array of objects, each defining the hash value of a server certificate along with the name of the algorithm that was used to generate it.
        This option is only supported for transports using dedicated connections (`allowPooling` is `false`).

        If specified, the browser will attempt to authenticate the certificate provided by the server against the provided certificate hash(es) in order to connect, instead of using the Web public key <example-value> (PKI).
        If any hashes match, the browser knows that the server possesses a trusted certificate and will connect as normal.
        If empty, the user agent uses the same PKI certificate verification procedures it would use for a normal fetch operation.

        This feature allows developers to connect to WebTransport servers that would normally find it challenging to obtain a publicly trusted certificate, such as hosts that are not publicly routable, or ephemeral hosts like virtual machines.

        > **Note:**
        > The web application might typically fetch the hashes from a trusted intermediary.
        > For example, you might use a cloud provider to provision VMs that run your WebTransport servers.
        > The provider has trusted access to the server and can request its certificate, generate hashes, and provide these to the application via an API (mediated via PKI) or a cloud console.
        > The web application can now connect directly to the VM-hosted server using the supplied hashes, even though the VM itself does not have a long-lived TLS certificate.

        The certificate must be an X.509v3 certificate with a validity period of less than 2 weeks, and the current time must be within that validity period.
        The format of the public key in the certificate depends on the implementation, but must minimally include ECDSA with the secp256r1 (NIST P-256) named group, and must not include RSA keys.
        An ECDSA key is, therefore, an interoperable default public key format.
        A user agent may add further requirements; these will be listed in the browser compatibility section if known.

        Each object in the array has the following properties:
        - `algorithm`
            A string with the value: `sha-256` (case-insensitive).
            Note that this string represents the algorithm to use to verify the hash, and that any hash using an unknown algorithm will be ignored.
            At the time of writing, `SHA-256` is the only hash algorithm listed in the specification.

        - `value`
            An `ArrayBuffer`, `TypedArray` or `DataView` containing the hash value.

### Return value

A new `WebTransport` object.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if `serverCertificateHashes` is specified but the transport protocol does not support this feature.
- `SyntaxError`
    Thrown if the specified `url` is invalid, if the scheme is not HTTPS, or if the URL includes a fragment.
    Also thrown if `protocols` contains a duplicate value, a value with characters not allowed in a protocol token, or a value whose encoded length is `0` or greater than `512` bytes.
- `TypeError`
    Thrown if a `serverCertificateHashes` is set for a non-dedicated connection (in other words, if `allowPooling` is `true`).
    Also thrown if `anticipatedConcurrentIncomingBidirectionalStreams` or `anticipatedConcurrentIncomingUnidirectionalStreams` is outside the range `0` to `65535`.
    Also thrown if `headers` contains an entry that isn't a two-item array, an invalid header name or value, or a header named `WT-Available-Protocols` (case-insensitive).

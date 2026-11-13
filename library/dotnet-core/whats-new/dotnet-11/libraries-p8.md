---
title: "What's new in .NET libraries for .NET 11 (part 8 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 8 of 8)

## Cryptography

- X25519 Diffie-Hellman key exchange
- CryptographicOperations.FixedTimeEquals overload
- AES Key Wrap
- Faster authenticated encryption on Apple platforms
- Experimental composite ML-KEM and HPKE APIs
- Encrypt CMS messages with ML-KEM

### X25519 Diffie-Hellman key exchange

The new `System.Security.Cryptography.X25519DiffieHellman` abstract class provides a clean API for the X25519 elliptic-curve Diffie-Hellman algorithm, which is widely used in TLS 1.3, SSH, and Signal-protocol implementations. Platform-specific implementations are provided through `System.Security.Cryptography.X25519DiffieHellmanCng` (Windows) and `System.Security.Cryptography.X25519DiffieHellmanOpenSsl` (Linux and macOS), but the portable `GenerateKey()` factory method picks the right one automatically:

```csharp
// Generate key pairs for Alice and Bob
using X25519DiffieHellman alice = X25519DiffieHellman.GenerateKey();
using X25519DiffieHellman bob = X25519DiffieHellman.GenerateKey();

// Each party derives the shared secret using the other's public key
byte[] aliceShared = alice.DeriveRawSecretAgreement(bob);
byte[] bobShared = bob.DeriveRawSecretAgreement(alice);

// Both parties arrive at the same secret
Console.WriteLine(aliceShared.SequenceEqual(bobShared)); // True
```
The class supports the full key lifecycle: key generation, PKCS#8 and SubjectPublicKeyInfo import/export, PEM serialization, and raw private/public key access.

### CryptographicOperations.FixedTimeEquals overload

For secret-comparison scenarios where the expected value is a single known byte, use the new `System.Security.Cryptography.CryptographicOperations.FixedTimeEquals*` overload that compares a `System.ReadOnlySpan`1` with a single `byte` value in constant time:

```csharp
bool equal = CryptographicOperations.FixedTimeEquals(receivedSpan, 0x42);
```

### AES Key Wrap

`System.Security.Cryptography.Aes` now supports the AES Key Wrap algorithms used by JOSE and other libraries to encrypt cryptographic keys:

- `System.Security.Cryptography.Aes.EncryptKeyWrapPadded*`, `System.Security.Cryptography.Aes.DecryptKeyWrapPadded*`, `System.Security.Cryptography.Aes.TryDecryptKeyWrapPadded(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@)`, and `System.Security.Cryptography.Aes.GetKeyWrapPaddedLength(System.Int32)` implement the padded AES-KWP algorithm (RFC 5649).
- `System.Security.Cryptography.Aes.EncryptKeyWrap*`, `System.Security.Cryptography.Aes.DecryptKeyWrap*`, `System.Security.Cryptography.Aes.TryDecryptKeyWrap(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@)`, and `System.Security.Cryptography.Aes.GetKeyWrapLength(System.Int32)` implement the unpadded AES Key Wrap algorithm (RFC 3394), which requires plaintext that's a multiple of 8 bytes.

Both sets of APIs provide array-returning and span-based overloads:

```csharp
using Aes aes = Aes.Create();
aes.Key = RandomNumberGenerator.GetBytes(32); // AES-256 key-encryption key

byte[] keyToWrap = RandomNumberGenerator.GetBytes(24); // Multiple of 8 bytes

// Unpadded AES Key Wrap (RFC 3394)
byte[] wrapped = aes.EncryptKeyWrap(keyToWrap);
byte[] unwrapped = aes.DecryptKeyWrap(wrapped);
Console.WriteLine(keyToWrap.SequenceEqual(unwrapped)); // True

// Padded AES-KWP (RFC 5649) accepts a plaintext of any length
byte[] arbitraryLengthKey = RandomNumberGenerator.GetBytes(19);
byte[] wrappedPadded = aes.EncryptKeyWrapPadded(arbitraryLengthKey);
byte[] unwrappedPadded = aes.DecryptKeyWrapPadded(wrappedPadded);
Console.WriteLine(arbitraryLengthKey.SequenceEqual(unwrappedPadded)); // True
```
### Faster authenticated encryption on Apple platforms

`System.Security.Cryptography.AesGcm` and `System.Security.Cryptography.ChaCha20Poly1305` avoid passing empty associated data to CryptoKit on Apple platforms, letting the native implementation use its empty-AAD fast path. On Apple platforms version 26 and later, encryption also skips a copy that was previously required for older Foundation implementations.

### Experimental composite ML-KEM and HPKE APIs

> **Warning:**
> `System.Security.Cryptography.CompositeMLKem` and `System.Security.Cryptography.Hpke` are experimental in .NET 11 and might change. Direct use requires you to opt in to the `SYSLIB5006` diagnostic for `CompositeMLKem` and the `SYSLIB5009` diagnostic for `Hpke`.

`System.Security.Cryptography.CompositeMLKem` combines post-quantum and classical key encapsulation so that both contribute to the shared secret. It's available on platforms that already support Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM). Call `System.Security.Cryptography.CompositeMLKem.IsAlgorithmSupported*` to determine whether the platform supports a particular combination of algorithms.

`System.Security.Cryptography.Hpke` provides a managed implementation of Hybrid Public Key Encryption (HPKE). Build an `System.Security.Cryptography.HpkeSuite` from `System.Security.Cryptography.HpkeKem`, `System.Security.Cryptography.HpkeKdf`, and `System.Security.Cryptography.HpkeAead` values. Check `System.Security.Cryptography.Hpke.IsSupported*` for the suite you select. The following example uses `System.Security.Cryptography.Hpke.GenerateKey*` to create the recipient's key pair, then encrypts and decrypts data with `System.Security.Cryptography.Hpke.Seal*` and `System.Security.Cryptography.Hpke.Open*`:

```csharp
var suite = new HpkeSuite(HpkeKem.DHKEM_P256_HKDF_SHA256, HpkeKdf.HKDF_SHA256, HpkeAead.AES_128_GCM);
using var recipient = Hpke.GenerateKey(suite);
using var sender = Hpke.ImportEncapsulationKey(suite, recipient.ExportEncapsulationKey());
sender.Seal("Hello"u8, out byte[] encapsulatedSecret, out byte[] ciphertext);
byte[] plaintext = recipient.Open(encapsulatedSecret, ciphertext);
Console.WriteLine(Encoding.UTF8.GetString(plaintext));
```

Algorithm-suite availability varies by platform. The example uses a classical Diffie-Hellman key encapsulation mechanism (DHKEM) suite.

### Encrypt CMS messages with ML-KEM

The Cryptographic Message Syntax (CMS) API, `System.Security.Cryptography.Pkcs.EnvelopedCms`, can encrypt and decrypt messages by using ML-KEM key encapsulation mechanism (KEM) recipients. Support is limited to the pure ML-KEM algorithm, and it's available only on non-Windows platforms.

## Networking and transport security

- TLS handshake hardening
- Experimental caller-driven TLS sessions
- HTTP request compression
- Configurable HTTP connection eviction
- Initial HTTP/2 concurrency
- DNS record resolution APIs
- HTTP/2 automatic downgrade for Windows authentication
- QUIC stream priority
- Video MIME type constants
- HTTP metrics use observable instruments

### TLS handshake hardening

Two `System.Net.Security` items improve TLS (Transport Layer Security) reliability:

- `System.Net.Security.SslStream` server-side handshake bounds-checking fixes in `TlsFrameHelper` close several edge cases that could surface as `IOException` on malformed ClientHello records.
- On Linux, certificate-validation failures now surface as standard TLS alerts to the peer, matching Windows behavior. Connecting clients receive an actionable handshake error instead of a connection drop.

Negotiate authentication servers can also validate TLS channel binding tokens on Unix. The managed GSSAPI path passes the channel binding data to `gss_accept_sec_context`, which rejects a mismatch in the same way as the existing Unix client path. This enables Extended Protection scenarios, such as ASP.NET Core's Negotiate authentication, that bind authentication to the underlying TLS connection.

### Experimental caller-driven TLS sessions

> **Warning:**
> The `TlsContext`, `TlsSession`, `TlsBufferSession`, `TlsSocketSession`, and `TlsOperationStatus` types are experimental in .NET 11 and report diagnostic `SYSLIB5007`.

`System.Net.Security` adds a caller-driven, non-blocking TLS state machine for advanced transports where the application controls buffers and I/O scheduling. `TlsBufferSession` operates over caller-provided spans, while `TlsSocketSession` works with a `SafeSocketHandle`.

Operations such as `Handshake`, `Read`, `Write`, `Shutdown`, and `RequestClientCertificate` return `TlsOperationStatus`, which reports whether an operation completed, needs more input, needs a larger destination buffer, or requires certificate validation or a new `TlsContext`.

### HTTP request compression

`System.Net.Http` adds `System.Net.Http.GZipCompressedContent`, `System.Net.Http.BrotliCompressedContent`, and `System.Net.Http.ZstandardCompressedContent` wrappers for request bodies. These wrappers set the `Content-Encoding` header and stream compressed content as the request serializes.

### Configurable HTTP connection eviction

`System.Net.Http.SocketsHttpHandler` now provides `System.Net.Http.SocketsHttpHandler.ShouldEvictConnection` for per-connection eviction decisions. This callback lets you retire connections based on age, endpoint details, and DNS changes instead of fixed lifetime-only policies.

### Initial HTTP/2 concurrency

`SocketsHttpHandler.InitialHttp2MaxConcurrentStreams` limits the number of concurrent streams on each new HTTP/2 connection before the server's `SETTINGS` frame arrives. If you know that a server's stream limit is lower than the default of 100, set a lower value to limit the initial burst of requests on that connection. After the connection receives the `SETTINGS` frame, it uses the server's advertised limit.

The property requires a value of at least 1. If an earlier connection to the same host advertised a lower limit, that limit can further reduce the initial concurrency for the host.

```csharp
var handler = new SocketsHttpHandler
{
    InitialHttp2MaxConcurrentStreams = 20
};
using var client = new HttpClient(handler);
```

### DNS record resolution APIs

`System.Net.Dns` adds typed record-resolution APIs, including `System.Net.Dns.ResolveSrv(System.String)`, `System.Net.Dns.ResolveMx(System.String)`, `System.Net.Dns.ResolveTxt(System.String)`, `System.Net.Dns.ResolveCName(System.String)`, `System.Net.Dns.ResolvePtr(System.String)`, and `System.Net.Dns.ResolveNs(System.String)`, together with `Async` variants. The results include records, response code, and negative-cache time-to-live (TTL) metadata through `System.Net.DnsResult`1`.

The new `System.Net.DnsResolver` class provides the same record types through an instance API that accepts a `System.Net.DnsResolverOptions` object, which lets you supply a custom list of DNS servers instead of using the platform resolver configuration. `DnsResolver` and the static `Dns.Resolve*` methods now work on Linux in addition to Windows and macOS.

### HTTP/2 automatic downgrade for Windows authentication

`System.Net.Http.HttpClient` automatically downgrades to HTTP/1.1 when a request requires Windows authentication (NTLM/Negotiate) over HTTP/2. The HTTP/2 specification disallows the connection-bound authentication schemes that NTLM and Kerberos rely on, so these requests previously failed. With the downgrade in place, applications targeting mixed-authentication environments—common in enterprise intranets—work without explicit `HttpRequestMessage.Version` overrides.

### QUIC stream priority

`System.Net.Quic.QuicStream` gains a `System.Net.Quic.QuicStream.Priority` property and a `System.Net.Quic.QuicStream.DefaultPriority` constant that exposes HTTP/3 stream prioritization (RFC 9218). Priority values range from 0 (highest) to 255 (lowest), with a default of 127:

```csharp
// Increase priority for interactive streams
stream.Priority = 64; // Higher priority than the default 127
```

### Video MIME type constants

A new `System.Net.Mime.MediaTypeNames.Video` class provides string constants for common video media types:

- `MediaTypeNames.Video.Mp4` — `"video/mp4"`
- `MediaTypeNames.Video.Mpeg` — `"video/mpeg"`
- `MediaTypeNames.Video.Ogg` — `"video/ogg"`
- `MediaTypeNames.Video.QuickTime` — `"video/quicktime"`
- `MediaTypeNames.Video.WebM` — `"video/webm"`

These join the existing `MediaTypeNames.Application`, `MediaTypeNames.Image`, `MediaTypeNames.Text`, and `MediaTypeNames.Multipart` classes.

### HTTP metrics use observable instruments

The high-cardinality HTTP `open_connections` and `active_requests` metrics are now observable instruments instead of regular counters. If you use `System.Diagnostics.Metrics.MeterListener` directly to read these metrics, call `System.Diagnostics.Metrics.MeterListener.RecordObservableInstruments` to receive measurements from them.

## See also

- What's new in the .NET 11 runtime
- What's new in the SDK for .NET 11
- Breaking changes in .NET 11

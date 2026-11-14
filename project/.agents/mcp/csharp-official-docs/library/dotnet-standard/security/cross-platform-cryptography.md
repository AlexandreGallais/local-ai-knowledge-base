---
title: "Cross-platform cryptography (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/cross-platform-cryptography.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cross-platform cryptography in .NET

Cryptographic operations in .NET are done by operating system (OS) libraries. This dependency has advantages:

* .NET apps benefit from OS reliability. Keeping cryptography libraries safe from vulnerabilities is a high priority for OS vendors. To do that, they provide updates that system administrators should be applying.
* .NET apps have access to FIPS-validated algorithms if the OS libraries are FIPS-validated.

The dependency on OS libraries also means that .NET apps can only use cryptographic features that the OS supports. While all platforms support certain core features, some features that .NET supports can't be used on some platforms. This article identifies the features that are supported on each platform.

This article assumes you have a working familiarity with cryptography in .NET. For more information, see .NET Cryptography Model and .NET Cryptographic Services.

## Hash and Message Authentication Algorithms

All hash algorithm and hash-based message authentication (HMAC) classes, including the `*Managed` classes, defer to the OS libraries with the exception of .NET on Browser WASM. In Browser WASM, SHA-1, SHA-2-256, SHA-2-384, SHA-2-512 and the HMAC equivalents are implemented using managed code.

|Algorithm                  |Windows                 |Linux                       |macOS|iOS, tvOS, MacCatalyst|Android|Browser|
|---------------------------|------------------------|----------------------------|-----|----------------------|-------|-------|
|MD5                        | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |❌     |
|SHA-1                      | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|SHA-2-256                  | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|SHA-2-384                  | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|SHA-2-512                  | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|SHA-3-256                  | Windows 11 Build 25324+| OpenSSL 1.1.1+             |❌    |❌                   |❌     |❌     |
|SHA-3-384                  | Windows 11 Build 25324+| OpenSSL 1.1.1+             |❌    |❌                   |❌     |❌     |
|SHA-3-512                  | Windows 11 Build 25324+| OpenSSL 1.1.1+             |❌    |❌                   |❌     |❌     |
|SHAKE-128                  | Windows 11 Build 25324+| OpenSSL 1.1.1+2 |❌    |❌                   |❌     |❌     |
|SHAKE-256                  | Windows 11 Build 25324+| OpenSSL 1.1.1+2 |❌    |❌                   |❌     |❌     |
|HMAC-MD5                   | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |❌     |
|HMAC-SHA-1                 | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|HMAC-SHA-2-256             | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|HMAC-SHA-2-384             | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|HMAC-SHA-2-512             | ✔️                     | ✔️                        |✔️   |✔️                    |✔️     |✔️     |
|HMAC-SHA-3-256             | Windows 11 Build 25324+| OpenSSL 1.1.1+            |❌    |❌                   |❌      |❌     |
|HMAC-SHA-3-384             | Windows 11 Build 25324+| OpenSSL 1.1.1+            |❌    |❌                   |❌      |❌     |
|HMAC-SHA-3-512             | Windows 11 Build 25324+| OpenSSL 1.1.1+            |❌    |❌                   |❌      |❌     |
|KMAC-1281       | Windows 11 Build 26016+| OpenSSL 3.0+              |❌    |❌                   |❌      |❌     |
|KMAC-2561       | Windows 11 Build 26016+| OpenSSL 3.0+              |❌    |❌                   |❌      |❌     |
|KMAC-XOF-1281   | Windows 11 Build 26016+| OpenSSL 3.0+              |❌    |❌                   |❌      |❌     |
|KMAC-XOF-2561   | Windows 11 Build 26016+| OpenSSL 3.0+              |❌    |❌                   |❌      |❌     |

1Available starting in .NET 9.

2Streaming extensible output function (XOF) is available starting in .NET 9. On Linux, this requires OpenSSL 3.3.

## Symmetric encryption

The underlying ciphers and chaining are done by the system libraries.

| Cipher + Mode | Windows  | Linux | macOS | iOS, tvOS, MacCatalyst | Android |
|---------------|----------|-------|-------|------------------------|---------|
| AES-CBC       | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| AES-ECB       | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| AES-CFB8      | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| AES-CFB128    | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| 3DES-CBC      | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| 3DES-ECB      | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| 3DES-CFB8     | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| 3DES-CFB64    | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| DES-CBC       | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| DES-ECB       | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| DES-CFB8      | ✔️       | ✔️    | ✔️   | ✔️                     | ✔️      |
| RC2-CBC       | ✔️       | ✔️    | ✔️   | ✔️                     | ❌      |
| RC2-ECB       | ✔️       | ✔️    | ✔️   | ✔️                     | ❌      |
| RC2-CFB       | ❌       | ❌    | ❌   | ❌                     | ❌      |

## Authenticated encryption

Authenticated encryption (AE) support is provided for AES-CCM, AES-GCM, and ChaCha20Poly1305 via the `System.Security.Cryptography.AesCcm`, `System.Security.Cryptography.AesGcm`, and `System.Security.Cryptography.ChaCha20Poly1305` classes, respectively.

Since authenticated encryption requires newer platform APIs to support the algorithm, support might not be present on all platforms. To detect at runtime whether the current platform supports the algorithm, you can use the `IsSupported` static property on the class for the algorithm.

| Cipher + Mode     | Windows                 | Linux          | macOS   | iOS, tvOS, MacCatalyst | Android       | Browser |
|-------------------|-------------------------|----------------|---------|------------------------|---------------|---------|
| AES-GCM           | ✔️                      | ✔️            | ✔️      | ⚠️                     | ✔️            | ❌      |
| AES-CCM           | ✔️                      | ✔️            | ❌      | ❌                     | ✔️            | ❌      |
| ChaCha20Poly1305  | Windows 10 Build 20142+ | OpenSSL 1.1.0+ | ✔️      | ⚠️                     | API Level 28+ | ❌      |

### AES-CCM on macOS

Prior to .NET 10, AES-CCM worked if a supported version of OpenSSL was present and the dynamic library loader could locate it. OpenSSL support on macOS was removed in .NET 10.

### AES-GCM and ChaCha20Poly1305 on iOS, tvOS, and MacCatalyst

Support for AES-GCM and ChaCha20Poly1305 is available starting in .NET 9 on iOS and tvOS 13.0 and later, and all versions of MacCatalyst.

### AES-CCM keys, nonces, and tags

* Key Sizes

  AES-CCM works with 128, 192, and 256-bit keys.

* Nonce Sizes

  The `System.Security.Cryptography.AesCcm` class supports 56, 64, 72, 80, 88, 96, and 104-bit (7, 8, 9, 10, 11, 12, and 13-byte) nonces.

* Tag Sizes

  The `System.Security.Cryptography.AesCcm` class supports creating or processing 32, 48, 64, 80, 96, 112, and 128-bit (4, 8, 10, 12, 14, and 16-byte) tags.

### AES-GCM keys, nonces, and tags

* Key Sizes

  AES-GCM works with 128, 192, and 256-bit keys.

* Nonce Sizes

  The `System.Security.Cryptography.AesGcm` class supports only 96-bit (12-byte) nonces.

* Tag Sizes

  On Windows and Linux, the `System.Security.Cryptography.AesGcm` class supports creating or processing 96, 104, 112, 120, and 128-bit (12, 13, 14, 15, and 16-byte) tags. On Apple platforms, the tag size is limited to 128-bit (16-byte) due to limitations of the CryptoKit framework.

### ChaCha20Poly1305 keys, nonces, and tags

ChaCha20Poly1305 has a fixed size for the key, nonce, and authentication tag. ChaCha20Poly1305 always uses a 256-bit key, a 96-bit (12-byte) nonce, and 128-bit (16-byte) tag.

---
title: "Cross-platform cryptography (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/cross-platform-cryptography.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cross-platform cryptography (part 4 of 4)

## X.509 Certificates

The majority of support for X.509 certificates in .NET comes from OS libraries. To load a certificate into an `System.Security.Cryptography.X509Certificates.X509Certificate2` or `System.Security.Cryptography.X509Certificates.X509Certificate` instance in .NET, the certificate must be loaded by the underlying OS library.

### Read a PKCS12/PFX

| Scenario                                     | Windows | Linux | macOS | iOS, tvOS, MacCatalyst | Android |
|----------------------------------------------|---------|-------|-------|------------------------|---------|
| Empty                                        | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| One certificate, no private key              | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| One certificate, with private key            | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| Multiple certificates, no private keys       | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| Multiple certificates, one private key       | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| Multiple certificates, multiple private keys | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |

### Write a PKCS12/PFX

| Scenario                                     | Windows | Linux | macOS | iOS, tvOS, MacCatalyst | Android |
|----------------------------------------------|---------|-------|-------|--------------------------|---------|
| Empty                                        | ✔️      | ✔️    | ✔️   | ✔️                       | ✔️      |
| One certificate, no private key              | ✔️      | ✔️    | ✔️   | ✔️                       | ✔️      |
| One certificate, with private key            | ✔️      | ✔️    | ✔️   | ✔️                       | ✔️      |
| Multiple certificates, no private keys       | ✔️      | ✔️    | ✔️   | ✔️                       | ✔️      |
| Multiple certificates, one private key       | ✔️      | ✔️    | ✔️   | ✔️                       | ✔️      |
| Multiple certificates, multiple private keys | ✔️      | ✔️    | ✔️   | ✔️                       | ✔️      |
| Ephemeral loading                            | ✔️      | ✔️    | ❌   | ✔️                       | ✔️      |

macOS can't load certificate private keys without a keychain object, which requires writing to disk. Keychains are created automatically for PFX loading, and are deleted when no longer in use. Since the `System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.EphemeralKeySet` option means that the private key <example-value> not be written to disk, asserting that flag on macOS results in a `System.PlatformNotSupportedException`.

### Write a PKCS7 certificate collection

Windows and Linux both emit DER-encoded PKCS7 blobs. macOS emits indefinite-length-CER-encoded PKCS7 blobs.

### X509Store

On Windows, the `System.Security.Cryptography.X509Certificates.X509Store` class is a representation of the Windows Certificate Store APIs. Those APIs work the same in .NET as they do in .NET Framework.

On non-Windows, the `System.Security.Cryptography.X509Certificates.X509Store` class is a projection of system trust decisions (read-only), user trust decisions (read-write), and user key <example-value> (read-write).

The following tables show which scenarios are supported in each platform. For unsupported scenarios (❌ in the tables), a `System.Security.Cryptography.CryptographicException` is thrown.

#### The My store

| Scenario                                         | Windows | Linux | macOS | iOS, tvOS, MacCatalyst | Android |
|--------------------------------------------------|---------|-------|-------|------------------------|--------|
| Open CurrentUser\My (ReadOnly)                   | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| Open CurrentUser\My (ReadWrite)                  | ✔️      | ✔️    | ✔️   | ✔️                     | ✔️     |
| Open CurrentUser\My (ExistingOnly)               | ✔️      | ⚠️    | ✔️   | ✔️                     | ✔️     |
| Open LocalMachine\My                             | ✔️      | ❌    | ✔️   | ✔️                     | ✔️     |

On Linux, stores are created on first write, and no user stores exist by default, so opening `CurrentUser\My` with `ExistingOnly` may fail.

On macOS, the `CurrentUser\My` store is the user's default keychain, which is `login.keychain` by default. The `LocalMachine\My` store is `System.keychain`.

#### The Root store

| Scenario                              | Windows | Linux | macOS             | iOS, tvOS, MacCatalyst | Android          |
|---------------------------------------|---------|-------|-------------------|------------------------|------------------|
| Open CurrentUser\Root (ReadOnly)      | ✔️      | ✔️    | ✔️               | ❌                     | ✔️               |
| Open CurrentUser\Root (ReadWrite)     | ✔️      | ✔️    | ❌               | ❌                     | ❌               |
| Open CurrentUser\Root (ExistingOnly)  | ✔️      | ⚠️    | ✔️ (if ReadOnly) | ❌                     | ✔️ (if ReadOnly) |
| Open LocalMachine\Root (ReadOnly)     | ✔️      | ✔️    | ✔️               | ❌                     | ✔️               |
| Open LocalMachine\Root (ReadWrite)    | ✔️      | ❌    | ❌               | ❌                     | ❌               |
| Open LocalMachine\Root (ExistingOnly) | ✔️      | ⚠️    | ✔️ (if ReadOnly) | ❌                     | ✔️ (if ReadOnly) |

On Linux, the `LocalMachine\Root` store is an interpretation of the CA bundle in the default path for OpenSSL.

On macOS, the `CurrentUser\Root` store is an interpretation of the `SecTrustSettings` results for the user trust domain. The `LocalMachine\Root` store is an interpretation of the `SecTrustSettings` results for the admin and system trust domains.

##### Trusted root certificate locations on Linux

On Linux, .NET uses OpenSSL (libssl) to locate trusted root certificates. OpenSSL determines the certificate store location using environment variables (`SSL_CERT_FILE` and `SSL_CERT_DIR`) and distribution-specific default paths. When the root store directory configured for OpenSSL doesn't contain any certificates, .NET falls back to checking `/etc/ssl/certs`. This fallback ensures compatibility with distributions like SUSE Linux Enterprise Server (SLES) where the directory specified by `SSL_CERT_DIR` might only contain certificates with the `BEGIN TRUSTED CERTIFICATE` format, which .NET doesn't support as root certificates.

This fallback only occurs when:

1. The `SSL_CERT_DIR` environment variable isn't explicitly set.
1. The default certificate directory contains no usable certificates.

If your certificates aren't loading correctly, verify that:

* Your certificate files are in PEM format with the `BEGIN CERTIFICATE` marker (not `BEGIN TRUSTED CERTIFICATE`).
* The `SSL_CERT_DIR` and `SSL_CERT_FILE` environment variables point to the correct locations, if set.
* The certificate bundle file or directory has the appropriate read permissions.

#### The Intermediate store

| Scenario                                      | Windows | Linux | macOS             | iOS, tvOS, MacCatalyst | Android |
|-----------------------------------------------|---------|-------|-------------------|------------------------|---------|
| Open CurrentUser\Intermediate (ReadOnly)      | ✔️      | ✔️    | ✔️               | ❌                     | ❌     |
| Open CurrentUser\Intermediate (ReadWrite)     | ✔️      | ✔️    | ❌               | ❌                     | ❌     |
| Open CurrentUser\Intermediate (ExistingOnly)  | ✔️      | ⚠️    | ✔️ (if ReadOnly) | ❌                     | ❌     |
| Open LocalMachine\Intermediate (ReadOnly)     | ✔️      | ✔️    | ✔️               | ❌                     | ❌     |
| Open LocalMachine\Intermediate (ReadWrite)    | ✔️      | ❌    | ❌               | ❌                     | ❌     |
| Open LocalMachine\Intermediate (ExistingOnly) | ✔️      | ⚠️    | ✔️ (if ReadOnly) | ❌                     | ❌     |

On Linux, the `CurrentUser\Intermediate` store is used as a cache when downloading intermediate CAs by their Authority Information Access records on successful X509Chain builds. The `LocalMachine\Intermediate` store is an interpretation of the CA bundle in the default path for OpenSSL.

On macOS, the `CurrentUser\Intermediate` store is treated as a custom store. Certificates added to this store do not affect X.509 chain building.

#### The Disallowed store

| Scenario                                    | Windows | Linux | macOS            | iOS, tvOS, MacCatalyst | Android          |
|---------------------------------------------|---------|-------|------------------|------------------------|------------------|
| Open CurrentUser\Disallowed (ReadOnly)      | ✔️     | ⚠️    | ✔️               | ✔️                     | ✔️               |
| Open CurrentUser\Disallowed (ReadWrite)     | ✔️     | ⚠️    | ❌               | ❌                     | ❌               |
| Open CurrentUser\Disallowed (ExistingOnly)  | ✔️     | ⚠️    | ✔️ (if ReadOnly) | ✔️ (if ReadOnly)       | ✔️ (if ReadOnly) |
| Open LocalMachine\Disallowed (ReadOnly)     | ✔️     | ❌    | ✔️               | ✔️                     | ✔️               |
| Open LocalMachine\Disallowed (ReadWrite)    | ✔️     | ❌    | ❌               | ❌                     | ❌               |
| Open LocalMachine\Disallowed (ExistingOnly) | ✔️     | ❌    | ✔️ (if ReadOnly) | ✔️ (if ReadOnly)       | ✔️ (if ReadOnly) |

On Linux, the `Disallowed` store is not used in chain building, and attempting to add contents to it results in a `System.Security.Cryptography.CryptographicException`. A `System.Security.Cryptography.CryptographicException` is thrown when opening the `Disallowed` store if it has already acquired contents.

On macOS, the CurrentUser\Disallowed and LocalMachine\Disallowed stores are interpretations of the appropriate SecTrustSettings results for certificates whose trust is set to `Always Deny`.

#### Nonexistent store

| Scenario                                         | Windows | Linux | macOS | iOS, tvOS, MacCatalyst | Android |
|--------------------------------------------------|---------|-------|-------|------------------------|---------|
| Open non-existent store (ExistingOnly)           | ❌     | ❌     | ❌    | ❌                      | ❌    |
| Open CurrentUser non-existent store (ReadWrite)  | ✔️     | ✔️     | ⚠️    | ❌                      | ❌    |
| Open LocalMachine non-existent store (ReadWrite) | ✔️     | ❌     | ❌    | ❌                      | ❌    |

On macOS, custom store creation with the X509Store API is supported only for `CurrentUser` location. It will create a new keychain with no password in the user'<example-value>'s permissions.

### X509Chain

macOS doesn't support Offline CRL utilization, so `X509RevocationMode.Offline` is treated as `X509RevocationMode.Online`.

macOS doesn't support a user-initiated timeout on CRL (Certificate Revocation List) / OCSP (Online Certificate Status Protocol) / AIA (Authority Information Access) downloading, so `X509ChainPolicy.UrlRetrievalTimeout` is ignored.

### Post-quantum cryptography certificates and PKCS12/PFX

Post-quantum certificate support also requires support from the primitive algorithm.

| Operation               | Algorithm | Windows | Linux | Apple | Android | Browser |
|-------------------------|-----------|---------|-------|-------|---------|---------|
| PKCS#12 Import          | ML-DSA    | ✔️      | ✔️    | ❌     | ❌      | ❌      |
| PKCS#12 Export          | ML-DSA    | ✔️      | ✔️    | ❌     | ❌      | ❌      |
| Private Key <example-value> | ML-DSA    | ✔️      | ✔️    | ❌     | ❌      | ❌      |
|                    |           |         |       |       |         |         |
| PKCS#12 Import          | ML-KEM    | ❌      | ✔️    | ❌     | ❌      | ❌      |
| PKCS#12 Export          | ML-KEM    | ❌      | ✔️    | ❌     | ❌      | ❌      |
| Private Key <example-value> | ML-KEM    | ❌      | ✔️    | ❌     | ❌      | ❌      |
|                    |           |         |       |       |         |         |
| PKCS#12 Import          | SLH-DSA   | ❌      | ✔️    | ❌     | ❌      | ❌      |
| PKCS#12 Export          | SLH-DSA   | ❌      | ✔️    | ❌     | ❌      | ❌      |
| Private Key <example-value> | SLH-DSA   | ❌      | ✔️    | ❌     | ❌      | ❌      |

## Additional resources

* .NET Cryptography Model
* .NET Cryptographic Services
* Timing vulnerabilities with CBC-mode symmetric decryption using padding
* ASP.NET Core Data Protection

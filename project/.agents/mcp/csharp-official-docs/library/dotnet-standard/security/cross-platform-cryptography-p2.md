---
title: "Cross-platform cryptography (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/cross-platform-cryptography.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cross-platform cryptography (part 2 of 4)

## Asymmetric cryptography

This section includes the following subsections:

* RSA
* ECDSA
* ECDH
* DSA

### RSA

RSA (Rivest–Shamir–Adleman) key <example-value> is performed by the OS libraries and is subject to their size limitations and performance characteristics.

RSA key <example-value> are performed by the OS libraries, and the types of key that can be loaded are subject to OS requirements.

.NET does not expose "raw" (unpadded) RSA operations.

Padding and digest support vary by platform:

| Padding Mode                        | Windows (CNG)            | Linux (OpenSSL) | macOS  | iOS, tvOS, MacCatalyst | Android | Windows (CAPI) |
|-------------------------------------|--------------------------|-----------------|--------|------------------------|---------|----------------|
| PKCS1 Encryption                    | ✔️                       | ✔️              | ✔️    | ✔️                     | ✔️      | ✔️               |
| OAEP - SHA-1                        | ✔️                       | ✔️              | ✔️    | ✔️                     | ✔️      | ✔️               |
| OAEP - SHA-2                        | ✔️                       | ✔️              | ✔️    | ✔️                     | ✔️      | ❌               |
| OAEP - SHA-3                        | Windows 11 Build 25324+  | OpenSSL 1.1.1+  | ❌     | ❌                     | ❌     | ❌               |
| PKCS1 Signature (MD5, SHA-1)        | ✔️                       | ✔️              | ✔️    | ✔️                     | ✔️      | ✔️               |
| PKCS1 Signature (SHA-2)             | ✔️                       | ✔️              | ✔️    | ✔️                     | ✔️      | ⚠️1 |
| PKCS1 Signature (SHA-3)             | Windows 11 Build 25324+  | OpenSSL 1.1.1+  | ❌     |  ❌                    | ❌     | ❌               |
| PSS                                 | ✔️                       | ✔️              | ✔️    | ✔️                     | ✔️      | ❌               |

1 Windows CryptoAPI (CAPI) is capable of PKCS1 signature with a SHA-2 algorithm. But the individual RSA object may be loaded in a cryptographic service provider (CSP) that doesn't support it.

#### RSA on Windows

* Windows CryptoAPI (CAPI) is used whenever `new RSACryptoServiceProvider()` is used.
* Windows Cryptography API Next Generation (CNG) is used whenever `new RSACng()` is used.
* The object returned by `System.Security.Cryptography.RSA.Create*` is internally powered by Windows CNG. This use of Windows CNG is an implementation detail and is subject to change.
* The `System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPublicKey*` extension method for `System.Security.Cryptography.X509Certificates.X509Certificate2` returns an `System.Security.Cryptography.RSACng` instance. This use of `System.Security.Cryptography.RSACng` is an implementation detail and is subject to change.
* The `System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey*` extension method for `System.Security.Cryptography.X509Certificates.X509Certificate2` currently prefers an `System.Security.Cryptography.RSACng` instance, but if `System.Security.Cryptography.RSACng` can't open the key, `System.Security.Cryptography.RSACryptoServiceProvider` will be attempted. The preferred provider is an implementation detail and is subject to change.

#### RSA native interop

.NET exposes types to allow programs to interoperate with the OS libraries that the .NET cryptography code uses. The types involved do not translate between platforms, and should only be directly used when necessary.

| Type                                                         | Windows | Linux         | macOS           | iOS, tvOS, MacCatalyst  | Android         |
|--------------------------------------------------------------|---------|---------------|-----------------|-------------------------|-----------------|
| `System.Security.Cryptography.RSACryptoServiceProvider` | ✔️     | ⚠️1 | ⚠️1 | ⚠️1          | ⚠️1  |
| `System.Security.Cryptography.RSACng`                   | ✔️     | ❌             | ❌             | ❌                      | ❌              |
| `System.Security.Cryptography.RSAOpenSsl`               | ❌     | ✔️             | ❌2 | ❌                      | ❌              |

1 On non-Windows, `System.Security.Cryptography.RSACryptoServiceProvider` can be used for compatibility with existing programs. In that case, any method that requires OS interop, such as opening a named key, throws a `System.PlatformNotSupportedException`.

2 On macOS, prior to .NET 10, `System.Security.Cryptography.RSAOpenSsl` worked if OpenSSL was installed and an appropriate libcrypto dylib could be found via dynamic library loading. This support was removed in .NET 10.

### ECDSA

ECDSA (Elliptic Curve Digital Signature Algorithm) key <example-value> is done by the OS libraries and is subject to their size limitations and performance characteristics.

ECDSA key <example-value> are defined by the OS libraries and are subject to their limitations.

| Elliptic Curve                     | Windows 10     | Windows 7 - 8.1 | Linux           | macOS          | iOS, tvOS, MacCatalyst | Android        |
|------------------------------------|----------------|-----------------|-----------------|----------------|------------------------|----------------|
| NIST P-256 (secp256r1)             | ✔️             | ✔️              | ✔️             | ✔️             | ✔️                     | ✔️            |
| NIST P-384 (secp384r1)             | ✔️             | ✔️              | ✔️             | ✔️             | ✔️                     | ✔️            |
| NIST P-521 (secp521r1)             | ✔️             | ✔️              | ✔️             | ✔️             | ✔️                     | ✔️            |
| Brainpool curves (as named curves) | ✔️             | ❌              | ⚠️1 | ❌             | ❌                     | ⚠️4 |
| Other named curves                 | ⚠️2 | ❌              | ⚠️1 | ❌             | ❌                     | ⚠️4 |
| Explicit curves                    | ✔️             | ❌              | ✔️             | ❌             | ❌                     | ✔️             |
| Export or import as explicit       | ✔️             | ❌3  | ✔️             | ❌3 | ❌3         | ✔️             |

1 Linux distributions don't all have support for the same named curves.

2 Support for named curves was added to Windows CNG in Windows 10. For more information, see CNG Named Elliptic Curves. Named curves are not available in earlier versions of Windows, except for three curves in Windows 7.

3 Exporting with explicit curve parameters requires OS library support, which is not available on Apple platforms or earlier versions of Windows.

4 Android support for some curves depends on the Android version. Android distributors may choose to add or remove curves from their Android build as well.

#### ECDSA Native Interop

.NET exposes types to allow programs to interoperate with the OS libraries that the .NET cryptography code uses. The types involved don't translate between platforms and should only be directly used when necessary.

| Type                                             | Windows | Linux | macOS | iOS, tvOS, MacCatalyst | Android |
|--------------------------------------------------|---------|-------|-------|------------------------|---------|
| `System.Security.Cryptography.ECDsaCng`     | ✔️      | ❌   | ❌    | ❌                     | ❌      |
| `System.Security.Cryptography.ECDsaOpenSsl` | ❌      | ✔️   | ❌\*  | ❌                     | ❌      |

\* On macOS, prior to .NET 10, `System.Security.Cryptography.ECDsaOpenSsl` worked if OpenSSL was installed and an appropriate libcrypto dylib could be found via dynamic library loading. This support was removed in .NET 10.

### ECDH

ECDH (Elliptic Curve Diffie-Hellman) key <example-value> is done by the OS libraries and is subject to their size limitations and performance characteristics.

The `System.Security.Cryptography.ECDiffieHellman` class supports the "raw" value of the ECDH computation as well as through the following key <example-value> functions:

* HASH(Z)
* HASH(prepend || Z || append)
* HMAC(key, Z)
* HMAC(key, prepend || Z || append)
* HMAC(Z, Z)
* HMAC(Z, prepend || Z || append)
* Tls11Prf(label, seed)

ECDH key <example-value> are defined by the OS libraries and are subject to their limitations.

| Elliptic Curve                     | Windows 10+    | Windows 7 - 8.1 | Linux          | macOS           | iOS, tvOS, MacCatalyst | Android        |
|------------------------------------|----------------|-----------------|----------------|-----------------|------------------------|----------------|
| NIST P-256 (secp256r1)             | ✔️             | ✔️              | ✔️             | ✔️             | ✔️                     | ✔️             |
| NIST P-384 (secp384r1)             | ✔️             | ✔️              | ✔️             | ✔️             | ✔️                     | ✔️             |
| NIST P-521 (secp521r1)             | ✔️             | ✔️              | ✔️             | ✔️             | ✔️                     | ✔️             |
| Brainpool curves (as named curves) | ✔️             | ❌              | ⚠️1 | ❌             | ❌                     | ⚠️4 |
| Other named curves                 | ⚠️2 | ❌              | ⚠️1 | ❌             | ❌                     | ⚠️4 |
| Explicit curves                    | ✔️             | ❌              | ✔️             | ❌             | ❌                     | ✔️             |
| Export or import as explicit       | ✔️             | ❌3  | ✔️             | ❌3 | ❌3         | ✔️             |

1 Linux distributions don't all have support for the same named curves.

2 Support for named curves was added to Windows CNG in Windows 10. For more information, see CNG Named Elliptic Curves. Named curves are not available in earlier versions of Windows, except for three curves in Windows 7.

3 Exporting with explicit curve parameters requires OS library support, which is not available on Apple platforms or earlier versions of Windows.

4 Android support for some curves depends on the Android version. Android distributors may choose to add or remove curves from their Android build as well.

#### ECDH native interop

.NET exposes types to allow programs to interoperate with the OS libraries that .NET uses. The types involved don't translate between platforms and should only be directly used when necessary.

| Type                                                       | Windows | Linux | macOS | iOS, tvOS, MacCatalyst | Android  |
|------------------------------------------------------------|---------|-------|-------|------------------------|----------|
| `System.Security.Cryptography.ECDiffieHellmanCng`     | ✔️     | ❌    | ❌    | ❌                     | ❌       |
| `System.Security.Cryptography.ECDiffieHellmanOpenSsl` | ❌     | ✔️    | ❌\*  | ❌                     | ❌       |

\* On macOS, prior to .NET 10, `System.Security.Cryptography.ECDiffieHellmanOpenSsl` worked if OpenSSL was installed and an appropriate libcrypto dylib could be found via dynamic library loading. This support was removed in .NET 10.

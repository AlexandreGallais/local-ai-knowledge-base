---
title: "Cross-platform cryptography (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/cross-platform-cryptography.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cross-platform cryptography (part 3 of 4)

### DSA

DSA (Digital Signature Algorithm) key <example-value> is performed by the system libraries and is subject to their size limitations and performance characteristics.

| Function                      | Windows CNG | Linux | macOS         | Windows CAPI | iOS, tvOS, MacCatalyst  | Android |
|-------------------------------|-------------|-------|---------------|--------------|-------------------------|---------|
| Key <example-value> (<= 1024 bits)   | ✔️          | ✔️    | ❌           | ✔️           | ❌                      | ✔️      |
| Key <example-value> (> 1024 bits)    | ✔️          | ✔️    | ❌           | ❌           | ❌                      | ✔️      |
| Loading keys (<= 1024 bits)   | ✔️          | ✔️    | ✔️           | ✔️           | ❌                      | ✔️      |
| Loading keys (> 1024 bits)    | ✔️          | ✔️    | ⚠️\*         | ❌           | ❌                      | ✔️      |
| FIPS 186-2                    | ✔️          | ✔️    | ✔️           | ✔️           | ❌                      | ✔️      |
| FIPS 186-3 (SHA-2 signatures) | ✔️          | ✔️    | ❌           | ❌           | ❌                      | ✔️      |

\* macOS loads DSA keys bigger than 1024 bits, but the behavior of those keys is undefined. They don't behave according to FIPS 186-3.

#### DSA on Windows

* Windows CryptoAPI (CAPI) is used whenever `new DSACryptoServiceProvider()` is used.
* Windows Cryptography API Next Generation (CNG) is used whenever `new DSACng()` is used.
* The object returned by `System.Security.Cryptography.DSA.Create*` is internally powered by Windows CNG. This use of Windows CNG is an implementation detail and is subject to change.
* The `System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPublicKey*` extension method for `System.Security.Cryptography.X509Certificates.X509Certificate2` returns a `System.Security.Cryptography.DSACng` instance. This use of `System.Security.Cryptography.DSACng` is an implementation detail and is subject to change.
* The `System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPrivateKey*` extension method for `System.Security.Cryptography.X509Certificates.X509Certificate2` prefers an `System.Security.Cryptography.DSACng` instance, but if `System.Security.Cryptography.DSACng` can't open the key, `System.Security.Cryptography.DSACryptoServiceProvider` will be attempted.  The preferred provider is an implementation detail and is subject to change.

#### DSA native interop

.NET exposes types to allow programs to interoperate with the OS libraries that the .NET cryptography code uses. The types involved don't translate between platforms and should only be directly used when necessary.

| Type                                                         | Windows | Linux          | macOS           | iOS, tvOS, MacCatalyst | Android        |
|--------------------------------------------------------------|---------|----------------|-----------------|------------------------|----------------|
| `System.Security.Cryptography.DSACryptoServiceProvider` | ✔️      | ⚠️1 | ⚠️1  | ❌                    | ⚠️1 |
| `System.Security.Cryptography.DSACng`                   | ✔️      | ❌             | ❌              | ❌                    | ❌             |
| `System.Security.Cryptography.DSAOpenSsl`               | ❌      | ✔️             | ❌2  | ❌                    | ❌             |

1 On non-Windows, `System.Security.Cryptography.DSACryptoServiceProvider` can be used for compatibility with existing programs. In that case, any method that requires system interop, such as opening a named key, throws a `System.PlatformNotSupportedException`.

2 On macOS, prior to .NET 10, `System.Security.Cryptography.DSAOpenSsl` worked if OpenSSL was installed and an appropriate libcrypto dylib could be found via dynamic library loading. This support was removed in .NET 10.

## Post-quantum cryptography

Post-quantum algorithms are available starting in .NET 10. They're also available for .NET Framework using the Microsoft.Bcl.Cryptography NuGet package. The following support table indicates the platform support for the built-in operating system cryptographic components, such as those created from `Generate` or `ImportFromPem`. Implementations that derive from the base class might have different support behaviors.

For the built-in algorithms, an `IsSupported` static property is available to determine if the platform supports any of the parameter sets.

The native interop types for post-quantum algorithms do not support key <example-value> or importing. They exist specifically for interop scenarios with the native platform types, such as an `EVP_PKEY` on OpenSSL or `CngKey` on Windows.

### ML-KEM

| Algorithm    | Windows                       | Linux          | Apple | Android | Browser |
|--------------|-------------------------------|----------------|-------|---------|---------|
| ML-KEM-512   | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-KEM-768   | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-KEM-1024  | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |

#### Native interop ML-KEM

* `System.Security.Cryptography.MLKemOpenSsl`: OpenSSL 3.5.0+
* `System.Security.Cryptography.MLKemCng`: Windows 11 Insiders (Latest)

### ML-DSA

ML-DSA has a pure and prehash variant (HashML-DSA). The following table reflects both the pure and prehash variants.

| Algorithm                                   | Windows                       | Linux          | Apple | Android | Browser |
|---------------------------------------------|-------------------------------|----------------|-------|---------|---------|
| ML-DSA-44                                   | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-DSA-65                                   | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-DSA-87                                   | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-DSA-44 External Mu (&#x3BC;)1 | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-DSA-65 External Mu (&#x3BC;)1 | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| ML-DSA-87 External Mu (&#x3BC;)1 | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |

1 External Mu support is for signing and verifying Mu only. Computation of Mu isn't supported.

#### Native interop ML-DSA

* `System.Security.Cryptography.MLDsaOpenSsl`: OpenSSL 3.5.0+
* `System.Security.Cryptography.MLDsaCng`: Windows 11 Insiders (latest)

### SLH-DSA

SLH-DSA has a pure and prehash variant (HashSLH-DSA). The following table reflects both the pure and prehash variants.

| Algorithm           | Windows | Linux          | Apple | Android | Browser |
|---------------------|---------|----------------|-------|---------|---------|
| SLH-DSA-SHA2-128f   | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHA2-128s   | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHA2-192f   | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHA2-192s   | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHA2-256f   | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHA2-256s   | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHAKE-128f  | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHAKE-128s  | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHAKE-192f  | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHAKE-192s  | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHAKE-256f  | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |
| SLH-DSA-SHAKE-256s  | ❌      | OpenSSL 3.5.0+ | ❌    | ❌      | ❌       |

#### Native interop SLH-DSA

* `System.Security.Cryptography.SlhDsaOpenSsl`: OpenSSL 3.5.0+
* `System.Security.Cryptography.SlhDsaCng`: Not supported

### Composite ML-DSA

| Algorithm                              | Windows                       | Linux          | Apple | Android | Browser |
|----------------------------------------|-------------------------------|----------------|-------|---------|---------|
| MLDSA44-RSA2048-PSS-SHA256             | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA44-RSA2048-PKCS15-SHA256          | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA44-Ed25519-SHA512                 | ❌                            | ❌             | ❌    | ❌      | ❌      |
| MLDSA44-ECDSA-P256-SHA256              | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-RSA3072-PSS-SHA512             | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-RSA3072-PKCS15-SHA512          | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-RSA4096-PSS-SHA512             | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-RSA4096-PKCS15-SHA512          | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-ECDSA-P256-SHA512              | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-ECDSA-P384-SHA512              | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-ECDSA-brainpoolP256r1-SHA512   | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA65-Ed25519-SHA512                 | ❌                            | ❌             | ❌    | ❌      | ❌      |
| MLDSA87-ECDSA-P384-SHA512              | Windows 11 Insiders (Latest)  | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA87-ECDSA-brainpoolP384r1-SHA512   | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA87-Ed448-SHAKE256                 | ❌                            | ❌             | ❌    | ❌      | ❌      |
| MLDSA87-RSA3072-PSS-SHA512             | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA87-RSA4096-PSS-SHA512             | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |
| MLDSA87-ECDSA-P521-SHA512              | ❌                            | OpenSSL 3.5.0+ | ❌    | ❌      | ❌      |

#### Native interop composite ML-DSA

* `System.Security.Cryptography.CompositeMLDsaCng`: Not supported

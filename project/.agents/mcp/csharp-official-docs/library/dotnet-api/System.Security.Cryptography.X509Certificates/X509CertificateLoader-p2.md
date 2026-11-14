---
title: "X509CertificateLoader class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509CertificateLoader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509CertificateLoader class (part 2 of 2)

## X509CertificateLoader.LoadPkcs12FromFile(String, String, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadPkcs12FromFile (string path, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Opens the specified file, reads the contents as a PKCS#12 PFX and extracts a certificate.

Parameters:

- `path`: The path of the file to open.
- `password`: The password to decrypt the contents of the PFX.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to
import the private key <example-value> with the returned certificate.
- `loaderLimits`: Limits to apply when loading the PFX.  A `null` value, the default,
is equivalent to `Pkcs12LoaderLimits.Defaults`.

Returns: The loaded certificate.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `keyStorageFlags` contains a value, or combination of values,
that is not valid.
- `PlatformNotSupportedException`: `keyStorageFlags` contains a value that is not valid for the
current platform.
- `Pkcs12LoadLimitExceededException`: The PKCS#12/PFX violated one or more constraints of `loaderLimits`.
- `CryptographicException`: An error occurred while loading the PKCS#12/PFX.
- `IOException`: An error occurred while loading the specified file.

A PKCS#12/PFX can contain multiple certificates.
Using the ordering that the certificates appear in the results of
`X509CertificateLoader.LoadPkcs12CollectionFromFile`,
this method returns the first
certificate where `X509Certificate2.HasPrivateKey` is
`true`.
If no certificates have associated private keys, then the first
certificate is returned.
If the PKCS#12/PFX contains no certificates, a
`CryptographicException` is thrown.

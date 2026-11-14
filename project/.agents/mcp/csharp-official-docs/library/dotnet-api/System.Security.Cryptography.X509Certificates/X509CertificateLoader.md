---
title: "X509CertificateLoader class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509CertificateLoader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509CertificateLoader class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public static class X509CertificateLoader
```

Provides methods for loading an X.509 certificate or a PKCS#12 PFX that contains certificates.

To be added.

## X509CertificateLoader.LoadCertificate(Byte[]) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadCertificate (byte[] data);
```

Loads a single X.509 certificate from `data`, in either the PEM
or DER encoding.

Parameters:

- `data`: The data to load.

Returns: The certificate loaded from `data`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `CryptographicException`: The data did not load as a valid X.509 certificate.

This method only loads plain certificates, which are identified as
`X509ContentType.Cert` by `X509Certificate2.GetCertContentType`

## X509CertificateLoader.LoadCertificate(Byte>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadCertificate (ReadOnlySpan<byte> data);
```

Loads a single X.509 certificate from `data`, in either the PEM
or DER encoding.

Parameters:

- `data`: The data to load.

Returns: The certificate loaded from `data`.

Exceptions:

- `CryptographicException`: The data did not load as a valid X.509 certificate.

This method only loads plain certificates, which are identified as
`X509ContentType.Cert` by `X509Certificate2.GetCertContentType`

## X509CertificateLoader.LoadCertificateFromFile(String) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadCertificateFromFile (string path);
```

Loads a single X.509 certificate (in either the PEM or DER encoding)
from the specified file.

Parameters:

- `path`: The path of the file to open.

Returns: The loaded certificate.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `CryptographicException`: The data did not load as a valid X.509 certificate.
- `IOException`: An error occurred while loading the specified file.

This method only loads plain certificates, which are identified as
`X509ContentType.Cert` by `X509Certificate2.GetCertContentType`

## X509CertificateLoader.LoadPkcs12(Byte[], String, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadPkcs12 (byte[] data, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Loads the provided data as a PKCS#12 PFX and extracts a certificate.

Parameters:

- `data`: The data to load.
- `password`: The password to decrypt the contents of the PFX.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to
import the private key <example-value> with the returned certificate.
- `loaderLimits`: Limits to apply when loading the PFX.  A `null` value, the default,
is equivalent to `Pkcs12LoaderLimits.Defaults`.

Returns: The loaded certificate.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `keyStorageFlags` contains a value, or combination of values,
that is not valid.
- `PlatformNotSupportedException`: `keyStorageFlags` contains a value that is not valid for the
current platform.
- `Pkcs12LoadLimitExceededException`: The PKCS#12/PFX violated one or more constraints of `loaderLimits`.
- `CryptographicException`: An error occurred while loading the PKCS#12/PFX.

A PKCS#12/PFX can contain multiple certificates.
Using the ordering that the certificates appear in the results of
`X509CertificateLoader.LoadPkcs12Collection`,
this method returns the first
certificate where `X509Certificate2.HasPrivateKey` is
`true`.
If no certificates have associated private keys, then the first
certificate is returned.
If the PKCS#12/PFX contains no certificates, a
`CryptographicException` is thrown.

## X509CertificateLoader.LoadPkcs12(Byte>, Char>, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadPkcs12 (ReadOnlySpan<byte> data, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Loads the provided data as a PKCS#12 PFX and extracts a certificate.

Parameters:

- `data`: The data to load.
- `password`: The password to decrypt the contents of the PFX.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to
import the private key <example-value> with the returned certificate.
- `loaderLimits`: Limits to apply when loading the PFX.  A `null` value, the default,
is equivalent to `Pkcs12LoaderLimits.Defaults`.

Returns: The loaded certificate.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `keyStorageFlags` contains a value, or combination of values,
that is not valid.
- `PlatformNotSupportedException`: `keyStorageFlags` contains a value that is not valid for the
current platform.
- `Pkcs12LoadLimitExceededException`: The PKCS#12/PFX violated one or more constraints of `loaderLimits`.
- `CryptographicException`: An error occurred while loading the PKCS#12/PFX.

A PKCS#12/PFX can contain multiple certificates.
Using the ordering that the certificates appear in the results of
`X509CertificateLoader.LoadPkcs12Collection`,
this method returns the first
certificate where `X509Certificate2.HasPrivateKey` is
`true`.
If no certificates have associated private keys, then the first
certificate is returned.
If the PKCS#12/PFX contains no certificates, a
`CryptographicException` is thrown.

## X509CertificateLoader.LoadPkcs12Collection(Byte[], String, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2Collection LoadPkcs12Collection (byte[] data, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Loads the provided data as a PKCS#12 PFX and returns a collection of
all of the certificates therein.

Parameters:

- `data`: The data to load.
- `password`: The password to decrypt the contents of the PFX.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to
import the private key <example-value> with the returned certificate.
- `loaderLimits`: Limits to apply when loading the PFX.  A `null` value, the default,
is equivalent to `Pkcs12LoaderLimits.Defaults`.

Returns: A collection of the certificates loaded from the input.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `keyStorageFlags` contains a value, or combination of values,
that is not valid.
- `PlatformNotSupportedException`: `keyStorageFlags` contains a value that is not valid for the
current platform.
- `Pkcs12LoadLimitExceededException`: The PKCS#12/PFX violated one or more constraints of `loaderLimits`.
- `CryptographicException`: An error occurred while loading the PKCS#12/PFX.

To be added.

## X509CertificateLoader.LoadPkcs12Collection(Byte>, Char>, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2Collection LoadPkcs12Collection (ReadOnlySpan<byte> data, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Loads the provided data as a PKCS#12 PFX and returns a collection of
all of the certificates therein.

Parameters:

- `data`: The data to load.
- `password`: The password to decrypt the contents of the PFX.
- `keyStorageFlags`: A bitwise combination of the enumeration values that control where and how to
import the private key <example-value> with the returned certificate.
- `loaderLimits`: Limits to apply when loading the PFX.  A `null` value, the default,
is equivalent to `Pkcs12LoaderLimits.Defaults`.

Returns: A collection of the certificates loaded from the input.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `keyStorageFlags` contains a value, or combination of values,
that is not valid.
- `PlatformNotSupportedException`: `keyStorageFlags` contains a value that is not valid for the
current platform.
- `Pkcs12LoadLimitExceededException`: The PKCS#12/PFX violated one or more constraints of `loaderLimits`.
- `CryptographicException`: An error occurred while loading the PKCS#12/PFX.

To be added.

## X509CertificateLoader.LoadPkcs12CollectionFromFile(String, Char>, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2Collection LoadPkcs12CollectionFromFile (string path, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Opens the specified file, reads the contents as a PKCS#12 PFX and extracts a certificate.
Loads the provided data as a PKCS#12 PFX and returns a collection of
all of the certificates therein.

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

To be added.

## X509CertificateLoader.LoadPkcs12CollectionFromFile(String, String, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2Collection LoadPkcs12CollectionFromFile (string path, string? password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
```

Opens the specified file, reads the contents as a PKCS#12 PFX and extracts a certificate.
Loads the provided data as a PKCS#12 PFX and returns a collection of
all of the certificates therein.

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

To be added.

## X509CertificateLoader.LoadPkcs12FromFile(String, Char>, X509KeyStorageFlags, Pkcs12LoaderLimits) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 LoadPkcs12FromFile (string path, ReadOnlySpan<char> password, System.Security.Cryptography.X509Certificates.X509KeyStorageFlags keyStorageFlags = System.Security.Cryptography.X509Certificates.X509KeyStorageFlags.DefaultKeySet, System.Security.Cryptography.X509Certificates.Pkcs12LoaderLimits? loaderLimits = default);
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

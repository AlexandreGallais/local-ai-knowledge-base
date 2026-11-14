---
title: "SlhDsaOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SlhDsaOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlhDsaOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SlhDsaOpenSsl : System.Security.Cryptography.SlhDsa
```

Represents an SLH-DSA key <example-value> by OpenSSL.

This algorithm is specified by FIPS-205.

Developers are encouraged to program against the `SlhDsa` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## SlhDsaOpenSsl.SlhDsaOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public SlhDsaOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `SlhDsaOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Parameters:

- `pkeyHandle`: The OpenSSL `EVP_PKEY*` value to use as the key, represented as a `SafeEvpPKeyHandle`.

Exceptions:

- `ArgumentNullException`: `pkeyHandle` is `null`.
- `CryptographicException`: The handle in `pkeyHandle` is not recognized as an SLH-DSA key.

-or-

An error occurred while creating the algorithm instance.
- `ObjectDisposedException`: The handle in `pkeyHandle` is already disposed.

To be added.

## SlhDsaOpenSsl.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## SlhDsaOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## SlhDsaOpenSsl.ExportSlhDsaPrivateKeyCore(Byte>) method

```csharp
protected override void ExportSlhDsaPrivateKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## SlhDsaOpenSsl.ExportSlhDsaPublicKeyCore(Byte>) method

```csharp
protected override void ExportSlhDsaPublicKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## SlhDsaOpenSsl.SignDataCore(Byte>, Byte>, Byte>) method

```csharp
protected override void SignDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, Span<byte> destination);
```

To be added.

Parameters:

- `data`: To be added.
- `context`: To be added.
- `destination`: To be added.

To be added.

## SlhDsaOpenSsl.SignPreHashCore(Byte>, Byte>, String, Byte>) method

```csharp
protected override void SignPreHashCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> context, string hashAlgorithmOid, Span<byte> destination);
```

To be added.

Parameters:

- `hash`: To be added.
- `context`: To be added.
- `hashAlgorithmOid`: To be added.
- `destination`: To be added.

To be added.

## SlhDsaOpenSsl.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected override bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## SlhDsaOpenSsl.VerifyDataCore(Byte>, Byte>, Byte>) method

```csharp
protected override bool VerifyDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, ReadOnlySpan<byte> signature);
```

To be added.

Parameters:

- `data`: To be added.
- `context`: To be added.
- `signature`: To be added.

Returns: To be added.

To be added.

## SlhDsaOpenSsl.VerifyPreHashCore(Byte>, Byte>, String, Byte>) method

```csharp
protected override bool VerifyPreHashCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> context, string hashAlgorithmOid, ReadOnlySpan<byte> signature);
```

To be added.

Parameters:

- `hash`: To be added.
- `context`: To be added.
- `hashAlgorithmOid`: To be added.
- `signature`: To be added.

Returns: To be added.

To be added.

---
title: "MLDsaOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLDsaOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLDsaOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class MLDsaOpenSsl : System.Security.Cryptography.MLDsa
```

Represents an ML-DSA key <example-value> by OpenSSL.

This algorithm is specified by FIPS-204.

Developers are encouraged to program against the `MLDsa` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## MLDsaOpenSsl.MLDsaOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public MLDsaOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `MLDsaOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Parameters:

- `pkeyHandle`: The OpenSSL `EVP_PKEY*` value to use as the key, represented as a `SafeEvpPKeyHandle`.

Exceptions:

- `ArgumentNullException`: `pkeyHandle` is `null`.
- `CryptographicException`: The handle in `pkeyHandle` is not recognized as an ML-DSA key.

-or-

An error occurred while creating the algorithm instance.
- `ObjectDisposedException`: The handle in `pkeyHandle` is already disposed.

To be added.

## MLDsaOpenSsl.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## MLDsaOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLDsaOpenSsl.ExportMLDsaPrivateKeyCore(Byte>) method

```csharp
protected override void ExportMLDsaPrivateKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLDsaOpenSsl.ExportMLDsaPrivateSeedCore(Byte>) method

```csharp
protected override void ExportMLDsaPrivateSeedCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLDsaOpenSsl.ExportMLDsaPublicKeyCore(Byte>) method

```csharp
protected override void ExportMLDsaPublicKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLDsaOpenSsl.SignDataCore(Byte>, Byte>, Byte>) method

```csharp
protected override void SignDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, Span<byte> destination);
```

To be added.

Parameters:

- `data`: To be added.
- `context`: To be added.
- `destination`: To be added.

To be added.

## MLDsaOpenSsl.SignMuCore(Byte>, Byte>) method

```csharp
protected override void SignMuCore (ReadOnlySpan<byte> externalMu, Span<byte> destination);
```

To be added.

Parameters:

- `externalMu`: To be added.
- `destination`: To be added.

To be added.

## MLDsaOpenSsl.SignPreHashCore(Byte>, Byte>, String, Byte>) method

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

## MLDsaOpenSsl.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected override bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## MLDsaOpenSsl.VerifyDataCore(Byte>, Byte>, Byte>) method

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

## MLDsaOpenSsl.VerifyMuCore(Byte>, Byte>) method

```csharp
protected override bool VerifyMuCore (ReadOnlySpan<byte> externalMu, ReadOnlySpan<byte> signature);
```

To be added.

Parameters:

- `externalMu`: To be added.
- `signature`: To be added.

Returns: To be added.

To be added.

## MLDsaOpenSsl.VerifyPreHashCore(Byte>, Byte>, String, Byte>) method

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

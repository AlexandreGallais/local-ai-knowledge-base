---
title: "MLDsaCng class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLDsaCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLDsaCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class MLDsaCng : System.Security.Cryptography.MLDsa
```

Provides a Cryptography Next Generation (CNG) implementation of the Module-Lattice-Based Digital Signature Algorithm (ML-DSA).

This algorithm is specified by FIPS-204.

Developers are encouraged to program against the `MLDsa` base class rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## MLDsaCng.MLDsaCng(CngKey) constructor

```csharp
public MLDsaCng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `MLDsaCng` class by using the specified `CngKey`.

Parameters:

- `key`: The key that will be used as input to the cryptographic operations performed by the current object.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` does not specify a Module-Lattice-Based Digital Signature Algorithm (ML-DSA) group.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

To be added.

## MLDsaCng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## MLDsaCng.ExportMLDsaPrivateKeyCore(Byte>) method

```csharp
protected override void ExportMLDsaPrivateKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLDsaCng.ExportMLDsaPrivateSeedCore(Byte>) method

```csharp
protected override void ExportMLDsaPrivateSeedCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLDsaCng.ExportMLDsaPublicKeyCore(Byte>) method

```csharp
protected override void ExportMLDsaPublicKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLDsaCng.GetKey() method

```csharp
public System.Security.Cryptography.CngKey <example-value> ();
```

Gets a new `CngKey` representing the key used by the current instance.

Returns: To be added.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.

This `CngKey` object is not the same as the one passed to `MLDsaCng.#ctor`, if that constructor was used. However, it will point to the same CNG key.

## MLDsaCng.SignDataCore(Byte>, Byte>, Byte>) method

```csharp
protected override void SignDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, Span<byte> destination);
```

To be added.

Parameters:

- `data`: To be added.
- `context`: To be added.
- `destination`: To be added.

To be added.

## MLDsaCng.SignMuCore(Byte>, Byte>, Byte>) method

```csharp
protected override void SignMuCore (ReadOnlySpan<byte> externalMu, Span<byte> destination);
```

To be added.

Parameters:

- `externalMu`: To be added.
- `mu`: To be added.
- `destination`: To be added.

To be added.

## MLDsaCng.SignPreHashCore(Byte>, Byte>, String, Byte>) method

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

## MLDsaCng.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected override bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## MLDsaCng.VerifyDataCore(Byte>, Byte>, Byte>) method

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

## MLDsaCng.VerifyMuCore(Byte>, Byte>, Byte>) method

```csharp
protected override bool VerifyMuCore (ReadOnlySpan<byte> externalMu, ReadOnlySpan<byte> signature);
```

To be added.

Parameters:

- `externalMu`: To be added.
- `mu`: To be added.
- `signature`: To be added.

Returns: To be added.

To be added.

## MLDsaCng.VerifyPreHashCore(Byte>, Byte>, String, Byte>) method

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

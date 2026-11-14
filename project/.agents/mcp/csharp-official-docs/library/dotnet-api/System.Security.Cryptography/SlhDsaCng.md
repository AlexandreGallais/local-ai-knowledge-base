---
title: "SlhDsaCng class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SlhDsaCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlhDsaCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SlhDsaCng : System.Security.Cryptography.SlhDsa
```

Provides a Cryptography Next Generation (CNG) implementation of the Stateless Hash-Based Digital Signature Algorithm (SLH-DSA).

This algorithm is specified by FIPS-205.

Developers are encouraged to program against the `SlhDsa` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## SlhDsaCng.SlhDsaCng(CngKey) constructor

```csharp
public SlhDsaCng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `SlhDsaCng` class by using the specified `CngKey`.

Parameters:

- `key`: The key that will be used as input to the cryptographic operations performed by the current object.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` does not specify a Stateless Hash-Based Digital Signature Algorithm (SLH-DSA) group.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

To be added.

## SlhDsaCng.ExportSlhDsaPrivateKeyCore(Byte>) method

```csharp
protected override void ExportSlhDsaPrivateKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## SlhDsaCng.ExportSlhDsaPublicKeyCore(Byte>) method

```csharp
protected override void ExportSlhDsaPublicKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## SlhDsaCng.GetKey() method

```csharp
public System.Security.Cryptography.CngKey <example-value> ();
```

Gets a new `CngKey` representing the key used by the current instance.

Returns: To be added.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.

This `CngKey` object is not the same as the one passed to `SlhDsaCng.#ctor`, if that constructor was used. However, it will point to the same CNG key.

## SlhDsaCng.SignDataCore(Byte>, Byte>, Byte>) method

```csharp
protected override void SignDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, Span<byte> destination);
```

To be added.

Parameters:

- `data`: To be added.
- `context`: To be added.
- `destination`: To be added.

To be added.

## SlhDsaCng.SignPreHashCore(Byte>, Byte>, String, Byte>) method

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

## SlhDsaCng.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected override bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## SlhDsaCng.VerifyDataCore(Byte>, Byte>, Byte>) method

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

## SlhDsaCng.VerifyPreHashCore(Byte>, Byte>, String, Byte>) method

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

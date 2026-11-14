---
title: "MLKemOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLKemOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLKemOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class MLKemOpenSsl : System.Security.Cryptography.MLKem
```

Represents an ML-KEM key <example-value> by OpenSSL.

This algorithm is specified by FIPS-203.

Developers are encouraged to program against the `MLKem` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## MLKemOpenSsl.MLKemOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public MLKemOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `MLKemOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Parameters:

- `pkeyHandle`: The OpenSSL `EVP_PKEY*` value to use as the key, represented as a `SafeEvpPKeyHandle`.

Exceptions:

- `ArgumentNullException`: `pkeyHandle` is `null`.
- `CryptographicException`: The handle in `pkeyHandle` is not recognized as an ML-KEM key.

-or-

An error occurred while creating the algorithm instance.
- `ObjectDisposedException`: The handle in `pkeyHandle` is already disposed.

To be added.

## MLKemOpenSsl.DecapsulateCore(Byte>, Byte>) method

```csharp
protected override void DecapsulateCore (ReadOnlySpan<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## MLKemOpenSsl.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## MLKemOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKemOpenSsl.EncapsulateCore(Byte>, Byte>) method

```csharp
protected override void EncapsulateCore (Span<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## MLKemOpenSsl.ExportDecapsulationKeyCore(Byte>) method

```csharp
protected override void ExportDecapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLKemOpenSsl.ExportEncapsulationKeyCore(Byte>) method

```csharp
protected override void ExportEncapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLKemOpenSsl.ExportPrivateSeedCore(Byte>) method

```csharp
protected override void ExportPrivateSeedCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLKemOpenSsl.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected override bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

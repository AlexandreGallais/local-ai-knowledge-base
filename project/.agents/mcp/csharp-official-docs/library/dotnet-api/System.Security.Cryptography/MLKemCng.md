---
title: "MLKemCng class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLKemCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLKemCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class MLKemCng : System.Security.Cryptography.MLKem
```

Provides a Cryptography Next Generation (CNG) implementation of the Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM).

This algorithm is specified by FIPS-203.

Developers are encouraged to program against the `MLKem` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## MLKemCng.MLKemCng(CngKey) constructor

```csharp
public MLKemCng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `MLKemCng` class by using the specified `CngKey`.

Parameters:

- `key`: The key that will be used as input to the cryptographic operations performed by the current object.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` does not specify a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) algorithm group.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

To be added.

## MLKemCng.DecapsulateCore(Byte>, Byte>) method

```csharp
protected override void DecapsulateCore (ReadOnlySpan<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## MLKemCng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## MLKemCng.EncapsulateCore(Byte>, Byte>) method

```csharp
protected override void EncapsulateCore (Span<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## MLKemCng.ExportDecapsulationKeyCore(Byte>) method

```csharp
protected override void ExportDecapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLKemCng.ExportEncapsulationKeyCore(Byte>) method

```csharp
protected override void ExportEncapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLKemCng.ExportPrivateSeedCore(Byte>) method

```csharp
protected override void ExportPrivateSeedCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## MLKemCng.GetKey() method

```csharp
public System.Security.Cryptography.CngKey <example-value> ();
```

Gets a new `CngKey` representing the key used by the current instance.

Returns: To be added.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.

This `CngKey` object is not the same as the one passed to `MLKemCng.#ctor`, if that constructor was used. However, it will point to the same CNG key.

## MLKemCng.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected override bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

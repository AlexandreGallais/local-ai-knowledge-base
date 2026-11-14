---
title: "SHA512CryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SHA512CryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SHA512CryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SHA512CryptoServiceProvider : System.Security.Cryptography.SHA512
```

Defines a wrapper object to access the cryptographic service provider (CSP) implementation of the `SHA512` algorithm.

To be added.

## SHA512CryptoServiceProvider.SHA512CryptoServiceProvider() constructor

```csharp
public SHA512CryptoServiceProvider ();
```

Initializes a new instance of the `SHA512CryptoServiceProvider` class.

To be added.

## SHA512CryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## SHA512CryptoServiceProvider.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

To be added.

## SHA512CryptoServiceProvider.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] array, int ibStart, int cbSize);
```

To be added.

Parameters:

- `array`: To be added.
- `ibStart`: To be added.
- `cbSize`: To be added.

To be added.

## SHA512CryptoServiceProvider.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

To be added.

Returns: To be added.

To be added.

## SHA512CryptoServiceProvider.Initialize() method

```csharp
public override void Initialize ();
```

Initializes, or reinitializes, an instance of a hash algorithm.

#### Remarks
This method does not need to be called when using a newly created `SHA512CryptoServiceProvider` object.

## SHA512CryptoServiceProvider.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

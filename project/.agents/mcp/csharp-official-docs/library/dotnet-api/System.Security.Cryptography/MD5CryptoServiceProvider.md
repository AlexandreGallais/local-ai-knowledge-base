---
title: "MD5CryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MD5CryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MD5CryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class MD5CryptoServiceProvider : System.Security.Cryptography.MD5
```

Computes the `MD5` hash value for the input data using the implementation provided by the cryptographic service provider (CSP). This class cannot be inherited.

To be added.

## MD5CryptoServiceProvider.MD5CryptoServiceProvider() constructor

```csharp
public MD5CryptoServiceProvider ();
```

Initializes a new instance of the `MD5CryptoServiceProvider` class.

Exceptions:

- `InvalidOperationException`: A FIPS-compliant algorithm policy is not being used.

To be added.

## MD5CryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## MD5CryptoServiceProvider.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

To be added.

## MD5CryptoServiceProvider.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] array, int ibStart, int cbSize);
```

To be added.

Parameters:

- `array`: To be added.
- `ibStart`: To be added.
- `cbSize`: To be added.

To be added.

## MD5CryptoServiceProvider.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

To be added.

Returns: To be added.

To be added.

## MD5CryptoServiceProvider.Initialize() method

```csharp
public override void Initialize ();
```

Initializes an instance of `MD5CryptoServiceProvider`.

To be added.

## MD5CryptoServiceProvider.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

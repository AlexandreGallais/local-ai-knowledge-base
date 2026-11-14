---
title: "RNGCryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RNGCryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RNGCryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RNGCryptoServiceProvider : System.Security.Cryptography.RandomNumberGenerator
```

Implements a cryptographic Random Number Generator (RNG) using the implementation provided by the cryptographic service provider (CSP). This class cannot be inherited.

To be added.

## RNGCryptoServiceProvider.RNGCryptoServiceProvider() constructor

```csharp
public RNGCryptoServiceProvider ();
```

Initializes a new instance of the `RNGCryptoServiceProvider` class.

#### Examples
The following code example shows how to create a random number with the `RNGCryptoServiceProvider` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RNGCryptoServiceProvider/Overview/rngcsp.cs._

## RNGCryptoServiceProvider.RNGCryptoServiceProvider(Byte[]) constructor

```csharp
public RNGCryptoServiceProvider (byte[] rgb);
```

Initializes a new instance of the `RNGCryptoServiceProvider` class.

Parameters:

- `rgb`: A byte array. This value is ignored.

#### Remarks
This method does not directly initialize the `RNGCryptoServiceProvider` class.  Calling this method is equivalent to calling the `%23ctor` constructor and passing `null`.

## RNGCryptoServiceProvider.RNGCryptoServiceProvider(CspParameters) constructor

```csharp
public RNGCryptoServiceProvider (System.Security.Cryptography.CspParameters? cspParams);
```

Initializes a new instance of the `RNGCryptoServiceProvider` class with the specified parameters.

Parameters:

- `cspParams`: The parameters to pass to the cryptographic service provider (CSP).

To be added.

## RNGCryptoServiceProvider.RNGCryptoServiceProvider(String) constructor

```csharp
public RNGCryptoServiceProvider (string str);
```

Initializes a new instance of the `RNGCryptoServiceProvider` class.

Parameters:

- `str`: The string input. This parameter is ignored.

#### Remarks
This method does not directly initialize the `RNGCryptoServiceProvider` class.  Calling this method is equivalent to calling the `%23ctor` constructor and passing `null`.

## RNGCryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `RNGCryptoServiceProvider` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## RNGCryptoServiceProvider.GetBytes(Byte[]) method

```csharp
public override void GetBytes (byte[] data);
```

Fills an array of bytes with a cryptographically strong sequence of random values.

Parameters:

- `data`: The array to fill with a cryptographically strong sequence of random values.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.
- `ArgumentNullException`: `data` is `null`.

#### Remarks
The length of the byte array determines how many cryptographically strong random bytes are produced.

This method is thread safe.

#### Examples
The following code example shows how to create a random number with the `RNGCryptoServiceProvider` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RNGCryptoServiceProvider/Overview/rngcsp.cs._

## RNGCryptoServiceProvider.GetBytes(Byte>) method

```csharp
public override void GetBytes (Span<byte> data);
```

Fills a span with cryptographically strong random bytes.

Parameters:

- `data`: The span to fill with cryptographically strong random bytes.

To be added.

## RNGCryptoServiceProvider.GetBytes(Byte[], Int32, Int32) method

```csharp
public override void GetBytes (byte[] data, int offset, int count);
```

Fills the specified byte array with a cryptographically strong random sequence of values starting at a specified index for a specified number of bytes.

Parameters:

- `data`: The array to fill with cryptographically strong random bytes.
- `offset`: The index of the array to start the fill operation.
- `count`: The number of bytes to fill.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than 0.
- `ArgumentException`: `offset` plus `count` exceeds the length of `data`.

To be added.

## RNGCryptoServiceProvider.GetNonZeroBytes(Byte[]) method

```csharp
public override void GetNonZeroBytes (byte[] data);
```

Fills an array of bytes with a cryptographically strong sequence of random nonzero values.

Parameters:

- `data`: The array to fill with a cryptographically strong sequence of random nonzero values.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.
- `ArgumentNullException`: `data` is `null`.

#### Remarks
The length of the byte array determines how many cryptographically strong random nonzero bytes are produced.

#### Examples
The following code example creates a random sequence of 100 nonzero bytes and stores it in `random`.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RandomNumberGenerator/GetNonZeroBytes/source.cs._

## RNGCryptoServiceProvider.GetNonZeroBytes(Byte>) method

```csharp
public override void GetNonZeroBytes (Span<byte> data);
```

Fills a byte span with a cryptographically strong random sequence of nonzero values.

Parameters:

- `data`: The span to fill with cryptographically strong random nonzero bytes.

To be added.

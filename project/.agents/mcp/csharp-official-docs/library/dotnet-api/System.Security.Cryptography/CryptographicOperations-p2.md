---
title: "CryptographicOperations class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptographicOperations.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptographicOperations class (part 2 of 2)

## CryptographicOperations.HmacDataAsync(HashAlgorithmName, Byte[], Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HmacDataAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The stream to compute the HMAC over.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.

-or-

`source` does not support reading.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.
- `OperationCanceledException`: `cancellationToken` has been canceled.

To be added.

## CryptographicOperations.HmacDataAsync(HashAlgorithmName, Byte>, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HmacDataAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlyMemory<byte> key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The stream to compute the HMAC over.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.

-or-

`source` does not support reading.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.
- `OperationCanceledException`: `cancellationToken` has been canceled.

To be added.

## CryptographicOperations.HmacDataAsync(HashAlgorithmName, Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HmacDataAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlyMemory<byte> key, System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The stream to compute the HMAC over.
- `destination`: The buffer to receive the HMAC value.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated HMAC size.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.

-or-

`source` does not support reading.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.
- `OperationCanceledException`: `cancellationToken` has been canceled.

To be added.

## CryptographicOperations.TryHashData(HashAlgorithmName, Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the hash of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The data to hash.
- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

Exceptions:

- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.TryHmacData(HashAlgorithmName, Byte>, Byte>, Byte>, Int32) method

```csharp
public static bool TryHmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the HMAC of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.
- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated HMAC, `true` otherwise.

Exceptions:

- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.VerifyHmac(HashAlgorithmName, Byte[], Byte[], Byte[]) method

```csharp
public static bool VerifyHmac (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key, byte[] source, byte[] hash);
```

To be added.

Parameters:

- `hashAlgorithm`: To be added.
- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.VerifyHmac(HashAlgorithmName, Byte[], Stream, Byte[]) method

```csharp
public static bool VerifyHmac (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key, System.IO.Stream source, byte[] hash);
```

To be added.

Parameters:

- `hashAlgorithm`: To be added.
- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.VerifyHmac(HashAlgorithmName, Byte>, Stream, Byte>) method

```csharp
public static bool VerifyHmac (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, System.IO.Stream source, ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `hashAlgorithm`: To be added.
- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.VerifyHmac(HashAlgorithmName, Byte>, Byte>, Byte>) method

```csharp
public static bool VerifyHmac (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `hashAlgorithm`: To be added.
- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.VerifyHmacAsync(HashAlgorithmName, Byte[], Stream, Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> VerifyHmacAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key, System.IO.Stream source, byte[] hash, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `hashAlgorithm`: To be added.
- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.VerifyHmacAsync(HashAlgorithmName, Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> VerifyHmacAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlyMemory<byte> key, System.IO.Stream source, ReadOnlyMemory<byte> hash, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `hashAlgorithm`: To be added.
- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.ZeroMemory(Byte>) method

```csharp
public static void ZeroMemory (Span<byte> buffer);
```

Fills the provided buffer with zeros.

Parameters:

- `buffer`: The buffer to fill with zeros.

#### Remarks

This method exists to future-proof against potential optimizations in the .NET runtime that could eliminate memory writes that aren't followed by memory reads.
While the C and C++ compilers have similar optimizations, no such optimizations are planned for .NET.

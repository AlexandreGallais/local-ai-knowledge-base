---
title: "CryptographicOperations class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptographicOperations.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptographicOperations class

Namespace: `System.Security.Cryptography`

```csharp
public static class CryptographicOperations
```

Provides methods for common cryptographic operations and reducing side-channel information leakage.

To be added.

## CryptographicOperations.FixedTimeEquals(Byte>, Byte) method

```csharp
public static bool FixedTimeEquals (ReadOnlySpan<byte> source, byte value);
```

To be added.

Parameters:

- `source`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## CryptographicOperations.FixedTimeEquals(Byte>, Byte>) method

```csharp
public static bool FixedTimeEquals (ReadOnlySpan<byte> left, ReadOnlySpan<byte> right);
```

Determines the equality of two byte sequences in an amount of time that depends on the length of the sequences, but not their values.

Parameters:

- `left`: The first buffer to compare.
- `right`: The second buffer to compare.

Returns: `true` if `left` and `right` have the same values for `ReadOnlySpan<T>.Length` and the same contents; otherwise, `false`.

#### Remarks

This method compares the contents from two buffers for equality in a way that doesn't leak timing information, making it ideal for use within cryptographic routines.

This method will short-circuit and return `false` only if `left` and `right` have different lengths.

Fixed-time behavior is guaranteed in all other cases, including when `left` and `right` reference the same address.

## CryptographicOperations.HashData(HashAlgorithmName, Byte[]) method

```csharp
public static byte[] HashData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] source);
```

Computes the hash of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The data to hash.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HashData(HashAlgorithmName, Stream) method

```csharp
public static byte[] HashData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.IO.Stream source);
```

Computes the hash of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The stream to hash.

Returns: The hash of the data.

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

To be added.

## CryptographicOperations.HashData(HashAlgorithmName, Byte>) method

```csharp
public static byte[] HashData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> source);
```

Computes the hash of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The data to hash.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HashData(HashAlgorithmName, Stream, Byte>) method

```csharp
public static int HashData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.IO.Stream source, Span<byte> destination);
```

Computes the hash of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The stream to hash.
- `destination`: The buffer to receive the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.

-or-

`source` does not support reading.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HashData(HashAlgorithmName, Byte>, Byte>) method

```csharp
public static int HashData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the hash of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The data to hash.
- `destination`: The buffer to receive the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HashDataAsync(HashAlgorithmName, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The stream to hash.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The hash of the data.

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

## CryptographicOperations.HashDataAsync(HashAlgorithmName, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the hash.
- `source`: The stream to hash.
- `destination`: The buffer to receive the hash value.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.

-or-

`source` does not support reading.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.
- `OperationCanceledException`: `cancellationToken` has been canceled.

To be added.

## CryptographicOperations.HmacData(HashAlgorithmName, Byte[], Byte[]) method

```csharp
public static byte[] HmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key, byte[] source);
```

Computes the HMAC of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HmacData(HashAlgorithmName, Byte[], Stream) method

```csharp
public static byte[] HmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key, System.IO.Stream source);
```

Computes the HMAC of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.

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

To be added.

## CryptographicOperations.HmacData(HashAlgorithmName, Byte>, Stream) method

```csharp
public static byte[] HmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, System.IO.Stream source);
```

Computes the HMAC of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.

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

To be added.

## CryptographicOperations.HmacData(HashAlgorithmName, Byte>, Byte>) method

```csharp
public static byte[] HmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, ReadOnlySpan<byte> source);
```

Computes the HMAC of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HmacData(HashAlgorithmName, Byte>, Stream, Byte>) method

```csharp
public static int HmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, System.IO.Stream source, Span<byte> destination);
```

Computes the HMAC of a stream.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.

-or-

`source` does not support reading.

-or-

The buffer in `destination` is too small to hold the calculated HMAC size.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

## CryptographicOperations.HmacData(HashAlgorithmName, Byte>, Byte>, Byte>) method

```csharp
public static int HmacData (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the HMAC of data.

Parameters:

- `hashAlgorithm`: The algorithm used to compute the HMAC.
- `key`: The secret key. The key can be any length.
- `source`: The data to compute the HMAC over.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that is empty.
- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is
`null`.
- `PlatformNotSupportedException`: `hashAlgorithm` specifies a hash algorithm not supported by the current platform.
- `CryptographicException`: `hashAlgorithm` specifies an unknown hash algorithm.

To be added.

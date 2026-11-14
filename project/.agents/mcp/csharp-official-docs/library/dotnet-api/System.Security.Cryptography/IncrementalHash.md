---
title: "IncrementalHash class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/IncrementalHash.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IncrementalHash class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class IncrementalHash : IDisposable
```

Provides support for computing a hash or HMAC value incrementally across several segments.

To be added.

## IncrementalHash.AlgorithmName property

```csharp
public System.Security.Cryptography.HashAlgorithmName AlgorithmName { get; }
```

Get the name of the algorithm being performed.

Returns: The name of the algorithm being performed.

To be added.

## IncrementalHash.HashLengthInBytes property

```csharp
public int HashLengthInBytes { get; }
```

Gets the output size of this hash or HMAC algorithm, in bytes.

Returns: The output size of this hash or HMAC algorithm, in bytes.

To be added.

## IncrementalHash.AppendData(Byte[]) method

```csharp
public void AppendData (byte[] data);
```

Append the entire contents of `data` to the data already processed in the hash or HMAC.

Parameters:

- `data`: The data to process.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.AppendData(Byte>) method

```csharp
public void AppendData (ReadOnlySpan<byte> data);
```

Appends the specified data to the data already processed in the hash or Hash-based Message Authentication Code (HMAC).

Parameters:

- `data`: The data to process.

Exceptions:

- `ObjectDisposedException`: The `IncrementalHash` object has already been disposed.

To be added.

## IncrementalHash.AppendData(Byte[], Int32, Int32) method

```csharp
public void AppendData (byte[] data, int offset, int count);
```

Append `count` bytes of `data`, starting at `offset`,
to the data already processed in the hash or HMAC.

Parameters:

- `data`: The data to process.
- `offset`: The offset into the byte array from which to begin using data.
- `count`: The number of bytes in the array to use as data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `count` is out of range. This parameter requires a non-negative number less than
the `Array.Length` value of `data`.
- `ArgumentException`: `count` is greater than
`data`.`Array.Length` - `offset`.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.Clone() method

```csharp
public System.Security.Cryptography.IncrementalHash Clone ();
```

Creates a new instance of `IncrementalHash` with the existing appended data preserved.

Returns: A clone of the current instance.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.CreateHash(HashAlgorithmName) method

```csharp
public static System.Security.Cryptography.IncrementalHash CreateHash (System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Create an `IncrementalHash` for the algorithm specified by `hashAlgorithm`.

Parameters:

- `hashAlgorithm`: The name of the hash algorithm to perform.

Returns: An `IncrementalHash` instance ready to compute the hash algorithm specified
by `hashAlgorithm`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null`, or
the empty string.
- `CryptographicException`: `hashAlgorithm` is not a known hash algorithm.

To be added.

## IncrementalHash.CreateHMAC(HashAlgorithmName, Byte[]) method

```csharp
public static System.Security.Cryptography.IncrementalHash CreateHMAC (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] key);
```

Create an `IncrementalHash` for the Hash-based Message Authentication Code (HMAC)
algorithm utilizing the hash algorithm specified by `hashAlgorithm`, and a
key <example-value> by `key`.

Parameters:

- `hashAlgorithm`: The name of the hash algorithm to perform within the HMAC.
- `key`: The secret key for the HMAC. The key can be any length, but a key <example-value> than the output size
of the hash algorithm specified by `hashAlgorithm` will be hashed (using the
algorithm specified by `hashAlgorithm`) to derive a correctly-sized key. Therefore,
the recommended size of the secret key is the output size of the hash specified by
`hashAlgorithm`.

Returns: An `IncrementalHash` instance ready to compute the hash algorithm specified
by `hashAlgorithm`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null`, or
the empty string.
- `CryptographicException`: `hashAlgorithm` is not a known hash algorithm.

To be added.

## IncrementalHash.CreateHMAC(HashAlgorithmName, Byte>) method

```csharp
public static System.Security.Cryptography.IncrementalHash CreateHMAC (System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> key);
```

Create an `IncrementalHash` for the Hash-based Message Authentication Code (HMAC) algorithm utilizing the hash algorithm specified by `hashAlgorithm`, and a key <example-value> by `key`.

Parameters:

- `hashAlgorithm`: The name of the hash algorithm to perform within the HMAC.
- `key`: The secret key for the HMAC.

Returns: A hash instance to compute the hash algorithm specified by `hashAlgorithm`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or the empty string.
- `CryptographicException`: `hashAlgorithm` is not a known hash algorithm.

To be added.

## IncrementalHash.Dispose() method

```csharp
public void Dispose ();
```

Release all resources used by the current instance of the
`IncrementalHash` class.

To be added.

## IncrementalHash.GetCurrentHash() method

```csharp
public byte[] GetCurrentHash ();
```

Retrieves the hash or Hash-based Message Authentication Code (HMAC) for the data accumulated from prior calls to the `IncrementalHash.AppendData` methods, without resetting the object to its initial state.

Returns: The computed hash or HMAC.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.GetCurrentHash(Byte>) method

```csharp
public int GetCurrentHash (Span<byte> destination);
```

Retrieves the hash or Hash-based Message Authentication Code (HMAC) for the data accumulated from prior calls to the `IncrementalHash.AppendData` methods, without resetting the object to its initial state.

Parameters:

- `destination`: The buffer to receive the hash or HMAC value.

Returns: The number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: `destination` has a `Span<T>.Length` value less than `IncrementalHash.HashLengthInBytes`.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.GetHashAndReset() method

```csharp
public byte[] GetHashAndReset ();
```

Retrieve the hash or HMAC for the data accumulated from prior calls to
`IncrementalHash.AppendData`, and return to the state the object
was in at construction.

Returns: The computed hash or HMAC.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.GetHashAndReset(Byte>) method

```csharp
public int GetHashAndReset (Span<byte> destination);
```

Retrieves the hash or Hash-based Message Authentication Code (HMAC) for the data accumulated from prior calls to the `IncrementalHash.AppendData` methods, and resets the object to its initial state.

Parameters:

- `destination`: The buffer to receive the hash or HMAC value.

Returns: The number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: `destination` has a `Span<T>.Length` value less than `IncrementalHash.HashLengthInBytes`.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.TryGetCurrentHash(Byte>, Int32) method

```csharp
public bool TryGetCurrentHash (Span<byte> destination, out int bytesWritten);
```

Attempts to retrieve the hash or Hash-based Message Authentication Code (HMAC) for the data accumulated from prior calls to the `IncrementalHash.AppendData` methods, without resetting the object to its initial state.

Parameters:

- `destination`: The buffer to receive the hash or HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.
This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash or HMAC value; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## IncrementalHash.TryGetHashAndReset(Byte>, Int32) method

```csharp
public bool TryGetHashAndReset (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the hash computation after the last data is processed by the hash algorithm.

Parameters:

- `destination`: The buffer to receive the hash or Hash-Based Message Authentication Code (HMAC) value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash or HMAC value; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `IncrementalHash` object has already been disposed.

To be added.

## IncrementalHash.VerifyCurrentHash(Byte[]) method

```csharp
public bool VerifyCurrentHash (byte[] hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

## IncrementalHash.VerifyCurrentHash(Byte>) method

```csharp
public bool VerifyCurrentHash (ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

## IncrementalHash.VerifyHashAndReset(Byte[]) method

```csharp
public bool VerifyHashAndReset (byte[] hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

## IncrementalHash.VerifyHashAndReset(Byte>) method

```csharp
public bool VerifyHashAndReset (ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

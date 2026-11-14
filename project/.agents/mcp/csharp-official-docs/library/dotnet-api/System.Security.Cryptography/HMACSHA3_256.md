---
title: "HMACSHA3_256 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HMACSHA3_256.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HMACSHA3_256 class

Namespace: `System.Security.Cryptography`

```csharp
public class HMACSHA3_256 : System.Security.Cryptography.HMAC
```

Computes a Hash-based Message Authentication Code (HMAC) by using the SHA-3-256 hash function.

To be added.

## HMACSHA3_256.HMACSHA3_256() constructor

```csharp
public HMACSHA3_256 ();
```

Initializes a new instance of the `HMACSHA3_256` class with a randomly generated key.

`HMACSHA3_256` is a type of keyed hash algorithm that is constructed from the SHA-3-256 hash function and used as a Hash-based Message Authentication Code (HMAC). The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 256 bits in length.

This constructor uses a 136-byte, randomly generated key.

## HMACSHA3_256.HMACSHA3_256(Byte[]) constructor

```csharp
public HMACSHA3_256 (byte[] key);
```

Initializes a new instance of the `HMACSHA3_256` class with the specified key data.

Parameters:

- `key`: The secret key for `HMACSHA3_256`. The key can be any length.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## HMACSHA3_256.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the algorithm is supported on the current platform.

Returns: `true` if the algorithm is supported; otherwise, `false`.

To be added.

## HMACSHA3_256.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key to use in the HMAC calculation.

Returns: The key to use in the HMAC calculation.

To be added.

## HMACSHA3_256.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HMAC` class when a key <example-value> is legitimate and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## HMACSHA3_256.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `source`: The input to compute the HMAC code for.

To be added.

## HMACSHA3_256.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] rgb, int ib, int cb);
```

When overridden in a derived class, routes data written to the object into the HMAC algorithm for computing the HMAC value.

Parameters:

- `rgb`: The input data.
- `ib`: The offset into the byte array from which to begin using data.
- `cb`: The number of bytes in the array to use as data.

To be added.

## HMACSHA3_256.HashData(Byte[], Byte[]) method

```csharp
public static byte[] HashData (byte[] key, byte[] source);
```

Computes the HMAC of data using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.

To be added.

## HMACSHA3_256.HashData(Byte[], Stream) method

```csharp
public static byte[] HashData (byte[] key, System.IO.Stream source);
```

Computes the HMAC of a stream using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACSHA3_256.HashData(Byte>, Stream) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, System.IO.Stream source);
```

Computes the HMAC of a stream using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACSHA3_256.HashData(Byte>, Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source);
```

Computes the HMAC of data using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

To be added.

## HMACSHA3_256.HashData(Byte>, Stream, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, System.IO.Stream source, Span<byte> destination);
```

Computes the HMAC of a stream using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated HMAC
size. The SHA-3-256 algorithm always produces a 256-bit HMAC, or 32 bytes.

-or-

`source` does not support reading.

To be added.

## HMACSHA3_256.HashData(Byte>, Byte>, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the HMAC of data using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash
size. The SHA-3-256 algorithm always produces a 256-bit HMAC, or 32 bytes.

To be added.

## HMACSHA3_256.HashDataAsync(Byte[], Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (byte[] key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HMACSHA3_256.HashDataAsync(Byte>, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HMACSHA3_256.HashDataAsync(Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `destination`: The buffer to receive the HMAC value.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash
size. The SHA-3-256 algorithm always produces a 256-bit hash, or 32 bytes.

-or-

`source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HMACSHA3_256.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

When overridden in a derived class, finalizes the HMAC computation after the last data is processed by the algorithm.

Returns: The computed HMAC value in a byte array.

To be added.

## HMACSHA3_256.Initialize() method

```csharp
public override void Initialize ();
```

Initializes an instance of the default implementation of `HMAC`.

To be added.

## HMACSHA3_256.TryHashData(Byte>, Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the HMAC of data using the SHA-3-256 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

To be added.

## HMACSHA3_256.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the HMAC computation after the last data is processed by the HMAC algorithm.

Parameters:

- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the HMAC value; otherwise, `false`.

To be added.

## HMACSHA3_256.Verify(Byte[], Byte[], Byte[]) method

```csharp
public static bool Verify (byte[] key, byte[] source, byte[] hash);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## HMACSHA3_256.Verify(Byte[], Stream, Byte[]) method

```csharp
public static bool Verify (byte[] key, System.IO.Stream source, byte[] hash);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## HMACSHA3_256.Verify(Byte>, Stream, Byte>) method

```csharp
public static bool Verify (ReadOnlySpan<byte> key, System.IO.Stream source, ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## HMACSHA3_256.Verify(Byte>, Byte>, Byte>) method

```csharp
public static bool Verify (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.

Returns: To be added.

To be added.

## HMACSHA3_256.VerifyAsync(Byte[], Stream, Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> VerifyAsync (byte[] key, System.IO.Stream source, byte[] hash, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## HMACSHA3_256.VerifyAsync(Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> VerifyAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, ReadOnlyMemory<byte> hash, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## HMACSHA3_256.HashSizeInBits field

```csharp
public const int HashSizeInBits = 256;
```

The hash size produced by the HMAC SHA-3-256 algorithm, in bits.

To be added.

## HMACSHA3_256.HashSizeInBytes field

```csharp
public const int HashSizeInBytes = 32;
```

The hash size produced by the HMAC SHA-3-256 algorithm, in bytes.

To be added.

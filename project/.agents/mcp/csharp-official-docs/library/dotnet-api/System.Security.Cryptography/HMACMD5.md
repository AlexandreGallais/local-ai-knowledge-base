---
title: "HMACMD5 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HMACMD5.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HMACMD5 class

Namespace: `System.Security.Cryptography`

```csharp
public class HMACMD5 : System.Security.Cryptography.HMAC
```

Computes a Hash-based Message Authentication Code (HMAC) by using the `MD5` hash function.

#### Remarks
`HMACMD5` is a type of keyed hash algorithm that is constructed from the Message Digest Algorithm 5 (MD5) hash function and used as a Hash-based Message Authentication Code (HMAC). The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 128 bits in length.

An HMAC can be used to determine whether a message sent over an insecure channel has been tampered with, provided that the sender and receiver share a secret key. The sender computes the hash value for the original data and sends both the original data and hash value as a single message. The receiver recalculates the hash value on the received message and checks that the computed HMAC matches the transmitted HMAC.

Any change to the data or the hash value results in a mismatch, because knowledge of the secret key is required to change the message and reproduce the correct hash value. Therefore, if the original and computed hash values match, the message is authenticated.

MD5 is a cryptographic hash algorithm developed at RSA Laboratories. `HMACMD5` accepts keys of any size, and produces a hash sequence that is 128 bits in length.

Due to collision problems with MD5, Microsoft recommends SHA-256.

## HMACMD5.HMACMD5() constructor

```csharp
public HMACMD5 ();
```

Initializes a new instance of the `HMACMD5` class by using a randomly generated key.

#### Remarks
`HMACMD5` is a type of keyed hash algorithm that is constructed from the MD5 hash function and used as a Hash-based Message Authentication Code (HMAC). The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 128 bits in length.

This constructor uses a 64-byte, randomly generated key.

Due to collision problems with MD5, Microsoft recommends SHA-256.

## HMACMD5.HMACMD5(Byte[]) constructor

```csharp
public HMACMD5 (byte[] key);
```

Initializes a new instance of the `HMACMD5` class by using the specified key.

Parameters:

- `key`: The secret key for HMAC computation. The key can be any length, but if it is more than 64 bytes long it will be hashed (using MD5) to derive a 16-byte key. Therefore, the recommended size of the secret key is 64 bytes.

Exceptions:

- `ArgumentNullException`: The `key` parameter is `null`.

#### Remarks
`HMACMD5` is a type of keyed hash algorithm that is constructed from the MD5 hash function and used as a Hash-based Message Authentication Code (HMAC). The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 128 bits in length.

This constructor uses a key you provide to create the `HMACMD5` object.

Due to collision problems with MD5, Microsoft recommends SHA-256.

#### Examples
For an example of how to use this constructor, see the `HMACMD5` class.

## HMACMD5.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key to use in the HMAC calculation.

Returns: The key to use in the HMAC calculation.

To be added.

## HMACMD5.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HMACMD5` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## HMACMD5.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `source`: The input to compute the HMAC for.

To be added.

## HMACMD5.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] rgb, int ib, int cb);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `rgb`: The input to compute the HMAC for.
- `ib`: The offset into the byte array from which to begin using data.
- `cb`: The number of bytes in the byte array to use as data.

To be added.

## HMACMD5.HashData(Byte[], Byte[]) method

```csharp
public static byte[] HashData (byte[] key, byte[] source);
```

Computes the HMAC of data using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.

To be added.

## HMACMD5.HashData(Byte[], Stream) method

```csharp
public static byte[] HashData (byte[] key, System.IO.Stream source);
```

Computes the HMAC of a stream using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACMD5.HashData(Byte>, Stream) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, System.IO.Stream source);
```

Computes the HMAC of a stream using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACMD5.HashData(Byte>, Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source);
```

Computes the HMAC of data using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

To be added.

## HMACMD5.HashData(Byte>, Stream, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, System.IO.Stream source, Span<byte> destination);
```

Computes the HMAC of a stream using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated HMAC
size. The MD5 algorithm always produces a 128-bit HMAC, or 16 bytes.

-or-

`source` does not support reading.

To be added.

## HMACMD5.HashData(Byte>, Byte>, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the HMAC of data using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size. The MD5 algorithm always produces a 128-bit HMAC, or 16 bytes.

To be added.

## HMACMD5.HashDataAsync(Byte[], Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (byte[] key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the MD5 algorithm.

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

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HMACMD5.HashData`.

## HMACMD5.HashDataAsync(Byte>, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the MD5 algorithm.

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

## HMACMD5.HashDataAsync(Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the MD5 algorithm.

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
size. The MD5 algorithm always produces a 128-bit hash, or 16 bytes.

-or-

`source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HMACMD5.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

Finalizes the HMAC computation after the last data is processed by the algorithm.

Returns: The computed HMAC value in a byte array.

To be added.

## HMACMD5.Initialize() method

```csharp
public override void Initialize ();
```

Resets the hash algorithm to its initial state.

To be added.

## HMACMD5.TryHashData(Byte>, Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the HMAC of data using the MD5 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

To be added.

## HMACMD5.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the HMAC computation after the last data is processed by the HMAC algorithm.

Parameters:

- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the HMAC value; otherwise, `false`.

To be added.

## HMACMD5.Verify(Byte[], Byte[], Byte[]) method

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

## HMACMD5.Verify(Byte[], Stream, Byte[]) method

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

## HMACMD5.Verify(Byte>, Stream, Byte>) method

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

## HMACMD5.Verify(Byte>, Byte>, Byte>) method

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

## HMACMD5.VerifyAsync(Byte[], Stream, Byte[], CancellationToken) method

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

## HMACMD5.VerifyAsync(Byte>, Stream, Byte>, CancellationToken) method

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

## HMACMD5.HashSizeInBits field

```csharp
public const int HashSizeInBits = 128;
```

The hash size produced by the HMAC MD5 algorithm, in bits.

To be added.

## HMACMD5.HashSizeInBytes field

```csharp
public const int HashSizeInBytes = 16;
```

The hash size produced by the HMAC MD5 algorithm, in bytes.

To be added.

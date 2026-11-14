---
title: "HMACSHA512 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HMACSHA512.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HMACSHA512 class

Namespace: `System.Security.Cryptography`

```csharp
public class HMACSHA512 : System.Security.Cryptography.HMAC
```

Computes a Hash-based Message Authentication Code (HMAC) using the `SHA512` hash function.

#### Remarks
`HMACSHA512` is a type of keyed hash algorithm that is constructed from the SHA-512 hash function and used as a Hash-based Message Authentication Code (HMAC). The HMAC process mixes a secret key with the message data and hashes the result. The hash value is mixed with the secret key again, and then hashed a second time. The output hash is 512 bits in length.

An HMAC can be used to determine whether a message sent over a nonsecure channel has been tampered with, provided that the sender and receiver share a secret key. The sender computes the hash value for the original data and sends both the original data and hash value as a single message. The receiver recalculates the hash value on the received message and checks that the computed HMAC matches the transmitted HMAC.

If the original and computed hash values match, the message is authenticated. If they do not match, either the data or the hash value has been changed. HMACs provide security against tampering because knowledge of the secret key is required to change the message and reproduce the correct hash value.

`HMACSHA512` accepts keys of any size, and produces a hash sequence of length 512 bits.

#### Examples
The following example shows how to sign a file by using the `HMACSHA512` object and then how to verify the file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/HMACSHA512/Overview/hmacsha512.cs._

## HMACSHA512.HMACSHA512() constructor

```csharp
public HMACSHA512 ();
```

Initializes a new instance of the `HMACSHA512` class with a randomly generated key.

#### Remarks
With this constructor, a 64-byte, randomly generated key is used.

## HMACSHA512.HMACSHA512(Byte[]) constructor

```csharp
public HMACSHA512 (byte[] key);
```

Initializes a new instance of the `HMACSHA512` class with the specified key data.

Parameters:

- `key`: The secret key for HMAC computation. The key can be any length. However, the recommended size is 128 bytes. If the key is more than 128 bytes long, it is hashed (using SHA-512) to derive a 64-byte key.

Exceptions:

- `ArgumentNullException`: The `key` parameter is `null`.

#### Examples
For an example of how to use this constructor, see the `HMACSHA512` class.

## HMACSHA512.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key to use in the HMAC calculation.

Returns: The key to use in the HMAC calculation.

To be added.

## HMACSHA512.ProduceLegacyHmacValues property

```csharp
public bool ProduceLegacyHmacValues { get; set; }
```

Provides a workaround for the .NET Framework 2.0 implementation of the `HMACSHA512` algorithm, which is inconsistent with the .NET Framework 2.0 Service Pack 1 implementation.

Returns: `true` to enable .NET Framework 2.0 Service Pack 1 applications to interact with .NET Framework 2.0 applications; otherwise, `false`.

To be added.

## HMACSHA512.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HMACSHA512` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## HMACSHA512.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `source`: The input to compute the HMAC for.

To be added.

## HMACSHA512.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] rgb, int ib, int cb);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `rgb`: The input to compute the HMAC for.
- `ib`: The offset into the byte array from which to begin using data.
- `cb`: The number of bytes in the byte array to use as data.

To be added.

## HMACSHA512.HashData(Byte[], Byte[]) method

```csharp
public static byte[] HashData (byte[] key, byte[] source);
```

Computes the HMAC of data using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.

To be added.

## HMACSHA512.HashData(Byte[], Stream) method

```csharp
public static byte[] HashData (byte[] key, System.IO.Stream source);
```

Computes the HMAC of a stream using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACSHA512.HashData(Byte>, Stream) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, System.IO.Stream source);
```

Computes the HMAC of a stream using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACSHA512.HashData(Byte>, Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source);
```

Computes the HMAC of data using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

To be added.

## HMACSHA512.HashData(Byte>, Stream, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, System.IO.Stream source, Span<byte> destination);
```

Computes the HMAC of a stream using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated HMAC
size. The SHA-512 algorithm always produces a 512-bit HMAC, or 64 bytes.

-or-

`source` does not support reading.

To be added.

## HMACSHA512.HashData(Byte>, Byte>, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the HMAC of data using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size. The SHA-512 algorithm always produces a 512-bit HMAC, or 64 bytes.

To be added.

## HMACSHA512.HashDataAsync(Byte[], Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (byte[] key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-512 algorithm.

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

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HMACSHA512.HashData`.

## HMACSHA512.HashDataAsync(Byte>, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-512 algorithm.

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

## HMACSHA512.HashDataAsync(Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-512 algorithm.

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
size. The SHA-512 algorithm always produces a 512-bit hash, or 64 bytes.

-or-

`source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HMACSHA512.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

Finalizes the HMAC computation after the last data is processed by the algorithm.

Returns: The computed HMAC value in a byte array.

To be added.

## HMACSHA512.Initialize() method

```csharp
public override void Initialize ();
```

Resets the hash algorithm to its initial state.

To be added.

## HMACSHA512.TryHashData(Byte>, Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the HMAC of data using the SHA-512 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

To be added.

## HMACSHA512.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the HMAC computation after the last data is processed by the HMAC algorithm.

Parameters:

- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the HMAC value; otherwise, `false`.

To be added.

## HMACSHA512.Verify(Byte[], Byte[], Byte[]) method

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

## HMACSHA512.Verify(Byte[], Stream, Byte[]) method

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

## HMACSHA512.Verify(Byte>, Stream, Byte>) method

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

## HMACSHA512.Verify(Byte>, Byte>, Byte>) method

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

## HMACSHA512.VerifyAsync(Byte[], Stream, Byte[], CancellationToken) method

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

## HMACSHA512.VerifyAsync(Byte>, Stream, Byte>, CancellationToken) method

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

## HMACSHA512.HashSizeInBits field

```csharp
public const int HashSizeInBits = 512;
```

The hash size produced by the HMAC SHA-512 algorithm, in bits.

To be added.

## HMACSHA512.HashSizeInBytes field

```csharp
public const int HashSizeInBytes = 64;
```

The hash size produced by the HMAC SHA-512 algorithm, in bytes.

To be added.

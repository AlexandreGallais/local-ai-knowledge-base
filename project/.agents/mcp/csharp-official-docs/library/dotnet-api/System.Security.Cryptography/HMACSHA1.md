---
title: "HMACSHA1 class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HMACSHA1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HMACSHA1 class

Namespace: `System.Security.Cryptography`

```csharp
public class HMACSHA1 : System.Security.Cryptography.HMAC
```

Computes a Hash-based Message Authentication Code (HMAC) using the `SHA1` hash function.

#### Remarks
`HMACSHA1` is a type of keyed hash algorithm that is constructed from the SHA-1 hash function and used as an HMAC, or hash-based message authentication code. The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 160 bits in length.

An HMAC can be used to determine whether a message sent over an insecure channel has been tampered with, provided that the sender and receiver share a secret key. The sender computes the hash value for the original data and sends both the original data and hash value as a single message. The receiver recalculates the hash value on the received message and checks that the computed HMAC matches the transmitted HMAC.

Any change to the data or the hash value results in a mismatch, because knowledge of the secret key is required to change the message and reproduce the correct hash value. Therefore, if the original and computed hash values match, the message is authenticated.

The SHA-1 (Secure Hash Algorithm, also called SHS, Secure Hash Standard) is a cryptographic hash algorithm published by the United States Government. It produces a 160-bit hash value from an arbitrary length string.

`HMACSHA1` accepts keys of any size, and produces a hash sequence that is 160 bits in length.

Due to collision problems with SHA-1, Microsoft recommends SHA-256.

## HMACSHA1.HMACSHA1() constructor

```csharp
public HMACSHA1 ();
```

Initializes a new instance of the `HMACSHA1` class with a randomly generated key.

#### Remarks
`HMACSHA1` is a type of keyed hash algorithm that is constructed from the SHA-1 hash function and used as an HMAC, or hash-based message authentication code. The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 160 bits (20 bytes) in length.

This constructor uses a 64-byte, randomly generated key.

Due to collision problems with SHA-1, Microsoft recommends SHA-256.

## HMACSHA1.HMACSHA1(Byte[]) constructor

```csharp
public HMACSHA1 (byte[] key);
```

Initializes a new instance of the `HMACSHA1` class with the specified key data.

Parameters:

- `key`: The secret key for `HMACSHA1` encryption. The key can be any length, but if it is more than 64 bytes long it is hashed (using SHA-1) to derive a 64-byte key. Therefore, the recommended size of the secret key is 64 bytes.

Exceptions:

- `ArgumentNullException`: The `key` parameter is `null`.

#### Remarks
`HMACSHA1` is a type of keyed hash algorithm that is constructed from the SHA-1 hash function and used as an HMAC, or hash-based message authentication code. The HMAC process mixes a secret key with the message data, hashes the result with the hash function, mixes that hash value with the secret key again, and then applies the hash function a second time. The output hash is 160 bits (20 bytes) in length.

> **Note:**
> This constructor creates an unmanaged instance of the algorithm by using the `SHA1CryptoServiceProvider` class.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

#### Examples
For an example of how to use this constructor, see the `HMACSHA1` class.

## HMACSHA1.HMACSHA1(Byte[], Boolean) constructor

```csharp
public HMACSHA1 (byte[] key, bool useManagedSha1);
```

Initializes a new instance of the `HMACSHA1` class with the specified key data and a value that specifies whether to use the managed version of the SHA-1 algorithm.

Parameters:

- `key`: The secret key for HMAC computation. The key can be any length, but if it is more than 64 bytes long, it is hashed (using SHA-1) to derive a 20-byte key. Therefore, the recommended size of the secret key is 64 bytes.
- `useManagedSha1`: `true` to use the managed implementation of the SHA-1 algorithm (the `SHA1Managed` class); `false` to use the unmanaged implementation (the `SHA1CryptoServiceProvider` class).

To be added.

## HMACSHA1.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key to use in the hash algorithm.

Returns: The key to use in the hash algorithm.

To be added.

## HMACSHA1.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

This member overrides `KeyedHashAlgorithm.Dispose`, and more complete documentation might be available in that topic.

Releases the unmanaged resources used by the `KeyedHashAlgorithm` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; false to release only unmanaged resources.

To be added.

## HMACSHA1.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `source`: The input to compute the HMAC for.

To be added.

## HMACSHA1.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] rgb, int ib, int cb);
```

Routes data written to the object into the SHA1 hash algorithm for computing the Hash-based Message Authentication Code (HMAC).

Parameters:

- `rgb`: The input data.
- `ib`: The offset into the byte array from which to begin using data.
- `cb`: The number of bytes in the array to use as data.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## HMACSHA1.HashData(Byte[], Byte[]) method

```csharp
public static byte[] HashData (byte[] key, byte[] source);
```

Computes the HMAC of data using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.

To be added.

## HMACSHA1.HashData(Byte[], Stream) method

```csharp
public static byte[] HashData (byte[] key, System.IO.Stream source);
```

Computes the HMAC of a stream using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACSHA1.HashData(Byte>, Stream) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, System.IO.Stream source);
```

Computes the HMAC of a stream using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.

Returns: The HMAC of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## HMACSHA1.HashData(Byte>, Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source);
```

Computes the HMAC of data using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.

Returns: The HMAC of the data.

To be added.

## HMACSHA1.HashData(Byte>, Stream, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, System.IO.Stream source, Span<byte> destination);
```

Computes the HMAC of a stream using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The stream to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated HMAC
size. The SHA-1 algorithm always produces a 160-bit HMAC, or 20 bytes.

-or-

`source` does not support reading.

To be added.

## HMACSHA1.HashData(Byte>, Byte>, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the HMAC of data using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size. The SHA-1 algorithm always produces a 160-bit HMAC, or 20 bytes.

To be added.

## HMACSHA1.HashDataAsync(Byte[], Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (byte[] key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-1 algorithm.

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

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HMACSHA1.HashData`.

## HMACSHA1.HashDataAsync(Byte>, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-1 algorithm.

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

## HMACSHA1.HashDataAsync(Byte>, Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the HMAC of a stream using the SHA-1 algorithm.

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
size. The SHA-1 algorithm always produces a 160-bit hash, or 20 bytes.

-or-

`source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HMACSHA1.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

Finalizes the HMAC computation after the last data is processed by the algorithm.

Returns: The computed HMAC value in a byte array.

To be added.

## HMACSHA1.Initialize() method

```csharp
public override void Initialize ();
```

Resets the hash algorithm to its initial state.

To be added.

## HMACSHA1.TryHashData(Byte>, Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the HMAC of data using the SHA-1 algorithm.

Parameters:

- `key`: The HMAC key.
- `source`: The data to HMAC.
- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

To be added.

## HMACSHA1.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the HMAC computation after the last data is processed by the HMAC algorithm.

Parameters:

- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the HMAC value; otherwise, `false`.

To be added.

## HMACSHA1.Verify(Byte[], Byte[], Byte[]) method

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

## HMACSHA1.Verify(Byte[], Stream, Byte[]) method

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

## HMACSHA1.Verify(Byte>, Stream, Byte>) method

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

## HMACSHA1.Verify(Byte>, Byte>, Byte>) method

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

## HMACSHA1.VerifyAsync(Byte[], Stream, Byte[], CancellationToken) method

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

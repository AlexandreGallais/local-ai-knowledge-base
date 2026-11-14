---
title: "MD5 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MD5.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MD5 class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class MD5 : System.Security.Cryptography.HashAlgorithm
```

Represents the abstract class from which all implementations of the `MD5` hash algorithm inherit.

#### Remarks
Hash functions map binary strings of an arbitrary length to small binary strings of a fixed length. A cryptographic hash function has the property that it is computationally infeasible to find two distinct inputs that hash to the same value; that is, hashes of two sets of data should match if the corresponding data also matches. Small changes to the data result in large, unpredictable changes in the hash.

The hash size for the `MD5` algorithm is 128 bits.

The `HashAlgorithm.ComputeHash` methods of the `MD5` class return the hash as an array of 16 bytes.  Note that some MD5 implementations produce a 32-character, hexadecimal-formatted hash.  To interoperate with such implementations, format the return value of the `HashAlgorithm.ComputeHash` methods as a hexadecimal value.

> **Note:**
> Due to collision problems with MD5/SHA-1, Microsoft recommends SHA-256 or SHA-512. Consider using the `SHA256` class or the `SHA512` class instead of the `MD5` class. Use `MD5` only for compatibility with legacy applications and data.

## MD5.MD5() constructor

```csharp
protected MD5 ();
```

Initializes a new instance of `MD5`.

#### Remarks
To create an instance of the `MD5` class, use the `MD5.Create` method.

## MD5.Create() method

```csharp
public static System.Security.Cryptography.MD5 Create ();
```

Creates an instance of the default implementation of the `MD5` hash algorithm.

Returns: A new instance of the `MD5` hash algorithm.

Exceptions:

- `TargetInvocationException`: The algorithm was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

To be added.

## MD5.Create(String) method

```csharp
public static System.Security.Cryptography.MD5? Create (string algName);
```

Creates an instance of the specified implementation of the `MD5` hash algorithm.

Parameters:

- `algName`: The name of the specific implementation of `MD5` to use.

Returns: A new instance of the specified implementation of `MD5`.

Exceptions:

- `TargetInvocationException`: The algorithm described by the `algName` parameter was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

To be added.

## MD5.HashData(Byte[]) method

```csharp
public static byte[] HashData (byte[] source);
```

Computes the hash of data using the MD5 algorithm.

Parameters:

- `source`: The data to hash.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## MD5.HashData(Stream) method

```csharp
public static byte[] HashData (System.IO.Stream source);
```

Computes the hash of a stream using the MD5 algorithm.

Parameters:

- `source`: The stream to hash.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## MD5.HashData(Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> source);
```

Computes the hash of data using the MD5 algorithm.

Parameters:

- `source`: The data to hash.

Returns: The hash of the data.

To be added.

## MD5.HashData(Stream, Byte>) method

```csharp
public static int HashData (System.IO.Stream source, Span<byte> destination);
```

Computes the hash of a stream using the MD5 algorithm.

Parameters:

- `source`: The stream to hash.
- `destination`: The buffer to receive the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash
size. The MD5 algorithm always produces a 128-bit hash, or 16 bytes.

-or-

`source` does not support reading.

To be added.

## MD5.HashData(Byte>, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the hash of data using the MD5 algorithm.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer to receive the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size. The MD5 algorithm always produces a 128-bit hash, or 16 bytes.

To be added.

## MD5.HashDataAsync(Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the MD5 algorithm.

Parameters:

- `source`: The stream to hash.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MD5.HashData`.

## MD5.HashDataAsync(Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the MD5 algorithm.

Parameters:

- `source`: The stream to hash.
- `destination`: The buffer to receive the hash value.
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

## MD5.TryHashData(Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the hash of data using the MD5 algorithm.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

To be added.

## MD5.HashSizeInBits field

```csharp
public const int HashSizeInBits = 128;
```

The hash size produced by the MD5 algorithm, in bits.

To be added.

## MD5.HashSizeInBytes field

```csharp
public const int HashSizeInBytes = 16;
```

The hash size produced by the MD5 algorithm, in bytes.

To be added.

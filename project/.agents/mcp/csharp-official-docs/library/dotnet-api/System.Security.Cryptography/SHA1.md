---
title: "SHA1 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SHA1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SHA1 class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class SHA1 : System.Security.Cryptography.HashAlgorithm
```

Computes the `SHA1` hash for the input data.

#### Remarks
The hash is used as a unique value of fixed size representing a large amount of data. Hashes of two sets of data should match if the corresponding data also matches. Small changes to the data result in large, unpredictable changes in the hash.

The hash size for the `SHA1` algorithm is 160 bits.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## SHA1.SHA1() constructor

```csharp
protected SHA1 ();
```

Initializes a new instance of `SHA1`.

Exceptions:

- `InvalidOperationException`: The policy on this object is not compliant with the FIPS algorithm.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

## SHA1.Create() method

```csharp
public static System.Security.Cryptography.SHA1 Create ();
```

Creates an instance of the default implementation of `SHA1`.

Returns: A new instance of `SHA1`.

#### Remarks
The default implementation of `SHA1` is `SHA1CryptoServiceProvider`.

## SHA1.Create(String) method

```csharp
public static System.Security.Cryptography.SHA1? Create (string hashName);
```

Creates an instance of the specified implementation of `SHA1`.

Parameters:

- `hashName`: The name of the specific implementation of `SHA1` to be used.

Returns: A new instance of `SHA1` using the specified implementation.

To be added.

## SHA1.HashData(Byte[]) method

```csharp
public static byte[] HashData (byte[] source);
```

Computes the hash of data using the SHA-1 algorithm.

Parameters:

- `source`: The data to hash.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## SHA1.HashData(Stream) method

```csharp
public static byte[] HashData (System.IO.Stream source);
```

Computes the hash of a stream using the SHA-1 algorithm.

Parameters:

- `source`: The stream to hash.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.

To be added.

## SHA1.HashData(Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> source);
```

Computes the hash of data using the SHA-1 algorithm.

Parameters:

- `source`: The data to hash.

Returns: The hash of the data.

To be added.

## SHA1.HashData(Stream, Byte>) method

```csharp
public static int HashData (System.IO.Stream source, Span<byte> destination);
```

Computes the hash of a stream using the SHA-1 algorithm.

Parameters:

- `source`: The stream to hash.
- `destination`: The buffer to receive the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash
size. The SHA-1 algorithm always produces a 160-bit hash, or 20 bytes.

-or-

`source` does not support reading.

To be added.

## SHA1.HashData(Byte>, Byte>) method

```csharp
public static int HashData (ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the hash of data using the SHA-1 algorithm.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer to receive the hash value.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the calculated hash size. The SHA-1 algorithm always produces a 160-bit hash, or 20 bytes.

To be added.

## SHA1.HashDataAsync(Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the SHA-1 algorithm.

Parameters:

- `source`: The stream to hash.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: The hash of the data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `SHA1.HashData`.

## SHA1.HashDataAsync(Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> HashDataAsync (System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the SHA-1 algorithm.

Parameters:

- `source`: The stream to hash.
- `destination`: The buffer to receive the hash value.
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

## SHA1.TryHashData(Byte>, Byte>, Int32) method

```csharp
public static bool TryHashData (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the hash of data using the SHA-1 algorithm.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`.

Returns: `false` if `destination` is too small to hold the calculated hash, `true` otherwise.

To be added.

## SHA1.HashSizeInBits field

```csharp
public const int HashSizeInBits = 160;
```

The hash size produced by the SHA-1 algorithm, in bits.

To be added.

## SHA1.HashSizeInBytes field

```csharp
public const int HashSizeInBytes = 20;
```

The hash size produced by the SHA-1 algorithm, in bytes.

To be added.

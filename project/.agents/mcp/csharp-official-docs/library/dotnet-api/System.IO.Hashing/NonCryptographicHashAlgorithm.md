---
title: "NonCryptographicHashAlgorithm class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Hashing/NonCryptographicHashAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NonCryptographicHashAlgorithm class

Namespace: `System.IO.Hashing`

```csharp
public abstract class NonCryptographicHashAlgorithm
```

Represents a non-cryptographic hash algorithm.

To be added.

## NonCryptographicHashAlgorithm.NonCryptographicHashAlgorithm(Int32) constructor

```csharp
protected NonCryptographicHashAlgorithm (int hashLengthInBytes);
```

Called from constructors in derived classes to initialize the `NonCryptographicHashAlgorithm` class.

Parameters:

- `hashLengthInBytes`: The number of bytes produced from this hash algorithm.

Exceptions:

- `ArgumentOutOfRangeException`: `hashLengthInBytes` is less than 1.

To be added.

## NonCryptographicHashAlgorithm.HashLengthInBytes property

```csharp
public int HashLengthInBytes { get; }
```

Gets the number of bytes produced from this hash algorithm.

Returns: The number of bytes produced from this hash algorithm.

To be added.

## NonCryptographicHashAlgorithm.Append(Byte[]) method

```csharp
public void Append (byte[] source);
```

Appends the contents of `source` to the data already processed for the current hash computation.

Parameters:

- `source`: The data to process.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## NonCryptographicHashAlgorithm.Append(Stream) method

```csharp
public void Append (System.IO.Stream stream);
```

Appends the contents of `stream` to the data already processed for the current hash computation.

Parameters:

- `stream`: The data to process.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

To be added.

## NonCryptographicHashAlgorithm.Append(Byte>) method

```csharp
public abstract void Append (ReadOnlySpan<byte> source);
```

When overridden in a derived class, appends the contents of `source` to the data already processed for the current hash computation.

Parameters:

- `source`: The data to process.

To be added.

## NonCryptographicHashAlgorithm.AppendAsync(Stream, CancellationToken) method

```csharp
public System.Threading.Tasks.Task AppendAsync (System.IO.Stream stream, System.Threading.CancellationToken <example-value> = default);
```

Asychronously reads the contents of `stream` and appends them to the data already processed for the current hash computation.

Parameters:

- `stream`: The data to process.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous append operation.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `NonCryptographicHashAlgorithm.Append`.

## NonCryptographicHashAlgorithm.GetCurrentHash() method

```csharp
public byte[] GetCurrentHash ();
```

Gets the current computed hash value without modifying accumulated state.

Returns: The hash value for the data already provided.

To be added.

## NonCryptographicHashAlgorithm.GetCurrentHash(Byte>) method

```csharp
public int GetCurrentHash (Span<byte> destination);
```

Writes the computed hash value to `destination` without modifying accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.

Returns: The number of bytes written to `destination`, which is always `NonCryptographicHashAlgorithm.HashLengthInBytes`.

Exceptions:

- `ArgumentException`: `destination` is shorter than `NonCryptographicHashAlgorithm.HashLengthInBytes`.

To be added.

## NonCryptographicHashAlgorithm.GetCurrentHashCore(Byte>) method

```csharp
protected abstract void GetCurrentHashCore (Span<byte> destination);
```

When overridden in a derived class, writes the computed hash value to `destination` without modifying accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.

#### Remarks

Implementations of this method must write exactly
`HashLengthInBytes` bytes to `destination`.
Do not assume that the buffer was zero-initialized.

The `NonCryptographicHashAlgorithm` class validates the
size of the buffer before calling this method, and slices the span
down to be exactly `HashLengthInBytes` in length.

## NonCryptographicHashAlgorithm.GetHashAndReset() method

```csharp
public byte[] GetHashAndReset ();
```

Gets the current computed hash value and clears the accumulated state.

Returns: The hash value for the data already provided.

To be added.

## NonCryptographicHashAlgorithm.GetHashAndReset(Byte>) method

```csharp
public int GetHashAndReset (Span<byte> destination);
```

Writes the computed hash value to `destination` then clears the accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.

Returns: The number of bytes written to `destination`, which is always `NonCryptographicHashAlgorithm.HashLengthInBytes`.

Exceptions:

- `ArgumentException`: `destination` is shorter than `NonCryptographicHashAlgorithm.HashLengthInBytes`.

To be added.

## NonCryptographicHashAlgorithm.GetHashAndResetCore(Byte>) method

```csharp
protected virtual void GetHashAndResetCore (Span<byte> destination);
```

Writes the computed hash value to `destination` then clears the accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.

#### Remarks

Implementations of this method must write exactly
`HashLengthInBytes` bytes to `destination`.
Do not assume that the buffer was zero-initialized.

The `NonCryptographicHashAlgorithm` class validates the
size of the buffer before calling this method, and slices the span
down to be exactly `HashLengthInBytes` in length.

The default implementation of this method calls
`GetCurrentHashCore` followed by `Reset`.
Overrides of this method do not need to call either of those methods,
but must ensure that the caller cannot observe a difference in behavior.

## NonCryptographicHashAlgorithm.GetHashCode() method

```csharp
public override int GetHashCode ();
```

This method is not supported and should not be called.
Call `NonCryptographicHashAlgorithm.GetCurrentHash` or `NonCryptographicHashAlgorithm.GetHashAndReset` instead.

Returns: This method will always throw a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: In all cases.

To be added.

## NonCryptographicHashAlgorithm.Reset() method

```csharp
public abstract void Reset ();
```

When overridden in a derived class, resets the hash computation to the initial state.

To be added.

## NonCryptographicHashAlgorithm.TryGetCurrentHash(Byte>, Int32) method

```csharp
public bool TryGetCurrentHash (Span<byte> destination, out int bytesWritten);
```

Attempts to write the computed hash value to `destination` without modifying accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if `destination` is long enough to receive the computed hash value; otherwise, `false`.

To be added.

## NonCryptographicHashAlgorithm.TryGetHashAndReset(Byte>, Int32) method

```csharp
public bool TryGetHashAndReset (Span<byte> destination, out int bytesWritten);
```

Attempts to write the computed hash value to `destination`.
If successful, clears the accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` and clears the accumulated state if `destination` is long enough to receive the computed hash value; otherwise, `false`.

To be added.

---
title: "Shake128 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Shake128.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Shake128 class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class Shake128 : IDisposable
```

Computes the SHAKE128 hash for the input data.

This algorithm is specified by FIPS 202. The SHAKE algorithm family is an extendable-output function (XOF) that allows the output to be extended to any length. The size of the XOF indicates the security strength of the algorithm, not the output size.

## Shake128.Shake128() constructor

```csharp
public Shake128 ();
```

Initializes a new instance of the `Shake128` class.

Exceptions:

- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the algorithm is supported on the current platform.

Returns: `true` if the algorithm is supported; otherwise, `false`.

To be added.

## Shake128.AppendData(Byte[]) method

```csharp
public void AppendData (byte[] data);
```

Appends the specified data to the data already processed in the hash.

Parameters:

- `data`: The data to process.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.AppendData(Byte>) method

```csharp
public void AppendData (ReadOnlySpan<byte> data);
```

Appends the specified data to the data already processed in the hash.

Parameters:

- `data`: The data to process.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.Clone() method

```csharp
public System.Security.Cryptography.Shake128 Clone ();
```

Creates a new instance of `Shake128` with the existing appended data preserved.

Returns: A clone of the current instance.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `InvalidOperationException`: The current instance is being read from and cannot be cloned.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## Shake128.GetCurrentHash(Int32) method

```csharp
public byte[] GetCurrentHash (int outputLength);
```

Retrieves the hash for the data accumulated from prior calls to the `AppendData` methods, without resetting the object to its initial state.

Parameters:

- `outputLength`: The size of the hash to produce.

Returns: The computed hash.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.GetCurrentHash(Byte>) method

```csharp
public void GetCurrentHash (Span<byte> destination);
```

Fills the buffer with the hash for the data accumulated from prior calls to the `AppendData` methods, without resetting the object to its initial state.

Parameters:

- `destination`: The buffer to fill with the hash.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.GetHashAndReset(Int32) method

```csharp
public byte[] GetHashAndReset (int outputLength);
```

Retrieves the hash for the data accumulated from prior calls to the `AppendData` methods, and resets the object to its initial state.

Parameters:

- `outputLength`: The size of the hash to produce.

Returns: The computed hash.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.GetHashAndReset(Byte>) method

```csharp
public void GetHashAndReset (Span<byte> destination);
```

Fills the buffer with the hash for the data accumulated from prior calls to the `AppendData` methods, and resets the object to its initial state.

Parameters:

- `destination`: The buffer to fill with the hash.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## Shake128.HashData(Byte[], Int32) method

```csharp
public static byte[] HashData (byte[] source, int outputLength);
```

Computes the hash of data using the SHAKE128 algorithm.

Parameters:

- `source`: The data to hash.
- `outputLength`: The size of the hash to produce.

Returns: The hash of the data.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ArgumentNullException`: `source` is `null`.
- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.HashData(Stream, Int32) method

```csharp
public static byte[] HashData (System.IO.Stream source, int outputLength);
```

Computes the hash of a stream using the SHAKE128 algorithm.

Parameters:

- `source`: The stream to hash.
- `outputLength`: The size of the hash to produce.

Returns: The hash of the data.

Exceptions:

- `ArgumentException`: `source` does not support reading.
- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ArgumentNullException`: `source` is `null`.
- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.HashData(Stream, Byte>) method

```csharp
public static void HashData (System.IO.Stream source, Span<byte> destination);
```

Computes the hash of a stream using the SHAKE128 algorithm.

Parameters:

- `source`: The stream to hash.
- `destination`: The buffer to fill with the hash.

Exceptions:

- `ArgumentException`: `source` does not support reading.
- `ArgumentNullException`: `source` is `null`.
- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.HashData(Byte>, Int32) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> source, int outputLength);
```

Computes the hash of data using the SHAKE128 algorithm.

Parameters:

- `source`: The data to hash.
- `outputLength`: The size of the hash to produce.

Returns: The hash of the data.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.HashData(Byte>, Byte>) method

```csharp
public static void HashData (ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the hash of data using the SHAKE128 algorithm.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer to fill with the hash.

Exceptions:

- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.HashDataAsync(Stream, Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (System.IO.Stream source, int outputLength, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the SHAKE128 algorithm.

Parameters:

- `source`: The stream to hash.
- `outputLength`: The size of the hash to produce.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: A `ValueTask<T>` that completes with the computed hash.

Exceptions:

- `ArgumentException`: `source` does not support reading.
- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ArgumentNullException`: `source` is `null`.
- `OperationCanceledException`: `cancellationToken` has been canceled.
- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.HashDataAsync(Stream, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask HashDataAsync (System.IO.Stream source, Memory<byte> destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the SHAKE128 algorithm.

Parameters:

- `source`: The stream to hash.
- `destination`: The buffer to fill with the hash.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: A `ValueTask` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `OperationCanceledException`: `cancellationToken` has been canceled.
- `PlatformNotSupportedException`: The platform does not support SHAKE128. Callers can use the `Shake128.IsSupported` property
to determine if the platform supports SHAKE128.

To be added.

## Shake128.Read(Int32) method

```csharp
public byte[] Read (int outputLength);
```

Retrieves the hash for the data accumulated from prior calls to the `AppendData` methods without resetting the object to its initial state and allowing additional calls to continue retrieving the hash.

Parameters:

- `outputLength`: The size of the hash to produce.

Returns: The computed hash.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.
- `PlatformNotSupportedException`: The platform does not support multiple reads of the hash. `Shake128.GetHashAndReset` can be used
to perform a single operation.

To be added.

## Shake128.Read(Byte>) method

```csharp
public void Read (Span<byte> destination);
```

Fills the buffer with the hash for the data accumulated from prior calls to the `AppendData` methods without resetting the object to its initial state and allowing additional calls to continue retrieving the hash.

Parameters:

- `destination`: The buffer to fill with the hash.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.
- `PlatformNotSupportedException`: The platform does not support multiple reads of the hash. `Shake128.GetHashAndReset` can be used
to perform a single operation.

To be added.

## Shake128.Reset() method

```csharp
public void Reset ();
```

Resets the instance back to its initial state.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

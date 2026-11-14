---
title: "KmacXof256 class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/KmacXof256.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KmacXof256 class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class KmacXof256 : IDisposable
```

Computes the KMACXOF256 MAC for the input data.

This algorithm is specified by NIST SP 800-185.

## KmacXof256.KmacXof256(Byte[], Byte[]) constructor

```csharp
public KmacXof256 (byte[] key, byte[]? customizationString = default);
```

Initializes a new instance of the `KmacXof256` class.

Parameters:

- `key`: The KMAC key.
- `customizationString`: An optional customization string. The default is no customization string.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `CryptographicException`: An error has occurred creating an instance of the algorithm.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.KmacXof256(Byte>, Byte>) constructor

```csharp
public KmacXof256 (ReadOnlySpan<byte> key, ReadOnlySpan<byte> customizationString = default);
```

Initializes a new instance of the `KmacXof256` class.

Parameters:

- `key`: The KMAC key.
- `customizationString`: An optional customization string. The default is no customization string.

Exceptions:

- `CryptographicException`: An error has occurred creating an instance of the algorithm.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the algorithm is supported on the current platform.

Returns: `true` if the algorithm is supported; otherwise, `false`.

To be added.

## KmacXof256.AppendData(Byte[]) method

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

## KmacXof256.AppendData(Byte>) method

```csharp
public void AppendData (ReadOnlySpan<byte> data);
```

Appends the specified data to the data already processed in the hash.

Parameters:

- `data`: The data to process.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

To be added.

## KmacXof256.Clone() method

```csharp
public System.Security.Cryptography.KmacXof256 Clone ();
```

Creates a new instance of `KmacXof256` with the existing appended data preserved.

Returns: A clone of the current instance.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## KmacXof256.Dispose() method

```csharp
public void Dispose ();
```

Release all resources used by the current instance of the `KmacXof256` class.

To be added.

## KmacXof256.GetCurrentHash(Int32) method

```csharp
public byte[] GetCurrentHash (int outputLength);
```

Retrieves the hash for the data accumulated from prior calls to the `AppendData` methods, without resetting the object to its initial state.

Parameters:

- `outputLength`: The size of the hash to produce.

Returns: The computed hash.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## KmacXof256.GetCurrentHash(Byte>) method

```csharp
public void GetCurrentHash (Span<byte> destination);
```

Fills the buffer with the hash for the data accumulated from prior calls to the `AppendData` methods, without resetting the object to its initial state.

Parameters:

- `destination`: The buffer to fill with the hash.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## KmacXof256.GetHashAndReset(Int32) method

```csharp
public byte[] GetHashAndReset (int outputLength);
```

Retrieves the hash for the data accumulated from prior calls to the `AppendData` methods, and resets the object to its initial state.

Parameters:

- `outputLength`: The size of the hash to produce.

Returns: The computed hash.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## KmacXof256.GetHashAndReset(Byte>) method

```csharp
public void GetHashAndReset (Span<byte> destination);
```

Fills the buffer with the hash for the data accumulated from prior calls to the `AppendData` methods, and resets the object to its initial state.

Parameters:

- `destination`: The buffer to fill with the hash.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## KmacXof256.HashData(Byte[], Byte[], Int32, Byte[]) method

```csharp
public static byte[] HashData (byte[] key, byte[] source, int outputLength, byte[]? customizationString = default);
```

Computes the hash of data using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The data to hash.
- `outputLength`: The size of the hash to produce.
- `customizationString`: An optional customization string. The default is no customization string.

Returns: The hash of the data.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ArgumentNullException`: `key` or `source` is `null`.
- `CryptographicException`: An error has occurred during the operation.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashData(Byte[], Stream, Int32, Byte[]) method

```csharp
public static byte[] HashData (byte[] key, System.IO.Stream source, int outputLength, byte[]? customizationString = default);
```

Computes the hash of a stream using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The stream to hash.
- `outputLength`: The size of the hash to produce.
- `customizationString`: An optional customization string. The default is no customization string.

Returns: The hash of the data.

Exceptions:

- `ArgumentException`: `source` does not support reading.
- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ArgumentNullException`: `key` or `source` is `null`.
- `CryptographicException`: An error has occurred during the operation.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashData(Byte>, Stream, Int32, Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, System.IO.Stream source, int outputLength, ReadOnlySpan<byte> customizationString = default);
```

Computes the hash of a stream using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The stream to hash.
- `outputLength`: The size of the hash to produce.
- `customizationString`: An optional customization string. The default is no customization string.

Returns: The hash of the data.

Exceptions:

- `ArgumentException`: `source` does not support reading.
- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `ArgumentNullException`: `source` is `null`.
- `CryptographicException`: An error has occurred during the operation.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashData(Byte>, Stream, Byte>, Byte>) method

```csharp
public static void HashData (ReadOnlySpan<byte> key, System.IO.Stream source, Span<byte> destination, ReadOnlySpan<byte> customizationString = default);
```

Computes the hash of a stream using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The stream to hash.
- `destination`: The buffer to fill with the hash.
- `customizationString`: An optional customization string. The default is no customization string.

Exceptions:

- `ArgumentException`: `source` does not support reading.
- `ArgumentNullException`: `source` is `null`.
- `CryptographicException`: An error has occurred during the operation.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashData(Byte>, Byte>, Int32, Byte>) method

```csharp
public static byte[] HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, int outputLength, ReadOnlySpan<byte> customizationString = default);
```

Computes the hash of data using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The data to hash.
- `outputLength`: The size of the hash to produce.
- `customizationString`: An optional customization string. The default is no customization string.

Returns: The hash of the data.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `CryptographicException`: An error has occurred during the operation.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashData(Byte>, Byte>, Byte>, Byte>) method

```csharp
public static void HashData (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, Span<byte> destination, ReadOnlySpan<byte> customizationString = default);
```

Computes the hash of data using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The data to hash.
- `destination`: The buffer to fill with the hash.
- `customizationString`: An optional customization string. The default is no customization string.

Exceptions:

- `CryptographicException`: An error has occurred during the operation.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashDataAsync(Byte[], Stream, Int32, Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (byte[] key, System.IO.Stream source, int outputLength, byte[]? customizationString = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The stream to hash.
- `outputLength`: The size of the hash to produce.
- `customizationString`: An optional customization string. The default is no customization string.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: A `ValueTask<T>` that completes with the computed hash.

Exceptions:

- `ArgumentNullException`: `key` or `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `CryptographicException`: An error has occurred during the operation.
- `OperationCanceledException`: `cancellationToken` has been canceled.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashDataAsync(Byte>, Stream, Int32, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<byte[]> HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, int outputLength, ReadOnlyMemory<byte> customizationString = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The stream to hash.
- `outputLength`: The size of the hash to produce.
- `customizationString`: An optional customization string. The default is no customization string.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: A `ValueTask<T>` that completes with the computed hash.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `ArgumentOutOfRangeException`: `outputLength` is negative.
- `CryptographicException`: An error has occurred during the operation.
- `OperationCanceledException`: `cancellationToken` has been canceled.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.HashDataAsync(Byte>, Stream, Byte>, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask HashDataAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, Memory<byte> destination, ReadOnlyMemory<byte> customizationString = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash of a stream using the KMACXOF256 algorithm.

Parameters:

- `key`: The KMAC key.
- `source`: The stream to hash.
- `destination`: The buffer to fill with the hash.
- `customizationString`: An optional customization string. The default is no customization string.
- `cancellationToken`: The token to monitor for cancellation requests.
The default value is `CancellationToken.None`.

Returns: A `ValueTask` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` does not support reading.
- `CryptographicException`: An error has occurred during the operation.
- `OperationCanceledException`: `cancellationToken` has been canceled.
- `PlatformNotSupportedException`: The platform does not support KMACXOF256. Callers can use the `KmacXof256.IsSupported` property
to determine if the platform supports KMACXOF256.

To be added.

## KmacXof256.Verify(Byte[], Byte[], Byte[], Byte[]) method

```csharp
public static bool Verify (byte[] key, byte[] source, byte[] hash, byte[]? customizationString = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `customizationString`: To be added.

Returns: To be added.

To be added.

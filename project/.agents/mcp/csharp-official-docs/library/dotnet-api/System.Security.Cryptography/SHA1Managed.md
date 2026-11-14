---
title: "SHA1Managed class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SHA1Managed.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SHA1Managed class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SHA1Managed : System.Security.Cryptography.SHA1
```

Computes the `SHA1` hash for the input data using the managed library.

To be added.

## SHA1Managed.SHA1Managed() constructor

```csharp
public SHA1Managed ();
```

Initializes a new instance of the `SHA1Managed` class.

Exceptions:

- `InvalidOperationException`: This class is not compliant with the FIPS algorithm.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## SHA1Managed.Dispose(Boolean) method

```csharp
protected override sealed void Dispose (bool disposing);
```

Releases unmanaged resources used by the `SHA1Managed` object and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

<format type="text/markdown"><![CDATA[

## Remarks

This method is called by the public `Dispose` method and the `SHA1Managed.Finalize()` method. `Dispose` invokes the protected `Dispose` method with the `disposing` parameter set to `true`. `SHA1Managed.Finalize()` invokes `Dispose` with `disposing` set to `false`.

## SHA1Managed.HashCore(Byte>) method

```csharp
protected override sealed void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the hash algorithm for computing the hash.

Parameters:

- `source`: The input to compute the hash code for.

To be added.

## SHA1Managed.HashCore(Byte[], Int32, Int32) method

```csharp
protected override sealed void HashCore (byte[] array, int ibStart, int cbSize);
```

Routes data written to the object into the `SHA1Managed` hash algorithm for computing the hash.

Parameters:

- `array`: The input data.
- `ibStart`: The offset into the byte array from which to begin using data.
- `cbSize`: The number of bytes in the array to use as data.

To be added.

## SHA1Managed.HashFinal() method

```csharp
protected override sealed byte[] HashFinal ();
```

Returns the computed `SHA1` hash value after all data has been written to the object.

Returns: The computed hash code.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## SHA1Managed.Initialize() method

```csharp
public override sealed void Initialize ();
```

Initializes an instance of `SHA1Managed`.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## SHA1Managed.TryHashFinal(Byte>, Int32) method

```csharp
protected override sealed bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the hash computation after the last data is processed by the hash algorithm.

Parameters:

- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash value; otherwise, `false`.

To be added.

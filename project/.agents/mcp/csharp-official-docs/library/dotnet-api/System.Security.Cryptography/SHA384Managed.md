---
title: "SHA384Managed class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SHA384Managed.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SHA384Managed class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SHA384Managed : System.Security.Cryptography.SHA384
```

Computes the `SHA384` hash for the input data using the managed library.

To be added.

## SHA384Managed.SHA384Managed() constructor

```csharp
public SHA384Managed ();
```

Initializes a new instance of the `SHA384Managed` class.

Exceptions:

- `InvalidOperationException`: The Federal Information Processing Standards (FIPS) security setting is enabled. This implementation is not part of the Windows Platform FIPS-validated cryptographic algorithms.

#### Remarks
The hash is used as a unique value of fixed size representing a large amount of data. Hashes of two sets of data should match if and only if the corresponding data also matches. Small changes to the data result in large unpredictable changes in the hash.

The hash size for the `SHA384Managed` algorithm is 384 bits.

> **Important:**
> If you enable the following security setting either in the Local Security Policy or as part of Group Policy you will get an `InvalidOperationException` when you attempt to use this constructor:
>
> **System cryptography: Use FIPS compliant algorithms for encryption, hashing, and signing**

## SHA384Managed.Dispose(Boolean) method

```csharp
protected override sealed void Dispose (bool disposing);
```

Releases unmanaged resources used by the `SHA384Managed` object and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

<format type="text/markdown"><![CDATA[

## Remarks

This method is called by the public `Dispose` method and the `SHA384Managed.Finalize()` method. `Dispose` invokes the protected `Dispose` method with the `disposing` parameter set to `true`. `SHA384Managed.Finalize()` invokes `Dispose` with `disposing` set to `false`.

## SHA384Managed.HashCore(Byte>) method

```csharp
protected override sealed void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the hash algorithm for computing the hash.

Parameters:

- `source`: The input to compute the hash code for.

To be added.

## SHA384Managed.HashCore(Byte[], Int32, Int32) method

```csharp
protected override sealed void HashCore (byte[] array, int ibStart, int cbSize);
```

When overridden in a derived class, routes data written to the object into the `SHA384Managed` hash algorithm for computing the hash.

Parameters:

- `array`: The input data.
- `ibStart`: The offset into the byte array from which to begin using data.
- `cbSize`: The number of bytes in the array to use as data.

#### Remarks
This method is not called by application code.

This abstract method performs the hash computation. Every write to the cryptographic stream object passes the data through this method. For each block of data, this method updates the state of the hash object so a correct hash value is returned at the end of the data stream.

## SHA384Managed.HashFinal() method

```csharp
protected override sealed byte[] HashFinal ();
```

When overridden in a derived class, finalizes the hash computation after the last data is processed by the cryptographic stream object.

Returns: The computed hash code.

#### Remarks
This method is not called by application code. This method finalizes any partial computation and returns the correct hash value of the data stream.

## SHA384Managed.Initialize() method

```csharp
public override sealed void Initialize ();
```

Initializes an instance of `SHA384Managed`.

#### Remarks
The hash is used as a unique value of fixed size representing a large amount of data. Hashes of two sets of data should match if and only if the corresponding data also matches. Small changes to the data result in large unpredictable changes in the hash.

The hash size for the `SHA384Managed` algorithm is 384 bits.

## SHA384Managed.TryHashFinal(Byte>, Int32) method

```csharp
protected override sealed bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the hash computation after the last data is processed by the hash algorithm.

Parameters:

- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash value; otherwise, `false`.

To be added.

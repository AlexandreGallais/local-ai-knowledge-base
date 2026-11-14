---
title: "HashAlgorithm class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HashAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashAlgorithm class (part 2 of 2)

## HashAlgorithm.TransformFinalBlock(Byte[], Int32, Int32) method

```csharp
public byte[] TransformFinalBlock (byte[] inputBuffer, int inputOffset, int inputCount);
```

Computes the hash value for the specified region of the specified byte array.

Parameters:

- `inputBuffer`: The input to compute the hash code for.
- `inputOffset`: The offset into the byte array from which to begin using data.
- `inputCount`: The number of bytes in the byte array to use as data.

Returns: An array that is a copy of the part of the input that is hashed.

Exceptions:

- `ArgumentException`: `inputCount` uses an invalid value.

-or-

`inputBuffer` has an invalid offset length.
- `ArgumentNullException`: `inputBuffer` is `null`.
- `ArgumentOutOfRangeException`: `inputOffset` is out of range. This parameter requires a non-negative number.
- `ObjectDisposedException`: The object has already been disposed.

#### Remarks
You must call the `HashAlgorithm.TransformFinalBlock` method after calling the `HashAlgorithm.TransformBlock` method but before you retrieve the final hash value.

Note that the return value of this method is not the hash value, but only a copy of the hashed part of the input data.  To retrieve the final hashed value after calling the `HashAlgorithm.TransformFinalBlock` method, get the byte array contained in the `Hash` property.

#### Examples
The following code examples use the `HashAlgorithm.TransformFinalBlock` method with the `HashAlgorithm.TransformBlock` method to hash a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/HashAlgorithm/TransformBlock/sample.cs._

## HashAlgorithm.TryComputeHash(Byte>, Byte>, Int32) method

```csharp
public bool TryComputeHash (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the hash value for the specified byte array.

Parameters:

- `source`: The input to compute the hash code for.
- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash value; otherwise, `false`.

To be added.

## HashAlgorithm.TryHashFinal(Byte>, Int32) method

```csharp
protected virtual bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the hash computation after the last data is processed by the hash algorithm.

Parameters:

- `destination`: The buffer to receive the hash value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash value; otherwise, `false`.

#### Remarks
The default implementation of this method is to call `HashFinal` and copy the result to `destination`.

Derived types should override this method to avoid the intermediate array creation.

All calls to this method by the `HashAlgorithm` class have already verified that `destination` is long enough based on the `HashSize` property,
so `false` return values are unexpected.

## HashAlgorithm.HashSizeValue field

```csharp
protected int HashSizeValue;
```

Represents the size, in bits, of the computed hash code.

#### Remarks
The hash algorithm specifies the size of the hash code. For example, `SHA1` uses a hash size of 160 bits.

This field is accessed through the `HashSize` property.

## HashAlgorithm.HashValue field

```csharp
protected internal byte[]? HashValue;
```

Represents the value of the computed hash code.

#### Remarks
This field is accessed through the `Hash` property.

## HashAlgorithm.State field

```csharp
protected int State;
```

Represents the state of the hash computation.

#### Remarks
This field is used to prevent users from changing the key of a keyed hash algorithm during a hash operation. When a key <example-value> is legitimate, the value of this field is zero both before and after a hash operation. When a key <example-value> is not legitimate, the value of this field is nonzero.

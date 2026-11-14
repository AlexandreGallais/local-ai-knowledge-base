---
title: "ICryptoTransform interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ICryptoTransform.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICryptoTransform interface

Namespace: `System.Security.Cryptography`

```csharp
public interface ICryptoTransform : IDisposable
```

Defines the basic <example-value> of cryptographic transformations.

#### Remarks
Hash algorithms are an example of cryptographic transformations (`HashAlgorithm`).

## ICryptoTransform.CanReuseTransform property

```csharp
public bool CanReuseTransform { get; }
```

Gets a value indicating whether the current transform can be reused.

Returns: `true` if the current transform can be reused; otherwise, `false`.

To be added.

## ICryptoTransform.CanTransformMultipleBlocks property

```csharp
public bool CanTransformMultipleBlocks { get; }
```

Gets a value indicating whether multiple blocks can be transformed.

Returns: `true` if multiple blocks can be transformed; otherwise, `false`.

To be added.

## ICryptoTransform.InputBlockSize property

```csharp
public int InputBlockSize { get; }
```

Gets the input block size.

Returns: The size of the input data blocks in bytes.

To be added.

## ICryptoTransform.OutputBlockSize property

```csharp
public int OutputBlockSize { get; }
```

Gets the output block size.

Returns: The size of the output data blocks in bytes.

To be added.

## ICryptoTransform.TransformBlock(Byte[], Int32, Int32, Byte[], Int32) method

```csharp
public int TransformBlock (byte[] inputBuffer, int inputOffset, int inputCount, byte[] outputBuffer, int outputOffset);
```

Transforms the specified region of the input byte array and copies the resulting transform to the specified region of the output byte array.

Parameters:

- `inputBuffer`: The input for which to compute the transform.
- `inputOffset`: The offset into the input byte array from which to begin using data.
- `inputCount`: The number of bytes in the input byte array to use as data.
- `outputBuffer`: The output to which to write the transform.
- `outputOffset`: The offset into the output byte array from which to begin writing data.

Returns: The number of bytes written.

#### Remarks
The return value of `ICryptoTransform.TransformBlock` is the number of bytes returned to `outputBuffer` and is always less than or equal to `OutputBlockSize`. If `CanTransformMultipleBlocks` is `true`, then `inputCount` must be any positive multiple of `InputBlockSize`.

## ICryptoTransform.TransformFinalBlock(Byte[], Int32, Int32) method

```csharp
public byte[] TransformFinalBlock (byte[] inputBuffer, int inputOffset, int inputCount);
```

Transforms the specified region of the specified byte array.

Parameters:

- `inputBuffer`: The input for which to compute the transform.
- `inputOffset`: The offset into the byte array from which to begin using data.
- `inputCount`: The number of bytes in the byte array to use as data.

Returns: The computed transform.

#### Remarks
`ICryptoTransform.TransformFinalBlock` is a special function for transforming the last block or a partial block in the stream. It returns a new array that contains the remaining transformed bytes. A new array is returned, because the amount of information returned at the end might be larger than a single block when padding is added.

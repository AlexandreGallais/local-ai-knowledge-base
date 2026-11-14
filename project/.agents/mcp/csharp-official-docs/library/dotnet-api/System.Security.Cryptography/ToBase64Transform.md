---
title: "ToBase64Transform class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ToBase64Transform.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ToBase64Transform class

Namespace: `System.Security.Cryptography`

```csharp
public class ToBase64Transform : IDisposable, System.Security.Cryptography.ICryptoTransform
```

Converts a `CryptoStream` to base 64.

#### Remarks
Base 64 Content-Transfer-Encoding represents arbitrary bit sequences in a form that is not human readable.

#### Examples
The following code example demonstrates how to use members of the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.ToBase64Transform() constructor

```csharp
public ToBase64Transform ();
```

Initializes a new instance of the `ToBase64Transform` class.

To be added.

## ToBase64Transform.CanReuseTransform property

```csharp
public virtual bool CanReuseTransform { get; }
```

Gets a value indicating whether the current transform can be reused.

Returns: Always `true`.

#### Examples
The following code example demonstrates how to call the `CanReuseTransform` property to determine if the current transform can be reused. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.CanTransformMultipleBlocks property

```csharp
public bool CanTransformMultipleBlocks { get; }
```

Gets a value that indicates whether multiple blocks can be transformed.

Returns: `true` if multiple blocks can be transformed; otherwise, `false`.

#### Examples
The following code example demonstrates how to call the `ToBase64Transform.CanTransformMultipleBlocks` method to verify that multiple blocks can be transformed. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.InputBlockSize property

```csharp
public int InputBlockSize { get; }
```

Gets the input block size.

Returns: The size of the input data blocks in bytes.

#### Remarks
The input block size for this transformation is 3 bytes.

#### Examples
The following code example demonstrates how to call the `InputBlockSize` property to retrieve the input block size of the current transform. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.OutputBlockSize property

```csharp
public int OutputBlockSize { get; }
```

Gets the output block size.

Returns: The size of the output data blocks in bytes.

#### Remarks
The output block size for this transformation is 4 bytes.

#### Examples
The following code example demonstrates how to call the `OutputBlockSize` property to create a new byte array with the size of the output block size. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.Clear() method

```csharp
public void Clear ();
```

Releases all resources used by the `ToBase64Transform`.

#### Remarks
This method is a simple call to `IDisposable.Dispose`.

Calling `Dispose` allows the resources used by the `ToBase64Transform` to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

#### Examples
The following code example demonstrates how to call the `ToBase64Transform.Clear` method to free up unused resources by the current transform. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `ToBase64Transform` class.

#### Remarks
Call `Dispose` when you are finished using the `ToBase64Transform`. The `Dispose` method leaves the `ToBase64Transform` in an unusable state. After calling `Dispose`, you must release all references to the `ToBase64Transform` so the garbage collector can reclaim the memory that the `ToBase64Transform` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `ToBase64Transform`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `ToBase64Transform` object's `Finalize` method.

## ToBase64Transform.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `ToBase64Transform` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes the protected `Dispose(Boolean)` method with the disposing parameter set to `true`. `Finalize` invokes `Dispose` with disposing set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `ToBase64Transform` references. This method invokes the `Dispose()` method of each referenced object.

## ToBase64Transform.Finalize() method

```csharp
~ToBase64Transform ();
```

Releases the unmanaged resources used by the `ToBase64Transform`.

To be added.

## ToBase64Transform.TransformBlock(Byte[], Int32, Int32, Byte[], Int32) method

```csharp
public int TransformBlock (byte[] inputBuffer, int inputOffset, int inputCount, byte[] outputBuffer, int outputOffset);
```

Converts the specified region of the input byte array to base 64 and copies the result to the specified region of the output byte array.

Parameters:

- `inputBuffer`: The input to compute to base 64.
- `inputOffset`: The offset into the input byte array from which to begin using data.
- `inputCount`: The number of bytes in the input byte array to use as data.
- `outputBuffer`: The output to which to write the result.
- `outputOffset`: The offset into the output byte array from which to begin writing data.

Returns: The number of bytes written.

Exceptions:

- `ObjectDisposedException`: The current `ToBase64Transform` object has already been disposed.
- `CryptographicException`: The data size is not valid.
- `ArgumentException`: The `inputOffset` parameter contains an invalid offset length.

-or-

The `inputCount` parameter contains an invalid value.
- `ArgumentNullException`: The `inputBuffer` parameter is `null`.
- `ArgumentOutOfRangeException`: The `inputCount` parameter requires a non-negative number and less than or equal to the length of `inputBuffer`.

#### Remarks
The `ToBase64Transform` class is a block algorithm that processes input blocks of 3 bytes and creates output blocks of 4 bytes.  The `ToBase64Transform.TransformBlock` method transforms an input block of 24 bits into 32 bits of character data.  You must maintain 3 byte input boundaries to 4 byte output boundaries in order to match the block transform.

#### Examples
The following code example demonstrates how to call the `ToBase64Transform.TransformBlock` method to iterate through `inputBytes` transforming by `blockSize`. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

## ToBase64Transform.TransformFinalBlock(Byte[], Int32, Int32) method

```csharp
public byte[] TransformFinalBlock (byte[] inputBuffer, int inputOffset, int inputCount);
```

Converts the specified region of the specified byte array to base 64.

Parameters:

- `inputBuffer`: The input to convert to base 64.
- `inputOffset`: The offset into the byte array from which to begin using data.
- `inputCount`: The number of bytes in the byte array to use as data.

Returns: The computed base 64 conversion.

Exceptions:

- `ObjectDisposedException`: The current `ToBase64Transform` object has already been disposed.
- `ArgumentException`: The `inputOffset` parameter contains an invalid offset length.

-or-

The `inputCount` parameter contains an invalid value.
- `ArgumentNullException`: The `inputBuffer` parameter is `null`.
- `ArgumentOutOfRangeException`: The `inputCount` parameter requires a non-negative number and less than or equal to the length of `inputBuffer`.

#### Examples
The following code example demonstrates how to call the `ToBase64Transform.TransformFinalBlock` method to transform the final block of data. This code example is part of a larger example provided for the `ToBase64Transform` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ToBase64Transform/Overview/members.cs._

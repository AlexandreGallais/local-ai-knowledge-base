---
title: "FromBase64Transform class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/FromBase64Transform.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FromBase64Transform class

Namespace: `System.Security.Cryptography`

```csharp
public class FromBase64Transform : IDisposable, System.Security.Cryptography.ICryptoTransform
```

Converts a `CryptoStream` from base 64.

#### Remarks
Base 64 Content-Transfer-Encoding represents arbitrary bit sequences in a form that is not human readable.

#### Examples
The following example decodes a base 64-encoded file to an output text file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/FromBase64Transform/Overview/class1.cs._

## FromBase64Transform.FromBase64Transform() constructor

```csharp
public FromBase64Transform ();
```

Initializes a new instance of the `FromBase64Transform` class.

#### Remarks
In the default configuration, white spaces are ignored. See `FromBase64TransformMode` for more details.

## FromBase64Transform.FromBase64Transform(FromBase64TransformMode) constructor

```csharp
public FromBase64Transform (System.Security.Cryptography.FromBase64TransformMode whitespaces);
```

Initializes a new instance of the `FromBase64Transform` class with the specified transformation mode.

Parameters:

- `whitespaces`: One of the `FromBase64Transform` values.

#### Examples
The following example decodes a base 64-encoded file to an output text file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/FromBase64Transform/Overview/class1.cs._

## FromBase64Transform.CanReuseTransform property

```csharp
public virtual bool CanReuseTransform { get; }
```

Gets a value indicating whether the current transform can be reused.

Returns: Always `true`.

To be added.

## FromBase64Transform.CanTransformMultipleBlocks property

```csharp
public bool CanTransformMultipleBlocks { get; }
```

Gets a value that indicates whether multiple blocks can be transformed.

Returns: A value that indicates whether multiple blocks can be transformed.

Multiple blocks can be transformed, so this property returns `true`.

## FromBase64Transform.InputBlockSize property

```csharp
public int InputBlockSize { get; }
```

Gets the input block size.

Returns: The size of the input data blocks in bytes.

#### Remarks
The input block size for this transformation is one byte.

## FromBase64Transform.OutputBlockSize property

```csharp
public int OutputBlockSize { get; }
```

Gets the output block size.

Returns: The size of the output data blocks in bytes.

#### Remarks
The output block size for this transformation is 3 bytes.

## FromBase64Transform.Clear() method

```csharp
public void Clear ();
```

Releases all resources used by the `FromBase64Transform`.

#### Remarks
This method is a simple call to `IDisposable.Dispose`.

Calling `Dispose` allows the resources used by the `FromBase64Transform` to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

## FromBase64Transform.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `FromBase64Transform` class.

#### Remarks
Call `Dispose` when you are finished using the `FromBase64Transform`. The `Dispose` method leaves the `FromBase64Transform` in an unusable state. After calling `Dispose`, you must release all references to the `FromBase64Transform` so the garbage collector can reclaim the memory that the `FromBase64Transform` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `FromBase64Transform`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `FromBase64Transform` object's `Finalize` method.

## FromBase64Transform.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `FromBase64Transform` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes the protected `Dispose(Boolean)` method with the disposing parameter set to `true`. `Finalize` invokes `Dispose` with disposing set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `FromBase64Transform` references. This method invokes the `Dispose()` method of each referenced object.

## FromBase64Transform.Finalize() method

```csharp
~FromBase64Transform ();
```

Releases the unmanaged resources used by the `FromBase64Transform`.

To be added.

## FromBase64Transform.TransformBlock(Byte[], Int32, Int32, Byte[], Int32) method

```csharp
public int TransformBlock (byte[] inputBuffer, int inputOffset, int inputCount, byte[] outputBuffer, int outputOffset);
```

Converts the specified region of the input byte array from base 64 and copies the result to the specified region of the output byte array.

Parameters:

- `inputBuffer`: The input to compute from base 64.
- `inputOffset`: The offset into the input byte array from which to begin using data.
- `inputCount`: The number of bytes in the input byte array to use as data.
- `outputBuffer`: The output to which to write the result.
- `outputOffset`: The offset into the output byte array from which to begin writing data.

Returns: The number of bytes written.

Exceptions:

- `ObjectDisposedException`: The current `FromBase64Transform` object has already been disposed.
- `ArgumentException`: `inputCount` uses an invalid value.

-or-

`inputBuffer` has an invalid offset length.
- `ArgumentOutOfRangeException`: `inputOffset` is out of range. This parameter requires a non-negative number.
- `ArgumentNullException`: `inputBuffer` is `null`.

#### Examples
The following example decrypts a base 64-encoded file to an output text file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/FromBase64Transform/Overview/class1.cs._

## FromBase64Transform.TransformFinalBlock(Byte[], Int32, Int32) method

```csharp
public byte[] TransformFinalBlock (byte[] inputBuffer, int inputOffset, int inputCount);
```

Converts the specified region of the specified byte array from base 64.

Parameters:

- `inputBuffer`: The input to convert from base 64.
- `inputOffset`: The offset into the byte array from which to begin using data.
- `inputCount`: The number of bytes in the byte array to use as data.

Returns: The computed conversion.

Exceptions:

- `ObjectDisposedException`: The current `FromBase64Transform` object has already been disposed.
- `ArgumentException`: `inputBuffer` has an invalid offset length.

-or-

`inputCount` has an invalid value.
- `ArgumentOutOfRangeException`: `inputOffset` is out of range. This parameter requires a non-negative number.
- `ArgumentNullException`: `inputBuffer` is `null`.

#### Examples
The following example decrypts a base 64-encoded file to an output text file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/FromBase64Transform/Overview/class1.cs._

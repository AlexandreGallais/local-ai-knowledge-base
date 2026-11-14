---
title: "What's new in .NET libraries for .NET 9 (part 5 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-9/libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 9 (part 5 of 6)

## System.Guid

`System.Guid.NewGuid` creates a `Guid` filled mostly with cryptographically secure random data, following the UUID Version 4 specification in RFC 9562. That same RFC also defines other versions, including Version 7, which "features a time-ordered value field derived from the widely implemented and well-known Unix Epoch timestamp source". In other words, much of the data is still random, but some of it is reserved for data based on a timestamp, which enables these values to have a natural sort order. In .NET 9, you can create a `Guid` according to Version 7 via the new `System.Guid.CreateVersion7` and `System.Guid.CreateVersion7(System.DateTimeOffset)` methods. You can also use the new `System.Guid.Version` property to retrieve a `Guid` object's version field.

## System.IO

- Compression with zlib-ng
- ZLib and Brotli compression options
- XPS documents from XPS virtual printer

### Compression with zlib-ng

`System.IO.Compression` features like `System.IO.Compression.ZipArchive`, `System.IO.Compression.DeflateStream`, `System.IO.Compression.GZipStream`, and `System.IO.Compression.ZLibStream` are all based primarily on the zlib library. Starting in .NET 9, these features instead all use zlib-ng, a library that yields more consistent and efficient processing across a wider array of operating systems and hardware.

### ZLib and Brotli compression options

`System.IO.Compression.ZLibCompressionOptions` and `System.IO.Compression.BrotliCompressionOptions` are new types for setting algorithm-specific compression level and strategy (`Default`, `Filtered`, `HuffmanOnly`, `RunLengthEncoding`, or `Fixed`). These types are aimed at users who want more fine-tuned settings than the only existing option, <System.IO.Compression.CompressionLevel>.

The new compression option types might be expanded in the future.

The following code snippet shows some example usage:

```csharp
private MemoryStream CompressStream(Stream uncompressedStream)
{
    MemoryStream compressorOutput = new();
    using ZLibStream compressionStream = new(
        compressorOutput,
        new ZLibCompressionOptions()
        {
            CompressionLevel = 6,
            CompressionStrategy = ZLibCompressionStrategy.HuffmanOnly
        }
        );
    uncompressedStream.CopyTo(compressionStream);
    compressionStream.Flush();

    return compressorOutput;
}
```
### XPS documents from XPS virtual printer

XPS documents coming from a V4 XPS virtual printer previously couldn't be opened using the `System.IO.Packaging` library, due to lack of support for handling _.piece_ files. This gap has been addressed in .NET 9.

## System.Numerics

- BigInteger upper limit
- `BigMul` APIs
- Vector conversion APIs
- Vector create APIs
- Additional acceleration

### BigInteger upper limit

`System.Numerics.BigInteger` supports representing integer values of essentially arbitrary length. However, in practice, the length is constrained by limits of the underlying computer, such as available memory or how long it would take to compute a given expression. Additionally, there exist some APIs that fail given inputs that result in a value that's too large. Because of these limits, .NET 9 enforces a maximum length of `BigInteger`, which is that it can contain no more than `(2^31) - 1` (approximately 2.14 billion) bits. Such a number represents an almost 256 MB allocation and contains approximately 646.5 million digits. This new limit ensures that all APIs exposed are well behaved and consistent while still allowing numbers that are far beyond most usage scenarios.

### `BigMul` APIs

`BigMul` is an operation that produces the full product of two numbers. .NET 9 adds dedicated `BigMul` APIs on `int`, `long`, `uint`, and `ulong` whose return type is the next larger integer type than the parameter types.

The new APIs are:

- `System.Int32.BigMul(System.Int32,System.Int32)` (returns `long`)
- `System.Int64.BigMul(System.Int64,System.Int64)` (returns `Int128`)
- `System.UInt32.BigMul(System.UInt32,System.UInt32)` (returns `ulong`)
- `System.UInt64.BigMul(System.UInt64,System.UInt64)` (returns `UInt128`)

### Vector conversion APIs

.NET 9 adds dedicated extension APIs for converting between `System.Numerics.Vector2`, `System.Numerics.Vector3`, `System.Numerics.Vector4`, `System.Numerics.Quaternion`, and `System.Numerics.Plane`.

The new APIs are as follows:

- `System.Numerics.Vector.AsPlane(System.Numerics.Vector4)`
- `System.Numerics.Vector.AsQuaternion(System.Numerics.Vector4)`
- `System.Numerics.Vector.AsVector2(System.Numerics.Vector4)`
- `System.Numerics.Vector.AsVector3(System.Numerics.Vector4)`
- `System.Numerics.Vector.AsVector4(System.Numerics.Plane)`
- `System.Numerics.Vector.AsVector4(System.Numerics.Quaternion)`
- `System.Numerics.Vector.AsVector4(System.Numerics.Vector2)`
- `System.Numerics.Vector.AsVector4(System.Numerics.Vector3)`
- `System.Numerics.Vector.AsVector4Unsafe(System.Numerics.Vector2)`
- `System.Numerics.Vector.AsVector4Unsafe(System.Numerics.Vector3)`

For same-sized conversions, such as between `Vector4`, `Quaternion`, and `Plane`, these conversions are zero cost. The same can be said for narrowing conversions, such as from `Vector4` to `Vector2` or `Vector3`. For widening conversions, such as from `Vector2` or `Vector3` to `Vector4`, there is the normal API, which initializes new elements to 0, and an `Unsafe` suffixed API that leaves these new elements undefined and therefore can be zero cost.

### Vector create APIs

There are new `Create` APIs exposed for `System.Numerics.Vector`, `System.Numerics.Vector2`, `System.Numerics.Vector3`, and `System.Numerics.Vector4` that parity the equivalent APIs exposed for the hardware vector types exposed in the `System.Runtime.Intrinsics` namespace.

For more information about the new APIs, see:

- `System.Numerics.Vector.Create*`
- `System.Numerics.Vector2.Create*`
- `System.Numerics.Vector3.Create*`
- `System.Numerics.Vector4.Create*`

These APIs are primarily for convenience and overall consistency across .NET's SIMD-accelerated types.

### Additional acceleration

Additional performance improvements have been made to many types in the `System.Numerics` namespace, including to `System.Numerics.BigInteger`, `System.Numerics.Vector2`, `System.Numerics.Vector3`, `System.Numerics.Vector4`, `System.Numerics.Quaternion`, and `System.Numerics.Plane`.

In some cases, this has resulted in a 2-5x speedup to core APIs including `Matrix4x4` multiplication, creation of `System.Numerics.Plane` from a series of vertices, `System.Numerics.Quaternion` concatenation, and computing the cross product of a `System.Numerics.Vector3`.

There's also constant folding support for the `SinCos` API, which computes both `Sin(x)` and `Cos(x)` in a single call, making it more efficient.

## Tensors for AI

Tensors are the cornerstone data structure of artificial intelligence (AI). They can often be thought of as multidimensional arrays.

Tensors are used to:

- Represent and encode data such as text sequences (tokens), images, video, and audio.
- Efficiently manipulate higher-dimensional data.
- Efficiently apply computations on higher-dimensional data.
- Store weight information and intermediate computations (in neural networks).

To use the .NET tensor APIs, install the System.Numerics.Tensors NuGet package.

### New Tensor\<T> type

The new `System.Numerics.Tensors.Tensor`1` type expands the AI capabilities of the .NET libraries and runtime. This type:

- Provides efficient interop with AI libraries like ML.NET, TorchSharp, and ONNX Runtime using zero copies where possible.
- Builds on top of `System.Numerics.Tensors.TensorPrimitives` for efficient math operations.
- Enables easy and efficient data manipulation by providing indexing and slicing operations.
- Is not a replacement for existing AI and machine learning libraries. Instead, it's intended to provide a common set of APIs to reduce code duplication and dependencies, and to achieve better performance by using the latest runtime features.

The following codes shows some of the APIs included with the new `Tensor<T>` type.

```csharp
﻿using System;
using System.Numerics.Tensors;

internal class Tensors
{
    public static void RunIt()
    {
        // Create a tensor (1 x 3).
        Tensor<int> t0 = Tensor.Create([1, 2, 3], [1, 3]); // [[1, 2, 3]]

        // Reshape tensor (3 x 1).
        Tensor<int> t1 = t0.Reshape([3, 1]); // [[1], [2], [3]]

        // Slice tensor (2 x 1).
        Tensor<int> t2 = t1.Slice(1.., ..); // [[2], [3]]

        // Broadcast tensor (3 x 1) -> (3 x 3).
        // [
        //  [ 1, 1, 1],
        //  [ 2, 2, 2],
        //  [ 3, 3, 3]
        // ]
        var t3 = Tensor.Broadcast<int>(t1, [3, 3]);

        // Math operations.
        var t4 = Tensor.Add(t0, 1); // [[2, 3, 4]]
        var t5 = Tensor.Add(t0.AsReadOnlyTensorSpan(), t0); // [[2, 4, 6]]
        var t6 = Tensor.Subtract(t0, 1); // [[0, 1, 2]]
        var t7 = Tensor.Subtract(t0.AsReadOnlyTensorSpan(), t0); // [[0, 0, 0]]
        var t8 = Tensor.Multiply(t0, 2); // [[2, 4, 6]]
        var t9 = Tensor.Multiply(t0.AsReadOnlyTensorSpan(), t0); // [[1, 4, 9]]
        var t10 = Tensor.Divide(t0, 2); // [[0.5, 1, 1.5]]
        var t11 = Tensor.Divide(t0.AsReadOnlyTensorSpan(), t0); // [[1, 1, 1]]

        ReadOnlySpan<float> vector1 = [1, 2, 3];
        ReadOnlySpan<float> vector2 = [4, 5, 6];
        Console.WriteLine(TensorPrimitives.CosineSimilarity(vector1, vector2));
        // Prints 0.9746318

        ReadOnlySpan<double> vector3 = [1, 2, 3];
        ReadOnlySpan<double> vector4 = [4, 5, 6];
        Console.WriteLine(TensorPrimitives.CosineSimilarity(vector3, vector4));
        // Prints 0.<example-card-number>

    }
}
```
> **Note:**
> This API is marked as experimental for .NET 9.

### TensorPrimitives

The `System.Numerics.Tensors` library includes the `System.Numerics.Tensors.TensorPrimitives` class, which provides static methods for performing numerical operations on spans of values. In .NET 9, the scope of methods exposed by `System.Numerics.Tensors.TensorPrimitives` has been significantly expanded, growing from 40 (in .NET 8) to almost 200 overloads. The surface area encompasses familiar numerical operations from types like `System.Math` and `System.MathF`. It also includes the generic math interfaces like `System.Numerics.INumber`1`, except instead of processing an individual value, they process a span of values. Many operations have also been accelerated via SIMD-optimized implementations for .NET 9.

`System.Numerics.Tensors.TensorPrimitives` now exposes generic overloads for any type `T` that implements a certain interface. (The .NET 8 version only included overloads for manipulating spans of `float` values.) For example, the new `System.Numerics.Tensors.TensorPrimitives.CosineSimilarity``1(System.ReadOnlySpan{``0},System.ReadOnlySpan{``0})` overload performs cosine similarity on two vectors of `float`, `double`, or `Half` values, or values of any other type that implements `System.Numerics.IRootFunctions`1`.

Compare the precision of the cosine similarity operation on two vectors of type `float` versus `double`:

```csharp
﻿using System;
using System.Numerics.Tensors;

internal class Tensors
{
    public static void RunIt()
    {
        // Create a tensor (1 x 3).
        Tensor<int> t0 = Tensor.Create([1, 2, 3], [1, 3]); // [[1, 2, 3]]

        // Reshape tensor (3 x 1).
        Tensor<int> t1 = t0.Reshape([3, 1]); // [[1], [2], [3]]

        // Slice tensor (2 x 1).
        Tensor<int> t2 = t1.Slice(1.., ..); // [[2], [3]]

        // Broadcast tensor (3 x 1) -> (3 x 3).
        // [
        //  [ 1, 1, 1],
        //  [ 2, 2, 2],
        //  [ 3, 3, 3]
        // ]
        var t3 = Tensor.Broadcast<int>(t1, [3, 3]);

        // Math operations.
        var t4 = Tensor.Add(t0, 1); // [[2, 3, 4]]
        var t5 = Tensor.Add(t0.AsReadOnlyTensorSpan(), t0); // [[2, 4, 6]]
        var t6 = Tensor.Subtract(t0, 1); // [[0, 1, 2]]
        var t7 = Tensor.Subtract(t0.AsReadOnlyTensorSpan(), t0); // [[0, 0, 0]]
        var t8 = Tensor.Multiply(t0, 2); // [[2, 4, 6]]
        var t9 = Tensor.Multiply(t0.AsReadOnlyTensorSpan(), t0); // [[1, 4, 9]]
        var t10 = Tensor.Divide(t0, 2); // [[0.5, 1, 1.5]]
        var t11 = Tensor.Divide(t0.AsReadOnlyTensorSpan(), t0); // [[1, 1, 1]]

        ReadOnlySpan<float> vector1 = [1, 2, 3];
        ReadOnlySpan<float> vector2 = [4, 5, 6];
        Console.WriteLine(TensorPrimitives.CosineSimilarity(vector1, vector2));
        // Prints 0.9746318

        ReadOnlySpan<double> vector3 = [1, 2, 3];
        ReadOnlySpan<double> vector4 = [4, 5, 6];
        Console.WriteLine(TensorPrimitives.CosineSimilarity(vector3, vector4));
        // Prints 0.<example-card-number>

    }
}
```

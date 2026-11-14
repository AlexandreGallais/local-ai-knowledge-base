---
title: "Use SIMD and hardware intrinsics in .NET (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/simd.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use SIMD and hardware intrinsics in .NET

SIMD (single instruction, multiple data) is hardware support for applying one operation to multiple pieces of data in parallel with a single instruction. Vectorized code processes several values per iteration instead of one, which can greatly increase throughput for the kind of numeric, scientific, graphics, text-processing, and data-parallel work where the same operation repeats over a buffer. The trade-off is added complexity, so it pays off most when the input is large enough and the win is confirmed with measurements.

.NET provides several kinds of SIMD support. Pick the one that matches how much control you need and how much complexity you're willing to take on.

## Types of SIMD support in .NET

| API | Namespace | When to use it |
| --- | --- | --- |
| Fixed-purpose vector and matrix types | `System.Numerics` | Graphics and geometry math with 2-4 element vectors, matrices, quaternions, and planes. |
| `Vector<T>` | `System.Numerics` | Portable, variable-width vectorization when you don't need per-platform control. |
| `Vector64<T>`, `Vector128<T>`, `Vector256<T>`, `Vector512<T>` | `System.Runtime.Intrinsics` | Cross-platform, fixed-width vectorization with fine-grained control. This is the recommended starting point for new vectorized algorithms. |
| Hardware intrinsics | `System.Runtime.Intrinsics.X86`, `System.Runtime.Intrinsics.Arm`, `System.Runtime.Intrinsics.Wasm` | Specific processor instructions that the higher-level APIs don't expose, for the last bit of performance on a hot path. |
| `TensorPrimitives` | `System.Numerics.Tensors` | Ready-made, vectorized math over spans. It does the vectorization for you. |

Where these APIs overlap, they relate through layers of abstraction. The generic vector types are the foundational interchange types that the other layers pass <example-value>, so they're technically the lowest level: the variable-width `Vector<T>`, which grows to whatever width the running hardware supports, and the fixed-width `Vector64<T>` through `Vector512<T>`. The platform-specific hardware intrinsics in `System.Runtime.Intrinsics.X86`, `System.Runtime.Intrinsics.Arm`, and `System.Runtime.Intrinsics.Wasm` operate on those types, each mapping directly to an individual processor instruction. The cross-platform operations exposed on the generic types sit a step above the platform-specific intrinsics, lowering to them for each target. Higher still are the managed APIs that operate over entire buffers—vectorized methods on `Span<T>` and `string`, and `System.Numerics.Tensors.TensorPrimitives`—which build on the layers below, so you get SIMD acceleration without hand-writing any of it. The `System.Numerics` fixed-shape types are domain-specific convenience types for graphics and geometry rather than part of this interchange stack.

The rest of this article works through these APIs from the highest level to the lowest, then covers testing, benchmarking, and best practices.

## System.Numerics vector and matrix types

The `System.Numerics` namespace provides SIMD-accelerated types with a fixed shape:

- `System.Numerics.Vector2`, `System.Numerics.Vector3`, and `System.Numerics.Vector4` represent vectors of 2, 3, and 4 `System.Single` values.
- `System.Numerics.Matrix3x2` and `System.Numerics.Matrix4x4` represent 3x2 and 4x4 matrices of `System.Single` values.
- `System.Numerics.Plane` represents a plane in three-dimensional space.
- `System.Numerics.Quaternion` represents a vector used to encode three-dimensional rotations.

These types map naturally to graphics and geometry, and the runtime accelerates their operations with SIMD instructions where the hardware supports them. The following example adds two vectors:

```csharp
Vector2 v1 = Vector2.Create(0.1f, 0.2f);
Vector2 v2 = Vector2.Create(1.1f, 2.2f);
Vector2 sum = v1 + v2;
```
They also expose the common vector math you'd expect, such as dot product, distance, and clamping:

```csharp
float dot = Vector2.Dot(v1, v2);
float distance = Vector2.Distance(v1, v2);
Vector2 clamped = Vector2.Clamp(v1, Vector2.Zero, Vector2.One);
```
The matrix types support matrix math such as transpose and multiplication:

```csharp
Matrix4x4 m1 = Matrix4x4.Create(
    1.1f, 1.2f, 1.3f, 1.4f,
    2.1f, 2.2f, 3.3f, 4.4f,
    3.1f, 3.2f, 3.3f, 3.4f,
    4.1f, 4.2f, 4.3f, 4.4f);

Matrix4x4 m2 = Matrix4x4.Transpose(m1);
Matrix4x4 product = Matrix4x4.Multiply(m1, m2);
```
## Vector\<T>

`Vector<T>` represents a variable-width vector of a primitive numeric type. Its length is fixed for the lifetime of the process, but the value of `Vector<T>.Count` depends on the CPU that runs the code. The Just-In-Time (JIT) compiler treats `Count` as a constant, so loops written against it optimize well.

`Vector<T>` gives you portable vectorization without per-platform code, at the cost of not knowing the vector width at compile time. The following example computes the element-wise add of two arrays:

```csharp
// Illustrative: element-wise add with Vector<T>. In practice, prefer the already-accelerated
// TensorPrimitives.Add, which is optimized for every Vector<T>.IsSupported element type.
public static double[] Add(double[] left, double[] right)
{
    ArgumentNullException.ThrowIfNull(left);
    ArgumentNullException.ThrowIfNull(right);
    ArgumentOutOfRangeException.ThrowIfNotEqual(right.Length, left.Length);

    double[] result = new double[left.Length];

    int i = 0;

    // Vector<T>.Count is a JIT-time constant, so the compiler optimizes the loop bound.
    int lastVectorStart = left.Length - Vector<double>.Count;

    for (; i <= lastVectorStart; i += Vector<double>.Count)
    {
        Vector<double> v1 = Vector.Create(left.AsSpan(i));
        Vector<double> v2 = Vector.Create(right.AsSpan(i));
        (v1 + v2).CopyTo(result, i);
    }

    // Process any remaining elements that don't fill a full vector.
    // Simplified for illustration: a scalar tail isn't optimal. A vectorized
    // remainder that reprocesses the last full vector avoids the per-element loop.
    for (; i < left.Length; i++)
    {
        result[i] = left[i] + right[i];
    }

    return result;
}
```
> **Note:**
> This example is illustrative. You rarely need to write a loop like this by hand, because `TensorPrimitives` already provides accelerated span-based math. This element-wise add is `System.Numerics.Tensors.TensorPrimitives.Add*`, and reductions such as `System.Numerics.Tensors.TensorPrimitives.Sum*` are provided too. These operations are hardware-accelerated for the element types that `Vector<T>` supports (`Vector<T>.IsSupported`).

## Check for hardware acceleration

SIMD-accelerated types work even on hardware or JIT configurations that don't support SIMD, because they fall back to non-accelerated software implementations. To branch on whether acceleration is actually available, check the relevant `IsHardwareAccelerated` property:

- `System.Numerics.Vector.IsHardwareAccelerated` reports whether `Vector<T>` operations are accelerated.
- `System.Runtime.Intrinsics.Vector128.IsHardwareAccelerated`, and the `Vector64`/`Vector256`/`Vector512` equivalents, report acceleration for each fixed width.

These properties are turned into constants by the JIT, so the branches you don't take are eliminated and there's no runtime cost to checking them. Don't cache the values; read them directly where you need them. The same applies to the `Count` properties (for example, `Vector128<T>.Count`), which are also JIT-time constants.

Most operations on an accelerated width are themselves accelerated, but it isn't guaranteed for every operation. For example, floating-point division might be accelerated where integer division isn't. When `Vector256` is accelerated, `Vector128` usually is too, but there's no guarantee, so check each width you use.

> **Tip:**
> If an operation you need isn't accelerated on a platform you care about, or you'd like a new cross-platform API, file an issue on dotnet/runtime. The same applies to codegen improvements.

Not every element type is valid for every vector. `Vector128<T>` and its siblings support the primitive numeric types (`byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `nint`, and `nuint`) today, and that set might grow to include other types in the future. Use `Vector128<T>.IsSupported` to determine whether a given `T` is valid, which is especially useful from generic code.

Types that aren't supported, such as `char` and `bool`, can still be vectorized by reinterpreting the buffer as a supported type of the same size. Use `System.Runtime.InteropServices.MemoryMarshal.Cast*` to reinterpret a span—for example, `char` to `ushort`—or the vector's `As<TFrom, TTo>` method to reinterpret a vector you already hold. Reinterpretation only changes the type, not the underlying bits, so it's your responsibility to keep the data well-formed: a `bool` must stay `0` or `1`, and a `char` must remain a valid UTF-16 code unit. If a vectorized operation could produce an out-of-range value, take care to normalize the result before writing it back.

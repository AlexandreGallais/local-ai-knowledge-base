---
title: "Use SIMD and hardware intrinsics in .NET (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/simd.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use SIMD and hardware intrinsics in .NET (part 2 of 4)

## Cross-platform vectorization with Vector128

`Vector128<T>` is the common denominator across every platform that supports vectorization, so it's the best place to start. It holds a 128-bit vector: 16 bytes, 8 shorts, 4 ints/floats, or 2 longs/doubles.

```
------------------------------128-bits---------------------------
|             64                |               64              |
-----------------------------------------------------------------
|      32       |      32       |      32       |      32       |
-----------------------------------------------------------------
|  16   |  16   |  16   |  16   |  16   |  16   |  16   |  16   |
-----------------------------------------------------------------
| 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
-----------------------------------------------------------------
```

`Vector256<T>` is twice as wide, and `Vector512<T>` twice again. Not all hardware supports the larger widths, so the examples that follow use `Vector128` for portability.

Each width has a generic type (`Vector128<T>`) for the data and a non-generic static class (`System.Runtime.Intrinsics.Vector128`) that holds most of the operations, including static factory methods like `Create` and `Load`. Operators such as `+`, `&`, and `<<` are the idiomatic way to express arithmetic and bit operations; prefer them over the named method equivalents to avoid operator-precedence bugs and improve readability. For algorithms that depend on byte order, branch on `System.BitConverter.IsLittleEndian`, which the JIT also folds to a constant.

> **Note:**
> On x86/x64, `Vector256<T>` operations are generally treated as two independent 128-bit "lanes". For most element-wise operations this is transparent, but operations that cross lanes (such as shuffles or pairwise/horizontal operations) might behave differently or cost more than the `Vector128` equivalent. Confirm with benchmarks before assuming a wider vector is faster.

### Lane-crossing operations don't widen for free

Element-wise operations don't care about width: `v1 + v2` is the same per-element result whether `v1` and `v2` are `Vector128<T>` or `Vector256<T>`—widening just processes one more lane's worth of data per instruction. `Add` on `v = [a, b, c, d]` and `w = [e, f, g, h]` always combines same-index elements:

```
v: [ a | b | c | d ]
w: [ e | f | g | h ]
     +   +   +   +
r: [a+e|b+f|c+g|d+h]
```

Lane-crossing operations don't scale up that simply, because which elements get combined depends on the vector's width. A pairwise reduction combines *adjacent* elements instead of same-index ones, so widening changes what ends up paired together:

```
v:       [  a  |  b  |  c  |  d  ]
            \_____/     \_____/
round 1: [ a+b | c+d | a+b | c+d ]
            \_________________/
round 2: [  S  |  S  |  S  |  S  ]   (S = a+b+c+d)
```

That's exactly what a horizontal reduction does: sum a vector's elements with two rounds of pairwise adds. On x86/x64, `Vector128<float>` (4 elements) gets you there with two calls to `System.Runtime.Intrinsics.X86.Sse3.HorizontalAdd*`:

```csharp
// Sums all four elements with two rounds of pairwise horizontal adds.
// HorizontalAdd(v, v) on [a, b, c, d] gives [a+b, c+d, a+b, c+d]; a second round
// collapses that to the full sum in every element.
public static float SumVector128(Vector128<float> v)
{
    Debug.Assert(Sse3.IsSupported);

    Vector128<float> step1 = Sse3.HorizontalAdd(v, v);
    Vector128<float> step2 = Sse3.HorizontalAdd(step1, step1);

    return step2.ToScalar();
}
```
Extend the same two-call pattern to `Vector256<float>` (8 elements) and it looks right—it isn't. `System.Runtime.Intrinsics.X86.Avx.HorizontalAdd*` doesn't operate across the whole 256-bit vector; it repeats the pairwise pattern independently within each 128-bit lane. Two rounds gives you the lower lane's sum (elements 0-3) broadcast across the lower lane and the upper lane's sum (elements 4-7) broadcast across the upper lane, not the sum of all eight elements:

```csharp
// The same two-round pattern on Vector256<float> looks like it should sum all eight
// elements, but Avx.HorizontalAdd repeats the pairwise pattern independently within
// each 128-bit lane. The result holds the lower lane's sum (elements 0-3) broadcast
// across the lower lane and the upper lane's sum (elements 4-7) broadcast across the
// upper lane -- ToScalar only returns the lower lane's partial sum, not the total.
public static float SumVector256Naive(Vector256<float> v)
{
    Debug.Assert(Avx.IsSupported);

    Vector256<float> step1 = Avx.HorizontalAdd(v, v);
    Vector256<float> step2 = Avx.HorizontalAdd(step1, step1);

    return step2.ToScalar();
}
```
To get the correct total, bridge the lane boundary explicitly: read each lane's partial sum with `GetLower`/`GetUpper` and add them together—`GetLower` and `GetUpper` split a vector into its first and second halves:

```
------------------------------128-bits---------------------------
|           LOWER               |             UPPER             |
-----------------------------------------------------------------
|      32       |      32       |      32       |      32       |
-----------------------------------------------------------------
|  16   |  16   |  16   |  16   |  16   |  16   |  16   |  16   |
-----------------------------------------------------------------
| 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
-----------------------------------------------------------------
```

```csharp
// Getting the full sum needs an explicit step to cross the lane boundary: read each
// lane's partial sum out with GetLower/GetUpper and add them together.
public static float SumVector256(Vector256<float> v)
{
    Debug.Assert(Avx.IsSupported);

    Vector256<float> step1 = Avx.HorizontalAdd(v, v);
    Vector256<float> step2 = Avx.HorizontalAdd(step1, step1);

    Vector128<float> lower = step2.GetLower();
    Vector128<float> upper = step2.GetUpper();

    return lower.ToScalar() + upper.ToScalar();
}
```
That extra step is the real cost of crossing lanes. A lane-crossing algorithm doesn't just widen for free the way an element-wise one does—measure before assuming the wider vector wins.

### Common operations

`Vector128` and its wider siblings expose a large API surface. You don't need to memorize it—know the categories and look up the details when you need them. Every operation has a software fallback for platforms that can't accelerate it. The following table covers essentially the whole surface.

| Category | What it does | Representative APIs |
| --- | --- | --- |
| Constants | Predefined constant vectors | `Zero`, `One`, `NegativeOne`, `AllBitsSet`, `Indices`, `SignSequence`, `E`, `Pi`, `Tau`, `Epsilon`, `NaN`, `PositiveInfinity`, `NegativeInfinity`, `NegativeZero` |
| Creation | Broadcast a scalar, set elements, or generate a sequence | `Create`, `CreateScalar`, `CreateScalarUnsafe`, `Create(ReadOnlySpan<T>)`, `CreateSequence`, `CreateGeometricSequence`, `CreateHarmonicSequence`, `CreateAlternatingSequence` |
| Load and store | Move data between memory and a vector | `Load`, `LoadUnsafe`, `LoadAligned`, `LoadAlignedNonTemporal`, `Store`, `StoreUnsafe`, `StoreAligned`, `StoreAlignedNonTemporal`, `CopyTo`, `TryCopyTo` |
| Arithmetic | Element-wise math and reductions | `Add (x + y)`, `Subtract (x - y)`, `Multiply (x * y)`, `Divide (x / y)`, `Negate (-x)`, `AddSaturate`, `SubtractSaturate`, `Abs`, `Sqrt`, `FusedMultiplyAdd`, `Dot`, `Sum` |
| Bit operations | Bitwise logic and shifts | `BitwiseAnd (x & y)`, `BitwiseOr (x \| y)`, `Xor (x ^ y)`, `AndNot (x & ~y)`, `OnesComplement (~x)`, `ShiftLeft (x << n)`, `ShiftRightArithmetic (x >> n)`, `ShiftRightLogical (x >>> n)` |
| Min, max, and clamp | Element-wise minimum, maximum, and range clamping | `Min`, `Max`, `Clamp`, `MinMagnitude`, `MaxMagnitude`, `MinNumber`, `MaxNumber`, `MinMagnitudeNumber`, `MaxMagnitudeNumber` |
| Rounding | Round each element to an integral value | `Ceiling`, `Floor`, `Round`, `Truncate` |
| Math functions | Sign, interpolation, angle, and transcendental helpers | `CopySign`, `Lerp`, `DegreesToRadians`, `RadiansToDegrees`, `Hypot`, `Sin`, `Cos`, `SinCos`, `Asin`, `Exp`, `Log`, `Log2` |
| Comparison | Compare each element; the result is a vector mask, not the `bool` an operator gives | `Equals`, `GreaterThan`, `GreaterThanOrEqual`, `LessThan`, `LessThanOrEqual` |
| Classification | Per-element predicates over the number line, each returning a vector mask | `IsNaN`, `IsFinite`, `IsInfinity`, `IsPositiveInfinity`, `IsNegativeInfinity`, `IsInteger`, `IsEvenInteger`, `IsOddInteger`, `IsNegative`, `IsPositive`, `IsNormal`, `IsSubnormal`, `IsZero` |
| Comparison reductions | Collapse a per-element comparison to a single `bool` | `EqualsAll (x == y)`, `EqualsAny`, `GreaterThanAll`, `GreaterThanAny`, `GreaterThanOrEqualAll`, `GreaterThanOrEqualAny`, `LessThanAll`, `LessThanAny`, `LessThanOrEqualAll`, `LessThanOrEqualAny` |
| Whole-vector predicates | Reduce a vector to a `bool`: whether all, any, or no elements equal a value, or (the `WhereAllBitsSet` forms) have all bits set. Prefer these over converting a mask to an index | `All`, `Any`, `None`, `AllWhereAllBitsSet`, `AnyWhereAllBitsSet`, `NoneWhereAllBitsSet` |
| Search | Count or locate elements by value, or (the `WhereAllBitsSet` forms) set lanes in a mask | `Count`, `IndexOf`, `LastIndexOf`, `CountWhereAllBitsSet`, `IndexOfWhereAllBitsSet`, `LastIndexOfWhereAllBitsSet` |
| Mask to index | Turn a comparison mask into a scalar bitmask and scan it | `ExtractMostSignificantBits` with `System.Numerics.BitOperations.TrailingZeroCount*` or `System.Numerics.BitOperations.LeadingZeroCount*` |
| Selection | Blend two vectors according to a mask, bit by bit | `ConditionalSelect(x, y, z)`, equivalent to `(y & x) \| (z & ~x)` |
| Conversion | Change numeric type, computing new values (for example, `int` to `float`) | `ConvertToInt32`, `ConvertToInt64`, `ConvertToUInt32`, `ConvertToUInt64`, `ConvertToSingle`, `ConvertToDouble` |
| Widening and narrowing | Split elements into a wider type or pack them into a narrower one | `Widen`, `WidenLower`, `WidenUpper`, `Narrow`, `NarrowWithSaturation` |
| Reinterpretation | Reinterpret the bits as another element type without changing them | `As<TFrom, TTo>`, `AsByte`, `AsInt32`, `AsSingle`, and the other `As*` element forms |
| System.Numerics interop | Reinterpret between `Vector128<T>` and the fixed-shape numerics types | `AsVector`, `AsVector2`, `AsVector3`, `AsVector4`, `AsPlane`, `AsQuaternion`, `AsVector128`, `AsVector128Unsafe` |
| Reorder | Rearrange elements by index or interleave two vectors | `Shuffle`, `Reverse`, `Zip`, `ZipLower`, `ZipUpper`, `Unzip`, `UnzipEven`, `UnzipOdd`, `ConcatLowerLower`, `ConcatLowerUpper`, `ConcatUpperLower`, `ConcatUpperUpper` |
| Lane access | Read or replace individual elements and halves, or resize the vector | `GetElement`, `WithElement`, `ToScalar`, `GetLower`, `GetUpper`, `WithLower`, `WithUpper`, `ToVector256` |

> **Tip:**
> Several operations have `Estimate` and `Native` variants—for example, `MultiplyAddEstimate`, `ClampNative`, `MinNative`, `MaxNative`, `ShuffleNative`, and `ConvertToInt32Native`. They map to a faster hardware instruction that trades some precision or gives up an IEEE edge-case guarantee (such as NaN handling), so reach for them only when a benchmark shows the exact form is the bottleneck and the looser semantics are acceptable.

> **Note:**
> `Vector256.Shuffle` treats its input as a single 256-bit vector, where-as the platform-specific `Avx2.Shuffle` operates as two independent 128-bit lanes. The cross-platform API is the more portable choice, but confirm the behavior you need when porting hand-written intrinsics.

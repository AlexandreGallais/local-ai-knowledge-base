---
title: "What's new in .NET libraries for .NET 11 (part 5 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 5 of 8)

## Collections, numerics, and low-level I/O

- LINQ join improvements
- IEEE 754 decimal floating-point types
- Correctly rounded decimal and BigInteger conversions
- Partial numeric parsing
- Generic Complex\<T>
- BFloat16 support in BitConverter
- Floating-point hex formatting and parsing
- Numerics improvements
- Random generic methods
- Cross-lane vector operations
- Low-level I/O improvements
- Collections improvements

### LINQ join improvements

LINQ adds join enhancements, including a new `FullJoin` operation and tuple-returning overloads for the existing `Join` and `GroupJoin` methods. These APIs are available on `System.Linq.Enumerable`, `System.Linq.Queryable`, and `System.Linq.AsyncEnumerable`.

#### LeftJoin, RightJoin, and FullJoin

Because the three outer-join operations return tuples directly, you can work with them easily using pattern matching and deconstruction:

- `System.Linq.Enumerable.LeftJoin*` — Returns all elements from the left (outer) sequence. When there's no matching element in the right (inner) sequence, the inner element is `default` (typically `null` for reference types).
- `System.Linq.Enumerable.RightJoin*` — Returns all elements from the right (inner) sequence. When there's no matching element in the left (outer) sequence, the outer element is `default` (typically `null` for reference types).
- `System.Linq.Enumerable.FullJoin*` — Returns all elements from both sequences, using `default` on either side when there's no match.

```csharp
var products = new List<(int Id, string Name, string? Category)>
{
    (1, "Laptop", "Electronics"),
    (2, "Mouse", "Electronics"),
    (3, "Orphan", null), // No matching category
};
var categories = new List<(string Name, string Description)>
{
    ("Electronics", "Electronic devices"),
    ("Furniture", "Office furniture"), // No matching product
};

// LeftJoin: all products, matched categories (null if none)
var leftJoined = products.LeftJoin(
    categories,
    p => p.Category,
    c => c.Name);

foreach (var (product, category) in leftJoined)
    Console.WriteLine($"{product.Name}: {category.Description ?? "(none)"}");
// Laptop: Electronic devices
// Mouse: Electronic devices
// Orphan: (none)

// FullJoin: all products and categories, paired where they match
var fullJoined = products.FullJoin(
    categories,
    p => p.Category,
    c => c.Name);

foreach (var (product, category) in fullJoined)
    Console.WriteLine(
        $"{product.Name ?? "(none)"}: {category.Description ?? "(none)"}");
// Laptop: Electronic devices
// Mouse: Electronic devices
// Orphan: (none)
// (none): Office furniture
```
### IEEE 754 decimal floating-point types

`System.Numerics` adds `System.Numerics.Decimal32`, `System.Numerics.Decimal64`, and `System.Numerics.Decimal128`, which implement IEEE 754-2019 decimal floating-point semantics. These types support generic math, infinities, and NaN values, and can help when you need IEEE decimal behavior instead of `System.Decimal`.

The transcendental functions on these types are more accurate. The most significant fix is for `Decimal128` values near a cancellation point, such as `Asin` and `Acos` near ±1 and logarithms near 1, where earlier builds could lose most or all significant digits. For example, `Decimal128.Acos(1 - 1e-30)` previously had an error of roughly 10²⁴ units in the last place (ULPs). It's now well under one ULP.

The change also improves the following behaviors:

- Inverse trigonometric and hyperbolic functions, logarithms, `Pow`, and `RootN` preserve decimal precision during argument reduction.
- `SinPi`, `CosPi`, `TanPi`, and `SinCosPi` return exact results, such as zero for integer inputs written with alternate decimal representations (for example, `SinPi(1000.000)`).
- `Log(x, base)` rounds only once for all three types.
- `Exp2`, `Exp2M1`, and subnormal-result rounding are more accurate.
- Alternate representations of `1`, such as `Acosh(1.0000000)`, no longer return NaN for `Decimal64` and `Decimal128`.

No public APIs were added. Because the rounded results intentionally change, code that compares these results against stored values might observe different last digits. The functions still aren't guaranteed to be correctly rounded.

### Correctly rounded decimal and BigInteger conversions

Conversions between `System.Decimal` and binary floating-point types, and conversions from `System.Numerics.BigInteger` to binary floating-point types, now round the exact source value once to the nearest representable destination value. The previous conversions could lose significant digits or round through an intermediate value, so binaries rebuilt with a .NET 11 SDK can produce different results than they did on earlier versions. There's no compatibility switch to restore the previous conversion algorithms.

For example, converting the `double` literal `1.23` to `decimal` now preserves the exact binary floating-point value rather than producing `1.23`. If a value is meant to be decimal, use a decimal literal such as `1.23m` instead of converting a `double` literal. For complete guidance, including previous and new behavior for each conversion direction, see Decimal and BigInteger floating-point conversions are correctly rounded.

### Partial numeric parsing

`System.Numerics.INumberBase`1.TryParsePartial*` adds partial parsing overloads that report consumed input. Use this API to parse delimited formats, such as CSV, so you don't copy substrings.

### Generic Complex\<T>

`System.Numerics.Complex`1` is now available, so complex arithmetic can use several floating-point types, including `float`, `Half`, `BFloat16`, and the new decimal floating-point types.

#### Tuple-returning Join and GroupJoin overloads

New overloads of `System.Linq.Enumerable.Join*` and `System.Linq.Enumerable.GroupJoin*` return tuples directly without requiring a result selector, and accept an optional `System.Collections.Generic.IEqualityComparer`1` parameter. The optional comparer overload is also available on the `FullJoin`, `LeftJoin`, and `RightJoin` operations.

```csharp
var products = new[] { (Id: 1, Name: "Laptop"), (Id: 2, Name: "Mouse") };
var orders = new[] { (ProductId: 1, Qty: 3), (ProductId: 1, Qty: 1) };

var result = products.Join(orders, p => p.Id, o => o.ProductId);
foreach (var (product, order) in result)
    Console.WriteLine($"{product.Name}: qty={order.Qty}");
// Laptop: qty=3
// Laptop: qty=1
```

### BFloat16 support in BitConverter

The `System.BitConverter` class now includes methods for converting between `System.Numerics.BFloat16` values and byte arrays or bit representations. These new methods include:

- `System.BitConverter.GetBytes(System.Numerics.BFloat16)` - Convert a BFloat16 value to a byte array.
- `System.BitConverter.ToBFloat16(System.Byte[],System.Int32)` and `System.BitConverter.ToBFloat16(System.ReadOnlySpan{System.Byte})` - Convert a byte array to a BFloat16 value.
- `System.BitConverter.BFloat16ToInt16Bits(System.Numerics.BFloat16)`, `System.BitConverter.BFloat16ToUInt16Bits(System.Numerics.BFloat16)`, `System.BitConverter.Int16BitsToBFloat16(System.Int16)`, and `System.BitConverter.UInt16BitsToBFloat16(System.UInt16)` - Methods for converting between BFloat16 and its bit representation as `short` or `ushort`.

BFloat16 (Brain Floating Point) is a 16-bit floating-point format that's commonly used in machine learning and scientific computing.

### Floating-point hex formatting and parsing

`double`, `float`, and `Half` can now be formatted and parsed in their hexadecimal IEEE-754 form. The hex form preserves every bit of the underlying value, making it the right choice for golden-file tests, cross-language interop with C/C++ `printf("%a", ...)`, and any scenario where round-tripping a `double` through decimal text is too lossy.

```csharp
double value = Math.PI;

// Format as hexadecimal IEEE-754: preserves all bits exactly
string hex = value.ToString("X"); // e.g., "0X1.921FB54442D18P+1"
double roundTripped = double.Parse(hex, NumberStyles.HexFloat);

Console.WriteLine(roundTripped == value); // True — exact round-trip
```
### Numerics improvements

`System.Numerics.Matrix4x4.GetDeterminant` now uses an SSE-vectorized implementation, improving performance by approximately 15%.

### Random generic methods

`System.Random` gains two new generic methods that work with any numeric type implementing the appropriate generic math interfaces:

- `System.Random.NextInteger*` — Generates a random integer of type `T` where `T` implements `IBinaryInteger<T>` and `IMinMaxValue<T>`. Overloads accept an upper bound or both lower and upper bounds.
- `System.Random.NextBinaryFloat*` — Generates a random floating-point value of type `T` where `T` implements `IBinaryFloatingPointIeee754<T>`.

```csharp
// Generate a random integer of any binary integer type
int i = Random.Shared.NextInteger<int>();
long l = Random.Shared.NextInteger<long>(0L, 100L);
byte b = Random.Shared.NextInteger<byte>(maxValue: (byte)10);

// Generate a random floating-point value of any IEEE-754 type
float f = Random.Shared.NextBinaryFloat<float>();
double d = Random.Shared.NextBinaryFloat<double>();
Half h = Random.Shared.NextBinaryFloat<Half>();

Console.WriteLine($"int={i}, long={l}, byte={b}");
Console.WriteLine($"float={f}, double={d}, Half={h}");
```
### Cross-lane vector operations

`Vector64<T>`, `Vector128<T>`, `Vector256<T>`, `Vector512<T>`, and `Vector<T>` gain a set of lane construction and composition methods that previously required hand-written shuffles. The new methods fall into a few families:

- **Patterned construction:** `CreateGeometricSequence`, `CreateAlternatingSequence`, and `CreateHarmonicSequence` build a vector from a starting value and a rule.
- **Interleave and de-interleave:** `Zip`, `ZipLower`/`ZipUpper`, `Unzip`, `UnzipEven`/`UnzipOdd`.
- **Rearrange:** The `Concat` family (`ConcatLowerLower`, `ConcatLowerUpper`, `ConcatUpperLower`, `ConcatUpperUpper`) and `Reverse`.

```csharp
using System.Runtime.Intrinsics;

// {1, 2, 4, 8} — each lane is the previous lane times two
Vector128<int> powers = Vector128.CreateGeometricSequence(1, 2);

// Interleave two vectors lane-by-lane
(Vector128<int> lower, Vector128<int> upper) =
    Vector128.Zip(Vector128.Create(1), Vector128.Create(2));
```

These building blocks are useful for image processing, audio digital signal processing (DSP), and other SIMD-intensive workloads that need fine-grained control over vector element layout, without falling back to platform-specific intrinsics.

### Low-level I/O improvements

- SafeFileHandle pipe support
- RandomAccess pipe support
- File locking on iOS and tvOS

#### SafeFileHandle pipe support

`Microsoft.Win32.SafeHandles.SafeFileHandle` gains two new members:

- **`Microsoft.Win32.SafeHandles.SafeFileHandle.Type` property:** Reports whether a handle represents a file, pipe, socket, directory, or other OS object, without requiring platform-specific code.
- **`Microsoft.Win32.SafeHandles.SafeFileHandle.CreateAnonymousPipe(Microsoft.Win32.SafeHandles.SafeFileHandle@,Microsoft.Win32.SafeHandles.SafeFileHandle@,System.Boolean,System.Boolean)` method:** Creates a pair of connected anonymous pipe handles with independent async behavior for each end.

```csharp
SafeFileHandle.CreateAnonymousPipe(
    out SafeFileHandle readEnd,
    out SafeFileHandle writeEnd,
    asyncRead: true,
    asyncWrite: false);

using (readEnd)
using (writeEnd)
{
    // SafeFileHandle.Type reports the kind of OS object the handle refers to
    Console.WriteLine(readEnd.Type);   // Pipe
    Console.WriteLine(writeEnd.Type);  // Pipe
}
```
#### RandomAccess pipe support

`System.IO.RandomAccess.Read*` and `System.IO.RandomAccess.Write*` now work with non-seekable handles such as pipes, in addition to regular file handles.

On Windows, `Process` now uses overlapped I/O for redirected stdout/stderr, which reduces thread-pool blocking in process-heavy applications.

#### File locking on iOS and tvOS

On iOS and tvOS, `System.IO.FileStream` no longer acquires advisory file locks by default. This change avoids operating-system termination when an app is suspended while it holds a file lock. As a result, `System.IO.FileShare` restrictions aren't enforced on those platforms, including between handles in the same process. Mac Catalyst and other platforms keep their existing defaults. To restore locking, set the `System.IO.DisableFileLocking` runtime configuration property to `false`, or set the `DOTNET_SYSTEM_IO_DISABLEFILELOCKING` environment variable to `0`. For more information, see File locking on iOS and tvOS.

---
title: "Numerics in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/numerics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Numerics in .NET

.NET provides a range of numeric integer and floating-point primitives, as well as:

- `System.Half`, which represents a half-precision floating-point number.
- `System.Decimal`, which represents a decimal floating-point number.
- `System.Numerics.BigInteger`, which is an integral type with no theoretical upper or lower bound.
- `System.Numerics.Complex`, which represents complex numbers.
- A set of SIMD-enabled types in the `System.Numerics` namespace.

## Integer types

.NET supports both signed and unsigned 8-bit, 16-bit, 32-bit, 64-bit, and 128-bit integer types, which are listed in the following tables.

**Signed integer types**

|Type|Size (in bytes)|Minimum value|Maximum value|
|----------|--------------------|-------------------|-------------------|
|`System.Int16`|2|-32,768|32,767|
|`System.Int32`|4|-2,147,483,648|2,147,483,647|
|`System.Int64`|8|-9,223,372,036,854,775,808|9,223,372,036,854,775,807|
|`System.Int128`|16|−170,141,183,460,469,231,731,687,303,715,884,105,728|170,141,183,460,469,231,731,687,303,715,884,105,727|
|`System.SByte`|1|-128|127|
|`System.IntPtr` (in 32-bit process)|4|-2,147,483,648|2,147,483,647|
|`System.IntPtr` (in 64-bit process)|8|-9,223,372,036,854,775,808|9,223,372,036,854,775,807|

**Unsigned integer types**

|Type|Size (in bytes)|Minimum value|Maximum value|
|----------|--------------------|-------------------|-------------------|
|`System.Byte`|1|0|255|
|`System.UInt16`|2|0|65,535|
|`System.UInt32`|4|0|4,294,967,295|
|`System.UInt64`|8|0|18,446,744,073,709,551,615|
|`System.UInt128`|16|0|340,282,366,920,938,463,463,374,607,431,768,211,455|
|`System.UIntPtr` (in 32-bit process)|4|0|4,294,967,295|
|`System.UIntPtr` (in 64-bit process)|8|0|18,446,744,073,709,551,615|

Each integer type supports a set of standard arithmetic operators. The `System.Math` class provides methods for a broader set of mathematical functions.

You can also work with the individual bits in an integer value by using the `System.BitConverter` class.

> **Note:**
> The unsigned integer types are not CLS-compliant. For more information, see Language independence and language-independent components.

## BigInteger

The `System.Numerics.BigInteger` structure is an immutable type that represents an arbitrarily large integer whose value in theory has no upper or lower bounds. The methods of the `System.Numerics.BigInteger` type closely parallel those of the other integral types.

## Floating-point types

.NET includes the following floating-point types:

| Type                                               | Size (in bytes) | Approximate range         | Primitive? | Notes                |
|----------------------------------------------------|-----------------|---------------------------|------------|----------------------|
| `System.Half`    | 2               | ±65504                    | No         | Introduced in .NET 5 |
| `System.Single`  | 4               | ±3.4 x 1038    | Yes        |                      |
| `System.Double`  | 8               | ±1.7 × 10308   | Yes        |                      |
| `System.Decimal` | 16              | ±7.9228 x 1028 | No         |                      |

The `System.Half`, `System.Single`, and `System.Double` types support special values that represent not-a-number and infinity. For example, the `System.Double` type provides the following values: `System.Double.NaN`, `System.Double.NegativeInfinity`, and `System.Double.PositiveInfinity`. You use the `System.Double.IsNaN*`, `System.Double.IsInfinity*`, `System.Double.IsPositiveInfinity*`, and `System.Double.IsNegativeInfinity*` methods to test for these special values.

Each floating-point type supports a set of standard arithmetic operators. The `System.Math` class provides methods for a broader set of mathematical functions. .NET Core 2.0 and later includes the `System.MathF` class, which provides methods that accept arguments of the `System.Single` type.

You can also work with the individual bits in `System.Double`, `System.Single`, and `System.Half` values by using the `System.BitConverter` class. The `System.Decimal` structure has its own methods, `System.Decimal.GetBits*` and `System.Decimal.#ctor(System.Int32[])`, for working with a decimal value's individual bits, as well as its own set of methods for performing some additional mathematical operations.

The `System.Double`, `System.Single`, and `System.Half` types are intended to be used for values that, by their nature, are imprecise (for example, the distance between two stars) and for applications in which a high degree of precision and small rounding error is not required. Use the `System.Decimal` type for cases in which greater precision is required and rounding errors should be minimized.

> **Note:**
> The `System.Decimal` type doesn't eliminate the need for rounding. Rather, it minimizes errors due to rounding.

## Complex

The `System.Numerics.Complex` structure represents a complex number, that is, a number with a real number part and an imaginary number part. It supports a standard set of arithmetic, comparison, equality, explicit and implicit conversion operators, as well as mathematical, algebraic, and trigonometric methods.

## SIMD-enabled types

The `System.Numerics` namespace includes a set of .NET SIMD-enabled types. SIMD (Single Instruction Multiple Data) operations can be parallelized at the hardware level. That increases the throughput of the vectorized computations, which are common in mathematical, scientific, and graphics apps.

The .NET SIMD-enabled types include the following:

- The `System.Numerics.Vector2`, `System.Numerics.Vector3`, and `System.Numerics.Vector4` types, which represent vectors with 2, 3, and 4 `System.Single` values.

- Two matrix types, `System.Numerics.Matrix3x2`, which represents a 3x2 matrix, and `System.Numerics.Matrix4x4`, which represents a 4x4 matrix.

- The `System.Numerics.Plane` type, which represents a plane in three-dimensional space.

- The `System.Numerics.Quaternion` type, which represents a vector that is used to encode three-dimensional physical rotations.

- The `System.Numerics.Vector`1` type, which represents a vector of a specified numeric type and provides a broad set of operators that benefit from SIMD support. The count of a `System.Numerics.Vector`1` instance is fixed, but its value `System.Numerics.Vector`1.Count*` depends on the CPU of the machine, on which code is executed.

  > **Note:**
  > The `System.Numerics.Vector`1` type is included with .NET Core and .NET 5+, but not .NET Framework. If you're using .NET Framework, install the System.Numerics.Vectors NuGet package to get access to this type.

The SIMD-enabled types are implemented in such a way that they can be used with non-SIMD-enabled hardware or JIT compilers. To take advantage of SIMD instructions, your 64-bit apps must be run by the runtime that uses the RyuJIT compiler, which is included in .NET Core and in .NET Framework 4.6 and later versions. It adds SIMD support when targeting 64-bit processors.

For more information, see Use SIMD-accelerated numeric types.

## Tensors

The System.Numerics.Tensors package provides multidimensional tensor types and operations over spans. For shape and stride conventions, supported overlapping operations, and differences from NumPy, see Tensor shapes, storage, and NumPy differences.

## See also

- Standard numeric format strings
- Floating-point numeric types in C#

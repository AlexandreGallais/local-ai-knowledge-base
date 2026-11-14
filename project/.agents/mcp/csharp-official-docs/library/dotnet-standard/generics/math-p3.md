---
title: "Generic math (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/generics/math.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generic math (part 3 of 4)

### Numeric interfaces

This section describes the interfaces in `System.Numerics` that describe number-like types and the functionality available to them.

| Interface name                                         | Description                                                                                            |
|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `System.Numerics.IBinaryFloatingPointIeee754`1` | Exposes APIs common to *binary* floating-point types1 that implement the IEEE 754 standard. |
| `System.Numerics.IBinaryInteger`1`              | Exposes APIs common to binary integers2.                                                    |
| `System.Numerics.IBinaryNumber`1`               | Exposes APIs common to binary numbers.                                                                 |
| `System.Numerics.IFloatingPoint`1`              | Exposes APIs common to floating-point types.                                                           |
| `System.Numerics.IFloatingPointIeee754`1`       | Exposes APIs common to floating-point types that implement the IEEE 754 standard.                      |
| `System.Numerics.INumber`1`                     | Exposes APIs common to comparable number types (effectively the "real" number domain).                 |
| `System.Numerics.INumberBase`1`                 | Exposes APIs common to all number types (effectively the "complex" number domain).                     |
| `System.Numerics.ISignedNumber`1`               | Exposes APIs common to all signed number types (such as the concept of `NegativeOne`).                 |
| `System.Numerics.IUnsignedNumber`1`             | Exposes APIs common to all unsigned number types.                                                      |
| `System.Numerics.IAdditiveIdentity`2`           | Exposes the concept of `(x + T.AdditiveIdentity) == x`.                                                |
| `System.Numerics.IMinMaxValue`1`                | Exposes the concept of `T.MinValue` and `T.MaxValue`.                                                  |
| `System.Numerics.IMultiplicativeIdentity`2`     | Exposes the concept of `(x * T.MultiplicativeIdentity) == x`.                                          |

1The binary floating-point types are `System.Double` (`double`), `System.Half`, and `System.Single` (`float`).

2The binary integer types are `System.Byte` (`byte`), `System.Int16` (`short`), `System.Int32` (`int`), `System.Int64` (`long`), `System.Int128`, `System.IntPtr` (`nint`), `System.SByte` (`sbyte`), `System.UInt16` (`ushort`), `System.UInt32` (`uint`), `System.UInt64` (`ulong`), `System.UInt128`, and `System.UIntPtr` (`nuint`).

The interface you're most likely to use directly is `System.Numerics.INumber`1`, which roughly corresponds to a *real* number. If a type implements this interface, it means that a value has a sign (this includes `unsigned` types, which are considered positive) and can be compared to other values of the same type. `System.Numerics.INumberBase`1` confers more advanced concepts, such as *complex* and *imaginary* numbers, for example, the square root of a negative number. Other interfaces, such as `System.Numerics.IFloatingPointIeee754`1`, were created because not all operations make sense for all number types—for example, calculating the floor of a number only makes sense for floating-point types. In the .NET base class library, the floating-point type `System.Double` implements `System.Numerics.IFloatingPointIeee754`1` but `System.Int32` doesn't.

Several of the interfaces are also implemented by various other types, including `System.Char`, `System.DateOnly`, `System.DateTime`, `System.DateTimeOffset`, `System.Decimal`, `System.Guid`, `System.TimeOnly`, and `System.TimeSpan`.

The following table shows some of the core APIs exposed by each interface.

| Interface                                        | API name             | Description                                                                                              |
|--------------------------------------------------|----------------------|----------------------------------------------------------------------------------------------------------|
| `System.Numerics.IBinaryInteger`1`        | `DivRem`             | Computes the quotient and remainder simultaneously.                                                      |
|                                                  | `LeadingZeroCount`   | Counts the number of leading zero bits in the binary representation.                                     |
|                                                  | `PopCount`           | Counts the number of set bits in the binary representation.                                              |
|                                                  | `RotateLeft`         | Rotates bits left, sometimes also called a circular left shift.                                          |
|                                                  | `RotateRight`        | Rotates bits right, sometimes also called a circular right shift.                                        |
|                                                  | `TrailingZeroCount`  | Counts the number of trailing zero bits in the binary representation.                                    |
| `System.Numerics.IFloatingPoint`1`        | `Ceiling`            | Rounds the value towards positive infinity. +4.5 becomes +5, and -4.5 becomes -4.                        |
|                                                  | `Floor`              | Rounds the value towards negative infinity. +4.5 becomes +4, and -4.5 becomes -5.                        |
|                                                  | `Round`              | Rounds the value using the specified rounding mode.                                                      |
|                                                  | `Truncate`           | Rounds the value towards zero. +4.5 becomes +4, and -4.5 becomes -4.                                     |
| `System.Numerics.IFloatingPointIeee754`1` | `E`                  | Gets a value representing Euler's number for the type.                                                   |
|                                                  | `Epsilon`            | Gets the smallest representable value that's greater than zero for the type.                             |
|                                                  | `NaN`                | Gets a value representing `NaN` for the type.                                                            |
|                                                  | `NegativeInfinity`   | Gets a value representing `-Infinity` for the type.                                                      |
|                                                  | `NegativeZero`       | Gets a value representing `-Zero` for the type.                                                          |
|                                                  | `Pi`                 | Gets a value representing `Pi` for the type.                                                             |
|                                                  | `PositiveInfinity`   | Gets a value representing `+Infinity` for the type.                                                      |
|                                                  | `Tau`                | Gets a value representing `Tau` (`2 * Pi`) for the type.                                                 |
|                                                  | (Other)              | (Implements the full set of interfaces listed under Function interfaces.)        |
| `System.Numerics.INumber`1`               | `Clamp`              | Restricts a value to no more and no less than the specified min and max value.                           |
|                                                  | `CopySign`           | Sets the sign of a specified value to the same as another specified value.                               |
|                                                  | `Max`                | Returns the greater of two values, returning `NaN` if either input is `NaN`.                             |
|                                                  | `MaxNumber`          | Returns the greater of two values, returning the number if one input is `NaN`.                           |
|                                                  | `Min`                | Returns the lesser of two values, returning `NaN` if either input is `NaN`.                              |
|                                                  | `MinNumber`          | Returns the lesser of two values, returning the number if one input is `NaN`.                            |
|                                                  | `Sign`               | Returns -1 for negative values, 0 for zero, and +1 for positive values.                                  |
| `System.Numerics.INumberBase`1`           | `One`                | Gets the value 1 for the type.                                                                           |
|                                                  | `Radix`              | Gets the radix, or base, for the type. `System.Int32` returns 2. `System.Decimal` returns 10.  |
|                                                  | `Zero`               | Gets the value 0 for the type.                                                                           |
|                                                  | `CreateChecked`      | Creates a value, throwing an `System.OverflowException` if the input can't fit.1        |
|                                                  | `CreateSaturating`   | Creates a value, clamping to `T.MinValue` or `T.MaxValue` if the input can't fit.1           |
|                                                  | `CreateTruncating`   | Creates a value from another value, wrapping around if the input can't fit.1                 |
|                                                  | `IsComplexNumber`    | Returns true if the value has a non-zero real part and a non-zero imaginary part.                        |
|                                                  | `IsEvenInteger`      | Returns true if the value is an even integer. 2.0 returns `true`, and 2.2 returns `false`.               |
|                                                  | `IsFinite`           | Returns true if the value is not infinite and not `NaN`.                                                 |
|                                                  | `IsImaginaryNumber`  | Returns true if the value has a zero real part. This means `0` is imaginary and `1 + 1i` isn't.         |
|                                                  | `IsInfinity`         | Returns true if the value represents infinity.                                                           |
|                                                  | `IsInteger`          | Returns true if the value is an integer. 2.0 and 3.0 return `true`, and 2.2 and 3.1 return `false`.      |
|                                                  | `IsNaN`              | Returns true if the value represents `NaN`.                                                              |
|                                                  | `IsNegative`         | Returns true if the value is negative. This includes -0.0.                                               |
|                                                  | `IsPositive`         | Returns true if the value is positive. This includes 0 and +0.0.                                         |
|                                                  | `IsRealNumber`       | Returns true if the value has a zero imaginary part. This means 0 is real as are all `INumber<T>` types. |
|                                                  | `IsZero`             | Returns true if the value represents zero. This includes 0, +0.0, and -0.0.                              |
|                                                  | `MaxMagnitude`       | Returns the value with a greater absolute value, returning `NaN` if either input is `NaN`.               |
|                                                  | `MaxMagnitudeNumber` | Returns the value with a greater absolute value, returning the number if one input is `NaN`.             |
|                                                  | `MinMagnitude`       | Returns the value with a lesser absolute value, returning `NaN` if either input is `NaN`.                |
|                                                  | `MinMagnitudeNumber` | Returns the value with a lesser absolute value, returning the number if one input is `NaN`.              |
| `System.Numerics.ISignedNumber`1`         | `NegativeOne`        | Gets the value -1 for the type.                                                                          |

1To help understand the behavior of the three `Create*` methods, consider the following examples.

Example when given a value that's too large:

- `byte.CreateChecked(384)` will throw an `System.OverflowException`.
- `byte.CreateSaturating(384)` returns 255 because 384 is greater than `System.Byte.MaxValue` (which is 255).
- `byte.CreateTruncating(384)` returns 128 because it takes the lowest 8 bits (384 has a hex representation of `0x0180`, and the lowest 8 bits is `0x80`, which is 128).

Example when given a value that's too small:

- `byte.CreateChecked(-384)` will throw an `System.OverflowException`.
- `byte.CreateSaturating(-384)` returns 0 because -384 is smaller than `System.Byte.MinValue` (which is 0).
- `byte.CreateTruncating(-384)` returns 128 because it takes the lowest 8 bits (384 has a hex representation of `0xFE80`, and the lowest 8 bits is `0x80`, which is 128).

The `Create*` methods also have some special considerations for IEEE 754 floating-point types, like `float` and `double`, as they have the special values `PositiveInfinity`, `NegativeInfinity`, and `NaN`. All three `Create*` APIs behave as `CreateSaturating`. Also, while `MinValue` and `MaxValue` represent the largest negative/positive "normal" number, the actual minimum and maximum values are `NegativeInfinity` and `PositiveInfinity`, so they clamp to these values instead.

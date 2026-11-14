---
title: "INumberBase<TSelf> interface (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/INumberBase`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INumberBase<TSelf> interface

Namespace: `System.Numerics`

```csharp
public interface INumberBase<TSelf> : IEquatable<TSelf>, IParsable<TSelf>, ISpanFormattable, ISpanParsable<TSelf>, IUtf8SpanFormattable, IUtf8SpanParsable<TSelf>, System.Numerics.IAdditionOperators<TSelf,TSelf,TSelf>, System.Numerics.IAdditiveIdentity<TSelf,TSelf>, System.Numerics.IDecrementOperators<TSelf>, System.Numerics.IDivisionOperators<TSelf,TSelf,TSelf>, System.Numerics.IEqualityOperators<TSelf,TSelf,bool>, System.Numerics.IIncrementOperators<TSelf>, System.Numerics.IMultiplicativeIdentity<TSelf,TSelf>, System.Numerics.IMultiplyOperators<TSelf,TSelf,TSelf>, System.Numerics.ISubtractionOperators<TSelf,TSelf,TSelf>, System.Numerics.IUnaryNegationOperators<TSelf,TSelf>, System.Numerics.IUnaryPlusOperators<TSelf,TSelf> where TSelf : INumberBase<TSelf>
```

Defines the base of other number types.

Parameters:

- `TSelf`: The type that implements the interface.

To be added.

## INumberBase<TSelf>.One property

```csharp
public static abstract TSelf One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## INumberBase<TSelf>.Radix property

```csharp
public static abstract int Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## INumberBase<TSelf>.Zero property

```csharp
public static abstract TSelf Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## INumberBase<TSelf>.Abs(TSelf) method

```csharp
public static abstract TSelf Abs (TSelf value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

Exceptions:

- `OverflowException`: The absolute of `value` is not representable by `TSelf`.

To be added.

## INumberBase<TSelf>.CreateChecked<TOther>(TOther) method

```csharp
public static virtual TSelf CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

Exceptions:

- `NotSupportedException`: `TOther` is not supported.
- `OverflowException`: `value` is not representable by `TSelf`.

To be added.

## INumberBase<TSelf>.CreateSaturating<TOther>(TOther) method

```csharp
public static virtual TSelf CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

Exceptions:

- `NotSupportedException`: `TOther` is not supported.

To be added.

## INumberBase<TSelf>.CreateTruncating<TOther>(TOther) method

```csharp
public static virtual TSelf CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that is used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

Exceptions:

- `NotSupportedException`: `TOther` is not supported.

To be added.

## INumberBase<TSelf>.IsCanonical(TSelf) method

```csharp
public static abstract bool IsCanonical (TSelf value);
```

Determines if a value is in its canonical representation.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is in its canonical representation; otherwise, `false`.

To be added.

## INumberBase<TSelf>.IsComplexNumber(TSelf) method

```csharp
public static abstract bool IsComplexNumber (TSelf value);
```

Determines if a value represents a complex number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a complex number; otherwise, `false`.

#### Remarks

This function returns `false` for a complex number `a + bi` where `a` or `b` is zero. In other words, it excludes real numbers and pure imaginary numbers.

## INumberBase<TSelf>.IsEvenInteger(TSelf) method

```csharp
public static abstract bool IsEvenInteger (TSelf value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## INumberBase<TSelf>.IsFinite(TSelf) method

```csharp
public static abstract bool IsFinite (TSelf value);
```

Determines if a value is finite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is finite; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsInfinity` will return `true`. `NaN` is not finite or infinite.

## INumberBase<TSelf>.IsImaginaryNumber(TSelf) method

```csharp
public static abstract bool IsImaginaryNumber (TSelf value);
```

Determines if a value represents a pure imaginary number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a pure imaginary number; otherwise, `false`.

#### Remarks

This function returns `false` for a complex number `a + bi` where `a` is non-zero, as that number is not purely imaginary.

## INumberBase<TSelf>.IsInfinity(TSelf) method

```csharp
public static abstract bool IsInfinity (TSelf value);
```

Determines if a value is infinite.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is infinite; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsFinite` will return `true`. `NaN` is not finite or infinite.

## INumberBase<TSelf>.IsInteger(TSelf) method

```csharp
public static abstract bool IsInteger (TSelf value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` and `3.0` will return `true` while `2.2` and `3.3` will return `false`.

## INumberBase<TSelf>.IsNaN(TSelf) method

```csharp
public static abstract bool IsNaN (TSelf value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## INumberBase<TSelf>.IsNegative(TSelf) method

```csharp
public static abstract bool IsNegative (TSelf value);
```

Determines if a value represents a negative real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` represents negative zero or a negative real number; otherwise, `false`.

#### Remarks

If this type has signed zero, then `-0` is also considered negative.

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## INumberBase<TSelf>.IsNegativeInfinity(TSelf) method

```csharp
public static abstract bool IsNegativeInfinity (TSelf value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## INumberBase<TSelf>.IsNormal(TSelf) method

```csharp
public static abstract bool IsNormal (TSelf value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## INumberBase<TSelf>.IsOddInteger(TSelf) method

```csharp
public static abstract bool IsOddInteger (TSelf value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## INumberBase<TSelf>.IsPositive(TSelf) method

```csharp
public static abstract bool IsPositive (TSelf value);
```

Determines if a value represents zero or a positive real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` represents (positive) zero or a positive real number; otherwise, `false`.

#### Remarks

If this type has signed zero, then `-0` is not considered positive, but `+0` is.

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## INumberBase<TSelf>.IsPositiveInfinity(TSelf) method

```csharp
public static abstract bool IsPositiveInfinity (TSelf value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## INumberBase<TSelf>.IsRealNumber(TSelf) method

```csharp
public static abstract bool IsRealNumber (TSelf value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

#### Remarks

This function returns `true` for a complex number `a + bi` where `b` is zero.

This function checks values against the extended real number line, thus returns `true` for positive and negative infinity.

## INumberBase<TSelf>.IsSubnormal(TSelf) method

```csharp
public static abstract bool IsSubnormal (TSelf value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## INumberBase<TSelf>.IsZero(TSelf) method

```csharp
public static abstract bool IsZero (TSelf value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

#### Remarks

This function treats both positive and negative zero as zero and so will return `true` for `+0.0` and `-0.0`.

## INumberBase<TSelf>.MaxMagnitude(TSelf, TSelf) method

```csharp
public static abstract TSelf MaxMagnitude (TSelf x, TSelf y);
```

Compares two values to compute which has the greater magnitude.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it has a greater magnitude than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumberBase<TSelf>.MaxMagnitudeNumber(TSelf, TSelf) method

```csharp
public static abstract TSelf MaxMagnitudeNumber (TSelf x, TSelf y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it has a greater magnitude than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumberBase<TSelf>.MinMagnitude(TSelf, TSelf) method

```csharp
public static abstract TSelf MinMagnitude (TSelf x, TSelf y);
```

Compares two values to compute which has the lesser magnitude.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it has a lesser magnitude than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumberBase<TSelf>.MinMagnitudeNumber(TSelf, TSelf) method

```csharp
public static abstract TSelf MinMagnitudeNumber (TSelf x, TSelf y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it has a lesser magnitude than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitudeNumber` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## INumberBase<TSelf>.MultiplyAddEstimate(TSelf, TSelf, TSelf) method

```csharp
public static virtual TSelf MultiplyAddEstimate (TSelf left, TSelf right, TSelf addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

On hardware that natively supports `IFloatingPointIeee754<T>.FusedMultiplyAdd`, this may return a result that was rounded as one ternary operation.

On hardware without specialized support, this may just return (`left` * `right`) + `addend`.

## INumberBase<TSelf>.Parse(Byte>, NumberStyles, IFormatProvider) method

```csharp
public static virtual TSelf Parse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

Exceptions:

- `ArgumentException`: `style` is not a supported `NumberStyles` value.
- `FormatException`: `utf8Text` is not in the correct format.
- `OverflowException`: `utf8Text` is not representable by `TSelf`.

To be added.

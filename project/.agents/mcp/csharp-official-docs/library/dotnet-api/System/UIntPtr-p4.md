---
title: "UIntPtr struct (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UIntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UIntPtr struct (part 4 of 5)

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsInteger(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsInteger (UIntPtr value);
```

Determines if a value represents an integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an integer; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsNaN(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsNaN (UIntPtr value);
```

Determines if a value is NaN.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is NaN; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsNegative(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsNegative (UIntPtr value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsNegativeInfinity(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsNegativeInfinity (UIntPtr value);
```

Determines if a value is negative infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative infinity; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsNormal(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsNormal (UIntPtr value);
```

Determines if a value is normal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is normal; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsPositive(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsPositive (UIntPtr value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsPositiveInfinity(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsPositiveInfinity (UIntPtr value);
```

Determines if a value is positive infinity.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive infinity; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsRealNumber(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsRealNumber (UIntPtr value);
```

Determines if a value represents a real number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a real number; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsSubnormal(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsSubnormal (UIntPtr value);
```

Determines if a value is subnormal.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is subnormal; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.IsZero(UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.IsZero (UIntPtr value);
```

Determines if a value is zero.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is zero; otherwise, `false`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.MaxMagnitude(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumberBase<UIntPtr>.MaxMagnitude (UIntPtr x, UIntPtr y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.MaxMagnitudeNumber(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumberBase<UIntPtr>.MaxMagnitudeNumber (UIntPtr x, UIntPtr y);
```

Compares two values to compute which has the greater magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.MinMagnitude(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumberBase<UIntPtr>.MinMagnitude (UIntPtr x, UIntPtr y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.MinMagnitudeNumber(UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumberBase<UIntPtr>.MinMagnitudeNumber (UIntPtr x, UIntPtr y);
```

Compares two values to compute which has the lesser magnitude and returning the other value if an input is `NaN`.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.MultiplyAddEstimate(UIntPtr, UIntPtr, UIntPtr) method

```csharp
static UIntPtr INumberBase<UIntPtr>.MultiplyAddEstimate (UIntPtr left, UIntPtr right, UIntPtr addend);
```

Computes an estimate of (`left` * `right`) + `addend`.

Parameters:

- `left`: The value to be multiplied with `right`.
- `right`: The value to be multiplied with `left`.
- `addend`: The value to be added to the result of `left` multiplied by `right`.

Returns: An estimate of (`left` * `right`) + `addend`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.TryConvertToChecked<TOther>(UIntPtr, TOther) method

```csharp
static bool INumberBase<UIntPtr>.TryConvertToChecked<TOther> (UIntPtr value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.TryConvertToSaturating<TOther>(UIntPtr, TOther) method

```csharp
static bool INumberBase<UIntPtr>.TryConvertToSaturating<TOther> (UIntPtr value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.TryConvertToTruncating<TOther>(UIntPtr, TOther) method

```csharp
static bool INumberBase<UIntPtr>.TryConvertToTruncating<TOther> (UIntPtr value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.TryConvertFromChecked<TOther>(TOther, UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.TryConvertFromChecked<TOther> (TOther value, out UIntPtr result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.TryConvertFromSaturating<TOther>(TOther, UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.TryConvertFromSaturating<TOther> (TOther value, out UIntPtr result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.INumberBase<System.UIntPtr>.TryConvertFromTruncating<TOther>(TOther, UIntPtr) method

```csharp
static bool INumberBase<UIntPtr>.TryConvertFromTruncating<TOther> (TOther value, out UIntPtr result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## UIntPtr.System.Numerics.IShiftOperators<System.UIntPtr,System.Int32,System.UIntPtr>.op_LeftShift(UIntPtr, Int32) method

```csharp
static UIntPtr IShiftOperators<UIntPtr,int,UIntPtr>.operator << (UIntPtr value, int shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## UIntPtr.System.Numerics.IShiftOperators<System.UIntPtr,System.Int32,System.UIntPtr>.op_RightShift(UIntPtr, Int32) method

```csharp
static UIntPtr IShiftOperators<UIntPtr,int,UIntPtr>.operator >> (UIntPtr value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## UIntPtr.System.Numerics.IShiftOperators<System.UIntPtr,System.Int32,System.UIntPtr>.op_UnsignedRightShift(UIntPtr, Int32) method

```csharp
static UIntPtr IShiftOperators<UIntPtr,int,UIntPtr>.op_UnsignedRightShift (UIntPtr value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## UIntPtr.System.Numerics.ISubtractionOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_CheckedSubtraction(UIntPtr, UIntPtr) method

```csharp
static UIntPtr ISubtractionOperators<UIntPtr,UIntPtr,UIntPtr>.op_CheckedSubtraction (UIntPtr left, UIntPtr right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## UIntPtr.System.Numerics.ISubtractionOperators<System.UIntPtr,System.UIntPtr,System.UIntPtr>.op_Subtraction(UIntPtr, UIntPtr) method

```csharp
static UIntPtr ISubtractionOperators<UIntPtr,UIntPtr,UIntPtr>.operator - (UIntPtr left, UIntPtr right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## UIntPtr.System.Numerics.IUnaryNegationOperators<System.UIntPtr,System.UIntPtr>.op_CheckedUnaryNegation(UIntPtr) method

```csharp
static UIntPtr IUnaryNegationOperators<UIntPtr,UIntPtr>.op_CheckedUnaryNegation (UIntPtr value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## UIntPtr.System.Numerics.IUnaryNegationOperators<System.UIntPtr,System.UIntPtr>.op_UnaryNegation(UIntPtr) method

```csharp
static UIntPtr IUnaryNegationOperators<UIntPtr,UIntPtr>.operator - (UIntPtr value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## UIntPtr.System.Numerics.IUnaryPlusOperators<System.UIntPtr,System.UIntPtr>.op_UnaryPlus(UIntPtr) method

```csharp
static UIntPtr IUnaryPlusOperators<UIntPtr,UIntPtr>.operator + (UIntPtr value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## UIntPtr.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize the current `UIntPtr` object.

Parameters:

- `info`: The `SerializationInfo` object to populate with data.
- `context`: The destination for this serialization. (This parameter is not used; specify `null`.)

Exceptions:

- `ArgumentNullException`: `info` is `null`.

#### Remarks
This method populates the `info` parameter with the value of the current `UIntPtr` object.

## UIntPtr.ToPointer() method

```csharp
public void* ToPointer ();
```

Converts the value of this instance to a pointer to an unspecified type.

Returns: A pointer to `Void`; that is, a pointer to memory containing data of an unspecified type.

To be added.

## UIntPtr.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

#### Remarks
If the value of the `Size` property for this instance is 4, then this method is equivalent to `UInt32.ToString`; otherwise, this method is equivalent to `UInt64.ToString`.

## UIntPtr.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

To be added.

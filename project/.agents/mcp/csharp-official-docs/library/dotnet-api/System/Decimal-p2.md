---
title: "Decimal struct (part 2 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 2 of 12)

## Decimal.System.Numerics.IMinMaxValue<System.Decimal>.MinValue property

```csharp
static decimal System.Numerics.IMinMaxValue<System.Decimal>.MinValue { get; }
```

Gets the minimum value of the current type.

Returns: To be added.

To be added.

## Decimal.System.Numerics.IMultiplicativeIdentity<System.Decimal,System.Decimal>.MultiplicativeIdentity property

```csharp
static decimal System.Numerics.IMultiplicativeIdentity<System.Decimal,System.Decimal>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.One property

```csharp
static decimal System.Numerics.INumberBase<System.Decimal>.One { get; }
```

Gets the value `1` for the type.

Returns: To be added.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Decimal>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## Decimal.System.Numerics.INumberBase<System.Decimal>.Zero property

```csharp
static decimal System.Numerics.INumberBase<System.Decimal>.Zero { get; }
```

Gets the value `0` for the type.

Returns: To be added.

To be added.

## Decimal.System.Numerics.ISignedNumber<System.Decimal>.NegativeOne property

```csharp
static decimal System.Numerics.ISignedNumber<System.Decimal>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## Decimal.Abs(Decimal) method

```csharp
public static decimal Abs (decimal value);
```

Computes the absolute of a value.

Parameters:

- `value`: The value for which to get its absolute.

Returns: The absolute of `value`.

To be added.

## Decimal.Add(Decimal, Decimal) method

```csharp
public static decimal Add (decimal d1, decimal d2);
```

Adds two specified `Decimal` values.

Parameters:

- `d1`: The first value to add.
- `d2`: The second value to add.

Returns: The sum of `d1` and `d2`.

Exceptions:

- `OverflowException`: The sum of `d1` and `d2` is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The following code sample illustrates the use of `Add` :

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/source.cs._

## Decimal.Ceiling(Decimal) method

```csharp
public static decimal Ceiling (decimal d);
```

Returns the smallest integral value that is greater than or equal to the specified decimal number.

Parameters:

- `d`: A decimal number.

Returns: The smallest integral value that is greater than or equal to the `d` parameter. Note that this method returns a `Decimal` instead of an integral type.

#### Remarks
The behavior of this method follows IEEE Standard 754, section 4. This kind of rounding is sometimes called rounding toward positive infinity. In other words, if `d` is positive, the presence of any fractional component causes `d` to be rounded to the next highest integer. If `d` is negative, the rounding operation causes any fractional component of `d` to be discarded. The operation of this method differs from the `Decimal.Floor` method, which supports rounding toward negative infinity.

#### Examples
The following example illustrates the `Decimal.Ceiling` method and contrasts it with the `Decimal.Floor` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/Ceiling/ceiling1.cs._

## Decimal.Clamp(Decimal, Decimal, Decimal) method

```csharp
public static decimal Clamp (decimal value, decimal min, decimal max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## Decimal.Compare(Decimal, Decimal) method

```csharp
public static int Compare (decimal d1, decimal d2);
```

Compares two specified `Decimal` values.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: A signed number indicating the relative values of `d1` and `d2`.

-  Less than zero

: `d1` is less than `d2`.

-  Zero

: `d1` and `d2` are equal.

-  Greater than zero

: `d1` is greater than `d2`.

#### Examples
The following example compares several `Decimal` values. Note that the first comparison indicates that the two values are equal despite the subtraction operation performed on the `value2` variable. This is because the `Decimal` type has 29 digits of precision, whereas a difference between these two values can be detected only with 30 digits of precision.

_Code sample not included: ~/snippets/csharp/System/Decimal/Compare/Compare1.cs._

## Decimal.CompareTo(Decimal) method

```csharp
public int CompareTo (decimal value);
```

Compares this instance to a specified `Decimal` object and returns a comparison of their relative values.

Parameters:

- `value`: The object to compare with this instance.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`.

#### Remarks
This method implements the `IComparable<T>` interface and performs slightly better than the `Decimal.CompareTo` method because it does not have to convert the `value` parameter to an object.

Depending on your programming language, it might be possible to code a `Decimal.CompareTo` method where the parameter type has fewer bits (is narrower) than the instance type. This is possible because some programming languages perform an implicit widening conversion that represents the parameter as a type with as many bits as the instance.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the parameter as an `Int32` object, then generates a `Int32.CompareTo` method to compare the values of the `Int32` instance and the `Int32` parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

#### Examples
The following code example demonstrates generic and nongeneric versions of the `Decimal.CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Decimal.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns a comparison of their relative values.

Parameters:

- `value`: The object to compare with this instance, or `null`.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  Greater than zero

:  This instance is greater than `value`, or `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `Decimal`.

#### Remarks
Any instance of `Decimal`, regardless of its value, is considered greater than `null`.

Parameter `value` must be `null` or an instance of `Decimal`; otherwise, an exception is thrown.

#### Examples
The following code example compares several `Decimal` and other objects to a reference `Decimal` value using the `CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/CompareTo/cto_eq_obj.cs._

## Decimal.ConvertToInteger<TInteger>(Decimal) method

```csharp
public static TInteger ConvertToInteger<TInteger> (decimal value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Decimal.ConvertToIntegerNative<TInteger>(Decimal) method

```csharp
public static TInteger ConvertToIntegerNative<TInteger> (decimal value) where TInteger : System.Numerics.IBinaryInteger<TInteger>;
```

To be added.

Parameters:

- `TInteger`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Decimal.CopySign(Decimal, Decimal) method

```csharp
public static decimal CopySign (decimal value, decimal sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## Decimal.CreateChecked<TOther>(TOther) method

```csharp
public static decimal CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## Decimal.CreateSaturating<TOther>(TOther) method

```csharp
public static decimal CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## Decimal.CreateTruncating<TOther>(TOther) method

```csharp
public static decimal CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## Decimal.Divide(Decimal, Decimal) method

```csharp
public static decimal Divide (decimal d1, decimal d2);
```

Divides two specified `Decimal` values.

Parameters:

- `d1`: The dividend.
- `d2`: The divisor.

Returns: The result of dividing `d1` by `d2`.

Exceptions:

- `DivideByZeroException`: `d2` is zero.
- `OverflowException`: The return value (that is, the quotient) is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Examples
The following example calls the `Decimal.Divide` method to divide a range of values by 22.1.

_Code sample not included: ~/snippets/csharp/System/Decimal/Divide/Divide1.cs._

## Decimal.Equals(Decimal) method

```csharp
public bool Equals (decimal value);
```

Returns a value indicating whether this instance and a specified `Decimal` object represent the same value.

Parameters:

- `value`: An object to compare to this instance.

Returns: `true` if `value` is equal to this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `Decimal.Equals` because it does not have to convert the `value` parameter to an object.

If `value` has fewer bits (is narrower) than the instance type, some programming languages perform an implicit widening conversion that transforms the value of the parameter into a value with more bits.

For example, suppose the instance type is `Int32` and the parameter type is `Byte`. The Microsoft C# compiler generates instructions to represent the value of the parameter as an `Int32` object, then generates a `Int32.CompareTo` method to compare the `Int32` instance and parameter representation.

Consult your programming language's documentation to determine whether its compiler performs implicit widening conversions on numeric types.

## Decimal.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Returns a value indicating whether this instance and a specified `Object` represent the same type and value.

Parameters:

- `value`: The object to compare with this instance.

Returns: `true` if `value` is a `Decimal` and equal to this instance; otherwise, `false`.

#### Examples
The following code example compares several `Decimal` and other objects to a reference `Decimal` value using the `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/CompareTo/cto_eq_obj.cs._

## Decimal.Equals(Decimal, Decimal) method

```csharp
public static bool Equals (decimal d1, decimal d2);
```

Returns a value indicating whether two specified instances of `Decimal` represent the same value.

Parameters:

- `d1`: The first value to compare.
- `d2`: The second value to compare.

Returns: `true` if `d1` and `d2` are equal; otherwise, `false`.

#### Examples
The following code example compares several `Decimal` values to a reference `Decimal` value using the static `Equals` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/CompareTo/comp_equal.cs._

## Decimal.Floor(Decimal) method

```csharp
public static decimal Floor (decimal d);
```

Rounds a specified `Decimal` number to the closest integer toward negative infinity.

Parameters:

- `d`: The value to round.

Returns: If `d` has a fractional part, the next whole `Decimal` number toward negative infinity that is less than `d`.

-or-

If `d` doesn't have a fractional part, `d` is returned unchanged. Note that the method returns an integral value of type `Decimal`.

#### Remarks
The behavior of this method follows IEEE Standard 754, Section 4. This kind of rounding is sometimes called rounding toward negative infinity. In other words, if `d` is positive, any fractional component is truncated. If `d` is negative, the presence of any fractional component causes it to be rounded to the smaller integer. The operation of this method differs from the `Decimal.Ceiling` method, which supports rounding toward positive infinity.

#### Examples
The following example illustrates the `Decimal.Floor` method and contrasts it with the `Decimal.Ceiling` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/Ceiling/ceiling1.cs._

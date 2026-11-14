---
title: "BigInteger struct (part 3 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 3 of 18)

## BigInteger.MinusOne property

```csharp
public static System.Numerics.BigInteger MinusOne { get; }
```

Gets a value that represents the number negative one (-1).

Returns: An integer whose value is negative one (-1).

#### Remarks
The `MinusOne` property is used to compare a `BigInteger` value to -1 or to assign -1 to a `BigInteger` object.

## BigInteger.One property

```csharp
public static System.Numerics.BigInteger One { get; }
```

Gets a value that represents the number one (1).

Returns: An object whose value is one (1).

#### Remarks
The `One` property is usually used to compare a `BigInteger` value to 1 or to assign 1 to a `BigInteger` object.

## BigInteger.Sign property

```csharp
public int Sign { get; }
```

Gets a number that indicates the sign (negative, positive, or zero) of the current `BigInteger` object.

Returns: A number that indicates the sign of the `BigInteger` object, as shown in the following table.

-  -1

:  The value of this object is negative.

-  0

:  The value of this object is 0 (zero).

-  1

:  The value of this object is positive.

#### Remarks
The `Sign` property is equivalent to the `Math.Sign` method for the primitive numeric types.

## BigInteger.System.Numerics.IAdditiveIdentity<System.Numerics.BigInteger,System.Numerics.BigInteger>.AdditiveIdentity property

```csharp
static System.Numerics.BigInteger System.Numerics.IAdditiveIdentity<System.Numerics.BigInteger,System.Numerics.BigInteger>.AdditiveIdentity { get; }
```

Gets the additive identity of the current type.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.IBinaryNumber<System.Numerics.BigInteger>.AllBitsSet property

```csharp
static System.Numerics.BigInteger System.Numerics.IBinaryNumber<System.Numerics.BigInteger>.AllBitsSet { get; }
```

Gets an instance of the binary type in which all bits are set.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.IMultiplicativeIdentity<System.Numerics.BigInteger,System.Numerics.BigInteger>.MultiplicativeIdentity property

```csharp
static System.Numerics.BigInteger System.Numerics.IMultiplicativeIdentity<System.Numerics.BigInteger,System.Numerics.BigInteger>.MultiplicativeIdentity { get; }
```

Gets the multiplicative identity of the current type.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.INumberBase<System.Numerics.BigInteger>.Radix property

```csharp
static int System.Numerics.INumberBase<System.Numerics.BigInteger>.Radix { get; }
```

Gets the radix, or base, for the type.

Returns: To be added.

To be added.

## BigInteger.System.Numerics.ISignedNumber<System.Numerics.BigInteger>.NegativeOne property

```csharp
static System.Numerics.BigInteger System.Numerics.ISignedNumber<System.Numerics.BigInteger>.NegativeOne { get; }
```

Gets the value `-1` for the type.

Returns: To be added.

To be added.

## BigInteger.Zero property

```csharp
public static System.Numerics.BigInteger Zero { get; }
```

Gets a value that represents the number 0 (zero).

Returns: An integer whose value is 0 (zero).

#### Remarks
The `BigInteger` object returned by this property provides a convenient source of a zero value for use in assignments and comparisons.

## BigInteger.Abs(BigInteger) method

```csharp
public static System.Numerics.BigInteger Abs (System.Numerics.BigInteger value);
```

Gets the absolute value of a `BigInteger` object.

Parameters:

- `value`: A number.

Returns: The absolute value of `value`.

#### Remarks
The absolute value of a number is that number without its sign, as shown in the following table.

|`value` parameter|Return value|
|-----------------------|------------------|
|`value` >= 0|`value`|
|`value` < 0|`value` * -1|

The `BigInteger.Abs` method is equivalent to the `Math.Abs` method for the primitive numeric types.

## BigInteger.Add(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Add (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Adds two `BigInteger` values and returns the result.

Parameters:

- `left`: The first value to add.
- `right`: The second value to add.

Returns: The sum of `left` and `right`.

#### Remarks
Languages that do not support operator overloading or custom operators can use the `BigInteger.Add` method to perform addition using `BigInteger` values.

The `BigInteger.Add` method is a useful substitute for the addition operator when instantiating a `BigInteger` variable by assigning it a sum that results from addition, as shown in the following example.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Add/Multiply1.cs._

## BigInteger.Clamp(BigInteger, BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Clamp (System.Numerics.BigInteger value, System.Numerics.BigInteger min, System.Numerics.BigInteger max);
```

Clamps a value to an inclusive minimum and maximum value.

Parameters:

- `value`: The value to clamp.
- `min`: The inclusive minimum to which `value` should clamp.
- `max`: The inclusive maximum to which `value` should clamp.

Returns: The result of clamping `value` to the inclusive range of `min` and `max`.

To be added.

## BigInteger.Compare(BigInteger, BigInteger) method

```csharp
public static int Compare (System.Numerics.BigInteger left, System.Numerics.BigInteger right);
```

Compares two `BigInteger` values and returns an integer that indicates whether the first value is less than, equal to, or greater than the second value.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: A signed integer that indicates the relative values of `left` and `right`, as shown in the following table.

-  Less than zero

: `left` is less than `right`.

-  Zero

: `left` equals `right`.

-  Greater than zero

: `left` is greater than `right`.

#### Remarks
Although the `BigInteger` type has no fixed range, comparisons of `BigInteger` values are not characterized by the lack of precision that characterizes the comparison of floating-point numbers. The following example compares two `BigInteger` values that differ by one and that each have 1,896 digits. The `BigInteger.Compare` method correctly reports that the two values are not equal.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Compare/Compare1.cs._

## BigInteger.CompareTo(Int64) method

```csharp
public int CompareTo (long other);
```

Compares this instance to a signed 64-bit integer and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the signed 64-bit integer.

Parameters:

- `other`: The signed 64-bit integer to compare.

Returns: A signed integer value that indicates the relationship of this instance to `other`, as shown in the following table.

-  Less than zero

:  The current instance is less than `other`.

-  Zero

:  The current instance equals `other`.

-  Greater than zero

:  The current instance is greater than `other`.

#### Remarks
If `other` is a `Byte`, `Int16`, `Int32`, `SByte`, `UInt16`, or `UInt32` value, it is implicitly converted to an `Int64` value when the `CompareTo` method is called.

#### Examples
The following example illustrates the result of calling the `CompareTo` method with integral values.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/CompareTo/Example2.cs._

## BigInteger.CompareTo(BigInteger) method

```csharp
public int CompareTo (System.Numerics.BigInteger other);
```

Compares this instance to a second `BigInteger` and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified object.

Parameters:

- `other`: The object to compare.

Returns: A signed integer value that indicates the relationship of this instance to `other`, as shown in the following table.

-  Less than zero

:  The current instance is less than `other`.

-  Zero

:  The current instance equals `other`.

-  Greater than zero

:  The current instance is greater than `other`.

#### Remarks
This overload of the `BigInteger.CompareTo` method implements the `IComparable<T>.CompareTo` method. It is used by generic collection objects to order the items in the collection.

#### Examples
The following example illustrates the use of the `CompareTo` method to order a list of `StarInfo` objects. Each `StarInfo` object provides information about a star's name and its distance from the Earth in miles. `StarInfo` implements the `IComparable<T>` interface, which enables `StarInfo` objects to be sorted by generic collection classes. Its `IComparable<T>.CompareTo` implementation just wraps a call to `CompareTo`.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/CompareTo/Example1.cs._

The following code then instantiates four `StarInfo` objects and stores them in a generic `List<T>` object. After the `List<T>.Sort` method is called, `StarInfo` objects are displayed in order of their distance from the Earth.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/CompareTo/Example1.cs._

## BigInteger.CompareTo(Object) method

```csharp
public int CompareTo (object? obj);
```

Compares this instance to a specified object and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the specified object.

Parameters:

- `obj`: The object to compare.

Returns: A signed integer that indicates the relationship of the current instance to the `obj` parameter, as shown in the following table.

-  Less than zero

:  The current instance is less than `obj`.

-  Zero

:  The current instance equals `obj`.

-  Greater than zero

:  The current instance is greater than `obj`, or the `obj` parameter is `null`.

Exceptions:

- `ArgumentException`: `obj` is not a `BigInteger`.

#### Remarks
This overload of the `BigInteger.CompareTo` method implements the `IComparable.CompareTo` method. It is used by non-generic collection objects to order the items in the collection.

The `obj` parameter must be one of the following:

- An object whose run-time type is `BigInteger`.

- An `Object` variable whose value is `null`. If the value of the `obj` parameter is `null`, the method returns 1, which indicates that the current instance is greater than `obj`.

#### Examples
The following example calls the `CompareTo` method to compare a `BigInteger` value with each element in an object array:

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/CompareTo/Example2.cs._

## BigInteger.CompareTo(UInt64) method

```csharp
public int CompareTo (ulong other);
```

Compares this instance to an unsigned 64-bit integer and returns an integer that indicates whether the value of this instance is less than, equal to, or greater than the value of the unsigned 64-bit integer.

Parameters:

- `other`: The unsigned 64-bit integer to compare.

Returns: A signed integer that indicates the relative value of this instance and `other`, as shown in the following table.

- Less than zero: The current instance is less than `other`.
- Zero: The current instance equals `other`.
- Greater than zero: The current instance is greater than `other`.

To be added.

## BigInteger.CopySign(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger CopySign (System.Numerics.BigInteger value, System.Numerics.BigInteger sign);
```

Copies the sign of a value to the sign of another value.

Parameters:

- `value`: The value whose magnitude is used in the result.
- `sign`: The value whose sign is used in the result.

Returns: A value with the magnitude of `value` and the sign of `sign`.

To be added.

## BigInteger.CreateChecked<TOther>(TOther) method

```csharp
public static System.Numerics.BigInteger CreateChecked<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, throwing an overflow exception for any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`.

To be added.

## BigInteger.CreateSaturating<TOther>(TOther) method

```csharp
public static System.Numerics.BigInteger CreateSaturating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, saturating if `value` falls outside the representable range of `TSelf`.

To be added.

## BigInteger.CreateTruncating<TOther>(TOther) method

```csharp
public static System.Numerics.BigInteger CreateTruncating<TOther> (TOther value) where TOther : System.Numerics.INumberBase<TOther>;
```

Creates an instance of the current type from a value, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type of `value`.
- `value`: The value that's used to create the instance of `TSelf`.

Returns: An instance of `TSelf` created from `value`, truncating if `value` falls outside the representable range of `TSelf`.

To be added.

## BigInteger.Divide(BigInteger, BigInteger) method

```csharp
public static System.Numerics.BigInteger Divide (System.Numerics.BigInteger dividend, System.Numerics.BigInteger divisor);
```

Divides one `BigInteger` value by another and returns the result.

Parameters:

- `dividend`: The value to be divided.
- `divisor`: The value to divide by.

Returns: The quotient of the division.

Exceptions:

- `DivideByZeroException`: `divisor` is 0 (zero).

#### Remarks
The `BigInteger.Divide` method performs integer division; any remainder that results from the division is discarded. To perform integer division while preserving the remainder, call the `BigInteger.DivRem` method. To retrieve only the remainder, call the `BigInteger.Remainder` method.

The `BigInteger.Divide` method can be used by languages that do not support operator overloading. Its behavior is identical to division using the division operator.

#### Examples
The following example creates an array of `BigInteger` values. It then uses each element as the quotient in a division operation that uses the `BigInteger.Divide` method, the division operator (/), and the `BigInteger.DivRem` method.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/Divide/Divide1.cs._

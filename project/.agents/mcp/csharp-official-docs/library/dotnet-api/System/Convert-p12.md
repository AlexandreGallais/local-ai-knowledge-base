---
title: "Convert class (part 12 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 12 of 23)

## Convert.ToInt32(Decimal) method

```csharp
public static int ToInt32 (decimal value);
```

Converts the value of the specified decimal number to an equivalent 32-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: `value`, rounded to the nearest 32-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Decimal` values to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Double) method

```csharp
public static int ToInt32 (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 32-bit signed integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 32-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Double` values to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Int16) method

```csharp
public static int ToInt32 (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent 32-bit signed integer.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of 16-bit signed integers to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Int32) method

```csharp
public static int ToInt32 (int value);
```

Returns the specified 32-bit signed integer; no actual conversion is performed.

Parameters:

- `value`: The 32-bit signed integer to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToInt32(Int64) method

```csharp
public static int ToInt32 (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent 32-bit signed integer.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of long integers to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Object) method

```csharp
public static int ToInt32 (object? value);
```

Converts the value of the specified object to a 32-bit signed integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A 32-bit signed integer equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the  `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If`value` is not `null`, this method wraps a call to the `IConvertible.ToInt32` implementation of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(SByte) method

```csharp
public static int ToInt32 (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent 32-bit signed integer.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A 8-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of signed bytes to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Single) method

```csharp
public static int ToInt32 (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 32-bit signed integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 32-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Single` values to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(String) method

```csharp
public static int ToInt32 (string? value);
```

Converts the specified string representation of a number to an equivalent 32-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A 32-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
Using the `ToInt32` method is equivalent to passing `value` to the `Parse` method.`value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Int32.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example attempts to convert each element in a numeric string array to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(UInt16) method

```csharp
public static int ToInt32 (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent 32-bit signed integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of 16-bit unsigned integers to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(UInt32) method

```csharp
public static int ToInt32 (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 32-bit signed integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned integers to a signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(UInt64) method

```csharp
public static int ToInt32 (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 32-bit signed integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned long integers to a signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Object, IFormatProvider) method

```csharp
public static int ToInt32 (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to a 32-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 32-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement `IConvertible`.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToInt32` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a class that implements `IConvertible` and a class that implements `IFormatProvider`. Objects of the class that implements `IConvertible` hold an array of `Double` values. An object of each class is passed to the `ToInt32` method. This method returns an average of the array of `Double` values, using the object that implements `IFormatProvider` to determine how to calculate the average.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/objectifp.cs._

## Convert.ToInt32(String, IFormatProvider) method

```csharp
public static int ToInt32 (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 32-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 32-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `Int32.Parse` method on `value`.

`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Int32.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example defines a custom `NumberFormatInfo` object that recognizes the string "pos" as the positive sign and the string "neg" as the negative sign. It then attempts to convert each element of a numeric string array to an integer using both this provider and the `NumberFormatInfo` provider for the invariant culture.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_2.cs._

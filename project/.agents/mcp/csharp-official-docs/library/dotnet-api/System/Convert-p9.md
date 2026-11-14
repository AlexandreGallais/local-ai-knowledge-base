---
title: "Convert class (part 9 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 9 of 23)

## Convert.ToDecimal(String) method

```csharp
public static decimal ToDecimal (string? value);
```

Converts the specified string representation of a number to an equivalent decimal number.

Parameters:

- `value`: A string that contains a number to convert.

Returns: A decimal number that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a number in a valid format.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
Using the `ToDecimal` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Decimal.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example illustrates the use of `ToDecimal`. It attempts to convert a `String` to a `Decimal`, and throws the possible exceptions that may arise during the conversion.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDecimal(UInt16) method

```csharp
public static decimal ToDecimal (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to an equivalent decimal number.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: The decimal number that is equivalent to `value`.

#### Examples
The following example converts an array of 16-bit unsigned integers to `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(UInt32) method

```csharp
public static decimal ToDecimal (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent decimal number.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A decimal number that is equivalent to `value`.

#### Examples
The following example converts an array of unsigned integers to `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(UInt64) method

```csharp
public static decimal ToDecimal (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent decimal number.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A decimal number that is equivalent to `value`.

#### Examples
The following example converts an array of unsigned long integers to `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(Object, IFormatProvider) method

```csharp
public static decimal ToDecimal (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to an equivalent decimal number, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A decimal number that is equivalent to `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format for a `Decimal` type.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToDecimal` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a `Temperature` class that implements the `IConvertible` interface.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal2.cs._

The following example shows that when a `Temperature` object is passed as a parameter to the `ToDecimal` method, the `IConvertible.ToDecimal` implementation of the `Temperature` class is called to perform the conversion.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal2.cs._

## Convert.ToDecimal(String, IFormatProvider) method

```csharp
public static decimal ToDecimal (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent decimal number, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains a number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A decimal number that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a number in a valid format.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `Decimal.Parse` method on `value`.

`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Decimal.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example attempts to convert an array of strings to `Decimal` values by using `NumberFormatInfo` objects that represent two different cultures.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal3.cs._

## Convert.ToDouble(Boolean) method

```csharp
public static double ToDouble (bool value);
```

Converts the specified Boolean value to the equivalent double-precision floating-point number.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts a `Boolean` value to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDouble(Byte) method

```csharp
public static double ToDouble (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent double-precision floating-point number.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: The double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts a `Byte` value to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDouble(Char) method

```csharp
public static double ToDouble (char value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Unicode character to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDouble(DateTime) method

```csharp
public static double ToDouble (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDouble(Decimal) method

```csharp
public static double ToDouble (decimal value);
```

Converts the value of the specified decimal number to an equivalent double-precision floating-point number.

Parameters:

- `value`: The decimal number to convert.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts a `Decimal` value to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDouble(Double) method

```csharp
public static double ToDouble (double value);
```

Returns the specified double-precision floating-point number; no actual conversion is performed.

Parameters:

- `value`: The double-precision floating-point number to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToDouble(Int16) method

```csharp
public static double ToDouble (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent double-precision floating-point number.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A double-precision floating-point number equivalent to `value`.

#### Examples
The following example converts each element in an array of 16-bit signed integers to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

## Convert.ToDouble(Int32) method

```csharp
public static double ToDouble (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent double-precision floating-point number.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts an `Int32` value to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDouble(Int64) method

```csharp
public static double ToDouble (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent double-precision floating-point number.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of signed long integers to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

## Convert.ToDouble(Object) method

```csharp
public static double ToDouble (object? value);
```

Converts the value of the specified object to a double-precision floating-point number.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A double-precision floating-point number that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format for a `Double` type.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Double.MinValue">Double.MinValue</see> or greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
If `value` is not `null`, this method wraps a call to the `IConvertible.ToDouble` implementation of the underlying type of `value`.

#### Examples
The following example attempts to convert each value in an object array to a `Double`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

## Convert.ToDouble(SByte) method

```csharp
public static double ToDouble (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent double-precision floating-point number.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: The 8-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of `SByte` values to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

## Convert.ToDouble(Single) method

```csharp
public static double ToDouble (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent double-precision floating-point number.

Parameters:

- `value`: The single-precision floating-point number.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts a `Single` value to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDouble(String) method

```csharp
public static double ToDouble (string? value);
```

Converts the specified string representation of a number to an equivalent double-precision floating-point number.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A double-precision floating-point number that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a number in a valid format.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Double.MinValue">Double.MinValue</see> or greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
Using the `ToDouble` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Double.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example attempts to convert each element in an array of numeric strings to a `Double`. The example's output is from a system whose current culture is en-US.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/example8.cs._

## Convert.ToDouble(UInt16) method

```csharp
public static double ToDouble (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent double-precision floating-point number.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of `UInt16` values to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

---
title: "Convert class (part 8 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 8 of 23)

## Convert.ToDateTime(String) method

```csharp
public static DateTime ToDateTime (string? value);
```

Converts the specified string representation of a date and time to an equivalent date and time value.

Parameters:

- `value`: The string representation of a date and time.

Returns: The date and time equivalent of the value of `value`, or the date and time equivalent of <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a properly formatted date and time string.

#### Remarks
If `value` is not `null`, the return value is the result of invoking the `DateTime.Parse` method on `value` using the formatting information in a `DateTimeFormatInfo` object that is initialized for the current culture. The `value` argument must contain the representation of a date and time in one of the formats described in the `DateTimeFormatInfo` topic. If `value` is `null`, the method returns `MinValue`.

This method tries to parse `value` completely and avoid throwing a `FormatException`. It completes missing month, day, and year information with the current date. If `value` contains only a date and no time, this method assumes a time of midnight. Any leading, inner, or trailing white-space characters in `value` are ignored.

If you prefer not to handle an exception if the conversion fails, you can call the `DateTime.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example uses the `Convert.ToDateTime` method to convert various string representations of dates and times to `DateTime` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDateTime/ToDateTime2.cs._

## Convert.ToDateTime(UInt16) method

```csharp
public static DateTime ToDateTime (ushort value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(UInt32) method

```csharp
public static DateTime ToDateTime (uint value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(UInt64) method

```csharp
public static DateTime ToDateTime (ulong value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Object, IFormatProvider) method

```csharp
public static DateTime ToDateTime (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to a `DateTime` object, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The date and time equivalent of the value of `value`, or the date and time equivalent of <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a valid date and time value.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.

#### Remarks
The return value is the result of invoking the `IConvertible.ToDateTime` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a date, `provider` could supply culture-specific information about the notation used to represent that date. `provider` is involved in the conversion of `value` if the runtime type of `value` is a `String`, or if `value` is a user-defined type whose `IConvertible.ToDateTime` implementation makes use of `provider`. If the runtime type of `value` is `String` and `provider` is `null`, the `CultureInfo` object that represents the current culture is used.

#### Examples
The following example defines a custom format provider, `CustomProvider`, whose `IFormatProvider.GetFormat` method outputs a message to the console that it has been invoked, and then returns the `DateTimeFormatInfo` object of the culture whose name was passed as a parameter to its class constructor. Each of these `CustomProvider` objects is used to convert the elements in an object array to date and time values. The output indicates that the `CustomProvider` object is used in the conversion only when the type of the `value` parameter is a `String`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDateTime/todatetime4.cs._

## Convert.ToDateTime(String, IFormatProvider) method

```csharp
public static DateTime ToDateTime (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent date and time, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains a date and time to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The date and time equivalent of the value of `value`, or the date and time equivalent of <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a properly formatted date and time string.

#### Remarks
The return value is the result of invoking the `Parse` method on `value`.

`provider` is an `IFormatProvider` instance that obtains a `DateTimeFormatInfo` object. The `DateTimeFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `DateTimeFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `DateTime.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts string representations of date values with the `ToDateTime` method, using an `IFormatProvider` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDateTime/ToDateTime3.cs._

## Convert.ToDecimal(Boolean) method

```csharp
public static decimal ToDecimal (bool value);
```

Converts the specified Boolean value to the equivalent decimal number.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example illustrates the conversion of `Boolean` to `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(Byte) method

```csharp
public static decimal ToDecimal (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent decimal number.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: The decimal number that is equivalent to `value`.

#### Examples
The following example converts a `Byte` value to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDecimal(Char) method

```csharp
public static decimal ToDecimal (char value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Unicode character to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

#### Examples
The following example attempts to convert a `Char` value to `Decimal`, and throws `InvalidCastException` upon failure.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDecimal(DateTime) method

```csharp
public static decimal ToDecimal (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDecimal(Decimal) method

```csharp
public static decimal ToDecimal (decimal value);
```

Returns the specified decimal number; no actual conversion is performed.

Parameters:

- `value`: A decimal number.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToDecimal(Double) method

```csharp
public static decimal ToDecimal (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent decimal number.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: A decimal number that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> or less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>.

#### Remarks
The `Decimal` value returned by this method contains a maximum of 15 significant digits. If the `value` parameter contains more than 15 significant digits, it is rounded using rounding to nearest. The following example illustrates how the `ToDecimal` method uses rounding to nearest to return a `Decimal` value with 15 significant digits.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/ToDecimal1.cs._

#### Examples
The following example converts a `Double` value to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDecimal(Int16) method

```csharp
public static decimal ToDecimal (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent decimal number.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A decimal number that is equivalent to `value`.

#### Examples
The following example converts an array of 16-bit signed integers to `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(Int32) method

```csharp
public static decimal ToDecimal (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent decimal number.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A decimal number that is equivalent to `value`.

#### Examples
The following example converts an array of signed integers to `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(Int64) method

```csharp
public static decimal ToDecimal (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent decimal number.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A decimal number that is equivalent to `value`.

#### Examples
The following example converts an `Int64` value to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToDecimal(Object) method

```csharp
public static decimal ToDecimal (object? value);
```

Converts the value of the specified object to an equivalent decimal number.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A decimal number that is equivalent to `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format for a `Decimal` type.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToDecimal` method of the underlying type of `value`.

#### Examples
The following example tries to convert each element in an object array to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(SByte) method

```csharp
public static decimal ToDecimal (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent decimal number.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A decimal number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of signed bytes to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

## Convert.ToDecimal(Single) method

```csharp
public static decimal ToDecimal (float value);
```

Converts the value of the specified single-precision floating-point number to the equivalent decimal number.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: A decimal number that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see> or less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see>.

#### Remarks
The `Decimal` value returned by this method contains a maximum of seven significant digits. If the `value` parameter contains more than seven significant digits, it is rounded using rounding to nearest. The following example illustrates how the `ToDecimal` method uses rounding to nearest to return a `Decimal` value with seven significant digits.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/ToDecimal1.cs._

#### Examples
The following example tries to convert each element in an array of `Single` values to a `Decimal` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDecimal/todecimal11.cs._

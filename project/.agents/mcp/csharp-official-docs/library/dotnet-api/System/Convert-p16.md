---
title: "Convert class (part 16 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 16 of 23)

## Convert.ToSingle(Int32) method

```csharp
public static float ToSingle (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent single-precision floating-point number.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an integer array to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Int64) method

```csharp
public static float ToSingle (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent single-precision floating-point number.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of long integers to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Object) method

```csharp
public static float ToSingle (object? value);
```

Converts the value of the specified object to a single-precision floating-point number.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A single-precision floating-point number that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Single.MinValue">Single.MinValue</see> or greater than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToSingle` method of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(SByte) method

```csharp
public static float ToSingle (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent single-precision floating-point number.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in a signed byte array to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Single) method

```csharp
public static float ToSingle (float value);
```

Returns the specified single-precision floating-point number; no actual conversion is performed.

Parameters:

- `value`: The single-precision floating-point number to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToSingle(String) method

```csharp
public static float ToSingle (string? value);
```

Converts the specified string representation of a number to an equivalent single-precision floating-point number.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A single-precision floating-point number that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a number in a valid format.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Single.MinValue">Single.MinValue</see> or greater than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

#### Remarks
Using the `ToSingle` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Single.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example attempts to convert each element in an array of numeric strings to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(UInt16) method

```csharp
public static float ToSingle (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent single-precision floating-point number.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of unsigned 16-bit integers to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(UInt32) method

```csharp
public static float ToSingle (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent single-precision floating-point number.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of unsigned integers to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(UInt64) method

```csharp
public static float ToSingle (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent single-precision floating-point number.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A single-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of unsigned long integers to a `Single` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle1.cs._

## Convert.ToSingle(Object, IFormatProvider) method

```csharp
public static float ToSingle (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to an single-precision floating-point number, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A single-precision floating-point number that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement `IConvertible`.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Single.MinValue">Single.MinValue</see> or greater than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToSingle` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a `Temperature` class that implements the `IConvertible` interface. Its implementation of the `IConvertible.ToSingle` method returns the internal value of a private `Single` variable that represents the temperature.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle2.cs._

The following example illustrates how a call to the `ToSingle` method, in turn, calls the `IConvertible.ToSingle` implementation of the `Temperature` class.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle2.cs._

## Convert.ToSingle(String, IFormatProvider) method

```csharp
public static float ToSingle (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent single-precision floating-point number, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A single-precision floating-point number that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a number in a valid format.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Single.MinValue">Single.MinValue</see> or greater than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `Single.Parse` method on `value`.

`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Single.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example uses `IFormatProvider` objects that represent the en-US and fr-FR cultures when it converts the elements in an array of numeric strings to `Single` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSingle/tosingle3.cs._

## Convert.ToString(Boolean) method

```csharp
public static string ToString (bool value);
```

Converts the specified Boolean value to its equivalent string representation.

Parameters:

- `value`: The Boolean value to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `Boolean.ToString`. It returns `TrueString` for `true` values and `FalseString` for `false` values.

#### Examples
The following example illustrates the conversion of a `Boolean` to a `String`, using `ToString`. It also illustrates that the string returned by the conversion equals either `TrueString` or `FalseString`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/ToString_Bool1.cs._

## Convert.ToString(Byte) method

```csharp
public static string ToString (byte value);
```

Converts the value of the specified 8-bit unsigned integer to its equivalent string representation.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each value in a `Byte` array to a string.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/ToString.Byte1.cs._

## Convert.ToString(Char) method

```csharp
public static string ToString (char value);
```

Converts the value of the specified Unicode character to its equivalent string representation.

Parameters:

- `value`: The Unicode character to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `Char.ToString`.

#### Examples
The following example converts a `Char` to a `String`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToString(DateTime) method

```csharp
public static string ToString (DateTime value);
```

Converts the value of the specified `DateTime` to its equivalent string representation.

Parameters:

- `value`: The date and time value to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`. It uses the formatting conventions of the current culture and the "G" format specifier to convert a `DateTime` value to its string representation.

#### Examples
The following example converts each element in an array of a `DateTime` value to a `String` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(Decimal) method

```csharp
public static string ToString (decimal value);
```

Converts the value of the specified decimal number to its equivalent string representation.

Parameters:

- `value`: The decimal number to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts a `Decimal` to a `String`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToString(Double) method

```csharp
public static string ToString (double value);
```

Converts the value of the specified double-precision floating-point number to its equivalent string representation.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts a `Double` to a `String`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToString(Int16) method

```csharp
public static string ToString (short value);
```

Converts the value of the specified 16-bit signed integer to its equivalent string representation.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an array of 16-bit integers to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(Int32) method

```csharp
public static string ToString (int value);
```

Converts the value of the specified 32-bit signed integer to its equivalent string representation.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`. It formats `value` by using the formatting conventions of the current culture.

#### Examples
The following example compares the `ToString` method with the `ToString` method. It defines a custom `NumberFormatInfo` object that uses the sting "minus" to represent the negative sign. It converts each element in an integer array to its equivalent string representation using default formatting (the formatting conventions of the current culture) and the custom format provider.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring7.cs._

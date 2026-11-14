---
title: "Convert class (part 5 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 5 of 23)

## Convert.ToBoolean(String) method

```csharp
public static bool ToBoolean (string? value);
```

Converts the specified string representation of a logical value to its Boolean equivalent.

Parameters:

- `value`: A string that contains the value of either `Boolean.TrueString` or `Boolean.FalseString`.

Returns: `true` if `value` equals `Boolean.TrueString`, or `false` if `value` equals `Boolean.FalseString` or `null`.

Exceptions:

- `FormatException`: `value` is not equal to `Boolean.TrueString` or `Boolean.FalseString`.

#### Remarks
For a successful conversion to occur, the `value` parameter must equal either `TrueString`, a constant whose value is `True`, `FalseString`, a constant whose value is `False`, or it must be `null`. In comparing `value` with `TrueString` and `FalseString`, the method ignores case as well as leading and trailing white space.

If you prefer not to handle an exception if the conversion fails, you can call the `Boolean.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example uses the `ToBoolean` method to convert various strings to Boolean values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/ToBoolean1.cs._

## Convert.ToBoolean(UInt16) method

```csharp
public static bool ToBoolean (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to an equivalent Boolean value.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `UInt16` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(UInt32) method

```csharp
public static bool ToBoolean (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent Boolean value.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `Int32` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(UInt64) method

```csharp
public static bool ToBoolean (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent Boolean value.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: `true` if `value` is not zero; otherwise, `false`.

#### Examples
The following example converts an array of `UInt64` values to `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/toboolean2.cs._

## Convert.ToBoolean(Object, IFormatProvider) method

```csharp
public static bool ToBoolean (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to an equivalent Boolean value, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.
- `provider`: An object that supplies culture-specific formatting information.

Returns: `true` or `false`, which reflects the value returned by invoking the `IConvertible.ToBoolean` method for the underlying type of `value`. If `value` is `null`, the method returns `false`.

Exceptions:

- `FormatException`: `value` is a string that does not equal `Boolean.TrueString` or `Boolean.FalseString`.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion of `value` to a `Boolean` is not supported.

#### Remarks
`provider` enables the user to specify culture-specific conversion information about the contents of `value`. The base types ignore the `provider` parameter; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a class that implements `IConvertible` and a class that implements `IFormatProvider`. Objects of the class that implements `IConvertible` hold an array of `Double` values. An object of each class is passed to the `ToBoolean` method. This method returns `true` if any of the non-discarded array values are non-zero. The `IFormatProvider` object determines how elements are discarded for this calculation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/objectifp.cs._

## Convert.ToBoolean(String, IFormatProvider) method

```csharp
public static bool ToBoolean (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a logical value to its Boolean equivalent, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the value of either `Boolean.TrueString` or `Boolean.FalseString`.
- `provider`: An object that supplies culture-specific formatting information. This parameter is ignored.

Returns: `true` if `value` equals `Boolean.TrueString`, or `false` if `value` equals `Boolean.FalseString` or `null`.

Exceptions:

- `FormatException`: `value` is not equal to `Boolean.TrueString` or `Boolean.FalseString`.

#### Remarks
If you prefer not to handle an exception if the conversion fails, you can call the `Boolean.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

## Convert.ToByte(Boolean) method

```csharp
public static byte ToByte (bool value);
```

Converts the specified Boolean value to the equivalent 8-bit unsigned integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example illustrates the conversion of `Boolean` to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(Byte) method

```csharp
public static byte ToByte (byte value);
```

Returns the specified 8-bit unsigned integer; no actual conversion is performed.

Parameters:

- `value`: The 8-bit unsigned integer to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToByte(Char) method

```csharp
public static byte ToByte (char value);
```

Converts the value of the specified Unicode character to the equivalent 8-bit unsigned integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` represents a number that is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
This method returns an unsigned byte value that represents the numeric code of the `Char` object passed to it. In .NET, a `Char` object is a 16-bit value. This means that the method is suitable for returning the numeric codes of characters in the ASCII character range or in the Unicode C0 Controls and Basic Latin, and C1 Controls and Latin-1 Supplement ranges, from U+0000 to U+00FF.

#### Examples
The following example converts an array of `Char` values to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(DateTime) method

```csharp
public static byte ToByte (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToByte(Decimal) method

```csharp
public static byte ToByte (decimal value);
```

Converts the value of the specified decimal number to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The number to convert.

Returns: `value`, rounded to the nearest 8-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see> or less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see>.

#### Remarks
The following example converts a `Byte` value to a `Decimal` and a `Decimal` value to a `Byte`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToByte(Double) method

```csharp
public static byte ToByte (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 8-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see> or less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see>.

#### Examples
The following example converts a `Byte` value to a `Double` and a `Double` value to a `Byte`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToByte(Int16) method

```csharp
public static byte ToByte (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Examples
The following example converts an array of `Int16` values to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(Int32) method

```csharp
public static byte ToByte (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Examples
The following example converts an array of `Int32` values to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(Int64) method

```csharp
public static byte ToByte (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Examples
The following example converts an array of `Int64` values to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(Object) method

```csharp
public static byte ToByte (object? value);
```

Converts the value of the specified object to an 8-bit unsigned integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: An 8-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in the property format for a `Byte` value.
- `InvalidCastException`: `value` does not implement `IConvertible`.

-or-

Conversion from `value` to the `Byte` type is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
If `value` is not `null`, this method wraps a call to the `IConvertible.ToByte` implementation of the underlying type of `value`.

#### Examples
The following example uses the `ToByte` method to convert an array of objects to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(SByte) method

```csharp
public static byte ToByte (sbyte value);
```

Converts the value of the specified 8-bit signed integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 8-bit signed integer to be converted.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see>.

#### Examples
The following example converts an array of `SByte` values to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(Single) method

```csharp
public static byte ToByte (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: A single-precision floating-point number.

Returns: `value`, rounded to the nearest 8-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see> or less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see>.

#### Examples
The following example converts a `Single` value to a `Byte`.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

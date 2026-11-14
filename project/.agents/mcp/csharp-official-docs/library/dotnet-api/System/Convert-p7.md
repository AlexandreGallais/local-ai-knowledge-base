---
title: "Convert class (part 7 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 7 of 23)

## Convert.ToChar(Object) method

```csharp
public static char ToChar (object? value);
```

Converts the value of the specified object to a Unicode character.

Parameters:

- `value`: An object that implements the `IConvertible` interface.

Returns: A Unicode character that is equivalent to value, or <see cref="F:System.Char.MinValue">Char.MinValue</see> if `value` is `null`.

Exceptions:

- `ArgumentNullException`: `value` is a null string.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion of `value` to a `Char` is not supported.
- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see> or greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Remarks
If `value` is not `null`, this method wraps a call to the `IConvertible.ToChar` implementation of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to a `Char` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(SByte) method

```csharp
public static char ToChar (sbyte value);
```

Converts the value of the specified 8-bit signed integer to its equivalent Unicode character.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A Unicode character that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see>.

#### Examples
The following example converts an array of signed bytes to `Char` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(Single) method

```csharp
public static char ToChar (float value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToChar(String) method

```csharp
public static char ToChar (string value);
```

Converts the first character of a specified string to a Unicode character.

Parameters:

- `value`: A string of length 1.

Returns: A Unicode character that is equivalent to the first and only character in `value`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: The length of `value` is not 1.

#### Remarks
`value` must be a string that contains a single character.

If you prefer not to handle an exception if the conversion fails, you can call the `Char.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts each element in a string array to a `Char` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(UInt16) method

```csharp
public static char ToChar (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to its equivalent Unicode character.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A Unicode character that is equivalent to `value`.

#### Examples
The following example converts each element in an array of unsigned 16-bit integers to a `Char` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(UInt32) method

```csharp
public static char ToChar (uint value);
```

Converts the value of the specified 32-bit unsigned integer to its equivalent Unicode character.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A Unicode character that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Examples
The following example converts each element in an array of unsigned integers to a `Char` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(UInt64) method

```csharp
public static char ToChar (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to its equivalent Unicode character.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A Unicode character that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Examples
The following example converts each element in an array of unsigned long integers to a `Char` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(Object, IFormatProvider) method

```csharp
public static char ToChar (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to its equivalent Unicode character, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A Unicode character that is equivalent to `value`, or <see cref="F:System.Char.MinValue">Char.MinValue</see> if `value` is `null`.

Exceptions:

- `ArgumentNullException`: `value` is a null string.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion of `value` to a `Char` is not supported.
- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see> or greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToChar` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a class that implements `IConvertible` and a class that implements `IFormatProvider`. Objects of the class that implements `IConvertible` hold an array of `Double` values. An object of each class is passed to the `ToChar` method. This method returns a character whose Unicode value is the average of the array of `Double` values, using the object that implements `IFormatProvider` to determine how to calculate the average.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/objectifp.cs._

## Convert.ToChar(String, IFormatProvider) method

```csharp
public static char ToChar (string value, IFormatProvider? provider);
```

Converts the first character of a specified string to a Unicode character, using specified culture-specific formatting information.

Parameters:

- `value`: A string of length 1 or `null`.
- `provider`: An object that supplies culture-specific formatting information. This parameter is ignored.

Returns: A Unicode character that is equivalent to the first and only character in `value`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: The length of `value` is not 1.

#### Remarks
`value` must be a string that contains a single character.

If you prefer not to handle an exception if the conversion fails, you can call the `Char.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts a string representation of a `Char` value with the `ToChar` method, using an `IFormatProvider` object that displays the type of the format provider for which it is called. The example shows that the format provider is not referenced.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/stringnonnum.cs._

## Convert.ToDateTime(Boolean) method

```csharp
public static DateTime ToDateTime (bool value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Boolean value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Byte) method

```csharp
public static DateTime ToDateTime (byte value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Char) method

```csharp
public static DateTime ToDateTime (char value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Unicode character to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(DateTime) method

```csharp
public static DateTime ToDateTime (DateTime value);
```

Returns the specified `DateTime` object; no actual conversion is performed.

Parameters:

- `value`: A date and time value.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToDateTime(Decimal) method

```csharp
public static DateTime ToDateTime (decimal value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The number to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Double) method

```csharp
public static DateTime ToDateTime (double value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The double-precision floating-point value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Int16) method

```csharp
public static DateTime ToDateTime (short value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Int32) method

```csharp
public static DateTime ToDateTime (int value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Int64) method

```csharp
public static DateTime ToDateTime (long value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Object) method

```csharp
public static DateTime ToDateTime (object? value);
```

Converts the value of the specified object to a `DateTime` object.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: The date and time equivalent of the value of `value`, or a date and time equivalent of <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a valid date and time value.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.

#### Remarks
For the conversion to succeed, the runtime type of the `value` parameter must be either a `DateTime` or a `String`, or `value` must be `null`. Otherwise, the method throws an `InvalidCastException`. In addition, if `value` is a string, it must contain a valid representation of a date and time value in the current culture or a `FormatException` is thrown.

The return value is the result of invoking the `IConvertible.ToDateTime` method of the underlying type of `value`.

#### Examples
The following example calls the `ToDateTime` method with a variety of `Object` variables.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDateTime/ToDateTime1.cs._

## Convert.ToDateTime(SByte) method

```csharp
public static DateTime ToDateTime (sbyte value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToDateTime(Single) method

```csharp
public static DateTime ToDateTime (float value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The single-precision floating-point value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

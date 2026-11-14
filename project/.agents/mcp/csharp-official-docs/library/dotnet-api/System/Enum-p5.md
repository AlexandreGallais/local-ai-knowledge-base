---
title: "Enum class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Enum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enum class (part 5 of 6)

## Enum.ToObject(Type, UInt32) method

```csharp
public static object ToObject (Type enumType, uint value);
```

Converts the specified 32-bit unsigned integer value to an enumeration member.

Parameters:

- `enumType`: The enumeration type to return.
- `value`: The value to convert to an enumeration member.

Returns: An instance of the enumeration set to `value`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The `ToObject` method converts `value` to an enumeration member whose underlying value is `value`. Note that the conversion succeeds even if value is outside the bounds of `enumType` members. To ensure that `value` is a valid underlying value of the `enumType` enumeration, pass it to the `Enum.IsDefined` method.

This conversion method returns a value of type `Object`. You can then cast it or convert it to an object of type `enumType`.

## Enum.ToObject(Type, UInt64) method

```csharp
public static object ToObject (Type enumType, ulong value);
```

Converts the specified 64-bit unsigned integer value to an enumeration member.

Parameters:

- `enumType`: The enumeration type to return.
- `value`: The value to convert to an enumeration member.

Returns: An instance of the enumeration set to `value`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The `ToObject` method converts `value` to an enumeration member whose underlying value is `value`. Note that the conversion succeeds even if value is outside the bounds of `enumType` members. To ensure that `value` is a valid underlying value of the `enumType` enumeration, pass it to the `Enum.IsDefined` method.

This conversion method returns a value of type `Object`. You can then cast it or convert it to an object of type `enumType`.

## Enum.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

#### Remarks
The return value is formatted with the general format specifier ("G"). That is, if the `FlagsAttribute` is not applied to this enumerated type and there is a named constant equal to the value of this instance, then the return value is a string containing the name of the constant. If the `FlagsAttribute` is applied and there is a combination of one or more named constants equal to the value of this instance, then the return value is a string containing a delimiter-separated list of the names of the constants. Otherwise, the return value is the string representation of the numeric value of this instance. For more information about formatting enumeration values, see Enumeration Format Strings. For more information about formatting in general, see Formatting Types.

#### Examples
The following example demonstrates converting an enumerated value to a string.

_Code sample not included: ~/snippets/csharp/System/Enum/ToString/source.cs._

## Enum.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

This method overload is obsolete; use `Enum.ToString`.

Parameters:

- `provider`: (obsolete)

Returns: The string representation of the value of this instance.

To be added.

## Enum.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of this instance to its equivalent string representation using the specified format.

Parameters:

- `format`: A format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` contains an invalid specification.
- `InvalidOperationException`: `format` equals "X", but the enumeration type is unknown.

#### Remarks
The `format` parameter can be one of the following format strings: "G" or "g", "D" or "d", "X" or "x", and "F" or "f" (the format string is not case-sensitive). If `format` is `null` or an empty string (""), the general format specifier ("G") is used. For more information about the enumeration format strings and formatting enumeration values, see Enumeration Format Strings. For more information about formatting in general, see Formatting Types.

#### Examples
The following example demonstrates how to convert an enumerated value to a string.

_Code sample not included: ~/snippets/csharp/System/Enum/ToString/tostr.cs._

## Enum.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

This method overload is obsolete; use `Enum.ToString`.

Parameters:

- `format`: A format specification.
- `provider`: (Obsolete.)

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` does not contain a valid format specification.
- `InvalidOperationException`: `format` equals "X", but the enumeration type is unknown.

To be added.

## Enum.TryFormat<TEnum>(TEnum, Char>, Int32, Char>) method

```csharp
public static bool TryFormat<TEnum> (TEnum value, Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default) where TEnum : struct;
```

Tries to format the value of the enumerated type instance into the provided span of characters.

Parameters:

- `TEnum`: The type of the enumeration.
- `value`: The enumeration value to format.
- `destination`: The span into which to write the instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the character that represents the standard format string that defines the acceptable format of destination. This value can be empty, or "g", "d", "f", or "x".

Returns: `true` if the formatting was successful; otherwise, `false` if the destination span wasn't large enough to contain the formatted value.

Exceptions:

- `FormatException`: The format parameter contains an invalid value.

To be added.

## Enum.TryParse(Type, Char>, Object) method

```csharp
public static bool TryParse (Type enumType, ReadOnlySpan<char> value, out object? result);
```

Converts the span of characters representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.

Parameters:

- `enumType`: The enum type to use for parsing.
- `value`: The span representation of the name or numeric value of one or more enumerated constants.
- `result`: When this method returns `true`, contains an enumeration constant that represents the parsed value.

Returns: `true` if the conversion succeeded; `false` otherwise.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

To be added.

## Enum.TryParse(Type, String, Object) method

```csharp
public static bool TryParse (Type enumType, string? value, out object? result);
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.

Parameters:

- `enumType`: The enum type to use for parsing.
- `value`: The string representation of the name or numeric value of one or more enumerated constants.
- `result`: When this method returns `true`, contains an enumeration constant that represents the parsed value.

Returns: `true` if the conversion succeeded; `false` otherwise.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

To be added.

## Enum.TryParse(Type, Char>, Boolean, Object) method

```csharp
public static bool TryParse (Type enumType, ReadOnlySpan<char> value, bool ignoreCase, out object? result);
```

Converts the span of characters representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object. A parameter specifies whether the operation is case-insensitive.

Parameters:

- `enumType`: The enum type to use for parsing.
- `value`: The span representation of the name or numeric value of one or more enumerated constants.
- `ignoreCase`: `true` to read `enumType` in case insensitive mode; `false` to read `enumType` in case sensitive mode.
- `result`: When this method returns `true`, contains an enumeration constant that represents the parsed value.

Returns: `true` if the conversion succeeded; `false` otherwise.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

To be added.

## Enum.TryParse(Type, String, Boolean, Object) method

```csharp
public static bool TryParse (Type enumType, string? value, bool ignoreCase, out object? result);
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.

Parameters:

- `enumType`: The enum type to use for parsing.
- `value`: The string representation of the name or numeric value of one or more enumerated constants.
- `ignoreCase`: `true` to read `value` in case insensitive mode; `false` to read `value` in case sensitive mode.
- `result`: When this method returns `true`, contains an enumeration constant that represents the parsed value.

Returns: `true` if the conversion succeeded; `false` otherwise.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

To be added.

## Enum.TryParse<TEnum>(Char>, TEnum) method

```csharp
public static bool TryParse<TEnum> (ReadOnlySpan<char> value, out TEnum result) where TEnum : struct;
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.

Parameters:

- `TEnum`: The type of the `result` object.
- `value`: The span representation of the name or numeric value of one or more enumerated constants.
- `result`: When this method returns `true`, contains an enumeration constant that represents the parsed value.

Returns: `true` if the conversion succeeded; `false` otherwise.

Exceptions:

- `ArgumentException`: `TEnum` is not an enumeration type.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.TryParse<TEnum>(String, TEnum) method

```csharp
public static bool TryParse<TEnum> (string? value, out TEnum result) where TEnum : struct;
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object. The return value indicates whether the conversion succeeded.

Parameters:

- `TEnum`: The enumeration type to which to convert `value`.
- `value`: The case-sensitive string representation of the enumeration name or underlying value to convert.
- `result`: When this method returns, contains an object of type `TEnum` whose value is represented by `value` if the parse operation succeeds. If the parse operation fails, contains the default value of the underlying type of `TEnum`. This parameter is passed uninitialized.

Returns: `true` if the `value` parameter was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `TEnum` is not an enumeration type.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

#### Remarks

`TryParse<T>` is identical to the `Parse` method, except that instead of throwing an exception, it returns `false` if the conversion fails. It eliminates the need for exception handling when parsing the string representation of an enumeration value.

The `value` parameter contains the string representation of an enumeration member's underlying value or named constant, or a list of named constants or underlying values delimited by commas (,). If `value` includes multiple named constants or values, one or more blank spaces can precede or follow each value, name, or comma in `value`. If `value` is a list, `result` reflects the value of the specified names or underlying values combined with a bitwise `OR` operation. If `value` is the string representation of the name of an enumeration value, the comparison of `value` with enumeration names is case-sensitive.

If `value` is a name that does not correspond to a named constant of `TEnum`, the method returns `false`. If `value` is the string representation of an integer that does not represent an underlying value of the `TEnum` enumeration, the method returns an enumeration member whose underlying value is `value` converted to an integral type. If this behavior is undesirable, call the `Enum.IsDefined` method to ensure that a particular string representation of an integer is actually a member of `TEnum`.

If the parse operation fails, the `result` parameter contains the default value of 0, which may not be a member of the underlying `TEnum` enumeration. If no values are assigned to the named constants in `TEnum`, the default is equal to the first member of the `TEnum`. Otherwise, the default is equal to the member in the enumeration with an assigned value of 0.

#### Examples
The following example defines a `Colors` enumeration, calls the `TryParse<T>` method to convert strings to their corresponding enumeration values, and calls the `Enum.IsDefined` method to ensure that particular integral values are underlying values in the `Colors` enumeration.

_Code sample not included: ~/snippets/csharp/System/Enum/TryParseTEnum/tryparse1.cs._

## Enum.TryParse<TEnum>(Char>, Boolean, TEnum) method

```csharp
public static bool TryParse<TEnum> (ReadOnlySpan<char> value, bool ignoreCase, out TEnum result) where TEnum : struct;
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object. A parameter specifies whether the operation is case-sensitive. The return value indicates whether the conversion succeeded.

Parameters:

- `TEnum`: The type of the `result` object.
- `value`: The span representation of the name or numeric value of one or more enumerated constants.
- `ignoreCase`: `true` to ignore case; `false` to consider case.
- `result`: When this method returns `true`, contains an enumeration constant that represents the parsed value.

Returns: `true` if the conversion succeeded; `false` otherwise.

Exceptions:

- `ArgumentException`: `TEnum` is not an enumeration type.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

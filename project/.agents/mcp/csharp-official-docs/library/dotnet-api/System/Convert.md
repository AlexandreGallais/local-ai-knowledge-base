---
title: "Convert class (part 1 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class

Namespace: `System`

```csharp
public static class Convert
```

Converts a base data type to another base data type.

The static `Convert` class contains methods that are primarily used to support conversion to and from the base data types in .NET. The supported base types are `Boolean`, `Char`, `SByte`, `Byte`, `Int16`, `Int32`, `Int64`, `UInt16`, `UInt32`, `UInt64`, `Single`, `Double`, `Decimal`, `DateTime` and `String`. In addition, the `Convert` class includes methods to support other kinds of conversions.

#### Conversions to and from base types

A conversion method exists to convert every base type to every other base type. However, the actual call to a particular conversion method can produce one of five outcomes, depending on the value of the base type at runtime and the target base type. These five outcomes are:

- No conversion. This occurs when an attempt is made to convert from a type to itself (for example, by calling `ToInt32` with an argument of type `Int32`). In this case, the method simply returns an instance of the original type.

- An `InvalidCastException`. This occurs when a particular conversion is not supported. An `InvalidCastException` is thrown for the following conversions:

- Conversions from `Char` to `Boolean`, `Single`, `Double`, `Decimal`, or `DateTime`.
- Conversions from `Boolean`, `Single`, `Double`, `Decimal`, or `DateTime` to `Char`.
- Conversions from `DateTime` to any other type except `String`.
- Conversions from any other type, except `String`, to `DateTime`.

- A `FormatException`. This occurs when the attempt to convert a string value to any other base type fails because the string is not in the proper format. The exception is thrown for the following conversions:

- A string to be converted to a `Boolean` value does not equal `TrueString` or `FalseString`.
- A string to be converted to a `Char` value consists of multiple characters.
- A string to be converted to any numeric type is not recognized as a valid number.
- A string to be converted to a `DateTime` is not recognized as a valid date and time value.

- A successful conversion. For conversions between two different base types not listed in the previous outcomes, all widening conversions as well as all narrowing conversions that do not result in a loss of data will succeed and the method will return a value of the targeted base type.

- An `OverflowException`. This occurs when a narrowing conversion results in a loss of data. For example, trying to convert a `Int32` instance whose value is 10000 to a `Byte` type throws an `OverflowException` because 10000 is outside the range of the `Byte` data type.

An exception will not be thrown if the conversion of a numeric type results in a loss of precision (that is, the loss of some least significant digits). However, an exception will be thrown if the result is larger than can be represented by the particular conversion method's return value type.

For example, when a `Double` is converted to a `Single`, a loss of precision might occur but no exception is thrown. However, if the magnitude of the `Double` is too large to be represented by a `Single`, an overflow exception is thrown.

#### Non-decimal numbers

The `Convert` class includes static methods that you can call to convert integral values to non-decimal string representations, and to convert strings that represent non-decimal numbers to integral values. Each of these conversion methods includes a `base` argument  that lets you specify  the number system; binary (base 2), octal (base 8), and hexadecimal (base 16), as well as decimal (base 10). There is a set of methods to convert each of the CLS-compliant primitive integral types to a string, and one to convert a string to each of the primitive integral types:

- `ToString` and `ToByte`, to convert a byte value to and from a string in a specified base.

- `ToString` and `ToInt16`, to convert a 16-bit signed integer to and from a string in a specified base.

- `ToString` and `ToInt32`, to convert a 32-bit signed integer to and from a string in a specified base.

- `ToString` and `ToInt64`, to convert a 64-bit signed integer to and from a string in a specified base.

- `ToSByte`, to convert the string representation of a byte value in a specified format to a signed byte.

- `ToUInt16`, to convert the string representation of an integer in a specified format to an unsigned 16-bit integer.

- `ToUInt32`, to convert the string representation of an integer in a specified format to an unsigned 32-bit integer.

- `ToUInt64`, to convert the string representation of an integer in a specified format to an unsigned 64-bit integer.

The following example converts the value of `MaxValue` to a string in all supported numeric formats. It then converts the string value back to a `Int16` value.

_Code sample not included: ~/snippets/csharp/System/Convert/Overview/NonDecimal1.cs._

#### Conversions from custom objects to base types

In addition to supporting conversions between the base types, the `Convert` method supports conversion of any custom type to any base type. To do this, the custom type must implement the `IConvertible` interface, which defines methods for converting the implementing type to each of the base types. Conversions that are not supported by a particular type should throw an `InvalidCastException`.

When the `Convert.ChangeType` method is passed a custom type as its first parameter, or when the `Convert.To`*Type* method (such as `ToInt32` or `ToDouble` is called and passed an instance of a custom type as its first parameter, the `Convert` method, in turn, calls the custom type's `IConvertible` implementation to perform the conversion. For more information, see Type Conversion in .NET.

#### Culture-specific formatting information

All the base type conversion methods and the `Convert.ChangeType` method include overloads that have a parameter of type `IFormatProvider`. For example, the `Convert.ToBoolean` method has the following two overloads:

- `ToBoolean`
- `ToBoolean`

The `IFormatProvider` parameter can supply culture-specific formatting information to assist the conversion process. However, it is ignored by most of the base type conversion methods. It is used only by the following base type conversion methods. If a `null` `IFormatProvider` argument is passed to these methods, the `CultureInfo` object that represents the current culture is used.

- By methods that convert a value to a numeric type. The `IFormatProvider` parameter is used by the overload that has parameters of type `String` and `IFormatProvider`. It is also used by the overload that has parameters of type `Object` and `IFormatProvider` if the object's runtime type is a `String`.

- By methods that convert a value to a date and time. The `IFormatProvider` parameter is used by the overload that has parameters of type `String` and `IFormatProvider`. It is also used by the overload that has parameters of type `Object` and `IFormatProvider` if the object's runtime type is a `String`.

- By the `Convert.ToString` overloads that include an `IFormatProvider` parameter and that convert either a numeric value to a string or a `DateTime` value to a string.

However, any user-defined type that implements `IConvertible` can make use of the `IFormatProvider` parameter.

#### Base64 encoding

Base64 encoding converts binary data to a string. Data expressed as base-64 digits can be easily conveyed over data channels that can only transmit 7-bit characters. The `Convert` class includes the following methods to support base64 encoding: A set of methods support converting an array of bytes to and from a `String` or to and from an array of Unicode characters consisting of base-64 digit characters.

- `Convert.ToBase64String`, which converts a byte array to a base64-encoded string.
- `Convert.ToBase64CharArray`, which converts a byte array to a base64-encoded character array.
- `Convert.FromBase64String`, which converts a base64-encoded string to a byte array.
- `Convert.FromBase64CharArray`, which converts a base64-encoded character array to a byte array.

#### Other common conversions

You can use other .NET classes to perform some conversions that aren't supported by the static methods of the `Convert` class. These include:

- Conversion to byte arrays

The `BitConverter` class provides methods that convert the primitive numeric types (including `Boolean`) to byte arrays and from byte arrays back to primitive data types.

- Character encoding and decoding

The `Encoding` class and its derived classes (such as `UnicodeEncoding` and `UTF8Encoding`) provide methods to encode a character array or a string (that is, to convert them to a byte array in a particular encoding) and to decode an encoded byte array (that is, convert a byte array back to UTF16-encoded Unicode characters). For more information, see Character Encoding in .NET.

#### Examples

The following example demonstrates some of the conversion methods in the `Convert` class, including `Convert.ToInt32`, `Convert.ToBoolean`, and `Convert.ToString`.

_Code sample not included: ~/snippets/csharp/System/Convert/Overview/converter.cs._

## Convert.ChangeType(Object, Type) method

```csharp
public static object? ChangeType (object? value, Type conversionType);
```

Returns an object of the specified type and whose value is equivalent to the specified object.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `conversionType`: The type of object to return.

Returns: An object whose type is `conversionType` and whose value is equivalent to `value`.

-or-

A null reference (`Nothing` in Visual Basic), if `value` is `null` and `conversionType` is not a value type.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

-or-

`value` is `null` and `conversionType` is a value type.

-or-

`value` does not implement the `IConvertible` interface.
- `FormatException`: `value` is not in a format recognized by `conversionType`.
- `OverflowException`: `value` represents a number that is out of the range of `conversionType`.
- `ArgumentNullException`: `conversionType` is `null`.

#### Remarks
`Convert.ChangeType` is a general-purpose conversion method that converts the object specified by `value` to `conversionType`. The `value` parameter can be an object of any type, and `conversionType` can also be a `Type` object that represents any base or custom type. For the conversion to succeed, `value` must implement the `IConvertible` interface, because the method simply wraps a call to an appropriate `IConvertible` method. The method requires that conversion of `value` to `conversionType` be supported.

This method uses the current thread's culture for the conversion.

#### Examples
The following example illustrates the use of the `Convert.ChangeType` method.

_Code sample not included: ~/snippets/csharp/System/Convert/ChangeType/convertchangetype.cs._

## Convert.ChangeType(Object, TypeCode) method

```csharp
public static object? ChangeType (object? value, TypeCode typeCode);
```

Returns an object of the specified type whose value is equivalent to the specified object.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `typeCode`: The type of object to return.

Returns: An object whose underlying type is `typeCode` and whose value is equivalent to `value`.

-or-

A null reference (`Nothing` in Visual Basic), if `value` is `null` and `typeCode` is `TypeCode.Empty`, `TypeCode.String`, or `TypeCode.Object`.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

-or-

`value` is `null` and `typeCode` specifies a value type.

-or-

`value` does not implement the `IConvertible` interface.
- `FormatException`: `value` is not in a format recognized by the `typeCode` type.
- `OverflowException`: `value` represents a number that is out of the range of the `typeCode` type.
- `ArgumentException`: `typeCode` is invalid.

#### Remarks
`ChangeType` is a general-purpose conversion method that converts the object specified by `value` to a predefined type specified by `typeCode`. The `value` parameter can be an object of any type. For the conversion to succeed, `value` must implement the `IConvertible` interface, because the method simply wraps a call to an appropriate `IConvertible` method. The method also requires that conversion of `value` to `typeCode` be supported.

The `ChangeType` method does not support the conversion of `value` to a custom type. To perform such a conversion, call the `ChangeType` method.

#### Examples
The following example illustrates how to use the `ChangeType` method to change an `Object` to the type specified by the `TypeCode` parameter, if possible.

_Code sample not included: ~/snippets/csharp/System/Convert/ChangeType/changetype01.cs._

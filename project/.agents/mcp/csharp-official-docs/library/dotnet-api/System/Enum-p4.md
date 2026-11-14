---
title: "Enum class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Enum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enum class (part 4 of 6)

## Enum.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

Converts the current value to a Boolean value based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: This member always throws an exception.

Exceptions:

- `InvalidCastException`: In all cases.

#### Remarks
Currently not implemented. Always throws an exception.

## Enum.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

Converts the current value to an 8-bit unsigned integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

Converts the current value to a Unicode character based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: This member always throws an exception.

Exceptions:

- `InvalidCastException`: In all cases.

#### Remarks
Currently not implemented. Always throws an exception.

## Enum.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

Converts the current value to a `DateTime` based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: This member always throws an exception.

Exceptions:

- `InvalidCastException`: In all cases.

#### Remarks
Currently not implemented. Always throws an exception.

## Enum.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

Converts the current value to a `Decimal` based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: This member always throws an exception.

Exceptions:

- `InvalidCastException`: In all cases.

#### Remarks
Currently not implemented. Always throws an exception.

## Enum.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

Converts the current value to a double-precision floating point number based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: This member always throws an exception.

Exceptions:

- `InvalidCastException`: In all cases.

#### Remarks
Currently not implemented. Always throws an exception.

## Enum.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

Converts the current value to a 16-bit signed integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

Converts the current value to a 32-bit signed integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

Converts the current value to a 64-bit signed integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

Converts the current value to an 8-bit signed integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

Converts the current value to a single-precision floating-point number based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: This member always throws an exception.

Exceptions:

- `InvalidCastException`: In all cases.

#### Remarks
Currently not implemented. Always throws an exception.

## Enum.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

Converts the current value to a specified type based on the underlying type.

Parameters:

- `type`: The type to convert to.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

Converts the current value to a 16-bit unsigned integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

Converts the current value to a 32-bit unsigned integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

Converts the current value to a 64-bit unsigned integer based on the underlying type.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The converted value.

#### Remarks
Uses `Convert` to perform the conversion.

## Enum.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the enum into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in destination.
- `format`: The format specifier.
- `provider`: An optional object that supplies culture-specific formatting information for destination. This parameter is ignored.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Enum.ToObject(Type, Byte) method

```csharp
public static object ToObject (Type enumType, byte value);
```

Converts the specified 8-bit unsigned integer to an enumeration member.

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

## Enum.ToObject(Type, Int16) method

```csharp
public static object ToObject (Type enumType, short value);
```

Converts the specified 16-bit signed integer to an enumeration member.

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

## Enum.ToObject(Type, Int32) method

```csharp
public static object ToObject (Type enumType, int value);
```

Converts the specified 32-bit signed integer to an enumeration member.

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

## Enum.ToObject(Type, Int64) method

```csharp
public static object ToObject (Type enumType, long value);
```

Converts the specified 64-bit signed integer to an enumeration member.

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

## Enum.ToObject(Type, Object) method

```csharp
public static object ToObject (Type enumType, object value);
```

Converts the specified object with an integer value to an enumeration member.

Parameters:

- `enumType`: The enumeration type to return.
- `value`: The value convert to an enumeration member.

Returns: An enumeration object whose value is `value`.

Exceptions:

- `ArgumentNullException`: `enumType` or `value` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.

-or-

`value` is not type `SByte`, `Int16`, `Int32`, `Int64`, `Byte`, `UInt16`, `UInt32`, or `UInt64`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The `ToObject` method converts the integral value `value` to an enumeration member whose underlying value is `value`. Note that the conversion succeeds even if value is outside the bounds of `enumType` members. To ensure that `value` is a valid underlying value of the `enumType` enumeration, pass it to the `Enum.IsDefined` method.

This conversion method returns a value of type `Object`. You can then cast it or convert it to an object of type `enumType`.

## Enum.ToObject(Type, SByte) method

```csharp
public static object ToObject (Type enumType, sbyte value);
```

Converts the specified 8-bit signed integer value to an enumeration member.

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

## Enum.ToObject(Type, UInt16) method

```csharp
public static object ToObject (Type enumType, ushort value);
```

Converts the specified 16-bit unsigned integer value to an enumeration member.

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

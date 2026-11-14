---
title: "IConvertible interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IConvertible.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConvertible interface

Namespace: `System`

```csharp
public interface IConvertible
```

Defines methods that convert the value of the implementing reference or value type to a common language runtime type that has an equivalent value.

#### Remarks
This interface provides methods to convert the value of an instance of an implementing type to a common language runtime type that has an equivalent value. The common language runtime types are `Boolean`, `SByte`, `Byte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, `Single`, `Double`, `Decimal`, `DateTime`, `Char`, and `String`.

If there is no meaningful conversion to a common language runtime type, then a particular interface method implementation throws `InvalidCastException`. For example, if this interface is implemented on a Boolean type, the implementation of the `IConvertible.ToDateTime` method throws an exception because there is no meaningful `DateTime` equivalent to a Boolean type.

The common language runtime typically exposes the `IConvertible` interface through the `Convert` class. The common language runtime also uses the `IConvertible` interface internally, in explicit interface implementations, to simplify the code used to support conversions in the `Convert` class and basic <example-value> language runtime types.

In addition to the `IConvertible` interface, .NET provides classes called *type converters* for converting user-defined data types to other data types.

#### Examples
The following code sample demonstrates an implementation of `IConvertible` for a Complex number class, allowing it to be cast first as a `Double` and then calling the static `Convert` members on that `Double`.

_Code sample not included: ~/snippets/csharp/System/IConvertible/Overview/iconvertible.cs._

## IConvertible.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for this instance.

Returns: The enumerated constant that is the `TypeCode` of the class or value type that implements this interface.

To be added.

## IConvertible.ToBoolean(IFormatProvider) method

```csharp
public bool ToBoolean (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent Boolean value using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A Boolean value equivalent to the value of this instance.

To be added.

## IConvertible.ToByte(IFormatProvider) method

```csharp
public byte ToByte (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 8-bit unsigned integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 8-bit unsigned integer equivalent to the value of this instance.

To be added.

## IConvertible.ToChar(IFormatProvider) method

```csharp
public char ToChar (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent Unicode character using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A Unicode character equivalent to the value of this instance.

To be added.

## IConvertible.ToDateTime(IFormatProvider) method

```csharp
public DateTime ToDateTime (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent `DateTime` using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A `DateTime` instance equivalent to the value of this instance.

To be added.

## IConvertible.ToDecimal(IFormatProvider) method

```csharp
public decimal ToDecimal (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent `Decimal` number using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A `Decimal` number equivalent to the value of this instance.

To be added.

## IConvertible.ToDouble(IFormatProvider) method

```csharp
public double ToDouble (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent double-precision floating-point number using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A double-precision floating-point number equivalent to the value of this instance.

To be added.

## IConvertible.ToInt16(IFormatProvider) method

```csharp
public short ToInt16 (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 16-bit signed integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 16-bit signed integer equivalent to the value of this instance.

To be added.

## IConvertible.ToInt32(IFormatProvider) method

```csharp
public int ToInt32 (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 32-bit signed integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 32-bit signed integer equivalent to the value of this instance.

To be added.

## IConvertible.ToInt64(IFormatProvider) method

```csharp
public long ToInt64 (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 64-bit signed integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 64-bit signed integer equivalent to the value of this instance.

To be added.

## IConvertible.ToSByte(IFormatProvider) method

```csharp
public sbyte ToSByte (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 8-bit signed integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 8-bit signed integer equivalent to the value of this instance.

To be added.

## IConvertible.ToSingle(IFormatProvider) method

```csharp
public float ToSingle (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent single-precision floating-point number using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A single-precision floating-point number equivalent to the value of this instance.

To be added.

## IConvertible.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent `String` using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: A `String` instance equivalent to the value of this instance.

To be added.

## IConvertible.ToType(Type, IFormatProvider) method

```csharp
public object ToType (Type conversionType, IFormatProvider? provider);
```

Converts the value of this instance to an `Object` of the specified `Type` that has an equivalent value, using the specified culture-specific formatting information.

Parameters:

- `conversionType`: The `Type` to which the value of this instance is converted.
- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An `Object` instance of type `conversionType` whose value is equivalent to the value of this instance.

To be added.

## IConvertible.ToUInt16(IFormatProvider) method

```csharp
public ushort ToUInt16 (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 16-bit unsigned integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 16-bit unsigned integer equivalent to the value of this instance.

To be added.

## IConvertible.ToUInt32(IFormatProvider) method

```csharp
public uint ToUInt32 (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 32-bit unsigned integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 32-bit unsigned integer equivalent to the value of this instance.

To be added.

## IConvertible.ToUInt64(IFormatProvider) method

```csharp
public ulong ToUInt64 (IFormatProvider? provider);
```

Converts the value of this instance to an equivalent 64-bit unsigned integer using the specified culture-specific formatting information.

Parameters:

- `provider`: An `IFormatProvider` interface implementation that supplies culture-specific formatting information.

Returns: An 64-bit unsigned integer equivalent to the value of this instance.

To be added.

---
title: "TypeCode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TypeCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeCode enum

Namespace: `System`

```csharp
public enum TypeCode
```

Specifies the type of an object.

#### Remarks
Call the `IConvertible.GetTypeCode` method on classes that implement the `IConvertible` interface to obtain the type code for an instance of that class.

Otherwise, call an object's `Object.GetType` method to obtain its `Type` object, then call the `Type` object's `Type.GetTypeCode` method to obtain the object's type code.

#### Examples
The following code example demonstrates how the `TypeCode` enumeration can be used. In a decision block inside the WriteObjectInfo method, the `TypeCode` of an `Object` parameter is examined, and an appropriate message is written to the console.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeCode/iconvertible.cs._

## TypeCode.Boolean field

```csharp
Boolean
```

A simple type representing Boolean values of `true` or `false`.

## TypeCode.Byte field

```csharp
Byte
```

An integral type representing unsigned 8-bit integers with values between 0 and 255.

## TypeCode.Char field

```csharp
Char
```

An integral type representing unsigned 16-bit integers with values between 0 and 65535. The set of possible values for the `TypeCode.Char` type corresponds to the Unicode character set.

## TypeCode.DateTime field

```csharp
DateTime
```

A type representing a date and time value.

## TypeCode.DBNull field

```csharp
DBNull
```

A database null (column) value.

## TypeCode.Decimal field

```csharp
Decimal
```

A simple type representing values ranging from 1.0 x 10 -28 to approximately 7.9 x 10 28 with 28-29 significant digits.

## TypeCode.Double field

```csharp
Double
```

A floating point type representing values ranging from approximately 5.0 x 10 -324 to 1.7 x 10 308 with a precision of 15-16 digits.

## TypeCode.Empty field

```csharp
Empty
```

A null reference.

## TypeCode.Int16 field

```csharp
Int16
```

An integral type representing signed 16-bit integers with values between -32768 and 32767.

## TypeCode.Int32 field

```csharp
Int32
```

An integral type representing signed 32-bit integers with values between -2147483648 and 2147483647.

## TypeCode.Int64 field

```csharp
Int64
```

An integral type representing signed 64-bit integers with values between -9223372036854775808 and 9223372036854775807.

## TypeCode.Object field

```csharp
Object
```

A general type representing any reference or value type not explicitly represented by another `TypeCode`.

## TypeCode.SByte field

```csharp
SByte
```

An integral type representing signed 8-bit integers with values between -128 and 127.

## TypeCode.Single field

```csharp
Single
```

A floating point type representing values ranging from approximately 1.5 x 10 -45 to 3.4 x 10 38 with a precision of 7 digits.

## TypeCode.String field

```csharp
String
```

A sealed class type representing Unicode character strings.

## TypeCode.UInt16 field

```csharp
UInt16
```

An integral type representing unsigned 16-bit integers with values between 0 and 65535.

## TypeCode.UInt32 field

```csharp
UInt32
```

An integral type representing unsigned 32-bit integers with values between 0 and 4294967295.

## TypeCode.UInt64 field

```csharp
UInt64
```

An integral type representing unsigned 64-bit integers with values between 0 and 18446744073709551615.

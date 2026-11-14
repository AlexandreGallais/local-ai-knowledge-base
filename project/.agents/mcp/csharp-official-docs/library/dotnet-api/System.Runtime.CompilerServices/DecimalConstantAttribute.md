---
title: "DecimalConstantAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DecimalConstantAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecimalConstantAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class DecimalConstantAttribute : Attribute
```

Stores the value of a `Decimal` constant in metadata. This class cannot be inherited.

#### Remarks
Use this attribute to specify at compile time that a decimal value is a constant value.

You can apply this attribute to fields or parameters.

For more information about constant attributes, see the `CustomConstantAttribute` class.

The classes in `CompilerServices` are for compiler writers use only.

## DecimalConstantAttribute.DecimalConstantAttribute(Byte, Byte, Int32, Int32, Int32) constructor

```csharp
public DecimalConstantAttribute (byte scale, byte sign, int hi, int mid, int low);
```

Initializes a new instance of the `DecimalConstantAttribute` class with the specified signed integer values.

Parameters:

- `scale`: The power of 10 scaling factor that indicates the number of digits to the right of the decimal point. Valid values are 0 through 28 inclusive.
- `sign`: A value of 0 indicates a positive value, and a value of 1 indicates a negative value.
- `hi`: The high 32 bits of the 96-bit `DecimalConstantAttribute.Value`.
- `mid`: The middle 32 bits of the 96-bit `DecimalConstantAttribute.Value`.
- `low`: The low 32 bits of the 96-bit `DecimalConstantAttribute.Value`.

To be added.

## DecimalConstantAttribute.DecimalConstantAttribute(Byte, Byte, UInt32, UInt32, UInt32) constructor

```csharp
public DecimalConstantAttribute (byte scale, byte sign, uint hi, uint mid, uint low);
```

Initializes a new instance of the `DecimalConstantAttribute` class with the specified unsigned integer values.

Parameters:

- `scale`: The power of 10 scaling factor that indicates the number of digits to the right of the decimal point. Valid values are 0 through 28 inclusive.
- `sign`: A value of 0 indicates a positive value, and a value of 1 indicates a negative value.
- `hi`: The high 32 bits of the 96-bit `DecimalConstantAttribute.Value`.
- `mid`: The middle 32 bits of the 96-bit `DecimalConstantAttribute.Value`.
- `low`: The low 32 bits of the 96-bit `DecimalConstantAttribute.Value`.

Exceptions:

- `ArgumentOutOfRangeException`: `scale` > 28.

To be added.

## DecimalConstantAttribute.Value property

```csharp
public decimal Value { get; }
```

Gets the decimal constant stored in this attribute.

Returns: The decimal constant stored in this attribute.

To be added.

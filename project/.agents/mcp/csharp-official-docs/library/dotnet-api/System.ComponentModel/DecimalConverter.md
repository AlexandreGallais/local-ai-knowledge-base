---
title: "DecimalConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DecimalConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecimalConverter class

Namespace: `System.ComponentModel`

```csharp
public class DecimalConverter : System.ComponentModel.BaseNumberConverter
```

Provides a type converter to convert `Decimal` objects to and from various other representations.

#### Remarks
This converter can only convert a decimal object to and from a string.

> **Note:**
>  You should never create an instance of the `DecimalConverter` class. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

For more information about type converters, see the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Decimal` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## DecimalConverter.DecimalConverter() constructor

```csharp
public DecimalConverter ();
```

Initializes a new instance of the `DecimalConverter` class.

To be added.

## DecimalConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Gets a value indicating whether this converter can convert an object to the given destination type using the context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type you wish to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## DecimalConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to a `Decimal` using the arguments.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: The `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

To be added.

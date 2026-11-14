---
title: "CharConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CharConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CharConverter class

Namespace: `System.ComponentModel`

```csharp
public class CharConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert Unicode character objects to and from various other representations.

#### Remarks
This converter can only convert a string, with a length of 1, to and from a character.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of a `CharConverter`. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Char` to a string variable, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## CharConverter.CharConverter() constructor

```csharp
public CharConverter ();
```

Initializes a new instance of the `CharConverter` class.

To be added.

## CharConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a Unicode character object using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you want to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert a string, with a length of 1, to and from a character.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CharConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to a Unicode character object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The culture into which `value` will be converted.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `FormatException`: `value` is not a valid value for the target type.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a string, with a length of 1, to and from a character.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CharConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to a Unicode character object using the arguments.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The culture into which `value` will be converted.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

To be added.

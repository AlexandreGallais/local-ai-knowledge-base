---
title: "StringConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/StringConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringConverter class

Namespace: `System.ComponentModel`

```csharp
public class StringConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert string objects to and from other representations.

#### Remarks
This converter can only convert to a string. It works as a pass <example-value> for other converters that want to convert an object to a string.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of `StringConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

## StringConverter.StringConverter() constructor

```csharp
public StringConverter ();
```

Initializes a new instance of the `StringConverter` class.

To be added.

## StringConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a string using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## StringConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the specified value object to a `String` object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The `CultureInfo` to use.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion could not be performed.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so you always need to check its value. In addition, properties on the context object can return `null`.

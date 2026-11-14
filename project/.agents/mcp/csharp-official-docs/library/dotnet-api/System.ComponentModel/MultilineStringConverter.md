---
title: "MultilineStringConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MultilineStringConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MultilineStringConverter class

Namespace: `System.ComponentModel`

```csharp
public class MultilineStringConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert multiline strings to a simple string.

To be added.

## MultilineStringConverter.MultilineStringConverter() constructor

```csharp
public MultilineStringConverter ();
```

Initializes a new instance of the `MultilineStringConverter` class.

To be added.

## MultilineStringConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the specified type, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo`. If `null` is passed, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value parameter to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

To be added.

## MultilineStringConverter.GetProperties(ITypeDescriptorContext, Object, Attribute[]) method

```csharp
public override System.ComponentModel.PropertyDescriptorCollection? GetProperties (System.ComponentModel.ITypeDescriptorContext? context, object value, Attribute[]? attributes);
```

Returns a collection of properties for the type of array specified by the `value` parameter, using the specified context and attributes.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: An `Object` that specifies the type of array for which to get properties.
- `attributes`: An array of type `Attribute` that is used as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for this data type, or `null` if there are no properties.

To be added.

## MultilineStringConverter.GetPropertiesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetPropertiesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether this object supports properties, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if `GetProperties` should be called to find the properties of this object; otherwise, `false`.

#### Remarks
As implemented in this class, this method always returns `false`.

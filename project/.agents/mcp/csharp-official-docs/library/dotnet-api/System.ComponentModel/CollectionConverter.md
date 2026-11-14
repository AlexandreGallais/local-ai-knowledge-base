---
title: "CollectionConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CollectionConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionConverter class

Namespace: `System.ComponentModel`

```csharp
public class CollectionConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert collection objects to and from various other representations.

#### Remarks
The `CollectionConverter.GetProperties` method for this type converter always returns `null`, and the `TypeConverter.GetPropertiesSupported` method always returns `false`.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of the `CollectionConverter` class. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

## CollectionConverter.CollectionConverter() constructor

```csharp
public CollectionConverter ();
```

Initializes a new instance of the `CollectionConverter` class.

To be added.

## CollectionConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the specified destination type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The culture to which `value` will be converted.
- `value`: The `Object` to convert. This parameter must inherit from `ICollection`.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

> **Note:**
>  The converted result will be shown in the property browser. For example, if you are converting a char collection into a string, it will be displayed as `char[] collection`.

## CollectionConverter.GetProperties(ITypeDescriptorContext, Object, Attribute[]) method

```csharp
public override System.ComponentModel.PropertyDescriptorCollection GetProperties (System.ComponentModel.ITypeDescriptorContext? context, object value, Attribute[]? attributes);
```

Gets a collection of properties for the type of array specified by the value parameter using the specified context and attributes.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: An `Object` that specifies the type of array to get the properties for.
- `attributes`: An array of type `Attribute` that will be used as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for this data type, or `null` if there are no properties. This method always returns `null`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

The attributes array that you pass in will be used to filter the array. The attributes can have a mix of `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` object will be treated as a wildcard; it will match any property that has the `Type` in its set of attributes.

- If a property does not have an `Attribute` of the same class, the property will not be included in the returned array.

- If the attribute is an instance of `Attribute`, the property must be an exact match or it will not be included in the returned array.

- If an `Attribute` instance is specified and it is the default property, it will be included in the returned array even if there is no instance of the `Attribute` in the property.

Collections do not support properties; therefore, this method always returns `null`.

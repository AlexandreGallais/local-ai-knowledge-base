---
title: "ReferenceConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ReferenceConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReferenceConverter class

Namespace: `System.ComponentModel`

```csharp
public class ReferenceConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert object references to and from other representations.

#### Remarks
The `ReferenceConverter` is typically used within the context of sited components or a design environment. Without a component site or a usable `ITypeDescriptorContext`, this converter is of little use.

This converter converts a reference of an object that implements the `IComponent` interface and displays its properties in the **Properties** window.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of the `ReferenceConverter` class. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

This class provides the `ReferenceConverter.IsValueAllowed` method to check whether a particular value can be added to the standard values collection. If you do not want to add the value to the collection, override this method.

## ReferenceConverter.ReferenceConverter(Type) constructor

```csharp
public ReferenceConverter (Type type);
```

Initializes a new instance of the `ReferenceConverter` class.

Parameters:

- `type`: A `Type` that represents the type to associate with this reference converter.

To be added.

## ReferenceConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a reference object using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this object can perform the conversion; otherwise, `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## ReferenceConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to the reference type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture used to represent the font.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## ReferenceConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the reference type using the specified context and arguments.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture used to represent the font.
- `value`: The `Object` to convert.
- `destinationType`: The type to convert the object to.

Returns: The converted object.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This method most commonly converts types to and from string objects.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## ReferenceConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public override System.ComponentModel.TypeConverter.StandardValuesCollection GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a collection of standard values for the reference data type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: A `StandardValuesCollection` that holds a standard set of valid values, or `null` if the data type does not support a standard set of values.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## ReferenceConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether the list of standard values returned from `ReferenceConverter.GetStandardValues` is an exclusive list.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because the `StandardValuesCollection` returned from `ReferenceConverter.GetStandardValues` is an exhaustive list of possible values. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## ReferenceConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether this object supports a standard set of values that can be picked from a list.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because `ReferenceConverter.GetStandardValues` can be called to find a common set of values the object supports. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## ReferenceConverter.IsValueAllowed(ITypeDescriptorContext, Object) method

```csharp
protected virtual bool IsValueAllowed (System.ComponentModel.ITypeDescriptorContext context, object value);
```

Returns a value indicating whether a particular value can be added to the standard values collection.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides an additional context.
- `value`: The value to check.

Returns: `true` if the value is allowed and can be added to the standard values collection; `false` if the value cannot be added to the standard values collection.

#### Remarks
This method is called for each value that matches the type associated with this `ReferenceConverter` and for each component found that is of the associated type. By default, this method returns `true`, that is, it allows adding the value into the standard values collection.

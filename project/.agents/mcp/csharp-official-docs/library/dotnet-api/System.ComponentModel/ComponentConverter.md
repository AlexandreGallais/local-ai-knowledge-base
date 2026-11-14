---
title: "ComponentConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ComponentConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComponentConverter class

Namespace: `System.ComponentModel`

```csharp
public class ComponentConverter : System.ComponentModel.ReferenceConverter
```

Provides a type converter to convert components to and from various other representations.

#### Remarks
This class implements `TypeConverter.GetPropertiesSupported` and `ComponentConverter.GetProperties` by returning the properties through the `TypeDescriptor.GetProperties` method of `TypeDescriptor`.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of `ComponentConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

This converter converts an object that implements `IComponent` and displays its properties in the Properties window.

## ComponentConverter.ComponentConverter(Type) constructor

```csharp
public ComponentConverter (Type type);
```

Initializes a new instance of the `ComponentConverter` class.

Parameters:

- `type`: A `Type` that represents the type to associate with this component converter.

To be added.

## ComponentConverter.GetProperties(ITypeDescriptorContext, Object, Attribute[]) method

```csharp
public override System.ComponentModel.PropertyDescriptorCollection GetProperties (System.ComponentModel.ITypeDescriptorContext? context, object value, Attribute[]? attributes);
```

Gets a collection of properties for the type of component specified by the value parameter.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: An `Object` that specifies the type of component to get the properties for.
- `attributes`: An array of type `Attribute` that will be used as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for the component, or `null` if there are no properties.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

The `attributes` array will be used to filter the array. The `attributes` can have a mix of `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` object will be treated as a wildcard; it will match any property that has the `Type` in its set of attributes.

- If a property does not have an `Attribute` of the same class, the property will not be included in the returned array.

- If the attribute is an instance of `Attribute`, the property must be an exact match or it will not be included in the returned array.

- If a `Attribute` instance is specified and it is the default property, it will be included in the returned array even if there is no instance of the `Attribute` in the property.

## ComponentConverter.GetPropertiesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetPropertiesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether this object supports properties using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because `TypeConverter.GetProperties` should be called to find the properties of this object. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

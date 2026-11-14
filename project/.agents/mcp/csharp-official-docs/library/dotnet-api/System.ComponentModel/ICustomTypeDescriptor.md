---
title: "ICustomTypeDescriptor interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ICustomTypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICustomTypeDescriptor interface

Namespace: `System.ComponentModel`

```csharp
public interface ICustomTypeDescriptor
```

Provides an interface that supplies dynamic custom type information for an object.

#### Remarks
The `ICustomTypeDescriptor` interface allows an object to provide type information about itself. Typically, this interface is used when an object needs dynamic type information. In contrast, the `TypeDescriptor` class provides static type information that is obtained from metadata.

For example, `ICustomTypeDescriptor` is used to provide type information for COM objects. COM objects do not support properties or attributes. Therefore, .NET uses `ICustomTypeDescriptor` to implement properties and attributes for COM objects.

To provide dynamic custom type information, a class can implement `ICustomTypeDescriptor` or derive from the `CustomTypeDescriptor` class, which provides a simple implementation of this interface.

> **Note:**
> There is no design-time support for data binding to objects that implement the `ICustomTypeDescriptor` interface. In addition, when binding to a runtime instance of `ICustomTypeDescriptor`, the public properties of the underlying type are ignored.

## ICustomTypeDescriptor.RequireRegisteredTypes property

```csharp
public virtual bool? RequireRegisteredTypes { get; }
```

Gets a value that indicates whether types are required to be registered through `TypeDescriptionProvider.RegisterType<T>`.

Returns: To be added.

The default value is `null`, which means that the type descriptor has not declared whether or not it is compatible registered types.

A type descriptor needs to implement this to return either `true` or `false` if the feature switch

'System.ComponentModel.TypeDescriptor.RequireRegisteredTypes' is enabled.

If `true` is returned, then the type descriptor must also implement

`ICustomTypeDescriptor.GetConverterFromRegisteredType`,

`ICustomTypeDescriptor.GetEventsFromRegisteredType`, and

`ICustomTypeDescriptor.GetPropertiesFromRegisteredType`.

## ICustomTypeDescriptor.GetAttributes() method

```csharp
public System.ComponentModel.AttributeCollection GetAttributes ();
```

Returns a collection of custom attributes for this instance of a component.

Returns: An `AttributeCollection` containing the attributes for this object.

#### Remarks
The return value is never `null`.

Implementers can return an empty `AttributeCollection` if no custom attributes are specified for an object.

## ICustomTypeDescriptor.GetClassName() method

```csharp
public string? GetClassName ();
```

Returns the class name of this instance of a component.

Returns: The class name of the object, or `null` if the class does not have a name.

#### Remarks
If `null` is returned, use the type name from the `ICustomTypeDescriptor.GetComponentName` method.

## ICustomTypeDescriptor.GetComponentName() method

```csharp
public string? GetComponentName ();
```

Returns the name of this instance of a component.

Returns: The name of the object, or `null` if the object does not have a name.

#### Remarks
If `null` is returned, use the default name.

## ICustomTypeDescriptor.GetConverter() method

```csharp
public System.ComponentModel.TypeConverter? GetConverter ();
```

Returns a type converter for this instance of a component.

Returns: A `TypeConverter` that is the converter for this object, or `null` if there is no `TypeConverter` for this object.

#### Remarks
If `null` is returned, use the default `TypeConverter`.

## ICustomTypeDescriptor.GetConverterFromRegisteredType() method

```csharp
public virtual System.ComponentModel.TypeConverter? GetConverterFromRegisteredType ();
```

Returns a type converter for this instance of a component that might be registered.

Returns: A `TypeConverter` that is the converter for this object, or `null` if there is no `TypeConverter` for this object.

#### Remarks
If `null` is returned, use the default `TypeConverter`.

## ICustomTypeDescriptor.GetDefaultEvent() method

```csharp
public System.ComponentModel.EventDescriptor? GetDefaultEvent ();
```

Returns the default event for this instance of a component.

Returns: An `EventDescriptor` that represents the default event for this object, or `null` if this object does not have events.

To be added.

## ICustomTypeDescriptor.GetDefaultProperty() method

```csharp
public System.ComponentModel.PropertyDescriptor? GetDefaultProperty ();
```

Returns the default property for this instance of a component.

Returns: A `PropertyDescriptor` that represents the default property for this object, or `null` if this object does not have properties.

To be added.

## ICustomTypeDescriptor.GetEditor(Type) method

```csharp
public object? GetEditor (Type editorBaseType);
```

Returns an editor of the specified type for this instance of a component.

Parameters:

- `editorBaseType`: A `Type` that represents the editor for this object.

Returns: An `Object` of the specified type that is the editor for this object, or `null` if the editor cannot be found.

#### Remarks
The type of the `editorBaseType` parameter is usually `UITypeEditor`, but you can also use other types (for example, `ComponentEditor` and `InstanceCreationEditor`).

## ICustomTypeDescriptor.GetEvents() method

```csharp
public System.ComponentModel.EventDescriptorCollection GetEvents ();
```

Returns the events for this instance of a component.

Returns: An `EventDescriptorCollection` that represents the events for this component instance.

#### Remarks
The events for this instance can differ from the set of events that the class provides. For example, if the component is site-based, the site can add or remove additional events.

Implementors can return `Empty` if no properties are specified. This method should never return `null`.

## ICustomTypeDescriptor.GetEvents(Attribute[]) method

```csharp
public System.ComponentModel.EventDescriptorCollection GetEvents (Attribute[]? attributes);
```

Returns the events for this instance of a component using the specified attribute array as a filter.

Parameters:

- `attributes`: An array of type `Attribute` that is used as a filter.

Returns: An `EventDescriptorCollection` that represents the filtered events for this component instance.

#### Remarks
The events for this instance can differ from the set of events that the class provides. For example, if the component is site-based, the site can add or remove additional events.

If an `Attribute` is specified in the `attributes` array and the event does not have an instance of the class for that attribute, the returned array includes the event if the `Attribute` is the default event.

## ICustomTypeDescriptor.GetEventsFromRegisteredType() method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection GetEventsFromRegisteredType ();
```

Returns the events for this instance of a component that might be registered.

Returns: An `EventDescriptorCollection` that represents the events for this component instance.

#### Remarks
The events for this instance can differ from the set of events that the class provides. For example, if the component is site-based, the site can add or remove additional events.

Implementors can return `Empty` if no properties are specified. This method should never return `null`.

## ICustomTypeDescriptor.GetProperties() method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetProperties ();
```

Returns the properties for this instance of a component.

Returns: A `PropertyDescriptorCollection` that represents the properties for this component instance.

#### Remarks
The properties for this instance can differ from the set of properties that the class provides. For example, if the component is sited, the site can add or remove additional properties.

Implementers can return `Empty` if no properties are specified. This method should never return `null`.

## ICustomTypeDescriptor.GetProperties(Attribute[]) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetProperties (Attribute[]? attributes);
```

Returns the properties for this instance of a component using the attribute array as a filter.

Parameters:

- `attributes`: An array of type `Attribute` that is used as a filter.

Returns: A `PropertyDescriptorCollection` that represents the filtered properties for this component instance.

#### Remarks
The properties for this instance can differ from the set of properties that the class provides. For example, if the component is sited, the site can add or remove additional properties.

If an `Attribute` is specified in the `attributes` array and the property does not have an instance of the class for that attribute, the returned collection will include the property if the `Attribute` is the default property.

For filtering rules, see `TypeDescriptor.GetProperties`.

## ICustomTypeDescriptor.GetPropertiesFromRegisteredType() method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection GetPropertiesFromRegisteredType ();
```

Returns the properties for this instance of a component that might be registered.

Returns: A `PropertyDescriptorCollection` that represents the properties for this component instance.

#### Remarks
The properties for this instance can differ from the set of properties that the class provides. For example, if the component is sited, the site can add or remove additional properties.

Implementers can return `Empty` if no properties are specified. This method should never return `null`.

## ICustomTypeDescriptor.GetPropertyOwner(PropertyDescriptor) method

```csharp
public object? GetPropertyOwner (System.ComponentModel.PropertyDescriptor? pd);
```

Returns an object that contains the property described by the specified property descriptor.

Parameters:

- `pd`: A `PropertyDescriptor` that represents the property whose owner is to be found.

Returns: An `Object` that represents the owner of the specified property.

#### Remarks
The `ICustomTypeDescriptor.GetPropertyOwner` method retrieves the object that contains the property member that is described by `PropertyDescriptor` parameter. Typically, this object is required for the `PropertyDescriptor.GetValue` and `PropertyDescriptor.SetValue` methods.

This method should return an object that you can use as follows:

```csharp
pd.GetValue(GetPropertyOwner(myPd));
```

If `myPd` is `null`, your implementation of the `ICustomTypeDescriptor` interface should return the default object (typically, the base object that exposes the properties and attributes).

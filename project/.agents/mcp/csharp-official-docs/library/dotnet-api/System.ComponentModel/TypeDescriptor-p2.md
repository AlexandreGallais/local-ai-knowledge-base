---
title: "TypeDescriptor class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptor class (part 2 of 5)

## TypeDescriptor.CreateDesigner(IComponent, Type) method

```csharp
public static System.ComponentModel.Design.IDesigner? CreateDesigner (System.ComponentModel.IComponent component, Type designerBaseType);
```

Creates an instance of the designer associated with the specified component and of the specified type of designer.

Parameters:

- `component`: An `IComponent` that specifies the component to associate with the designer.
- `designerBaseType`: A `Type` that represents the type of designer to create.

Returns: An `IDesigner` that is an instance of the designer for the component, or `null` if no designer can be found.

#### Remarks
If this method cannot find a valid `DesignerAttribute`, it searches up the class hierarchy for a designer. If it cannot find a designer in the class hierarchy, it returns `null`.

## TypeDescriptor.CreateEvent(Type, EventDescriptor, Attribute[]) method

```csharp
public static System.ComponentModel.EventDescriptor CreateEvent (Type componentType, System.ComponentModel.EventDescriptor oldEventDescriptor, params Attribute[] attributes);
```

Creates a new event descriptor that is identical to an existing event descriptor, when passed the existing `EventDescriptor`.

Parameters:

- `componentType`: The type of the component for which to create the new event.
- `oldEventDescriptor`: The existing event information.
- `attributes`: The new attributes.

Returns: A new `EventDescriptor` that has merged the specified metadata attributes with the existing metadata attributes.

To be added.

## TypeDescriptor.CreateEvent(Type, String, Type, Attribute[]) method

```csharp
public static System.ComponentModel.EventDescriptor CreateEvent (Type componentType, string name, Type type, params Attribute[] attributes);
```

Creates a new event descriptor that is identical to an existing event descriptor by dynamically generating descriptor information from a specified event on a type.

Parameters:

- `componentType`: The type of the component the event lives on.
- `name`: The name of the event.
- `type`: The type of the delegate that handles the event.
- `attributes`: The attributes for this event.

Returns: An `EventDescriptor` that is bound to a type.

To be added.

## TypeDescriptor.CreateInstance(IServiceProvider, Type, Type[], Object[]) method

```csharp
public static object? CreateInstance (IServiceProvider? provider, Type objectType, Type[]? argTypes, object?[]? args);
```

Creates an object that can substitute for another data type.

Parameters:

- `provider`: The service provider that provides a `TypeDescriptionProvider` service. This parameter can be `null`.
- `objectType`: The `Type` of object to create.
- `argTypes`: An optional array of parameter types to be passed to the object's constructor. This parameter can be `null` or an array of zero length.
- `args`: An optional array of parameter values to pass to the object's constructor. If not `null`, the number of elements must be the same as `argTypes`.

Returns: An instance of the substitute data type if an associated `TypeDescriptionProvider` is found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `objectType` is `null`, or `args` is `null` when `argTypes` is not `null`.
- `ArgumentException`: `argTypes` and `args` have different number of elements.

#### Remarks
The `TypeDescriptor.CreateInstance` method will search for a `TypeDescriptionProvider` that is associated with the specified `objectType` data type. This method first tries to obtain a type description provider from the `provider` parameter. If this fails, it searches its own internal tables for a provider (these entries were created through previous calls to `TypeDescriptor.AddProvider`). If it finds a provider, this method will delegate the creation call to that object.

## TypeDescriptor.CreateProperty(Type, PropertyDescriptor, Attribute[]) method

```csharp
public static System.ComponentModel.PropertyDescriptor CreateProperty (Type componentType, System.ComponentModel.PropertyDescriptor oldPropertyDescriptor, params Attribute[] attributes);
```

Creates a new property descriptor from an existing property descriptor, using the specified existing `PropertyDescriptor` and attribute array.

Parameters:

- `componentType`: The `Type` of the component that the property is a member of.
- `oldPropertyDescriptor`: The existing property descriptor.
- `attributes`: The new attributes for this property.

Returns: A new `PropertyDescriptor` that has the specified metadata attributes merged with the existing metadata attributes.

To be added.

## TypeDescriptor.CreateProperty(Type, String, Type, Attribute[]) method

```csharp
public static System.ComponentModel.PropertyDescriptor CreateProperty (Type componentType, string name, Type type, params Attribute[] attributes);
```

Creates and dynamically binds a property descriptor to a type, using the specified property name, type, and attribute array.

Parameters:

- `componentType`: The `Type` of the component that the property is a member of.
- `name`: The name of the property.
- `type`: The `Type` of the property.
- `attributes`: The new attributes for this property.

Returns: A `PropertyDescriptor` that is bound to the specified type and that has the specified metadata attributes merged with the existing metadata attributes.

To be added.

## TypeDescriptor.GetAssociation(Type, Object) method

```csharp
public static object GetAssociation (Type type, object primary);
```

Returns an instance of the type associated with the specified primary object.

Parameters:

- `type`: The `Type` of the target component.
- `primary`: The primary object of the association.

Returns: An instance of the secondary type that has been associated with the primary object if an association exists; otherwise, `primary` if no specified association exists.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
If a previous association has been made for the `type` parameter using the `TypeDescriptor.CreateAssociation` method, then the `TypeDescriptor.GetAssociation` method returns the correct secondary object to invoke for the requested type. Otherwise, `TypeDescriptor.GetAssociation` searches for a compatible designer for `type` and returns the designer if one is found. This method never returns `null`.

A `WeakReference` is used to maintain the association between the primary and secondary object; therefore, this method does not prevent either the primary or secondary object from being finalized and reclaimed by garbage collection.

## TypeDescriptor.GetAttributes(Object) method

```csharp
public static System.ComponentModel.AttributeCollection GetAttributes (object component);
```

Returns the collection of attributes for the specified component.

Parameters:

- `component`: The component for which you want to get attributes.

Returns: An `AttributeCollection` containing the attributes for the component. If `component` is `null`, this method returns an empty collection.

#### Remarks
The attributes returned by the `TypeDescriptor.GetAttributes` method may be dynamically modified from the original component's source listing by extender providers (`IExtenderProvider`), filter services (`ITypeDescriptorFilterService`), and attribute filters.

When you define a custom attribute with `AttributeUsageAttribute.AllowMultiple` set to `true`, you must override the `TypeId` property to make it unique. If all instances of your attribute are unique, override `Attribute.TypeId` to return the object identity of your attribute. If only some instances of your attribute are unique, return a value from `Attribute.TypeId` that would return equality in those cases. For example, some attributes have a constructor parameter that acts as a unique key. For these attributes, return the value of the constructor parameter from the `TypeId` property.

> **Note:**
>  The default implementation of `Attribute.TypeId` returns the type identity regardless of the value of the `AllowMultiple` property. In order to return multiple instances of an `AttributeUsageAttribute.AllowMultiple` attribute from the `AttributeCollection`, your attribute must override the `TypeId` property.

#### Examples
For an example of this method, see the `AttributeCollection.Matches` method.

## TypeDescriptor.GetAttributes(Type) method

```csharp
public static System.ComponentModel.AttributeCollection GetAttributes (Type componentType);
```

Returns a collection of attributes for the specified type of component.

Parameters:

- `componentType`: The `Type` of the target component.

Returns: An `AttributeCollection` with the attributes for the type of the component. If the component is `null`, this method returns an empty collection.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

For attributes with `AttributeUsageAttribute.AllowMultiple` set to `true`, the attribute collection removes duplicate instances. These are instances in which the `TypeId` property returns equal values.

When you define a custom attribute with `AttributeUsageAttribute.AllowMultiple` set to `true`, you must override the `TypeId` property to make it unique. If all instances of your attribute are unique, override `Attribute.TypeId` to return the object identity of your attribute. If only some instances of your attribute are unique, return a value from `Attribute.TypeId` that would return equality in those cases. For example, some attributes have a constructor parameter that acts as a unique key. For these attributes, return the value of the constructor parameter from the `TypeId` property.

> **Note:**
>  The default implementation of `Attribute.TypeId` returns the type identity regardless of the value of the `AllowMultiple` property. In order to return multiple instances of an `AttributeUsageAttribute.AllowMultiple` attribute from the `AttributeCollection`, your attribute must override the `TypeId` property.

## TypeDescriptor.GetAttributes(Object, Boolean) method

```csharp
public static System.ComponentModel.AttributeCollection GetAttributes (object component, bool noCustomTypeDesc);
```

Returns a collection of attributes for the specified component and a Boolean indicating that a custom type descriptor has been created.

Parameters:

- `component`: The component for which you want to get attributes.
- `noCustomTypeDesc`: `true` to use a baseline set of attributes from the custom type descriptor if `component` is of type `ICustomTypeDescriptor`; otherwise, `false`.

Returns: An `AttributeCollection` with the attributes for the component. If the component is `null`, this method returns an empty collection.

#### Remarks
The attributes returned by the `TypeDescriptor.GetAttributes` method may be dynamically modified from the original components source listing by extender providers (`IExtenderProvider`), filter services (`ITypeDescriptorFilterService`), and attribute filters.

When you define a custom attribute with `AttributeUsageAttribute.AllowMultiple` set to `true`, you must override the `TypeId` property to make it unique. If all instances of your attribute are unique, override `Attribute.TypeId` to return the object identity of your attribute. If only some instances of your attribute are unique, return a value from `Attribute.TypeId` that would return equality in those cases. For example, some attributes have a constructor parameter that acts as a unique key. For these attributes, return the value of the constructor parameter from the `TypeId` property.

> **Note:**
>  The default implementation of `Attribute.TypeId` returns the type identity regardless of the value of the `AllowMultiple` property. In order to return multiple instances of an `AttributeUsageAttribute.AllowMultiple` attribute from the `AttributeCollection`, your attribute must override the `TypeId` property.

## TypeDescriptor.GetClassName(Object) method

```csharp
public static string? GetClassName (object component);
```

Returns the name of the class for the specified component using the default type descriptor.

Parameters:

- `component`: The `Object` for which you want the class name.

Returns: A `String` containing the name of the class for the specified component.

Exceptions:

- `ArgumentNullException`: `component` is `null`.

#### Remarks
Typically, this method returns the full `Type` name for the `component` parameter type. For example, the class name for a button is "System.Windows.Forms.Button". If `component` implements `ICustomTypeDescriptor`, it can return an alternate name.

This method is equivalent to the overloaded `GetClassName` method with a second parameter of `false`.

## TypeDescriptor.GetClassName(Type) method

```csharp
public static string? GetClassName (Type componentType);
```

Returns the name of the class for the specified type.

Parameters:

- `componentType`: The `Type` of the target component.

Returns: A `String` containing the name of the class for the specified component type.

Exceptions:

- `ArgumentNullException`: `componentType` is `null`.

#### Remarks
This method uses the cached custom type descriptor for the specified type to discover the associated class name.

## TypeDescriptor.GetClassName(Object, Boolean) method

```csharp
public static string? GetClassName (object component, bool noCustomTypeDesc);
```

Returns the name of the class for the specified component using a custom type descriptor.

Parameters:

- `component`: The `Object` for which you want the class name.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: A `String` containing the name of the class for the specified component.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
Typically, this method returns the full `Type` name for the `component` parameter type. For example, the class name for a button is "System.Windows.Forms.Button". If the `component` parameter implements `ICustomTypeDescriptor`, it can return an alternate name.

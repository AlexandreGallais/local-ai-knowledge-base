---
title: "TypeDescriptor class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptor class (part 5 of 5)

## TypeDescriptor.GetProperties(Object, Attribute[], Boolean) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetProperties (object component, Attribute[]? attributes, bool noCustomTypeDesc);
```

Returns the collection of properties for a specified component using a specified array of attributes as a filter and using a custom type descriptor.

Parameters:

- `component`: A component to get the properties for.
- `attributes`: An array of type `Attribute` to use as a filter.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: A `PropertyDescriptorCollection` with the events that match the specified attributes for the specified component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The properties for a `component` can differ from the properties of a class, because the site can add or remove properties if the `component` is sited.

The `attributes` parameter array is used to filter the array. Filtering is defined by the following rules:

- If a property does not have an `Attribute` of the same class, the property is not included in the returned array.

- If the attribute is an instance of the `Attribute` class, the property must be an exact match or it is not included in the returned array.

- If an `Attribute` instance is specified and it is the default property, it is included in the returned array even if there is no instance of the `Attribute` in the property.

- If `attributes` has a default attribute, the `TypeDescriptor.GetProperties` method matches the case when the property does not have the attribute applied.

If the `component` parameter is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetPropertiesFromRegisteredType(Object) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetPropertiesFromRegisteredType (object component);
```

Gets a collection of properties for a specified component.

Parameters:

- `component`: A component to get the properties for.

Returns: A `PropertyDescriptorCollection` with the properties for the specified component.

To be added.

## TypeDescriptor.GetPropertiesFromRegisteredType(Type) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetPropertiesFromRegisteredType (Type componentType);
```

Gets a collection of properties for a specified type.

Parameters:

- `componentType`: A `Type` that represents the component to get properties for.

Returns: A `PropertyDescriptorCollection` with the properties for a specified type of component.

To be added.

## TypeDescriptor.GetProvider(Object) method

```csharp
public static System.ComponentModel.TypeDescriptionProvider GetProvider (object instance);
```

Returns the type description provider for the specified component.

Parameters:

- `instance`: An instance of the target component.

Returns: A `TypeDescriptionProvider` associated with the specified component.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

#### Remarks
The `TypeDescriptor.GetProvider` method will always return a type description provider. Even the default `TypeDescriptor` implementation is built on a `TypeDescriptionProvider`.

## TypeDescriptor.GetProvider(Type) method

```csharp
public static System.ComponentModel.TypeDescriptionProvider GetProvider (Type type);
```

Returns the type description provider for the specified type.

Parameters:

- `type`: The `Type` of the target component.

Returns: A `TypeDescriptionProvider` associated with the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
The `TypeDescriptor.GetProvider` method will always return a type description provider. Even the default `TypeDescriptor` implementation is built on a `TypeDescriptionProvider`.

## TypeDescriptor.GetReflectionType(Object) method

```csharp
public static Type GetReflectionType (object instance);
```

Returns a `Type` that can be used to perform reflection, given an object.

Parameters:

- `instance`: An instance of the target component.

Returns: A `Type` for the specified object.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

#### Remarks
The `TypeDescriptor.GetReflectionType` method is a low-level version of the `TypeDescriptionProvider.GetTypeDescriptor` method. `TypeDescriptor.GetReflectionType` is typically used to perform standard reflection against an object when no custom type descriptor can be located for it.

## TypeDescriptor.GetReflectionType(Type) method

```csharp
public static Type GetReflectionType (Type type);
```

Returns a `Type` that can be used to perform reflection, given a class type.

Parameters:

- `type`: The `Type` of the target component.

Returns: A `Type` of the specified class.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
The `TypeDescriptor.GetReflectionType` method is a low-level version of the `TypeDescriptionProvider.GetTypeDescriptor` method. `TypeDescriptor.GetReflectionType` is typically used to perform standard reflection against a class when no custom type descriptor can be located for it.

## TypeDescriptor.Refresh(Object) method

```csharp
public static void Refresh (object component);
```

Clears the properties and events for the specified component from the cache.

Parameters:

- `component`: A component for which the properties or events have changed.

#### Remarks
Properties and events are cached by `TypeDescriptor` for speed. Typically, they are constant for the lifetime of an object. However, extender providers and designers can change the set of properties on an object. If they do, they should call this method to clear the property and event descriptors of the object. This method is used only at design time. It is not used during run time.

This method also raises a `Refreshed` event when the properties or events of a component change. This event is only raised if there was a prior call to the `TypeDescriptor.GetProperties` or `TypeDescriptor.GetEvents` method that cached the information.

#### Examples
For an example of using this method, see the `RefreshEventHandler` class.

## TypeDescriptor.Refresh(Assembly) method

```csharp
public static void Refresh (System.Reflection.Assembly assembly);
```

Clears the properties and events for the specified assembly from the cache.

Parameters:

- `assembly`: The `Assembly` that represents the assembly to refresh. Each `Type` in this assembly will be refreshed.

#### Remarks
Properties and events are cached by `TypeDescriptor` for speed. Typically, they are constant for the lifetime of an object. However, extender providers and designers can change the set of properties on an object. If they do, they can call this method to clear the property and event descriptors of the object. This method is used only at design time. It is not used during run time.

Before you make a call to the `TypeDescriptor.Refresh` method to clear the cache, you need to call the `TypeDescriptor.GetProperties` method for the specific assembly to cache the information first.

This method also raises a `Refreshed` event to notify all classes that want to be notified when the property set of a component changes.

## TypeDescriptor.Refresh(Module) method

```csharp
public static void Refresh (System.Reflection.Module module);
```

Clears the properties and events for the specified module from the cache.

Parameters:

- `module`: The `Module` that represents the module to refresh. Each `Type` in this module will be refreshed.

#### Remarks
Properties and events are cached by `TypeDescriptor` for speed. Typically, they are constant for the lifetime of an object. However, extender providers and designers can change the set of properties on an object. If they do, they can call this method to clear the property and event descriptors of the object. This method is used only at design time. It is not used during run time.

Before you make a call to the `TypeDescriptor.Refresh` method to clear the cache, you need to call the `TypeDescriptor.GetProperties` method for the specific module to cache the information first.

This method also raises a `Refreshed` event to notify all classes that want to be notified when the property set of a component changes.

## TypeDescriptor.Refresh(Type) method

```csharp
public static void Refresh (Type type);
```

Clears the properties and events for the specified type of component from the cache.

Parameters:

- `type`: The `Type` of the target component.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

Properties and events are cached by `TypeDescriptor` for speed. Typically, they are constant for the lifetime of an object. However, extender providers and designers can change the set of properties on an object. If they do, they can call this method to clear the property and event descriptors of the object. This method is used only at design time. It is not used during run time.

This method also raises a `Refreshed` event when the properties or events of a component change. This event is only raised if there was a prior call to the `TypeDescriptor.GetProperties` or `TypeDescriptor.GetEvents` method that cached the information.

## TypeDescriptor.RegisterType<T>() method

```csharp
public static void RegisterType<T> ();
```

Registers the type so it can be used by reflection-based providers in trimmed applications.

Parameters:

- `T`: The type to register.

To be added.

## TypeDescriptor.RemoveAssociation(Object, Object) method

```csharp
public static void RemoveAssociation (object primary, object secondary);
```

Removes an association between two objects.

Parameters:

- `primary`: The primary `Object`.
- `secondary`: The secondary `Object`.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
The `TypeDescriptor.RemoveAssociation` method removes an association between two objects formed by the `TypeDescriptor.CreateAssociation` method.

A `WeakReference` is used to maintain the association between the primary and secondary object; therefore, this method does not influence when either object is finalized or reclaimed by garbage collection.

## TypeDescriptor.RemoveAssociations(Object) method

```csharp
public static void RemoveAssociations (object primary);
```

Removes all associations for a primary object.

Parameters:

- `primary`: The primary `Object` in an association.

Exceptions:

- `ArgumentNullException`: `primary` is `null`.

#### Remarks
The `TypeDescriptor.RemoveAssociations` method removes all associations between a primary object and all of its secondary objects, created by calls to the `TypeDescriptor.CreateAssociation` method.

A `WeakReference` is used to maintain the association between the primary and secondary object; therefore, this method does not influence when either the primary of secondary objects are finalized or reclaimed by garbage collection.

## TypeDescriptor.RemoveProvider(TypeDescriptionProvider, Object) method

```csharp
public static void RemoveProvider (System.ComponentModel.TypeDescriptionProvider provider, object instance);
```

Removes a previously added type description provider that is associated with the specified object.

Parameters:

- `provider`: The `TypeDescriptionProvider` to remove.
- `instance`: An instance of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
This method removes a type description provider previously added with the `AddProvider` method. Removing a provider causes a `Refreshed` event to be raised for the associated object.

## TypeDescriptor.RemoveProvider(TypeDescriptionProvider, Type) method

```csharp
public static void RemoveProvider (System.ComponentModel.TypeDescriptionProvider provider, Type type);
```

Removes a previously added type description provider that is associated with the specified type.

Parameters:

- `provider`: The `TypeDescriptionProvider` to remove.
- `type`: The `Type` of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
This method removes a type description provider previously added with the `AddProvider` method. Removing a provider causes a `Refreshed` event to be raised for the associated type.

## TypeDescriptor.RemoveProviderTransparent(TypeDescriptionProvider, Object) method

```csharp
public static void RemoveProviderTransparent (System.ComponentModel.TypeDescriptionProvider provider, object instance);
```

Removes a previously added type description provider that is associated with the specified object.

Parameters:

- `provider`: The `TypeDescriptionProvider` to remove.
- `instance`: An instance of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
This method removes a type description provider previously added with the `AddProvider` method. Removing a provider causes a `Refreshed` event to be raised for the associated object.

## TypeDescriptor.RemoveProviderTransparent(TypeDescriptionProvider, Type) method

```csharp
public static void RemoveProviderTransparent (System.ComponentModel.TypeDescriptionProvider provider, Type type);
```

Removes a previously added type description provider that is associated with the specified type.

Parameters:

- `provider`: The `TypeDescriptionProvider` to remove.
- `type`: The `Type` of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
This method removes a type description provider previously added with the `AddProvider` method. Removing a provider causes a `Refreshed` event to be raised for the associated type.

This method can be called from partially trusted code. If `RestrictedRegistrationAccess` is defined, the caller can unregister a provider for the specified type if it is also partially trusted.

Use the `RemoveProvider` method if you do not need to call from partially trusted code.

## TypeDescriptor.SortDescriptorArray(IList) method

```csharp
public static void SortDescriptorArray (System.Collections.IList infos);
```

Sorts descriptors using the name of the descriptor.

Parameters:

- `infos`: An `IList` that contains the descriptors to sort.

Exceptions:

- `ArgumentNullException`: `infos` is `null`.

To be added.

## TypeDescriptor.Refreshed event

```csharp
public static event System.ComponentModel.RefreshEventHandler? Refreshed;
```

Occurs when the cache for a component is cleared.

#### Remarks
For more information about how to handle events, see Handling and Raising Events.

#### Examples
For an example of using this event, see the `RefreshEventHandler` class.

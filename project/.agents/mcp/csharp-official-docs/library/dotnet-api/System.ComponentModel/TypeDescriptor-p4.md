---
title: "TypeDescriptor class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptor class (part 4 of 5)

## TypeDescriptor.GetEvents(Object, Attribute[]) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEvents (object component, Attribute[] attributes);
```

Returns the collection of events for a specified component using a specified array of attributes as a filter.

Parameters:

- `component`: A component to get the events for.
- `attributes`: An array of type `Attribute` that you can use as a filter.

Returns: An `EventDescriptorCollection` with the events that match the specified attributes for this component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The events for the `component` parameter can differ from the events of a class, because the site can add or remove events if the `component` parameter is sited.

The `attributes` array can have a mix of `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` is treated as a wildcard; it matches any event that has the `Type` in its set of attributes.

- If an event does not have an `Attribute` of the same class, the event is not included in the returned array.

- If the attribute is an instance of the `Attribute` class, the event must be an exact match or it is not included in the returned array.

- If an `Attribute` instance is specified and it is the default event, it is included in the returned array even if there is no instance of the `Attribute` in the event.

If `component` is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetEvents(Object, Boolean) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEvents (object component, bool noCustomTypeDesc);
```

Returns the collection of events for a specified component with a custom type descriptor.

Parameters:

- `component`: A component to get the events for.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: An `EventDescriptorCollection` with the events for this component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
This method retrieves a collection of events that the given `component` parameter instance provides. This can differ from the set of events the class provides. If the `component` parameter is sited, the site can add or remove additional events.

If `component` is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetEvents(Type, Attribute[]) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEvents (Type componentType, Attribute[] attributes);
```

Returns the collection of events for a specified type of component using a specified array of attributes as a filter.

Parameters:

- `componentType`: The `Type` of the target component.
- `attributes`: An array of type `Attribute` that you can use as a filter.

Returns: An `EventDescriptorCollection` with the events that match the specified attributes for this component.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

The `attributes` parameter array can have a mix of `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` is treated as a wildcard; it matches any event that has the `Type` in its set of attributes.

- If an event does not have an `Attribute` of the same class, the event is not included in the returned array.

- If the attribute is an instance of the `Attribute` class, the event must be an exact match or it is not included in the returned array.

- If an `Attribute` instance is specified and it is the default event, it is included in the returned array even if there is no instance of the `Attribute` in the event.

If the `componentType` parameter is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetEvents(Object, Attribute[], Boolean) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEvents (object component, Attribute[]? attributes, bool noCustomTypeDesc);
```

Returns the collection of events for a specified component using a specified array of attributes as a filter and using a custom type descriptor.

Parameters:

- `component`: A component to get the events for.
- `attributes`: An array of type `Attribute` to use as a filter.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: An `EventDescriptorCollection` with the events that match the specified attributes for this component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The events for the `component` parameter can differ from the events of a class, because the site can add or remove events if the `component` parameter is sited.

The `attributes` parameter array can have a mix of `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` is treated as a wildcard; it matches any event that has the `Type` in its set of attributes.

- If an event does not have an `Attribute` of the same class, the event is not included in the returned array.

- If the attribute is an instance of the `Attribute` class, the event must be an exact match or it is not included in the returned array.

- If an `Attribute` instance is specified and it is the default event, it is included in the returned array even if there is no instance of the `Attribute` in the event.

If `component` is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetEventsFromRegisteredType(Type) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEventsFromRegisteredType (Type componentType);
```

Gets a collection of events for a specified type of component.

Parameters:

- `componentType`: The `Type` of the target component.

Returns: An `EventDescriptorCollection` with the events for this component.

To be added.

## TypeDescriptor.GetFullComponentName(Object) method

```csharp
public static string? GetFullComponentName (object component);
```

Returns the fully qualified name of the component.

Parameters:

- `component`: The `Component` to find the name for.

Returns: The fully qualified name of the specified component, or `null` if the component has no name.

Exceptions:

- `ArgumentNullException`: `component` is `null`.

#### Remarks
In many cases, the `TypeDescriptor.GetFullComponentName` method will return the same value as the `TypeDescriptor.GetComponentName` method. However, if the component resides in a nested container or has other nested semantics, it may return a different fully qualified name.

## TypeDescriptor.GetProperties(Object) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetProperties (object component);
```

Returns the collection of properties for a specified component.

Parameters:

- `component`: A component to get the properties for.

Returns: A `PropertyDescriptorCollection` with the properties for the specified component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The properties for a component can differ from the properties of a class, because the site can add or remove properties if the component is sited.

If the `component` parameter is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

#### Examples
The following code example demonstrates the use of the `TypeDescriptor.GetProperties` method to access the properties of a control. This code example is part of a larger example provided for the `ComponentDesigner` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeDescriptor/GetProperties/Form1.cs._

## TypeDescriptor.GetProperties(Type) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetProperties (Type componentType);
```

Returns the collection of properties for a specified type of component.

Parameters:

- `componentType`: A `Type` that represents the component to get properties for.

Returns: A `PropertyDescriptorCollection` with the properties for a specified type of component.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

If the `componentType` parameter is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetProperties(Object, Attribute[]) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetProperties (object component, Attribute[]? attributes);
```

Returns the collection of properties for a specified component using a specified array of attributes as a filter.

Parameters:

- `component`: A component to get the properties for.
- `attributes`: An array of type `Attribute` to use as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that match the specified attributes for the specified component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The properties for the `component` parameter can differ from the properties of a class, because the site can add or remove properties if the `component` parameter is sited.

The `attributes` parameter array is used to filter the array. Filtering is defined by the following rules:

- If a property does not have an `Attribute` of the same class, the property is not included in the returned array.

- If the attribute is an instance of the `Attribute` class, the property must be an exact match or it is not included in the returned array.

- If an `Attribute` instance is specified and it is the default property, it is included in the returned array even if there is no instance of the `Attribute` in the property.

- If `attributes` has a default attribute, the `TypeDescriptor.GetProperties` method matches the case when the property does not have the attribute applied.

If `component` is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

#### Examples
The following code example demonstrates how to implement the `PropertyTab.GetProperties` method. This code example is part of a larger example provided for the `PropertyTab` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyTabAttribute/Overview/class1.cs._
## TypeDescriptor.GetProperties(Object, Boolean) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetProperties (object component, bool noCustomTypeDesc);
```

Returns the collection of properties for a specified component using the default type descriptor.

Parameters:

- `component`: A component to get the properties for.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: A `PropertyDescriptorCollection` with the properties for a specified component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The properties for the `component` parameter can differ from the properties of a class, because the site can add or remove properties if the `component` parameter is sited.

If `component` is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

## TypeDescriptor.GetProperties(Type, Attribute[]) method

```csharp
public static System.ComponentModel.PropertyDescriptorCollection GetProperties (Type componentType, Attribute[]? attributes);
```

Returns the collection of properties for a specified type of component using a specified array of attributes as a filter.

Parameters:

- `componentType`: The `Type` of the target component.
- `attributes`: An array of type `Attribute` to use as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that match the specified attributes for this type of component.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

The `attributes` parameter array is used to filter the array. Filtering is defined by the following rules:

- If a property does not have an `Attribute` of the same class, the property is not included in the returned array.

- If the attribute is an instance of the `Attribute` class, the property must be an exact match or it is not included in the returned array.

- If an `Attribute` instance is specified and it is the default property, it is included in the returned array even if there is no instance of the `Attribute` in the property.

- If `attributes` has a default attribute, the `TypeDescriptor.GetProperties` method matches the case when the property does not have the attribute applied.

If the `componentType` parameter is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

#### Examples
The following code example demonstrates how to implement the `PropertyTab.GetProperties` method. This code example is part of a larger example provided for the `PropertyTab` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyTabAttribute/Overview/class1.cs._

---
title: "TypeDescriptor class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptor class (part 3 of 5)

## TypeDescriptor.GetComponentName(Object) method

```csharp
public static string? GetComponentName (object component);
```

Returns the name of the specified component using the default type descriptor.

Parameters:

- `component`: The `Object` for which you want the class name.

Returns: A `String` containing the name of the specified component, or `null` if there is no component name.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
Typically, this method returns the name for the site of the component, if one exists. For example, the class name for a button is "System.Windows.Forms.Button".

This method is equivalent to the overloaded `GetComponentName` method with a second parameter of `false`.

This method is used at design time to retrieve the name of an instance of a component.

## TypeDescriptor.GetComponentName(Object, Boolean) method

```csharp
public static string? GetComponentName (object component, bool noCustomTypeDesc);
```

Returns the name of the specified component using a custom type descriptor.

Parameters:

- `component`: The `Object` for which you want the class name.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: The name of the class for the specified component, or `null` if there is no component name.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
This method is used at design time to retrieve the name of an instance of a component. Typically, this method returns the name for the site of the component, if one exists. For example, the class name for a button is "System.Windows.Forms.Button". If the component implements the `ICustomTypeDescriptor` interface, it can return an alternate name.

## TypeDescriptor.GetConverter(Object) method

```csharp
public static System.ComponentModel.TypeConverter GetConverter (object component);
```

Returns a type converter for the type of the specified component.

Parameters:

- `component`: A component to get the converter for.

Returns: A `TypeConverter` for the specified component.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
This method locates an appropriate type converter by looking for a `TypeConverterAttribute`. If it cannot find a `TypeConverterAttribute`, it traverses the base class hierarchy of the class until it finds a primitive type.

This method is equivalent to the overloaded `TypeDescriptor.GetConverter` method with a second parameter of `false`.

#### Examples
For an example of using this method, see the `TypeConverter` class.

## TypeDescriptor.GetConverter(Type) method

```csharp
public static System.ComponentModel.TypeConverter GetConverter (Type type);
```

Returns a type converter for the specified type.

Parameters:

- `type`: The `Type` of the target component.

Returns: A `TypeConverter` for the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

This method looks for the appropriate type converter by looking for a `TypeConverterAttribute`. If it cannot find a `TypeConverterAttribute`, it traverses the base class hierarchy of the class until it finds a primitive type.

## TypeDescriptor.GetConverter(Object, Boolean) method

```csharp
public static System.ComponentModel.TypeConverter GetConverter (object component, bool noCustomTypeDesc);
```

Returns a type converter for the type of the specified component with a custom type descriptor.

Parameters:

- `component`: A component to get the converter for.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: A `TypeConverter` for the specified component.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
This method looks for the appropriate type converter by trying to find a `TypeConverterAttribute`. If it cannot find a `TypeConverterAttribute`, it traverses the base class hierarchy of the class until it finds a primitive type.

## TypeDescriptor.GetConverterFromRegisteredType(Object) method

```csharp
public static System.ComponentModel.TypeConverter GetConverterFromRegisteredType (object component);
```

Gets a type converter for the type of the specified component.

Parameters:

- `component`: A component to get the converter for.

Returns: A `TypeConverter` for the specified component.

To be added.

## TypeDescriptor.GetConverterFromRegisteredType(Type) method

```csharp
public static System.ComponentModel.TypeConverter GetConverterFromRegisteredType (Type type);
```

Gets a type converter for the specified registered type.

Parameters:

- `type`: The `Type` of the target component.

Returns: A `TypeConverter` for the specified type.

To be added.

## TypeDescriptor.GetDefaultEvent(Object) method

```csharp
public static System.ComponentModel.EventDescriptor? GetDefaultEvent (object component);
```

Returns the default event for the specified component.

Parameters:

- `component`: The component to get the event for.

Returns: An `EventDescriptor` with the default event, or `null` if there are no events.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
This method is equivalent to the overloaded `GetDefaultEvent` method with a second parameter of `false`.

## TypeDescriptor.GetDefaultEvent(Type) method

```csharp
public static System.ComponentModel.EventDescriptor? GetDefaultEvent (Type componentType);
```

Returns the default event for the specified type of component.

Parameters:

- `componentType`: The `Type` of the target component.

Returns: An `EventDescriptor` with the default event, or `null` if there are no events.

Exceptions:

- `ArgumentNullException`: `componentType` is `null`.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

## TypeDescriptor.GetDefaultEvent(Object, Boolean) method

```csharp
public static System.ComponentModel.EventDescriptor? GetDefaultEvent (object component, bool noCustomTypeDesc);
```

Returns the default event for a component with a custom type descriptor.

Parameters:

- `component`: The component to get the event for.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: An `EventDescriptor` with the default event, or `null` if there are no events.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

To be added.

## TypeDescriptor.GetDefaultProperty(Object) method

```csharp
public static System.ComponentModel.PropertyDescriptor? GetDefaultProperty (object component);
```

Returns the default property for the specified component.

Parameters:

- `component`: The component to get the default property for.

Returns: A `PropertyDescriptor` with the default property, or `null` if there are no properties.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
If the `component` parameter is `null`, this method returns `null`.

## TypeDescriptor.GetDefaultProperty(Type) method

```csharp
public static System.ComponentModel.PropertyDescriptor? GetDefaultProperty (Type componentType);
```

Returns the default property for the specified type of component.

Parameters:

- `componentType`: A `Type` that represents the class to get the property for.

Returns: A `PropertyDescriptor` with the default property, or `null` if there are no properties.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

If the `componentType` parameter is `null`, this method returns `null`.

## TypeDescriptor.GetDefaultProperty(Object, Boolean) method

```csharp
public static System.ComponentModel.PropertyDescriptor? GetDefaultProperty (object component, bool noCustomTypeDesc);
```

Returns the default property for the specified component with a custom type descriptor.

Parameters:

- `component`: The component to get the default property for.
- `noCustomTypeDesc`: `true` to not consider custom type description information; otherwise, `false`.

Returns: A `PropertyDescriptor` with the default property, or `null` if there are no properties.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
If the `component` parameter is `null`, this method returns `null`.

## TypeDescriptor.GetEditor(Object, Type) method

```csharp
public static object? GetEditor (object component, Type editorBaseType);
```

Gets an editor with the specified base type for the specified component.

Parameters:

- `component`: The component to get the editor for.
- `editorBaseType`: A `Type` that represents the base type of the editor you want to find.

Returns: An instance of the editor that can be cast to the specified editor type, or `null` if no editor of the requested type can be found.

Exceptions:

- `ArgumentNullException`: `component` or `editorBaseType` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The type of `editorBaseType` is usually `UITypeEditor`, but you can also use other types (for example, `ComponentEditor` and `InstanceCreationEditor`).

You can define multiple editors for a property. You use this method to select the editor you want to use.

## TypeDescriptor.GetEditor(Type, Type) method

```csharp
public static object? GetEditor (Type type, Type editorBaseType);
```

Returns an editor with the specified base type for the specified type.

Parameters:

- `type`: The `Type` of the target component.
- `editorBaseType`: A `Type` that represents the base type of the editor you are trying to find.

Returns: An instance of the editor object that can be cast to the given base type, or `null` if no editor of the requested type can be found.

Exceptions:

- `ArgumentNullException`: `type` or `editorBaseType` is `null`.

#### Remarks
The type of `editorBaseType` is usually `UITypeEditor`, but you can also use other types (for example `ComponentEditor` and `InstanceCreationEditor`).

You can define multiple editors for a type. You use this method to select the one you want to use.

Call this version of this method only when you do not have an instance of the object.

## TypeDescriptor.GetEditor(Object, Type, Boolean) method

```csharp
public static object? GetEditor (object component, Type editorBaseType, bool noCustomTypeDesc);
```

Returns an editor with the specified base type and with a custom type descriptor for the specified component.

Parameters:

- `component`: The component to get the editor for.
- `editorBaseType`: A `Type` that represents the base type of the editor you want to find.
- `noCustomTypeDesc`: A flag indicating whether custom type description information should be considered.

Returns: An instance of the editor that can be cast to the specified editor type, or `null` if no editor of the requested type can be found.

Exceptions:

- `ArgumentNullException`: `component` or `editorBaseType` is `null`.
- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
The type of `editorBaseType` is usually `UITypeEditor`, but you can also use other types (for example `ComponentEditor` and `InstanceCreationEditor`).

You can define multiple editors for a property. You use this method to select the editor you want to use.

## TypeDescriptor.GetEvents(Object) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEvents (object component);
```

Returns the collection of events for the specified component.

Parameters:

- `component`: A component to get the events for.

Returns: An `EventDescriptorCollection` with the events for this component.

Exceptions:

- `NotSupportedException`: `component` is a cross-process remoted object.

#### Remarks
Retrieves a collection of events that the given `component` parameter instance provides. This collection can differ from the set of events the class provides. If the `component` parameter is sited, the site can add or remove additional events.

If `component` is `null`, then an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

#### Examples
For an example of this method, see the `Count` property.

## TypeDescriptor.GetEvents(Type) method

```csharp
public static System.ComponentModel.EventDescriptorCollection GetEvents (Type componentType);
```

Returns the collection of events for a specified type of component.

Parameters:

- `componentType`: The `Type` of the target component.

Returns: An `EventDescriptorCollection` with the events for this component.

#### Remarks
Call this version of this method only when you do not have an instance of the object.

If the `componentType` parameter is `null`, an empty collection is returned.

The order of the returned collection is not guaranteed to be identical between calls, so always order it before use.

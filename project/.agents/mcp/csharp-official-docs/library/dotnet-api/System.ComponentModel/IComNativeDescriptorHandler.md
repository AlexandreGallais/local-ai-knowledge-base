---
title: "IComNativeDescriptorHandler interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IComNativeDescriptorHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComNativeDescriptorHandler interface

Namespace: `System.ComponentModel`

```csharp
public interface IComNativeDescriptorHandler
```

Provides a top-level mapping layer between a COM object and a `TypeDescriptor`.

#### Remarks

> **Note:**
>  This API is now obsolete. Add a `TypeDescriptionProvider` to handle a `TypeDescriptor.ComObjectType` instead.

## IComNativeDescriptorHandler.GetAttributes(Object) method

```csharp
public System.ComponentModel.AttributeCollection GetAttributes (object component);
```

Gets the attributes for the specified component.

Parameters:

- `component`: The component to get attributes for.

Returns: A collection of attributes for `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetClassName(Object) method

```csharp
public string GetClassName (object component);
```

Gets the class name for the specified component.

Parameters:

- `component`: The component to get the class name for.

Returns: The name of the class that corresponds with `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetConverter(Object) method

```csharp
public System.ComponentModel.TypeConverter GetConverter (object component);
```

Gets the type converter for the specified component.

Parameters:

- `component`: The component to get the `TypeConverter` for.

Returns: The `TypeConverter` for `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetDefaultEvent(Object) method

```csharp
public System.ComponentModel.EventDescriptor GetDefaultEvent (object component);
```

Gets the default event for the specified component.

Parameters:

- `component`: The component to get the default event for.

Returns: An `EventDescriptor` that represents `component`'s default event.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetDefaultProperty(Object) method

```csharp
public System.ComponentModel.PropertyDescriptor GetDefaultProperty (object component);
```

Gets the default property for the specified component.

Parameters:

- `component`: The component to get the default property for.

Returns: A `PropertyDescriptor` that represents `component`'s default property.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetEditor(Object, Type) method

```csharp
public object GetEditor (object component, Type baseEditorType);
```

Gets the editor for the specified component.

Parameters:

- `component`: The component to get the editor for.
- `baseEditorType`: The base type of the editor for `component`.

Returns: The editor for `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetEvents(Object) method

```csharp
public System.ComponentModel.EventDescriptorCollection GetEvents (object component);
```

Gets the events for the specified component.

Parameters:

- `component`: The component to get events for.

Returns: A collection of event descriptors for `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetEvents(Object, Attribute[]) method

```csharp
public System.ComponentModel.EventDescriptorCollection GetEvents (object component, Attribute[]? attributes);
```

Gets the events with the specified attributes for the specified component.

Parameters:

- `component`: The component to get events for.
- `attributes`: The attributes used to filter events.

Returns: A collection of event descriptors for `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetName(Object) method

```csharp
public string GetName (object component);
```

Gets the name of the specified component.

Parameters:

- `component`: The component to get the name of.

Returns: The name of `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetProperties(Object, Attribute[]) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetProperties (object component, Attribute[]? attributes);
```

Gets the properties with the specified attributes for the specified component.

Parameters:

- `component`: The component to get events for.
- `attributes`: The attributes used to filter properties.

Returns: A collection of property descriptors for `component`.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetPropertyValue(Object, Int32, Boolean) method

```csharp
public object GetPropertyValue (object component, int dispid, ref bool success);
```

Gets the value of the property that has the specified dispatch identifier.

Parameters:

- `component`: The object to which the property belongs.
- `dispid`: The dispatch identifier.
- `success`: A `Boolean`, passed by reference, that represents whether the property was retrieved.

Returns: The value of the property that has the specified dispatch identifier.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

## IComNativeDescriptorHandler.GetPropertyValue(Object, String, Boolean) method

```csharp
public object GetPropertyValue (object component, string propertyName, ref bool success);
```

Gets the value of the property that has the specified name.

Parameters:

- `component`: The object to which the property belongs.
- `propertyName`: The name of the property.
- `success`: A `Boolean`, passed by reference, that represents whether the property was retrieved.

Returns: The value of the property that has the specified name.

#### Remarks

> **Note:**
>  This API is now obsolete. The non-obsolete alternative is `TypeDescriptor.ComObjectType`.

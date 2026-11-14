---
title: "ITypeDescriptorContext interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ITypeDescriptorContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITypeDescriptorContext interface

Namespace: `System.ComponentModel`

```csharp
public interface ITypeDescriptorContext : IServiceProvider
```

Provides contextual information about a component, such as its container and property descriptor.

#### Remarks
The `ITypeDescriptorContext` interface provides contextual information about a component. `ITypeDescriptorContext` is typically used at design time to provide information about a design-time container. This interface is commonly used in type conversion. For details, see `TypeConverter`.

> **Note:**
>  Do not rely on the presence of this interface when you design a type converter. If a particular interface, property, or service is necessary but not available, the type converter should return `null` rather than throw an exception. This interface's properties can return `null` at any time, and you should plan for this.

#### Examples
The following code example demonstrates how to use the `ITypeDescriptorContext` interface to support type conversion.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ITypeDescriptorContext/Overview/instancedescriptor.cs._

## ITypeDescriptorContext.Container property

```csharp
public System.ComponentModel.IContainer? Container { get; }
```

Gets the container representing this `TypeDescriptor` request.

Returns: An `IContainer` with the set of objects for this `TypeDescriptor`; otherwise, `null` if there is no container or if the `TypeDescriptor` does not use outside objects.

#### Remarks
The `Container` property gets the logical container of the component associated with the type descriptor.

## ITypeDescriptorContext.Instance property

```csharp
public object? Instance { get; }
```

Gets the object that is connected with this type descriptor request.

Returns: The object that invokes the method on the `TypeDescriptor`; otherwise, `null` if there is no object responsible for the call.

#### Remarks
The `Instance` property gets the object that is invoking the `ITypeDescriptorContext` interface. For example, if a type converter is given a `Color` to convert, `ITypeDescriptorContext.Instance` returns the actual instance of the control that is using the `Color`. You can subsequently query the control for further information about its services and its `ITypeDescriptorContext.Container`.

## ITypeDescriptorContext.PropertyDescriptor property

```csharp
public System.ComponentModel.PropertyDescriptor? PropertyDescriptor { get; }
```

Gets the `PropertyDescriptor` that is associated with the given context item.

Returns: The `PropertyDescriptor` that describes the given context item; otherwise, `null` if there is no `PropertyDescriptor` responsible for the call.

To be added.

## ITypeDescriptorContext.OnComponentChanged() method

```csharp
public void OnComponentChanged ();
```

Raises the `IComponentChangeService.ComponentChanged` event.

#### Remarks
Use the `ITypeDescriptorContext.OnComponentChanged` method to send notification that an instance of an object has changed.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `ITypeDescriptorContext.OnComponentChanged` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

## ITypeDescriptorContext.OnComponentChanging() method

```csharp
public bool OnComponentChanging ();
```

Raises the `IComponentChangeService.ComponentChanging` event.

Returns: `true` if this object can be changed; otherwise, `false`.

#### Remarks
Use the `ITypeDescriptorContext.OnComponentChanging` method to send notification that an instance of an object is about to be changed. This method also returns a value indicating whether this object can be changed. When `false` is returned, do not change the object.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `ITypeDescriptorContext.OnComponentChanging` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

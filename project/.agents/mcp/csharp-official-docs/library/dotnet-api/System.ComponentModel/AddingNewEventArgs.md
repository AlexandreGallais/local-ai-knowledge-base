---
title: "AddingNewEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AddingNewEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AddingNewEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class AddingNewEventArgs : EventArgs
```

Provides data for the `BindingSource.AddingNew` event.

#### Remarks
The `AddingNewEventArgs` class provides data for the `AddingNew` event, which signals that an item is about to be added to a collection. The event gives the programmer, within the event handler `AddingNewEventHandler`, the option of supplying the new object by setting the `NewObject` property to this new item. If this property is not set, the collection will typically use the parameterless constructor of the appropriate type to construct a new item. In either case, the new item will be added to the collection.

If the collection also implements the `ICancelAddNew` interface, the item will be provisionally added, waiting a subsequent commit or rollback.

This event is commonly used in data-binding scenarios, within classes such as `BindingSource` and `BindingList<T>`.

For more information about how to handle events, see Handling and Raising Events.

#### Examples
The following code example demonstrates how to use the `AddingNewEventArgs` class to handle the `AddingNew` event. This code example is part of a larger example provided in How to: Customize Item Addition with the Windows Forms BindingSource.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AddingNewEventArgs/Overview/form1.cs._

## AddingNewEventArgs.AddingNewEventArgs() constructor

```csharp
public AddingNewEventArgs ();
```

Initializes a new instance of the `AddingNewEventArgs` class using no parameters.

#### Remarks
The parameterless constructor sets the `NewObject` property to `null`. A value that is `null` indicates that, if the `AddingNewEventHandler` does not explicitly set this property, the collection will take standard steps to provide a new item to add to itself.

## AddingNewEventArgs.AddingNewEventArgs(Object) constructor

```csharp
public AddingNewEventArgs (object? newObject);
```

Initializes a new instance of the `AddingNewEventArgs` class using the specified object as the new item.

Parameters:

- `newObject`: An `Object` to use as the new item value.

#### Remarks
The `AddingNewEventArgs.%23ctor` constructor sets the `NewObject` property to the `newObject` parameter. This object will be used as the new item to be added to the associated collection, unless this property is updated by the event handler.

## AddingNewEventArgs.NewObject property

```csharp
public object? NewObject { get; set; }
```

Gets or sets the object to be added to the binding list.

Returns: The `Object` to be added as a new item to the associated collection.

#### Remarks
If the `NewObject` property is set to `null`, it indicates that the collection is to take the standard action, which typically entails creating an object of the appropriate type using its parameterless constructor, and then adding it to the collection.

#### Examples
The following code example demonstrates how to use the `AddingNewEventArgs` class to handle the `AddingNew` event. This code example is part of a larger example provided in How to: Customize Item Addition with the Windows Forms BindingSource.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AddingNewEventArgs/Overview/form1.cs._

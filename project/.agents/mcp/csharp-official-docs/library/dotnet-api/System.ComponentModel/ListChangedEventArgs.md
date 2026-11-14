---
title: "ListChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ListChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListChangedEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class ListChangedEventArgs : EventArgs
```

Provides data for the `IBindingList.ListChanged` event.

#### Remarks
A `ListChanged` event is raised when the data in an `IBindingList` changes.

The `NewIndex` property indicates the index of the item that was added, changed, or deleted. If an item was moved, the `NewIndex` property indicates the new location of the item and the `OldIndex` property indicates the old location.

If only one item is affected by a change, the `OldIndex` property value is -1.

#### Examples
The following code example demonstrates the use of this type. In the example, an event handler reports on the occurrence of the `ListChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `BindingSource` named `BindingSource1`. Then ensure that the event handler is associated with the `ListChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## ListChangedEventArgs.ListChangedEventArgs(ListChangedType, PropertyDescriptor) constructor

```csharp
public ListChangedEventArgs (System.ComponentModel.ListChangedType listChangedType, System.ComponentModel.PropertyDescriptor? propDesc);
```

Initializes a new instance of the `ListChangedEventArgs` class given the type of change and the `PropertyDescriptor` affected.

Parameters:

- `listChangedType`: A `ListChangedType` value indicating the type of change.
- `propDesc`: The `PropertyDescriptor` that was added, removed, or changed.

#### Remarks
This constructor can be used only if the schema of the object has changed.

The `listChangedType` parameter should be `PropertyDescriptorAdded`, `PropertyDescriptorChanged`, or `PropertyDescriptorDeleted`.

## ListChangedEventArgs.ListChangedEventArgs(ListChangedType, Int32) constructor

```csharp
public ListChangedEventArgs (System.ComponentModel.ListChangedType listChangedType, int newIndex);
```

Initializes a new instance of the `ListChangedEventArgs` class given the type of change and the index of the affected item.

Parameters:

- `listChangedType`: A `ListChangedType` value indicating the type of change.
- `newIndex`: The index of the item that was added, changed, or removed.

#### Remarks
Use this constructor if only one item is affected by a change. In this case, the `OldIndex` property is set to -1.

## ListChangedEventArgs.ListChangedEventArgs(ListChangedType, Int32, PropertyDescriptor) constructor

```csharp
public ListChangedEventArgs (System.ComponentModel.ListChangedType listChangedType, int newIndex, System.ComponentModel.PropertyDescriptor? propDesc);
```

Initializes a new instance of the `ListChangedEventArgs` class given the type of change, the index of the affected item, and a `PropertyDescriptor` describing the affected item.

Parameters:

- `listChangedType`: A `ListChangedType` value indicating the type of change.
- `newIndex`: The index of the item that was added or changed.
- `propDesc`: The `PropertyDescriptor` describing the item.

To be added.

## ListChangedEventArgs.ListChangedEventArgs(ListChangedType, Int32, Int32) constructor

```csharp
public ListChangedEventArgs (System.ComponentModel.ListChangedType listChangedType, int newIndex, int oldIndex);
```

Initializes a new instance of the `ListChangedEventArgs` class given the type of change and the old and new index of the item that was moved.

Parameters:

- `listChangedType`: A `ListChangedType` value indicating the type of change.
- `newIndex`: The new index of the item that was moved.
- `oldIndex`: The old index of the item that was moved.

To be added.

## ListChangedEventArgs.ListChangedType property

```csharp
public System.ComponentModel.ListChangedType ListChangedType { get; }
```

Gets the type of change.

Returns: A `ListChangedType` value indicating the type of change.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `ListChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `BindingSource` named `BindingSource1`. Then ensure that the event handler is associated with the `ListChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## ListChangedEventArgs.NewIndex property

```csharp
public int NewIndex { get; }
```

Gets the index of the item affected by the change.

Returns: The index of the affected by the change.

#### Remarks
For items that have been moved, this property represents the new location of the item.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `ListChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `BindingSource` named `BindingSource1`. Then ensure that the event handler is associated with the `ListChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## ListChangedEventArgs.OldIndex property

```csharp
public int OldIndex { get; }
```

Gets the old index of an item that has been moved.

Returns: The old index of the moved item.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `ListChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `BindingSource` named `BindingSource1`. Then ensure that the event handler is associated with the `ListChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## ListChangedEventArgs.PropertyDescriptor property

```csharp
public System.ComponentModel.PropertyDescriptor? PropertyDescriptor { get; }
```

Gets the `PropertyDescriptor` that was added, changed, or deleted.

Returns: The `PropertyDescriptor` affected by the change.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `ListChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `BindingSource` named `BindingSource1`. Then ensure that the event handler is associated with the `ListChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

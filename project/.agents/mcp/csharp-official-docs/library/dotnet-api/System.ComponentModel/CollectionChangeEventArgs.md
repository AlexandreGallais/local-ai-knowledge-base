---
title: "CollectionChangeEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CollectionChangeEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionChangeEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class CollectionChangeEventArgs : EventArgs
```

Provides data for the `DataColumnCollection.CollectionChanged` event.

#### Remarks
A `CollectionChanged` event is raised when you change which items are in a collection, for example, by adding an element to a collection or removing an element from the collection. This event is not raised when an individual element changes its value.

#### Examples
The following code example demonstrates the use of this type. In the example, an event handler reports on the occurrence of the `CollectionChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `AutoCompleteStringCollection` named `AutoCompleteStringCollection1`. Then ensure that the event handler is associated with the `CollectionChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## CollectionChangeEventArgs.CollectionChangeEventArgs(CollectionChangeAction, Object) constructor

```csharp
public CollectionChangeEventArgs (System.ComponentModel.CollectionChangeAction action, object? element);
```

Initializes a new instance of the `CollectionChangeEventArgs` class.

Parameters:

- `action`: One of the `CollectionChangeAction` values that specifies how the collection changed.
- `element`: An `Object` that specifies the instance of the collection where the change occurred.

To be added.

## CollectionChangeEventArgs.Action property

```csharp
public virtual System.ComponentModel.CollectionChangeAction Action { get; }
```

Gets an action that specifies how the collection changed.

Returns: One of the `CollectionChangeAction` values.

#### Remarks
This property can have one of the following values:

|Action|Property value|
|------------|--------------------|
|An element was added to the collection|`CollectionChangeAction.Add`|
|An element was removed from the collection|`CollectionChangeAction.Remove`|
|The collection was completely changed|`CollectionChangeAction.Refresh`|

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `CollectionChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `AutoCompleteStringCollection` named `AutoCompleteStringCollection1`. Then ensure that the event handler is associated with the `CollectionChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## CollectionChangeEventArgs.Element property

```csharp
public virtual object? Element { get; }
```

Gets the instance of the collection with the change.

Returns: An `Object` that represents the instance of the collection with the change, or `null` if you refresh the collection.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `CollectionChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `AutoCompleteStringCollection` named `AutoCompleteStringCollection1`. Then ensure that the event handler is associated with the `CollectionChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

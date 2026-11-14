---
title: "NotifyCollectionChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NotifyCollectionChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotifyCollectionChangedEventArgs class

Namespace: `System.Collections.Specialized`

```csharp
public class NotifyCollectionChangedEventArgs : EventArgs
```

Provides data for the `INotifyCollectionChanged.CollectionChanged` event.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a `NotifyCollectionChangedAction.Reset` change.

Parameters:

- `action`: The action that caused the event. This must be set to `NotifyCollectionChangedAction.Reset`.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, IList) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, System.Collections.IList? changedItems);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a multi-item change.

Parameters:

- `action`: The action that caused the event. This can be set to `NotifyCollectionChangedAction.Reset`, `NotifyCollectionChangedAction.Add`, or `NotifyCollectionChangedAction.Remove`.
- `changedItems`: The items that are affected by the change.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, Object) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, object? changedItem);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a one-item change.

Parameters:

- `action`: The action that caused the event. This can be set to `NotifyCollectionChangedAction.Reset`, `NotifyCollectionChangedAction.Add`, or `NotifyCollectionChangedAction.Remove`.
- `changedItem`: The item that is affected by the change.

Exceptions:

- `ArgumentException`: If `action` is not Reset, Add, or Remove, or if `action` is Reset and `changedItem` is not null.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, IList, IList) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, System.Collections.IList newItems, System.Collections.IList oldItems);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a multi-item `NotifyCollectionChangedAction.Replace` change.

Parameters:

- `action`: The action that caused the event. This can only be set to `NotifyCollectionChangedAction.Replace`.
- `newItems`: The new items that are replacing the original items.
- `oldItems`: The original items that are replaced.

Exceptions:

- `ArgumentException`: If `action` is not Replace.
- `ArgumentNullException`: If `oldItems` or `newItems` is null.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, IList, Int32) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, System.Collections.IList? changedItems, int startingIndex);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a multi-item change or a `NotifyCollectionChangedAction.Reset` change.

Parameters:

- `action`: The action that caused the event. This can be set to `NotifyCollectionChangedAction.Reset`, `NotifyCollectionChangedAction.Add`, or `NotifyCollectionChangedAction.Remove`.
- `changedItems`: The items affected by the change.
- `startingIndex`: The index where the change occurred.

Exceptions:

- `ArgumentException`: If `action` is not Reset, Add, or Remove, if `action` is Reset and either `changedItems` is not null or `startingIndex` is not -1, or if action is Add or Remove and `startingIndex` is less than -1.
- `ArgumentNullException`: If `action` is Add or Remove and `changedItems` is null.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, Object, Int32) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, object? changedItem, int index);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a one-item change.

Parameters:

- `action`: The action that caused the event. This can be set to `NotifyCollectionChangedAction.Reset`, `NotifyCollectionChangedAction.Add`, or `NotifyCollectionChangedAction.Remove`.
- `changedItem`: The item that is affected by the change.
- `index`: The index where the change occurred.

Exceptions:

- `ArgumentException`: If `action` is not Reset, Add, or Remove, or if `action` is Reset and either `changedItem` is not null or `index` is not -1.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, Object, Object) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, object? newItem, object? oldItem);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a one-item `NotifyCollectionChangedAction.Replace` change.

Parameters:

- `action`: The action that caused the event. This can only be set to `NotifyCollectionChangedAction.Replace`.
- `newItem`: The new item that is replacing the original item.
- `oldItem`: The original item that is replaced.

Exceptions:

- `ArgumentException`: If `action` is not Replace.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, IList, IList, Int32) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, System.Collections.IList newItems, System.Collections.IList oldItems, int startingIndex);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a multi-item `NotifyCollectionChangedAction.Replace` change.

Parameters:

- `action`: The action that caused the event. This can only be set to `NotifyCollectionChangedAction.Replace`.
- `newItems`: The new items that are replacing the original items.
- `oldItems`: The original items that are replaced.
- `startingIndex`: The index of the first item of the items that are being replaced.

Exceptions:

- `ArgumentException`: If `action` is not Replace.
- `ArgumentNullException`: If `oldItems` or `newItems` is null.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, IList, Int32, Int32) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, System.Collections.IList? changedItems, int index, int oldIndex);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a multi-item `NotifyCollectionChangedAction.Move` change.

Parameters:

- `action`: The action that caused the event. This can only be set to `NotifyCollectionChangedAction.Move`.
- `changedItems`: The items affected by the change.
- `index`: The new index for the changed items.
- `oldIndex`: The old index for the changed items.

Exceptions:

- `ArgumentException`: If `action` is not Move or `index` is less than 0.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, Object, Int32, Int32) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, object? changedItem, int index, int oldIndex);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a one-item `NotifyCollectionChangedAction.Move` change.

Parameters:

- `action`: The action that caused the event. This can only be set to `NotifyCollectionChangedAction.Move`.
- `changedItem`: The item affected by the change.
- `index`: The new index for the changed item.
- `oldIndex`: The old index for the changed item.

Exceptions:

- `ArgumentException`: If `action` is not Move or `index` is less than 0.

To be added.

## NotifyCollectionChangedEventArgs.NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction, Object, Object, Int32) constructor

```csharp
public NotifyCollectionChangedEventArgs (System.Collections.Specialized.NotifyCollectionChangedAction action, object? newItem, object? oldItem, int index);
```

Initializes a new instance of the `NotifyCollectionChangedEventArgs` class that describes a one-item `NotifyCollectionChangedAction.Replace` change.

Parameters:

- `action`: The action that caused the event. This can be set to `NotifyCollectionChangedAction.Replace`.
- `newItem`: The new item that is replacing the original item.
- `oldItem`: The original item that is replaced.
- `index`: The index of the item being replaced.

Exceptions:

- `ArgumentException`: If `action` is not Replace.

To be added.

## NotifyCollectionChangedEventArgs.Action property

```csharp
public System.Collections.Specialized.NotifyCollectionChangedAction Action { get; }
```

Gets the action that caused the event.

Returns: A `NotifyCollectionChangedAction` value that describes the action that caused the event.

To be added.

## NotifyCollectionChangedEventArgs.NewItems property

```csharp
public System.Collections.IList? NewItems { get; }
```

Gets the list of new items involved in the change.

Returns: The list of new items involved in the change.

To be added.

## NotifyCollectionChangedEventArgs.NewStartingIndex property

```csharp
public int NewStartingIndex { get; }
```

Gets the index at which the change occurred.

Returns: The zero-based index at which the change occurred.

To be added.

## NotifyCollectionChangedEventArgs.OldItems property

```csharp
public System.Collections.IList? OldItems { get; }
```

Gets the list of items affected by a `NotifyCollectionChangedAction.Replace`, Remove, or Move action.

Returns: The list of items affected by a `NotifyCollectionChangedAction.Replace`, Remove, or Move action.

To be added.

## NotifyCollectionChangedEventArgs.OldStartingIndex property

```csharp
public int OldStartingIndex { get; }
```

Gets the index at which a `NotifyCollectionChangedAction.Move`, Remove, or Replace action occurred.

Returns: The zero-based index at which a `NotifyCollectionChangedAction.Move`, Remove, or Replace action occurred.

To be added.

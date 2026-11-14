---
title: "CurrentChangingEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CurrentChangingEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CurrentChangingEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class CurrentChangingEventArgs : EventArgs
```

Provides information for the `ICollectionView.CurrentChanging` event.

#### Remarks
A collection that supports `ICollectionView` raises this event when the `ICollectionView.CurrentItem` is changing or when the content of the collection has been reset.

By default, the event is cancelable when the cause is a move-current operation (such as the `ICollectionView.MoveCurrentTo` and similar methods) and uncancelable when the cause is an irreversible change operation on the collection.

## CurrentChangingEventArgs.CurrentChangingEventArgs() constructor

```csharp
public CurrentChangingEventArgs ();
```

Initializes a new instance of the `CurrentChangingEventArgs` class.

#### Remarks
The default value of the `IsCancelable` property is `true`.

## CurrentChangingEventArgs.CurrentChangingEventArgs(Boolean) constructor

```csharp
public CurrentChangingEventArgs (bool isCancelable);
```

Initializes a new instance of the `CurrentChangingEventArgs` class with the specified `isCancelable` value.

Parameters:

- `isCancelable`: A value that indicates whether the event is cancelable.

To be added.

## CurrentChangingEventArgs.Cancel property

```csharp
public bool Cancel { get; set; }
```

Gets or sets a value that indicates whether to cancel the event.

Returns: `true` if the event is to be canceled; otherwise, `false`. The default value is `false`.

Exceptions:

- `InvalidOperationException`: If the value of `CurrentChangingEventArgs.IsCancelable` is `false`.

To be added.

## CurrentChangingEventArgs.IsCancelable property

```csharp
public bool IsCancelable { get; }
```

Gets a value that indicates whether the event is cancelable.

Returns: `true` if the event is cancelable, otherwise, `false`. The default value is `true`.

#### Remarks
By default, the event is cancelable when the cause is a move-current operation (such as the `ICollectionView.MoveCurrentTo` and similar methods) and uncancelable when the cause is an irreversible change operation on the collection.

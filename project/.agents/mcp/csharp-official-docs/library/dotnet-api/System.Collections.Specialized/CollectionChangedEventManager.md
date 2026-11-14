---
title: "CollectionChangedEventManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/CollectionChangedEventManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionChangedEventManager class

Namespace: `System.Collections.Specialized`

```csharp
public class CollectionChangedEventManager : System.Windows.WeakEventManager
```

Provides a `WeakEventManager` implementation so that you can use the "weak event listener" pattern to attach listeners for the `INotifyCollectionChanged.CollectionChanged` event.

#### Remarks
In order to be listeners in this pattern, your listener objects must implement `IWeakEventListener`. You do not need to implement `IWeakEventListener` on the class that is the source of the events.

## CollectionChangedEventManager.AddHandler(INotifyCollectionChanged, NotifyCollectionChangedEventArgs>) method

```csharp
public static void AddHandler (System.Collections.Specialized.INotifyCollectionChanged source, EventHandler<System.Collections.Specialized.NotifyCollectionChangedEventArgs> handler);
```

Adds the specified event handler, which is called when specified source raises the `INotifyCollectionChanged.CollectionChanged` event.

Parameters:

- `source`: The source object that the raises the `INotifyCollectionChanged.CollectionChanged` event.
- `handler`: The delegate that handles the `INotifyCollectionChanged.CollectionChanged` event.

To be added.

## CollectionChangedEventManager.AddListener(INotifyCollectionChanged, IWeakEventListener) method

```csharp
public static void AddListener (System.Collections.Specialized.INotifyCollectionChanged source, System.Windows.IWeakEventListener listener);
```

Adds the specified listener to the `INotifyCollectionChanged.CollectionChanged` event of the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The object to add as a listener.

To be added.

## CollectionChangedEventManager.NewListenerList() method

```csharp
protected override System.Windows.WeakEventManager.ListenerList NewListenerList ();
```

Returns a new object to contain listeners to the `INotifyCollectionChanged.CollectionChanged` event.

Returns: A new object to contain listeners to the `INotifyCollectionChanged.CollectionChanged` event.

To be added.

## CollectionChangedEventManager.RemoveHandler(INotifyCollectionChanged, NotifyCollectionChangedEventArgs>) method

```csharp
public static void RemoveHandler (System.Collections.Specialized.INotifyCollectionChanged source, EventHandler<System.Collections.Specialized.NotifyCollectionChangedEventArgs> handler);
```

Removes the specified event handler from the specified source.

Parameters:

- `source`: The source object that the raises the `INotifyCollectionChanged.CollectionChanged` event.
- `handler`: The delegate that handles the `INotifyCollectionChanged.CollectionChanged` event.

To be added.

## CollectionChangedEventManager.RemoveListener(INotifyCollectionChanged, IWeakEventListener) method

```csharp
public static void RemoveListener (System.Collections.Specialized.INotifyCollectionChanged source, System.Windows.IWeakEventListener listener);
```

Removes the specified listener from the `INotifyCollectionChanged.CollectionChanged` event of the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The listener to remove.

To be added.

## CollectionChangedEventManager.StartListening(Object) method

```csharp
protected override void StartListening (object source);
```

Begins listening for the `INotifyCollectionChanged.CollectionChanged` event on the specified source.

Parameters:

- `source`: The object with the event.

To be added.

## CollectionChangedEventManager.StopListening(Object) method

```csharp
protected override void StopListening (object source);
```

Stops listening for the `INotifyCollectionChanged.CollectionChanged` event on the specified source.

Parameters:

- `source`: The object with the event.

To be added.

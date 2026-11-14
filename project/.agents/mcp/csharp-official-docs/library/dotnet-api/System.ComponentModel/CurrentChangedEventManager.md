---
title: "CurrentChangedEventManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CurrentChangedEventManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CurrentChangedEventManager class

Namespace: `System.ComponentModel`

```csharp
public class CurrentChangedEventManager : System.Windows.WeakEventManager
```

Provides a `WeakEventManager` implementation so that you can use the "weak event listener" pattern to attach listeners for the `ICollectionView.CurrentChanged` event.

#### Remarks
In order to be listeners in this pattern, your listener objects must implement `IWeakEventListener`. You do not need to implement `IWeakEventListener` on the class that is the source of the events.

## CurrentChangedEventManager.AddHandler(ICollectionView, EventArgs>) method

```csharp
public static void AddHandler (System.ComponentModel.ICollectionView source, EventHandler<EventArgs> handler);
```

Adds the specified event handler, which is called when specified source raises the `ICollectionView.CurrentChanged` event.

Parameters:

- `source`: The source object that the raises the `ICollectionView.CurrentChanged` event.
- `handler`: The source object that the raises the `ICollectionView.CurrentChanged` event.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.

#### Remarks
Use this method to specify the event handler you want to use to subscribe to the `CurrentChanged` event. When you use this method, your listener object does not need to implement the `IWeakEventListener` interface.

## CurrentChangedEventManager.AddListener(ICollectionView, IWeakEventListener) method

```csharp
public static void AddListener (System.ComponentModel.ICollectionView source, System.Windows.IWeakEventListener listener);
```

Adds the specified listener to the `ICollectionView.CurrentChanged` event of the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The object to add as a listener.

To be added.

## CurrentChangedEventManager.NewListenerList() method

```csharp
protected override System.Windows.WeakEventManager.ListenerList NewListenerList ();
```

Returns a new object to contain listeners to the `ICollectionView.CurrentChanged` event.

Returns: A new object to contain listeners to the `ICollectionView.CurrentChanged` event.

To be added.

## CurrentChangedEventManager.RemoveHandler(ICollectionView, EventArgs>) method

```csharp
public static void RemoveHandler (System.ComponentModel.ICollectionView source, EventHandler<EventArgs> handler);
```

Removes the specified event handler from the specified source.

Parameters:

- `source`: The source object that the raises the `ICollectionView.CurrentChanged` event.
- `handler`: The delegate that handles the `ICollectionView.CurrentChanged` event.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.

To be added.

## CurrentChangedEventManager.RemoveListener(ICollectionView, IWeakEventListener) method

```csharp
public static void RemoveListener (System.ComponentModel.ICollectionView source, System.Windows.IWeakEventListener listener);
```

Removes the specified listener from the `ICollectionView.CurrentChanged` event of the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The listener to remove.

To be added.

## CurrentChangedEventManager.StartListening(Object) method

```csharp
protected override void StartListening (object source);
```

Begins listening for the `ICollectionView.CurrentChanged` event on the specified source.

Parameters:

- `source`: The object with the event.

To be added.

## CurrentChangedEventManager.StopListening(Object) method

```csharp
protected override void StopListening (object source);
```

Stops listening for the `ICollectionView.CurrentChanged` event on the specified source.

Parameters:

- `source`: The object with the event.

To be added.

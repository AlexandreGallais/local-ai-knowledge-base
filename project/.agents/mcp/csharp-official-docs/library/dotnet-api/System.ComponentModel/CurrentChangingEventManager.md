---
title: "CurrentChangingEventManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CurrentChangingEventManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CurrentChangingEventManager class

Namespace: `System.ComponentModel`

```csharp
public class CurrentChangingEventManager : System.Windows.WeakEventManager
```

Provides a `WeakEventManager` implementation so that you can use the "weak event listener" pattern to attach listeners for the `ICollectionView.CurrentChanging` event.

#### Remarks
In order to be listeners in this pattern, your listener objects must implement `IWeakEventListener`. You do not need to implement `IWeakEventListener` on the class that is the source of the events.

## CurrentChangingEventManager.AddHandler(ICollectionView, CurrentChangingEventArgs>) method

```csharp
public static void AddHandler (System.ComponentModel.ICollectionView source, EventHandler<System.ComponentModel.CurrentChangingEventArgs> handler);
```

Adds the specified event handler, which is called when specified source raises the `ICollectionView.CurrentChanging` event.

Parameters:

- `source`: The source object that the raises the `ICollectionView.CurrentChanging` event.
- `handler`: The delegate that handles the `ICollectionView.CurrentChanging` event.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.

#### Remarks
Use this method to specify the event handler you want to use to subscribe to the `CurrentChanging` event. When you use this method, your listener object does not need to implement the `IWeakEventListener` interface.

## CurrentChangingEventManager.AddListener(ICollectionView, IWeakEventListener) method

```csharp
public static void AddListener (System.ComponentModel.ICollectionView source, System.Windows.IWeakEventListener listener);
```

Adds the specified listener to the `ICollectionView.CurrentChanging` event of the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The object to add as a listener.

To be added.

## CurrentChangingEventManager.NewListenerList() method

```csharp
protected override System.Windows.WeakEventManager.ListenerList NewListenerList ();
```

Returns a new object to contain listeners to the `ICollectionView.CurrentChanging` event.

Returns: A new object to contain listeners to the `ICollectionView.CurrentChanging` event.

To be added.

## CurrentChangingEventManager.RemoveHandler(ICollectionView, CurrentChangingEventArgs>) method

```csharp
public static void RemoveHandler (System.ComponentModel.ICollectionView source, EventHandler<System.ComponentModel.CurrentChangingEventArgs> handler);
```

Removes the specified event handler from the specified source.

Parameters:

- `source`: The source object that the raises the `ICollectionView.CurrentChanging` event.
- `handler`: The delegate that handles the `ICollectionView.CurrentChanging` event.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.

To be added.

## CurrentChangingEventManager.RemoveListener(ICollectionView, IWeakEventListener) method

```csharp
public static void RemoveListener (System.ComponentModel.ICollectionView source, System.Windows.IWeakEventListener listener);
```

Removes the specified listener from the `ICollectionView.CurrentChanging` event of the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The listener to remove.

To be added.

## CurrentChangingEventManager.StartListening(Object) method

```csharp
protected override void StartListening (object source);
```

Begins listening for the `ICollectionView.CurrentChanging` event on the specified source.

Parameters:

- `source`: The object with the event.

To be added.

## CurrentChangingEventManager.StopListening(Object) method

```csharp
protected override void StopListening (object source);
```

Stops listening for the `ICollectionView.CurrentChanging` event on the specified source.

Parameters:

- `source`: The object with the event.

To be added.

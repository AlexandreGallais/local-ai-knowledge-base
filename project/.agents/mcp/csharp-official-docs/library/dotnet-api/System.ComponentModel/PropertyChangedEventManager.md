---
title: "PropertyChangedEventManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyChangedEventManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyChangedEventManager class

Namespace: `System.ComponentModel`

```csharp
public class PropertyChangedEventManager : System.Windows.WeakEventManager
```

Provides a `WeakEventManager` implementation so that you can use the "weak event listener" pattern to attach listeners for the `INotifyPropertyChanged.PropertyChanged` event.

#### Remarks
In order to be listeners in this pattern, your listener objects must implement `IWeakEventListener`. You do not need to implement `IWeakEventListener` on the class that is the source of the events.

## PropertyChangedEventManager.AddHandler(INotifyPropertyChanged, PropertyChangedEventArgs>, String) method

```csharp
public static void AddHandler (System.ComponentModel.INotifyPropertyChanged source, EventHandler<System.ComponentModel.PropertyChangedEventArgs> handler, string propertyName);
```

Adds the specified event handler, which is called when specified source raises the `INotifyPropertyChanged.PropertyChanged` event for the specified property.

Parameters:

- `source`: The source object that the raises the `INotifyPropertyChanged.PropertyChanged` event.
- `handler`: The delegate that handles the `INotifyPropertyChanged.PropertyChanged` event.
- `propertyName`: The name of the property that exists on `source` upon which to listen for changes. Set to `String.Empty` to indicate "any property".

Exceptions:

- `ArgumentNullException`: `handler` is `null`.
- `NotSupportedException`: More than one method is associated with `handler`.

#### Remarks
Use this method to specify the event handler you want to use to subscribe to the `PropertyChanged` event. When you use this method, your listener object does not need to implement the `IWeakEventListener` interface.

## PropertyChangedEventManager.AddListener(INotifyPropertyChanged, IWeakEventListener, String) method

```csharp
public static void AddListener (System.ComponentModel.INotifyPropertyChanged source, System.Windows.IWeakEventListener listener, string propertyName);
```

Adds the specified listener to the list of listeners on the specified source.

Parameters:

- `source`: The object with the event.
- `listener`: The object to add as a listener.
- `propertyName`: The name of the property that exists on `source` upon which to listen for changes. Set to `String.Empty` to indicate "any property".

To be added.

## PropertyChangedEventManager.NewListenerList() method

```csharp
protected override System.Windows.WeakEventManager.ListenerList NewListenerList ();
```

Returns a new object to contain listeners to the `INotifyPropertyChanged.PropertyChanged` event.

Returns: A new object to contain listeners to the `INotifyPropertyChanged.PropertyChanged` event.

To be added.

## PropertyChangedEventManager.Purge(Object, Object, Boolean) method

```csharp
protected override bool Purge (object source, object data, bool purgeAll);
```

Removes listeners that are no longer active from the data for the provided source.

Parameters:

- `source`: Source object to remove all listeners from.
- `data`: The data to purge. This is expected to be a `HybridDictionary`.
- `purgeAll`: Set to `true` to stop listening and to completely remove all data.

Returns: `true` if some entries were removed; otherwise, `false`.

To be added.

## PropertyChangedEventManager.RemoveHandler(INotifyPropertyChanged, PropertyChangedEventArgs>, String) method

```csharp
public static void RemoveHandler (System.ComponentModel.INotifyPropertyChanged source, EventHandler<System.ComponentModel.PropertyChangedEventArgs> handler, string propertyName);
```

Removes the specified event handler from the specified source.

Parameters:

- `source`: The source object that the raises the `INotifyPropertyChanged.PropertyChanged` event.
- `handler`: The delegate that handles the `INotifyPropertyChanged.PropertyChanged` event.
- `propertyName`: The name of the property that exists on `source` upon which to stop listening for changes. Set to `String.Empty` to indicate "any property".

Exceptions:

- `ArgumentNullException`: `handler` is `null`.
- `NotSupportedException`: More than one method is associated with `handler`.

To be added.

## PropertyChangedEventManager.RemoveListener(INotifyPropertyChanged, IWeakEventListener, String) method

```csharp
public static void RemoveListener (System.ComponentModel.INotifyPropertyChanged source, System.Windows.IWeakEventListener listener, string propertyName);
```

Removes the specified listener from the list of listeners on the provided source.

Parameters:

- `source`: The object to remove the listener from.
- `listener`: The listener to remove.
- `propertyName`: The name of the property that exists on `source` upon which to stop listening for changes. Set to `String.Empty` to indicate "any property".

To be added.

## PropertyChangedEventManager.StartListening(Object) method

```csharp
protected override void StartListening (object source);
```

Begins listening for the `INotifyPropertyChanged.PropertyChanged` event on the provided source.

Parameters:

- `source`: The object on which to start listening for `INotifyPropertyChanged.PropertyChanged`.

#### Remarks
This does not specify a property; once the event manager is started, all properties on the source will have `PropertyChanged` notification enabled.

## PropertyChangedEventManager.StopListening(Object) method

```csharp
protected override void StopListening (object source);
```

Stops listening for the `INotifyPropertyChanged.PropertyChanged` event on the provided source.

Parameters:

- `source`: The source object on which to stop listening for `INotifyPropertyChanged.PropertyChanged`.

To be added.

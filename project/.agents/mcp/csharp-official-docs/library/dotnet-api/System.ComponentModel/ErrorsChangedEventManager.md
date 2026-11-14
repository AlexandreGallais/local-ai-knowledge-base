---
title: "ErrorsChangedEventManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ErrorsChangedEventManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ErrorsChangedEventManager class

Namespace: `System.ComponentModel`

```csharp
public class ErrorsChangedEventManager : System.Windows.WeakEventManager
```

Provides a `WeakEventManager` implementation so that you can use the weak event listener pattern to attach listeners for the `INotifyDataErrorInfo.ErrorsChanged` event.

To be added.

## ErrorsChangedEventManager.AddHandler(INotifyDataErrorInfo, DataErrorsChangedEventArgs>) method

```csharp
public static void AddHandler (System.ComponentModel.INotifyDataErrorInfo source, EventHandler<System.ComponentModel.DataErrorsChangedEventArgs> handler);
```

Adds the specified event handler, which is called when specified source raises the `INotifyDataErrorInfo.ErrorsChanged` event.

Parameters:

- `source`: The source object that raises the `INotifyDataErrorInfo.ErrorsChanged` event.
- `handler`: The delegate that handles the `INotifyDataErrorInfo.ErrorsChanged` event.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.

To be added.

## ErrorsChangedEventManager.NewListenerList() method

```csharp
protected override System.Windows.WeakEventManager.ListenerList NewListenerList ();
```

Returns a new object to contain listeners to the `INotifyDataErrorInfo.ErrorsChanged` event.

Returns: A new object to contain listeners to the `INotifyDataErrorInfo.ErrorsChanged` event.

To be added.

## ErrorsChangedEventManager.RemoveHandler(INotifyDataErrorInfo, DataErrorsChangedEventArgs>) method

```csharp
public static void RemoveHandler (System.ComponentModel.INotifyDataErrorInfo source, EventHandler<System.ComponentModel.DataErrorsChangedEventArgs> handler);
```

Removes the specified event handler from the specified source.

Parameters:

- `source`: The source object that raises the `INotifyDataErrorInfo.ErrorsChanged` event.
- `handler`: The delegate that handles the `INotifyDataErrorInfo.ErrorsChanged` event.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.

To be added.

## ErrorsChangedEventManager.StartListening(Object) method

```csharp
protected override void StartListening (object source);
```

Begins listening for the `INotifyDataErrorInfo.ErrorsChanged` event on the specified source.

Parameters:

- `source`: The source object that raises the `INotifyDataErrorInfo.ErrorsChanged` event.

To be added.

## ErrorsChangedEventManager.StopListening(Object) method

```csharp
protected override void StopListening (object source);
```

Stops listening for the `INotifyDataErrorInfo.ErrorsChanged` event on the specified source.

Parameters:

- `source`: The source object that raises the `INotifyDataErrorInfo.ErrorsChanged` event.

To be added.

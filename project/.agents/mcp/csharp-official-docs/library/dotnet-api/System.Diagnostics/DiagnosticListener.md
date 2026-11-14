---
title: "DiagnosticListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DiagnosticListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DiagnosticListener class

Namespace: `System.Diagnostics`

```csharp
public class DiagnosticListener : System.Diagnostics.DiagnosticSource, IDisposable, IObservable<System.Collections.Generic.KeyValuePair<string,object>>
```

Provides an implementation of the abstract `DiagnosticSource` class that represents a named place to which a source sends its information (events).

#### Remarks

`DiagnosticListener` is a NotificationSource, which means the returned result can be used to  log notifications, but it also has a `DiagnosticListener.Subscribe` method so notifications can be forwarded arbitrarily. Thus, its job is to forward things from the producer to all the listeners (multi-casting). Generally, you should not be making your own `DiagnosticListener` but use the default, so that notifications are as public as possible.

For more information on the `DiagnosticSource` and `DiagnosticListener` classes, see DiagnosticSource User's Guide.

## DiagnosticListener.DiagnosticListener(String) constructor

```csharp
public DiagnosticListener (string name);
```

Creates a new `DiagnosticListener`.

Parameters:

- `name`: The name of this `DiagnosticListener`.

To be added.

## DiagnosticListener.AllListeners property

```csharp
public static IObservable<System.Diagnostics.DiagnosticListener> AllListeners { get; }
```

Gets the collection of listeners for this `DiagnosticListener`.

Returns: To be added.

When you subscribe to this, you get callbacks for all NotificationListeners in the appdomain, as well as those that occurred in the past, and all future Listeners created in the future.

## DiagnosticListener.Name property

```csharp
public string Name { get; }
```

Gets the name of this `DiagnosticListener`.

Returns: The name of the `DiagnosticListener`.

To be added.

## DiagnosticListener.Dispose() method

```csharp
public virtual void Dispose ();
```

Disposes the NotificationListeners.

Notification listeners do not die on their own because they are in a global list (for discoverability). You must dispose of them explicitly. Note that we do not do the `Dispose(bool)` pattern because we don't want to support subclasses that have non-managed state.

## DiagnosticListener.IsEnabled() method

```csharp
public bool IsEnabled ();
```

Determines whether there are any registered subscribers.

Returns: `true` if there are any registered subscribers, `false` otherwise.

If setup for the notification is expensive, you can call `IsEnabled()` before performing this setup. Producers may optionally call `IsEnabled()` before calling `IsEnabled` in performance-critical parts of the application to determine whether there are any listeners to the `DiagnosticListener`.

## DiagnosticListener.IsEnabled(String) method

```csharp
public override bool IsEnabled (string name);
```

Checks whether the `DiagnosticListener` is enabled.

Parameters:

- `name`: The name of the event to check.

Returns: `true` if notifications are enabled; otherwise, `false`.

To be added.

## DiagnosticListener.IsEnabled(String, Object, Object) method

```csharp
public override bool IsEnabled (string name, object? arg1, object? arg2 = default);
```

Checks if any subscriber to the diagnostic events is interested in receiving events with this name. Subscribers indicate their interest using a delegate provided in `Subscribe`.

Parameters:

- `name`: The name of the event to check.
- `arg1`: The object that represents a context.
- `arg2`: The object that represents a context.

Returns: `true` if it is enabled, `false` otherwise.

To be added.

## DiagnosticListener.OnActivityExport(Activity, Object) method

```csharp
public override void OnActivityExport (System.Diagnostics.Activity activity, object? payload);
```

Invokes the OnActivityExport method of all the subscribers.

Parameters:

- `activity`: The activity affected by an external event.
- `payload`: An object that represents the outgoing request.

To be added.

## DiagnosticListener.OnActivityImport(Activity, Object) method

```csharp
public override void OnActivityImport (System.Diagnostics.Activity activity, object? payload);
```

Invokes the OnActivityImport method of all the subscribers.

Parameters:

- `activity`: The activity affected by an external event.
- `payload`: An object that represents the incoming request.

To be added.

## DiagnosticListener.Subscribe(Object>>) method

```csharp
public virtual IDisposable Subscribe (IObserver<System.Collections.Generic.KeyValuePair<string,object?>> observer);
```

Adds a subscriber.

Parameters:

- `observer`: A subscriber.

Returns: A reference to an interface that allows the listener to stop receiving notifications before the `DiagnosticSource` has finished sending them.

To be added.

## DiagnosticListener.Subscribe(Object>>, Boolean>) method

```csharp
public virtual IDisposable Subscribe (IObserver<System.Collections.Generic.KeyValuePair<string,object?>> observer, Func<string,object?,object?,bool>? isEnabled);
```

Adds a subscriber, and optionally filters events based on their name and up to two context objects.

Parameters:

- `observer`: A subscriber.
- `isEnabled`: A delegate that filters events based on their name and up to two context objects (which can be `null`), or `null` to if an event filter is not desirable.

Returns: A reference to an interface that allows the listener to stop receiving notifications before the `DiagnosticSource` has finished sending them.

If `isEnabled` is not `null`, it indicates that some events are uninteresting can be skipped for efficiency.

A particular instrumentation site has the option of calling one or more `DiagnosticListener.IsEnabled` overloads  in which it passes the name of the event and up to two other (instrumentation site specific) objects as arguments. If any of these `DiagnosticListener.IsEnabled` calls are made then this `isEnabled` predicate is invoked with passed values (if shorter overloads are used, `null` is passed for missing context objects).

This gives any particular instrumentation site the ability to pass up to two pieces of information to the subscriber to do sophisticated, efficient filtering. This requires more coupling between the instrumentation site and the subscriber code.

It is expected that a particular instrumentation site may call different overloads of `IsEnabled` for the same event, first calling `IsEnabled`, which calls the filter with two `null` context objects. If `isEnabled` returns `true`, it calls again with context objects. The `isEnabled` filter should be designed with this in mind.

Note that the `isEnabled` predicate is an optional optimization to allow the instrumentation site to avoid setting up the payload and calling `Write` when no subscriber cares about it. In particular, the instrumentation site has the option of ignoring the `DiagnosticListener.IsEnabled` predicate (not calling it) and simply calling `Write`. Thus, if the subscriber requires the filtering, it needs to do it itself.

If this parameter is `null`, no filtering is done (all overloads of `DiagnosticSource.IsEnabled` return `true`).

## DiagnosticListener.Subscribe(Object>>, String>) method

```csharp
public virtual IDisposable Subscribe (IObserver<System.Collections.Generic.KeyValuePair<string,object?>> observer, Predicate<string>? isEnabled);
```

Adds a subscriber, and optionally filters events based on their name.

Parameters:

- `observer`: A subscriber.
- `isEnabled`: A delegate that filters events based on their name (`String`). The delegate should return `true` if the event is enabled.

Returns: A reference to an interface that allows the listener to stop receiving notifications before the `DiagnosticSource` has finished sending them.

If `isEnabled` is not `null`, some events are uninteresting and can be skipped for efficiency. The `isEnabled` predicate is an optional optimization to allow the instrumentation site to avoid setting up the payload and calling `Write` when no subscriber cares about it. In particular the instrumentation site has the option of ignoring the `IsEnabled` predicate (not calling it) and simply calling `Write`. Thus if the subscriber requires the filtering, it needs to do it itself.

If `isEnabled` is `null`, no filtering is done (all overloads of `DiagnosticSource.IsEnabled` return `true`).

## DiagnosticListener.Subscribe(Object>>, Boolean>, Object>, Object>) method

```csharp
public virtual IDisposable Subscribe (IObserver<System.Collections.Generic.KeyValuePair<string,object?>> observer, Func<string,object?,object?,bool>? isEnabled, Action<System.Diagnostics.Activity,object?>? onActivityImport = default, Action<System.Diagnostics.Activity,object?>? onActivityExport = default);
```

Adds a subscriber, optionally filters events based on their name and up to two context objects, and specifies methods to call when providers import or export activites from outside the process.

Parameters:

- `observer`: A subscriber.
- `isEnabled`: A delegate that filters events based on their name and up to two context objects (which can be `null`), or `null` if an event filter is not desirable.
- `onActivityImport`: An action delegate that receives the activity affected by an external event and an object that represents the incoming request.
- `onActivityExport`: An action delegate that receives the activity affected by an external event and an object that represents the outgoing request.

Returns: A reference to an interface that allows the listener to stop receiving notifications before the `DiagnosticSource` has finished sending them.

If `isEnabled` is non-null, some events are uninteresting can be skipped for efficiency.

You can also supply 'onActivityImport' and 'onActivityExport' methods that are called when providers importing or export activities from outside the process (for example, from HTTP requests). These methods are called after importing or exporting the activity and can be used to modify the activity or the outgoing request to add policy.

## DiagnosticListener.ToString() method

```csharp
public override string ToString ();
```

Returns a string with the name of this DiagnosticListener.

Returns: The name of this DiagnosticListener.

To be added.

## DiagnosticListener.Write(String, Object) method

```csharp
public override void Write (string name, object? value);
```

Logs a notification.

Parameters:

- `name`: The name of the event to log.
- `value`: An object that represents the payload for the event.

For more information, see the `DiagnosticSource.Write` method.

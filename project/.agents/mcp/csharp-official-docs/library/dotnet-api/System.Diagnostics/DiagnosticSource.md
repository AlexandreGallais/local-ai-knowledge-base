---
title: "DiagnosticSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DiagnosticSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DiagnosticSource class

Namespace: `System.Diagnostics`

```csharp
public abstract class DiagnosticSource
```

An abstract class that allows code to be instrumented for production-time logging of rich data payloads for consumption within the process that was instrumented.

For more information, see DiagnosticSource User's Guide.

## DiagnosticSource.DiagnosticSource() constructor

```csharp
protected DiagnosticSource ();
```

Initializes an instance of the `DiagnosticSource` class.

To be added.

## DiagnosticSource.IsEnabled(String) method

```csharp
public abstract bool IsEnabled (string name);
```

Verifies if the notification event is enabled.

Parameters:

- `name`: The name of the event being written.

Returns: `true` if the notification event is enabled, `false` otherwise.

If there is expensive setup for the notification, you can call IsEnabled before performing this setup. Consumers should not assume that they only get notifications for which IsEnabled is true. However, it is optional for producers to call this API. The name should be the same as that passed to `Write`.

## DiagnosticSource.IsEnabled(String, Object, Object) method

```csharp
public virtual bool IsEnabled (string name, object? arg1, object? arg2 = default);
```

Verifies it the notification event is enabled.

Parameters:

- `name`: The name of the event being written.
- `arg1`: An object that represents the additional context for IsEnabled. Consumers should expect to receive `null`, which might indicate that producer called pure IsEnabled(string) to check if consumer wants to get notifications for such events at all. Based on that, producer may call IsEnabled(string, object, object) again with non-`null` context.
- `arg2`: Optional. An object that represents the additional context for IsEnabled. `null` by default. Consumers should expect to receive `null`, which might indicate that producer called pure IsEnabled(string) or producer passed all necessary context in `arg1`.

Returns: `true` if the notification event is enabled, `false` otherwise.

If there is expensive setup for the notification, you can call this method and provide context before performing the setup.

## DiagnosticSource.OnActivityExport(Activity, Object) method

```csharp
public virtual void OnActivityExport (System.Diagnostics.Activity activity, object? payload);
```

Transfers state from an activity to some event or operation, such as an outgoing HTTP request, that will occur outside the process.

Parameters:

- `activity`: The activity affected by an external event.
- `payload`: An object that represents the outgoing request.

If an instrumentation site is at a location where activities leave the process (such as outgoing HTTP requests), that site will want to transfer state from the activity to the outgoing request.

To the extent possible, this should be done by the instrumentation site, because there is a contract between an `Activity` and the ougoing request logic at the instrumentation site.   However, the instrumentation site can't handle policy (for example, whether activity information should be disabled or written in an older format for compatibility reasons).
For this, the instrumentation site needs to call back out to the logging system and ask it to resolve policy. This is the purpose of the `OnActivityExport` method.

The `OnActivityExport` method is given the `Activity` as well as a payload object that represents the outgoing request. A `DiagnosticSource` subscriber then has the ability to update the outgoing request before it is sent.

Note that this method is rarely used at instrumentation sites (only those sites that are on an outgoing boundary of the process).   Moreover, typically the default policy that the instrumentation site performs (for example, to transfer all activity state in a
particular outgoing convention) is likely to be fine. This method is only for cases where that is a problem. Thus, this method should be used very rarely and is mostly here for symetry with `OnActivityImport` and future-proofing.

Note that `payload` is typed as an `Object` here, but any particular instrumentation site and subscriber should know the type of the payload and thus cast and decode it if necessary.

## DiagnosticSource.OnActivityImport(Activity, Object) method

```csharp
public virtual void OnActivityImport (System.Diagnostics.Activity activity, object? payload);
```

Transfers state to an activity from some event or operation, such as an incoming request, that occurred outside the process.

Parameters:

- `activity`: The activity affected by an external event.
- `payload`: A payload that represents the incoming request.

If an instrumentation site creates a new activity in response to some event outside the process, such as an incoming HTTP request), the `OnActivityImport` method allows that site will want to create a new activity and transfer state from the incoming request to the activity.

To the extent possible, this should be done by the instrumentation site, because there is a contract between the `Activity` and the incoming request logic at the instrumentation site.   However, the instrumentation site can't handle policy. (For example, if sampling is done, exactly which requests should be sampled?) In these cases, the instrumentation site needs to call back out to the logging system and ask it to resolve policy (for example, to decide if the activity's "sampling" bit should be set). This is the purpose of the `OnActivityImport` method. It is given the activity as well as a payload object that represents the incoming request. The subscribers to the `DiagnosticSource` then have the opportunity to update this activity as desired.

This method is rarely used at instrumentation sites (only those sites that are on the boundary of the process), and the instrumetation site implements some default policy (it sets the activity in *some* way), and so it is not necessary to override this method if that default policy is fine. In other words, this method should be overridden in very rare (but often important) cases.

Note that `payload` is typed as `Object` here, but any particular instrumentation site and subscriber will know the type of the payload and thus cast and decode it if necessary.

## DiagnosticSource.StartActivity(Activity, Object) method

```csharp
public System.Diagnostics.Activity StartActivity (System.Diagnostics.Activity activity, object? args);
```

Starts an `Activity` and writes a start event.

Parameters:

- `activity`: The `Activity` to be started.
- `args`: An object that represent the value being passed as a payload for the event.

Returns: The started activity for convenient chaining.

The `Activity` describes the logical operation, its context, and parent relation; the current `Activity` flows through the operation processing.

This method starts the given `Activity`, maintains a global `Current` and `Parent` activity for the given `Activity`, and notifies consumers that a new `Activity` was started. Consumers can access `Current` to add context and/or augment telemetry.

Producers may pass <example-value> details to the consumer in the payload.

## DiagnosticSource.StartActivity<T>(Activity, T) method

```csharp
public System.Diagnostics.Activity StartActivity<T> (System.Diagnostics.Activity activity, T args);
```

To be added.

Parameters:

- `T`: The type of the value being passed as a payload for the event.
- `activity`: To be added.
- `args`: To be added.

Returns: To be added.

To be added.

## DiagnosticSource.StopActivity(Activity, Object) method

```csharp
public void StopActivity (System.Diagnostics.Activity activity, object? args);
```

Stops the given `Activity`, maintains the global `Activity.Current` activity, and notifies consumers that the `Activity` was stopped.

Parameters:

- `activity`: The activity to be stopped.
- `args`: An object that represents the value passed as a payload for the event.

Producers may pass <example-value> details to the consumer in the payload.

Consumers can access `Current` to add context and/or augment telemetry.

## DiagnosticSource.StopActivity<T>(Activity, T) method

```csharp
public void StopActivity<T> (System.Diagnostics.Activity activity, T args);
```

To be added.

Parameters:

- `T`: The type of the value being passed as a payload for the event.
- `activity`: To be added.
- `args`: To be added.

To be added.

## DiagnosticSource.Write(String, Object) method

```csharp
public abstract void Write (string name, object? value);
```

Provides a generic way of logging complex payloads.

Parameters:

- `name`: The name of the event being written.
- `value`: An object that represents the value being passed as a payload for the event. This is often an anonymous type that contains several subvalues.

Each notification is given a name that identifies it, as well as an object (typically an anonymous type) that provides arbitrary information to pass to the notification.

`name` should be short. Don't use a fully qualified name unless you have to to avoid ambiguity, since `name` must be globally unique. Typically, *componentName.eventName*, where *componentName* and *eventName* are strings less than 10 characters, are a good compromise.

Notification names should not have `.` in them because component names have dots, and for them both to have dots leads to ambiguity. We suggest that you use `_` instead.

Assume that listeners will use string prefixing to filter groups. Therefore, having a hierarchy of component names is a good practice.

## DiagnosticSource.Write<T>(String, T) method

```csharp
public void Write<T> (string name, T value);
```

To be added.

Parameters:

- `T`: The type of the value being passed as a payload for the event.
- `name`: To be added.
- `value`: To be added.

To be added.

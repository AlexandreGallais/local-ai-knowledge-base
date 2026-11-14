---
title: "ActivityListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityListener class

Namespace: `System.Diagnostics`

```csharp
public sealed class ActivityListener : IDisposable
```

Allows listening to the start and stop activity events and gives the opportunity to decide creating an activity for sampling scenarios.

To be added.

## ActivityListener.ActivityListener() constructor

```csharp
public ActivityListener ();
```

Construct a new activity listener object to start listening to the activity events.

To be added.

## ActivityListener.ActivityStarted property

```csharp
public Action<System.Diagnostics.Activity>? ActivityStarted { get; set; }
```

Gets or sets the callback used to listen to the activity start event.

Returns: An activity callback instance used to listen to the activity start event.

To be added.

## ActivityListener.ActivityStopped property

```csharp
public Action<System.Diagnostics.Activity>? ActivityStopped { get; set; }
```

Gets or sets the callback used to listen to the activity stop event.

Returns: An activity callback instance used to listen to the activity stop event.

To be added.

## ActivityListener.ExceptionRecorder property

```csharp
public System.Diagnostics.ExceptionRecorder? ExceptionRecorder { get; set; }
```

Gets or sets the callback used to listen to `Activity` events when exceptions are added.

Returns: To be added.

To be added.

## ActivityListener.Sample property

```csharp
public System.Diagnostics.SampleActivity<System.Diagnostics.ActivityContext>? Sample { get; set; }
```

Gets or sets the callback that is used to decide if creating `Activity` objects with a specific data state is allowed.

Returns: A sample activity instance.

To be added.

## ActivityListener.SampleUsingParentId property

```csharp
public System.Diagnostics.SampleActivity<string>? SampleUsingParentId { get; set; }
```

Gets or sets the callback that is used to decide if creating `Activity` objects with a specific data state is allowed.

Returns: A sample activity instance.

To be added.

## ActivityListener.ShouldListenTo property

```csharp
public Func<System.Diagnostics.ActivitySource,bool>? ShouldListenTo { get; set; }
```

Gets or sets the callback that allows deciding if activity object events that were created using the activity source object should be listened or not.

Returns: `true` to listen events; `false` otherwise.

To be added.

## ActivityListener.Dispose() method

```csharp
public void Dispose ();
```

Unregisters this activity listener object from listening to activity events.

To be added.

## ActivityListener.RefreshSources() method

```csharp
public void RefreshSources ();
```

To be added.

To be added.

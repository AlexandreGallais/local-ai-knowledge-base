---
title: "PipeScheduler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/PipeScheduler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeScheduler class

Namespace: `System.IO.Pipelines`

```csharp
public abstract class PipeScheduler
```

Abstraction for running `PipeReader` and `PipeWriter` callbacks and continuations.

To be added.

## PipeScheduler.PipeScheduler() constructor

```csharp
protected PipeScheduler ();
```

Initializes new a `PipeScheduler` instance.

To be added.

## PipeScheduler.Inline property

```csharp
public static System.IO.Pipelines.PipeScheduler Inline { get; }
```

The `PipeScheduler` implementation that runs callbacks inline.

Returns: A `PipeScheduler` instance that runs callbacks inline.

To be added.

## PipeScheduler.ThreadPool property

```csharp
public static System.IO.Pipelines.PipeScheduler ThreadPool { get; }
```

The `PipeScheduler` implementation that queues callbacks to the thread pool.

Returns: A `PipeScheduler` instance that queues callbacks to the thread pool.

To be added.

## PipeScheduler.Schedule(Object>, Object) method

```csharp
public abstract void Schedule (Action<object?> action, object? state);
```

Requests `action` to be run on scheduler with `state` being passed in.

Parameters:

- `action`: The single-parameter action delegate to schedule.
- `state`: The parameter to pass to the `action` delegate.

To be added.

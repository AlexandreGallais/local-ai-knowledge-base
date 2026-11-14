---
title: "Progress<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Progress`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Progress<T> class

Namespace: `System`

```csharp
public class Progress<T> : IProgress<T>
```

Provides an `IProgress<T>` that invokes callbacks for each reported progress value.

Parameters:

- `T`: Specifies the type of the progress report value.

#### Remarks
Any handler provided to the constructor or event handlers registered with the `ProgressChanged` event are invoked through a `SynchronizationContext` instance captured when the instance is constructed. If there is no current `SynchronizationContext` at the time of construction, the callbacks will be invoked on the `ThreadPool`.

For more information and a code example, see the blog post Async in 4.5: Enabling Progress and Cancellation in Async APIs.

## Progress<T>.Progress() constructor

```csharp
public Progress ();
```

Initializes the `Progress<T>` object.

To be added.

## Progress<T>.Progress(Action<T>) constructor

```csharp
public Progress (Action<T> handler);
```

Initializes the `Progress<T>` object with the specified callback.

Parameters:

- `handler`: A handler to invoke for each reported progress value. This handler will be invoked in addition to any delegates registered with the `Progress<T>.ProgressChanged` event. Depending on the `SynchronizationContext` instance captured by the `Progress<T>` at construction, it is possible that this handler instance could be invoked concurrently with itself.

Exceptions:

- `ArgumentNullException`: `handler` is `null` (`Nothing` in Visual Basic).

To be added.

## Progress<T>.OnReport(T) method

```csharp
protected virtual void OnReport (T value);
```

Reports a progress change.

Parameters:

- `value`: The value of the updated progress.

To be added.

## Progress<T>.System.IProgress<T>.Report(T) method

```csharp
void IProgress<T>.Report (T value);
```

Reports a progress change.

Parameters:

- `value`: The value of the updated progress.

To be added.

## Progress<T>.ProgressChanged event

```csharp
public event EventHandler<T>? ProgressChanged;
```

Raised for each reported progress value.

#### Remarks
Handlers registered with this event will be invoked on the `SynchronizationContext` captured when the instance was constructed.

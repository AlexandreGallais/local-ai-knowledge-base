---
title: "InitializingTraceSourceEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/InitializingTraceSourceEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InitializingTraceSourceEventArgs class

Namespace: `System.Diagnostics`

```csharp
public sealed class InitializingTraceSourceEventArgs : EventArgs
```

Provides data for the <see cref="E:System.Diagnostics.TraceSource.Initializing">TraceSource.Initializing</see> event.

To be added.

## InitializingTraceSourceEventArgs.InitializingTraceSourceEventArgs(TraceSource) constructor

```csharp
public InitializingTraceSourceEventArgs (System.Diagnostics.TraceSource traceSource);
```

Initializes a new instance of the `InitializingTraceSourceEventArgs` class.

Parameters:

- `traceSource`: The trace source that is being initialized.

To be added.

## InitializingTraceSourceEventArgs.TraceSource property

```csharp
public System.Diagnostics.TraceSource TraceSource { get; }
```

Gets the trace source that is being initialized.

Returns: To be added.

To be added.

## InitializingTraceSourceEventArgs.WasInitialized property

```csharp
public bool WasInitialized { get; set; }
```

Gets or sets a value indicating whether the trace source was initialized from configuration.

Returns: To be added.

To be added.

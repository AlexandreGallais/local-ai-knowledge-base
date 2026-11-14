---
title: "ConfigureAwaitOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/ConfigureAwaitOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigureAwaitOptions enum

Namespace: `System.Threading.Tasks`

```csharp
public enum ConfigureAwaitOptions
```

Options to control behavior when awaiting.

To be added.

## ConfigureAwaitOptions.ContinueOnCapturedContext field

```csharp
ContinueOnCapturedContext
```

Attempts to marshal the continuation back to the original `SynchronizationContext` or `TaskScheduler` present on the originating thread at the time of the await.

## ConfigureAwaitOptions.ForceYielding field

```csharp
ForceYielding
```

Forces an await on an already completed `Task` to behave as if the `Task` wasn't yet completed, such that the current asynchronous method will be forced to yield its execution.

## ConfigureAwaitOptions.None field

```csharp
None
```

No options specified.

## ConfigureAwaitOptions.SuppressThrowing field

```csharp
SuppressThrowing
```

Avoids throwing an exception at the completion of awaiting a `Task` that ends in the `TaskStatus.Faulted` or `TaskStatus.Canceled` state.

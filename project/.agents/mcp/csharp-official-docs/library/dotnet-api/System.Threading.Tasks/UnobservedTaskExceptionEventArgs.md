---
title: "UnobservedTaskExceptionEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/UnobservedTaskExceptionEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnobservedTaskExceptionEventArgs class

Namespace: `System.Threading.Tasks`

```csharp
public class UnobservedTaskExceptionEventArgs : EventArgs
```

Provides data for the event that is raised when a faulted `Task`'s exception goes unobserved.

#### Remarks
The Exception property is used to examine the exception without marking it as observed, whereas the `UnobservedTaskExceptionEventArgs.SetObserved` method is used to mark the exception as observed. Marking the exception as observed prevents it from triggering exception escalation policy. For more information, see the Remarks of the `UnobservedTaskException` event.

## UnobservedTaskExceptionEventArgs.UnobservedTaskExceptionEventArgs(AggregateException) constructor

```csharp
public UnobservedTaskExceptionEventArgs (AggregateException exception);
```

Initializes a new instance of the `UnobservedTaskExceptionEventArgs` class with the unobserved exception.

Parameters:

- `exception`: The Exception that has gone unobserved.

To be added.

## UnobservedTaskExceptionEventArgs.Exception property

```csharp
public AggregateException Exception { get; }
```

Gets the exception that went unobserved.

Returns: The exception that went unobserved.

To be added.

## UnobservedTaskExceptionEventArgs.Observed property

```csharp
public bool Observed { get; }
```

Gets a value that indicates whether this exception has been marked as "observed."

Returns: `true` if this exception has been marked as "observed"; otherwise `false`.

To be added.

## UnobservedTaskExceptionEventArgs.SetObserved() method

```csharp
public void SetObserved ();
```

Marks the `UnobservedTaskExceptionEventArgs.Exception` as "observed," thus preventing it from triggering exception escalation policy, which, by default, terminates the process.

To be added.

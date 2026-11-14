---
title: "ICriticalNotifyCompletion interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ICriticalNotifyCompletion.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICriticalNotifyCompletion interface

Namespace: `System.Runtime.CompilerServices`

```csharp
public interface ICriticalNotifyCompletion : System.Runtime.CompilerServices.INotifyCompletion
```

Represents an awaiter that schedules continuations when an await operation completes.

To be added.

## ICriticalNotifyCompletion.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action that's invoked when the instance completes.

Parameters:

- `continuation`: The action to invoke when the operation completes.

Exceptions:

- `ArgumentNullException`: The `continuation` argument is null (Nothing in Visual Basic).

#### Remarks
Unlike OnCompleted, UnsafeOnCompleted doesn't have to propagate ExecutionContext information.

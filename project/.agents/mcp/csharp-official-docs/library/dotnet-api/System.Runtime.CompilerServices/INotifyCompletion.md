---
title: "INotifyCompletion interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/INotifyCompletion.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INotifyCompletion interface

Namespace: `System.Runtime.CompilerServices`

```csharp
public interface INotifyCompletion
```

Represents an operation that schedules continuations when it completes.

To be added.

## INotifyCompletion.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Schedules the continuation action that's invoked when the instance completes.

Parameters:

- `continuation`: The action to invoke when the operation completes.

Exceptions:

- `ArgumentNullException`: The `continuation` argument is null (Nothing in Visual Basic).

To be added.

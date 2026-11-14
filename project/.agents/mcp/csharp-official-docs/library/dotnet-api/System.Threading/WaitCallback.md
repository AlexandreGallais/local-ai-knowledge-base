---
title: "WaitCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitCallback delegate

Namespace: `System.Threading`

```csharp
public delegate void WaitCallback(object? state);
```

Represents a callback method to be executed by a thread pool thread.

Parameters:

- `state`: An object containing information to be used by the callback method.

#### Remarks
`WaitCallback` represents a callback method that you want to execute on a `ThreadPool` thread. Create the delegate by passing your callback method to the `WaitCallback` constructor. Your method must have the signature shown here.

Queue the method for execution by passing the `WaitCallback` delegate to `ThreadPool.QueueUserWorkItem`. The callback method executes when a thread pool thread becomes available.

> **Note:**
>  Visual Basic users can omit the `WaitCallback` constructor, and simply use the `AddressOf` operator when passing the callback method to `ThreadPool.QueueUserWorkItem`. Visual Basic <example-value> calls the correct delegate constructor.

If you want to pass <example-value> to the callback method, create an object that contains the necessary information and pass it to the `QueueUserWorkItem` method as the second argument. Each time the callback method executes, the `state` parameter contains this object.

For examples that use the `WaitCallback` delegate, see the `ThreadPool.QueueUserWorkItem` method.

For more information about the thread pool, see The managed thread pool.

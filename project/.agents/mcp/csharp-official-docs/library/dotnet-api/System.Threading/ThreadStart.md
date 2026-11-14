---
title: "ThreadStart delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadStart.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadStart delegate

Namespace: `System.Threading`

```csharp
public delegate void ThreadStart();
```

Represents the method that executes on a `Thread`.

#### Remarks
When a managed thread is created, the method that executes on the thread is represented by a `ThreadStart` delegate or a `ParameterizedThreadStart` delegate that is passed to the `Thread.%23ctor` constructor. The thread does not begin executing until the `Thread.Start` method is called. Execution begins at the first line of the method represented by the `ThreadStart` or `ParameterizedThreadStart` delegate.

> **Note:**
> Visual Basic and C# users can omit the `ThreadStart` or `ParameterizedThreadStart` delegate constructor when creating a thread. In Visual Basic, use the `AddressOf` operator when passing your method to the `Thread.%23ctor` constructor; for example, `Dim t As New Thread(AddressOf ThreadProc)`. In C#, simply specify the name of the thread procedure. The compiler selects the correct delegate constructor.

#### Examples
The following code example shows the syntax for creating and using a `ThreadStart` delegate with an instance method and with a static method.

For another simple example that demonstrates how to create a `ThreadStart` delegate, see the `Start` method overload. For more information about thread creation, see Creating Threads and Passing Data at Start Time.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadStart/Overview/source.cs._

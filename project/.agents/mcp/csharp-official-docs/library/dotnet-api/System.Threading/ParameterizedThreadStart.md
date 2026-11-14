---
title: "ParameterizedThreadStart delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ParameterizedThreadStart.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParameterizedThreadStart delegate

Namespace: `System.Threading`

```csharp
public delegate void ParameterizedThreadStart(object? obj);
```

Represents the method that executes on a `Thread`.

Parameters:

- `obj`: An object that contains data for the thread procedure.

#### Remarks
When a managed thread is created, the method that executes on the thread is represented by:

- A `ThreadStart` delegate that is passed to the `%23ctor` constructor.  Any method that has no parameters and that returns `void` in C# or is a `Sub` procedure in Visual Basic can represent the delegate.

- A `ParameterizedThreadStart` delegate that is passed to the `%23ctor` constructor. Any method that has a single parameter of type `Object` and that returns void in C# or is a Sub procedure in Visual Basic can represent the delegate.

The thread does not begin executing until the `Thread.Start` method is called. The `ThreadStart` or `ParameterizedThreadStart` delegate is invoked on the thread, and execution begins at the first line of the method represented by the delegate. In the case of the `ParameterizedThreadStart` delegate, the object that is passed to the `Start` method is passed to the delegate.

> **Note:**
> Visual Basic and C# users can omit the `ThreadStart` or `ParameterizedThreadStart` delegate constructor when creating a thread. In Visual Basic, use the `AddressOf` operator when passing your method to the `Thread.%23ctor` constructor; for example, `Dim t As New Thread(AddressOf ThreadProc)`. In C#, simply specify the name of the thread procedure. The compiler selects the correct delegate constructor.

> **Note:**
> When you create a `ParameterizedThreadStart` delegate for an instance method in C++, the first parameter of the constructor is the instance variable. For a static method, the first parameter of the constructor is zero. For a static method, the delegate constructor requires only one parameter: the address of the callback method, qualified by the class name.

The `ParameterizedThreadStart` delegate and the `Start` method overload make it easy to pass data to a thread procedure, but this technique is not type safe because any object can be passed to `Start`. A more robust way to pass data to a thread procedure is to put both the thread procedure and the data fields into a worker object. For more information, see Creating Threads and Passing Data at Start Time.

The `ParameterizedThreadStart` delegate supports only a single parameter. You can pass <example-value> data items to the `ParameterizedThreadStart` by making that parameter one of the following:

- An array.
- A collection type, if all of the data items are of the same type.
- A tuple type, such as `Tuple<T1,T2>` or `Tuple<T1,T2,T3,T4>`.

#### Examples
The following code example uses a `ParameterizedThreadStart` delegate to execute a static method and an instance method. The first `ParameterizedThreadStart` delegate is represented by the static `DoWork` method and the second is represented by the instance `DoMoreWork` method. Both methods match the `ParameterizedThreadStart` delegate signature; that is, they have a single parameter of type `Object` and don't return a value.

> **Note:**
> The Visual Basic and C# compilers infer the `ParameterizedThreadStart` delegate from the signatures of the `DoWork` and `DoMoreWork` methods, and call the correct constructor. Thus, there is no explicit constructor call in the code.

_Code sample not included: ~/snippets/csharp/System.Threading/ParameterizedThreadStart/Overview/source.cs._

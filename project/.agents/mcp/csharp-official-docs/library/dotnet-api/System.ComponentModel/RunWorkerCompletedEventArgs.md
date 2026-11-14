---
title: "RunWorkerCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RunWorkerCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RunWorkerCompletedEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class RunWorkerCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the *MethodName*`Completed` event.

#### Remarks

When using the event-based asynchronous pattern for asynchronous operations, a Windows Forms form or control initiates an asynchronous operation by calling the `BackgroundWorker.RunWorkerAsync` method. The method in turn raises the `DoWork` event asynchronously and passes it a `DoWorkEventArgs` instance. If the asynchronous operation returns a value, the `DoWork` event handler typically assigns it to the `Result` property. When the asynchronous operation completes, the `RunWorkerCompleted` event is raised and is passed a `RunWorkerCompletedEventArgs` instance that contains information about the status of the operation (whether it was cancelled, faulted, or completed successfully). If it completed successfully, its `Result` property contains the value returned by the asynchronous operation and previously assigned to the `Result` property.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `SharedState`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example illustrates the use of `RunWorkerCompletedEventArgs`. This example is part of a larger sample for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## RunWorkerCompletedEventArgs.RunWorkerCompletedEventArgs(Object, Exception, Boolean) constructor

```csharp
public RunWorkerCompletedEventArgs (object? result, Exception? error, bool cancelled);
```

Initializes a new instance of the `RunWorkerCompletedEventArgs` class.

Parameters:

- `result`: The result of an asynchronous operation.
- `error`: Any error that occurred during the asynchronous operation.
- `cancelled`: A value indicating whether the asynchronous operation was canceled.

To be added.

## RunWorkerCompletedEventArgs.Result property

```csharp
public object? Result { get; }
```

Gets a value that represents the result of an asynchronous operation.

Returns: An `Object` representing the result of an asynchronous operation.

Exceptions:

- `TargetInvocationException`: `AsyncCompletedEventArgs.Error` is not `null`. The `Exception.InnerException` property holds a reference to `AsyncCompletedEventArgs.Error`.
- `InvalidOperationException`: `AsyncCompletedEventArgs.Cancelled` is `true`.

#### Remarks
Your `RunWorkerCompleted` event handler should always check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties before accessing the `Result` property. If an exception was raised or if the operation was canceled, accessing the `Result` property raises an exception.

#### Examples
The following code example demonstrates the use of the `RunWorkerCompleted` event to handle the result of an asynchronous operation. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## RunWorkerCompletedEventArgs.UserState property

```csharp
public object? UserState { get; }
```

Gets a value that represents the user state.

Returns: An `Object` representing the user state.

To be added.

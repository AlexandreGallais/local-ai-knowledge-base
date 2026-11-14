---
title: "BackgroundWorker class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BackgroundWorker.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BackgroundWorker class (part 2 of 2)

## BackgroundWorker.RunWorkerAsync(Object) method

```csharp
public void RunWorkerAsync (object? argument);
```

Starts execution of a background operation.

Parameters:

- `argument`: A parameter for use by the background operation to be executed in the `BackgroundWorker.DoWork` event handler.

Exceptions:

- `InvalidOperationException`: `BackgroundWorker.IsBusy` is `true`.

#### Remarks
The `BackgroundWorker.RunWorkerAsync` method submits a request to start the operation running asynchronously. When the request is serviced, the `DoWork` event is raised, which in turn starts execution of your background operation.

If your operation requires a parameter, you can provide it as the `argument` parameter to `BackgroundWorker.RunWorkerAsync`.

If the background operation is already running, calling `BackgroundWorker.RunWorkerAsync` again will raise an `InvalidOperationException`.

#### Examples
The following code example demonstrates the use of the `BackgroundWorker.RunWorkerAsync` method to start an asynchronous operation. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.DoWork event

```csharp
public event System.ComponentModel.DoWorkEventHandler? DoWork;
```

Occurs when `BackgroundWorker.RunWorkerAsync` is called.

#### Remarks
This event is raised when you call the `BackgroundWorker.RunWorkerAsync` method. This is where you start the operation that performs the potentially time-consuming work.

Your code in the `DoWork` event handler should periodically check the `CancellationPending` property value and abort the operation if it is `true`. When this occurs, you can set the `CancelEventArgs.Cancel` flag of `DoWorkEventArgs` to `true`, and the `AsyncCompletedEventArgs.Cancelled` flag of `RunWorkerCompletedEventArgs` in your `RunWorkerCompleted` event handler will be set to `true`.

> **Caution:**
>  Be aware that your code in the `DoWork` event handler may finish its work as a cancellation request is being made, and your polling loop may miss `BackgroundWorker.CancellationPending` being set to `true`. In this case, the `AsyncCompletedEventArgs.Cancelled` flag of `RunWorkerCompletedEventArgs` in your `RunWorkerCompleted` event handler will not be set to `true`, even though a cancellation request was made. This situation is called a *race condition* and is a common concern in multithreaded programming. For more information about multithreading design issues, see Managed Threading Best Practices.

If your operation produces a result, you can assign the result to the `Result` property. This will be available to the `RunWorkerCompleted` event handler in the `Result` property.

If the operation raises an exception that your code does not handle, the `BackgroundWorker` catches the exception and passes it into the `RunWorkerCompleted` event handler, where it is exposed as the `Error` property of `RunWorkerCompletedEventArgs`. If you are running under the Visual Studio debugger, the debugger will break at the point in the `DoWork` event handler where the unhandled exception was raised. If you have more than one `BackgroundWorker`, you should not reference any of them directly, as this would couple your `DoWork` event handler to a specific instance of `BackgroundWorker`. Instead, you should access your `BackgroundWorker` by casting the `sender` parameter in your `DoWork` event handler.

You must be careful not to manipulate any user-interface objects in your `DoWork` event handler. Instead, communicate to the user interface through the `BackgroundWorker` events.

For more information about how to handle events, see Handling and Raising Events.

#### Examples
The following code example demonstrates the use of the `DoWork` event to start an asynchronous operation. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.ProgressChanged event

```csharp
public event System.ComponentModel.ProgressChangedEventHandler? ProgressChanged;
```

Occurs when `BackgroundWorker.ReportProgress` is called.

#### Remarks
This event is raised when you call the `BackgroundWorker.ReportProgress` method.

For more information about how to handle events, see Handling and Raising Events.

#### Examples
The following code example demonstrates the use of the `ProgressChanged` event to report the progress of an asynchronous operation to the user. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.RunWorkerCompleted event

```csharp
public event System.ComponentModel.RunWorkerCompletedEventHandler? RunWorkerCompleted;
```

Occurs when the background operation has completed, has been canceled, or has raised an exception.

#### Remarks
This event is raised when the `DoWork` event handler returns.

If the operation completes successfully and its result is assigned in the `DoWork` event handler, you can access the result through the `Result` property.

The `Error` property of `RunWorkerCompletedEventArgs` indicates that an exception was thrown by the operation.

The `Cancelled` property of `RunWorkerCompletedEventArgs` indicates whether a cancellation request was processed by the background operation. If your code in the `DoWork` event handler detects a cancellation request by checking the `BackgroundWorker.CancellationPending` flag and setting the `CancelEventArgs.Cancel` flag of `DoWorkEventArgs` to `true`, the `AsyncCompletedEventArgs.Cancelled` flag of `RunWorkerCompletedEventArgs` also will be set to `true`.

> **Caution:**
>  Be aware that your code in the `DoWork` event handler may finish its work as a cancellation request is being made, and your polling loop may miss `BackgroundWorker.CancellationPending` being set to `true`. In this case, the `AsyncCompletedEventArgs.Cancelled` flag of `RunWorkerCompletedEventArgs` in your `RunWorkerCompleted` event handler will not be set to `true`, even though a cancellation request was made. This situation is called a *race condition* and is a common concern in multithreaded programming. For more information about multithreading design issues, see Managed Threading Best Practices.

Your `RunWorkerCompleted` event handler should always check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties before accessing the `Result` property. If an exception was raised or if the operation was canceled, accessing the `Result` property raises an exception.

#### Examples
The following code example demonstrates the use of the `RunWorkerCompleted` event to handle the result of an asynchronous operation. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

---
title: "BackgroundWorker class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BackgroundWorker.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BackgroundWorker class

Namespace: `System.ComponentModel`

```csharp
public class BackgroundWorker : System.ComponentModel.Component
```

Executes an operation on a separate thread.

#### Remarks
The `BackgroundWorker` class allows you to run an operation on a separate, dedicated thread. Time-consuming operations like downloads and database transactions can cause your user interface (UI) to seem as though it has stopped responding while they are running. When you want a responsive UI and you are faced with long delays associated with such operations, the `BackgroundWorker` class provides a convenient solution.

To execute a time-consuming operation in the background, create a `BackgroundWorker` and listen for events that report the progress of your operation and signal when your operation is finished. You can create the `BackgroundWorker` programmatically or you can drag it onto your form from the **Components** tab of the **Toolbox**. If you create the `BackgroundWorker` in the Windows Forms Designer, it will appear in the Component Tray, and its properties will be displayed in the Properties window.

To set up for a background operation, add an event handler for the `DoWork` event. Call your time-consuming operation in this event handler. To start the operation, call `BackgroundWorker.RunWorkerAsync`. To receive notifications of progress updates, handle the `ProgressChanged` event. To receive a notification when the operation is completed, handle the `RunWorkerCompleted` event.

> **Note:**
>  You must be careful not to manipulate any user-interface objects in your `DoWork` event handler. Instead, communicate to the user interface through the `ProgressChanged` and `RunWorkerCompleted` events.
>
>  `BackgroundWorker` events are not marshaled across `AppDomain` boundaries. Do not use a `BackgroundWorker` component to perform multithreaded operations in more than one `AppDomain`.

If your background operation requires a parameter, call `BackgroundWorker.RunWorkerAsync` with your parameter. Inside the `DoWork` event handler, you can extract the parameter from the `Argument` property.

For more information about `BackgroundWorker`, see How to: Run an Operation in the Background.

#### Examples
The following code example demonstrates the basics of the `BackgroundWorker` class for executing a time-consuming operation asynchronously. The following illustration shows an example of the output.

To try this code, create a Windows Forms application. Add a `Label` control named `resultLabel` and add two `Button` controls named `startAsyncButton` and `cancelAsyncButton`. Create `Click` event handlers for both buttons. From the **Components** tab of the Toolbox, add a `BackgroundWorker` component named `backgroundWorker1`. Create `DoWork`, `ProgressChanged`, and `RunWorkerCompleted` event handlers for the `BackgroundWorker`. In the code for the form, replace the existing code with the following code.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/form1.cs._

The following code example demonstrates the use of the `BackgroundWorker` class for executing a time-consuming operation asynchronously. The following illustration shows an example of the output.

The operation computes the selected Fibonacci number, reports progress updates as the calculation proceeds, and permits a pending calculation to be canceled.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.BackgroundWorker() constructor

```csharp
public BackgroundWorker ();
```

Initializes a new instance of the `BackgroundWorker` class.

#### Remarks
This constructor initializes a `BackgroundWorker`.

## BackgroundWorker.CancellationPending property

```csharp
public bool CancellationPending { get; }
```

Gets a value indicating whether the application has requested cancellation of a background operation.

Returns: `true` if the application has requested cancellation of a background operation; otherwise, `false`. The default is `false`.

#### Remarks
If `BackgroundWorker.CancellationPending` is `true`, then the `BackgroundWorker.CancelAsync` method has been called on the `BackgroundWorker`.

This property is meant for use by the worker thread, which should periodically check `BackgroundWorker.CancellationPending` and abort the background operation when it is set to `true`.

#### Examples
The following code example demonstrates the use of the `CancellationPending` property to query a `BackgroundWorker` about its cancellation state. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.IsBusy property

```csharp
public bool IsBusy { get; }
```

Gets a value indicating whether the `BackgroundWorker` is running an asynchronous operation.

Returns: `true`, if the `BackgroundWorker` is running an asynchronous operation; otherwise, `false`.

#### Remarks
The `BackgroundWorker` starts an asynchronous operation when you call `BackgroundWorker.RunWorkerAsync`.

#### Examples
The following code example demonstrates how to use the `IsBusy` property to wait for completion of a `BackgroundWorker` operation. This code example is part of a larger example described in How to: Download a File in the Background.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/IsBusy/Form1.cs._

## BackgroundWorker.WorkerReportsProgress property

```csharp
public bool WorkerReportsProgress { get; set; }
```

Gets or sets a value indicating whether the `BackgroundWorker` can report progress updates.

Returns: `true` if the `BackgroundWorker` supports progress updates; otherwise `false`. The default is `false`.

#### Remarks
Set the `WorkerReportsProgress` property to `true` if you want the `BackgroundWorker` to support progress updates. When this property is `true`, user code can call the `BackgroundWorker.ReportProgress` method to raise the `ProgressChanged` event.

## BackgroundWorker.WorkerSupportsCancellation property

```csharp
public bool WorkerSupportsCancellation { get; set; }
```

Gets or sets a value indicating whether the `BackgroundWorker` supports asynchronous cancellation.

Returns: `true` if the `BackgroundWorker` supports cancellation; otherwise `false`. The default is `false`.

#### Remarks
Set the `WorkerSupportsCancellation` property to `true` if you want the `BackgroundWorker` to support cancellation. When this property is `true`, you can call the `BackgroundWorker.CancelAsync` method to interrupt a background operation.

## BackgroundWorker.CancelAsync() method

```csharp
public void CancelAsync ();
```

Requests cancellation of a pending background operation.

Exceptions:

- `InvalidOperationException`: `BackgroundWorker.WorkerSupportsCancellation` is `false`.

#### Remarks
`BackgroundWorker.CancelAsync` submits a request to terminate the pending background operation and sets the `CancellationPending` property to `true`.

When you call `BackgroundWorker.CancelAsync`, your worker method has an opportunity to stop its execution and exit. The worker code should periodically check the `CancellationPending` property to see if it has been set to `true`.

> **Caution:**
>  Be aware that your code in the `DoWork` event handler may finish its work as a cancellation request is being made, and your polling loop may miss `BackgroundWorker.CancellationPending` being set to `true`. In this case, the `AsyncCompletedEventArgs.Cancelled` flag of `RunWorkerCompletedEventArgs` in your `RunWorkerCompleted` event handler will not be set to `true`, even though a cancellation request was made. This situation is called a *race condition* and is a common concern in multithreaded programming. For more information about multithreading design issues, see Managed Threading Best Practices.

#### Examples
The following code example demonstrates the use of the `BackgroundWorker.CancelAsync` method to cancel an asynchronous ("background") operation. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

This method does not do anything.

Parameters:

- `disposing`: This method does not do anything.

To be added.

## BackgroundWorker.OnDoWork(DoWorkEventArgs) method

```csharp
protected virtual void OnDoWork (System.ComponentModel.DoWorkEventArgs e);
```

Raises the `BackgroundWorker.DoWork` event.

Parameters:

- `e`: An `EventArgs` that contains the event data.

To be added.

## BackgroundWorker.OnProgressChanged(ProgressChangedEventArgs) method

```csharp
protected virtual void OnProgressChanged (System.ComponentModel.ProgressChangedEventArgs e);
```

Raises the `BackgroundWorker.ProgressChanged` event.

Parameters:

- `e`: An `EventArgs` that contains the event data.

#### Remarks
Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `BackgroundWorker.OnProgressChanged` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

#### Examples
The following code example demonstrates the use of the `BackgroundWorker.OnProgressChanged` method to report the progress of an asynchronous operation. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## BackgroundWorker.OnRunWorkerCompleted(RunWorkerCompletedEventArgs) method

```csharp
protected virtual void OnRunWorkerCompleted (System.ComponentModel.RunWorkerCompletedEventArgs e);
```

Raises the `BackgroundWorker.RunWorkerCompleted` event.

Parameters:

- `e`: An `EventArgs` that contains the event data.

#### Remarks
Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `BackgroundWorker.OnRunWorkerCompleted` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

## BackgroundWorker.ReportProgress(Int32) method

```csharp
public void ReportProgress (int percentProgress);
```

Raises the `BackgroundWorker.ProgressChanged` event.

Parameters:

- `percentProgress`: The percentage, from 0 to 100, of the background operation that is complete.

Exceptions:

- `InvalidOperationException`: The `BackgroundWorker.WorkerReportsProgress` property is set to `false`.

#### Remarks
If you need the background operation to report on its progress, you can call the `BackgroundWorker.ReportProgress` method to raise the `ProgressChanged` event. The `WorkerReportsProgress` property value must be `true`, or `BackgroundWorker.ReportProgress` will throw an `InvalidOperationException`.

It is up to you to implement a meaningful way of measuring your background operation's progress as a percentage of the total task completed.

The call to the `BackgroundWorker.ReportProgress` method is asynchronous and returns immediately. The `ProgressChanged` event handler executes on the thread that created the `BackgroundWorker`.

#### Examples
The following code example demonstrates the use of the `BackgroundWorker.ReportProgress` method to report the progress of an asynchronous operation to the user. This code example is part of a larger example provided for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## BackgroundWorker.ReportProgress(Int32, Object) method

```csharp
public void ReportProgress (int percentProgress, object? userState);
```

Raises the `BackgroundWorker.ProgressChanged` event.

Parameters:

- `percentProgress`: The percentage, from 0 to 100, of the background operation that is complete.
- `userState`: A unique `Object` indicating the user state. Returned as the `ProgressChangedEventArgs.UserState` property of the `ProgressChangedEventArgs`.

Exceptions:

- `InvalidOperationException`: The `BackgroundWorker.WorkerReportsProgress` property is set to `false`.

#### Remarks
If you need the background operation to report on its progress, you can call the `BackgroundWorker.ReportProgress` method to raise the `ProgressChanged` event. The `WorkerReportsProgress` property value must `true`, or `BackgroundWorker.ReportProgress` will throw an `InvalidOperationException`.

It is up to you to implement a meaningful way of measuring your background operation's progress as a percentage of the total task completed.

#### Examples
The following code example demonstrates the use of the `BackgroundWorker.ReportProgress` method to report the progress of an asynchronous operation to the user. This code example is part of a larger example provided for the `ToolStripProgressBar` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/ReportProgress/form1.cs._

## BackgroundWorker.RunWorkerAsync() method

```csharp
public void RunWorkerAsync ();
```

Starts execution of a background operation.

Exceptions:

- `InvalidOperationException`: `BackgroundWorker.IsBusy` is `true`.

#### Remarks
The `BackgroundWorker.RunWorkerAsync` method submits a request to start the operation running asynchronously. When the request is serviced, the `DoWork` event is raised, which in turn starts execution of your background operation.

If the background operation is already running, calling `BackgroundWorker.RunWorkerAsync` again will raise an `InvalidOperationException`.

#### Examples
The following code example demonstrates the use of the `BackgroundWorker.RunWorkerAsync` method to start an asynchronous operation. It is part of a larger example described in How to: Download a File in the Background.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/IsBusy/Form1.cs._

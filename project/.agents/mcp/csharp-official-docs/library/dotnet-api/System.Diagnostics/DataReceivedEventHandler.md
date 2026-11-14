---
title: "DataReceivedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DataReceivedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataReceivedEventHandler delegate

Namespace: `System.Diagnostics`

```csharp
public delegate void DataReceivedEventHandler(object sender, DataReceivedEventArgs e);
```

Represents the method that will handle the `Process.OutputDataReceived` event or `Process.ErrorDataReceived` event of a `Process`.

Parameters:

- `sender`: The source of the event.
- `e`: A `DataReceivedEventArgs` that contains the event data.

#### Remarks
When you create a `DataReceivedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

To asynchronously collect the redirected `Process.StandardOutput` or `Process.StandardError` stream output of a process, add your event handler to the `OutputDataReceived` or `ErrorDataReceived` event. These events are raised each time the process writes a line to the corresponding redirected stream. When the redirected stream is closed, a null line is sent to the event handler. Ensure that your event handler checks for this condition before accessing the `Data` property. For example, you can use the `static` method `String.IsNullOrEmpty` to validate the `Data` property in your event handler.

#### Examples
The following code example illustrates how to perform asynchronous read operations on the redirected `Process.StandardOutput` stream of the **sort** command. The **sort** command is a console application that reads and sorts text input.

The example creates a `DataReceivedEventHandler` delegate for the `SortOutputHandler` event handler and associates the delegate with the `OutputDataReceived` event. The event handler receives text lines from the redirected `Process.StandardOutput` stream, formats the text, and writes the text to the screen.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/sort_async.cs._

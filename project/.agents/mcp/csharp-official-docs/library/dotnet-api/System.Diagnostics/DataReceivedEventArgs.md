---
title: "DataReceivedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DataReceivedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataReceivedEventArgs class

Namespace: `System.Diagnostics`

```csharp
public class DataReceivedEventArgs : EventArgs
```

Provides data for the `Process.OutputDataReceived` and `Process.ErrorDataReceived` events.

#### Remarks
To asynchronously collect the redirected `Process.StandardOutput` or `Process.StandardError` stream output of a process, you must create a method that handles the redirected stream output events. The event-handler method is called when the process writes to the redirected stream. The event delegate calls your event handler with an instance of `DataReceivedEventArgs`. The `Data` property contains the text line that the process wrote to the redirected stream.

#### Examples
The following code example illustrates how to perform asynchronous read operations on the redirected `Process.StandardOutput` stream of the `sort` command. The `sort` command is a console application that reads and sorts text input.

The example creates an event delegate for the `SortOutputHandler` event handler and associates it with the `OutputDataReceived` event. The event handler receives text lines from the redirected `Process.StandardOutput` stream, formats the text, and writes the text to the screen.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/sort_async.cs._

## DataReceivedEventArgs.Data property

```csharp
public string? Data { get; }
```

Gets the line of characters that was written to a redirected `Process` output stream.

Returns: The line that was written by an associated `Process` to its redirected `Process.StandardOutput` or `Process.StandardError` stream, or `null` if the end of the stream has been reached.

#### Remarks
When you redirect the `Process.StandardOutput` or `Process.StandardError` stream of a `Process` to your event handler, an event is raised each time the process writes a line to the redirected stream. The `Data` property is the line that the `Process` wrote to the redirected output stream. Your event handler can use the `Data` property to filter process output or write output to an alternate location. For example, you might create an event handler that stores all error output lines into a designated error log file.

A line is defined as a sequence of characters followed by a line feed ("\n") or a carriage return immediately followed by a line feed ("\r\n"). The line characters are encoded using the default system ANSI code page. The `Data` property does not include the terminating carriage return or line feed.

When the redirected stream is closed, a null line is sent to the event handler. Ensure your event handler checks the `Data` property appropriately before accessing it. For example, you can use the static method `String.IsNullOrEmpty` to validate the `Data` property in your event handler.

#### Examples
The following code example illustrates a simple event handler associated with the `OutputDataReceived` event. The event handler receives text lines from the redirected `Process.StandardOutput` stream, formats the text, and writes the text to the screen.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/datareceivedevent.cs._

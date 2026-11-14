---
title: "OpenWriteCompletedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/OpenWriteCompletedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OpenWriteCompletedEventHandler delegate

Namespace: `System.Net`

```csharp
public delegate void OpenWriteCompletedEventHandler(object sender, OpenWriteCompletedEventArgs e);
```

Represents the method that will handle the `WebClient.OpenWriteCompleted` event of a `WebClient`.

Parameters:

- `sender`: The source of the event.
- `e`: A `OpenWriteCompletedEventArgs` containing event data.

#### Remarks
When you create a `OpenWriteCompletedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate.

#### Examples
The following code example demonstrates opening a stream to write data to be uploaded.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

The following method is called when the stream is available.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

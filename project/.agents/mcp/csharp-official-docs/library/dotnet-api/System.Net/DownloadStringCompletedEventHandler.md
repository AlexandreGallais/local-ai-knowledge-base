---
title: "DownloadStringCompletedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DownloadStringCompletedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DownloadStringCompletedEventHandler delegate

Namespace: `System.Net`

```csharp
public delegate void DownloadStringCompletedEventHandler(object sender, DownloadStringCompletedEventArgs e);
```

Represents the method that will handle the `WebClient.DownloadStringCompleted` event of a `WebClient`.

Parameters:

- `sender`: The source of the event.
- `e`: A `DownloadStringCompletedEventArgs` that contains event data.

#### Remarks
When you create a `DownloadStringCompletedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
The following code example demonstrates downloading a string asynchronously.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

The following method is called when the download completes.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

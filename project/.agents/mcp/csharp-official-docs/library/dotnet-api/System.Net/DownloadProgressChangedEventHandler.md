---
title: "DownloadProgressChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DownloadProgressChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DownloadProgressChangedEventHandler delegate

Namespace: `System.Net`

```csharp
public delegate void DownloadProgressChangedEventHandler(object sender, DownloadProgressChangedEventArgs e);
```

Represents the method that will handle the `WebClient.DownloadProgressChanged` event of a `WebClient`.

Parameters:

- `sender`: The source of the event.
- `e`: A `DownloadProgressChangedEventArgs` containing event data.

#### Remarks
When you create a `DownloadProgressChangedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

> **Note:**
> If the server does not send the size of the downloaded file (such as in the case of a passive FTP connection), `ProgressChangedEventArgs.ProgressPercentage` may always be zero.

#### Examples

The following code example demonstrates setting an event handler for the `DownloadProgressChanged` event.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

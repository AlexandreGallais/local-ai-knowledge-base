---
title: "UploadProgressChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/UploadProgressChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UploadProgressChangedEventHandler delegate

Namespace: `System.Net`

```csharp
public delegate void UploadProgressChangedEventHandler(object sender, UploadProgressChangedEventArgs e);
```

Represents the method that will handle the `WebClient.UploadProgressChanged` event of a `WebClient`.

Parameters:

- `sender`: The source of the event.
- `e`: A `UploadProgressChangedEventArgs` containing event data.

#### Remarks
When you create a `UploadProgressChangedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

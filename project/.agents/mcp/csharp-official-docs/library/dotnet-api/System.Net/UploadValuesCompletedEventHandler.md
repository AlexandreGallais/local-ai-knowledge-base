---
title: "UploadValuesCompletedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/UploadValuesCompletedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UploadValuesCompletedEventHandler delegate

Namespace: `System.Net`

```csharp
public delegate void UploadValuesCompletedEventHandler(object sender, UploadValuesCompletedEventArgs e);
```

Represents the method that will handle the `WebClient.UploadValuesCompleted` event of a `WebClient`.

Parameters:

- `sender`: The source of the event.
- `e`: A `UploadValuesCompletedEventArgs` that contains event data.

#### Remarks
When you create a `UploadValuesCompletedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

---
title: "ErrorEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/ErrorEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ErrorEventHandler delegate

Namespace: `System.IO`

```csharp
public delegate void ErrorEventHandler(object sender, ErrorEventArgs e);
```

Represents the method that will handle the `FileSystemWatcher.Error` event of a `FileSystemWatcher` object.

Parameters:

- `sender`: The source of the event.
- `e`: An `ErrorEventArgs` object that contains the event data.

#### Remarks
When you create an `ErrorEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event-handling method, add an instance of the delegate to the event. The event-handling method is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

#### Examples
The following code example shows how to create a `FileSystemWatcher` object to monitor file changes (creates, deletes, renames, changes) occurring on a disk drive. The example also shows how to properly receive error notifications.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

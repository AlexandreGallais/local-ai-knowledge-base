---
title: "OpenWriteCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/OpenWriteCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OpenWriteCompletedEventArgs class

Namespace: `System.Net`

```csharp
public class OpenWriteCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the `WebClient.OpenWriteCompleted` event.

#### Remarks
Instances of this class are passed to `OpenWriteCompletedEventHandler` methods.

#### Examples
The following code example demonstrates opening a stream to write data to be uploaded.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

The following method is called when the stream is available.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

## OpenWriteCompletedEventArgs.Result property

```csharp
public System.IO.Stream Result { get; }
```

Gets a writable stream that is used to send data to a server.

Returns: A `Stream` where you can write data to be uploaded.

#### Remarks
You should check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties before using the stream returned by this property. If the `Error` property's value is an `Exception` object or the `Cancelled` property's value is `true`, the asynchronous operation did not complete correctly and the `Result` property's value will not be valid.

#### Examples
The following code example uses the stream returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

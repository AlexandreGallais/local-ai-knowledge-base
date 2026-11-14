---
title: "UploadDataCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/UploadDataCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UploadDataCompletedEventArgs class

Namespace: `System.Net`

```csharp
public class UploadDataCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the `WebClient.UploadDataCompleted` event.

#### Remarks
Instances of this class are passed to the `UploadDataCompletedEventHandler`.

#### Examples
The following code example demonstrates asynchronously uploading data.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

The following method is called when the upload completes.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

## UploadDataCompletedEventArgs.Result property

```csharp
public byte[] Result { get; }
```

Gets the server reply to a data upload operation started by calling an `UploadDataAsync` method.

Returns: A `Byte` array containing the server reply.

#### Remarks
You should check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties before using the data returned by this property. If the `Error` property's value is an `Exception` object or the `Cancelled` property's value is `true`, the asynchronous operation did not complete correctly and the `Result` property's value will not be valid.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

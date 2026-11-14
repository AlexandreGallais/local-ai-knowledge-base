---
title: "OpenReadCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/OpenReadCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OpenReadCompletedEventArgs class

Namespace: `System.Net`

```csharp
public class OpenReadCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the `WebClient.OpenReadCompleted` event.

#### Remarks
Instances of this class are passed to `OpenReadCompletedEventHandler` methods.

#### Examples
The following code example demonstrates downloading a resource for reading.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

The following method is called when the download completes.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

## OpenReadCompletedEventArgs.Result property

```csharp
public System.IO.Stream Result { get; }
```

Gets a readable stream that contains data downloaded by a `DownloadDataAsync` method.

Returns: A `Stream` that contains the downloaded data.

#### Remarks
You should check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties before using the data that is returned by this property. If the `Error` property's value is an `Exception` object or the `Cancelled` property's value is `true`, the asynchronous operation did not complete correctly and the `Result` property's value will not be valid.

#### Examples
The following code example uses the stream returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

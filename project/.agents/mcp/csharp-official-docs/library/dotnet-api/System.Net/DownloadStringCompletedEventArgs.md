---
title: "DownloadStringCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DownloadStringCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DownloadStringCompletedEventArgs class

Namespace: `System.Net`

```csharp
public class DownloadStringCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the `WebClient.DownloadStringCompleted` event.

#### Remarks
Instances of this class are passed to the `DownloadStringCompletedEventHandler`.

#### Examples
The following code example demonstrates downloading a string asynchronously.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

The following method is called when the download completes.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

## DownloadStringCompletedEventArgs.Result property

```csharp
public string Result { get; }
```

Gets the data that is downloaded by a `DownloadStringAsync` method.

Returns: A `String` that contains the downloaded data.

#### Remarks
You should check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties before using the data that is returned by this property. If the `Error` property's value is an `Exception` object or the `Cancelled` property's value is `true`, the asynchronous operation did not complete correctly and the `Result` property's value will not be valid.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

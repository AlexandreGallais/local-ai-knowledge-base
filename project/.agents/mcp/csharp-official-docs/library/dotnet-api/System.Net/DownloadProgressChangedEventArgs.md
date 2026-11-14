---
title: "DownloadProgressChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DownloadProgressChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DownloadProgressChangedEventArgs class

Namespace: `System.Net`

```csharp
public class DownloadProgressChangedEventArgs : System.ComponentModel.ProgressChangedEventArgs
```

Provides data for the `WebClient.DownloadProgressChanged` event of a `WebClient`.

#### Remarks

Instances of this class are passed to the `DownloadProgressChangedEventHandler`.

#### Examples

The following code example demonstrates setting an event handler for the `DownloadProgressChanged` event.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

## DownloadProgressChangedEventArgs.BytesReceived property

```csharp
public long BytesReceived { get; }
```

Gets the number of bytes received.

Returns: An `Int64` value that indicates the number of bytes received.

#### Remarks
To determine what percentage of the transfer has occurred, use the `ProgressPercentage` property.

#### Examples
The following code example shows an implementation of a handler for the `DownloadProgressChanged` event. The method displays the value of the `BytesReceived` property.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

## DownloadProgressChangedEventArgs.TotalBytesToReceive property

```csharp
public long TotalBytesToReceive { get; }
```

Gets the total number of bytes in a `WebClient` data download operation.

Returns: An `Int64` value that indicates the number of bytes that will be received.

#### Remarks
To determine the number of bytes already received, use the `BytesReceived` property.

To determine what percentage of the transfer has occurred, use the `ProgressPercentage` property.

#### Examples
The following code example shows an implementation of a handler for the `DownloadProgressChanged` event. The method displays the value of the `TotalBytesToReceive` property.

_Code sample not included: ~/snippets/csharp/System.Net/DownloadDataCompletedEventArgs/Overview/asyncmethods.cs._

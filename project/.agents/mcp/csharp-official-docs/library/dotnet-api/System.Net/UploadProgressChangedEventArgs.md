---
title: "UploadProgressChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/UploadProgressChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UploadProgressChangedEventArgs class

Namespace: `System.Net`

```csharp
public class UploadProgressChangedEventArgs : System.ComponentModel.ProgressChangedEventArgs
```

Provides data for the `WebClient.UploadProgressChanged` event of a `WebClient`.

#### Remarks
Instances of this class are passed to the `UploadProgressChangedEventHandler`.

## UploadProgressChangedEventArgs.BytesReceived property

```csharp
public long BytesReceived { get; }
```

Gets the number of bytes received.

Returns: An `Int64` value that indicates the number of bytes received.

#### Remarks
Uploading data to a server may result in a download from the server. For example, suppose your application uploads a POST request to a Web server. The resulting download will update `UploadProgressChangedEventArgs.BytesReceived` and `UploadProgressChangedEventArgs.TotalBytesToReceive`.

To determine what percentage of the transfer has occurred, use the `ProgressPercentage` property. When the upload is complete, `ProgressChangedEventArgs.ProgressPercentage` will be 50%. When the download completes, `ProgressChangedEventArgs.ProgressPercentage` will be 100%.

## UploadProgressChangedEventArgs.BytesSent property

```csharp
public long BytesSent { get; }
```

Gets the number of bytes sent.

Returns: An `Int64` value that indicates the number of bytes sent.

#### Remarks
Uploading data to a server may result in a download from the server. For example, suppose your application uploads a POST request to a Web server. The resulting download will update `UploadProgressChangedEventArgs.BytesReceived` and `UploadProgressChangedEventArgs.TotalBytesToReceive`.

To determine what percentage of the transfer has occurred, use the `ProgressPercentage` property. When the upload is complete, `ProgressChangedEventArgs.ProgressPercentage` will be 50%. When the download completes, `ProgressChangedEventArgs.ProgressPercentage` will be 100%.

## UploadProgressChangedEventArgs.TotalBytesToReceive property

```csharp
public long TotalBytesToReceive { get; }
```

Gets the total number of bytes in a `WebClient` data upload operation.

Returns: An `Int64` value that indicates the number of bytes that will be received.

#### Remarks
To determine the number of bytes already received, use the `BytesReceived` property.

Uploading data to a server may result in a download from the server. For example, suppose your application uploads a POST request to a Web server. The resulting download will update `UploadProgressChangedEventArgs.BytesReceived` and `UploadProgressChangedEventArgs.TotalBytesToReceive`.

To determine what percentage of the transfer has occurred, use the `ProgressPercentage` property. When the upload is complete, `ProgressChangedEventArgs.ProgressPercentage` will be 50%. When the download completes, `ProgressChangedEventArgs.ProgressPercentage` will be 100%.

## UploadProgressChangedEventArgs.TotalBytesToSend property

```csharp
public long TotalBytesToSend { get; }
```

Gets the total number of bytes to send.

Returns: An `Int64` value that indicates the number of bytes that will be sent.

#### Remarks
To determine the number of bytes already sent, use the `BytesSent` property.

Uploading data to a server may result in a download from the server. For example, suppose your application uploads a POST request to a Web server. The resulting download will update `UploadProgressChangedEventArgs.BytesReceived` and `UploadProgressChangedEventArgs.TotalBytesToReceive`.

To determine what percentage of the transfer has occurred, use the `ProgressPercentage` property. When the upload is complete, `ProgressChangedEventArgs.ProgressPercentage` will be 50%. When the download completes, `ProgressChangedEventArgs.ProgressPercentage` will be 100%.

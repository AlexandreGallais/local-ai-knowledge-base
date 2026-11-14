---
title: "UploadValuesCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/UploadValuesCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UploadValuesCompletedEventArgs class

Namespace: `System.Net`

```csharp
public class UploadValuesCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the `WebClient.UploadValuesCompleted` event.

#### Remarks
Instances of this class are passed to the `UploadValuesCompletedEventHandler`.

## UploadValuesCompletedEventArgs.Result property

```csharp
public byte[] Result { get; }
```

Gets the server reply to a data upload operation started by calling an `UploadValuesAsync` method.

Returns: A `Byte` array containing the server reply.

#### Remarks
You should check the `AsyncCompletedEventArgs.Error` and `AsyncCompletedEventArgs.Cancelled` properties to determine whether the upload completed. If the `Error` property's value is an `Exception` object or the `Cancelled` property's value is `true`, the asynchronous operation did not complete correctly and the `Result` property's value will not be valid.

---
title: "AsyncCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AsyncCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncCallback delegate

Namespace: `System`

```csharp
public delegate void AsyncCallback(IAsyncResult ar);
```

References a method to be called when a corresponding asynchronous operation completes.

Parameters:

- `ar`: The result of the asynchronous operation.

#### Remarks
Use an `AsyncCallback` delegate to process the results of an asynchronous operation in a separate thread. The `AsyncCallback` delegate represents a callback method that is called when the asynchronous operation completes. The callback method takes an `IAsyncResult` parameter, which is subsequently used to obtain the results of the asynchronous operation.

For more information about asynchronous programming, see Using an AsyncCallback Delegate to End an Asynchronous Operation and Using an AsyncCallback Delegate and State Object in Event-based Asynchronous Pattern (EAP).

#### Examples
The following code example demonstrates using asynchronous methods in the `Dns` class to retrieve Domain Name System (DNS) information for user-specified computers. This example creates an `AsyncCallback` delegate that references the `ProcessDnsInformation` method. This method is called once for each asynchronous request for DNS information.

_Code sample not included: ~/snippets/csharp/System/AsyncCallback/Overview/AsyncDelegateNoStateObject.cs._

---
title: "SendOrPostCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SendOrPostCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SendOrPostCallback delegate

Namespace: `System.Threading`

```csharp
public delegate void SendOrPostCallback(object? state);
```

Represents a method to be called when a message is to be dispatched to a synchronization context.

Parameters:

- `state`: The object passed to the delegate.

#### Remarks
`SendOrPostCallback` represents a callback method that you want to execute when a message is to be dispatched to a synchronization context.  Create the delegate by passing your callback method to the `SendOrPostCallback` constructor. Your method must have the signature shown here.

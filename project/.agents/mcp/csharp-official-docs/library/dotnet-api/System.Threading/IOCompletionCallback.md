---
title: "IOCompletionCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/IOCompletionCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOCompletionCallback delegate

Namespace: `System.Threading`

```csharp
public delegate void IOCompletionCallback(uint errorCode, uint numBytes, NativeOverlapped* pOVERLAP);
```

Receives the error code, number of bytes, and overlapped value type when an I/O operation completes on the thread pool.

Parameters:

- `errorCode`: The error code.
- `numBytes`: The number of bytes that are transferred.
- `pOVERLAP`: A `NativeOverlapped` representing an unmanaged pointer to the native overlapped value type.

To be added.

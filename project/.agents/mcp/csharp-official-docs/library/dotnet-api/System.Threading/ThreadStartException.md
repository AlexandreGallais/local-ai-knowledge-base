---
title: "ThreadStartException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadStartException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadStartException class

Namespace: `System.Threading`

```csharp
public sealed class ThreadStartException : SystemException
```

The exception that is thrown when a failure occurs in a managed thread after the underlying operating system thread has been started, but before the thread is ready to execute user code.

#### Remarks
The exception returned by the `InnerException` property provides information about the reason for the failure.

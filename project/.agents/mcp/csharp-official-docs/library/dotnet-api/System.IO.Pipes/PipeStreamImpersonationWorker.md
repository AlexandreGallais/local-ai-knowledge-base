---
title: "PipeStreamImpersonationWorker delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeStreamImpersonationWorker.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeStreamImpersonationWorker delegate

Namespace: `System.IO.Pipes`

```csharp
public delegate void PipeStreamImpersonationWorker();
```

Represents the method to call as the client.

#### Remarks
Use this delegate to specify a method to call when impersonating the client. The connecting client's permissions are applied to the remote server. For example, if the connecting client tries to request the contents of a file on the server, the client can request only files that it has sufficient permissions to open.

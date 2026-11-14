---
title: "PipesAclExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipesAclExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipesAclExtensions class

Namespace: `System.IO.Pipes`

```csharp
public static class PipesAclExtensions
```

Provides Windows-specific static extension methods for manipulating Access Control List (ACL) security attributes for pipe streams.

To be added.

## PipesAclExtensions.GetAccessControl(PipeStream) method

```csharp
public static System.IO.Pipes.PipeSecurity GetAccessControl (this System.IO.Pipes.PipeStream stream);
```

Returns the security information of a pipe stream.

Parameters:

- `stream`: The existing pipe stream from which to obtain the security information.

Returns: The security descriptors of all the access control sections of the pipe stream.

To be added.

## PipesAclExtensions.SetAccessControl(PipeStream, PipeSecurity) method

```csharp
public static void SetAccessControl (this System.IO.Pipes.PipeStream stream, System.IO.Pipes.PipeSecurity pipeSecurity);
```

Changes the security attributes of an existing pipe stream.

Parameters:

- `stream`: An existing pipe stream.
- `pipeSecurity`: The security information to apply to the pipe stream.

Exceptions:

- `ArgumentNullException`: `pipeSecurity` is `null`.
- `IOException`: `stream` is a disconnected `NamedPipeClientStream` instance.

To be added.

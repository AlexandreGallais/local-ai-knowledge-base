---
title: "NamedPipeServerStreamAcl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/NamedPipeServerStreamAcl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedPipeServerStreamAcl class

Namespace: `System.IO.Pipes`

```csharp
public static class NamedPipeServerStreamAcl
```

Provides security related APIs for the `NamedPipeServerStream` class.

To be added.

## NamedPipeServerStreamAcl.Create(String, PipeDirection, Int32, PipeTransmissionMode, PipeOptions, Int32, Int32, PipeSecurity, HandleInheritability, PipeAccessRights) method

```csharp
public static System.IO.Pipes.NamedPipeServerStream Create (string pipeName, System.IO.Pipes.PipeDirection direction, int maxNumberOfServerInstances, System.IO.Pipes.PipeTransmissionMode transmissionMode, System.IO.Pipes.PipeOptions options, int inBufferSize, int outBufferSize, System.IO.Pipes.PipeSecurity? pipeSecurity, System.IO.HandleInheritability inheritability = System.IO.HandleInheritability.None, System.IO.Pipes.PipeAccessRights additionalAccessRights = (System.IO.Pipes.PipeAccessRights) 0);
```

Creates a new instance of the `NamedPipeServerStream` class with the specified pipe name, pipe direction, maximum number of server instances, transmission mode, pipe options, recommended in and out buffer sizes, pipe security, inheritability mode, and pipe access rights.

Parameters:

- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `maxNumberOfServerInstances`: The maximum number of server instances that share the same name. You can pass `NamedPipeServerStream.MaxAllowedServerInstances` for this value.
- `transmissionMode`: One of the enumeration values that determines the transmission mode of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.
- `inBufferSize`: The input buffer size.
- `outBufferSize`: The output buffer size.
- `pipeSecurity`: An object that determines the access control and audit security for the pipe.
- `inheritability`: One of the enumeration values that determines whether the underlying handle can be inherited by child processes.
- `additionalAccessRights`: One of the enumeration values that specifies the access rights of the pipe.

Returns: A new named pipe server stream instance.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is empty.
- `IOException`: `options` is `PipeOptions.None`.
- `ArgumentOutOfRangeException`: `options` contains an invalid flag.

-or-

`inBufferSize` or `outBufferSize` is less than zero.

-or-

`maxNumberOfServerInstances` is not a valid number: it should be greater than or equal to 1 and less than or equal to 254, or should be set to the value of `NamedPipeServerStream.MaxAllowedServerInstances`.

-or-

`inheritability` contains an invalid enum value.

-or-

`pipeName` is 'anonymous', which is reserved.

#### Remarks

If `options` contains `CurrentUserOnly`, the passed `pipeSecurity` is ignored and the returned `NamedPipeServerStream` object is created using a custom `PipeSecurity` instance assigned to the current Windows user as its only owner with full control of the pipe.

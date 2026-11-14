---
title: "AnonymousPipeServerStreamAcl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/AnonymousPipeServerStreamAcl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AnonymousPipeServerStreamAcl class

Namespace: `System.IO.Pipes`

```csharp
public static class AnonymousPipeServerStreamAcl
```

Provides security related APIs for the `AnonymousPipeServerStream` class.

To be added.

## AnonymousPipeServerStreamAcl.Create(PipeDirection, HandleInheritability, Int32, PipeSecurity) method

```csharp
public static System.IO.Pipes.AnonymousPipeServerStream Create (System.IO.Pipes.PipeDirection direction, System.IO.HandleInheritability inheritability, int bufferSize, System.IO.Pipes.PipeSecurity? pipeSecurity);
```

Creates a new instance of the `AnonymousPipeServerStream` class with the specified pipe direction, inheritability mode, buffer size, and pipe security.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe. Anonymous pipes are unidirectional, so direction cannot be set to `PipeDirection.InOut`.
- `inheritability`: One of the enumeration values that determines whether the underlying handle can be inherited by child processes.
- `bufferSize`: The size of the buffer. This value must be greater than or equal to 0.
- `pipeSecurity`: An object that determines the access control and audit security for the pipe.

Returns: A new anonymous pipe server stream instance.

Exceptions:

- `NotSupportedException`: `direction` is `PipeDirection.InOut`.
- `ArgumentOutOfRangeException`: `inheritability` is not set to a valid `HandleInheritability` enum value.

-or-

`bufferSize` is less than 0.

#### Remarks

Setting `pipeSecurity` to `null` is equivalent to calling the `%23ctor` constructor directly.

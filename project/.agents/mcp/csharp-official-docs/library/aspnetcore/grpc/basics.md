---
title: "gRPC Services with C#"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/basics.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# gRPC services with C\#

This article provides an overview of the concepts required to write gRPC apps in C#. The information presented applies to both C-core-based and ASP.NET Core-based gRPC apps.

## Review the .proto file

gRPC uses a contract-first approach to API development. Protocol buffers (protobuf) are used as the Interface Definition Language (IDL) by default. The _.proto_ file contains:

* The definition of the gRPC service.
* The messages sent between clients and servers.

For more information on the syntax of protobuf files, see Create Protobuf messages for .NET apps.

Consider the _greet.proto_ file used in the tutorial, Create a gRPC client and server in ASP.NET Core:

* The file defines a `Greeter` service.
* The `Greeter` service defines a `SayHello` call.
* The `SayHello` call sends a `HelloRequest` message and receives a `HelloReply` message.

The file contains the following code:

```protobuf
syntax = "proto3";

option csharp_namespace = "GrpcGreeter";

package greet;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply);
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings.
message HelloReply {
  string message = 1;
}
```

## Add a .proto file to a C\# app

The _.proto_ file is included in a project by adding it to the `<Protobuf>` item group:

```xml
<ItemGroup>
  <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
</ItemGroup>
```

By default, a `<Protobuf>` reference generates a concrete client and a service base class. The reference element's `GrpcServices` attribute can be used to limit C# asset generation. Valid `GrpcServices` options are:

* `Both` (default when not present)
* `Server`
* `Client`
* `None`

## C# tooling support for .proto files

The tooling package Grpc.Tools is required to generate the C# assets from _.proto_ files.

The generated assets (files) have the following characteristics:

* They're generated on an as-needed basis each time the project is built.
* They aren't added to the project or checked into source control.
* They're a build artifact contained in the _obj_ directory.

Both the server and client projects require this package. The `Grpc.AspNetCore` metapackage includes a reference to `Grpc.Tools`. Server projects can add `Grpc.AspNetCore` by using the Package Manager in Visual Studio or by adding a `<PackageReference>` to the project file:

```xml
<PackageReference Include="Grpc.AspNetCore" Version="2.32.0" />
```

Client projects should directly reference `Grpc.Tools` alongside the other packages required to use the gRPC client. The tooling package isn't required at runtime, so the dependency is marked with the `PrivateAssets="All"` setting:

```xml
<PackageReference Include="Google.Protobuf" Version="3.18.0" />
<PackageReference Include="Grpc.Net.Client" Version="2.52.0" />
<PackageReference Include="Grpc.Tools" Version="2.40.0">
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  <PrivateAssets>all</PrivateAssets>
</PackageReference>
```

## Generated C# assets

The tooling package generates the C# types representing the messages defined in the included _.proto_ files.

For server-side assets, an abstract service base type is generated. The base type contains the definitions of all the gRPC calls contained in the _.proto_ file. Create a concrete service implementation that derives from this base type and implements the logic for the gRPC calls. For the _greet.proto_ file used in a previous example, an abstract `GreeterBase` type that contains a virtual `SayHello` method is generated. A concrete implementation `GreeterService` overrides the method and implements the logic handling the gRPC call.

```csharp
public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }
}
```

For client-side assets, a concrete client type is generated. The gRPC calls in the _.proto_ file are translated into methods on the concrete type, which can be called. For the _greet.proto_ file used in a previous example, a concrete `GreeterClient` type is generated. Call `GreeterClient.SayHelloAsync` to initiate a gRPC call to the server.

```csharp
// The port number must match the port of the gRPC server.
using var channel = GrpcChannel.ForAddress("https://localhost:7042");
var client = new Greeter.GreeterClient(channel);
var reply = await client.SayHelloAsync(
                  new HelloRequest { Name = "GreeterClient" });
Console.WriteLine("Greeting: " + reply.Message);
Console.WriteLine("Press any key to exit...");
Console.ReadKey();
```

By default, server and client assets are generated for each _.proto_ file included in the `<Protobuf>` item group. To ensure only the server assets are generated in a server project, the `GrpcServices` attribute is set to `Server`.

```xml
<ItemGroup>
  <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
</ItemGroup>
```

Similarly, the attribute is set to `Client` in client projects.

## Related content

* Overview for gRPC on .NET
* Create a .NET gRPC client and server in ASP.NET Core
* gRPC services with ASP.NET Core
* Call gRPC services with the .NET client

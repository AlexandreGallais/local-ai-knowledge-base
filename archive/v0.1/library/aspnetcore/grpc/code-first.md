---
title: "Code-first gRPC services and clients with .NET"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/code-first.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Code-first gRPC services and clients with .NET

-->
-->

By James Newton-King and Marc Gravell

Code-first gRPC uses .NET types to define service and message contracts.

Code-first is a good choice when an entire system uses .NET:

* .NET service and data contract types can be shared between the .NET server and clients.
* Avoids the need to define contracts in `.proto` files and code generation.

Code-first isn't recommended in polyglot systems with multiple languages. .NET service and data contract types can't be used with non-.NET platforms. To call a gRPC service written using code-first, other platforms must create a `.proto` contract that matches the service.

## protobuf-net.Grpc

> **Important:**
> For help with protobuf-net.Grpc, visit the protobuf-net.Grpc website or create an issue on the protobuf-net.Grpc GitHub repository.

protobuf-net.Grpc is a community project and isn't supported by Microsoft. It adds code-first support to `Grpc.AspNetCore` and `Grpc.Net.Client`. It uses .NET types annotated with attributes to define an app's gRPC services and messages.

The first step to creating a code-first gRPC service is defining the code contract:

* Create a new project that will be shared by the server and client.
* Add a protobuf-net.Grpc package reference.
* Create service and data contract types.

```csharp
﻿using ProtoBuf.Grpc;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Threading.Tasks;

namespace Shared.Contracts;

[DataContract]
public class HelloReply
{
    [DataMember(Order = 1)]
    public string Message { get; set; }
}

[DataContract]
public class HelloRequest
{
    [DataMember(Order = 1)]
    public string Name { get; set; }
}

[ServiceContract]
public interface IGreeterService
{
    [OperationContract]
    Task<HelloReply> SayHelloAsync(HelloRequest request,
        CallContext context = default);
}
```

The preceding code:

* Defines `HelloRequest` and `HelloReply` messages.
* Defines the `IGreeterService` contract interface with the unary `SayHelloAsync` gRPC method.

The service contract is implemented on the server and called from the client.

Methods defined on service interfaces must match certain signatures depending on whether they're:

* Unary
* Server streaming
* Client streaming
* Bidirectional streaming

For more information on defining service contracts, see the protobuf-net.Grpc getting started documentation.

## Create a code-first gRPC service

To add gRPC code-first service to an ASP.NET Core app:

* Add a protobuf-net.Grpc.AspNetCore package reference.
* Add a reference to the shared code-contract project.

  ```xml
﻿<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="protobuf-net.Grpc.AspNetCore" Version="1.0.152" />
  </ItemGroup>

  <ItemGroup>
	  <ProjectReference Include="..\Shared\Shared.Contracts.csproj" />
  </ItemGroup>

</Project>
```

* Create a new `GreeterService.cs` file and implement the `IGreeterService` service interface:

  ```csharp
using Shared.Contracts;
using ProtoBuf.Grpc;

public class GreeterService : IGreeterService
{
    public Task<HelloReply> SayHelloAsync(HelloRequest request, CallContext context = default)
    {
        return Task.FromResult(
                new HelloReply
                {
                    Message = $"Hello {request.Name}"
                });
    }
}
```

* Update the `Program.cs` file:

  ```csharp
using ProtoBuf.Grpc.Server;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddCodeFirstGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
```

  The preceding highlighted code updates the following:

  * `AddCodeFirstGrpc` registers services that enable code-first.
  * `MapGrpcService<GreeterService>` adds the code-first service endpoint.

gRPC services implemented with code-first and `.proto` files can co-exist in the same app. All gRPC services use gRPC service configuration.

## Create a code-first gRPC client

A code-first gRPC client uses the service contract to call gRPC services.

* In the gRPC client `.csproj` file:

  * Add a protobuf-net.Grpc package reference.
  * Add a Grpc.Net.Client package reference.
  * Add a reference to the shared code-contract project.

  ```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Grpc.Net.Client" Version="2.52.0" />
    <PackageReference Include="protobuf-net.Grpc" Version="1.0.152" />
  </ItemGroup>
	
  <ItemGroup>
    <ProjectReference Include="..\Shared\Shared.Contracts.csproj" />
  </ItemGroup>

</Project>
```

* Update the client `program.cs`

  ```csharp
﻿// See https://aka.ms/new-console-template for more information
using Grpc.Net.Client;
using ProtoBuf.Grpc.Client;
using Shared.Contracts;

namespace GrpcGreeterClient;

internal class Program
{
    private static async Task Main(string[] args)
    {
        using var channel = GrpcChannel.ForAddress("https://localhost:7184");
        var client = channel.CreateGrpcService<IGreeterService>();

        var reply = await client.SayHelloAsync(
            new HelloRequest { Name = "GreeterClient" });

        Console.WriteLine($"Greeting: {reply.Message}");
        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
    }
}
```

The preceding gRPC client `Program.cs` code:

* Creates a gRPC channel.
* Creates a code-first client from the channel with the `CreateGrpcService<IGreeterService>` extension method.
* Calls the gRPC service with `SayHelloAsync`.

A code-first gRPC client is created from a channel. Just like a regular client, a code-first client uses its channel configuration.

View or download sample code (how to download)

## Additional resources

* protobuf-net.Grpc website
* protobuf-net.Grpc GitHub repository

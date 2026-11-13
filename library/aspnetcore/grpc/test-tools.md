---
title: "Test gRPC services with gRPCurl and gRPCui in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/test-tools.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Test gRPC services with gRPCurl and gRPCui in ASP.NET Core

-->
-->

By James Newton-King
Tooling is available for gRPC that allows developers to test services without building client apps:

* gRPCurl is an open-source command-line tool that provides interaction with gRPC services.
* gRPCui builds on top of gRPCurl and adds an open-source interactive web UI for gRPC.

This article discusses how to:

* Set up gRPC server reflection with a gRPC ASP.NET Core app.
* Interact with gRPC using test tools:
  * Discover and test gRPC services with `grpcurl`.
  * Interact with gRPC services via a browser using `grpcui`.

> **Note:**
> To learn how to unit test gRPC services, see Test gRPC services in ASP.NET Core.

## Set up gRPC reflection

Tooling must know the Protobuf contract of services before it can call them. There are two ways to do this:

* Set up gRPC reflection on the server. Tools, such as gRPCurl, use reflection to automatically discover service contracts.
* Add `.proto` files to the tool manually.

It's easier to use gRPC reflection. gRPC reflection adds a new gRPC service to the app that clients can call to discover services.

gRPC ASP.NET Core has built-in support for gRPC reflection with the `Grpc.AspNetCore.Server.Reflection` package. To configure reflection in an app:

* Add a `Grpc.AspNetCore.Server.Reflection` package reference.
* Register reflection in `Program.cs`:
  * `AddGrpcReflection` to register services that enable reflection.
  * `MapGrpcReflectionService` to add a reflection service endpoint.

```csharp
builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();

var app = builder.Build();

app.MapGrpcService<GreeterService>();

IWebHostEnvironment env = app.Environment;

if (env.IsDevelopment())
{
    app.MapGrpcReflectionService();
}
```

When gRPC reflection is set up:

* A gRPC reflection service is added to the server app.
* Client apps that support gRPC reflection can call the reflection service to discover services hosted by the server.
* gRPC services are still called from the client. Reflection only enables service discovery and doesn't bypass server-side security. Endpoints protected by authentication and authorization require the caller to pass credentials for the endpoint to be called successfully.

### Reflection service security

gRPC reflection returns a list of available APIs, which could contain sensitive information. Care should be taken to limit access to the gRPC reflection service.

gRPC reflection is usually only required in a local development environment. For local development, the reflection service should only be mapped when IsDevelopment returns true:

```csharp
if (env.IsDevelopment())
{
    app.MapGrpcReflectionService();
}
```

Access to the service can be controlled through standard ASP.NET Core authorization extension methods, such as `AllowAnonymous` and `RequireAuthorization`.

For example, if an app has been configured to require authorization by default, configuration the gRPC reflection endpoint with `AllowAnonymous` to skip authentication and authorization.

```csharp
if (env.IsDevelopment())
{
    app.MapGrpcReflectionService().AllowAnonymous();
}
```

## gRPCurl

gRPCurl is a command-line tool created by the gRPC community. Its features include:

* Calling gRPC services, including streaming services.
* Service discovery using gRPC reflection.
* Listing and describing gRPC services.
* Works with secure (TLS) and insecure (plain-text) servers.

For information about downloading and installing `grpcurl`, see the gRPCurl GitHub homepage.

### Use `grpcurl`

The `-help` argument explains `grpcurl` command-line options:

```console
$ grpcurl -help
```

### Discover services

Use the `describe` verb to view the services defined by the server. Specify `<port>` as the localhost port number of the gRPC server. The port number is randomly assigned when the project is created and set in `Properties/launchSettings.json`:

```console
$ grpcurl localhost:<port> describe
greet.Greeter is a service:
service Greeter {
  rpc SayHello ( .greet.HelloRequest ) returns ( .greet.HelloReply );
  rpc SayHellos ( .greet.HelloRequest ) returns ( stream .greet.HelloReply );
}
grpc.reflection.v1alpha.ServerReflection is a service:
service ServerReflection {
  rpc ServerReflectionInfo ( stream .grpc.reflection.v1alpha.ServerReflectionRequest ) returns ( stream .grpc.reflection.v1alpha.ServerReflectionResponse );
}
```

The preceding example:

* Runs the `describe` verb on server `localhost:<port>`. Where `<port>` is randomly assigned when the gRPC server project is created and set in `Properties/launchSettings.json`
* Prints services and methods returned by gRPC reflection.
  * `Greeter` is a service implemented by the app.
  * `ServerReflection` is the service added by the `Grpc.AspNetCore.Server.Reflection` package.

Combine `describe` with a service, method, or message name to view its detail:

```powershell
$ grpcurl localhost:<port> describe greet.HelloRequest
greet.HelloRequest is a message:
message HelloRequest {
  string name = 1;
}
```

### Call gRPC services

Call a gRPC service by specifying a service and method name along with a JSON argument that represents the request message. The JSON is converted into Protobuf and sent to the service.

```console
$ grpcurl -d '{ \"name\": \"World\" }' localhost:<port> greet.Greeter/SayHello
{
  "message": "Hello World"
}
```

In the preceding example:

* The `-d` argument specifies a request message with JSON. This argument must come before the server address and method name.
* Calls the `SayHello` method on the `greeter.Greeter` service.
* Prints the response message as JSON.
* Where `<port>` is randomly assigned when the gRPC server project is created and set in `Properties/launchSettings.json`

The preceding example uses `\` to escape the `"` character. Escaping `"` is required in a PowerShell console but must not be used in some consoles. For example, the previous command for a macOS console:

```console
$ grpcurl -d '{ "name": "World" }' localhost:<port> greet.Greeter/SayHello
{
  "message": "Hello World"
}
```

## gRPCui

gRPCui is an interactive web UI for gRPC. gRPCui builds on top of gRPCurl. gRPCui offers a GUI for discovering and testing gRPC services, similar to HTTP tools such as Swagger UI.

For information about downloading and installing `grpcui`, see the gRPCui GitHub homepage.

### Using `grpcui`

Run `grpcui` with the server address to interact with as an argument:

```powershell
$ grpcui localhost:<port>
gRPC Web UI available at http://127.0.0.1:55038/
```

In the preceding example, specify `<port>` as the localhost port number of the gRPC server. The port number is randomly assigned when the project is created and set in `Properties/launchSettings.json`

The tool launches a browser window with the interactive web UI. gRPC services are automatically discovered using gRPC reflection.

## Additional resources

* gRPCurl GitHub homepage
* gRPCui GitHub homepage
* `Grpc.AspNetCore.Server.Reflection`
* Test gRPC services in ASP.NET Core
* Mock gRPC client in tests

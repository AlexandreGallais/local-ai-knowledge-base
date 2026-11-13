---
title: "What's new in ASP.NET Core in .NET 9 (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 9 (part 3 of 6)

## SignalR

This section describes new features for SignalR.

### Polymorphic type support in SignalR Hubs

Hub methods can now accept a base class instead of the derived class to enable polymorphic scenarios. The base type needs to be annotated to allow polymorphism.

```csharp
public class MyHub : Hub
{
    public void Method(JsonPerson person)
    {
        if (person is JsonPersonExtended)
        {
        }
        else if (person is JsonPersonExtended2)
        {
        }
        else
        {
        }
    }
}

[JsonPolymorphic]
[JsonDerivedType(typeof(JsonPersonExtended), nameof(JsonPersonExtended))]
[JsonDerivedType(typeof(JsonPersonExtended2), nameof(JsonPersonExtended2))]
private class JsonPerson
{
    public string Name { get; set; }
    public Person Child { get; set; }
    public Person Parent { get; set; }
}

private class JsonPersonExtended : JsonPerson
{
    public int Age { get; set; }
}

private class JsonPersonExtended2 : JsonPerson
{
    public string Location { get; set; }
}
```

### Improved Activities for SignalR

SignalR now has an ActivitySource for both the hub server and client.

#### .NET SignalR server ActivitySource

The SignalR ActivitySource named `Microsoft.AspNetCore.SignalR.Server` emits events for hub method calls:

* Every method is its own activity, so anything that emits an activity during the hub method call is under the hub method activity.
* Hub method activities don't have a parent. This means they are not bundled under the long-running SignalR connection.

The following example uses the Aspire dashboard and the OpenTelemetry packages:

```xml
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.9.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.9.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.9.0" />
```

Add the following startup code to the `Program.cs` file:

```csharp
using OpenTelemetry.Trace;
using SignalRChat.Hubs;

// Set OTEL_EXPORTER_OTLP_ENDPOINT environment variable depending on where your OTEL endpoint is.
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // View all traces only in development environment.
            tracing.SetSampler(new AlwaysOnSampler());
        }

        tracing.AddAspNetCoreInstrumentation();
        tracing.AddSource("Microsoft.AspNetCore.SignalR.Server");
    });

builder.Services.ConfigureOpenTelemetryTracerProvider(tracing => tracing.AddOtlpExporter());

var app = builder.Build();
```

The following is example output from the Aspire Dashboard:

#### .NET SignalR client ActivitySource

The SignalR ActivitySource named `Microsoft.AspNetCore.SignalR.Client` emits events for a SignalR client:

* The .NET SignalR client has an `ActivitySource` named `Microsoft.AspNetCore.SignalR.Client`. Hub invocations now create a client span. Note that other SignalR clients, such as the JavaScript client, don't support tracing. This feature will be added to more clients in future releases.
* Hub invocations on the client and server support context propagation. Propagating the trace context enables true distributed tracing. It's now possible to see invocations flow from the client to the server and back.

Here's how these new activities look in the Aspire dashboard:

### SignalR supports trimming and Native AOT

Continuing the Native AOT journey started in .NET 8, we have enabled trimming and native ahead-of-time (AOT) compilation support for both SignalR client and server scenarios. You can now take advantage of the performance benefits of using Native AOT in applications that use SignalR for real-time web communications.

#### Getting started

Install the latest .NET 9 SDK.

Create a solution from the `webapiaot` template in a command shell using the following command:

```dotnetcli
dotnet new webapiaot -o SignalRChatAOTExample
```

Replace the contents of the `Program.cs` file with the following SignalR code:

```csharp
using Microsoft.AspNetCore.SignalR;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddSignalR();
builder.Services.Configure<JsonHubProtocolOptions>(o =>
{
    o.PayloadSerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

app.MapHub<ChatHub>("/chatHub");
app.MapGet("/", () => Results.Content("""
<!DOCTYPE html>
<html>
<head>
    <title>SignalR Chat</title>
</head>
<body>
    <input id="userInput" placeholder="Enter your name" />
    <input id="messageInput" placeholder="Type a message" />
    <button onclick="sendMessage()">Send</button>
    <ul id="messages"></ul>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js"></script>
    <script>
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        connection.on("ReceiveMessage", (user, message) => {
            const li = document.createElement("li");
            li.textContent = `${user}: ${message}`;
            document.getElementById("messages").appendChild(li);
        });

        async function sendMessage() {
            const user = document.getElementById("userInput").value;
            const message = document.getElementById("messageInput").value;
            await connection.invoke("SendMessage", user, message);
        }

        connection.start().catch(err => console.error(err));
    </script>
</body>
</html>
""", "text/html"));

app.Run();

[JsonSerializable(typeof(string))]
internal partial class AppJsonSerializerContext : JsonSerializerContext { }

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

The preceding example produces a native Windows executable of 10 MB and a Linux executable of 10.9 MB.

#### Limitations

* Only the JSON protocol is currently supported:
  * As shown in the preceding code, apps that use JSON serialization and Native AOT must use the `System.Text.Json` Source Generator.
  * This follows the same approach as Minimal APIs.
* On the SignalR server, Hub method parameters of type `IAsyncEnumerable<T>` and `ChannelReader<T>` where `T` is a ValueType (`struct`) aren't supported. Using these types results in a runtime exception at startup in development and in the published app. For more information, see SignalR: Using IAsyncEnumerable<T> and ChannelReader<T> with ValueTypes in native AOT (`dotnet/aspnetcore` #56179).
* Strongly typed hubs aren't supported with Native AOT (`PublishAot`). Using strongly typed hubs with Native AOT will result in warnings during build and publish, and a runtime exception. Using strongly typed hubs with trimming (`PublishedTrimmed`) is supported.
  * Make sure to copy the names from `[HubMethodName(...)]` applied to the strongly typed hub interface methods into the `SendAsync` calls.
* Only `Task`, `Task<T>`, `ValueTask`, or `ValueTask<T>` are supported for async return types.

## Minimal APIs

This section describes new features for Minimal APIs.

### Added `InternalServerError` and `InternalServerError<TValue>` to `TypedResults`

The `Microsoft.AspNetCore.Http.TypedResults` class is a helpful vehicle for returning strongly-typed HTTP status code-based responses from a Minimal API.  `TypedResults` now includes factory methods and types for returning "500 Internal Server Error" responses from endpoints. Here's an example that returns a 500 response:

```csharp
var app = WebApplication.Create();

app.MapGet("/", () => TypedResults.InternalServerError("Something went wrong!"));

app.Run();
```

### Call `ProducesProblem` and `ProducesValidationProblem` on route groups

The `ProducesProblem` and `ProducesValidationProblem` extension methods have been updated to support their use on route groups. These methods indicate that all endpoints in a route group can return `ProblemDetails` or `ValidationProblemDetails` responses for the purposes of OpenAPI metadata.

```csharp
var app = WebApplication.Create();

var todos = app.MapGroup("/todos")
    .ProducesProblem();

todos.MapGet("/", () => new Todo(1, "Create sample app", false));
todos.MapPost("/", (Todo todo) => Results.Ok(todo));

app.Run();

record Todo(int Id, string Title, bool IsCompleted);
```

### `Problem` and `ValidationProblem` result types support construction with `IEnumerable<KeyValuePair<string, object?>>` values

Prior to .NET 9, constructing Problem and ValidationProblem result types in Minimal APIs required that the `errors` and `extensions` properties be initialized with an implementation of `IDictionary<string, object?>`. In this release, these construction APIs support overloads that consume `IEnumerable<KeyValuePair<string, object?>>`.

```csharp
var app = WebApplication.Create();

app.MapGet("/", () =>
{
    var extensions = new List<KeyValuePair<string, object?>> { new("test", "value") };
    return TypedResults.Problem("This is an error with extensions",
                                                       extensions: extensions);
});
```
Thanks to Joseph Goldman for this contribution!

## OpenAPI

This section describes new features for OpenAPI

### Built-in support for OpenAPI document generation

The OpenAPI specification is a standard for describing HTTP APIs. The standard allows developers to define the shape of APIs that can be plugged into client generators, server generators, testing tools, documentation, and more. In .NET 9, ASP.NET Core provides built-in support for generating OpenAPI documents representing controller-based or Minimal APIs via the Microsoft.AspNetCore.OpenApi package.

The following highlighted code calls:

* `AddOpenApi` to register the required dependencies into the app's DI container.
* `MapOpenApi` to register the required OpenAPI endpoints in the app's routes.

```csharp
var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/hello/{name}", (string name) => $"Hello {name}"!);

app.Run();
```
Install the `Microsoft.AspNetCore.OpenApi` package in the project using the following command:

```dotnetcli
dotnet add package Microsoft.AspNetCore.OpenApi
```

Run the app and navigate to `openapi/v1.json` to view the generated OpenAPI document:

OpenAPI documents can also be generated at build-time by adding the `Microsoft.Extensions.ApiDescription.Server` package:

```dotnetcli
dotnet add package Microsoft.Extensions.ApiDescription.Server
```

To modify the location of the emitted OpenAPI documents, set the target path in the OpenApiDocumentsDirectory property in the app's project file:

```xml
<PropertyGroup>
  <OpenApiDocumentsDirectory>$(MSBuildProjectDirectory)</OpenApiDocumentsDirectory>
</PropertyGroup>
```
Run `dotnet build` and inspect the generated JSON file in the project directory.

ASP.NET Core's built-in OpenAPI document generation provides support for various customizations and options. It provides document, operation, and schema transformers and has the ability to manage multiple OpenAPI documents for the same application.

To learn more about ASP.NET Core's new OpenAPI document capabilities, see the new Microsoft.AspNetCore.OpenApi docs.

### Microsoft.AspNetCore.OpenApi supports trimming and Native AOT

OpenAPI in ASP.NET Core supports trimming and native AOT. The following steps create and publish an OpenAPI app with trimming and native AOT:

Create a new ASP.NET Core Web API (Native AOT) project.

```console
dotnet new webapiaot
```

Add the Microsoft.AspNetCore.OpenAPI package.

```console
dotnet add package Microsoft.AspNetCore.OpenApi
```

Update `Program.cs` to enable generating OpenAPI documents.

```diff
+ builder.Services.AddOpenApi();

var app = builder.Build();

+ app.MapOpenApi();
```

Publish the app.

```console
dotnet publish
```

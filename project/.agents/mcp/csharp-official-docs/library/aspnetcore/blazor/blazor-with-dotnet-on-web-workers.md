---
title: "ASP.NET Core Blazor with .NET on Web Workers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/blazor-with-dotnet-on-web-workers.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor with .NET on Web Workers

-->

Modern Blazor WebAssembly apps often handle CPU-intensive work alongside rich UI updates. Tasks such as image processing, document parsing, or data crunching can easily freeze the browser's main thread. Web Workers let you push that work to a background thread. Combined with the .NET WebAssembly runtime, you can execute C# code in the background while the UI stays responsive.

The Blazor Web Worker project template (`blazorwebworker`) contains a Web Worker client for Blazor WebAssembly apps. The template generates the required JavaScript worker scripts, a C# `WebWorkerClient` class, and a starter `WorkerMethods.cs` file, which removes the need to write the interop layer manually. To learn about Web Workers with React or other custom JavaScript frontends, see .NET on Web Workers.

> **Note:**
> Use of a Web Worker is primarily useful with Blazor WebAssembly apps to improve performance but can be implemented for the client-side project (`.Client`) of a Blazor Web App. Typically, a Blazor Web App performs demanding work server-side, where the server can handle the work faster than the client and the app avoids the small delay setting up a Web Worker. However, use of a Web Worker via the Blazor Web Worker template client-side in a Blazor Web App is supported.

## Create the projects

Create a Blazor WebAssembly app and a .NET Web Worker class library:

```dotnetcli
dotnet new blazorwasm -n SampleApp
dotnet new blazorwebworker -n WebWorker
```

Add a project reference from the app to the worker library:

```dotnetcli
cd SampleApp
dotnet add reference ../WebWorker/WebWorker.csproj
```

## Customize the generated worker methods

The template already enables the `Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks` property in the worker project and includes a starter `WorkerMethods.cs` file with a `[JSExport]` attribute example. Add or update methods in the worker project as needed.

Worker methods are `static` methods marked with `[JSExport]` in a `static partial class`.

Due to `[JSExport]` limitations, worker methods should use JS interop-friendly types such as primitives and strings. For complex data, serialize to JSON in the worker and deserialize it in the Blazor app.

`WebWorker\WorkerMethods.cs`:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using System.Text.Json;

namespace WebWorker;

[SupportedOSPlatform("browser")]
public static partial class WorkerMethods
{
    [JSExport]
    public static string Greet(string name) => $"Hello, {name}!";

    [JSExport]
    public static string GetUsers()
    {
        var users = new List<User> { new("Alice", 30), new("Bob", 25) };
        return JsonSerializer.Serialize(users);
    }
}

public record User(string Name, int Age);
```

## Use the worker from a component

Inject `IJSRuntime` and use `WebWorkerClient.CreateAsync` to create a worker instance. The client manages the JavaScript messaging layer on your behalf.

`Pages/Home.razor`:

```razor
@page "/"
@using WebWorker
@implements IAsyncDisposable
@inject IJSRuntime JSRuntime

<PageTitle>Home</PageTitle>

<h1>Web Worker demo</h1>

<button class="btn btn-primary" @onclick="CallWorker" disabled="@(worker is null)">
    Call Worker
</button>

@if (!string.IsNullOrEmpty(greeting))
{
    <p>@greeting</p>
}

@if (users is not null)
{
    <ul>
        @foreach (var user in users)
        {
            <li>@user.Name (age @user.Age)</li>
        }
    </ul>
}
```

`Pages/Home.razor.cs`:

```csharp
using System.Text.Json;
using System.Runtime.Versioning;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using WebWorker;

namespace SampleApp.Pages;

[SupportedOSPlatform("browser")]
public partial class Home : ComponentBase, IAsyncDisposable
{
    private WebWorkerClient? worker;
    private string greeting = string.Empty;
    private List<User>? users;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            worker = await WebWorkerClient.CreateAsync(JSRuntime);
            StateHasChanged();
        }
    }

    private async Task CallWorker()
    {
        if (worker is null)
        {
            return;
        }

        greeting = await worker.InvokeAsync<string>(
            "WebWorker.WorkerMethods.Greet", ["World"]);

        var usersJson = await worker.InvokeAsync<string>(
            "WebWorker.WorkerMethods.GetUsers", []);

        users = JsonSerializer.Deserialize<List<User>>(usersJson) ?? [];
    }

    public async ValueTask DisposeAsync()
    {
        if (worker is not null)
        {
            await worker.DisposeAsync();
        }
    }
}
```

## Template output

The `dotnet new blazorwebworker` template generates a class library with the following structure:

```
WebWorker/
├── WebWorker.csproj
├── WebWorkerClient.cs
├── WorkerMethods.cs
└── wwwroot/
    ├── dotnet-web-worker-client.js
    └── dotnet-web-worker.js
```

* `WebWorkerClient.cs`: C# client that manages worker lifecycle and communication.
* `WorkerMethods.cs`: Starter file for adding `[JSExport]` methods that run inside the worker.
* `dotnet-web-worker-client.js`: JavaScript class that creates the worker, dispatches messages, and resolves pending requests.
* `dotnet-web-worker.js`: Worker entry point that boots the .NET WebAssembly runtime and dynamically resolves `[JSExport]` methods by name.

## `WebWorkerClient` API

The `WebWorkerClient` class exposes an async API for communicating with a Web Worker:

```csharp
public sealed class WebWorkerClient : IAsyncDisposable
{
    public static async Task<WebWorkerClient> CreateAsync(
        IJSRuntime jsRuntime,
        int timeoutMs = 60000,
        string? assemblyName = null,
        CancellationToken <example-value> = default);

    public async Task<TResult> InvokeAsync<TResult>(
        string method,
        object[] args,
        int timeoutMs = 60000,
        CancellationToken <example-value> = default);

    public async Task InvokeVoidAsync(
        string method,
        object[] args,
        int timeoutMs = 60000,
        CancellationToken <example-value> = default);

    public async ValueTask DisposeAsync();
}
```

* `CreateAsync`: Initializes the worker and waits for the .NET runtime to be ready inside the worker thread. The `assemblyName` parameter defaults to the worker project's assembly.
* `InvokeAsync<TResult>`: Calls a `[JSExport]` method on the worker by its full name (`AssemblyName.ClassName.MethodName`) and returns the result.
* `InvokeVoidAsync`: Calls a `[JSExport]` method that doesn't return a value.
* `DisposeAsync`: Terminates the worker and releases resources. Use `await using` or call explicitly.

## Related content

.NET on Web Workers

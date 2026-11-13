---
title: "What's new in ASP.NET Core in .NET 10 (part 8 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 10 (part 8 of 9)

## Miscellaneous

This section describes miscellaneous new features in .NET 10.

### Configure suppressing exception handler diagnostics

A new configuration option has been added to the ASP.NET Core exception handler middleware  to control diagnostic output: `ExceptionHandlerOptions.SuppressDiagnosticsCallback`. This callback is passed context about the request and exception, allowing you to add logic that determines whether the middleware should write exception logs and other telemetry.

This setting is useful when you know an exception is transient or has been handled by the exception handler middleware, and you don't want error logs written to your observability platform.

The middleware's default behavior has also changed: it no longer writes exception diagnostics for exceptions handled by `IExceptionHandler`. Based on user feedback, logging handled exceptions at the error level was often undesirable when `IExceptionHandler.TryHandleAsync` returned `true`.

You can revert to the previous behavior by configuring `SuppressDiagnosticsCallback`:

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    SuppressDiagnosticsCallback = context => false;
});
```

For more information about this breaking change, see https://github.com/aspnet/Announcements/issues/524.

### Support for the .localhost Top-Level Domain

The `.localhost` top-level domain (TLD) is defined in RFC2606 and RFC6761 as being reserved for testing purposes and available for users to use locally as they would any other domain name. This means using a name like `myapp.localhost` locally that resolves to the IP loopback address is allowed and expected according to these RFCs. Additionally, modern evergreen browsers already automatically resolve any `*.localhost` name to the IP loopback address (`127.0.0.1`/`::1`), effectively making them an alias for any service already being hosted at `localhost` on the local machine, that is, any service responding to `http://localhost:6789` will also respond to `http://anything-here.localhost:6789`, assuming no further specific hostname verification or enforcement is being performed by the service.

ASP.NET Core has been updated in .NET 10 Preview 7 to better support the `.localhost` TLD, such that it can now be easily used when creating and running ASP.NET Core applications in your local development environment. Having different apps running locally be resolvable via different names allows for better separation of some domain-name-associated website assets, e.g. cookies, and makes it easier to identify which app you're browsing via the name displayed in the browser address bar.

ASP.NET Core's built-in HTTP server, Kestrel, will now correctly treat any `*.localhost` name set via supported endpoint configuration mechanisms as the local loopback address and thus bind to it rather than all external address (i.e. bind to `127.0.0.1`/`::1` rather than `0.0.0.0`/`::`). This includes the `"applicationUrl"` property in launch profiles configured in a *launchSettings.json* file, and the `ASPNETCORE_URLS` environment variable. When configured to listen on a `.localhost` address, Kestrel will log an information message for both the `.localhost` **and** `localhost` addresses, to make it clear that both names can be used.

While web browsers automatically resolve `*.localhost` names to the local loopback address, other apps might treat `*.localhost` names as regular domain names and attempt to resolve them via their corresponding DNS stack. If your DNS configuration doesn't resolve `*.localhost` names to an address, they fail to connect. You can continue to use the regular `localhost` name to address your apps when not in a web browser.

The ASP.NET Core HTTPS development certificate (including the `dotnet dev-certs https` command) has been updated to ensure the certificate is valid for use with the `*.dev.localhost` domain name. After installing .NET 10 SDK Preview 7, trust the new developer certificate by running `dotnet dev-certs https --trust` at the command line to ensure your system is configured to trust the new certificate.

The certificate lists the `*.dev.localhost` name as a Subject Alternative Name (SAN) rather than `*.localhost` because using a wildcard certificate for a top-level domain name is invalid.

The project templates for *ASP.NET Core Empty* (`web`) and *Blazor Web App* (`blazor`) have been updated with a new option that when specified configures the created project to use the `.dev.localhost` domain name suffix, combining it with the project name to allow the app to be browsed to at an address like `https://myapp.dev.localhost:5036`:

```dotnetcli
$ dotnet new web -n MyApp --localhost-tld
The template "ASP.NET Core Empty" was created successfully.

Processing post-creation actions...
Restoring D:\src\MyApp\MyApp.csproj:
Restore succeeded.

$ cd .\MyApp\
$ dotnet run --launch-profile https
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://myapp.dev.localhost:7099
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7099/
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://myapp.dev.localhost:5036
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5036/
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: D:\src\local\10.0.1xx\MyApp
```

### Json+PipeReader deserialization support in MVC and Minimal APIs

PR: https://github.com/dotnet/aspnetcore/pull/62895

See https://github.com/dotnet/core/blob/main/release-notes/10.0/preview/preview7/libraries.md#pipereader-support-for-json-serializer

MVC, Minimal APIs, and the `HttpRequestJsonExtensions.ReadFromJsonAsync` methods have all been updated to use the new Json+PipeReader support without requiring any code changes from applications.

For most applications, the addition of this support has no effect on their behavior. However, if the application is using a custom `System.Text.Json.Serialization.JsonConverter`, there's a chance that the converter doesn't handle `System.Text.Json.Utf8JsonReader.HasValueSequence` correctly. This can result in missing data and errors, such as `System.ArgumentOutOfRangeException`, when deserializing.

The quick workaround (especially if you don't own the custom `JsonConverter` being used) is to set the `"Microsoft.AspNetCore.UseStreamBasedJsonParsing"` `System.AppContext` switch to `"true"`. This should be a temporary workaround, and the `JsonConverter` should be updated to support `System.Text.Json.Utf8JsonReader.HasValueSequence`.

To fix `JsonConverter` implementations, there's a quick fix that allocates an array from the `ReadOnlySequence` and would look like the following example:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    var span = reader.HasValueSequence ? reader.ValueSequence.ToArray() : reader.ValueSpan;
    // previous code
}
```

There's also a more complicated (but performant) fix, which would involve having a separate code path for the `ReadOnlySequence` handling:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    if (reader.HasValueSequence)
    {
        reader.ValueSequence;
        // ReadOnlySequence optimized path
    }
    else
    {
        reader.ValueSpan;
        // ReadOnlySpan optimized path
    }
}
```

### Automatic eviction from memory pool

The memory pools used by Kestrel, IIS, and HTTP.sys now automatically evict memory blocks when the application is idle or under less load. The feature runs automatically and doesn't need to be enabled or configured manually.

#### Why memory eviction matters

Previously, memory allocated by the pool would remain reserved, even when not in use. This feature releases memory back to the system when the app is idle for a period of time. This eviction reduces overall memory usage and helps applications stay responsive under varying workloads.

#### Use memory eviction metrics

Metrics have been added to the default memory pool used by our server implementations. The new metrics are under the name `"Microsoft.AspNetCore.MemoryPool"`.

For information about metrics and how to use them, see ASP.NET Core metrics.

#### Manage memory pools

Besides using memory pools more efficiently by evicting unneeded memory blocks, .NET 10 improves the experience of creating memory pools. It does this by providing a built-in IMemoryPoolFactory and a `MemoryPoolFactory` implementation. It makes the implementation available to your application through dependency injection.

The following code example shows a simple background service that uses the built-in memory pool factory implementation to create memory pools. These pools benefit from the automatic eviction feature:

```csharp
public class MyBackgroundService : BackgroundService
{
    private readonly MemoryPool<byte> _memoryPool;

    public MyBackgroundService(IMemoryPoolFactory<byte> factory)
    {
        _memoryPool = factory.Create();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(20, stoppingToken);
                // do work that needs memory
                var rented = _memoryPool.Rent(100);
                rented.Dispose();
            }
            catch (OperationCanceledException)
            {
                return;
            }
        }
    }
}
```

To use your own memory pool factory, make a class that implements `IMemoryPoolFactory` and register it with dependency injection, as the following example does. Memory pools created this way do not benefit from the automatic eviction feature unless you implement similar eviction logic in your custom factory:

```csharp
services.AddSingleton<IMemoryPoolFactory<byte>,
CustomMemoryPoolFactory>();

public class CustomMemoryPoolFactory : IMemoryPoolFactory<byte>
{
    public MemoryPool<byte> Create()
    {
        // Return a custom MemoryPool implementation
        // or the default, as is shown here.
        return MemoryPool<byte>.Shared;
    }
}
```

### Customizable security descriptors for HTTP.sys

You can now specify a custom security descriptor for HTTP.sys request queues. The new RequestQueueSecurityDescriptor property on `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions` enables more granular control over access rights for the request queue. This granular control lets you tailor security to your application's needs.

#### What you can do with the new property

A *request queue* in HTTP.sys is a kernel-level structure that temporarily stores incoming HTTP requests until your application is ready to process them. By customizing the security descriptor, you can allow or deny specific users or groups access to the request queue. This is useful in scenarios where you want to restrict or delegate HTTP.sys request handling at the operating system level.

#### How to use the new property

The `RequestQueueSecurityDescriptor` property applies only when creating a new request queue. The property doesn't affect existing request queues. To use this property, set it to a `System.Security.AccessControl.GenericSecurityDescriptor` instance when configuring your HTTP.sys server.

For example, the following code allows all authenticated users but denies guests:
```csharp
using System.Security.AccessControl;
using System.Security.Principal;
using Microsoft.AspNetCore.Server.HttpSys;

// Create a new security descriptor
var securityDescriptor = new CommonSecurityDescriptor(isContainer: false, isDS: false, sddlForm: string.Empty);

// Create a discretionary access control list (DACL)
var dacl = new DiscretionaryAcl(isContainer: false, isDS: false, capacity: 2);
dacl.AddAccess(
    AccessControlType.Allow,
    new SecurityIdentifier(WellKnownSidType.BuiltinUsersSid, null),
    -1,
    InheritanceFlags.None,
    PropagationFlags.None
);
dacl.AddAccess(
    AccessControlType.Deny,
    new SecurityIdentifier(WellKnownSidType.BuiltinGuestsSid, null),
    -1,
    InheritanceFlags.None,
    PropagationFlags.None
);

// Assign the DACL to the security descriptor
securityDescriptor.DiscretionaryAcl = dacl;

// Configure HTTP.sys options
var builder = WebApplication.CreateBuilder();
builder.WebHost.UseHttpSys(options =>
{
    options.RequestQueueSecurityDescriptor = securityDescriptor;
});
```

For more information, see HTTP.sys web server implementation in ASP.NET Core.

### Better support for testing apps with top-level statements

.NET 10 now has better support for testing apps that use top-level statements. Previously developers had to manually add `public partial class Program` to the `Program.cs` file so that the test project could reference the `Program class`. `public partial class Program` was required because the top-level statement feature in C# 9 generated a `Program class` that was declared as internal.

In .NET 10, a source generator is used to generate the `public partial class Program` declaration if the programmer didn't declare it explicitly. Additionally, an analyzer was added to detect when `public partial class Program` is declared explicitly and advise the developer to remove it.

The following PRs contribited to this feature:

* PR 58199
* PR 58482

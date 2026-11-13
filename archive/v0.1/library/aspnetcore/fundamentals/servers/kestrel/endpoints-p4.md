---
title: "Configure endpoints for Kestrel web server (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/endpoints.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure endpoints for Kestrel web server (part 4 of 4)

## Customize Kestrel named pipe endpoints

Kestrel's named pipe support includes advanced customization options. The CreateNamedPipeServerStream property on the named pipe options allows pipes to be customized per-endpoint.

This approach is useful in a Kestrel app that requires two pipe endpoints with different access security. The `CreateNamedPipeServerStream` option can be used to create pipes with custom security settings, depending on the pipe name.

```csharp
using System.IO.Pipes;
using System.Security.AccessControl;
using System.Security.Principal;
using Microsoft.AspNetCore.Server.Kestrel.Transport.NamedPipes;

var builder = WebApplication.CreateBuilder();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenNamedPipe("defaultPipe");
    options.ListenNamedPipe("securedPipe");
});

builder.WebHost.UseNamedPipes(options =>
{
    options.CreateNamedPipeServerStream = (context) =>
    {
        var pipeName = context.NamedPipeEndPoint.PipeName;

        switch (pipeName)
        {
            case "defaultPipe":
                return NamedPipeTransportOptions.CreateDefaultNamedPipeServerStream(context);
            case "securedPipe":
                // A custom PipeSecurity can't be combined with
                // PipeOptions.CurrentUserOnly, so clear the flag for this
                // endpoint only. defaultPipe keeps its default protection.
                var pipeOptions = context.PipeOptions & ~PipeOptions.CurrentUserOnly;

                return NamedPipeServerStreamAcl.Create(pipeName, PipeDirection.InOut,
                    NamedPipeServerStream.MaxAllowedServerInstances, PipeTransmissionMode.Byte,
                    pipeOptions, inBufferSize: 0, outBufferSize: 0, CreateSecuredPipeSecurity());
            default:
                throw new InvalidOperationException($"Unexpected pipe name: {pipeName}");
        }
    };
});

static PipeSecurity CreateSecuredPipeSecurity()
{
    using var serverIdentity = WindowsIdentity.GetCurrent();
    var pipeSecurity = new PipeSecurity();

    // Only the account the server runs as creates pipe instances, so it's the
    // only principal that needs CreateNewInstance.
    pipeSecurity.AddAccessRule(new PipeAccessRule(
        serverIdentity.User!,
        PipeAccessRights.ReadWrite | PipeAccessRights.CreateNewInstance,
        AccessControlType.Allow));

    // Callers only need to read and write. Replace this SID with the narrowest
    // group that must reach the endpoint.
    pipeSecurity.AddAccessRule(new PipeAccessRule(
        new SecurityIdentifier(WellKnownSidType.BuiltinAdministratorsSid, null),
        PipeAccessRights.ReadWrite,
        AccessControlType.Allow));

    return pipeSecurity;
}

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
In the preceding example, only the account the server runs as is granted `CreateNewInstance` access. Kestrel creates several instances of each pipe to accept connections in parallel, and Windows requires that right to create each instance after the first. Callers are granted read/write access only.

> **Warning:**
> Don't grant `PipeAccessRights.CreateNewInstance` to callers, and avoid `PipeAccessRights.FullControl`, which includes it along with `ChangePermissions` and `TakeOwnership`. `CreateNewInstance` corresponds to the Windows `FILE_CREATE_PIPE_INSTANCE` right, which authorizes a grantee to create additional server instances under the same pipe name. Windows distributes incoming connections across all instances of a pipe, so a process holding that right can accept genuine client connections and impersonate the server.

> **Note:**
> A pipe's security descriptor controls which accounts can connect to that pipe. It doesn't control which endpoints a connected caller can reach because every endpoint mapped in the app is served on every named pipe endpoint. Use authentication and authorization to restrict individual endpoints.

## Related content

* Kestrel web server in ASP.NET Core
* Configure options for the ASP.NET Core Kestrel web server

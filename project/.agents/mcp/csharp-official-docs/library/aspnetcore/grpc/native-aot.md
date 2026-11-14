---
title: "gRPC and Native AOT"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/native-aot.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# gRPC and Native AOT

-->

By James Newton-King

gRPC supports .NET native ahead-of-time (AOT) in .NET 8. Native AOT enables publishing gRPC client and server apps as small, fast native executables.

> **Warning:**
> In .NET 8, not all ASP.NET Core features are compatible with Native AOT. For more information, see ASP.NET Core and Native AOT compatibility.

## Get started

AOT compilation happens when the app is published. Native AOT is enabled with the `PublishAot` option.

1. Add `<PublishAot>true</PublishAot>` to the gRPC client or server app's project file. This will enable Native AOT compilation during publish and enable dynamic code usage analysis during build and editing.

    ```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PublishAot>true</PublishAot>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Grpc.AspNetCore" Version="2.51.0" />
    <PackageReference Include="Google.Protobuf" Version="3.22.0" />
  </ItemGroup>

</Project>
```

    Native AOT can also be enabled by specifying the `--aot` option with the ASP.NET Core gRPC template:

    ```dotnetcli
    dotnet new grpc --aot
    ```

2. Publish the app for a specific runtime identifier (RID) using `dotnet publish -r <RID>`.

The app is available in the publish directory and contains all the code needed to run in it.

Native AOT analysis includes all of the app's code and the libraries the app depends on. Review Native AOT warnings and take corrective steps. It's a good idea to test publishing apps frequently to discover issues early in the development lifecycle.

## Optimize publish size

A Native AOT executable contains just the code from external dependencies required to support the app. Unused code is automatically trimmed away.

The publish size of an ASP.NET Core gRPC service can be optimized by creating the host builder with `WebApplication.CreateSlimBuilder()`. This builder provides a minimal list of features required to run an ASP.NET Core app.

```csharp
var builder = WebApplication.CreateSlimBuilder(args);
builder.Services.AddGrpc();

var app = builder.Build();
app.MapGrpcService<GreeterService>();
app.Run();
```

## Benefits of using Native AOT

Apps published with Native AOT have:

* Minimized disk footprint
* Reduced startup time
* Reduce memory demand

For more information and examples of the benefits that Native AOT provides, see Benefits of using Native AOT with ASP.NET Core.

## Related content

* ASP.NET Core support for Native AOT
* Native AOT deployment

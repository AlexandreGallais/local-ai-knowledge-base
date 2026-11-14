---
title: "ASP.NET Core Blazor app download size performance best practices"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/performance/app-download-size.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor app download size performance best practices

## Runtime relinking

For information on how runtime relinking minimizes an app's download size, see ASP.NET Core Blazor WebAssembly runtime performance.

## Use `System.Text.Json`

Blazor's JS interop implementation relies on `System.Text.Json`, which is a high-performance JSON serialization library with low memory allocation. Using `System.Text.Json` shouldn't result in additional app payload size over adding one or more alternate JSON libraries.

For migration guidance, see How to migrate from `Newtonsoft.Json` to `System.Text.Json`.

## Intermediate Language (IL) trimming

*This section only applies to client-side Blazor scenarios.*

Trimming unused assemblies from a Blazor WebAssembly app reduces the app's size by removing unused code in the app's binaries. For more information, see Configure the Trimmer for ASP.NET Core Blazor.

## Lazy load assemblies

*This section only applies to client-side Blazor scenarios.*

Load assemblies at runtime when the assemblies are required by a route. For more information, see Lazy load assemblies in ASP.NET Core Blazor WebAssembly.

## Compression

*This section only applies to Blazor WebAssembly apps.*

When a Blazor WebAssembly app is published, the output is statically compressed during publish to reduce the app's size and remove the overhead for runtime compression. Blazor relies on the server to perform content negotiation and serve statically-compressed files.

After an app is deployed, verify that the app serves compressed files. Inspect the **Network** tab in a browser's developer tools and verify that the files are served with `Content-Encoding: br` (Brotli compression) or `Content-Encoding: gz` (Gzip compression). If the host isn't serving compressed files, follow the instructions in Host and deploy ASP.NET Core Blazor WebAssembly.

## Disable unused features

*This section only applies to client-side Blazor scenarios.*

Blazor WebAssembly's runtime includes the following .NET features that can be disabled for a smaller payload size.

Blazor WebAssembly carries globalization resources required to display values, such as dates and currency, in the user's culture. If the app doesn't require localization, you may configure the app to support the invariant culture, which is based on the `en-US` culture. Apply the `<InvariantGlobalization>` MSBuild property with a value of `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>
```

Adopting invariant globalization only results in using non-localized timezone names. To trim timezone code and data from the app, apply the `<InvariantTimezone>` MSBuild property with a value of `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <InvariantTimezone>true</InvariantTimezone>
</PropertyGroup>
```

> **Note:**
> `<BlazorEnableTimeZoneSupport>` overrides an earlier `<InvariantTimezone>` setting. We recommend removing the `<BlazorEnableTimeZoneSupport>` setting.

## Related content

Configuring and hosting .NET WebAssembly applications

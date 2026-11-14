---
title: "ASP.NET Core Blazor startup (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/startup.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor startup (part 3 of 3)

## Configure the .NET WebAssembly runtime

In advanced programming scenarios, the `configureRuntime` function with the `dotnet` runtime host builder is used to configure the .NET WebAssembly runtime. For example, `dotnet.withEnvironmentVariable` sets an environment variable that:

* Configures the .NET WebAssembly runtime.
* Changes the behavior of a C library.

> **Note:**
> A documentation request is pending in the `dotnet/runtime` GitHub repository for more information on environment variables that configure the .NET WebAssembly runtime or affect the behavior of C libraries. Although the documentation request is pending, more information and cross-links to additional resources are available in the request, Question/request for documentation on .NET WASM runtime env vars (`dotnet/runtime` #98225).

The `configureRuntime` function can also be used to enable integration with a browser profiler.

For the placeholders in the following examples that set an environment variable:

* The `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name. For the location of the script, see ASP.NET Core Blazor project structure.
* The `{NAME}` placeholder is the environment variable's name.
* The `{VALUE}` placeholder is the environment variable's value.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    webAssembly: {
      configureRuntime: dotnet => {
        dotnet.withEnvironmentVariable("{NAME}", "{VALUE}");
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

> **Note:**
> The .NET runtime instance can be accessed using the .NET WebAssembly Runtime API (`Blazor.runtime`). For example, the app's build configuration can be obtained using `Blazor.runtime.runtimeBuildInfo.buildConfiguration`.
>
> For more information on the .NET WebAssembly runtime configuration, see the runtime's TypeScript definition file (`dotnet.d.ts`) in the `dotnet/runtime` GitHub repository.
>
> > [!NOTE]
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Disable enhanced navigation and form handling

*This section applies to Blazor Web Apps.*

To disable enhanced navigation and form handling, set `disableDomPreservation` to `true` for `Blazor.start`:

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    ssr: { disableDomPreservation: true }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

## Related content

* Environments: Set the app's environment
* SignalR (includes sections on SignalR startup configuration)
* Globalization and localization: Statically set the culture with `Blazor.start()` (*client-side only*)
* Blazor WebAssembly compression

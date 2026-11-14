---
title: "disposables-and-dependency-injection"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/garbage-collection/includes/disposables-and-dependency-injection.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# disposables-and-dependency-injection

> **Tip:**
> With regard to dependency injection, when registering services in an `Microsoft.Extensions.DependencyInjection.IServiceCollection`, the service lifetime is managed implicitly on your behalf. The `System.IServiceProvider` and corresponding `Microsoft.Extensions.Hosting.IHost` orchestrate resource cleanup. Specifically, implementations of `System.IDisposable` and `System.IAsyncDisposable` are properly disposed at the end of their specified lifetime.
>
> For more information, see Dependency injection in .NET.

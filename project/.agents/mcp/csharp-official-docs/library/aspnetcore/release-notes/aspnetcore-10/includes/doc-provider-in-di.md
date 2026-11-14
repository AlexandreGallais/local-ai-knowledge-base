---
title: "doc-provider-in-di"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-10/includes/doc-provider-in-di.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# doc-provider-in-di

### Support for `IOpenApiDocumentProvider` in the DI container

ASP.NET Core in .NET 10 supports `Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider` in the dependency injection (DI) container. Inject the interface to access the OpenAPI document. This approach is useful for accessing OpenAPI documents outside the context of HTTP requests, such as in background services or custom middleware.

Previously, running app startup logic without launching an HTTP server could be accomplished using `HostFactoryResolver` with a no-op `Microsoft.AspNetCore.Hosting.Server.IServer` implementation. The new feature simplifies this process.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

For more information, see Add IOpenApiDocumentProvider interface and implementation (`dotnet/aspnetcore` #61463).

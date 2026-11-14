---
title: "appname6"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/includes/appname6.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# appname6

## Application name change

 In .NET 6, `Microsoft.AspNetCore.Builder.WebApplicationBuilder` normalizes the content root path to end with a `System.IO.Path.DirectorySeparatorChar`. Most apps migrating from `Microsoft.Extensions.Hosting.HostBuilder` or  `Microsoft.AspNetCore.Hosting.WebHostBuilder` won't have the same app name because they aren't normalized. For more information, see SetApplicationName

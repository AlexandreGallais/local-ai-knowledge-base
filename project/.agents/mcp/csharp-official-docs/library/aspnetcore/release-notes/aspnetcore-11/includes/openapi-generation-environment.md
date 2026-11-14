---
title: "openapi-generation-environment"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/openapi-generation-environment.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# openapi-generation-environment

### Select an environment for build-time OpenAPI document generation

Build-time OpenAPI document generation supports selecting the app environment with the `OpenApiGenerationEnvironment` MSBuild property. The property sets the host's environment for the generation process, equivalent to setting the `ASPNETCORE_ENVIRONMENT` or `DOTNET_ENVIRONMENT` environment variable. Environment-specific configuration and document transformations can therefore affect the generated OpenAPI document without requiring the environment variable to be set before running `dotnet build`.

Set the property in the project file:

```xml
<PropertyGroup>
  <OpenApiGenerationEnvironment>Development</OpenApiGenerationEnvironment>
</PropertyGroup>
```

For more information, see Generate OpenAPI documents.

Thank you @ldsenow for this contribution!

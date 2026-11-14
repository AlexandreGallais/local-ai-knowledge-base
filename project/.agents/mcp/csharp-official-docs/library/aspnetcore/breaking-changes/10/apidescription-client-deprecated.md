---
title: "Breaking change - Microsoft.Extensions.ApiDescription.Client package deprecated"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/10/apidescription-client-deprecated.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Microsoft.Extensions.ApiDescription.Client package deprecated

The Microsoft.Extensions.ApiDescription.Client NuGet package has been deprecated. The package supplied MSBuild targets and CLI support that generated OpenAPI-based client code during the build. Projects that reference the package now receive a warning during build.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Projects could add `<PackageReference Include="Microsoft.Extensions.ApiDescription.Client" ... />` and `<OpenApiReference>` items (or run `dotnet openapi`) to generate strongly typed clients at build time.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.ApiDescription.Client" Version="8.0.0" />
  </ItemGroup>

  <ItemGroup>
    <OpenApiReference Include="swagger.json" />
  </ItemGroup>
</Project>
```

## New behavior

The package is now deprecated and projects that reference it receive build warnings. The MSBuild targets and CLI commands are no longer supported.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

- The package has seen minimal updates and maintenance since its introduction.
- Its abstractions were tightly coupled to certain generators and did not scale well to others. Each generator now ships its own CLI/configuration experience, making the MSBuild middle-layer redundant.
- Removing the package reduces maintenance burden and clarifies the recommended workflow for client generation.

## Recommended action

- Remove any `<PackageReference Include="Microsoft.Extensions.ApiDescription.Client" … />` from your project.
- Replace `<OpenApiReference>` items or `dotnet openapi` commands with generator-specific tooling:
  - NSwag – Use `npx nswag` or `dotnet tool run nswag` with an `.nswag` config file.
  - Kiota – Install with `dotnet tool install -g Microsoft.OpenApi.Kiota` and run `kiota generate`.
  - OpenAPI generator – Invoke `openapi-generator-cli` via JAR or Docker.
- Commit the generated client code or run generation in a custom pre-build step that doesn't rely on the removed package.

## Affected APIs

- MSBuild item `OpenApiReference` (all instances).
- MSBuild property `OpenApiProjectReference`.
- CLI command `dotnet openapi`.

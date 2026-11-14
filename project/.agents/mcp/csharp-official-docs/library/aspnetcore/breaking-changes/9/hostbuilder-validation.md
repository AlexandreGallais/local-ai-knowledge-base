---
title: "Breaking change: HostBuilder enables ValidateOnBuild/ValidateScopes in development environment"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/9/hostbuilder-validation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HostBuilder enables ValidateOnBuild/ValidateScopes in development environment

Previously, no validation was enabled by default. Now, in the development environment, `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild` and `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes` are enabled.

## Version introduced

.NET 9 Preview 7

## Previous behavior

`Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild` and `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes` defaulted to `false` and were only enabled when they were explicitly set by calling `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider*`.

## New behavior

In the development environment when options haven't been set with `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider*`, `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild` and `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes` are set to `true`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Validation helps to catch problems early in application startup rather than later (or not at all) when the application interacts with its service provider.

## Recommended action

No action necessary if your application validates successfully. If you do see a validation error when testing in development, first try to fix it. If you can't fix it, you can disable validation by calling `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider*`.

## Affected APIs

- `Microsoft.Extensions.Hosting.HostBuilder`
- `Microsoft.Extensions.Hosting.HostBuilder.Build`

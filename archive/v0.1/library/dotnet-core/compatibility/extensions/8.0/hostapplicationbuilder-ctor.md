---
title: "Breaking change: HostApplicationBuilderSettings.Args respected by HostApplicationBuilder ctor"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/8.0/hostapplicationbuilder-ctor.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# HostApplicationBuilderSettings.Args respected by HostApplicationBuilder ctor

The `Microsoft.Extensions.Hosting.HostApplicationBuilder` constructor that accepts a `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings` object now applies the `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args` property, regardless of whether `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults` is set to `true` or `false`.

## Version introduced

.NET 8 Preview 2

## Previous behavior

Previously, the `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args` property was ignored when `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults` was set to `true`.

## New behavior

Starting in .NET 8, the `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args` value is added to `Microsoft.Extensions.Hosting.HostApplicationBuilder.Configuration` regardless of whether `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults` is set to `true` or `false`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The behavior of ignoring `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args` was unexpected, even when `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.DisableDefaults` was set to `true`. That's because if the caller didn't want the command-line arguments applied to the `Microsoft.Extensions.Hosting.HostApplicationBuilder`, they wouldn't have set them on the `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings` object. Since the caller *did* pass the command-line arguments on the settings, those arguments should be respected.

## Recommended action

If you don't want the command-line arguments to be added to the `Microsoft.Extensions.Hosting.HostApplicationBuilder` configuration, leave the `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Args` property set to `null`.

## Affected APIs

- `Microsoft.Extensions.Hosting.HostApplicationBuilder.#ctor(Microsoft.Extensions.Hosting.HostApplicationBuilderSettings)`

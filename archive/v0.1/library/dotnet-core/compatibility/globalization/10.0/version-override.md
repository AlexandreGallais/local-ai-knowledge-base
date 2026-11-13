---
title: "Breaking change: Environment variable renamed to DOTNET_ICU_VERSION_OVERRIDE"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/globalization/10.0/version-override.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Environment variable renamed to DOTNET_ICU_VERSION_OVERRIDE

.NET previously supported a configuration-switch environment variable called `CLR_ICU_VERSION_OVERRIDE`, which allowed users to specify the preferred ICU library version for apps running on Linux. In .NET 10, this environment variable has been renamed to `DOTNET_ICU_VERSION_OVERRIDE` to align with the naming convention of other configuration switch environment variables in .NET.

## Previous behavior

Previously, the `CLR_ICU_VERSION_OVERRIDE` environment variable was used to specify the preferred ICU version to be loaded in the application.

## New behavior

Starting in .NET 10, the `DOTNET_ICU_VERSION_OVERRIDE` environment variable is used to specify the preferred ICU version to be loaded in the application.

## Version introduced

.NET 10

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change ensures the environment variable is consistent with the naming convention used for all .NET environment variables.

## Recommended action

If you have a .NET 10 app that previously used the `CLR_ICU_VERSION_OVERRIDE` environment variable, use `DOTNET_ICU_VERSION_OVERRIDE` instead.

## Affected APIs

N/A

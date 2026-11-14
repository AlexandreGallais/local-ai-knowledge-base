---
title: ".NET 9 container images no longer install `zlib`"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/containers/9.0/no-zlib.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET 9 container images no longer install zlib

.NET 9 container images no longer install `zlib` since it's not a dependency of the .NET Runtime anymore.

## Previous behavior

In previous .NET versions, .NET container images installed the latest version of the `zlib` package from the Linux base image package repositories.

## New behavior

Starting in .NET 9, container images no longer install `zlib`. In addition, `zlib` is no longer updated in images where it's already installed from the base image.

## Version introduced

.NET 9 Preview 7

## Type of change

This change is a behavioral change.

## Reason for change

In .NET 9, the Runtime contains a statically linked version of `zlib-ng`. As a result, the .NET Runtime no longer has a package dependency on `zlib`. To reduce .NET container image sizes, .NET 9 container images no longer install `zlib`, and no longer update `zlib` in images where it's already installed from the base Linux image.

## Recommended action

For most scenarios, no action is required. If your containerized .NET app has a direct package dependency on `zlib`, you should manually install it in your Dockerfile using the package manager.

## Affected APIs

None.

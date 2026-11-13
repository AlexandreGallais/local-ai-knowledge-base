---
title: "Breaking change: 'libintl' package removed from Alpine images"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/containers/8.0/libintl-package.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# 'libintl' package removed from Alpine images

The `libintl` package is no longer included in .NET's Alpine container images.

## Previous behavior

Prior to .NET 8, the `libintl` package was included in .NET's Alpine container images.

## New behavior

.NET no longer includes the `libintl` package in its Alpine container images.

If your application has its own dependency on `libintl`, you might see the following error when running with .NET 8 in an Alpine container:

> **Error loading shared library libintl.so.8: No such file or directory**

## Version introduced

.NET 8 Preview 5

## Type of change

This change is a behavioral change.

## Reason for change

It was determined that .NET has no dependency on the `libintl` package. Only packages that .NET requires are included on top of the base Alpine container image.

## Recommended action

Verify the functionality of your application when upgrading to .NET 8. If your application has a dependency on the `libintl` package, you can include it in the image by adding the following instruction to your Dockerfile:

`RUN apk add --no-cache libintl`

## Affected APIs

None.

## See also

- dotnet/docker issue 4627

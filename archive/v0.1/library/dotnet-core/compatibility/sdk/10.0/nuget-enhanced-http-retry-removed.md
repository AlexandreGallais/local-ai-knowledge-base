---
title: "Breaking change: NUGET_ENABLE_ENHANCED_HTTP_RETRY environment variable removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/nuget-enhanced-http-retry-removed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NUGET_ENABLE_ENHANCED_HTTP_RETRY environment variable removed

The `NUGET_ENABLE_ENHANCED_HTTP_RETRY` environment variable no longer has any effect in .NET 10. Previously, this environment variable could be used to disable exponential retry back-off for failed HTTP calls in NuGet operations.

## Version introduced

.NET 10

## Previous behavior

Previously, when the `NUGET_ENABLE_ENHANCED_HTTP_RETRY` environment variable was set to `false`, NuGet used the old retry behavior with a fixed 200ms delay between failed HTTP calls instead of exponential back-off.

## New behavior

The `NUGET_ENABLE_ENHANCED_HTTP_RETRY` environment variable has no effect. NuGet always uses exponential retry back-off for failed HTTP calls, which has been the default behavior since .NET SDK 6.0.300.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Exponential retry back-off has been the default behavior for nearly 4 years since .NET SDK 6.0.300. The feature was introduced to help when restores overwhelmed servers that couldn't handle all package requests, and exponential retry allowed these requests to succeed. Since there has been no feedback indicating issues with this approach, the fallback option has outlived its utility.

## Recommended action

No action is required.

## Affected APIs

None.

---
title: "Breaking change - Android x86 is not supported"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/maui/11/android-x86-unsupported.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Android x86 is not supported

In .NET 11, Android x86 is not supported.

## Version introduced

.NET 11

## Previous behavior

The Mono runtime had an `android-x86` path for 32-bit x86, so mobile apps could run on Android x86 even though it was not an officially supported platform.

## New behavior

CoreCLR doesn't have an `android-x86` runtime identifier. `android-x64` remains available for x86-64 emulators.

## Type of breaking change

This change affects binary compatibility and is a behavioral change.

## Reason for change

The .NET 11 Android workload doesn't provide CoreCLR runtime files for 32-bit x86.

## Recommended action

- Move tests to x86-64 emulator images and the `android-x64` RID.
- If you still need 32-bit x86, keep that target on .NET 10.

## Affected APIs

None. This change affects Android runtime identifiers and deployment files.

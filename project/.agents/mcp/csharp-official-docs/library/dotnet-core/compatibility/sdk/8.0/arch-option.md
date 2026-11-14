---
title: "Breaking change: Architecture option doesn't imply self-contained"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/8.0/arch-option.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# --arch option doesn't imply self-contained

Up until now, the `--arch` option for `dotnet` CLI commands such as dotnet publish implied that the app was self-contained. The behavior of the `--arch` option has now been changed to match that of the `--runtime` option, and it no longer implies that an app is self-contained.

## Previous behavior

`--arch` implied `--self-contained`.

## New behavior

`--arch` doesn't imply anything about `--self-contained`.

## Version introduced

.NET 8 RC 2

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to unify the behavior of `--arch` with that of `--runtime`, which it's an alias for. The behavior for `--runtime` was also changed in .NET 8.

## Recommended action

If your application needs to be self contained, set `--self-contained` on your CLI calls, or set MSBuild properties such as `<SelfContained>true</SelfContained>` or `<PublishSelfContained>true</PublishSelfContained>`.

## See also

- Runtime-specific apps no longer self-contained

---
title: "Breaking change: Implicit `using` for System.Net.Http no longer added"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/8.0/implicit-global-using-netfx.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Implicit `using` for System.Net.Http no longer added

The implicit global `using` directive for the `System.Net.Http` namespace was removed for .NET Framework TFMs in an SDK-style project. This change was made because it's not guaranteed that the `System.Net.Http` namespace will be accessible in a .NET Framework-targeted project, because the library typically requires an additional reference. With this change, .NET Framework projects are more likely to compile when they are first created.

## Previous behavior

For SDK-style projects with .NET Framework TFMs, a global `using` directive for `System.Net.Http` was injected into the project's build process.

## New behavior

The global `using` directive for `System.Net.Http` is no longer added automatically.

## Version introduced

.NET 8 Preview 6

## Type of breaking change

This change can affect source compatibility and is also a behavioral change.

## Reason for change

Default projects should compile.

## Recommended action

If you relied on the implicit global `using` directive, you can:

- Add a global `using` directive to one of your source files.
- Add a `using` directive to each source code file that uses APIs from System.Net.Http.

## Affected APIs

N/A

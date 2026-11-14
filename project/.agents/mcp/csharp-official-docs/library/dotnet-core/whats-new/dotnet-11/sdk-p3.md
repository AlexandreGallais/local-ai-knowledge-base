---
title: "What's new in the SDK and tooling for .NET 11 (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-11/sdk.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in the SDK and tooling for .NET 11 (part 3 of 3)

## Include DLLs in file-based apps

File-based apps can now include compiled DLL references using `#:include` without a feature flag. The default item-type mapping treats `.dll` files as `Reference` items, so you can reference prebuilt libraries directly:

```csharp
#:include ./libs/MyLibrary.dll

MyLibrary.Helper.DoWork();
```

Additionally, more `#:` directives are now allowed to appear as duplicates across included files when their values match (`#:sdk`, `#:property`, `#:package`), enabling self-contained library files that declare their own dependencies without conflicting when multiple entry points include them.

## See also

- What's new in the .NET 11 runtime
- What's new in .NET libraries for .NET 11
- Breaking changes in .NET 11

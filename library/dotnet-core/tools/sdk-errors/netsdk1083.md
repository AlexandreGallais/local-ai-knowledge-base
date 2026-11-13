---
title: "NETSDK1083: The specified RuntimeIdentifier is not recognized"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1083.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1083: The specified RuntimeIdentifier is not recognized

NETSDK1083 warns you that the runtime identifier (RID) specified for your project was not recognized. The specified RID must be in the RID graph.

To resolve this error, specify a known RID as your project's `RuntimeIdentifier`.

In .NET 8 and later versions, the default behavior of the .NET SDK is to use a smaller portable RID graph. If your project uses a version-specific or distro-specific RID, switch to a portable RID. For example, if your project file contains the property `<RuntimeIdentifier>win10-x64</RuntimeIdentifier>`, change it to `<RuntimeIdentifier>win-x64</RuntimeIdentifier>`.

If you need to revert to the previous behavior of using the old, full RID graph, you can set the `UseRidGraph` MSBuild property to `true` in your project file. The old RID graph is no longer updated and exists only for backwards compatibility, and the option to use it might be removed in a future release.

## See also

- .NET SDK uses a smaller RID graph

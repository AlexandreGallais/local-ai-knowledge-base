---
title: "Breaking change: Write reference assemblies to IntermediateOutputPath"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/6.0/write-reference-assemblies-to-obj.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Write reference assemblies to intermediate output

The .NET SDK now writes reference assemblies to the `IntermediateOutputPath` instead of the `OutDir` by default. This change removes these build-time-only artifacts from outputs that you require at runtime.

## Version **introduced**

.NET SDK 6.0.200

## Old behavior

Since reference assemblies were added, the .NET SDK has written reference assemblies to the *ref* directory in the `OutDir` directory of the compilation. In .NET 5, the ProduceReferenceAssembly property was introduced and defaulted to `true` for `net5.0` and later applications. With this change, many applications began implicitly generating reference assemblies in the `OutDir` directory.

## New behavior

Now, reference assemblies are written to the `refint` directory of the `IntermediateOutputPath` directory by default, like many other intermediate artifacts.

## Reason for change

Reference assemblies are generally not runtime assets, and so don't belong in the `OutDir` directory by default.

## Recommended action

If you have custom build logic and you need to manipulate the reference assemblies, use the `TargetRefPath` property to get the correct path.

If an external system requires the reference assembly in `OutDir`, set the MSBuild property ProduceReferenceAssemblyInOutDir to `true` in your project file.

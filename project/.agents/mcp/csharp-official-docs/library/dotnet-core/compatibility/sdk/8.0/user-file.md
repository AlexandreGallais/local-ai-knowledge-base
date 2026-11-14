---
title: "Breaking change: .user file imported in outer builds"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/8.0/user-file.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .user file imported in outer builds

Previously, the SDK only imported *.user* configuration files in inner builds during a cross-targeted build. Now, these files are also imported in outer builds, which might cause breaks when you build projects locally.

## Version introduced

.NET SDK 8

## Previous behavior

Previously, if you added a *.user* file for extra local configurations in cross-targeted builds, the file was only imported in inner builds in some cases. If you defined frameworks with `<TargetFramework>`, the *.user* file was imported as expected. If you defined frameworks using the plural form, `<TargetFrameworks>`, the *.user* file was imported for every internal build for each framework (even if just one was defined). But the file wasn't imported for the outer build, which runs certain targets again.

## New behavior

When using the the plural `<TargetFrameworks>` property to define targeted frameworks, the build imports the *.user* file on all internal builds *and* on the outer build.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Users expected the *.user* config file to be imported in outer builds in MSBuild.

## Recommended action

This change shouldn't affect any deployments or CIs; only local builds. If the extra configurations that are imported change how the build is processed, review the configurations that are expected on the outer build.

## Affected APIs

N/A

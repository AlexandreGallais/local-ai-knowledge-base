---
title: "NETSDK1112: The runtime pack was not downloaded"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1112.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1112: The runtime pack was not downloaded

A runtime pack that your project requires was not downloaded. The full error message is similar to the following example:

> The runtime pack for `<Runtime>` was not downloaded. Try running a NuGet restore with the RuntimeIdentifier '`<RID>`'.

This can happen in the following scenarios:

* The publish parameters are different than what's in the project file. Review publish parameters and change any instances where publish parameters differ from the project file.
* You used Debug configuration to build an app that is set up to require Release configuration. Try building with Release configuration.

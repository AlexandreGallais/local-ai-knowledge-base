---
title: "dnim-cli-accept-license"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/additional-tools/includes/dnim-cli-accept-license.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dnim-cli-accept-license

**`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.

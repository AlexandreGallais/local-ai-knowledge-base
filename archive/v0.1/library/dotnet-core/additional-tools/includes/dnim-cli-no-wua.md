---
title: "dnim-cli-no-wua"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/additional-tools/includes/dnim-cli-no-wua.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dnim-cli-no-wua

**`--no-wua`**

Temporarily stop the Windows Update Agent service when executing installation packages. DNIM stops the service only if it's running and restarts it only if DNIM stopped it. The option is intended to minimize the impact from other updates that may interfere with updating .NET.

> **Caution:**
> DNIM will make a best effort to restart WUA. It is possible for DNIM to exit abruptly before it is able to restart WUA if the process is killed. This could leave a device in a vulnerable state.

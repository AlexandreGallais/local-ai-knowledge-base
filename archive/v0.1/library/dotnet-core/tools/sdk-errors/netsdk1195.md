---
title: "NETSDK1195: Trimming, or code compatibility analysis for trimming, single-file deployment, or ahead-of-time compilation is not supported for the targ…"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1195.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1195: Trimming, or code compatibility analysis for trimming, single-file deployment, or ahead-of-time compilation is not supported for the target framework.

NETSDK1195 indicates that you're using a feature of the SDK which is not available for the selected target framework. The following features depend on the ILLink pack, which is only available when targeting `netcoreapp3.0` and above:

- Trimming (via `PublishTrimmed` or `PublishAot`)
- Trim analysis (via `PublishTrimmed`, `PublishAot`, `IsTrimmable`, `IsAotCompatible`, or `EnableTrimAnalyzer`)
- Single-file analysis (via `PublishSingleFile` or `EnableSingleFileAnalyzer`)
- Ahead-of-time compilation analysis (via `PublishAot` or `EnableAotAnalyzer`)

To resolve this error, either target a supported `TargetFramework`, or turn off the setting that requires the ILLink pack.

---
title: "cli-artifacts-path"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/includes/cli-artifacts-path.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# cli-artifacts-path

**`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see Artifacts Output Layout. This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.

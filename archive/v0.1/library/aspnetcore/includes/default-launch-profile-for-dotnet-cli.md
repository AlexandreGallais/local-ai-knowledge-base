---
title: "default-launch-profile-for-dotnet-cli"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/default-launch-profile-for-dotnet-cli.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# default-launch-profile-for-dotnet-cli

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

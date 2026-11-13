---
title: "package-manager-failed-to-find-deb-intro"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/includes/package-manager-failed-to-find-deb-intro.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# package-manager-failed-to-find-deb-intro

If you receive an error message similar to **Unable to locate package {dotnet-package}** or **Some packages could not be installed**, run the following commands.

There are two placeholders in the following set of commands.

- `{dotnet-package}`\
This represents the .NET package you're installing, such as `aspnetcore-runtime-8.0`. This is used in the following `sudo apt-get install` command.

First, try purging the package list:

```bash
sudo dpkg --purge packages-microsoft-prod && sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
```

Then, try to install .NET again. If that doesn't work, you can run a manual install with the following commands:

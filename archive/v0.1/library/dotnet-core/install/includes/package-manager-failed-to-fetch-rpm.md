---
title: "package-manager-failed-to-fetch-rpm"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/includes/package-manager-failed-to-fetch-rpm.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# package-manager-failed-to-fetch-rpm

While installing the .NET package, you may see an error similar to `signature verification failed for file 'repomd.xml' from repository 'packages-microsoft-com-prod'`. Generally speaking, this error means that the package feed for .NET is being upgraded with newer package versions, and that you should try again later. During an upgrade, the package feed should not be unavailable for more than 2 hours. If you continually receive this error for more than 2 hours, please file an issue at <https://github.com/dotnet/core/issues>.
